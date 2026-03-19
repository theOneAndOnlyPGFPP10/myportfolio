import localFont from 'next/font/local';

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi_Complete/Fonts/TTF/Satoshi-Variable.ttf',
      weight: '300 400 500 600 700 800 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
});

export default satoshi;
