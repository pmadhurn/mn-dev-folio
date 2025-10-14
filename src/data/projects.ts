export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
  tech: string[];
  category: 'web' | 'mobile' | 'ai-ml' | 'iot' | 'desktop';
  status: 'public' | 'private' | 'coming-soon';
  links: {
    demo?: string;
    code?: string;
    github?: string;
  };
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
  // Top Tier - Most Advanced & Impressive
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
    status: 'public',
    links: {
      github: 'https://github.com/pmadhurn/gps-guided-tracking-system'
    },
    featured: true
  },
  {
    id: 'speakinsights',
    title: 'SpeakInsights — Enterprise Meeting Intelligence Platform',
    summary: 'Microservices AI platform for meeting transcription, summarization, action items, and sentiment analysis.',
    description: 'A comprehensive enterprise-grade platform that transforms meeting audio into actionable insights using advanced AI models.',
    highlights: [
      'Whisper + Transformers (~95% transcription accuracy)',
      'Sub-2-minute processing for 1-hour audio (hardware-dependent)',
      'Dockerized microservices architecture',
      'PostgreSQL & Redis for data persistence',
      'Zero-downtime deployments',
      'REST APIs + MCP integration',
      'Handles 100+ concurrent users (hardware-dependent)'
    ],
    tech: ['Python', 'FastAPI', 'React', 'Streamlit', 'Docker', 'PostgreSQL', 'Redis', 'Whisper', 'Transformers'],
    category: 'ai-ml',
    status: 'private',
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: true
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: true
  },
  {
    id: 'heart-attack-prediction',
    title: 'Heart Attack Prediction Model',
    summary: 'Machine learning model achieving 87.85% accuracy for heart attack risk prediction.',
    description: 'Advanced ML model built with TensorFlow for predicting heart attack risk based on medical indicators and lifestyle factors.',
    highlights: [
      '87.85% prediction accuracy',
      'Feature engineering and selection',
      'Model validation and testing',
      'Kaggle/Colab deployment'
    ],
    tech: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy'],
    category: 'ai-ml',
    status: 'public',
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: true
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: true
  },
  // Mid Tier - Solid Full-Stack Projects
  {
    id: 'line-of-sight-checker',
    title: 'Line of Sight Checker Web App',
    summary: 'Geospatial web application that analyzes line of sight between two points using Google Earth and Maps APIs.',
    description: 'Advanced web application built with AI assistance that determines if there is a clear line of sight between two geographical locations using elevation data and 3D terrain analysis.',
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: true
  },
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: true
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: true
  },
  {
    id: 'ai-agent-deployment',
    title: 'AI Agent Deployment & Data Science',
    summary: 'Deployed AI agents on Google Colab with data labeling and insights extraction capabilities.',
    description: 'Comprehensive AI solution for automated data processing, labeling, and insights generation using cloud-based deployment.',
    highlights: [
      'Google Colab deployment',
      'Automated data labeling',
      'Insights extraction',
      'Cloud-based processing'
    ],
    tech: ['Python', 'Google Colab', 'TensorFlow', 'Data Science'],
    category: 'ai-ml',
    status: 'private',
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: false
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    summary: 'Modern, responsive portfolio website showcasing projects, skills, and experience with seamless user experience.',
    description: 'A comprehensive portfolio website built with React and TypeScript, featuring project showcases, skills visualization, and responsive design, currently hosted on Vercel.',
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: true
  },
  {
    id: 'docker-cloudflare-deployment',
    title: 'Docker Server with Cloudflare Tunneling',
    summary: 'Global project deployment setup using Docker containerization and Cloudflare tunnels for worldwide access.',
    description: 'Early deployment infrastructure project demonstrating containerized application hosting with Docker and global accessibility through Cloudflare tunnel services.',
    highlights: [
      'Docker containerization setup',
      'Cloudflare tunnel configuration',
      'Global accessibility implementation',
      'Server infrastructure management',
      'Network security and routing',
      'Cross-platform deployment strategy'
    ],
    tech: ['Docker', 'Cloudflare', 'Linux', 'Networking', 'DevOps'],
    category: 'web',
    status: 'public',
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: false
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: false
  },
  // Lower Tier - Simpler Projects
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: false
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: false
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: false
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
    links: {
      github: 'https://github.com/pmadhurn'
    },
    featured: false
  }
];

export const categories = [
  { id: 'all', label: 'All Projects', count: projects.length },
  { id: 'web', label: 'Web Development', count: projects.filter(p => p.category === 'web').length },
  { id: 'ai-ml', label: 'AI/ML', count: projects.filter(p => p.category === 'ai-ml').length },
  { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
  { id: 'iot', label: 'IoT', count: projects.filter(p => p.category === 'iot').length },
  { id: 'desktop', label: 'Desktop', count: projects.filter(p => p.category === 'desktop').length },
];

export const featuredProjects = projects.filter(p => p.featured);