import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to delay the entrance, for staggering sibling reveals by hand. */
  delay?: number;
  /** Distance in px the element travels on the way in. */
  distance?: number;
}

/**
 * Scroll-triggered entrance used across the page sections.
 *
 * Motion here is decoration, not information, so under `prefers-reduced-motion`
 * the element is rendered plainly and starts visible. That check has to happen
 * in JS: framer-motion writes inline styles, which the `prefers-reduced-motion`
 * block in index.css cannot reach — the same gap the theme-toggle wipe closes.
 *
 * `once: true` matters as much as the easing. Re-playing an entrance every time
 * a section scrolls back into view turns a one-off flourish into a high-frequency
 * animation, which is the point at which motion starts costing more than it adds.
 */
const Reveal = ({ children, className, delay = 0, distance = 16 }: RevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
