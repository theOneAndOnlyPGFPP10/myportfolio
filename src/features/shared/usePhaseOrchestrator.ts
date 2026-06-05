'use client';

import { useEffect } from 'react';

export function usePhaseOrchestrator() {
  useEffect(() => {
    const add = (phase: string) => document.body.classList.add(phase);

    const addNextFrame = (phase: string) =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => {
          add(phase);
          resolve();
        })
      );

    // Nasłuch na zasoby startuje NATYCHMIAST — nie czeka na sekwencję wizualną
    const resourcesReady = Promise.all([
      Promise.all(
        [...document.images].map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((res) => {
                img.addEventListener('load', () => res(), { once: true });
                img.addEventListener('error', () => res(), { once: true });
              })
        )
      ),
      Promise.all(
        [...document.querySelectorAll('video')].map((video) =>
          video.readyState >= 1
            ? Promise.resolve()
            : new Promise<void>((res) => {
                video.addEventListener('loadedmetadata', () => res(), { once: true });
                video.addEventListener('error', () => res(), { once: true });
              })
        )
      ),
    ]);

    // Sekwencja klas — tylko wizualna, nie blokuje ładowania
    (async () => {
      await addNextFrame('has-landed');

      await new Promise<void>((resolve) => {
        if (document.readyState === 'complete') resolve();
        else window.addEventListener('load', () => resolve(), { once: true });
      });
      await addNextFrame('has-loaded');

      await document.fonts.ready;
      await addNextFrame('has-displayed');

      // Czeka na wynik — ale promise już dawno startował
      await resourcesReady;
      await addNextFrame('has-completed');
    })();
  }, []);
}
