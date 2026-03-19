'use client';

import { useRef } from 'react';
import styles from '@/styles/pages/home/Narration.module.css';
import { domAnimation, LazyMotion, useScroll, m, useTransform } from 'motion/react';
import ProjectsCarousel from '@/components/shared/ProjectsCarousel';

// consts 
const OPACITY_DELAY_STEP=0.3;

function MotionBlock({
  text,
  index,
  total,
  scrollYProgress,
}: {
  text: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const indexDelay = index * OPACITY_DELAY_STEP;
  const blockOpacity = useTransform(
    scrollYProgress,
    [0 + indexDelay, 0.2 + indexDelay, OPACITY_DELAY_STEP * 1.4 + indexDelay],
    [0, 1, total - 1 === index ? 1 : 0]
  );

  return (
    <m.div className={styles.motion_block}>
      <m.h2 style={{ opacity: blockOpacity }}>{text}</m.h2>
    </m.div>
  );
}


function Narration() {
  const refNarration = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: refNarration,
    offset: ['start center', 'end end'],
  });

  const motionStrings = ['Well..', 'I did','And It is amazing!'];

  return (
    <LazyMotion features={domAnimation}>
      <div ref={refNarration} className={styles.narration_wrapper}>
        <div className={styles.sticky_container}>
          {motionStrings.map((text, i) => (
            <MotionBlock
              key={text}
              text={text}
              index={i}
              total={motionStrings.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
          <div className={styles.projects_carousel}>
            <ProjectsCarousel
                scrollYProgress={scrollYProgress}
                scrollRange={[0.7, 1]}
            />
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

export default Narration;
