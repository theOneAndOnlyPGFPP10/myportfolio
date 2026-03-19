import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inconsolata',
});

export default inconsolata;
