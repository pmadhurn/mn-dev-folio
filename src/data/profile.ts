/**
 * Site-level facts about Madhur, in one place.
 *
 * Consumed by the build-time prerenderer (scripts/prerender.ts) so that the
 * static HTML snapshot, llms.txt and the React app cannot drift apart.
 * Intentionally free of React imports so it can run in Node during the build.
 */

export const profile = {
  name: 'Madhur N Patel',
  alternateNames: ['Madhur Patel', 'Madhur'],
  headline: 'Infrastructure & Embedded Systems Engineer',
  location: 'Ahmedabad, Gujarat, India',
  email: 'pmadhurn@gmail.com',
  phone: '+91 9016273812',
  siteUrl: 'https://madhur.dev',
  summary:
    'Infrastructure and embedded systems engineer in Ahmedabad, India. Builds and operates self-managed Linux infrastructure, containerized services, and sensor-fusion systems on Raspberry Pi and ESP32.',
  bio: [
    'I build and operate the layer where software meets hardware.',
    'That means a production environment I run myself — six containerized services on an ARM64 cloud instance, reachable only through a zero-trust tunnel, with no inbound ports open. It also means systems that talk to physical devices: a pair of Raspberry Pi gimbals that find each other by GPS bearing, then hand off to computer vision for fine tracking, fusing IMU and magnetometer data along the way.',
    'B.Tech in Computer Science and Engineering from Indus University, Ahmedabad. I\'m looking for infrastructure, embedded, or platform engineering work — ideally somewhere that ships physical products.',
  ],
  currentFocus:
    'Looking for infrastructure, embedded, or platform engineering work — ideally somewhere that ships physical products.',
  education: {
    degree: 'Bachelor of Technology (B.Tech), Computer Science and Engineering',
    institution: 'Indus University, Ahmedabad',
    duration: '2022 — 2026',
    gpa: '8.5/10',
  },
  links: {
    github: 'https://github.com/pmadhurn',
    linkedin: 'https://linkedin.com/in/madhur-n',
    x: 'https://x.com/pmadhurn',
    resume: '/Madhur_N_Patel_Resume.pdf',
  },
} as const;
