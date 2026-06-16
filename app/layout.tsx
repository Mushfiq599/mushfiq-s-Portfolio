import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/ui/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mushfiq | Full Stack Developer',
  description: 'Full Stack Developer specializing in React, Next.js, Node.js and MongoDB. Building modern web experiences.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Node.js', 'MongoDB', 'Bangladesh'],
  authors: [{ name: 'Mushfiq' }],
  openGraph: {
    title: 'Mushfiq | Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js, Node.js and MongoDB.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}