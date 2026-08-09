import { useState } from 'react';
import { ExternalLink, Github, Search, Filter, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { projects, categories, type Project } from '@/data/projects';
import ProjectModal from './ProjectModal';
import Reveal from '@/components/Reveal';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // The archive is collapsed by default, but a search has to be able to reach
  // into it — otherwise searching "Java" silently returns nothing.
  const isSearching = searchTerm.trim().length > 0;
  const primaryResults = filteredProjects.filter(p => p.tier !== 'archive');
  const archivedResults = filteredProjects.filter(p => p.tier === 'archive');
  // Also expand when the active filter has no non-archive matches — otherwise
  // categories like Desktop render an empty grid above a collapsed toggle.
  const onlyArchiveMatches = primaryResults.length === 0 && archivedResults.length > 0;
  const archiveExpanded = showArchive || isSearching || onlyArchiveMatches;

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      public: { label: 'Public', className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' },
      private: { label: 'Available on Request', className: 'bg-accent/10 text-accent' },
      'coming-soon': { label: 'Coming Soon', className: 'bg-muted text-muted-foreground' }
    };
    const badge = badges[status] || badges.public;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  const renderCard = (project: Project) => {
    const isFlagship = project.tier === 'flagship';
    // A project with no repository link renders no repository button. A button
    // that lands on the bare profile page is a broken promise.
    const repoLink = project.links.code || project.links.github;
    const techShown = isFlagship ? 6 : 4;

    return (
      <div
        key={project.id}
        className={`project-card group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          isFlagship ? 'border-primary/30 shadow-md shadow-primary/5' : ''
        }`}
        onClick={() => handleProjectClick(project)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleProjectClick(project);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`font-heading font-semibold leading-tight ${isFlagship ? 'text-xl' : 'text-lg'}`}>
                {project.title.split('—')[0].trim()}
                {isFlagship && (
                  <Star size={16} className="inline ml-2 text-yellow-500 fill-current" />
                )}
              </h3>
            </div>
            <p className={`text-sm text-muted-foreground mb-3 ${isFlagship ? 'line-clamp-3' : 'line-clamp-2'}`}>
              {project.summary}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, techShown).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > techShown && (
              <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                +{project.tech.length - techShown} more
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
              {repoLink && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(repoLink, '_blank');
                  }}
                >
                  <Github size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="section-eyebrow mb-4">Selected Work</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Featured Projects
              </h2>
              <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-primary via-primary-glow to-accent mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Self-managed infrastructure, embedded and sensor-fusion systems, and the
                applications built on top of them
              </p>
            </div>
          </Reveal>

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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-[background-color,color,border-color,box-shadow] duration-300 flex items-center gap-2 ${
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
          {primaryResults.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {primaryResults.map(renderCard)}
            </div>
          )}

          {/* Coursework & early projects — present, but not competing for
              attention with the infrastructure and embedded work. */}
          {archivedResults.length > 0 && (
            <div className="mt-12">
              <button
                onClick={() => setShowArchive(!showArchive)}
                disabled={isSearching || onlyArchiveMatches}
                aria-expanded={archiveExpanded}
                aria-controls="archived-projects"
                className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full text-sm font-medium bg-card border text-muted-foreground hover:bg-primary/10 hover:text-primary transition-[background-color,color,border-color] duration-300 disabled:opacity-70 disabled:cursor-default"
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${archiveExpanded ? 'rotate-180' : ''}`}
                />
                Coursework & Early Projects ({archivedResults.length})
              </button>

              {archiveExpanded && (
                <div
                  id="archived-projects"
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                >
                  {archivedResults.map(renderCard)}
                </div>
              )}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal — stays mounted while closing so the Radix exit
          animation and focus/scroll-lock teardown can run. */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default Projects;
