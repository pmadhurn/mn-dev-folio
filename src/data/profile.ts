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
  headline: 'Full-Stack Developer & AI/ML Engineer',
  location: 'Ahmedabad, Gujarat, India',
  email: 'pmadhurn@gmail.com',
  phone: '+91 9016273812',
  siteUrl: 'https://madhur.dev',
  summary:
    'Full-Stack Developer and AI/ML Engineer based in Ahmedabad, India, with 3+ years of experience building web, mobile, and IoT applications. Specializes in React, Node.js, Python, and TensorFlow.',
  bio: [
    'I am a dedicated professional who loves finding better ways to work. I have a strong record of improving processes, meeting goals, and working well in teams. I enjoy solving problems and making a positive impact wherever I go.',
    'A B.Tech graduate in Computer Science and Engineering from Indus University, I specialize in full-stack development, AI/ML solutions, and IoT systems. My passion lies in creating efficient, scalable solutions that bridge the gap between complex technology and user-friendly experiences.',
  ],
  currentFocus:
    'Open to full-time roles and collaborative projects in software development, full-stack engineering, and machine learning.',
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
