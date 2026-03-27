'use client';

import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePagePhase } from '@/features/shared/usePagePhase';
import styles from '@/styles/shared/ScrambleText.module.css';

const CHARS = '!@#$%^&*()_+[..]01234567890';

/** Private-use placeholder for `<br>` / newline after parsing (not shown as glyph). */
const LINE_BREAK = '\uE000';

/** `<br>`, `<br/>`, `<br />`, `</br>`, `\n` → single line-break token for layout + animation slot. */
function parseBrEscapes(input: string): string {
  return input
    .replace(/\r\n/g, '\n')
    .replace(/<\s*\/?\s*br\s*\/?\s*>/gi, '\n')
    .replace(/\n/g, LINE_BREAK);
}

type ScrambleTextProps = {
  text: string;
  mounting?: boolean;
  scrambleDuration?: number; // mounting Animation: from "" character -> original string character
};

export function ScrambleText({ text, mounting = true, scrambleDuration = 100 }: ScrambleTextProps) {
  const INTERVAL = scrambleDuration / 10;
  const { has } = usePagePhase();
  const hasCompleted = has('has-completed');
  const displayText = useMemo(() => parseBrEscapes(text), [text]);
  const textChars = useMemo(() => displayText.split(''), [displayText]);
  const initialChars = useMemo(
    () =>
      textChars.map(() => ({
        char: '\u00A0',
        scrambling: false,
      })),
    [textChars]
  );
  const [chars, setChars] = useState<{ char: string; scrambling: boolean }[]>(initialChars);
  const isAnimating = useRef(false);
  const scrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const charsStateRef = useRef(chars);
  const baselineCharsRef = useRef<{ char: string; scrambling: boolean }[]>([]);
  const startTsRef = useRef<number>(0);

  useEffect(() => {
    charsStateRef.current = chars;
  }, [chars]);

  const clearAllTimers = useCallback(() => {
    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    scrambleIntervalRef.current = null;
  }, []);

  const startScramble = useCallback(() => {
    if (isAnimating.current) return;

    if (textChars.length === 0) {
      return;
    }

    isAnimating.current = true;
    // Snapshot baseline so "not started yet" letters keep their pre-scramble value.
    baselineCharsRef.current = charsStateRef.current.map((c) => ({ ...c }));

    startTsRef.current = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const startAt = 0;
    const lastIndex = textChars.length - 1;
    const totalDuration = (lastIndex + 1) * scrambleDuration; // each char i runs for SCRAMBLE_DURATION

    const tick = () => {
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const elapsed = now - startTsRef.current - startAt;

      if (elapsed >= totalDuration) {
        clearAllTimers();
        isAnimating.current = false;
        setChars(
          textChars.map((originalChar) => ({
            char: originalChar,
            scrambling: false,
          }))
        );
        return;
      }

      setChars(() => {
        const next = baselineCharsRef.current.map((base, i) => {
          const originalChar = textChars[i];

          if (originalChar === LINE_BREAK) {
            return { char: LINE_BREAK, scrambling: false };
          }

          const charStart = i * scrambleDuration;
          const charEnd = charStart + scrambleDuration;
          const isActive = elapsed >= charStart && elapsed < charEnd;
          const isDone = elapsed >= charEnd;

          if (isDone) {
            return { char: originalChar, scrambling: false };
          }

          if (isActive) {
            return { char: CHARS[Math.floor(Math.random() * CHARS.length)], scrambling: true };
          }

          // Not started yet: keep baseline (for mounting baseline is spaces).
          return { char: base.char, scrambling: false };
        });

        return next;
      });
    };

    // Replace N intervals with a single interval.
    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    tick();
    scrambleIntervalRef.current = setInterval(tick, INTERVAL);
  }, [textChars]);

  useEffect(() => {
    let mountTimeout: ReturnType<typeof setTimeout> | undefined;
    if (mounting && hasCompleted) {
      // When mounting flips to true, force starting frame from spaces.
      setChars(
        textChars.map(() => ({
          char: '\u00A0',
          scrambling: false,
        }))
      );
      // Start soon after mounting to avoid long "idle" waiting.
      mountTimeout = setTimeout(() => startScramble(), 600);
    }
    return () => {
      if (mountTimeout) clearTimeout(mountTimeout);
    };
  }, [hasCompleted, mounting, startScramble, textChars]);

  useEffect(() => {
    return () => {
      clearAllTimers();
      isAnimating.current = false;
    };
  }, [clearAllTimers]);

  const charSpan = (i: number) => {
    if (displayText[i] === LINE_BREAK) {
      return <br key={i} />;
    }
    const { char, scrambling } = chars[i];
    return (
      <span
        key={i}
        className={styles.char}
        style={{
          transform: scrambling ? 'scale(1.3)' : 'scale(1)',
          background: scrambling ? 'var(--foreground)' : 'inherit',
          color: scrambling ? (has('dark') ? 'black' : 'white') : 'inherit',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    );
  };

  const groupedByWord: ReactNode[] = [];
  let i = 0;
  const len = displayText.length;
  while (i < len) {
    if (displayText[i] === LINE_BREAK) {
      groupedByWord.push(charSpan(i));
      i += 1;
    } else if (/\s/.test(displayText[i])) {
      groupedByWord.push(charSpan(i));
      i += 1;
    } else {
      const start = i;
      while (i < len && displayText[i] !== LINE_BREAK && !/\s/.test(displayText[i])) i += 1;
      groupedByWord.push(
        <span key={`w-${start}`} className={styles.word}>
          {Array.from({ length: i - start }, (_, k) => charSpan(start + k))}
        </span>
      );
    }
  }

  return <span onMouseEnter={() => (mounting ? startScramble() : null)}>{groupedByWord}</span>;
}
