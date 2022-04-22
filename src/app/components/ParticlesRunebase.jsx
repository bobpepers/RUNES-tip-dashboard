import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Runebase from '../assets/images/runebaseloop.gif';

function ParticlesRunebase() {
  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div id="info">
      <section className="top">
        <div className="sliderbg" />
        <div className="clouds" />
        <div className="particles">
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              particles: {
                number: {
                  value: 60,
                  density: {
                    enable: true,
                    value_area: 1500,
                  },
                },
                links: {
                  enable: true,
                  opacity: 0.02,
                },
                move: {
                  direction: 'right',
                  speed: 0.05,
                },
                size: {
                  value: 1,
                },
                opacity: {
                  animation: {
                    enable: true,
                    speed: 1,
                    value: 0.05,
                  },
                },
              },
              interactivity: {
                events: {
                  onclick: {
                    enable: true,
                    mode: 'push',
                  },
                },
                modes: {
                  push: {
                    quantity: 1,
                  },
                },
              },
              detectRetina: true,
            }}
          />
        </div>
        <div style={{
          zIndex: 2,
          position: 'absolute',
          top: '0',
          bottom: '0',
          width: '100%',
          height: '100%',
        }}
        >
          <Particles
            id="tsparticlesTwo"
            init={particlesInit}
            loaded={particlesLoaded}
            style={{
              zIndex: 2,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            options={{
              particles: {
                number: {
                  value: 25,
                  density: {
                    enable: false,
                  },
                },
                size: {
                  value: 15,
                  random: true,
                  animation: {
                    enable: true,
                    speed: 3,
                    minimumValue: 0.3,
                  },
                },
                links: {
                  enable: false,
                },
                move: {
                  enable: true,
                  random: true,
                  speed: 0.6,
                  direction: 'top',
                  outModes: {
                    default: 'out',
                  },
                },
                shape: {
                  type: 'image',
                  image: {
                    src: Runebase,
                    height: 76,
                    width: 100,
                  },
                },
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: 'bubble',
                  },
                  onclick: {
                    enable: true,
                    mode: 'attract',
                  },
                },
                modes: {
                  bubble: {
                    distance: 1,
                    duration: 2,
                    size: 0,
                    // opacity: 0,
                  },
                  attract: {
                    distance: 700,
                    duration: 10,
                    easing: 'ease-out-circ',
                  },
                },
              },
              detectRetina: true,
            }}
          />
        </div>

        <div id="particles-js" />
      </section>
    </div>
  );
}

export default ParticlesRunebase;
