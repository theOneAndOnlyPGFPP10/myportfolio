'use client';

import { ImageProps } from '@/lib/services';
import { useEffect, useState } from 'react';

type Props = {
  images: ImageProps[];
  initialIndex?: number;
  interval?: number;
  backgroundColor?: string;
};

export default function FlipCircle({
  images,
  initialIndex = 0,
  interval = 10000,
  backgroundColor = 'var(--color-fourth)',
}: Props) {
  const [rotation, setRotation] = useState(0); // 🔥 rośnie cały czas
  const [frontIndex, setFrontIndex] = useState(initialIndex);
  const [backIndex, setBackIndex] = useState((initialIndex + 1) % images.length);

  // która strona aktualnie widoczna
  const isFrontVisible = rotation % 360 === 0;

  const flip = () => {
    setRotation((prev) => prev + 180);
  };

  // AUTO FLIP
  useEffect(() => {
    const timer = setInterval(flip, interval);
    return () => clearInterval(timer);
  }, []);

  // 🔥 PO OBROCIE → aktualizujemy ukryty obraz
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (rotation % 360 === 180) {
        // teraz widoczny jest BACK
        setFrontIndex((backIndex + 1) % images.length);
      } else {
        // widoczny FRONT
        setBackIndex((frontIndex + 1) % images.length);
      }
    }, 800); // musi być = czas animacji

    return () => clearTimeout(timeout);
  }, [rotation]);

  return (
    <div
      onMouseEnter={flip}
      style={{
        width: '100%',
        aspectRatio: '1/1',
        perspective: '1000px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '50%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.65,0,0.35,1)',
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backfaceVisibility: 'hidden',
            overflow: 'hidden',
            backgroundColor,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${images[frontIndex].src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        {/* BACK */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            overflow: 'hidden',
            backgroundColor,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${images[backIndex].src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </div>
    </div>
  );
}
