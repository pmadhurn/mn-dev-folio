import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { projectDiagrams } from '@/components/diagrams';
import Media from '@/components/site/Media';
import { CATEGORY_LABEL, STATUS_LABEL, shortTitle, subTitle } from '@/components/site/labels';
import { projectMedia } from '@/data/media';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

/** Full project write-up: image, overview, architecture, highlights, stack. */
const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const Diagram = projectDiagrams[project.id];
  const image = projectMedia[project.id];
  const repo = project.links.code || project.links.github;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="block max-h-[92vh] max-w-5xl gap-0 overflow-y-auto rounded-none border-white/10 bg-ink p-0 sm:rounded-none">
        {image && <Media name={image} sizes="(min-width: 1024px) 64rem, 100vw" className="grade aspect-[21/9] w-full" />}

        <div className="p-6 md:p-10">
          <DialogHeader className="space-y-0 text-left">
            <p className="t-label mb-5 flex flex-wrap gap-x-4 gap-y-1 text-steel">
              <span>{CATEGORY_LABEL[project.category]}</span>
              <span>{STATUS_LABEL[project.status]}</span>
              {project.tier === 'flagship' && <span>Flagship</span>}
            </p>
            <DialogTitle className="t-title pr-8 text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] text-white">{shortTitle(project)}</DialogTitle>
            {subTitle(project) && <p className="t-subtitle mt-3 text-bone/80">{subTitle(project)}</p>}
            <DialogDescription className="mt-6 text-base leading-relaxed text-steel md:text-lg">{project.summary}</DialogDescription>
          </DialogHeader>

          {(project.links.demo || repo) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                  Open live <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              {repo && (
                <a href={repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  {project.status === 'private' ? 'Request access' : 'View code'} <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          )}

          <section className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[12rem_1fr]">
            <h3 className="t-label text-steel">Overview</h3>
            <p className="t-body text-bone/90">{project.description}</p>
          </section>

          {Diagram && (
            <section className="mt-12 border-t border-white/10 pt-8">
              <h3 className="t-label mb-6 text-steel">Architecture</h3>
              <Diagram />
            </section>
          )}

          {project.highlights.length > 0 && (
            <section className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[12rem_1fr]">
              <h3 className="t-label text-steel">Highlights</h3>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="t-body flex gap-4 text-bone/90">
                    <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-steel" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[12rem_1fr]">
            <h3 className="t-label text-steel">Stack</h3>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="t-label border border-white/15 px-3 py-2 text-bone">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
