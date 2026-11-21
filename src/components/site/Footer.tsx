import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { RESUME_URL } from '@/lib/resume';
import { Mark, NAV_SECTIONS } from './Navbar';
import { scrollToId } from './SiteContext';
import { shortTitle } from './labels';

const live = projects.filter((p) => p.links.demo);

const Column = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={className}>
    <h2 className="t-label mb-5 text-steel">{title}</h2>
    <ul className="space-y-1 text-[0.95rem]">{children}</ul>
  </div>
);

const linkCls = 'inline-flex min-h-[2rem] min-w-[1.5rem] items-center text-bone/80 transition-colors hover:text-white';

/** Dark multi-column footer with an oversized wordmark. */
const Footer = () => (
  <footer className="border-t border-white/10 bg-ink pt-20" aria-label="Site footer">
    <div className="shell">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <Mark />
            <span className="font-heading text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-white">{profile.name}</span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel">{profile.summary}</p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
          <Column title="Site">
            {NAV_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={linkCls}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(s.id);
                  }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </Column>
          <Column title="Live systems">
            {live.map((p) => (
              <li key={p.id}>
                <a href={p.links.demo!} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {shortTitle(p)}
                </a>
              </li>
            ))}
          </Column>
          <Column title="Elsewhere">
            <li><a href={profile.links.github} target="_blank" rel="noopener noreferrer me" className={linkCls}>GitHub</a></li>
            <li><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer me" className={linkCls}>LinkedIn</a></li>
            <li><a href={profile.links.x} target="_blank" rel="noopener noreferrer me" className={linkCls}>X</a></li>
            <li><Link to="/chat" className={linkCls}>Ask the AI</Link></li>
          </Column>
          <Column title="Contact" className="col-span-2 sm:col-span-1">
            <li><a href={`mailto:${profile.email}`} className={`${linkCls} break-words`}>{profile.email}</a></li>
            <li><a href={`tel:${profile.phone.replace(/\s/g, '')}`} className={linkCls}>{profile.phone}</a></li>
            <li><a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>Résumé (PDF)</a></li>
          </Column>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-20 select-none font-heading text-[clamp(3rem,13.5vw,15rem)] font-semibold uppercase leading-[0.8] tracking-[-0.06em] text-white/[0.06]"
      >
        Madhur.dev
      </p>

      <div className="t-label mt-8 flex flex-col gap-4 border-t border-white/10 py-8 text-steel md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {profile.name} · Ahmedabad, India</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><a href="/llms.txt" className="inline-flex min-h-[1.75rem] items-center hover:text-white">llms.txt</a></li>
          <li><a href="/sitemap.xml" className="inline-flex min-h-[1.75rem] items-center hover:text-white">Sitemap</a></li>
          <li><a href="/rss.xml" className="inline-flex min-h-[1.75rem] items-center hover:text-white">RSS</a></li>
          <li><a href="/humans.txt" className="inline-flex min-h-[1.75rem] items-center hover:text-white">humans.txt</a></li>
          <li>Photography: Unsplash</li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
