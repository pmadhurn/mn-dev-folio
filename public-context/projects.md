# Projects

Mirrors `src/data/projects.ts`. Flagship projects first — these are the ones to lead with.

## Flagship

### GPS-Guided Dual-Device Tracking System
Repository: available on request

Autonomous tracking system that coordinates two Raspberry Pi-controlled gimbals to point
toward each other using GPS navigation, then switches to computer vision for precision LED
tracking. Real-time WiFi communication, sensor fusion (GPS/IMU/magnetometer), and dual-mode
tracking (coarse GPS, then fine camera-based).

- Dual-device GPS coordinate exchange via WiFi
- Autonomous GPS-based pointing with bearing calculation
- Real-time IMU650 sensor fusion (9-axis)
- Computer vision LED tracking with OpenCV
- SP2050 gimbal control with PID regulation
- Automatic mode switching (GPS to camera tracking)
- Haversine distance and elevation angle calculations
- Multi-threaded serial and network communication
- Raspberry Pi 4/5 embedded system integration

Tech: Python, OpenCV, PySerial, socket programming, Raspberry Pi 4/5, IMU650 GPS module,
SP2050 gimbal controller, computer vision, PID control systems, sensor fusion, real-time systems.

### Self-Hosted Infrastructure — OCI ARM64 + Cloudflare Tunnel
Repository: available on request

A self-managed production environment running 40+ containers and around 25 public services on a
2-core / 12 GB ARM64 Oracle Cloud instance. Public access is handled entirely through Cloudflare
Tunnel with no inbound ports exposed, with subdomain routing managed via tunnel ingress rules and a
catch-all fallback.

- Around 25 public services in continuous operation on one 2-core box: Open WebUI, n8n, Portainer, code-server, Ollama, Supabase, plus self-built apps (NavDashboard, SpeakInsights, Learn, Read, PulseBoard, FileDrop) and self-hosted Firefly III, Actual Budget, SplitPro and Obsidian LiveSync
- Zero-trust ingress via Cloudflare Tunnel — no public inbound ports
- Subdomain routing through tunnel ingress configuration with ordered catch-all
- Local LLM inference on ARM64 via Ollama
- Self-hosted Supabase with credential isolation
- PulseBoard monitoring with Telegram alerts, nightly verified backups of every stack, TLS at the Cloudflare edge

Tech: Oracle Cloud (ARM64), Docker, Docker Compose, Cloudflare Tunnel, Nginx, Linux (Ubuntu),
Ollama, n8n, Portainer, PostgreSQL.

### NavDashboard — Asset & Operations Tracking Platform
Live at: https://nav.madhur.dev (login required). Repository: available on request.

A production operations dashboard for tracking devices, assets, inventory, and personnel.
Modular async FastAPI backend (each feature is its own module with router/service/repository
layers) over PostgreSQL with PostGIS and pgvector, Redis, and MinIO object storage. Access
control is a per-section permission engine — every account carries a section-to-level map
(view / edit / manage) enforced on each route. Physical stock movement is modeled end-to-end:
QR label printing, camera scanning, and outward → gate pass → scan-to-tick inward flows.
Includes attendance, exports, notifications, a full audit trail, and an AI assistant that
answers questions over live operational data via local Ollama inference. Deployed with
Docker Compose behind nginx as the single published port, reached through Cloudflare Tunnel.

Tech: React 18, TypeScript, Vite, Ant Design, TanStack Query, Zustand, FastAPI,
SQLAlchemy 2 (async), Alembic, PostgreSQL, PostGIS, pgvector, Redis, MinIO, Nginx,
Docker Compose, Ollama.

### SpeakInsights — Meeting Intelligence Platform
Repository: https://github.com/pmadhurn/SpeakinsightsV6

A Docker-deployable meeting intelligence platform with LiveKit-powered video conferencing for
up to 20 participants, real-time captions, WhisperX transcription with speaker attribution,
Ollama-powered summarization and task extraction, dual sentiment analysis, and RAG chat with
meeting context. Every model runs locally — no third-party API calls, so meeting audio never
leaves the deployment.

- Runs fully on-premises — no third-party API calls, all inference local
- LiveKit-powered WebRTC video conferencing (up to 20 participants)
- Real-time live captions via Web Speech API
- WhisperX transcription with speaker attribution
- AI summarization and task extraction via Ollama (llama3.2:3b)
- Dual sentiment analysis: VADER (real-time) and Ollama (post-meeting)
- RAG chat with meeting context using nomic-embed-text embeddings
- PostgreSQL 16 + pgvector for vector storage
- Async FastAPI backend with Redis-backed job queue
- Batched GPU inference for long-form audio
- Rolling container restarts via Docker Compose

Tech: React 18, TypeScript, Vite, TailwindCSS, FastAPI, Python 3.11, SQLAlchemy, LiveKit,
WebRTC, WhisperX, Ollama, PostgreSQL, pgvector, Redis, Zustand, Docker.

### Learn — Self-Hosted AI Tutor
Live at: https://learn.madhur.dev (login required). Repository: https://github.com/pmadhurn/learn

A personal tutoring app running on the same ARM64 server as the rest of the infrastructure.
Give it a topic and it researches the web, streams a structured lesson with numbered citations
and KaTeX-rendered math, then quizzes you with adaptive multiple-choice and short-answer
questions graded by a model against a rubric, ending in an examiner-style letter grade. Every
topic is a persistent ChatGPT-style session with follow-up chat. Model calls go through a
per-task routing chain (OmniRoute, then Ollama cloud, then local Ollama) with a first-token
stall watchdog that abandons a slow model and moves to the next. Multi-user with an admin
panel, streaks and XP, and HMAC-signed cookie auth. No paid API keys anywhere in the stack.

- Streamed lessons over Server-Sent Events with live research status and citations
- Web research pipeline: search, top-page extraction, Wikipedia/Commons images, all fail-soft
- Quiz rounds: adaptive MCQs plus AI-graded short answers, with "why" explanations
- Per-task model routing with 30-second stall failover across OmniRoute, Ollama cloud, and local
- Every LLM call logged with model, latency, and outcome
- Keyless YouTube video suggestions per topic
- Multi-user accounts, admin-only user management, per-user streaks and XP
- Single FastAPI process serves the API and the built React SPA; SQLite in WAL mode
- Deployed as a systemd service behind Cloudflare Tunnel

Tech: FastAPI, Python, SQLite, React 18, TypeScript, Vite, KaTeX, Server-Sent Events, Ollama,
OmniRoute, httpx, Cloudflare Tunnel, systemd.

### Read — Family Speed-Reading Library
Live at: https://read.madhur.dev (family passcode required). Repository: https://github.com/pmadhurn/read

A private shared library for up to a dozen family members. Books are uploaded (EPUB, PDF, TXT,
DOCX, HTML, Markdown, MOBI/AZW3, pasted text, web articles) or added straight from Project
Gutenberg and the Internet Archive, parsed into clean chapters by a per-format pipeline with DRM,
scan and duplicate detection, and read one word at a time (RSVP) with the recognition point
pinned, punctuation pauses and ramp-up. Hindi, Sanskrit and Gujarati are supported with
grapheme-cluster splitting, bundled Noto fonts and Indic OCR. Reading earns XP only for words
actually shown while playing (the server de-duplicates re-reads and caps speed), with streaks on
IST days, automatic freezes, levels, 15 badges and a weekly league. Installable as an app:
the shell is precached and any book can be kept offline, with progress synced later.

- Chunked uploads, per-format parsers (EPUB TOC / PDF outline splitting, header and page-number removal, hyphen rejoin, OCR)
- Free-book search across Project Gutenberg and the Internet Archive, downloaded server-side from allow-listed hosts
- RSVP reader with absolute-deadline timing, paused context view, bookmarks, dictionary, normal scrolling mode
- Server-verified reading and XP; streaks reconciled lazily, never by cron
- One family passcode with generation-stamped cookies, admin PIN, per-IP lockout
- Service worker: precached shell, "Keep offline" per book, offline heartbeats queued and synced
- Daily database dumps kept 14 days, streamed full-backup download
- Docs include a requirement-by-requirement table of what is and is not verified

Tech: FastAPI, Python, PostgreSQL, PyMuPDF, Tesseract, vanilla JavaScript (ES modules), Service
Worker, Web Push, Docker Compose, Nginx, Cloudflare Tunnel, Playwright tests.

### ESP32 WiFi Drone with Android Controller
Repository: not yet public.

A drone system in development featuring an ESP32-based flight controller with WiFi
connectivity and a Python-powered Android application for wireless control and monitoring.

Tech: ESP32, Python, Android, WiFi, IoT.

## Supporting

### PulseBoard — Server Health Dashboard
Live at: https://health.madhur.dev (public status page; full dashboard needs a key). Repository: https://github.com/pmadhurn/pulseboard

Zero-dependency Node.js monitoring: a 30-second sampler with persisted 24-hour history and
canvas charts for CPU, memory, swap, network and disk; per-container docker stats; HTTP and
state-file service checks for every hosted app; an alert engine (sustained CPU/load, memory,
swap, disk, service down or recovered with anti-flap, container stop/start) delivering to
Telegram with cooldowns. Tech: Node.js, HTML Canvas, systemd, Telegram Bot API.

### FileDrop — Temporary File Sharing
Live at: https://link.madhur.dev. Repository: https://github.com/pmadhurn/filedrop

Self-hosted file sharing: upload a batch, get a short link, hard-deleted after 24 hours.
Password protection, download limits, rate limiting, admin page. Short ids also work on the
apex domain through an nginx path-shim in front of the portfolio. Tech: Node.js, Docker, Nginx,
Cloudflare Tunnel.

### IoT Smart Plant Pot
ESP32-powered plant monitoring with soil moisture sensing, LED level indicators, a buzzer
alert system, and hand-gesture snooze. Tech: ESP32, Arduino, C++.

### Heart Attack Prediction Model
Machine learning model achieving 87.85% prediction accuracy for heart attack risk based on
medical indicators and lifestyle factors. Feature engineering and selection, model validation,
Kaggle/Colab deployment. Tech: Python, TensorFlow, scikit-learn, Pandas, NumPy.

### Line of Sight Checker Web App
Geospatial web application that determines whether there is a clear line of sight between two
geographical locations using elevation data and 3D terrain analysis. Tech: JavaScript, Google
Earth API, Google Maps API, HTML5, CSS3.

### Data Sharing App (Networking/IoT)
Lightweight local network file and data sharing utility for device-to-device communication.
Tech: Python, ESP32, networking.

### Personal Portfolio Website
This site — React and TypeScript, project filtering and modals, Vercel deployment with CI/CD.
Tech: React, TypeScript, Tailwind CSS, Vercel, Vite.

## Coursework and early projects

Online Shoe Shopping Website (MERN), Android Applications Suite (Java/SQLite), Python GUI
Management Systems (Tkinter), Java Library Management System (CLI), Ball Catching Game (C/C++),
Weather App with OpenWeather API (React), AI Agent Deployment & Data Science (Google Colab).

These are university coursework and early work. They are real but not representative of
current ability — steer conversations toward the flagship projects.

## Repository availability

Five repositories are public: SpeakInsights (github.com/pmadhurn/SpeakinsightsV6), Learn
(github.com/pmadhurn/learn), Read (github.com/pmadhurn/read), PulseBoard
(github.com/pmadhurn/pulseboard) and FileDrop (github.com/pmadhurn/filedrop). For every other
project, including the GPS tracking system and the self-hosted infrastructure, say the code is
available on request rather than implying a public link exists.
