'use client';

import { useEffect } from 'react';

export function usePhaseOrchestrator() {
  useEffect(() => {
    const add = (phase: string) => document.body.classList.add(phase);

    add('has-landed');

    if (document.readyState == 'complete') add('has-loaded');
    else {
      window.addEventListener('load', () => add('has-loaded'), { once: true });
    }

    document.fonts.ready.then(() => add('has-displayed'));

    Promise.all([
      // Wszystkie obrazy
      Promise.all(
        [...document.images].map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.addEventListener('load', res, { once: true });
                img.addEventListener('error', res, { once: true });
              })
        )
      ),
      // Wszystkie video (metadata wystarczy — nie czekamy na cały plik)
      Promise.all(
        [...document.querySelectorAll('video')].map((video) =>
          video.readyState >= 1
            ? Promise.resolve()
            : new Promise((res) => {
                video.addEventListener('loadedmetadata', res, { once: true });
                video.addEventListener('error', res, { once: true });
              })
        )
      ),
    ]).then(() => add('has-completed'));
  }, []);
}
