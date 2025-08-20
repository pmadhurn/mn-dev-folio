import { useState } from 'react';
import { ExternalLink, Github, Search, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { projects, categories } from '@/data/projects';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const getStatusBadge = (status) => {
    const badges = {
      public: { label: 'Public', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      private: { label: 'Available on Request', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
      'coming-soon': { label: 'Coming Soon', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' }
    };
    const badge = badges[status] || badges.public;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my work spanning web development, AI/ML, mobile apps, and IoT solutions
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects, technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border'
                  }`}
                >
                  <Filter size={14} />
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="project-card cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-heading font-semibold text-lg leading-tight">
                        {project.title.split('—')[0].trim()}
                        {project.featured && (
                          <Star size={16} className="inline ml-2 text-yellow-500 fill-current" />
                        )}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Status and Links */}
                  <div className="flex items-center justify-between">
                    {getStatusBadge(project.status)}
                    <div className="flex items-center gap-2">
                      {project.links.demo && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.links.demo, '_blank');
                          }}
                        >
                          <ExternalLink size={16} />
                        </Button>
                      )}
                      {(project.links.code || project.links.github) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.links.code || project.links.github, '_blank');
                          }}
                        >
                          <Github size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;