import localFont from 'next/font/local';

const pump_triline = localFont({
  src: [
    {
      path: '../../public/fonts/Pump Triline Regular/Pump Triline Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pump-triline',
});

export default pump_triline;
