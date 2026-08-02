/**
 * Single source of truth for the skills grid.
 *
 * Kept free of React/lucide imports so it can also be consumed by the
 * build-time prerenderer (see scripts/prerender.ts), which runs in Node.
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
    id: 'languages',
    title: 'Programming Languages',
    icon: 'Code2',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'Python', level: 'expert', highlighted: true },
      { name: 'JavaScript', level: 'expert', highlighted: true },
      { name: 'TypeScript', level: 'advanced' },
      { name: 'Java', level: 'advanced' },
      { name: 'C++', level: 'intermediate' },
      { name: 'C', level: 'intermediate' },
      { name: 'SQL', level: 'advanced' },
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'Layout',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'React.js', level: 'expert', highlighted: true },
      { name: 'Next.js', level: 'advanced' },
      { name: 'Tailwind CSS', level: 'expert', highlighted: true },
      { name: 'HTML5/CSS3', level: 'expert' },
      { name: 'Figma', level: 'intermediate' },
      { name: 'Framer Motion', level: 'advanced' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: 'Server',
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js', level: 'expert', highlighted: true },
      { name: 'Express.js', level: 'advanced' },
      { name: 'REST APIs', level: 'expert' },
      { name: 'GraphQL', level: 'intermediate' },
      { name: 'Python/FastAPI', level: 'advanced' },
    ]
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    icon: 'Database',
    color: 'from-orange-500 to-amber-500',
    skills: [
      { name: 'MongoDB', level: 'expert', highlighted: true },
      { name: 'PostgreSQL', level: 'advanced' },
      { name: 'MySQL', level: 'advanced' },
      { name: 'Redis', level: 'intermediate' },
      { name: 'SQLite', level: 'advanced' },
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI/ML & Data Science',
    icon: 'Brain',
    color: 'from-violet-500 to-purple-500',
    skills: [
      { name: 'TensorFlow', level: 'advanced', highlighted: true },
      { name: 'PyTorch', level: 'intermediate' },
      { name: 'scikit-learn', level: 'advanced' },
      { name: 'Pandas', level: 'expert' },
      { name: 'NumPy', level: 'expert' },
      { name: 'OpenCV', level: 'intermediate' },
    ]
  },
  {
    id: 'ai-tools',
    title: 'AI Tools & Models',
    icon: 'Bot',
    color: 'from-rose-500 to-red-500',
    skills: [
      { name: 'GPT-4/ChatGPT', level: 'expert', highlighted: true },
      { name: 'Claude', level: 'expert', highlighted: true },
      { name: 'GitHub Copilot', level: 'expert' },
      { name: 'Gemini', level: 'advanced' },
      { name: 'Cursor AI', level: 'advanced' },
      { name: 'Midjourney', level: 'intermediate' },
    ]
  },
  {
    id: 'prompt',
    title: 'Prompt Engineering',
    icon: 'Sparkles',
    color: 'from-teal-500 to-cyan-500',
    skills: [
      { name: 'Chain-of-Thought', level: 'expert', highlighted: true },
      { name: 'Few-Shot Learning', level: 'expert' },
      { name: 'Role-based Prompts', level: 'advanced' },
      { name: 'Context Optimization', level: 'advanced' },
      { name: 'System Prompts', level: 'expert' },
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: 'Smartphone',
    color: 'from-lime-500 to-green-500',
    skills: [
      { name: 'React Native', level: 'intermediate' },
      { name: 'Android/Kotlin', level: 'advanced' },
      { name: 'Android Studio', level: 'advanced' },
    ]
  },
  {
    id: 'embedded',
    title: 'Embedded & IoT',
    icon: 'Cpu',
    color: 'from-sky-500 to-blue-500',
    skills: [
      { name: 'Arduino', level: 'advanced', highlighted: true },
      { name: 'ESP32', level: 'advanced' },
      { name: 'Raspberry Pi', level: 'intermediate' },
      { name: 'Tinkercad', level: 'advanced' },
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    icon: 'Cloud',
    color: 'from-indigo-500 to-blue-500',
    skills: [
      { name: 'Git/GitHub', level: 'expert', highlighted: true },
      { name: 'Docker', level: 'advanced' },
      { name: 'AWS', level: 'intermediate' },
      { name: 'Vercel', level: 'advanced' },
      { name: 'GCP', level: 'intermediate' },
      { name: 'CI/CD', level: 'intermediate' },
    ]
  },
  {
    id: 'systems',
    title: 'Operating Systems',
    icon: 'Monitor',
    color: 'from-slate-500 to-gray-500',
    skills: [
      { name: 'Linux/Ubuntu', level: 'advanced' },
      { name: 'macOS', level: 'expert' },
      { name: 'Windows', level: 'advanced' },
    ]
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    icon: 'Wrench',
    color: 'from-fuchsia-500 to-pink-500',
    skills: [
      { name: 'VS Code', level: 'expert' },
      { name: 'Cursor', level: 'advanced', highlighted: true },
      { name: 'Postman', level: 'advanced' },
      { name: 'n8n', level: 'intermediate' },
      { name: 'Warp Terminal', level: 'advanced' },
    ]
  }
];
