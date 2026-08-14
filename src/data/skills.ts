/**
 * Single source of truth for the skills grid.
 *
 * Kept free of React/lucide imports so it can also be consumed by the
 * build-time prerenderer (see scripts/prerender.ts), which runs in Node.
 *
 * Proficiency policy: at most five skills carry `expert`. Everything else tops
 * out at `advanced`. A page where a third of the entries claim expertise tells
 * a reader nothing except that the ratings are unweighted.
 */
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  name: string;
  level?: SkillLevel;
  highlighted?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  /** Key into the lucide icon map in Skills.tsx. */
  icon: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'devops',
    title: 'Infrastructure & Cloud',
    icon: 'Cloud',
    color: 'from-cyan-500 to-teal-500',
    skills: [
      { name: 'Docker', level: 'advanced', highlighted: true },
      { name: 'Docker Compose', level: 'advanced', highlighted: true },
      { name: 'Cloudflare Tunnel', level: 'advanced', highlighted: true },
      { name: 'Nginx', level: 'advanced' },
      { name: 'Oracle Cloud', level: 'advanced' },
      { name: 'Git/GitHub', level: 'expert' },
      { name: 'CI/CD', level: 'intermediate' },
      { name: 'Vercel', level: 'advanced' },
      { name: 'AWS', level: 'intermediate' },
      { name: 'GCP', level: 'intermediate' },
    ]
  },
  {
    id: 'embedded',
    title: 'Embedded & IoT',
    icon: 'Cpu',
    color: 'from-orange-600 to-amber-700',
    skills: [
      { name: 'Raspberry Pi', level: 'advanced', highlighted: true },
      { name: 'ESP32', level: 'advanced', highlighted: true },
      { name: 'Arduino', level: 'advanced' },
      { name: 'Serial / I2C', level: 'intermediate' },
      { name: 'Tinkercad', level: 'intermediate' },
    ]
  },
  {
    id: 'systems',
    title: 'Operating Systems',
    icon: 'Monitor',
    color: 'from-stone-500 to-stone-600',
    skills: [
      { name: 'Linux/Ubuntu', level: 'advanced', highlighted: true },
      { name: 'macOS', level: 'advanced' },
      { name: 'Windows', level: 'advanced' },
    ]
  },
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: 'Code2',
    color: 'from-amber-500 to-orange-600',
    skills: [
      { name: 'Python', level: 'expert', highlighted: true },
      { name: 'JavaScript', level: 'expert' },
      { name: 'TypeScript', level: 'advanced' },
      { name: 'C++', level: 'intermediate' },
      { name: 'C', level: 'intermediate' },
      { name: 'Java', level: 'intermediate' },
      { name: 'SQL', level: 'advanced' },
      { name: 'Bash', level: 'intermediate' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: 'Server',
    color: 'from-orange-500 to-amber-600',
    skills: [
      { name: 'Node.js', level: 'expert' },
      { name: 'Python/FastAPI', level: 'advanced', highlighted: true },
      { name: 'Express.js', level: 'advanced' },
      { name: 'REST APIs', level: 'advanced' },
      { name: 'GraphQL', level: 'intermediate' },
    ]
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    icon: 'Database',
    color: 'from-cyan-600 to-teal-700',
    skills: [
      { name: 'PostgreSQL', level: 'advanced', highlighted: true },
      { name: 'MongoDB', level: 'advanced' },
      { name: 'MySQL', level: 'advanced' },
      { name: 'Redis', level: 'intermediate' },
      { name: 'SQLite', level: 'advanced' },
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI/ML & Data Science',
    icon: 'Brain',
    color: 'from-yellow-400 to-amber-500',
    skills: [
      { name: 'OpenCV', level: 'intermediate', highlighted: true },
      { name: 'Pandas', level: 'advanced' },
      { name: 'NumPy', level: 'advanced' },
      { name: 'TensorFlow', level: 'intermediate' },
      { name: 'scikit-learn', level: 'intermediate' },
      { name: 'PyTorch', level: 'intermediate' },
      { name: 'Ollama (local inference)', level: 'intermediate' },
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'Layout',
    color: 'from-teal-500 to-cyan-600',
    skills: [
      { name: 'React.js', level: 'expert' },
      { name: 'Tailwind CSS', level: 'advanced' },
      { name: 'HTML5/CSS3', level: 'advanced' },
      { name: 'Next.js', level: 'intermediate' },
      { name: 'Framer Motion', level: 'intermediate' },
      { name: 'Figma', level: 'intermediate' },
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: 'Smartphone',
    color: 'from-teal-400 to-emerald-500',
    skills: [
      { name: 'Android/Kotlin', level: 'intermediate' },
      { name: 'Android Studio', level: 'intermediate' },
      { name: 'React Native', level: 'intermediate' },
    ]
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    icon: 'Wrench',
    color: 'from-amber-600 to-orange-700',
    skills: [
      { name: 'VS Code', level: 'advanced' },
      { name: 'AI-assisted development (Claude, Copilot, Cursor)', level: 'advanced' },
      { name: 'Postman', level: 'advanced' },
      { name: 'Warp Terminal', level: 'advanced' },
      { name: 'n8n', level: 'intermediate' },
    ]
  }
];
