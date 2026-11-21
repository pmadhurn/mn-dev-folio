import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { RESUME_URL } from '@/lib/resume';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';
import MegaMenu from './MegaMenu';
import { scrollToId } from './SiteContext';
import { EASE_OUT } from './motion';

export const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'work', label: 'Work', mega: true },
  { id: 'technology', label: 'Technology' },
  { id: 'operations', label: 'Operations' },
  { id: 'record', label: 'Record' },
  { id: 'contact', label: 'Contact' },
] as const;

/**
 * Fixed header. Transparent over the hero, solid ink once the page scrolls.
 * "Work" opens a full-width mega-menu on desktop; below `lg` a menu button
 * opens a full-screen overlay instead.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  // Hover opens the panel a moment before the click lands; without this the
  // click would toggle it straight back closed.
  const hoverOpenedAt = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes whichever menu is open; a click outside closes the mega-menu.
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (megaOpen && headerRef.current && !headerRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [megaOpen, mobileOpen]);

  // Lock page scroll behind the mobile overlay.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Scrolling while a menu is animating closed gets cancelled by Chrome, so
  // when a menu is open the scroll waits for its exit to complete.
  const pendingScroll = useRef<string | null>(null);
  const flushScroll = () => {
    if (pendingScroll.current) scrollToId(pendingScroll.current);
    pendingScroll.current = null;
  };
  const go = (id: string) => {
    if (megaOpen || mobileOpen) {
      pendingScroll.current = id;
      setMegaOpen(false);
      setMobileOpen(false);
    } else {
      scrollToId(id);
    }
  };

  // Hover intent: open immediately, close after a short grace period so the
  // pointer can travel from the trigger into the panel.
  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen((open) => {
      if (!open) hoverOpenedAt.current = Date.now();
      return true;
    });
  };
  // Functional updates throughout: mouseenter and click can arrive in the same
  // tick, before React has re-rendered with the hover-opened state.
  const toggleMega = () =>
    setMegaOpen((open) => (open && Date.now() - hoverOpenedAt.current < 500 ? true : !open));
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };

  const solid = scrolled || megaOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo',
          solid ? 'border-b border-white/10 bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
        )}
        onMouseLeave={megaOpen ? scheduleClose : undefined}
      >
        <a
          href="#main"
          className="t-label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <nav className="shell flex h-[var(--header-h)] items-center justify-between" aria-label="Main">
          <button
            type="button"
            onClick={() => go('hero')}
            className="group flex items-center gap-3 py-2"
            aria-label={`${profile.name} — back to top`}
          >
            <Mark />
            <span className="font-heading text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-white">
              Madhur N Patel
            </span>
          </button>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_SECTIONS.map((item) =>
              'mega' in item ? (
                <li key={item.id} onMouseEnter={openMega}>
                  <button
                    type="button"
                    className="nav-link py-3"
                    aria-expanded={megaOpen}
                    aria-controls="mega-menu"
                    onClick={toggleMega}
                  >
                    {item.label}
                  </button>
                </li>
              ) : (
                <li key={item.id} onMouseEnter={megaOpen ? scheduleClose : undefined}>
                  <a
                    href={`#${item.id}`}
                    className="nav-link inline-block py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
            <li>
              <Link to="/chat" className="nav-link inline-block py-3">
                Ask the AI
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline hidden min-h-[2.5rem] px-4 text-[0.6875rem] sm:inline-flex"
            >
              Résumé
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </nav>

        <AnimatePresence onExitComplete={flushScroll}>
          {megaOpen && (
            <motion.div
              id="mega-menu"
              key="mega"
              className="hidden overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl lg:block"
              initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              onMouseEnter={openMega}
            >
              <MegaMenu onNavigate={go} onClose={() => setMegaOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence onExitComplete={flushScroll}>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <div className="shell flex h-[var(--header-h)] items-center justify-between border-b border-white/10">
              <span className="flex items-center gap-3">
                <Mark />
                <span className="font-heading text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-white">
                  Madhur N Patel
                </span>
              </span>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                autoFocus
              >
                <X size={22} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
            <nav className="shell flex flex-1 flex-col justify-between overflow-y-auto py-8" aria-label="Mobile">
              <ul className="space-y-1">
                {NAV_SECTIONS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.04, ease: EASE_OUT }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.id);
                      }}
                      className="flex items-baseline gap-4 border-b border-white/10 py-4"
                    >
                      <span className="t-label text-steel">{String(i + 1).padStart(2, '0')}</span>
                      <span className="t-title text-white">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
                <li>
                  <Link
                    to="/chat"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/10 py-4"
                  >
                    <span className="t-label text-steel">AI</span>
                    <span className="t-title text-white">Ask the AI</span>
                  </Link>
                </li>
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-solid flex-1">
                  Résumé
                </a>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  GitHub
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  LinkedIn
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/** Monogram: two stacked bars and a square — reads as "MN" at 24px. */
export const Mark = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" className="shrink-0 text-white">
    <rect x="0.5" y="0.5" width="25" height="25" fill="none" stroke="currentColor" strokeOpacity="0.5" />
    <path d="M6 19V7l4.5 7L15 7v12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="miter" />
    <path d="M18 19V7l3 12V7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="miter" />
  </svg>
);

export default Navbar;
