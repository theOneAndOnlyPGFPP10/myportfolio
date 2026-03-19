'use client';
import { useEffect, useRef } from 'react';

interface VideoProps {
  playbackRate?: number;
  videoProps: React.VideoHTMLAttributes<HTMLVideoElement>;
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
    <video {...videoProps} ref={videoRef}>
      <source {...sourceProps} />
      {trackProps ? <track {...trackProps} /> : null}
    </video>
  );
}
