import { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Search } from 'lucide-react';
import { projects, categories } from '@/data/projects';
import { cn } from '@/lib/utils';
import { FadeIn } from './motion';
import { useSite } from './SiteContext';
import { CATEGORY_LABEL, STATUS_LABEL, shortTitle } from './labels';

/**
 * Full catalogue as an editorial index on a light ground: filter by
 * discipline, search across title/summary/stack, archive collapsed by default.
 */
const ProjectIndex = () => {
  const { openProject, category, setCategory } = useSite();
  const [query, setQuery] = useState('');
  const [showArchive, setShowArchive] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const inCategory = category === 'all' || p.category === category;
        const inSearch =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q));
        return inCategory && inSearch;
      }),
    [category, q],
  );

  const primary = filtered.filter((p) => p.tier !== 'archive');
  const archived = filtered.filter((p) => p.tier === 'archive');
  // A search or a filter with only archive matches must be able to reach in.
  const forceArchive = q.length > 0 || (primary.length === 0 && archived.length > 0);
  const archiveOpen = showArchive || forceArchive;

  const Row = ({ p, n }: { p: (typeof projects)[number]; n: number }) => (
    <li>
      <button
        type="button"
        onClick={() => openProject(p.id)}
        className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-border py-5 text-left transition-colors hover:bg-foreground/[0.04] md:grid-cols-[3rem_1.4fr_1fr_10rem_auto] md:px-2"
      >
        <span className="t-label text-muted-foreground">{String(n).padStart(2, '0')}</span>
        <span>
          <span className="block font-heading text-lg font-medium leading-snug tracking-tight md:text-xl">{shortTitle(p)}</span>
          <span className="mt-1 block text-sm text-muted-foreground md:hidden">{CATEGORY_LABEL[p.category]}</span>
        </span>
        <span className="hidden truncate text-sm text-muted-foreground md:block">{p.tech.slice(0, 3).join(' · ')}</span>
        <span className="t-label hidden text-muted-foreground md:block">{STATUS_LABEL[p.status]}</span>
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </li>
  );

  return (
    <section id="index" className="surface-light section-pad" aria-labelledby="index-heading">
      <div className="shell">
        <FadeIn>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="t-label mb-6 flex items-center gap-3 text-muted-foreground">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-current" />
                Project index
              </p>
              <h2 id="index-heading" className="t-headline">
                Everything,
                <br />
                catalogued.
              </h2>
            </div>
            <label className="relative block w-full max-w-sm">
              <span className="sr-only">Search projects and technologies</span>
              <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, technologies…"
                className="field pl-7"
              />
            </label>
          </div>
        </FadeIn>

        <div className="mt-12 flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="group" aria-label="Filter by discipline">
          {categories
            .filter((c) => c.count > 0)
            .map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c.id as typeof category)}
                  className={cn(
                    't-label min-h-[2.5rem] shrink-0 whitespace-nowrap border px-4 transition-colors',
                    active
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground',
                  )}
                >
                  {c.label} <span className="opacity-60">{c.count}</span>
                </button>
              );
            })}
        </div>

        <div className="mt-8" aria-live="polite">
          {primary.length > 0 && (
            <ul className="border-b border-border">
              {primary.map((p, i) => (
                <Row key={p.id} p={p} n={i + 1} />
              ))}
            </ul>
          )}

          {archived.length > 0 && (
            <div className="mt-10">
              <button
                type="button"
                onClick={() => setShowArchive((v) => !v)}
                disabled={forceArchive}
                aria-expanded={archiveOpen}
                aria-controls="archive-list"
                className="t-label flex min-h-[2.75rem] items-center gap-2 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-default"
              >
                <ChevronDown size={14} className={cn('transition-transform duration-300', archiveOpen && 'rotate-180')} aria-hidden="true" />
                Coursework &amp; early projects ({archived.length})
              </button>
              {archiveOpen && (
                <ul id="archive-list" className="mt-4 border-b border-border">
                  {archived.map((p, i) => (
                    <Row key={p.id} p={p} n={primary.length + i + 1} />
                  ))}
                </ul>
              )}
            </div>
          )}

          {filtered.length === 0 && (
            <p className="border-t border-border py-12 text-muted-foreground">No projects match that search.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectIndex;
