import { X, ExternalLink, Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const getStatusBadge = (status) => {
    const badges = {
      public: { label: 'Public Repository', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      private: { label: 'Available on Request', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
      'coming-soon': { label: 'Coming Soon', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' }
    };
    const badge = badges[status] || badges.public;
    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-heading font-bold pr-8 flex items-center gap-2">
                {project.title}
                {project.featured && (
                  <Star size={20} className="text-yellow-500 fill-current" />
                )}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Links */}
          <div className="flex flex-wrap items-center gap-4 pb-4 border-b">
            {getStatusBadge(project.status)}
            <div className="flex items-center gap-2 ml-auto">
              {project.links.demo && (
                <Button
                  variant="default"
                  onClick={() => window.open(project.links.demo, '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </Button>
              )}
              {(project.links.code || project.links.github) && (
                <Button
                  variant="outline"
                  onClick={() => window.open(project.links.code || project.links.github, '_blank')}
                  className="flex items-center gap-2"
                >
                  <Github size={16} />
                  {project.status === 'private' ? 'Request Access' : 'View Code'}
                </Button>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Project Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold">Key Features & Highlights</h3>
              <ul className="grid gap-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium">Project Category</h4>
            <p className="text-sm text-muted-foreground capitalize">
              {project.category.replace('-', '/')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;