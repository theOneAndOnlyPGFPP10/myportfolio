import localFont from 'next/font/local';

const panchang = localFont({
  src: [
    {
      path: '../../public/fonts/Panchang_Complete/Fonts/TTF/Panchang-Variable.ttf',
      weight: '200 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-panchang',
});

export default panchang;
