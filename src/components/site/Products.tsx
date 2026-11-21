import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { projectMedia } from '@/data/media';
import { cn } from '@/lib/utils';
import EditorialHeading from './EditorialHeading';
import Media from './Media';
import { FadeIn } from './motion';
import { useSite } from './SiteContext';
import { CATEGORY_LABEL, STATUS_LABEL, shortTitle, subTitle } from './labels';

const FEATURED = ['self-hosted-infrastructure', 'gps-guided-tracking-system', 'speakinsights'];

const repoOf = (p: Project) => p.links.code || p.links.github || null;

const byId = (id: string) => projects.find((p) => p.id === id)!;

/** Live / code / details links, shared by feature and card layouts. */
const ProjectLinks = ({ project, compact = false }: { project: Project; compact?: boolean }) => {
  const { openProject } = useSite();
  const repo = repoOf(project);
  return (
    <div className={cn('flex flex-wrap items-center', compact ? 'gap-x-6 gap-y-1' : 'gap-3')}>
      <button
        type="button"
        className={compact ? 'link-arrow' : 'btn btn-solid'}
        onClick={() => openProject(project.id)}
        aria-label={`Details: ${shortTitle(project)}`}
      >
        <span className={compact ? 'link-arrow-text' : undefined}>Details</span>
        <ArrowRight size={14} aria-hidden="true" />
      </button>
      {project.links.demo && (
        <a
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={compact ? 'link-arrow' : 'btn btn-outline'}
          aria-label={`Open ${shortTitle(project)} live`}
        >
          <span className={compact ? 'link-arrow-text' : undefined}>Live</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className={compact ? 'link-arrow' : 'btn btn-outline'}
          aria-label={`${shortTitle(project)} source code`}
        >
          <span className={compact ? 'link-arrow-text' : undefined}>Code</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
};

/** Large alternating product presentation for the headline projects. */
const ProductFeature = ({ project, index }: { project: Project; index: number }) => {
  const image = projectMedia[project.id];
  const flip = index % 2 === 1;
  return (
    <article
      id={`project-${project.id}`}
      className="group grid scroll-mt-[var(--header-h)] gap-10 border-t border-white/10 pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-16"
      aria-labelledby={`title-${project.id}`}
    >
      <FadeIn className={cn('lg:col-span-7', flip && 'lg:order-2')} y={40}>
        {image && (
          <Media
            name={image}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="grade aspect-[16/10] w-full"
          />
        )}
      </FadeIn>
      <FadeIn className={cn('flex flex-col lg:col-span-5', flip && 'lg:order-1')} delay={0.1}>
        <p className="t-label mb-6 flex gap-4 text-steel">
          <span>P-{String(index + 1).padStart(2, '0')}</span>
          <span>{CATEGORY_LABEL[project.category]}</span>
        </p>
        <h3 id={`title-${project.id}`} className="t-title text-white">
          {shortTitle(project)}
        </h3>
        {subTitle(project) && <p className="t-subtitle mt-3 text-bone/80">{subTitle(project)}</p>}
        <p className="t-body mt-6 text-steel">{project.summary}</p>
        <dl className="mt-8 text-sm">
          <div className="spec-row">
            <dt className="t-label pt-0.5 text-steel">Stack</dt>
            <dd className="text-bone">{project.tech.slice(0, 6).join(' · ')}</dd>
          </div>
          <div className="spec-row">
            <dt className="t-label pt-0.5 text-steel">Status</dt>
            <dd className="text-bone">{STATUS_LABEL[project.status]}</dd>
          </div>
          <div className="spec-row border-b">
            <dt className="t-label pt-0.5 text-steel">Highlight</dt>
            <dd className="text-bone">{project.highlights[0]}</dd>
          </div>
        </dl>
        <div className="mt-8">
          <ProjectLinks project={project} />
        </div>
      </FadeIn>
    </article>
  );
};

/** Image-led card for the rest of the work with imagery. */
export const ProductCard = ({ project }: { project: Project }) => {
  const { openProject } = useSite();
  const image = projectMedia[project.id];
  return (
    <article id={`project-${project.id}`} className="group flex w-full scroll-mt-[var(--header-h)] flex-col bg-ink">
      <button
        type="button"
        onClick={() => openProject(project.id)}
        className="relative block text-left"
        aria-label={`Details: ${shortTitle(project)}`}
        tabIndex={-1}
      >
        {image && <Media name={image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="grade aspect-[16/10] w-full" />}
        <span className="t-label absolute left-4 top-4 bg-ink/80 px-2 py-1 text-bone backdrop-blur">
          {CATEGORY_LABEL[project.category]}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="t-subtitle text-white">{shortTitle(project)}</h3>
        {subTitle(project) && <p className="t-label mt-2 text-steel">{subTitle(project)}</p>}
        <p className="t-body mt-4 line-clamp-3 text-sm text-steel">{project.summary}</p>
        <div className="mt-auto pt-6">
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </article>
  );
};

const featured = FEATURED.map(byId);
const gridProjects = projects.filter(
  (p) => p.tier !== 'archive' && !FEATURED.includes(p.id) && projectMedia[p.id],
);

/** "Products and solutions": featured projects, then a card grid. */
const Products = () => (
  <section id="work" className="section-pad bg-ink" aria-labelledby="work-heading">
    <div className="shell">
      <EditorialHeading
        id="work-heading"
        label="03 — Work"
        lines={['Built, deployed,', 'kept running.']}
        layout="split"
        lede="Every project here is either live on infrastructure I operate or running on hardware I wired. Details open the full write-up, architecture included."
      />

      <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
        {featured.map((p, i) => (
          <ProductFeature key={p.id} project={p} index={i} />
        ))}
      </div>

      <div className="mt-24 border-t border-white/10 pt-10 lg:mt-32">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h3 className="t-title text-white">More systems</h3>
          <p className="t-label hidden text-steel sm:block">{gridProjects.length} projects</p>
        </div>
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {gridProjects.map((p, i) => (
            <FadeIn key={p.id} delay={(i % 3) * 0.08} className="flex">
              <ProductCard project={p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Products;
