import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ParticlesBackground from '@/components/ParticlesBackground';
import heroPortrait from '@/assets/hero-portrait.jpg';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // One shared timeline for the whole column, so the stagger stays even no
  // matter how the markup is nested. 60ms matches the Skills grid — the site
  // should only ever have one stagger rhythm.
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  // Under reduced motion the items still exist on the timeline, they just have
  // nothing to travel — keeping the variants symmetrical avoids a second code
  // path that can drift out of sync with the animated one.
  const item: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
        },
      };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 aurora" aria-hidden="true" />
      <ParticlesBackground id="tsparticles" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="space-y-6"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item}>
              <p
                className="section-eyebrow"
                role="note"
                aria-label="Current availability"
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Open to SDE / ML internships
              </p>
            </motion.div>

            <motion.header className="space-y-3" variants={item}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.08] tracking-tight">
                Madhur N Patel
                <span className="block text-gradient-brand mt-2 pb-1">
                  Full-Stack &amp; AI/ML Developer
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                I build efficient software and data-driven solutions across web,
                mobile, and IoT platforms.
              </p>
            </motion.header>

            <motion.nav
              className="flex flex-col sm:flex-row gap-4"
              aria-label="Main actions"
              variants={item}
            >
              <Button
                onClick={scrollToProjects}
                className="btn-hero group"
                size="lg"
                aria-label="View my projects section"
              >
                View Projects
                <ArrowRight
                  size={20}
                  className="ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="btn-ghost"
                onClick={() =>
                  window.open('/Madhur_N_Patel_Resume.pdf', '_blank', 'noopener,noreferrer')
                }
                aria-label="Download Madhur N Patel's resume (PDF)"
              >
                <Download size={20} className="mr-2" aria-hidden="true" />
                Download Resume
              </Button>
            </motion.nav>

            <motion.div className="flex items-center space-x-6 pt-2" variants={item}>
              <nav className="flex items-center space-x-2" aria-label="Social media links">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    window.open('https://github.com/pmadhurn', '_blank', 'noopener,noreferrer')
                  }
                  className="text-muted-foreground hover:text-primary"
                  aria-label="Visit Madhur's GitHub profile"
                >
                  <Github size={24} aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    window.open('https://linkedin.com/in/madhur-n', '_blank', 'noopener,noreferrer')
                  }
                  className="text-muted-foreground hover:text-primary"
                  aria-label="Visit Madhur's LinkedIn profile"
                >
                  <Linkedin size={24} aria-hidden="true" />
                </Button>
              </nav>
              <div className="text-sm text-muted-foreground" aria-label="Location">
                📍 Ahmedabad, India
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="relative">
              <div
                className="absolute -inset-4 hero-gradient rounded-[1.75rem] blur-3xl opacity-25"
                aria-hidden="true"
              />
              <figure className="relative overflow-hidden rounded-2xl border border-primary/25 glow-primary">
                <img
                  src={heroPortrait}
                  alt="Professional portrait of Madhur N Patel, Full-Stack and AI/ML Developer"
                  className="w-full h-auto max-w-md object-cover"
                  loading="eager"
                  width="600"
                  height="399"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </figure>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
