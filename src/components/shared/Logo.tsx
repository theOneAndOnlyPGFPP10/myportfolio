'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/shared/Logo.module.css';
import { usePagePhase } from '@/features/shared/usePagePhase';

const MIN_DURATION = 1000;

function Logo() {
  const { has } = usePagePhase();

  const [count, setCount] = useState(0);
  const [showLogoRest, setShowLogoRest] = useState(false);

  const startTime = useRef<number | null>(null);
  const finished = useRef(false);
  const revealTriggered = useRef(false);
  const animateRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    animateRef.current = (time: number) => {
      if (finished.current) return;

      if (!startTime.current) startTime.current = time;

      const elapsed = time - startTime.current;
      const progress = Math.min(elapsed / MIN_DURATION, 1);

      // ease-out cubic — zwalnia pod koniec
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * 100);
      const clamped = Math.min(value, has('has-completed') ? 101 : 100);

      setCount(clamped);

      if (clamped >= 100 && !revealTriggered.current) {
        revealTriggered.current = true;
        setShowLogoRest(true);
      }

      if (progress < 1 || !has('has-completed')) {
        requestAnimationFrame(animateRef.current!);
        return;
      }

      finished.current = true;
      setCount(100);
    };

    requestAnimationFrame(animateRef.current);
  }, []);

  return (
    <div id="logo" className={styles.logo_container}>
      <div
        style={{
          maxWidth: has('has-completed') ? 0 : 2000,
          transition: `max-width 1s ease 1s`,
        }}
        className={styles.logo_counter}
      >
        <p id="counter" className={styles.bigger_letter}>
          {String(count).padStart(3, '0')}
        </p>
      </div>

      <div className={styles.logo}>
        <div
          style={{
            transform: showLogoRest ? undefined : 'rotateZ(0deg) rotateY(-180deg)',
            transition: 'all 0.5s ease',
          }}
          className={styles.bigger_letters_container}
        >
          <p
            style={{
              transform: showLogoRest ? undefined : 'rotate(-180deg)',
              fontSize: showLogoRest ? 'var(--bigger-letter)' : 'calc(var(--bigger-letter) * 80%)',
            }}
            className={`${styles.bigger_letter}`}
          >
            P
          </p>
          <p
            style={{
              display: showLogoRest ? 'none' : undefined,
              transition: 'display 0.5s',
              fontSize: showLogoRest ? 'var(--bigger-letter)' : 'calc(var(--bigger-letter) * 80%)',
            }}
            className={styles.bigger_letter}
          >
            P
          </p>
        </div>

        <div
          className={styles.logo_rest}
          style={{
            width: 'fit-content',
            maxWidth: has('has-completed') ? 1000 : 0,
            opacity: showLogoRest ? 1 : 0,
            transition: 'opacity 1s ease 1.3s, max-width 1.2s ease 1.6s',
          }}
        >
          <p>AWEL</p>
          <p>ENTA</p>
        </div>
      </div>
    </div>
  );
}

export default Logo;
