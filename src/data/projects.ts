/**
 * Project catalogue.
 *
 * `tier` drives presentation order and weight:
 *   flagship   — the infrastructure and embedded work the site is positioned around
 *   supporting — real projects that back up the flagship claims
 *   archive     — coursework and early work, collapsed behind a toggle
 *
 * `links.github` is `null` for every project whose repository is not yet public.
 * A null link renders no button at all — a button that lands on the bare GitHub
 * profile is worse than no button.
 */
export type ProjectTier = 'flagship' | 'supporting' | 'archive';

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
  tech: string[];
  category: 'web' | 'mobile' | 'ai-ml' | 'iot' | 'desktop' | 'infrastructure';
  status: 'public' | 'private' | 'coming-soon';
  tier: ProjectTier;
  links: {
    demo?: string | null;
    code?: string | null;
    github?: string | null;
  };
  image?: string;
}

export const projects: Project[] = [
  // ---------------------------------------------------------------------
  // Flagship — infrastructure and embedded systems
  // ---------------------------------------------------------------------
  {
    id: 'gps-guided-tracking-system',
    title: 'GPS-Guided Dual-Device Tracking System',
    summary: 'Autonomous tracking system using GPS, IMU, and computer vision to maintain line-of-sight between two moving platforms with precision gimbal control.',
    description: 'Advanced IoT tracking system that coordinates two Raspberry Pi-controlled gimbals to automatically point toward each other using GPS navigation, then switches to computer vision for precision LED tracking. Features real-time WiFi communication, sensor fusion (GPS/IMU/Magnetometer), and dual-mode tracking (coarse GPS + fine camera-based).',
    highlights: [
      'Dual-device GPS coordinate exchange via WiFi',
      'Autonomous GPS-based pointing with bearing calculation',
      'Real-time IMU650 sensor fusion (9-axis)',
      'Computer vision LED tracking with OpenCV',
      'SP2050 gimbal control with PID regulation',
      'Automatic mode switching (GPS → Camera tracking)',
      'Sub-pixel precision tracking in camera mode',
      'Haversine distance and elevation angle calculations',
      'Multi-threaded serial and network communication',
      'Raspberry Pi 4/5 embedded system integration'
    ],
    tech: [
      'Python',
      'OpenCV',
      'PySerial',
      'Socket Programming',
      'Raspberry Pi : 5,4',
      'IMU650 GPS Module',
      'SP2050 Gimbal Controller',
      'Computer Vision',
      'PID Control Systems',
      'Sensor Fusion',
      'Real-time Systems',
      'Network Communication'
    ],
    category: 'iot',
    // Repo link removed 2026-08-15: github.com/pmadhurn/gps-guided-tracking-system
    // returns 404 (deleted or made private). Restore the link only after
    // verifying the URL resolves.
    status: 'private',
    tier: 'flagship',
    links: {
      github: null
    }
  },
  {
    // Architecture diagram: src/components/diagrams/InfraArchitectureDiagram.tsx,
    // rendered in the project modal via the projectDiagrams registry.
    id: 'self-hosted-infrastructure',
    title: 'Self-Hosted Infrastructure — OCI ARM64 + Cloudflare Tunnel',
    summary: 'A self-managed production environment running twenty-plus self-hosted services on an ARM64 Oracle Cloud instance, reachable only through a zero-trust tunnel.',
    description: 'A self-managed production environment running twenty-plus self-hosted services on a 4-core / 24GB ARM64 Oracle Cloud instance. Public access is handled entirely through Cloudflare Tunnel with no inbound ports exposed, with subdomain routing managed via tunnel ingress rules and a catch-all fallback.',
    highlights: [
      'Twenty-plus services in continuous operation on one box: Open WebUI, n8n, Portainer, code-server, Ollama, Supabase, plus self-built apps (NavDashboard, SpeakInsights, Learn, Read, PulseBoard, FileDrop) and self-hosted Firefly III, Actual Budget, SplitPro and Obsidian LiveSync',
      'Zero-trust ingress via Cloudflare Tunnel — no public inbound ports',
      'Subdomain routing through tunnel ingress configuration with ordered catch-all',
      'Local LLM inference on ARM64 via Ollama',
      'Self-hosted Supabase with credential isolation',
      'PulseBoard monitoring with Telegram alerts, nightly verified backups of every stack, TLS at the Cloudflare edge'
    ],
    tech: [
      'Oracle Cloud (ARM64)',
      'Docker',
      'Docker Compose',
      'Cloudflare Tunnel',
      'Nginx',
      'Linux (Ubuntu)',
      'Ollama',
      'n8n',
      'Portainer',
      'PostgreSQL'
    ],
    category: 'infrastructure',
    // Repo link removed 2026-08-15: github.com/pmadhurn/OCI is a PHP
    // capacity-bypass script, NOT this infrastructure project. Linking it
    // here sent recruiters to unrelated code. Point this at a repo that
    // actually contains the compose files / tunnel config before relinking.
    status: 'private',
    tier: 'flagship',
    links: {
      github: null
    }
  },
  {
    id: 'speakinsights',
    title: 'SpeakInsights — Meeting Intelligence Platform',
    summary: 'Docker-deployable meeting platform with real-time video conferencing (20 participants), AI transcription, live captions, sentiment analysis, and RAG-based chat — running entirely on-premises.',
    description: 'A Docker-deployable meeting intelligence platform featuring LiveKit-powered video conferencing for up to 20 participants, real-time captions via Web Speech API, WhisperX transcription with speaker attribution, Ollama-powered AI summarization and task extraction, dual sentiment analysis (VADER in-meeting + Ollama post-meeting), RAG chat with meeting context, and a Glassmorphism "Frosted Aurora" UI. Every model runs locally — transcription, summarization, embeddings, and sentiment analysis make no third-party API calls, so meeting audio never leaves the deployment. Supports both Mac (Apple Silicon) and Windows (NVIDIA GPU).',
    highlights: [
      'Runs fully on-premises — no third-party API calls, all inference local',
      'LiveKit-powered WebRTC video conferencing (up to 20 participants)',
      'Real-time live captions via Web Speech API',
      'WhisperX transcription with speaker attribution',
      'AI summarization & task extraction via Ollama (llama3.2:3b)',
      'Dual sentiment analysis: VADER (real-time) + Ollama (post-meeting)',
      'RAG chat with meeting context using nomic-embed-text embeddings',
      'PostgreSQL 16 + pgvector for vector storage',
      'Async FastAPI backend with Redis-backed job queue',
      'Batched GPU inference for long-form audio',
      'Rolling container restarts via Docker Compose',
      'Meeting recording with playback support',
      'Google Calendar .ics export integration',
      'Cross-platform Docker deployment (Mac M-series & Windows NVIDIA)'
    ],
    tech: ['React 18', 'TypeScript', 'Vite', 'TailwindCSS', 'FastAPI', 'Python 3.11', 'SQLAlchemy', 'LiveKit', 'WebRTC', 'WhisperX', 'Ollama', 'PostgreSQL', 'pgvector', 'Redis', 'Zustand', 'Docker'],
    category: 'ai-ml',
    status: 'public',
    tier: 'flagship',
    links: {
      github: 'https://github.com/pmadhurn/SpeakinsightsV6'
    }
  },
  {
    id: 'learn-ai-tutor',
    title: 'Learn — Self-Hosted AI Tutor',
    summary: 'Give it a topic and it researches the web, streams a cited lesson with rendered math, quizzes you with AI-graded questions, and keeps every topic as its own chat session — routed across multiple models with automatic failover.',
    description: 'A personal tutoring app running on the same ARM64 box as the rest of the infrastructure. Each topic becomes a persistent session: the backend searches the web, pulls the top pages and Wikipedia images, then streams a structured lesson over Server-Sent Events with numbered citations and KaTeX-rendered math. A quiz round mixes multiple-choice with short-answer questions graded by a model against a rubric, ending in an examiner-style letter grade with feedback on every miss. Model calls go through a per-task routing chain (OmniRoute → Ollama cloud → local Ollama) with a first-token stall watchdog that abandons a slow model and moves to the next. Multi-user with an admin panel, streaks and XP, and password auth with HMAC-signed cookies — no paid API keys anywhere in the stack.',
    highlights: [
      'Streamed lessons over SSE with live research status, numbered citations, and KaTeX math',
      'Web research pipeline: search → top-page extraction → Wikipedia/Commons image strip, all fail-soft',
      'Quiz rounds: adaptive MCQs plus short answers graded by a model against a rubric',
      'AI examiner letter grade per round with per-question "why" explanations',
      'Per-task model routing with 30 s first-token stall failover across OmniRoute, Ollama cloud, and local models',
      'Every LLM call logged with model, latency, and outcome for routing diagnostics',
      'Per-topic chat sessions in a sidebar, ChatGPT-style, with full history',
      'Keyless YouTube video suggestions per topic',
      'Multi-user accounts (PBKDF2 hashing), admin-only user management, per-user streaks and XP',
      'Single FastAPI process serves the API and the built React SPA; SQLite in WAL mode',
      'Deployed as a systemd service behind Cloudflare Tunnel — no public inbound ports'
    ],
    tech: ['FastAPI', 'Python', 'SQLite', 'React 18', 'TypeScript', 'Vite', 'KaTeX', 'Server-Sent Events', 'Ollama', 'OmniRoute', 'httpx', 'Cloudflare Tunnel', 'systemd'],
    category: 'ai-ml',
    status: 'public',
    tier: 'flagship',
    links: {
      demo: 'https://learn.madhur.dev',
      github: 'https://github.com/pmadhurn/learn'
    }
  },
  {
    id: 'read-family-library',
    title: 'Read — Family Speed-Reading Library',
    summary: 'A private shelf for up to a dozen family members: upload EPUB, PDF, DOCX, MOBI or pull free books from Project Gutenberg and the Internet Archive, then read them one word at a time (RSVP) with streaks, XP, badges and a weekly league. Works offline as an installed app.',
    description: 'Books are uploaded once (chunked to get under the CDN body limit), parsed into clean chapters by a per-format pipeline — EPUB TOC and PDF outline splitting, running-header and page-number removal, hyphen rejoin, OCR for scans, duplicate detection — and shared by everyone behind one family passcode. The RSVP reader pins the optimal recognition point, splits Hindi, Sanskrit and Gujarati text by grapheme cluster, and keeps word timing on absolute deadlines so the average speed is exact at 1000 WPM. Only words actually flashed while playing count: the server de-duplicates re-reads, caps speed, and is the sole source of XP. Streaks follow IST days with automatic freezes, all reconciled lazily so no cron job can cost anyone a streak. A service worker precaches the shell and keeps any book saved for offline reading, with progress queued locally and synced later. Deployed with Docker Compose behind Cloudflare Tunnel.',
    highlights: [
      'Import pipeline per format (EPUB, PDF, TXT, DOCX, HTML, Markdown, MOBI/AZW3, pasted text, web articles) with DRM, scan and corruption detection',
      'Search and add free books straight from Project Gutenberg and the Internet Archive',
      'RSVP reader: fixed ORP, punctuation pauses, ramp-up, chunk mode, paused context view, bookmarks, dictionary',
      'Devanagari and Gujarati support: grapheme-cluster splitting, bundled Noto fonts, Sanskrit chapter detection, Indic OCR',
      'Server-verified reading: 10-minute re-read window, speed cap, XP, levels, 15 badges, weekly league with tiers',
      'Streaks on IST days with auto freezes, reconciled lazily instead of by cron',
      'Installable PWA: shell precached, "Keep offline" per book, offline reading synced on reconnect',
      'One shared passcode with generation-stamped cookies (changing it signs out every device), admin PIN, per-IP lockout',
      'Daily database dumps with 14-day retention and a streamed full-backup download',
      'Stats: per-day charts, year heatmap, per-book, profile compare, year in review',
      'Requirement-by-requirement traceability doc with what is and is not verified'
    ],
    tech: ['FastAPI', 'Python', 'PostgreSQL', 'PyMuPDF', 'Tesseract', 'Vanilla JS (ES modules)', 'Service Worker', 'Web Push', 'Docker Compose', 'Nginx', 'Cloudflare Tunnel', 'Playwright'],
    category: 'web',
    status: 'public',
    tier: 'flagship',
    links: {
      demo: 'https://read.madhur.dev',
      github: 'https://github.com/pmadhurn/read'
    }
  },
  {
    // Architecture diagram: src/components/diagrams/NavDashboardArchitectureDiagram.tsx.
    // Code link deliberately absent until the repo is scrubbed of internal
    // notes (see 2026-08-15 session log); the live demo is the link that counts.
    id: 'navdashboard',
    title: 'NavDashboard — Asset & Operations Tracking Platform',
    summary: 'A live, self-hosted operations platform for tracking devices, inventory, and personnel — modular async FastAPI backend, per-section access control, QR-based gate-pass workflows, and an AI assistant grounded on operational data.',
    description: 'A production operations dashboard running at nav.madhur.dev for tracking devices, assets, inventory, and personnel. The backend is a modular async FastAPI monolith — each feature (devices, inventory, attendance, exports, audit trail, and more) is its own module with router, service, and repository layers — over PostgreSQL with PostGIS and pgvector, Redis, and MinIO object storage. Access control is a per-section permission engine: every account carries a section-to-level map (view / edit / manage) enforced on each route rather than a handful of coarse roles. Physical stock movement is modeled end-to-end: QR label printing, camera scanning, and outward → gate pass → scan-to-tick inward flows. Deployed with Docker Compose behind nginx as the single published port, reached through a zero-trust Cloudflare Tunnel, with an AI assistant answering questions over live operational data via local Ollama inference.',
    highlights: [
      'Live deployment at nav.madhur.dev behind Cloudflare Tunnel',
      'Modular async FastAPI backend — per-feature router/service/repository modules',
      'Per-section permission engine (view / edit / manage) enforced per route',
      'QR label printing and camera scanning for stock movement',
      'Outward → gate pass → scan-to-tick inward workflow for physical assets',
      'Attendance, exports, notifications, and full audit trail',
      'AI assistant grounded on operational data via local Ollama inference',
      'PostgreSQL + PostGIS + pgvector, Redis, MinIO object storage',
      'Alembic migrations with route-sweep and coverage verification scripts',
      'nginx as the single published port — all other services internal'
    ],
    tech: ['React 18', 'TypeScript', 'Vite', 'Ant Design', 'TanStack Query', 'Zustand', 'FastAPI', 'SQLAlchemy 2 (async)', 'PostgreSQL', 'PostGIS', 'pgvector', 'Redis', 'MinIO', 'Nginx', 'Docker Compose', 'Ollama'],
    category: 'web',
    status: 'private',
    tier: 'flagship',
    links: {
      demo: 'https://nav.madhur.dev',
      github: null
    }
  },
  {
    id: 'esp32-drone-controller',
    title: 'ESP32 WiFi Drone with Android Controller',
    summary: 'Custom-built drone with ESP32 WiFi control system and Python-based Android app for remote operation.',
    description: 'A drone system in development featuring ESP32-based flight controller with WiFi connectivity and a Python-powered Android application for wireless control and monitoring.',
    highlights: [
      'ESP32 WiFi-based flight control',
      'Python-powered Android controller app',
      'Real-time wireless communication',
      'Flight control algorithms development',
      'Remote telemetry system',
      'Hardware assembly and testing'
    ],
    tech: ['ESP32', 'Python', 'Android', 'WiFi', 'IoT', 'Drone Technology'],
    category: 'iot',
    status: 'coming-soon',
    tier: 'flagship',
    links: {
      github: null
    }
  },

  // ---------------------------------------------------------------------
  // Supporting
  // ---------------------------------------------------------------------
  {
    id: 'pulseboard',
    title: 'PulseBoard — Server Health Dashboard',
    summary: 'Zero-dependency Node.js monitoring for the ARM64 server: a public status page, a key-protected full dashboard with 24-hour history, and a Telegram alert engine.',
    description: 'One server file and one HTML file, no npm packages. A background sampler ticks every 30 seconds into a persisted ring buffer and renders canvas charts for CPU, memory, swap, network and disk IO. Service checks cover every hosted app (HTTP probes plus a state-file probe for a process with no port). Alerts for sustained CPU or load, memory, swap, disk, service down or recovered with two-strike anti-flap, and container stop/start go to an in-dashboard feed and to Telegram with per-rule cooldowns. The public status page hides internal services unless unlocked with the access key.',
    highlights: [
      'Public status page with latency and 24-hour uptime per service',
      'Per-core CPU, memory, swap, load, network, disk, docker per-container stats, top processes',
      '30-second sampler with persisted 24-hour history and canvas charts',
      'Alert engine with anti-flap and cooldowns, delivered to Telegram',
      'No dependencies: Node.js standard library only'
    ],
    tech: ['Node.js', 'HTML Canvas', 'systemd', 'Telegram Bot API', 'Cloudflare Tunnel'],
    category: 'infrastructure',
    status: 'public',
    tier: 'supporting',
    links: {
      demo: 'https://health.madhur.dev',
      github: 'https://github.com/pmadhurn/pulseboard'
    }
  },
  {
    id: 'filedrop',
    title: 'FileDrop — Temporary File Sharing',
    summary: 'Self-hosted file sharing: upload a batch, get a short link, everything is hard-deleted after 24 hours. Optional password and download limits.',
    description: 'A small Docker service behind Cloudflare Tunnel with no inbound ports. Shares get a four-to-six letter id that also works on the apex domain through an nginx shim which forwards share-shaped paths to FileDrop and lets everything else fall through to the portfolio. Rate-limited, password-protectable shares with per-share download caps, an admin page, and a scheduled sweeper that removes expired files.',
    highlights: [
      'Short links on two hostnames via an nginx path-shim in front of the main site',
      'Password protection, download limits and hard expiry per share',
      'Rate limiting and a 20 GB cap; admin page for live shares',
      'Loopback-only containers, public only through Cloudflare Tunnel'
    ],
    tech: ['Node.js', 'Docker', 'Nginx', 'Cloudflare Tunnel'],
    category: 'infrastructure',
    status: 'public',
    tier: 'supporting',
    links: {
      demo: 'https://link.madhur.dev',
      github: 'https://github.com/pmadhurn/filedrop'
    }
  },
  {
    id: 'iot-smart-plant-pot',
    title: 'IoT Smart Plant Pot',
    summary: 'ESP32-powered smart plant monitoring with moisture sensing, LED indicators, and gesture controls.',
    description: 'IoT device that monitors plant health using sensors and provides visual/audio feedback with gesture-based interaction.',
    highlights: [
      'ESP32 microcontroller integration',
      'Soil moisture monitoring',
      'LED level indicators',
      'Buzzer alert system',
      'Hand-gesture snooze functionality'
    ],
    tech: ['ESP32', 'Arduino', 'C++', 'IoT'],
    category: 'iot',
    status: 'public',
    tier: 'supporting',
    links: {
      github: null
    }
  },
  {
    id: 'heart-attack-prediction',
    title: 'Heart Attack Prediction Model',
    summary: 'Machine learning model achieving 87.85% accuracy for heart attack risk prediction.',
    description: 'ML model built with TensorFlow for predicting heart attack risk based on medical indicators and lifestyle factors.',
    highlights: [
      '87.85% prediction accuracy',
      'Feature engineering and selection',
      'Model validation and testing',
      'Kaggle/Colab deployment'
    ],
    tech: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy'],
    category: 'ai-ml',
    status: 'public',
    tier: 'supporting',
    links: {
      github: null
    }
  },
  {
    id: 'line-of-sight-checker',
    title: 'Line of Sight Checker Web App',
    summary: 'Geospatial web application that analyzes line of sight between two points using Google Earth and Maps APIs.',
    description: 'Web application that determines whether there is a clear line of sight between two geographical locations using elevation data and 3D terrain analysis.',
    highlights: [
      'Google Earth API integration',
      'Google Maps API for location selection',
      'Real-time line of sight calculations',
      'Elevation profile analysis',
      '3D terrain visualization',
      'AI-assisted development workflow'
    ],
    tech: ['JavaScript', 'Google Earth API', 'Google Maps API', 'HTML5', 'CSS3', 'Geospatial Analysis'],
    category: 'web',
    status: 'public',
    tier: 'supporting',
    links: {
      github: null
    }
  },
  {
    id: 'data-sharing-app',
    title: 'Data Sharing App (Networking/IoT)',
    summary: 'Lightweight local network file and data sharing utility for seamless device communication.',
    description: 'Network application enabling efficient file and data sharing across devices on local networks using ESP32 and Python.',
    highlights: [
      'Local network communication',
      'File sharing capabilities',
      'Cross-device compatibility',
      'Lightweight architecture'
    ],
    tech: ['Python', 'ESP32', 'Networking', 'IoT'],
    category: 'iot',
    status: 'public',
    tier: 'supporting',
    links: {
      github: null
    }
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    summary: 'Modern, responsive portfolio website showcasing projects, skills, and experience with seamless user experience.',
    description: 'A portfolio website built with React and TypeScript, featuring project showcases, skills visualization, and responsive design, currently hosted on Vercel.',
    highlights: [
      'Modern React & TypeScript architecture',
      'Responsive design across all devices',
      'Interactive project filtering and modals',
      'Optimized performance and SEO',
      'Vercel deployment with CI/CD',
      'Clean, professional UI/UX design'
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Vite'],
    category: 'web',
    status: 'public',
    tier: 'supporting',
    links: {
      github: null
    }
  },

  // ---------------------------------------------------------------------
  // Archive — coursework and early projects
  // ---------------------------------------------------------------------
  {
    id: 'online-shoe-shopping',
    title: 'Online Shoe Shopping Website',
    summary: 'E-commerce prototype with product listing, shopping cart functionality, and responsive UI.',
    description: 'Full-stack e-commerce application built with MERN stack, featuring product catalog, user authentication, and order management.',
    highlights: [
      'Product catalog with filtering',
      'Shopping cart functionality',
      'User authentication',
      'Responsive design',
      'RESTful API architecture'
    ],
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs'],
    category: 'web',
    status: 'public',
    tier: 'archive',
    links: {
      github: null
    }
  },
  {
    id: 'android-apps',
    title: 'Android Applications Suite',
    summary: 'Calculator, Notes & Reminders, and Expense Tracker apps with persistent storage and polished UI.',
    description: 'Collection of native Android applications showcasing different UI patterns and data persistence strategies.',
    highlights: [
      'Calculator with advanced operations',
      'Notes app with reminders',
      'Expense tracker with categories',
      'SQLite database integration',
      'Material Design UI'
    ],
    tech: ['Java', 'Android Studio', 'SQLite', 'XML'],
    category: 'mobile',
    status: 'public',
    tier: 'archive',
    links: {
      github: null
    }
  },
  {
    id: 'python-gui-systems',
    title: 'Python GUI Management Systems',
    summary: 'Library, Banking, Restaurant, and Telephone Directory management systems with Tkinter UIs.',
    description: 'Collection of desktop applications built with Python and Tkinter, featuring complete CRUD operations and user-friendly interfaces.',
    highlights: [
      'Library Management with book tracking',
      'Banking system with account management',
      'Restaurant ordering and inventory',
      'Telephone directory with search'
    ],
    tech: ['Python', 'Tkinter', 'MySQL'],
    category: 'desktop',
    status: 'public',
    tier: 'archive',
    links: {
      github: null
    }
  },
  {
    id: 'java-library-management',
    title: 'Java Library Management System (CLI)',
    summary: 'Terminal-based Library Management System with CRUD operations, search functionality, and issue/return tracking.',
    description: 'A command-line interface application for managing library operations including book inventory, member management, and lending operations.',
    highlights: [
      'Complete CRUD operations',
      'Advanced search functionality',
      'Issue and return tracking',
      'Member management system'
    ],
    tech: ['Java'],
    category: 'desktop',
    status: 'public',
    tier: 'archive',
    links: {
      github: null
    }
  },
  {
    id: 'ball-catching-game',
    title: 'Ball Catching Game',
    summary: 'Simple arcade-style game built with C/C++ featuring engaging gameplay mechanics.',
    description: 'Classic arcade game implementation showcasing game development fundamentals and C/C++ programming skills.',
    highlights: [
      'Real-time game mechanics',
      'Score tracking system',
      'Collision detection',
      'Graphics rendering'
    ],
    tech: ['C', 'C++', 'Game Development'],
    category: 'desktop',
    status: 'public',
    tier: 'archive',
    links: {
      github: null
    }
  },
  {
    id: 'weather-app',
    title: 'Weather App with OpenWeather API',
    summary: 'Real-time weather application with location search and detailed forecasts.',
    description: 'React-based weather application that provides current weather conditions and forecasts using the OpenWeather API.',
    highlights: [
      'Real-time weather data',
      'Location-based search',
      'Detailed forecasts',
      'Responsive design'
    ],
    tech: ['React', 'OpenWeather API', 'JavaScript'],
    category: 'web',
    status: 'public',
    tier: 'archive',
    links: {
      github: null
    }
  },
  {
    id: 'ai-agent-deployment',
    title: 'AI Agent Deployment & Data Science',
    summary: 'Deployed AI agents on Google Colab with data labeling and insights extraction capabilities.',
    description: 'AI workflow for automated data processing, labeling, and insights generation using cloud-based deployment.',
    highlights: [
      'Google Colab deployment',
      'Automated data labeling',
      'Insights extraction',
      'Cloud-based processing'
    ],
    tech: ['Python', 'Google Colab', 'TensorFlow', 'Data Science'],
    category: 'ai-ml',
    status: 'private',
    tier: 'archive',
    links: {
      github: null
    }
  }
];

export const categories = [
  { id: 'all', label: 'All Projects', count: projects.length },
  { id: 'infrastructure', label: 'Infrastructure', count: projects.filter(p => p.category === 'infrastructure').length },
  { id: 'iot', label: 'Embedded & IoT', count: projects.filter(p => p.category === 'iot').length },
  { id: 'ai-ml', label: 'AI/ML', count: projects.filter(p => p.category === 'ai-ml').length },
  { id: 'web', label: 'Web Development', count: projects.filter(p => p.category === 'web').length },
  { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
  { id: 'desktop', label: 'Desktop', count: projects.filter(p => p.category === 'desktop').length },
];
