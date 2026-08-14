#!/usr/bin/env bash
#
# Compile resume/resume.tex -> public/Madhur_N_Patel_Resume.pdf
#
# Run via:  npm run resume
#
# Requires a TeX distribution with latexmk. This is deliberately NOT part of
# `npm run build`: Vercel's build image has no TeX, and installing one there is
# slow and fragile. The compiled PDF is committed instead, and CI checks that
# it is not older than the source (npm run check:resume).
set -euo pipefail

RESUME_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$RESUME_DIR")"
OUT_DIR="$REPO_ROOT/public"
OUT_PDF="$OUT_DIR/Madhur_N_Patel_Resume.pdf"
BUILD_DIR="$RESUME_DIR/.build"

if ! command -v latexmk >/dev/null 2>&1; then
  cat >&2 <<'EOF'
error: latexmk not found.

Install a TeX distribution first:
  Debian/Ubuntu : sudo apt-get install texlive-latex-recommended texlive-fonts-recommended latexmk
  macOS         : brew install --cask basictex   (then: sudo tlmgr install latexmk)
  Any platform  : https://www.tug.org/texlive/

The site build does not need TeX — only rebuilding the resume does.
EOF
  exit 1
fi

mkdir -p "$BUILD_DIR" "$OUT_DIR"

echo "Compiling resume.tex ..."
latexmk -pdf -interaction=nonstopmode -halt-on-error \
        -outdir="$BUILD_DIR" "$RESUME_DIR/resume.tex"

# One page is a hard requirement — a two-page resume for a 2026 graduate reads
# as padding, and the source comments say what to cut.
if command -v pdfinfo >/dev/null 2>&1; then
  PAGES="$(pdfinfo "$BUILD_DIR/resume.pdf" | awk '/^Pages:/ {print $2}')"
  if [ "${PAGES:-1}" -gt 1 ]; then
    echo "error: resume is $PAGES pages; it must be 1. See the cut list at the top of resume.tex." >&2
    exit 1
  fi
fi

cp "$BUILD_DIR/resume.pdf" "$OUT_PDF"
# Keep the artifact newer than the source so check:resume passes.
touch "$OUT_PDF"

echo "Wrote $OUT_PDF"
echo "Commit the PDF along with resume.tex — deploys use the committed artifact."
