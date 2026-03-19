'use client';

import React from 'react';
import styles from '../../styles/shared/NavBar.module.css';
import Link from 'next/link';
import { ScrambleText } from './animations/ScrambleText';
import Logo from './Logo';
import { usePagePhase } from '@/features/shared/usePagePhase';

function NavBar() {
  const { has } = usePagePhase();
  const sections: string[] = [
    // 'index',
    'about',
    // 'blog',
    // 'playground',
    // 'insider'
  ];
  return (
    <div className={`${styles.navbar}`}>
      <Logo />
      <div id="menu" className={`${styles.navbar__section_list}`}>
        {sections.map((section: string, index: number) => (
          <Link
            key={index}
            href={`#${section}`}
            onMouseEnter={() => console.log('hover link')}
            style={{
              transform: has('has-completed') ? `translateY(0px)` : `translateY(100px)`,
              transition: `all 1s ease ${0.1 * index + 2}s`,
            }}
            className={`${index == sections.length - 1 ? styles.special : undefined}`}
          >
            {section.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
