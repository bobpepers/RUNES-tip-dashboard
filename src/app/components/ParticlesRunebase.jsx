import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
// import Runebase from '../assets/images/runebaseloop.gif';

function ParticlesRunebase() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeParticles = async () => {
      await initParticlesEngine(async (engine) => {
        await loadFull(engine); // Load the full version of tsParticles
      }).then(() => {
        setIsInitialized(true);
      });
    };

    initializeParticles();
  }, []);

  return (
    <div id="info">
      <section className="top">
        <div className="sliderbg" />
        <div className="clouds" />
        <div className="particles">
          {isInitialized && (
            <Particles
              id="tsparticles"
              options={{
                particles: {
                  number: {
                    value: 500,
                    density: {
                      enable: true,
                      area: 500,
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
                      minimumValue: 0.05,
                      sync: false,
                    },
                  },
                },
                interactivity: {
                  events: {
                    onClick: {
                      enable: true,
                      mode: 'push',
                    },
                  },
                  modes: {
                    push: {
                      quantity: 1,
                    },
                    bubble: {
                      distance: 1,
                      duration: 2,
                      size: 0,
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
          )}
        </div>
        <div
          style={{
            zIndex: 2,
            position: 'absolute',
            top: '0',
            bottom: '0',
            width: '100%',
            height: '100%',
          }}
        >
          {isInitialized && (
            <Particles
              id="tsparticlesTwo"
              style={{
                zIndex: 2,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              options={{
                autoPlay: true,
                background: {
                  image: '',
                  position: '',
                  repeat: '',
                  size: '',
                  opacity: 1,
                },
                backgroundMask: {
                  composite: 'destination-out',
                  cover: {
                    color: {
                      value: '#fff',
                    },
                    opacity: 1,
                  },
                  enable: false,
                },
                clear: true,
                defaultThemes: {},
                delay: 0,
                fullScreen: {
                  enable: true,
                  zIndex: 0,
                },
                detectRetina: true,
                duration: 0,
                fpsLimit: 120,
                interactivity: {
                  detectsOn: 'window',
                  events: {
                    onClick: {
                      enable: false,
                      mode: 'push',
                    },
                    onDiv: {
                      selectors: [],
                      enable: false,
                      mode: [],
                      type: 'circle',
                    },
                    onHover: {
                      enable: true,
                      mode: 'bubble',
                      parallax: {
                        enable: false,
                        force: 2,
                        smooth: 10,
                      },
                    },
                    resize: {
                      delay: 0.5,
                      enable: true,
                    },
                  },
                  modes: {
                    trail: {
                      delay: 1,
                      pauseOnStop: false,
                      quantity: 1,
                    },
                    attract: {
                      distance: 200,
                      duration: 0.4,
                      easing: 'ease-out-quad',
                      factor: 1,
                      maxSpeed: 50,
                      speed: 1,
                    },
                    bounce: {
                      distance: 200,
                    },
                    bubble: {
                      distance: 400,
                      duration: 2,
                      mix: false,
                      opacity: 0.8,
                      size: 40,
                      divs: {
                        distance: 200,
                        duration: 0.4,
                        mix: false,
                        selectors: [],
                      },
                    },
                    connect: {
                      distance: 80,
                      links: {
                        opacity: 0.5,
                      },
                      radius: 60,
                    },
                    grab: {
                      distance: 100,
                      links: {
                        blink: false,
                        consent: false,
                        opacity: 1,
                      },
                    },
                    push: {
                      default: true,
                      groups: [],
                      quantity: 4,
                    },
                    remove: {
                      quantity: 2,
                    },
                    repulse: {
                      distance: 200,
                      duration: 0.4,
                      factor: 100,
                      speed: 1,
                      maxSpeed: 50,
                      easing: 'ease-out-quad',
                      divs: {
                        distance: 200,
                        duration: 0.4,
                        factor: 100,
                        speed: 1,
                        maxSpeed: 50,
                        easing: 'ease-out-quad',
                        selectors: [],
                      },
                    },
                    slow: {
                      factor: 3,
                      radius: 200,
                    },
                    light: {
                      area: {
                        gradient: {
                          start: {
                            value: '#ffffff',
                          },
                          stop: {
                            value: '#000000',
                          },
                        },
                        radius: 1000,
                      },
                      shadow: {
                        color: {
                          value: '#000000',
                        },
                        length: 2000,
                      },
                    },
                  },
                },
                manualParticles: [],
                particles: {
                  bounce: {
                    horizontal: {
                      value: 1,
                    },
                    vertical: {
                      value: 1,
                    },
                  },
                  collisions: {
                    absorb: {
                      speed: 2,
                    },
                    bounce: {
                      horizontal: {
                        value: 1,
                      },
                      vertical: {
                        value: 1,
                      },
                    },
                    enable: false,
                    maxSpeed: 50,
                    mode: 'bounce',
                    overlap: {
                      enable: true,
                      retries: 0,
                    },
                  },
                  color: {
                    value: '#ffffff',
                    animation: {
                      h: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: true,
                        offset: 0,
                      },
                      s: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: true,
                        offset: 0,
                      },
                      l: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        decay: 0,
                        delay: 0,
                        sync: true,
                        offset: 0,
                      },
                    },
                  },
                  effect: {
                    close: true,
                    fill: true,
                    options: {},
                    type: [],
                  },
                  groups: {},
                  move: {
                    angle: {
                      offset: 0,
                      value: 90,
                    },
                    attract: {
                      distance: 200,
                      enable: false,
                      rotate: {
                        x: 3000,
                        y: 3000,
                      },
                    },
                    center: {
                      x: 50,
                      y: 50,
                      mode: 'percent',
                      radius: 0,
                    },
                    decay: 0,
                    distance: {},
                    direction: 'top',
                    drift: 0,
                    enable: true,
                    gravity: {
                      acceleration: 1,
                      enable: false,
                      inverse: false,
                      maxSpeed: 2,
                    },
                    path: {
                      clamp: true,
                      delay: {
                        value: 0,
                      },
                      enable: false,
                      options: {},
                    },
                    outModes: {
                      default: 'out',
                      bottom: 'out',
                      left: 'out',
                      right: 'out',
                      top: 'out',
                    },
                    random: false,
                    size: false,
                    speed: 0.8,
                    spin: {
                      acceleration: 0,
                      enable: false,
                    },
                    straight: false,
                    trail: {
                      enable: false,
                      length: 10,
                      fill: {},
                    },
                    vibrate: false,
                    warp: false,
                  },
                  number: {
                    density: {
                      enable: true,
                      width: 1920,
                      height: 1080,
                    },
                    limit: {
                      mode: 'delete',
                      value: 0,
                    },
                    value: 80,
                  },
                  opacity: {
                    value: 1,
                    animation: {
                      count: 0,
                      enable: false,
                      speed: 2,
                      decay: 0,
                      delay: 0,
                      sync: false,
                      mode: 'auto',
                      startValue: 'random',
                      destroy: 'none',
                    },
                  },
                  reduceDuplicates: false,
                  shadow: {
                    blur: 0,
                    color: {
                      value: '#000',
                    },
                    enable: false,
                    offset: {
                      x: 0,
                      y: 0,
                    },
                  },
                  shape: {
                    close: true,
                    fill: true,
                    options: {
                      image: [
                        {
                          name: 'runebase',
                        },
                      ],
                    },
                    type: 'image',
                  },
                  size: {
                    value: 16,
                    animation: {
                      count: 0,
                      enable: false,
                      speed: 5,
                      decay: 0,
                      delay: 0,
                      sync: false,
                      mode: 'auto',
                      startValue: 'random',
                      destroy: 'none',
                    },
                  },
                  stroke: {
                    width: 0,
                  },
                  zIndex: {
                    value: 0,
                    opacityRate: 1,
                    sizeRate: 1,
                    velocityRate: 1,
                  },
                  destroy: {
                    bounds: {},
                    mode: 'none',
                    split: {
                      count: 1,
                      factor: {
                        value: 3,
                      },
                      rate: {
                        value: {
                          min: 4,
                          max: 9,
                        },
                      },
                      sizeOffset: true,
                      particles: {},
                    },
                  },
                  roll: {
                    darken: {
                      enable: false,
                      value: 0,
                    },
                    enable: false,
                    enlighten: {
                      enable: false,
                      value: 0,
                    },
                    mode: 'vertical',
                    speed: 25,
                  },
                  tilt: {
                    value: 0,
                    animation: {
                      enable: false,
                      speed: 0,
                      decay: 0,
                      sync: false,
                    },
                    direction: 'clockwise',
                    enable: false,
                  },
                  twinkle: {
                    lines: {
                      enable: false,
                      frequency: 0.05,
                      opacity: 1,
                    },
                    particles: {
                      enable: false,
                      frequency: 0.05,
                      opacity: 1,
                    },
                  },
                  wobble: {
                    distance: 5,
                    enable: false,
                    speed: {
                      angle: 50,
                      move: 10,
                    },
                  },
                  life: {
                    count: 0,
                    delay: {
                      value: 0,
                      sync: false,
                    },
                    duration: {
                      value: 0,
                      sync: false,
                    },
                  },
                  rotate: {
                    value: {
                      min: 0,
                      max: 360,
                    },
                    animation: {
                      enable: true,
                      speed: 5,
                      decay: 0,
                      sync: false,
                    },
                    direction: 'random',
                    path: false,
                  },
                  orbit: {
                    animation: {
                      count: 0,
                      enable: false,
                      speed: 1,
                      decay: 0,
                      delay: 0,
                      sync: false,
                    },
                    enable: false,
                    opacity: 1,
                    rotation: {
                      value: 45,
                    },
                    width: 1,
                  },
                  links: {
                    blink: false,
                    color: {
                      value: '#fff',
                    },
                    consent: false,
                    distance: 100,
                    enable: false,
                    frequency: 1,
                    opacity: 1,
                    shadow: {
                      blur: 5,
                      color: {
                        value: '#000',
                      },
                      enable: false,
                    },
                    triangles: {
                      enable: false,
                      frequency: 1,
                    },
                    width: 1,
                    warp: false,
                  },
                  repulse: {
                    value: 0,
                    enabled: false,
                    distance: 1,
                    duration: 1,
                    factor: 1,
                    speed: 1,
                  },
                },
                pauseOnBlur: true,
                pauseOnOutsideViewport: true,
                responsive: [],
                smooth: false,
                style: {},
                themes: [],
                zLayers: 100,
                name: 'Images',
                preload: [
                  {
                    gif: false,
                    src: 'https://downloads.runebase.io/runes.gif',
                    height: 50,
                    width: 50,
                    name: 'runebase',
                  },
                ],
                motion: {
                  disable: false,
                  reduce: {
                    factor: 4,
                    value: true,
                  },
                },
              }}
            />
          )}
        </div>

        <div id="particles-js" />
      </section>
    </div>
  );
}

export default ParticlesRunebase;
