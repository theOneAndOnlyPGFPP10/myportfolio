'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '@/lib/lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      smoothTouch: false,
      autoRaf: true,
    });

    setLenis(lenis); // 👈 rejestruj globalnie

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
