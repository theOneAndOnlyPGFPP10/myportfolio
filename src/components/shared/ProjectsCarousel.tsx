'use client';

import React, { useState, useEffect } from 'react';
import { m, useTransform, MotionValue } from 'motion/react';
import styles from '@/styles/shared/ProjectsCarousel.module.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(160deg, #0f2027, #203a43, #2c5364)',
  'linear-gradient(160deg, #1a0533, #6a0572, #ab47bc)',
  'linear-gradient(160deg, #0d0d0d, #b71c1c, #e53935)',
  'linear-gradient(160deg, #1b4332, #2d6a4f, #74c69d)',
  'linear-gradient(160deg, #03071e, #370617, #f48c06)',
  'linear-gradient(160deg, #10002b, #240046, #e0aaff)',
  'linear-gradient(160deg, #001233, #023e8a, #48cae4)',
  'linear-gradient(160deg, #1a1a1a, #a8390a, #f4a261)',
];

const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];

async function fetchImagePaths(): Promise<string[]> {
  try {
    const res = await fetch('/api/narration-images');
    if (!res.ok) return [];
    const data = await res.json() as { images: string[] };
    return data.images
      .filter((f) => IMAGE_EXTS.some((ext) => f.toLowerCase().endsWith(`.${ext}`)))
      .map((f) => `/images/narration/${f}`);
  } catch {
    return [];
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProjectsCarouselProps {
  scrollYProgress: MotionValue<number>;
  scrollRange?: [number, number];
}

interface CardProps {
  src: string | null;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  scrollRange: [number, number];
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function CarouselCard({ src, index, total, scrollYProgress, scrollRange }: CardProps) {
  const [loaded, setLoaded] = useState(false);

  const [rangeStart, rangeEnd] = scrollRange;
  const span = rangeEnd - rangeStart;

  // Each card reveals one after another with slight overlap between windows
  const step      = span / (total + 1);
  const cardStart = rangeStart + index * step * 0.8;
  const cardEnd   = Math.min(cardStart + step * 1.2, rangeEnd);

  // Slides up from below and fades in
  const y       = useTransform(scrollYProgress, [cardStart, cardEnd], ['60px', '0px']);
  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardStart + (cardEnd - cardStart) * 0.55],
    [0, 1],
  );

  // Horizontal position: first card at left:0, last card near right edge
  // Cards overlap — each step moves ~(cardWidth * 0.55) to the right
  // We express this as a percentage of the track width
  const leftPercent = (index / (total - 1)) * 78; // 0% → 78%

  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];

  // Later cards render on top (higher z-index) so they cover earlier ones
  const zIndex = index + 1;

  return (
    <m.div
      className={styles.card_wrapper}
      style={{
        y,
        opacity,
        left: `${leftPercent}%`,
        zIndex,
      }}
    >
      <div className={styles.card}>
        {/* Placeholder gradient — fades out once image loads */}
        <div
          className={styles.card_placeholder}
          style={{
            background: gradient,
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Shimmer while loading */}
        {!loaded && src && <div className={styles.card_shimmer} />}

        {/* Real image */}
        {src && (
          <img
            src={src}
            alt=""
            aria-hidden
            draggable={false}
            className={styles.card_image}
            style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
            onLoad={() => setLoaded(true)}
          />
        )}

        <div className={styles.card_gloss} />
      </div>
    </m.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ProjectsCarousel({
  scrollYProgress,
  scrollRange = [0.55, 0.95],
}: ProjectsCarouselProps) {
  const [imagePaths, setImagePaths] = useState<(string | null)[]>([]);

  useEffect(() => {
    fetchImagePaths().then((paths) => {
      setImagePaths(paths.length > 0 ? paths : Array.from({ length: 6 }, () => null));
    });
  }, []);

  const items = imagePaths.length > 0
    ? imagePaths
    : Array.from({ length: 6 }, () => null);

  return (
    <div className={styles.carousel_root}>
      <div className={styles.cards_track}>
        {items.map((src, i) => (
          <CarouselCard
            key={src ?? `placeholder-${i}`}
            src={src}
            index={i}
            total={items.length}
            scrollYProgress={scrollYProgress}
            scrollRange={scrollRange}
          />
        ))}
      </div>
    </div>
  );
}