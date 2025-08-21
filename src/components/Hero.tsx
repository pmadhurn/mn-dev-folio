import { useEffect, useState, useCallback } from 'react';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Button } from '@/components/ui/button';
import heroPortrait from '@/assets/hero-portrait.jpg';

const Hero = () => {
  const [ init, setInit ] = useState(false);

  useEffect(() => {
      initParticlesEngine(async (engine) => {
          await loadSlim(engine);
      }).then(() => {
          setInit(true);
      });
  }, []);

  const particlesLoaded = (container) => {
      console.log(container);
  };

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
                  mode: "repulse",
              },
              resize: true,
          },
          modes: {
              push: {
                  quantity: 4,
              },
              repulse: {
                  distance: 200,
                  duration: 0.4,
              },
          },
      },
      particles: {
          color: {
              value: "hsl(var(--foreground))",
          },
          links: {
              color: "hsl(var(--foreground))",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
          },
          collisions: {
              enable: true,
          },
          move: {
              direction: "none",
              enable: true,
              outModes: {
                  default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
          },
          number: {
              density: {
                  enable: true,
                  area: 800,
              },
              value: 80,
          },
          opacity: {
              value: 0.5,
          },
          shape: {
              type: "circle",
          },
          size: {
              value: { min: 1, max: 5 },
          },
      },
      detectRetina: true,
      parallax: {
        enable: true,
        force: 60,
        smooth: 10
      }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
      {init && <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 -z-10"
      />}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Madhur N Patel
                <span className="block text-primary mt-2">
                  Full-Stack & AI/ML Developer
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I build efficient software and data-driven solutions across web, mobile, and IoT platforms.
              </p>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-accent font-medium">
                🚀 Open to SDE, Full-Stack, and ML/AI internships and projects
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToProjects}
                className="btn-hero"
                size="lg"
              >
                View Projects
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-ghost"
                onClick={() => window.open('/Madhur_N_Patel_Resume.pdf', '_blank')}
              >
                <Download size={20} className="mr-2" />
                Download Resume
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://github.com/pmadhurn', '_blank')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github size={24} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://linkedin.com/in/madhur-n', '_blank')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin size={24} />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                📍 Ahmedabad, India
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 hero-gradient rounded-2xl blur-3xl opacity-20 transform scale-110"></div>
              <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl">
                <img 
                  src={heroPortrait} 
                  alt="Portrait of Madhur N Patel"
                  className="w-full h-auto max-w-md object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;