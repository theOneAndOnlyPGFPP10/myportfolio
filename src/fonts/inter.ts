import localFont from 'next/font/local';

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter_Tight/static/InterTight-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter_Tight/static/InterTight-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter_Tight/static/InterTight-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter_Tight/static/InterTight-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-inter',
});

export default inter;
