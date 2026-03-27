import { ImageProps } from '@/lib/services';
import React from 'react';

function RegularCircle({ bgColor = 'var(--color-fourth)', image }: { bgColor?: string; image: ImageProps }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '1/1',
        backgroundColor: bgColor,
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${image.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

export default RegularCircle;
