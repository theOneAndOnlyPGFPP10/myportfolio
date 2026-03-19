'use client';
import React from 'react';
import styles from '@/styles/pages/home/HomeHero3.module.css';
import { ScrambleText } from '@/components/shared/animations/ScrambleText';
import DescrambleText from '@/components/shared/animations/DescrambleText';
import { env } from '@/lib/env';
import { usePagePhase } from '@/features/shared/usePagePhase';
import MyScrambleText from '@/components/shared/animations/MyScrambleText';

function HomeHero3() {
  const { has } = usePagePhase();
  return (
    <div
      style={{
        width: '100vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '2vw',
      }}
    >
      <div className={styles.question}>
        <h1
          style={{
            transform: has('has-completed') ? 'translateY(0)' : 'translateY(-10vh)',
            opacity: has('has-completed') ? 1 : 0,
            transition: 'opacity 1s ease 3s, transform 0.7s ease 3s',
          }}
        >
          <DescrambleText text={env.HERO_MOTTO} />
        </h1>
      </div>
      <div style={{}} className={`${styles.bottom__edge}`}>
        <ScrambleText text={'[SCROLL TO EXPLORE]'} />
        <MyScrambleText text={'[SCROLL TO EXPLORE]'} />
      </div>
    </div>
  );
}

export default HomeHero3;
