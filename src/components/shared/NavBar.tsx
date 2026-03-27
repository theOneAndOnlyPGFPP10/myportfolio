'use client';

import React from 'react';
import styles from '../../styles/shared/NavBar.module.css';
import Link from 'next/link';
import Logo from './Logo';
import { usePagePhase } from '@/features/shared/usePagePhase';
import ToggleTheme from './buttons/ToggleTheme';

function NavBar() {
  const { has } = usePagePhase();
  const color = has('has-completed') && has('light') ? 'var(--background)' : 'var(--foreground)';
  const sections: string[] = ['index', 'about', 'blog', 'playground', 'insider'];

  return (
    <div style={{ color }} className={`${styles.navbar}`}>
      <Link href={'/'}>
        <Logo />
      </Link>
      <div className={styles.navbar_menu}>
        <div id="menu" className={`${styles.navbar__section_list}`}>
          {sections.map((section: string, index: number) => {
            const specialStyle = sections.length - 1 == index;
            return (
              <Link
                key={index}
                href={`#${section}`}
                onMouseEnter={() => console.log('hover link')}
                style={{
                  transform: has('has-landed') ? `translateY(0px)` : `translateY(100px)`,
                  transition: `all 1s ease ${0.1 * index + 2}s`,
                  color: specialStyle ? (has('dark') ? 'var(--background)' : 'var(--foreground)') : 'inherit',
                  backgroundColor: specialStyle
                    ? has('dark')
                      ? 'var(--foreground)'
                      : 'var(--background)'
                    : 'transparent',
                  padding: specialStyle ? '0 10px' : undefined,
                }}
                className={`${index == sections.length - 1 ? styles.special : undefined}`}
              >
                {section.toUpperCase()}
              </Link>
            );
          })}
        </div>
        <div
          style={{
            overflow: 'hidden',
            width: 'fit-content',
            height: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              transform: has('has-landed') ? `translateY(0px)` : `translateY(-100px)`,
              transition: `all 1s ease ${0.1 * sections.length + 2}s`,
            }}
          >
            <ToggleTheme />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
