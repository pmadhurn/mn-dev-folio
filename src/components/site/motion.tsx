import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Masked line reveal for display type: each line slides up from behind its
 * own clip. Under reduced motion the text simply renders.
 */
export const LineReveal = ({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = 'span',
  inView = false,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: 'span' | 'div';
  /** Trigger on scroll into view instead of on mount. */
  inView?: boolean;
}) => {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={cn('block', lineClassName)}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y: '105%' },
    visible: { y: '0%', transition: { duration: 0.95, ease: EASE_OUT } },
  };

  const trigger = inView
    ? { whileInView: 'visible', viewport: { once: true, margin: '-12% 0px' } }
    : { animate: 'visible' };

  return (
    <motion.span className={cn('block', className)} variants={parent} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        // Padding + negative margin give descenders room inside the clip.
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className={cn('block', lineClassName)} variants={child}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

/** Opacity + short rise, once, when scrolled into view. */
export const FadeIn = ({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
};
