import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { projects, type Project } from '@/data/projects';
import ProjectModal from '@/components/ProjectModal';

type Category = Project['category'] | 'all';

interface SiteState {
  openProject: (id: string) => void;
  category: Category;
  setCategory: (category: Category) => void;
}

const SiteContext = createContext<SiteState | null>(null);

/**
 * Page-level state shared across sections: the project detail dialog (opened
 * from features, cards and the index alike) and the catalogue filter (set
 * from the disciplines grid, read by the project index).
 */
export const SiteProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<Category>('all');

  const openProject = useCallback((id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    setSelected(project);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ openProject, category, setCategory }), [openProject, category]);

  return (
    <SiteContext.Provider value={value}>
      {children}
      {/* Stays mounted while closing so the dialog's exit animation and
          focus/scroll-lock teardown can run. */}
      {selected && <ProjectModal project={selected} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
};

/** Smooth-scroll to an in-page section, respecting reduced motion. */
export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
};
