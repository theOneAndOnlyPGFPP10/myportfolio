import Image from 'next/image';
import React from 'react';

function RegularCircle({
  bgColor = 'var(--color-fourth)',
  image,
}: {
  bgColor?: string;
  image: { src: string; alt?: string };
}) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        backgroundColor: bgColor,
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Image
        src={image.src}
        alt={image.alt ?? ''}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        style={{
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}

export default RegularCircle;
