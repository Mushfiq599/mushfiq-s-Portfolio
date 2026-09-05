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
  metadataBase: new URL('https://mushfiq-s-portfolio.vercel.app'),
  title: {
    default: 'Mushfiq | Full Stack Developer',
    template: '%s | Mushfiq',
  },
  description:
    'Full Stack Developer from Bangladesh specializing in React, Next.js, Node.js and MongoDB. Building fast, beautiful, and scalable web applications.',
  keywords: [
    'Mushfiq', 'Full Stack Developer', 'MERN Stack',
    'React Developer', 'Next.js Developer', 'Node.js',
    'MongoDB', 'Bangladesh', 'Web Developer', 'Portfolio',
    'Chattogram', 'JavaScript', 'TypeScript',
  ],
  authors: [{ name: 'Mushfiqur Rahman', url: 'https://github.com/Mushfiq599' }],
  creator: 'Mushfiqur Rahman',
  publisher: 'Mushfiqur Rahman',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mushfiq-s-portfolio.vercel.app',
    siteName: 'Mushfiq Portfolio',
    title: 'Mushfiq | Full Stack Developer',
    description:
      'Full Stack Developer from Bangladesh — building fast, beautiful, and scalable web applications with the MERN stack.',
    images: [
      {
        url: 'https://mushfiq-s-portfolio.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mushfiq — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mushfiq | Full Stack Developer',
    description:
      'Full Stack Developer from Bangladesh — building fast, beautiful, and scalable web applications with the MERN stack.',
    images: ['https://mushfiq-s-portfolio.vercel.app/opengraph-image'],
    creator: '@MushFiq72288867',
  },
  alternates: {
    canonical: 'https://mushfiq-s-portfolio.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mushfiqur Rahman',
  alternateName: 'Mushfiq',
  url: 'https://mushfiq-s-portfolio.vercel.app',
  image: 'https://mushfiq-s-portfolio.vercel.app/images/profile.png',
  jobTitle: 'Full Stack Developer',
  description:
    'Full Stack Developer from Bangladesh specializing in React, Next.js, Node.js and MongoDB.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chattogram',
    addressCountry: 'Bangladesh',
  },
  sameAs: [
    'https://github.com/Mushfiq599',
    'https://linkedin.com/in/mushfiq',
  ],
  knowsAbout: [
    'React', 'Next.js', 'Node.js', 'MongoDB',
    'TypeScript', 'JavaScript', 'Full Stack Development',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'BGC Trust University Bangladesh',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}