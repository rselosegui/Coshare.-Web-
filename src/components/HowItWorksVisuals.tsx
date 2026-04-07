import React from 'react';

const Img = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    className="drop-shadow-2xl scale-100 md:scale-[2.6]"
    style={{
      height: '35vh',
      width: 'auto',
      objectFit: 'contain',
      transformOrigin: 'center center',
    }}
  />
);

export const Visual1 = () => <Img src="/assets/step-1-browse.png" alt="Browse Assets" />;
export const Visual2 = () => <Img src="/assets/step-2-legal.png" alt="Legal and Financial" />;
export const Visual3 = () => <Img src="/assets/step-3-scheduling.png" alt="Smart Scheduling" />;
export const Visual4 = () => <Img src="/assets/step-4-services.png" alt="Additional Services" />;