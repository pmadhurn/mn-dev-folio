import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Layout, Server, Database, Brain, Smartphone, 
  Cpu, Cloud, Monitor, Wrench, Sparkles, Bot, Search, X
} from 'lucide-react';
import { skillCategories } from '@/data/skills';

const iconMap: Record<string, React.ElementType> = {
  Code2, Layout, Server, Database, Brain, Smartphone,
  Cpu, Cloud, Monitor, Wrench, Sparkles, Bot,
};

const iconFor = (key: string): React.ElementType => iconMap[key] ?? Code2;

// Proficiency level config
// The ramp runs neutral -> accent -> primary -> both, so proficiency reads as
// "how far along the brand gradient" rather than as four unrelated hues.
const levelConfig = {
  beginner: { scale: 0.25, color: 'bg-muted-foreground/40', label: 'Beginner' },
  intermediate: { scale: 0.5, color: 'bg-accent', label: 'Intermediate' },
  advanced: { scale: 0.75, color: 'bg-primary', label: 'Advanced' },
  expert: { scale: 1, color: 'bg-gradient-to-r from-primary to-accent', label: 'Expert' }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Memoized calculations
  const totalSkills = useMemo(() => 
    skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0),
    []
  );

  const filteredCategories = useMemo(() => {
    let categories = selectedCategory === 'all' 
      ? skillCategories 
      : skillCategories.filter(cat => cat.id === selectedCategory);
    
    if (searchQuery.trim()) {
      categories = categories.map(cat => ({
        ...cat,
        skills: cat.skills.filter(skill => 
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.skills.length > 0);
    }
    
    return categories;
  }, [selectedCategory, searchQuery]);

  const categoryFilters = useMemo(() => [
    { id: 'all', label: 'All Skills', count: totalSkills, icon: 'Code2' },
    ...skillCategories.map(cat => ({
      id: cat.id,
      label: cat.title.split(' ')[0],
      count: cat.skills.length,
      icon: cat.icon
    }))
  ], [totalSkills]);

  const handleCategoryChange = useCallback((id: string) => {
    setSelectedCategory(id);
    setSearchQuery('');
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <section id="skills" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow mb-4">
              Technical Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Skills & Technologies
            </h2>
            {/* Matches the divider every other section uses. The previous
                version had a permanently pulsing dot — an animation with no
                state to report, running forever in the corner of the eye. */}
            <div className="h-1 w-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary via-primary-glow to-accent" />

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A toolkit spanning{' '}
              <span className="text-primary font-medium">{totalSkills}+ technologies</span>{' '}
              across infrastructure, embedded systems, backend, and application development
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-[border-color,box-shadow] duration-200 ease-out"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Category Filters - Scrollable on mobile */}
          <motion.div 
            className="mb-12 overflow-x-auto pb-4 scrollbar-hide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-2 justify-start lg:justify-center min-w-max lg:min-w-0 px-4 lg:px-0">
              {categoryFilters.map((category) => {
                const Icon = iconFor(category.icon);
                const isActive = selectedCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                      transition-[background-color,color,border-color,box-shadow,transform] duration-300 whitespace-nowrap
                      ${isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                        : 'bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                                        <span className={`
                      text-xs px-2 py-0.5 rounded-full
                      ${isActive ? 'bg-white/20' : 'bg-muted'}
                    `}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCategories.map((category) => {
                const Icon = iconFor(category.icon);
                
                return (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-[border-color,box-shadow] duration-300 hover:shadow-xl hover:shadow-primary/5"
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground">
                          {category.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {category.skills.length} skills
                        </p>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, index) => (
                        <div
                          key={skill.name}
                          className="relative"
                          onMouseEnter={() => setHoveredSkill(`${category.id}-${index}`)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <span
                            className={`
                              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                              transition-[background-color,color] duration-300 cursor-default
                              ${skill.highlighted
                                ? 'bg-primary/15 text-primary border border-primary/30 font-medium'
                                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                              }
                            `}
                          >
                            {skill.highlighted && (
                              <Sparkles className="w-3 h-3" />
                            )}
                            {skill.name}
                          </span>

                          {/* Tooltip with proficiency */}
                          <AnimatePresence>
                            {hoveredSkill === `${category.id}-${index}` && skill.level && (
                              <motion.div
                                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50"
                              >
                                <div className="bg-popover border border-border rounded-lg shadow-xl p-3 min-w-[140px]">
                                  <p className="text-xs font-medium text-foreground mb-2">
                                    {skill.name}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: levelConfig[skill.level].scale }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        style={{ transformOrigin: 'left' }}
                                        className={`h-full w-full ${levelConfig[skill.level].color} rounded-full`}
                                      />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-medium">
                                      {levelConfig[skill.level].label}
                                    </span>
                                  </div>
                                  {/* Tooltip arrow */}
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>

                    {/* Decorative gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`} />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No skills found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try searching for something else
              </p>
              <button
                onClick={clearSearch}
                className="text-primary hover:underline font-medium"
              >
                Clear search
              </button>
            </motion.div>
          )}

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-2 gap-4 max-w-md mx-auto"
          >
            {[
              { label: 'Technologies', value: totalSkills + '+', icon: Code2 },
              { label: 'Categories', value: skillCategories.length, icon: Layout },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;