'use client';

import { useRef } from 'react';
import { Video } from '@/components/shared/Video';
import { services, ServiceGroup } from '@/lib/services';
import styles from '@/styles/pages/home/Narration.module.css';
import { domAnimation, LazyMotion, m, useInView, useScroll, useTransform } from 'motion/react';
import { ScrambleText } from '@/components/shared/animations/ScrambleText';


function BluredSideNote({
  original,
  side,
}: {
  original: string;
  side: string;
}) {
  const refBluredSN = useRef<HTMLDivElement>(null);

  const isInView = useInView(refBluredSN, {
    margin: "-60% 0px 100% 0px", // trigger w ~40% ekranu
    amount: 0, // element może być minimalnie widoczny, wyzwala efekt dokładnie w linii
    once: false, // trzeba żeby cofnięcie działało
  });

  return (
    <div ref={refBluredSN} className={styles.side_note}>
      <m.span
        style={{
          filter: !isInView ? "blur(50px)" : "blur(0px)",
          opacity: !isInView ? 0.4 : 1,
          transition: "all 1s ease",
        }}
        className={styles.original_text_side}
      >
        {original}
      </m.span>

      <m.div
        style={{
          filter: !isInView ? "blur(0px)" : "blur(12px)",
          opacity: !isInView ? 1 : 0,
          transition: "all 1s ease",
        }}
        className={styles.side_note_container}
      >
        <p>{side}</p>
      </m.div>
    </div>
  );
}



function Card({ service }: { service: ServiceGroup }) {
  return (
    <div
      style={{
        backgroundColor: service.color,
      }}
      className={styles.card}
    >
      <h3 className={styles.card_title}>{service.serviceCategory.toUpperCase()}</h3>
      {service.services.map((ser, j) => {
        return <p key={j}>{ser}</p>;
      })}
    </div>
  );
}
function Narration() {
  const refNarration = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: refNarration,
    offset: ['start center', 'end end'],
  });

  const opacityVideo = useTransform(scrollYProgress, [0, 0.3], ['0.3', '0.15']);
  const [firstService, secondService, thirdService] = services;

  const softStickyY = useTransform(scrollYProgress, [0.0, 0.08, 0.16], ['0px', '14px', '0px']);

  return (
    <LazyMotion features={domAnimation}>
      <div ref={refNarration} className={styles.narration_wrapper}>
        <div>
          <h1 style={{ color: 'red', fontSize: 'clamp(10px, 15vw, 350px)', padding: '0 10px' }}>
            THE BE
            <ScrambleText text={'A'} scrambleDuration={10000} />
            UTY OF modern <ScrambleText text={'TECH'} scrambleDuration={1000} />-
            <BluredSideNote original='nology' side='Endless digital possibilities — I’m just getting started.'/>
          </h1>
        </div>
        <div className={styles.skills_wrapper}>
          <m.div className={`${styles.column} ${styles.sticky_container}`} style={{ y: softStickyY }}>
            {firstService ? <Card service={firstService} /> : null}
          </m.div>

          <m.div
            className={`${styles.column} ${styles.sticky_container} ${styles.sticky_container_offset}`}
            style={{ y: softStickyY }}
          >
            {secondService ? <Card service={secondService} /> : null}
            <div className={styles.mobile_only_card}>{thirdService ? <Card service={thirdService} /> : null}</div>
          </m.div>

          <m.div
            className={`${styles.column} ${styles.sticky_container} ${styles.sticky_container_offset_2} ${styles.desktop_only_column}`}
            style={{ y: softStickyY }}
          >
            {thirdService ? <Card service={thirdService} /> : null}
          </m.div>
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
                zIndex: -1,
              },
            }}
            sourceProps={{
              src: '/video/tv_noise.mp4',
              type: 'video/mp4',
            }}
          />
        </div>
      </div>
    </LazyMotion>
  );
}

export default Narration;
