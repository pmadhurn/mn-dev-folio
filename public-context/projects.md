# Projects

Mirrors `src/data/projects.ts`. Flagship projects first — these are the ones to lead with.

## Flagship

### GPS-Guided Dual-Device Tracking System
Repository: https://github.com/pmadhurn/gps-guided-tracking-system

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
Repository: https://github.com/pmadhurn/OCI

A self-managed production environment running six containerized services on a 4-core / 24GB
ARM64 Oracle Cloud instance. Public access is handled entirely through Cloudflare Tunnel with
no inbound ports exposed, with subdomain routing managed via tunnel ingress rules and a
catch-all fallback.

- Six containerized services in continuous operation (Open WebUI, n8n, Portainer, code-server, Ollama, Supabase)
- Zero-trust ingress via Cloudflare Tunnel — no public inbound ports
- Subdomain routing through tunnel ingress configuration with ordered catch-all
- Local LLM inference on ARM64 via Ollama
- Self-hosted Supabase with credential isolation
- Service monitoring, backup, and TLS certificate management

Tech: Oracle Cloud (ARM64), Docker, Docker Compose, Cloudflare Tunnel, Nginx, Linux (Ubuntu),
Ollama, n8n, Portainer, PostgreSQL.

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

### ESP32 WiFi Drone with Android Controller
Repository: not yet public.

A drone system in development featuring an ESP32-based flight controller with WiFi
connectivity and a Python-powered Android application for wireless control and monitoring.

Tech: ESP32, Python, Android, WiFi, IoT.

## Supporting

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

Only three repositories are public: the GPS tracking system, the OCI infrastructure, and
SpeakInsights. For anything else, say the code is available on request rather than implying
a public link exists.
