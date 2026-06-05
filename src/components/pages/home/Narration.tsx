'use client';

import { useRef, useState } from 'react';
import { Video } from '@/components/shared/Video';
import { services, ServiceGroup } from '@/utils/lib/services';
import styles from '@/styles/pages/home/Narration.module.css';
import { domAnimation, LazyMotion, m, useInView, useScroll, useTransform } from 'motion/react';
import { ScrambleText } from '@/components/shared/animations/ScrambleText';
import { usePagePhase } from '@/features/shared/usePagePhase';
import Link from 'next/link';

function BluredSideNote({ original, side }: { original: string; side: string }) {
  const refBluredSN = useRef<HTMLDivElement>(null);

  const isInView = useInView(refBluredSN, {
    margin: '-62% 0px 100% 0px',
    amount: 0.5,
    once: false, // trzeba żeby cofnięcie działało
  });

  return (
    <span ref={refBluredSN} className={styles.side_note}>
      <m.span
        style={{
          filter: !isInView ? 'blur(50px)' : 'blur(0px)',
          opacity: !isInView ? 0 : 1,
          transition: 'all 1s ease',
        }}
        className={styles.original_text_side}
      >
        {original}
      </m.span>

      <m.div
        style={{
          filter: !isInView ? 'blur(0px)' : 'blur(12px)',
          opacity: !isInView ? 1 : 0,
          lineHeight: !isInView ? '0.9' : '0',
          transition: 'all 1s ease',
        }}
        className={styles.side_note_container}
      >
        <p>{side}</p>
      </m.div>
    </span>
  );
}

// CARD

function Card({ service }: { service: ServiceGroup }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={styles.card}
    >
      <h3 className={styles.card_title}>{service.serviceCategory.toUpperCase()}</h3>

      <div
        style={{
          backgroundColor: 'black',
          padding: visible ? '0 10px' : undefined,
          position: 'absolute',
          top: '50%',
          left: '15%',
          transform: `translate3d(${mouse.x * 0.05}px, ${mouse.y * 0.05}px, 0)`,
          width: 'fit-content',
          maxWidth: visible ? '1000vw' : '0',
          overflow: 'hidden',
          scale: visible ? '1' : '0.85',
          transition: [
            'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            'max-width 3s ease',
            'scale 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          ].join(', '),
          willChange: 'transform, max-width, scale',
          pointerEvents: 'none',
        }}
        className={styles.service_desc}
      >
        <p style={{ mixBlendMode: 'difference', fontSize: 'clamp(10px, 2vw, 240px)', whiteSpace: 'nowrap' }}>
          {service.description}
        </p>
      </div>
    </div>
  );
}
// END of CARD

function Narration() {
  const { has } = usePagePhase();
  const refNarration = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: refNarration,
    offset: ['start center', 'end end'],
  });

  const opacityVideo = useTransform(scrollYProgress, [0, 0.5, 1], ['0.3', '0.15', '0.15']);
  const isInView = useInView(refNarration, {
    once: false, // trzeba żeby cofnięcie działało
  });

  return (
    <LazyMotion features={domAnimation}>
      <div ref={refNarration} className={styles.narration_wrapper}>
        <div>
          <h1
            style={{
              color: has('dark') ? 'var(--color-fifth)' : '',
              fontSize: 'clamp(10px, 14vw, 550px)',
              textAlign: 'center',
            }}
          >
            THE <ScrambleText mounting={isInView} text={'BEAUTY'} scrambleDuration={700} /> OF{' '}
            <BluredSideNote
              original="SMART Systems"
              side="Endless digital possibilities that you can implement even at your home by yourself!"
            />
          </h1>
        </div>
        <div className={styles.skills_wrapper}>
          {services.map((serv, i) => (
            <div key={i}>
              <Card service={serv} />
            </div>
          ))}
          <h3
            style={{
              position: 'relative',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: `calc(var(--h3) * 2.8)`,
              }}
            >
              <span> WOULD YOU LOSE YOUR LIMITS, TAKE THE CONTROL</span>
              <span>TO FIND THE SYSTEM&apos;S SOUL?</span>
            </div>
            <Link
              href="/blog"
              style={{
                fontSize: 'clamp(10px, 30vw, 470px)',
                display: 'inline-block',
                margin: '0',
                padding: '0',
                letterSpacing: 'clamp(-60px, -5vw, -0.07px)',
                lineHeight: '0.6',
                opacity: 0.3,
              }}
            >
              LEAP DOWN THE RABBIT HOLE
            </Link>
          </h3>
          <Video
            playbackRate={0.5}
            videoProps={{
              autoPlay: true,
              loop: true,
              muted: true,
              playsInline: true,
              style: {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: opacityVideo,
                transition: 'all 1s ease',
                zIndex: -99,
              },
            }}
            sourceProps={{
              src: '/video/tv_noise.mp4',
              type: 'video/mp4',
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -100,
              filter: 'blur(4px)',
            }}
            className={styles.cloak_container}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                clipPath: `circle(${isInView ? 130 : 0}% at 50% 100%)`,
                transition: isInView ? 'clip-path 2s ease 0.4s' : 'clip-path 0.5s ease',
                backgroundColor: has('dark') ? 'transparent' : 'var(--color-fourth)',
                filter: 'blur(200px)',
              }}
              className={styles.cloak}
            ></div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

export default Narration;
