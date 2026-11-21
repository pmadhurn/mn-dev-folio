import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LineReveal, FadeIn } from './motion';

interface EditorialHeadingProps {
  /** Small uppercase label, e.g. "02 — Disciplines". */
  label: string;
  /** Headline, one entry per line. */
  lines: string[];
  lede?: ReactNode;
  id?: string;
  className?: string;
  /** `split` puts the lede in a right-hand column on large screens. */
  layout?: 'stack' | 'split';
  as?: 'h1' | 'h2';
}

const EditorialHeading = ({ label, lines, lede, id, className, layout = 'stack', as: Tag = 'h2' }: EditorialHeadingProps) => (
  <header
    className={cn(
      'grid gap-8',
      layout === 'split' && 'lg:grid-cols-12 lg:items-end lg:gap-12',
      className,
    )}
  >
    <div className={cn(layout === 'split' && 'lg:col-span-7')}>
      <FadeIn y={8}>
        <p className="t-label mb-6 flex items-center gap-3 text-muted-foreground">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-current" />
          {label}
        </p>
      </FadeIn>
      <Tag id={id} className="t-headline text-balance">
        <LineReveal lines={lines} inView />
      </Tag>
    </div>
    {lede && (
      <FadeIn
        delay={0.15}
        className={cn('t-lede max-w-xl text-muted-foreground text-pretty', layout === 'split' && 'lg:col-span-5 lg:justify-self-end')}
      >
        {lede}
      </FadeIn>
    )}
  </header>
);

export default EditorialHeading;
