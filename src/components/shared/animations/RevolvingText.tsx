'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RevolvingTextProps {
  text: string[];
  interval?: number;
  speed?: number;
}

const CHAR_HEIGHT = 1; // em units

function RevolvingText({ text, interval = 2000, speed = 400 }: RevolvingTextProps) {
  const maxLen = Math.max(...text.map((w) => w.length));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1 % text.length);
  const [rolling, setRolling] = useState(false);
  const [colOffsets, setColOffsets] = useState<number[]>(Array(maxLen).fill(0));
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const padWord = (word: string, len: number): string => {
    const total = len;
    const left = Math.floor((total - word.length) / 2);
    const right = total - word.length - left;
    return ' '.repeat(left) + word + ' '.repeat(right);
  };

  const currentPadded = padWord(text[currentIndex], maxLen);
  const nextPadded = padWord(text[nextIndex], maxLen);

  useEffect(() => {
    const tick = () => {
      const next = (currentIndex + 1) % text.length;
      setNextIndex(next);
      setRolling(true);

      const delays = Array.from({ length: maxLen }, (_, i) => {
        const center = (maxLen - 1) / 2;
        const dist = Math.abs(i - center);
        return dist * 40;
      });

      delays.forEach((delay, col) => {
        setTimeout(() => {
          setColOffsets((prev) => {
            const updated = [...prev];
            updated[col] = -CHAR_HEIGHT;
            return updated;
          });
        }, delay);
      });

      const maxDelay = Math.max(...delays);
      setTimeout(() => {
        setCurrentIndex(next);
        setColOffsets(Array(maxLen).fill(0));
        setRolling(false);
      }, maxDelay + speed);
    };

    timeoutRef.current = setTimeout(tick, interval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, interval, speed, maxLen, text]);

  return (
    <span
      style={{
        display: 'inline-flex',
        fontSize: 'inherit',
        color:"var(--color-third)",
        lineHeight: 1,
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {Array.from({ length: maxLen }).map((_, col) => {
        const curChar = currentPadded[col];
        const nxtChar = nextPadded[col];
        const offset = colOffsets[col];
        const isMoving = offset !== 0;

        const center = (maxLen - 1) / 2;
        const dist = Math.abs(col - center);
        const transitionDelay = isMoving ? `${dist * 40}ms` : '0ms';

        return (
          <span
            key={col}
            style={{
              display: 'inline-block',
              width: '0.6em',
              height: '1em',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                transform: `translateY(${offset}em)`,
                transition: isMoving
                  ? `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1) ${transitionDelay}`
                  : 'none',
              }}
            >
              <span
                style={{
                  height: '1em',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {curChar === ' ' ? '\u00A0' : curChar}
              </span>
              <span
                style={{
                  height: '1em',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {nxtChar === ' ' ? '\u00A0' : nxtChar}
              </span>
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default RevolvingText;