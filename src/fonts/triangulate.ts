import localFont from 'next/font/local';

const triangulate = localFont({
  src: [
    {
      path: '../../public/fonts/triangulate/Triangulate.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-triangulate',
});

export default triangulate;
