import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-dark-serif',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-geometric',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DARK EDITING AND WEBSITE | Premium Video Editing & Web Design',
  description: 'Luxury video editing, motion graphics, and modern website design. Transforming ideas into masterpieces with premium quality and creative excellence.',
  keywords: ['video editing', 'web design', 'motion graphics', 'reels', 'color grading', 'brand identity', 'social media content'],
  authors: [{ name: 'DARK EDITING AND WEBSITE' }],
  creator: 'DARK EDITING AND WEBSITE',
  publisher: 'DARK EDITING AND WEBSITE',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dark-editing-website.vercel.app',
    title: 'DARK EDITING AND WEBSITE | Premium Video Editing & Web Design',
    description: 'Luxury video editing, motion graphics, and modern website design.',
    siteName: 'DARK EDITING AND WEBSITE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DARK EDITING AND WEBSITE',
    description: 'Premium video editing & web design agency',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: '#121212',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-dark-900 text-platinum-100 antialiased">
        {children}
      </body>
    </html>
  );
}