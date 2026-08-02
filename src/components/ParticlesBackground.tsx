import { memo, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

// Shared animated network background used across pages (Hero, Chat) so the
// whole site has the same interactive feel.
const options = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'grab',
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
      value: '#6662afff',
    },
    links: {
      color: '#6662afff',
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    move: {
      direction: 'none' as const,
      enable: true,
      outModes: {
        default: 'bounce' as const,
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
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};

// Stable style object: an inline literal would be a new identity every render
// and can make the Particles component rebuild its canvas.
const canvasStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  pointerEvents: 'none',
} as const;

const ParticlesBackground = ({ id = 'tsparticles' }: { id?: string }) => {
  const [init, setInit] = useState(false);
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    let cancelled = false;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (!cancelled) setInit(true);
    });

    // Hidden during the theme-toggle view transition to avoid canvas artifacts.
    const handleTransitionStart = () => setShowParticles(false);
    const handleTransitionEnd = () => setShowParticles(true);

    window.addEventListener('theme-transition-start', handleTransitionStart);
    window.addEventListener('theme-transition-end', handleTransitionEnd);

    return () => {
      cancelled = true;
      window.removeEventListener('theme-transition-start', handleTransitionStart);
      window.removeEventListener('theme-transition-end', handleTransitionEnd);
    };
  }, []);

  if (!init || !showParticles) return null;

  return <Particles id={id} options={options} style={canvasStyle} />;
};

// memo: the chat page re-renders on every keystroke and every streamed token;
// without this the particles canvas re-renders (and visibly resets) each time.
export default memo(ParticlesBackground);
