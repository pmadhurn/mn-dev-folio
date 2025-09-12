import { useEffect, useState, useCallback } from 'react';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Button } from '@/components/ui/button';
import heroPortrait from '@/assets/hero-portrait.jpg';

const Hero = () => {
  const [init, setInit] = useState(false);
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    const handleTransitionStart = () => setShowParticles(false);
    const handleTransitionEnd = () => setShowParticles(true);

    window.addEventListener('theme-transition-start', handleTransitionStart);
    window.addEventListener('theme-transition-end', handleTransitionEnd);

    return () => {
      window.removeEventListener('theme-transition-start', handleTransitionStart);
      window.removeEventListener('theme-transition-end', handleTransitionEnd);
    };
  }, []);

  const particlesLoaded = useCallback(async (container?: any) => {
      console.log(container);
  }, []);

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        grab: {
          distance: 170,
          links: {
            opacity: 0.4,
          },
        },
      },
    },
    particles: {
      color: {
        value: "#6662afff",
      },
      links: {
        color: "#6662afff",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 600,
        },
        value: 60,
      },
      opacity: {
        value: 0.4,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden" aria-label="Hero section">
      {init && showParticles && <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <header className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Madhur N Patel
                <span className="block text-primary mt-2">
                  Full-Stack & AI/ML Developer
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I build efficient software and data-driven solutions across web, mobile, and IoT platforms.
              </p>
            </header>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4" role="note" aria-label="Current availability">
              <p className="text-accent font-medium">
                🚀 Open to SDE, Full-Stack, and ML/AI internships and projects
              </p>
            </div>

            <nav className="flex flex-col sm:flex-row gap-4" aria-label="Main actions">
              <Button 
                onClick={scrollToProjects}
                className="btn-hero"
                size="lg"
                aria-label="View my projects section"
              >
                View Projects
                <ArrowRight size={20} className="ml-2" aria-hidden="true" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-ghost"
                onClick={() => window.open('/Madhur_N_Patel_Resume.pdf', '_blank')}
                aria-label="Download Madhur N Patel's resume (PDF)"
              >
                <Download size={20} className="mr-2" aria-hidden="true" />
                Download Resume
              </Button>
            </nav>

            <div className="flex items-center space-x-6 pt-4">
              <nav className="flex items-center space-x-4" aria-label="Social media links">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://github.com/pmadhurn', '_blank')}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Visit Madhur's GitHub profile"
                >
                  <Github size={24} aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://linkedin.com/in/madhur-n', '_blank')}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Visit Madhur's LinkedIn profile"
                >
                  <Linkedin size={24} aria-hidden="true" />
                </Button>
              </nav>
              <div className="text-sm text-muted-foreground" aria-label="Location">
                📍 Ahmedabad, India
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 hero-gradient rounded-2xl blur-3xl opacity-20 transform scale-110" aria-hidden="true"></div>
              <figure className="relative overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl">
                <img 
                  src={heroPortrait} 
                  alt="Professional portrait of Madhur N Patel, Full-Stack and AI/ML Developer"
                  className="w-full h-auto max-w-md object-cover"
                  loading="eager"
                  width="400"
                  height="500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" aria-hidden="true"></div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;