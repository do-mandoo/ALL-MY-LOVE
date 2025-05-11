import type { Metadata } from 'next';
import { Inter, Roboto_Slab } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const robotoSlab = Roboto_Slab({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | All __ Love',
    default: 'All __ Love',
  },
  description: 'Share everything you love!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} ${robotoSlab.className}  bg-black text-white max-w-screen-md  mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
