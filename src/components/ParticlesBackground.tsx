import { memo, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

// Shared animated network background used across pages (Hero, Chat) so the
// whole site has the same interactive feel.
//
// The palette is built per theme: vivid gold reads well on the near-black dark
// ground but washes out to nothing on the light paper one, so the light theme
// gets a deeper bronze instead. Both variants are built once at module level —
// the component's own comment below explains why a fresh object identity per
// render is a problem here.
const makeOptions = (color: string) => ({
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
      value: color,
    },
    links: {
      color,
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
});

const OPTIONS_DARK = makeOptions('#f9a91f');
const OPTIONS_LIGHT = makeOptions('#a8690c');

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
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    let cancelled = false;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (!cancelled) setInit(true);
    });

    // Hidden during the theme-toggle view transition to avoid canvas artifacts.
    // The canvas is unmounted for the duration anyway, so re-reading the theme
    // on the way back in is free — no need to observe the class directly.
    const handleTransitionStart = () => setShowParticles(false);
    const handleTransitionEnd = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
      setShowParticles(true);
    };

    window.addEventListener('theme-transition-start', handleTransitionStart);
    window.addEventListener('theme-transition-end', handleTransitionEnd);

    return () => {
      cancelled = true;
      window.removeEventListener('theme-transition-start', handleTransitionStart);
      window.removeEventListener('theme-transition-end', handleTransitionEnd);
    };
  }, []);

  if (!init || !showParticles) return null;

  return (
    <Particles
      id={id}
      options={isDark ? OPTIONS_DARK : OPTIONS_LIGHT}
      style={canvasStyle}
    />
  );
};

// memo: the chat page re-renders on every keystroke and every streamed token;
// without this the particles canvas re-renders (and visibly resets) each time.
export default memo(ParticlesBackground);
