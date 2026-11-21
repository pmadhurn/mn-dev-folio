import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RESUME_URL } from '@/lib/resume';
import Media from './Media';
import { LineReveal, EASE_OUT } from './motion';
import { scrollToId } from './SiteContext';

const FIGURES = [
  { value: '40+', label: 'Containers in production' },
  { value: '~25', label: 'Public services' },
  { value: '0', label: 'Inbound ports open' },
  { value: '2', label: 'ARM64 cores, 12 GB' },
];

/**
 * Full-bleed cinematic hero. The photograph drifts slower than the page
 * (parallax) and the headline unmasks line by line on load.
 */
const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const appear = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE_OUT },
        };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduce ? undefined : { y: imageY, scale: imageScale }}
        aria-hidden="true"
      >
        <Media name="hero" priority sizes="100vw" alt="" className="grade h-full w-full" />
      </motion.div>
      {/* Scrims: top for the nav, bottom-left for the headline. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 scrim-bottom" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(hsl(var(--white))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--white))_1px,transparent_1px)] [background-size:96px_96px]"
        aria-hidden="true"
      />

      <motion.div
        className="shell flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+3rem)] md:pb-14"
        style={reduce ? undefined : { opacity: contentOpacity }}
      >
        <motion.p className="t-label mb-8 flex items-center gap-3 text-bone" {...appear(0.1)}>
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Open to infrastructure &amp; embedded roles
        </motion.p>

        <h1 id="hero-heading" className="t-display max-w-[14ch] text-white">
          <span className="sr-only">Madhur N Patel — Infrastructure &amp; Embedded Systems Engineer. </span>
          <LineReveal lines={['Where software', 'meets hardware']} delay={0.2} />
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.p className="t-lede max-w-xl text-bone/85 lg:col-span-6" {...appear(0.55)}>
            Madhur N Patel — infrastructure &amp; embedded systems engineer. I build and run
            self-managed Linux infrastructure, containerised services, and sensor-fusion
            systems on Raspberry Pi and ESP32.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end" {...appear(0.7)}>
            <a
              href="#work"
              className="btn btn-solid"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('work');
              }}
            >
              View the work
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Download résumé
            </a>
          </motion.div>
        </div>

        <motion.dl
          className="mt-14 grid grid-cols-2 border-t border-white/15 md:grid-cols-4"
          {...appear(0.85)}
        >
          {FIGURES.map((f, i) => (
            <div
              key={f.label}
              className={`flex flex-col-reverse py-5 pr-4 ${i % 2 === 1 ? 'pl-4 border-l border-white/15' : ''} ${i >= 2 ? 'border-t border-white/15 md:border-t-0' : ''} ${i === 2 ? 'md:pl-4 md:border-l' : ''}`}
            >
              <dt className="t-label mt-2 text-steel">{f.label}</dt>
              <dd className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

    </section>
  );
};

export default HeroSection;
