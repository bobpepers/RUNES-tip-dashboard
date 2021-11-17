import React from 'react';
import { withTranslation } from 'react-i18next';
import Particles from 'react-particles-js';
import SnowImage from '../assets/images/snow.png';

// import { Clouds } from './Clouds';

const Snow = (props) => {
  const { t } = props;
  return (
    <>
      <div id="info">
        <section className="top">
          <div style={{
            zIndex: 50000,
            position: 'absolute',
            top: '0',
            bottom: '0',
            width: '100%',
            height: '100%',
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
                    value: 150,
                    density: {
                      enable: true,
                      value_area: 900,
                    },
                  },
                  color: {
                    value: '#ffffff',
                  },
                  shape: {
                    type: 'image',
                    stroke: {
                      width: 3,
                      color: '#fff',
                    },
                    polygon: {
                      nb_sides: 5,
                    },
                    image: {
                      src: SnowImage,
                      width: 50,
                      height: 50,
                    },
                  },
                  opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                      enable: false,
                      speed: 0.5,
                      opacity_min: 0.1,
                      sync: false,
                    },
                  },
                  size: {
                    value: 3,
                    random: true,
                    anim: {
                      enable: false,
                      speed: 20,
                      size_min: 0.1,
                      sync: false,
                    },
                  },
                  line_linked: {
                    enable: false,
                    distance: 50,
                    color: '#ffffff',
                    opacity: 0.6,
                    width: 1,
                  },
                  move: {
                    enable: true,
                    speed: 3,
                    direction: 'bottom',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                      enable: true,
                      rotateX: 300,
                      rotateY: 1200,
                    },
                  },
                },
                interactivity: {
                  detect_on: 'canvas',
                  events: {
                    onhover: {
                      enable: true,
                      mode: 'bubble',
                    },
                    onclick: {
                      enable: true,
                      mode: 'repulse',
                    },
                    resize: true,
                  },
                  modes: {
                    grab: {
                      distance: 150,
                      line_linked: {
                        opacity: 0.8,
                      },
                    },
                    bubble: {
                      distance: 200,
                      size: 10,
                      duration: 2,
                      opacity: 8,
                      speed: 3,
                    },
                    repulse: {
                      distance: 100,
                      duration: 0.6,
                    },
                    push: {
                      particles_nb: 4,
                    },
                    remove: {
                      particles_nb: 2,
                    },
                  },
                },
                retina_detect: true,
              }}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default withTranslation()(Snow);
