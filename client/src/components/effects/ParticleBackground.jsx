import { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { useTheme } from '../../context/ThemeContext';

const ParticleBackground = () => {
  const { theme } = useTheme();

  const options = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 60,
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          area: 900
        }
      },
      color: {
        value: theme === 'dark' 
          ? ['#6C63FF', '#00D4FF', '#A855F7'] 
          : ['#6C63FF', '#3B82F6', '#8B5CF6']
      },
      links: {
        enable: true,
        color: theme === 'dark' ? '#6C63FF' : '#6C63FF',
        distance: 150,
        opacity: theme === 'dark' ? 0.12 : 0.08,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none',
        random: true,
        straight: false,
        outModes: 'bounce'
      },
      opacity: {
        value: { min: 0.1, max: 0.4 },
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1
        }
      },
      size: {
        value: { min: 1, max: 3 }
      },
      shape: {
        type: 'circle'
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab'
        },
        onClick: {
          enable: true,
          mode: 'push'
        }
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.3
          }
        },
        push: {
          quantity: 3
        }
      }
    },
    detectRetina: true
  }), [theme]);

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticleBackground;
