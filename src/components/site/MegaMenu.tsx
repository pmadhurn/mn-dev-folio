import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { projectMedia } from '@/data/media';
import { profile } from '@/data/profile';
import { RESUME_URL } from '@/lib/resume';
import { DISCIPLINES } from './disciplines';
import Media from './Media';
import { useSite } from './SiteContext';

interface MegaMenuProps {
  onNavigate: (id: string) => void;
  onClose: () => void;
}

const flagships = projects.filter((p) => p.tier === 'flagship');

/** Full-width panel under the header: disciplines, flagship work, elsewhere. */
const MegaMenu = ({ onNavigate, onClose }: MegaMenuProps) => {
  const { setCategory } = useSite();

  return (
    <div className="shell grid grid-cols-12 gap-10 py-12">
      <div className="col-span-3">
        <p className="t-label mb-6 text-steel">Disciplines</p>
        <ul className="space-y-5">
          {DISCIPLINES.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                className="group text-left"
                onClick={() => {
                  setCategory(d.category);
                  onNavigate('index');
                }}
              >
                <span className="t-subtitle flex items-center gap-2 text-white">
                  {d.title}
                  <ArrowRight
                    size={16}
                    className="-translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1 block text-sm text-steel">{d.short}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-7 border-l border-white/10 pl-10">
        <p className="t-label mb-6 text-steel">Selected work</p>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
          {flagships.map((p) => {
            const image = projectMedia[p.id];
            return (
              <li key={p.id}>
                <button
                  type="button"
                  className="group flex w-full items-center gap-4 py-1.5 text-left"
                  onClick={() => onNavigate(`project-${p.id}`)}
                >
                  <span className="block h-11 w-16 shrink-0 overflow-hidden bg-surface">
                    {image && <Media name={image} sizes="64px" alt="" className="grade h-full w-full" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.95rem] font-medium text-white transition-colors group-hover:text-bone">
                      {p.title.split('—')[0].trim()}
                    </span>
                    <span className="t-label block truncate text-steel">{p.category.replace('-', '/')}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className="link-arrow mt-6" onClick={() => onNavigate('index')}>
          <span className="link-arrow-text">Full project index</span>
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>

      <div className="col-span-2 border-l border-white/10 pl-10">
        <p className="t-label mb-6 text-steel">Elsewhere</p>
        <ul className="space-y-3 text-[0.95rem]">
          <li>
            <Link to="/chat" onClick={onClose} className="text-white hover:text-bone">
              Ask the AI
            </Link>
          </li>
          <li>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white hover:text-bone">
              Résumé <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white hover:text-bone">
              GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white hover:text-bone">
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MegaMenu;
