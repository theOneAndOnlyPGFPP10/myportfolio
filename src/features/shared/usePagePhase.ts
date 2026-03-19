'use client';

import { useState, useEffect } from 'react';

export function usePagePhase() {
  const [classes, setClasses] = useState<Set<string>>(
    () => new Set(typeof document === 'undefined' ? [] : document.body.classList)
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setClasses(new Set(document.body.classList));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return {
    has: (phase: string) => classes.has(phase),
    classes,
  };
}
