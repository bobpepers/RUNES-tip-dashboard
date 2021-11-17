import React from 'react';
import { withTranslation } from 'react-i18next';
import Particles from 'react-particles-js';
import Runebase from '../assets/images/RunebaseFogLogo.png';

// import { Clouds } from './Clouds';

const ParticlesRunebase = (props) => {
  const { t } = props;
  return (
    <>

      <div id="info">
        <section className="top">
          <div className="foggy" />
          <div className="sliderbg" />
          <div className="clouds" />
          <div className="particles">
            <Particles
              params={{
                particles: {
                  number: {
                    value: 60,
                    density: {
                      enable: true,
                      value_area: 1500,
                    },
                  },
                  line_linked: {
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
                    anim: {
                      enable: true,
                      speed: 1,
                      opacity_min: 0.05,
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
                      particles_nb: 1,
                    },
                  },
                },
                retina_detect: true,
              }}
            />
          </div>
          <div style={{
            zIndex: 2, position: 'absolute', top: '0', bottom: '0', width: '100%', height: '100%',
          }}
          >
            <Particles
              style={{
                zIndex: 2,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              params={{
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
                    anim: {
                      speed: 3,
                      size_min: 0.3,
                    },
                  },
                  line_linked: {
                    enable: false,
                  },
                  move: {
                    random: true,
                    speed: 0.6,
                    direction: 'top',
                    out_mode: 'out',
                  },
                  shape: {
                    type: [
                      'images',
                    ],
                    images: [
                      {
                        src: Runebase,
                        height: 50,
                        width: 50,
                      },
                    ],
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
                      mode: 'repulse',
                    },
                  },
                  modes: {
                    bubble: {
                      distance: 1,
                      duration: 2,
                      size: 0,
                      opacity: 0,
                    },
                    repulse: {
                      distance: 400,
                      duration: 4,
                    },
                  },
                },
              }}
            />
          </div>

          <div id="particles-js" />
        </section>
      </div>
    </>
  );
}

export default withTranslation()(ParticlesRunebase);
