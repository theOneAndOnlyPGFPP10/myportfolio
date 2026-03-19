'use client';

import { usePagePhase } from '@/features/shared/usePagePhase';
import { useState, useRef, useEffect } from 'react';

const CHARS = '!@#$%^&*()_+[..]01234567890';
const SCRAMBLE_DURATION = 100;
const INTERVAL = 10;

interface ScrambleTextProps {
  text: string;
  mounting?: boolean; // mounting Animation: from "" character -> original string character
}

export function ScrambleText({ text, mounting = true }: ScrambleTextProps) {
  const { has } = usePagePhase();
  const [chars, setChars] = useState<{ char: string; scrambling: boolean }[]>(
    text.split('').map((char) => ({
      char: mounting ? '\u00A0' : char, // ← tu decyduj od razu
      scrambling: false,
    }))
  );
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isAnimating = useRef(false);

  const startScramble = (fromSpaces = false) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    text.split('').forEach((originalChar, i) => {
      const startTimeout = setTimeout(() => {
        // jeśli mounting — od razu ustaw losowy znak bez czekania
        if (fromSpaces) {
          setChars((prev) =>
            prev.map((c, j) =>
              j === i
                ? { char: CHARS[Math.floor(Math.random() * CHARS.length)], scrambling: true }
                : c
            )
          );
        }

        const interval = setInterval(() => {
          setChars((prev) =>
            prev.map((c, j) =>
              j === i
                ? { char: CHARS[Math.floor(Math.random() * CHARS.length)], scrambling: true }
                : c
            )
          );
        }, INTERVAL);

        const stopTimeout = setTimeout(() => {
          clearInterval(interval);
          setChars((prev) =>
            prev.map((c, j) => (j === i ? { char: originalChar, scrambling: false } : c))
          );

          if (i === text.length - 1) {
            isAnimating.current = false;
          }
        }, SCRAMBLE_DURATION);

        timeoutsRef.current.push(stopTimeout);
      }, i * SCRAMBLE_DURATION);

      timeoutsRef.current.push(startTimeout);
    });
  };
  useEffect(() => {
    if (mounting) {
      setTimeout(() => startScramble(true), 3000);
    }
  }, [has('has-completed')]);

  return (
    <span onMouseEnter={()=>startScramble()}>
      {chars.map(({ char, scrambling }, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transition: 'transform 0.2s, background 0.2s ease, color 0.08s ease',
            transform: scrambling ? 'scale(1.3)' : 'scale(1)',
            background: scrambling ? 'var(--foreground)' : 'transparent',
            color: scrambling ? 'black' : 'inherit',
            lineHeight: '1',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
