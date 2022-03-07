import React, { useEffect, useState } from 'react';

import TweenOne from 'rc-tween-one';

const animate: any = {
  circle1: {
    type: 'from',
    ease: 'easeOutQuad',
  },
  circle2: {
    scale:'1.2',
    type: 'from',
    ease: 'easeOutQuad',
  },
 rect1:{
    type: 'from',
    ease: 'easeOutQuad',
 },
 diamond1:{
    scale:'1.5',
    type: 'from',
    ease: 'easeOutQuad',
 },
  loop: {
    yoyo: true,
    repeat: -1,
    duration: 2500,
  },
};

const Banner: any = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    init && (
      <svg viewBox="0 0 1440 448">
        <g transform="translate(380, 30)" opacity="1">
          <TweenOne
            component="g"
            animation={[{ ...animate.circle1 }, { y: 10, ...animate.loop }]}
          >
            <svg>
              <defs>
                <filter id="banner-circle-shadow-1">
                  <feDropShadow
                    dx="10"
                    dy="10"
                    stdDeviation="10"
                    floodColor="rgba(0,0,0,0.05)"
                  ></feDropShadow>
                </filter>
                <linearGradient
                  id="banner-circle-fill-1"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" style={{ stopColor: '#FAFCFE' }}></stop>
                  <stop offset="100%" style={{ stopColor: '#F9FCFE' }}></stop>
                </linearGradient>
              </defs>
              <circle
                cx="170"
                cy="170"
                r="140"
                fill="url(#banner-circle-fill-1)"
                filter="url(#banner-circle-shadow-1)"
              ></circle>
            </svg>
          </TweenOne>
        </g>
        <g transform="translate(-230, 218)" opacity="1">
          <TweenOne
            component="g"
            animation={[{ ...animate.circle2 }, { y: 15, ...animate.loop }]}
          >
            <svg>
              <defs>
                <filter id="banner-circle-shadow-2">
                  <feDropShadow
                    dx="10"
                    dy="10"
                    stdDeviation="10"
                    floodColor="rgba(0,0,0,0.05)"
                  ></feDropShadow>
                </filter>
                <linearGradient
                  id="banner-circle-fill-2"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" style={{ stopColor: '#FAFCFE' }}></stop>
                  <stop offset="50%" style={{ stopColor: '#F3F9FC' }}></stop>
                </linearGradient>
              </defs>
              <circle
                cx="230"
                cy="230"
                r="200"
                fill="url(#banner-circle-fill-2)"
                filter="url(#banner-circle-shadow-2)"
              ></circle>
            </svg>
          </TweenOne>
        </g>
        <g transform="translate(1280, 180)" opacity="1">
        <TweenOne
            component="g"
            animation={[{ ...animate.rect1 }, { x: 20, ...animate.loop }]}
          >
              <svg>
                <defs>
                  <filter id="banner-rect-shadow-1">
                    <feDropShadow
                      dx="10"
                      dy="10"
                      stdDeviation="10"
                      floodColor="rgba(0,0,0,0.05)"
                    ></feDropShadow>
                  </filter>
                  <linearGradient
                    id="banner-rect-fill-1"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="25%" style={{ stopColor: '#F8FCFF' }}></stop>
                    <stop offset="100%" style={{ stopColor: '#F8FBFF' }}></stop>
                  </linearGradient>
                </defs>
                <rect
                  x="30"
                  y="30"
                  width="180"
                  height="180"
                  fill="url(#banner-rect-fill-1)"
                  filter="url(#banner-rect-shadow-1)"
                ></rect>
              </svg>
           </TweenOne>
        </g>
        <g transform="translate(670, -660)" opacity="1">
        <TweenOne
            component="g"
            animation={[{ ...animate.diamond1 }, { y: 20, ...animate.loop }]}
          >
              <svg width="860" height="860">
                <defs>
                  <filter id="banner-diamond-shadow-1">
                    <feDropShadow
                      dx="10"
                      dy="10"
                      stdDeviation="10"
                      floodColor="rgba(0,0,0,0.05)"
                    ></feDropShadow>
                  </filter>
                  <linearGradient
                    id="banner-diamond-fill-1"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="60%" style={{ stopColor: '#FCFDFF' }}></stop>
                    <stop offset="100%" style={{ stopColor: '#FCFDFE' }}></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M 30 430 430 30 830 430 430 830 Z"
                  fill="url(#banner-diamond-fill-1)"
                  filter="url(#banner-diamond-shadow-1)"
                ></path>
              </svg>
           </TweenOne>
        </g>
      </svg>
    )
  );
};

export default Banner;
