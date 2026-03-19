'use client';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation } from 'motion/react';

const Experiment = dynamic(() => import('@/components/pages/home/Experiment'), { ssr: false });

export default function LazyWrapper() {
  return (
    <LazyMotion features={domAnimation}>
      <Experiment />
    </LazyMotion>
  );
}
