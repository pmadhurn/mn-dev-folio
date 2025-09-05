import { useState } from 'react';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skillCategories = [
    {
      id: 'languages',
      title: 'Programming Languages',
      skills: ['Python', 'JavaScript', 'Java', 'C', 'C++', 'SQL', 'HTML', 'CSS', 'XML']
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      skills: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Figma']
    },
    {
      id: 'backend',
      title: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Python', 'Java']
    },
    {
      id: 'databases',
      title: 'Databases & Storage',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis']
    },
    {
      id: 'ai-ml',
      title: 'AI/ML & Data Science',
      skills: ['TensorFlow', 'scikit-learn', 'Pandas', 'NumPy', 'Prediction Models']
    },
    {
      id: 'ai-tools',
      title: 'AI Tools & Automation',
      skills: ['GPT-4/5', 'Gemini 2.5 Pro', 'Github Copilot', 'Cursor CLI', 'Gemini CLI', 'Ollama', 'n8n Automation']
    },
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering',
      skills: ['Optimizing AI interactions', 'Contextual Prompting', 'Role-based Prompts', 'Chain-of-Thought (CoT)', 'Few-Shot & Zero-Shot']
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      skills: ['Android', 'Android Studio', 'Java', 'XML']
    },
    {
      id: 'embedded',
      title: 'Embedded Systems & IoT',
      skills: ['Arduino', 'ESP32', 'C++', 'Tinkercad']
    },
    {
      id: 'devops',
      title: 'DevOps & Deployment',
      skills: ['Git & GitHub', 'Docker', 'Vercel', 'Google Cloud Console', 'AWS']
    },
    {
      id: 'systems',
      title: 'Operating Systems',
      skills: ['Linux (Ubuntu)', 'macOS', 'Windows']
    },
    {
      id: 'specialty-tools',
      title: 'Specialized Tools',
      skills: ['VirusTotal', 'Warp', 'Kiro', 'Manus', 'Jules', 'Stitch', 'MCP']
    }
  ];

  const allSkills = skillCategories.flatMap(category => category.skills);

  const categories = [
    { id: 'all', label: 'All Skills', count: allSkills.length },
    { id: 'languages', label: 'Languages', count: skillCategories.find(c => c.id === 'languages')?.skills.length || 0 },
    { id: 'frontend', label: 'Frontend', count: skillCategories.find(c => c.id === 'frontend')?.skills.length || 0 },
    { id: 'backend', label: 'Backend', count: skillCategories.find(c => c.id === 'backend')?.skills.length || 0 },
    { id: 'ai-ml', label: 'AI/ML', count: skillCategories.find(c => c.id === 'ai-ml')?.skills.length || 0 },
    { id: 'mobile', label: 'Mobile', count: skillCategories.find(c => c.id === 'mobile')?.skills.length || 0 },
    { id: 'embedded', label: 'IoT/Embedded', count: skillCategories.find(c => c.id === 'embedded')?.skills.length || 0 },
  ];

  const getDisplayedSkills = () => {
    if (selectedCategory === 'all') {
      return skillCategories;
    }
    return skillCategories.filter(category => category.id === selectedCategory);
  };

  return (
    <section id="skills" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit spanning full-stack development, AI/ML, mobile apps, and IoT systems
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="space-y-8">
            {getDisplayedSkills().map(category => (
              <div key={category.id} className="space-y-4">
                <h3 className="text-xl font-heading font-semibold text-foreground flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="skill-badge"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;