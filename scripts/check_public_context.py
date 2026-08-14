#!/usr/bin/env python3
"""Guard test for the chatbot's context boundary.

The chatbot used to load every markdown file in a private notes directory that an
automated agent writes into. This script fails the build if that boundary erodes.

Run: npm run check:context   (or: python3 scripts/check_public_context.py)
"""
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SERVER_PY = REPO_ROOT / "server.py"
PUBLIC_CONTEXT_DIR = REPO_ROOT / "public-context"

failures: list[str] = []
notes: list[str] = []


def fail(msg: str) -> None:
    failures.append(msg)


# --- Check 1: every loaded context path stays inside public-context/ ---------
sys.path.insert(0, str(REPO_ROOT))
try:
    import server
except Exception as e:  # pragma: no cover - import failure is itself a failure
    fail(f"could not import server.py: {e}")
    server = None

if server is not None:
    root = PUBLIC_CONTEXT_DIR.resolve()

    if server.PUBLIC_CONTEXT_DIR.resolve() != root:
        fail(
            f"server.PUBLIC_CONTEXT_DIR is {server.PUBLIC_CONTEXT_DIR!r}, "
            f"expected {PUBLIC_CONTEXT_DIR!r}"
        )

    loaded = server.loaded_context_files()
    for path in loaded:
        resolved = Path(path).resolve()
        if not resolved.is_relative_to(root):
            fail(f"context file resolves outside public-context/: {resolved}")
    notes.append(f"loaded {len(loaded)} context file(s): {', '.join(p.name for p in loaded)}")

    # The allowlist itself must not be able to escape, even before resolution.
    for name in server.PUBLIC_CONTEXT_ALLOWLIST:
        if name != Path(name).name or name in ("", ".", ".."):
            fail(f"allowlist entry is not a bare file name: {name!r}")

    # A file present in the directory but absent from the allowlist must not be
    # loaded — this is what makes publishing an explicit act.
    if PUBLIC_CONTEXT_DIR.is_dir():
        on_disk = {p.name for p in PUBLIC_CONTEXT_DIR.glob("*.md")}
        served = {p.name for p in loaded}
        unlisted = on_disk - set(server.PUBLIC_CONTEXT_ALLOWLIST)
        leaked = unlisted & served
        if leaked:
            fail(f"files loaded without being allowlisted: {sorted(leaked)}")
        if unlisted:
            notes.append(f"present but not served (expected): {', '.join(sorted(unlisted))}")

    # Traversal probe: an allowlist entry pointing outside must be rejected.
    original = list(server.PUBLIC_CONTEXT_ALLOWLIST)
    try:
        server.PUBLIC_CONTEXT_ALLOWLIST = ["../server.py", "../../obsidian-vault/0000 ABOUT ME.md"]
        escaped = server.loaded_context_files()
        if escaped:
            fail(f"traversal entries were accepted: {[str(p) for p in escaped]}")
        else:
            notes.append("traversal probe rejected (../ entries refused)")
    finally:
        server.PUBLIC_CONTEXT_ALLOWLIST = original

# --- Check 2: no reference to the private notes vault in server.py -----------
if SERVER_PY.is_file():
    source = SERVER_PY.read_text(encoding="utf-8")
    hits = [
        f"line {i}: {line.strip()}"
        for i, line in enumerate(source.splitlines(), 1)
        if re.search(r"obsidian", line, re.IGNORECASE)
    ]
    if hits:
        fail("server.py still references the private notes vault:\n    " + "\n    ".join(hits))
    else:
        notes.append("server.py contains no 'obsidian' reference")
else:
    fail(f"server.py not found at {SERVER_PY}")

# --- Report -------------------------------------------------------------------
for note in notes:
    print(f"  ok  {note}")

if failures:
    print("\nFAIL: chatbot context boundary check", file=sys.stderr)
    for f in failures:
        print(f"  - {f}", file=sys.stderr)
    sys.exit(1)

print("\nPASS: chatbot context boundary intact")
