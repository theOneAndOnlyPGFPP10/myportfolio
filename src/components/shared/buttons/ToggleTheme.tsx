'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/shared/ToggleTheme.module.css';
import { Sun, Moon } from 'lucide-react';

function ToggleTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('light', !isDark);
  }, [isDark]);

  return (
    <div
      className={`${styles.theme_modes} ${isDark ? styles.dark : styles.light}`}
      onClick={() => setIsDark((prev) => !prev)}
    >
      <div className={styles.inner}>
        <Moon />
        <span className={styles.separator}>|</span>
        <Sun />
      </div>
    </div>
  );
}

export default ToggleTheme;
