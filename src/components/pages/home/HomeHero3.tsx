'use client';

import DescrambleText from '@/components/shared/animations/DescrambleText';
import { ScrambleText } from '@/components/shared/animations/ScrambleText';
import { usePagePhase } from '@/features/shared/usePagePhase';
import { my_images } from '@/lib/services';
import { env } from '@/lib/env';
import styles from '@/styles/pages/home/HomeHero3.module.css';
import { useEffect, useState } from 'react';
import FlipCircle from '@/components/shared/FlippingCircle';

function HomeHero3() {
  const { has } = usePagePhase();
  const [isMounted, setIsMounted] = useState(false);
  const hasCompleted = has('has-completed');
  useEffect(() => {
    if (!hasCompleted) return;
    const delay = setTimeout(() => {
      setIsMounted(true);
    }, 3000);

    return () => {
      clearTimeout(delay);
    };
  }, [hasCompleted]);
  return (
    <div className={styles.hero_wrapper}>
      <div className={styles.question}>
        <div style={{ scale: hasCompleted ? '1' : '0' }} className={styles.flip_circle_container}>
          <FlipCircle images={my_images} initialIndex={0} interval={10000} />
        </div>

        <h1
          className={styles.question_title}
          style={{
            transform: has('has-completed') ? 'translateY(0)' : 'translateY(-10vh)',
            opacity: has('has-completed') ? 1 : 0,
            // color:"red"
          }}
        >
          <DescrambleText text={env.HERO_MOTTO} />
        </h1>
      </div>
      <div className={styles.bottom__edge}>
        <ScrambleText mounting={isMounted} text={'[SCROLL TO EXPLORE]'} />
      </div>
    </div>
  );
}

export default HomeHero3;
