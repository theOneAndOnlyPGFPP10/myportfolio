'use client';

import { useEffect, useRef } from 'react';
import { env } from '@/lib/env';
import styles from '@/styles/pages/home/ParallaxHero.module.css';
import { en } from 'zod/locales';

// ---------------------------------------------------------------------------
// Typy
// ---------------------------------------------------------------------------
interface LayerConfig {
  id: string;
  speed: number; // px przesunięcia na 1px scrolla (ujemne = ruch w górę)
}

// ---------------------------------------------------------------------------
// Konfiguracja warstw paralaksy
// Kolejność ma znaczenie – renderowane od tyłu do przodu
// ---------------------------------------------------------------------------
const LAYER_CONFIGS: LayerConfig[] = [
  { id: 'layer-tri', speed: -0.35 }, // trójkąt – bazowa warstwa
  { id: 'layer-bg', speed: -0.65 }, // krążek  – do przodu
  { id: 'layer-edges', speed: -0.55 }, // teksty wzdłuż krawędzi
  { id: 'layer-title', speed: -0.8 }, // napis poziomy – najbliżej
];

// Profesja pod i nad maską
const PROFF = 'WEB DESIGNER';
const PROJ_NAME = env.PROJECTS_FULL_NAME.toUpperCase();

// Maska porusza się z tą samą prędkością co trójkąt,
// żeby granica biały/granatowy zawsze pokrywała krawędź trójkąta
const MASK_SPEED = -0.35;

// Współczynnik wygładzania lerp (0–1, im mniejszy tym "leniwszy" ruch)
const LERP_FACTOR = 0.08;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ---------------------------------------------------------------------------
// Komponent
// ---------------------------------------------------------------------------
export default function ParallaxHero() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef<number[]>(LAYER_CONFIGS.map(() => 0));
  const targetRef = useRef<number[]>(LAYER_CONFIGS.map(() => 0));
  const maskCurRef = useRef(0);
  const maskTgtRef = useRef(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Pobieramy referencje do grup SVG raz przy montowaniu
    const layerEls = LAYER_CONFIGS.map(({ id }) => svg.getElementById(id) as SVGGElement | null);
    const maskPoly = svg.getElementById('mask-poly') as SVGPolygonElement | null;

    function animate() {
      let needsUpdate = false;

      LAYER_CONFIGS.forEach((_, i) => {
        const el = layerEls[i];
        if (!el) return;

        currentRef.current[i] = lerp(currentRef.current[i], targetRef.current[i], LERP_FACTOR);
        el.setAttribute('transform', `translate(0, ${currentRef.current[i].toFixed(2)})`);

        if (Math.abs(currentRef.current[i] - targetRef.current[i]) > 0.05) {
          needsUpdate = true;
        }
      });

      // Maska
      if (maskPoly) {
        maskCurRef.current = lerp(maskCurRef.current, maskTgtRef.current, LERP_FACTOR);
        maskPoly.setAttribute('transform', `translate(0, ${maskCurRef.current.toFixed(2)})`);
        if (Math.abs(maskCurRef.current - maskTgtRef.current) > 0.05) needsUpdate = true;
      }

      if (needsUpdate) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    }

    function onScroll() {
      const scrollY = window.scrollY;

      LAYER_CONFIGS.forEach(({ speed }, i) => {
        targetRef.current[i] = scrollY * speed;
      });

      maskTgtRef.current = scrollY * MASK_SPEED;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.scene}>
        <svg
          ref={svgRef}
          className={styles.svg}
          viewBox="-50 -20 580 460"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Project Hermes – Pawel Pienta"
        >
          <defs>
            {/* Ścieżki dla textPath */}
            <path id="top-edge" d="M 30 2 L 450 2" />
            {/* Lewa krawędź odwrócona → napis obrócony o 180° */}
            <path id="left-edge" d="M 6 16 L 216 380" />
            <path id="right-edge" d="M 264 380 L 474 16" />

            <mask id="tri-mask" maskUnits="userSpaceOnUse">
              <polygon id="mask-poly" points="30,30 450,30 240,364" fill="white" />
            </mask>
          </defs>

          {/* ── WARSTWA 1: trójkąt ── */}
          <g id="layer-tri" className={styles.layer}>
            <polygon points="30,30 450,30 240, 394" fill="var(--navy)" />
          </g>

          {/* ── WARSTWA 2: krążek (do przodu – szybszy niż trójkąt) ── */}
          <g id="layer-bg" className={styles.layer}>
            <circle cx="240" cy="220" r="85" fill="#7ECECE" />
            {/* 寿司レシピ = "przepis na sushi" */}
            <text
              x="240"
              y="220"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="24"
              fill="#1A1A2E"
            >
              寿司
            </text>
            <text
              x="240"
              y="247"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="24"
              fill="#1A1A2E"
            >
              レシピ
            </text>
            <polygon points="240,267 231,283 249,283" fill="#1A1A2E" />
          </g>

          {/* ── WARSTWA 3: teksty wzdłuż krawędzi ── */}
          <g id="layer-edges" className={styles.layer}>
            <text
              fontFamily="serif"
              fontSize="12"
              fill="#8B7A8A"
              letterSpacing="2.5"
              textAnchor="middle"
            >
              <textPath href="#top-edge" startOffset="50%">
                INSPIRED BY DESIGNERS FROM AROUND THE WORLD
              </textPath>
            </text>

            {/* Lewa krawędź – obrócona o 180°, czyta się od góry w dół */}
            <text
              fontFamily="sans-serif"
              fontSize="12"
              fill="#3A3A5C"
              letterSpacing="3"
              fontWeight="bold"
              textAnchor="middle"
            >
              <textPath href="#left-edge" startOffset="70%">
                {PROJ_NAME}
              </textPath>
            </text>

            <text
              fontFamily="serif"
              fontSize="12"
              fill="#2B2B3A"
              letterSpacing="5"
              opacity="0.55"
              textAnchor="middle"
            >
              <textPath href="#right-edge" startOffset="30%">
                {env.AUTHORS_NAME} · 2026
              </textPath>
            </text>
          </g>

          {/* ── WARSTWA 4: napis poziomy z maską ── */}
          <g id="layer-title" className={styles.layer}>
            {/* Granatowy – widoczny poza trójkątem */}
            <text
              x="240"
              y="90"
              textAnchor="middle"
              fontFamily="var(--font-triangulate)"
              fontSize="32"
              fontWeight="900"
              letterSpacing="10"
              fill="var(--navy)"
            >
              {PROFF}
            </text>
            {/* Biały – widoczny tylko wewnątrz trójkąta (maska) */}
            <text
              x="240"
              y="90"
              textAnchor="middle"
              fontFamily="var(--font-triangulate)"
              fontSize="32"
              fontWeight="900"
              letterSpacing="10"
              fill="white"
              mask="url(#tri-mask)"
            >
              {PROFF}
            </text>
            <text
              x="240"
              y="130"
              textAnchor="middle"
              fontFamily="var(--font-triangulate)"
              fontSize="32"
              fontWeight="900"
              letterSpacing="10"
              fill="white"
              mask="url(#tri-mask)"
            >
              AND
            </text>
            <text
              x="240"
              y="170"
              textAnchor="middle"
              fontFamily="var(--font-triangulate)"
              fontSize="32"
              fontWeight="900"
              letterSpacing="10"
              fill="var(--navy)"
            >
              ENGINEER
            </text>
            <text
              x="240"
              y="170"
              textAnchor="middle"
              fontFamily="var(--font-triangulate)"
              fontSize="32"
              fontWeight="900"
              letterSpacing="10"
              fill="white"
              mask="url(#tri-mask)"
            >
              ENGINEER
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
