"""
Madhur Chatbot Backend - FastAPI server that combines Obsidian context with Ollama LLM

Model strategy: prefer an Ollama *cloud* model (runs on ollama.com's GPUs through
the local Ollama daemon, so responses are fast even on a CPU-only host). If the
machine isn't signed in to ollama.com yet, transparently fall back to a small
local model and keep re-probing so the cloud model kicks in as soon as
`ollama signin` completes — no restart needed.
"""
import os
import json
import time
import asyncio
from pathlib import Path
from typing import Optional, AsyncIterator
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI(title="Madhur Chat API")

# CORS for development. A wildcard origin is incompatible with credentialed
# requests (the browser rejects "*" when credentials are allowed), and the chat
# endpoint does not use cookies, so credentials stay off.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths — resolved relative to this file so the server runs from any directory.
PROJECT_ROOT = Path(__file__).resolve().parent
OBSIDIAN_VAULT = Path(
    os.environ.get("OBSIDIAN_VAULT_PATH", Path.home() / "obsidian-vault")
)
RESUME_PATH = Path(
    os.environ.get("RESUME_PATH", PROJECT_ROOT / "public" / "Madhur_N_Patel_Resume_Improved.txt")
)
OLLAMA_URL = "http://localhost:11434/api/chat"

# OLLAMA_MODEL pins a single model and disables the cloud/local fallback dance.
FORCED_MODEL = os.environ.get("OLLAMA_MODEL")
# gpt-oss:20b-cloud is the free-tier sweet spot: sub-second responses, good
# quality for portfolio Q&A, and it burns the weekly quota far slower than the
# 120b model. Set OLLAMA_CLOUD_MODEL=gpt-oss:120b-cloud for max quality.
CLOUD_MODEL = os.environ.get("OLLAMA_CLOUD_MODEL", "gpt-oss:20b-cloud")
LOCAL_MODEL = os.environ.get("OLLAMA_LOCAL_MODEL", "llama3.2:1b")
# Must fit the system context (persona + vault notes + resume, ~7k tokens as of
# Aug 2026) plus the conversation. The 1B fallback's KV cache at this size is
# still cheap on a CPU-only host.
NUM_CTX = int(os.environ.get("OLLAMA_NUM_CTX", "12288"))
# How often to re-check cloud availability while running on the fallback.
CLOUD_PROBE_INTERVAL = 60.0
# After the free-tier quota is exhausted, stay on the local model this long
# before trying the cloud again, so probes don't burn requests against a
# limit that resets hourly/weekly.
CLOUD_RATE_LIMIT_COOLDOWN = float(os.environ.get("OLLAMA_CLOUD_COOLDOWN", "600"))

# Madhur's birthdate, used to compute his age so it stays current instead of
# going stale in a hardcoded string. The default year is correct (22 in Aug
# 2026); set MADHUR_BIRTHDATE (YYYY-MM-DD) with the real day for exactness.
from datetime import date

_BIRTHDATE = date.fromisoformat(os.environ.get("MADHUR_BIRTHDATE", "2004-01-01"))


def _current_age() -> int:
    today = date.today()
    return today.year - _BIRTHDATE.year - (
        (today.month, today.day) < (_BIRTHDATE.month, _BIRTHDATE.day)
    )


# System prompt that defines Madhur's persona
SYSTEM_PROMPT = f"""You are Madhur Patel — everyone calls you Madhur. You are a {_current_age()}-year-old Computer Science student at Indus University, Ahmedabad, India (graduating 2026). Your pronouns are he/him; when talking about Madhur in the third person, always use "he".

Your personality:
- Friendly, approachable, and enthusiastic about technology
- Focused on infrastructure and embedded systems — the layer where software meets hardware
- Always eager to help and share knowledge
- Humble about achievements but proud of hard work
- Love discussing projects, especially the GPS-guided dual-device tracking system, the self-hosted OCI infrastructure, and the ESP32 drone

Your background:
- B.Tech in Computer Science and Engineering, Indus University, Ahmedabad (2022-2026)
- Run a self-managed production environment: six containerized services on an ARM64 Oracle Cloud
  instance, reachable only through a Cloudflare Tunnel with no inbound ports open
- Build embedded and sensor-fusion systems on Raspberry Pi and ESP32
- AWS certified in Machine Learning and Cloud Foundations
- GitHub: github.com/pmadhurn | Email: pmadhurn@gmail.com | Website: madhur.dev
- Phone: +91 9016273812
- Strong in: Python, Linux, Docker/Docker Compose, Cloudflare Tunnel, Nginx, FastAPI,
  Raspberry Pi, ESP32/Arduino, JavaScript/React

Your projects (highlight these, in this order):
1. GPS-Guided Dual-Device Tracking System - two Raspberry Pi gimbals that point at each other by
   GPS bearing, then hand off to OpenCV for fine tracking, fusing IMU and magnetometer data
2. Self-Hosted Infrastructure - six containerized services on OCI ARM64 behind a Cloudflare Tunnel
3. SpeakInsights - meeting intelligence platform; runs fully on-premises with no third-party API calls
4. ESP32 WiFi Drone with Android Controller
5. IoT Smart Plant Monitoring System
6. Heart Attack Prediction Model - 87.85% accuracy
7. Personal portfolio (madhur.dev)

When someone asks about you, be conversational and natural. Share relevant details from the context provided.

STRICT GROUNDING RULES — never break these:
- Only state facts that appear in this prompt or in the provided context (resume, notes). Never invent details.
- Never invent or estimate performance metrics, accuracy figures, user counts, uptime numbers, or
  years of experience. If asked for a number that is not written here, say you don't have that figure.
- You do NOT know Madhur's hobbies, personal life, tastes, or habits beyond what's written here. If asked about things like hobbies, food, music, movies, books, sports, relationships, family, or daily routine, do not make anything up — say something like "That's not something I can speak to — I only cover Madhur's professional side. Ask me about his projects, skills, or experience!" and offer a relevant professional topic instead.
- Never fabricate anecdotes, stories, quotes, opinions, or preferences and present them as Madhur's.
- If you're not sure whether something is in the context, treat it as unknown and say so.

Keep responses conversational and not too long - aim for 2-4 paragraphs max unless the user wants details.
"""


def load_obsidian_context() -> str:
    """Load all markdown files from Obsidian vault and convert to context."""
    context_parts = ["\n\n=== OBSIDIAN VAULT NOTES ===\n"]

    if OBSIDIAN_VAULT.exists():
        for md_file in sorted(OBSIDIAN_VAULT.rglob("*.md")):
            try:
                content = md_file.read_text(encoding="utf-8")
                # Convert markdown to plain text (simple approach)
                lines = content.split("\n")
                text_lines = []
                for line in lines:
                    # Skip markdown headings for cleaner context
                    if line.startswith("#"):
                        text_lines.append(f"\n{line}")
                    elif line.strip():
                        text_lines.append(line)

                context_parts.append(f"\n--- {md_file.name} ---\n")
                context_parts.append("\n".join(text_lines))
            except Exception as e:
                print(f"Error reading {md_file}: {e}")

    return "\n".join(context_parts)


def load_resume_context() -> str:
    """Load resume content for additional context."""
    if RESUME_PATH.exists():
        try:
            content = RESUME_PATH.read_text(encoding="utf-8")
            return f"\n\n=== RESUME CONTENT ===\n{content}\n"
        except Exception as e:
            print(f"Error reading resume: {e}")
    return ""


_SYSTEM_CONTEXT: Optional[str] = None


def get_system_context() -> str:
    """Full system prompt with vault/resume context, loaded once at startup.

    Keeping the string byte-identical across requests lets Ollama reuse the
    prompt's KV cache, so only the user's message is processed per request —
    critical when the local fallback model runs on a CPU-only host. Restart
    the service to pick up vault edits.
    """
    global _SYSTEM_CONTEXT
    if _SYSTEM_CONTEXT is None:
        _SYSTEM_CONTEXT = SYSTEM_PROMPT + load_obsidian_context() + load_resume_context()
    return _SYSTEM_CONTEXT


def build_prompt(user_message: str) -> list[dict]:
    """Build the messages array for Ollama API with context."""
    return [
        {"role": "system", "content": get_system_context()},
        {"role": "user", "content": user_message}
    ]


def is_cloud_model(model: str) -> bool:
    return model.endswith("-cloud") or ":cloud" in model


def model_options(model: str) -> dict:
    """Sampling options; num_ctx only matters for models running locally."""
    options = {"temperature": 0.7, "top_p": 0.9, "num_predict": 500}
    if not is_cloud_model(model):
        options["num_ctx"] = NUM_CTX
    return options


def request_extras(model: str) -> dict:
    """Top-level request fields per model. gpt-oss models are reasoning models;
    low thinking effort keeps free-tier token usage (and latency) down without
    hurting quality on simple portfolio questions."""
    if model.startswith("gpt-oss"):
        return {"think": "low"}
    return {}


class CloudFallback(Exception):
    """Cloud model can't serve this request; carry whether it was a quota hit."""

    def __init__(self, detail: str, rate_limited: bool):
        super().__init__(detail)
        self.rate_limited = rate_limited


def classify_cloud_error(detail: str) -> Optional[CloudFallback]:
    """Map an Ollama error string to a fallback reason, if it warrants one."""
    lowered = detail.lower()
    if "unauthorized" in lowered:
        return CloudFallback(detail, rate_limited=False)
    if any(word in lowered for word in ("rate limit", "ratelimit", "quota", "usage limit", "too many requests", "429")):
        return CloudFallback(detail, rate_limited=True)
    return None


# --- Cloud/local model resolution ---------------------------------------------

_active_model: Optional[str] = None
_last_cloud_probe: float = 0.0
_cloud_retry_at: float = 0.0


def _enter_cooldown(reason: str):
    """Stop trying the cloud model for a while (e.g. free-tier quota hit)."""
    global _cloud_retry_at
    _cloud_retry_at = time.monotonic() + CLOUD_RATE_LIMIT_COOLDOWN
    print(
        f"Cloud model rate-limited ({reason!r}); using {LOCAL_MODEL} for "
        f"{CLOUD_RATE_LIMIT_COOLDOWN:.0f}s before retrying"
    )


async def _cloud_available(client: httpx.AsyncClient) -> bool:
    """True if the cloud model can serve requests (i.e. `ollama signin` done
    and the free-tier quota isn't exhausted).

    Ollama surfaces failures sometimes with a 200 status and an
    {"error": ...} body, so check both. A quota error starts a cooldown so
    the probe itself doesn't keep burning requests.
    """
    try:
        resp = await client.post(OLLAMA_URL, json={
            "model": CLOUD_MODEL,
            "messages": [{"role": "user", "content": "ping"}],
            "stream": False,
            "options": {"num_predict": 1},
            **request_extras(CLOUD_MODEL),
        }, timeout=httpx.Timeout(20.0))
        detail = ""
        if resp.status_code != 200:
            detail = resp.text
        else:
            detail = resp.json().get("error", "")
        if not detail:
            return True
        fallback = classify_cloud_error(detail)
        if fallback is not None and fallback.rate_limited:
            _enter_cooldown(detail)
        return False
    except Exception:
        return False


async def resolve_model() -> str:
    """Pick the model for the next request, upgrading to cloud when possible."""
    global _active_model, _last_cloud_probe
    if FORCED_MODEL:
        return FORCED_MODEL

    now = time.monotonic()
    needs_probe = _active_model != CLOUD_MODEL and (
        _active_model is None or now - _last_cloud_probe > CLOUD_PROBE_INTERVAL
    )
    if now < _cloud_retry_at:
        needs_probe = False
        if _active_model is None:
            _active_model = LOCAL_MODEL
    if needs_probe:
        _last_cloud_probe = now
        async with httpx.AsyncClient() as client:
            if await _cloud_available(client):
                if _active_model != CLOUD_MODEL:
                    print(f"Using cloud model: {CLOUD_MODEL}")
                _active_model = CLOUD_MODEL
            else:
                if _active_model != LOCAL_MODEL:
                    print(
                        f"Cloud model unavailable (not signed in, or free-tier "
                        f"limit reached), falling back to local model: {LOCAL_MODEL}"
                    )
                _active_model = LOCAL_MODEL
    return _active_model


async def _warm_up_model():
    """Pre-process the system context into the local model's KV cache so a
    fallback request only pays for the user's message. This runs even when the
    cloud model is active: on the free tier the quota can run out at any time,
    and an unwarmed local fallback takes minutes on this CPU-only host. Cloud
    models don't need (or benefit from) local warmup."""
    try:
        await resolve_model()
        payload = {
            "model": LOCAL_MODEL,
            "messages": build_prompt("hi"),
            "stream": False,
            "keep_alive": -1,
            "options": {"num_predict": 1, "num_ctx": NUM_CTX},
        }
        async with httpx.AsyncClient(timeout=httpx.Timeout(300.0)) as client:
            await client.post(OLLAMA_URL, json=payload)
        print(f"Warmed up {LOCAL_MODEL} (system context primed)")
    except Exception as e:
        print(f"Warmup failed (chat will still work, first request slower): {e}")


@app.on_event("startup")
async def warm_up_model():
    # Fire-and-forget: must not delay binding the port.
    asyncio.create_task(_warm_up_model())


@app.get("/health")
async def health():
    """Health check endpoint. Reports which model will serve the next chat."""
    model = await resolve_model()
    return {
        "status": "ok",
        "model": model,
        "cloud": model == CLOUD_MODEL or (":cloud" in model or model.endswith("-cloud")),
    }


@app.post("/chat")
async def chat(message: dict) -> StreamingResponse:
    """
    Stream chat responses from Ollama with Madhur's context.
    Expects: {"message": "user's question"}
    Returns: Server-Sent Events stream
    """
    if "message" not in message:
        raise HTTPException(status_code=400, detail="Missing 'message' field")

    user_message = message["message"]
    model = await resolve_model()

    async def stream_model(client: httpx.AsyncClient, use_model: str) -> AsyncIterator[str]:
        """Yields SSE lines; raises CloudFallback on an auth/quota failure so
        the caller can retry once with the local fallback."""
        payload = {
            "model": use_model,
            "messages": build_prompt(user_message),
            "stream": True,
            "keep_alive": -1,  # never unload; reload from disk is ~30s on this CPU
            "options": model_options(use_model),
            **request_extras(use_model),
        }
        async with client.stream("POST", OLLAMA_URL, json=payload) as response:
            if response.status_code != 200:
                # A streaming response has no body loaded yet; aread() must be
                # awaited before .text (a property, not a coroutine) is valid.
                await response.aread()
                error_detail = response.text
                fallback = classify_cloud_error(error_detail)
                if fallback is not None and is_cloud_model(use_model):
                    raise fallback
                yield f"data: {json.dumps({'error': f'Ollama error: {error_detail}'})}\n\n"
                return

            async for line in response.aiter_lines():
                if not line.strip():
                    continue
                try:
                    data = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if data.get("error"):
                    fallback = classify_cloud_error(str(data["error"]))
                    if fallback is not None and is_cloud_model(use_model):
                        raise fallback
                if "message" in data and "content" in data["message"]:
                    content = data["message"]["content"]
                    yield f"data: {json.dumps({'content': content, 'done': data.get('done', False)})}\n\n"
                elif data.get("done"):
                    yield f"data: {json.dumps({'done': True})}\n\n"

    async def generate() -> AsyncIterator[str]:
        global _active_model
        async with httpx.AsyncClient(timeout=httpx.Timeout(120.0)) as client:
            try:
                try:
                    async for chunk in stream_model(client, model):
                        yield chunk
                except CloudFallback as fallback:
                    # Signed out, quota exhausted, or the probe was stale:
                    # demote to the local model and retry this request.
                    if FORCED_MODEL or model == LOCAL_MODEL:
                        yield f"data: {json.dumps({'error': f'Ollama rejected the request: {fallback}'})}\n\n"
                        return
                    if fallback.rate_limited:
                        _enter_cooldown(str(fallback))
                    _active_model = LOCAL_MODEL
                    async for chunk in stream_model(client, LOCAL_MODEL):
                        yield chunk
            except httpx.ConnectError:
                yield f"data: {json.dumps({'error': 'Could not connect to Ollama. Make sure Ollama is running on port 11434.'})}\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000, log_level="info")
