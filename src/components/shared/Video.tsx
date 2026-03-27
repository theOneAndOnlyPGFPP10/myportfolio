'use client';
import { useEffect, useRef } from 'react';
import { m, type HTMLMotionProps } from 'motion/react';

interface VideoProps {
  playbackRate?: number;
  videoProps: HTMLMotionProps<'video'>;
  sourceProps: React.SourceHTMLAttributes<HTMLSourceElement>;
  trackProps?: React.TrackHTMLAttributes<HTMLTrackElement>;
}

export function Video({ playbackRate = 1, videoProps, sourceProps, trackProps }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <m.video {...videoProps} ref={videoRef}>
      <source {...sourceProps} />
      {trackProps ? <track {...trackProps} /> : null}
    </m.video>
  );
}
