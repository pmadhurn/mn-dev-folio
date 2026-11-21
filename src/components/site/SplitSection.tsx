import type { ReactNode } from 'react';
import type { MediaKey } from '@/data/media';
import { cn } from '@/lib/utils';
import Media from './Media';
import { FadeIn, LineReveal } from './motion';

interface SplitSectionProps {
  media: MediaKey;
  label: string;
  title: string[];
  children: ReactNode;
  tone?: 'dark' | 'light';
  /** Image on the right instead of the left. */
  reverse?: boolean;
  id?: string;
  headingLevel?: 'h2' | 'h3';
}

/** Wide image beside editorial text; alternates tone and side. */
const SplitSection = ({ media, label, title, children, tone = 'dark', reverse = false, id, headingLevel: H = 'h3' }: SplitSectionProps) => (
  <div id={id} className={cn(tone === 'light' ? 'surface-light' : 'bg-charcoal')}>
    <div className="grid lg:grid-cols-2">
      <FadeIn className={cn('relative min-h-[18rem] lg:min-h-[44rem]', reverse && 'lg:order-2')} y={0}>
        <Media name={media} sizes="(min-width: 1024px) 50vw, 100vw" className="grade absolute inset-0 h-full w-full" />
      </FadeIn>
      <div className="flex items-center px-[var(--gutter)] py-16 lg:px-16 lg:py-24 xl:px-24">
        <div className="max-w-xl">
          <FadeIn y={8}>
            <p className="t-label mb-6 text-muted-foreground">{label}</p>
          </FadeIn>
          <H className="t-title text-balance">
            <LineReveal lines={title} inView />
          </H>
          <FadeIn delay={0.15} className="mt-8">
            {children}
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

export default SplitSection;
