import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { SITE_CONFIG } from '@/lib/constants';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-jb',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Premium Himalayan Tours & Pilgrimage Packages`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'Himalayan tour packages',
    'Char Dham Yatra',
    'Kailash Yatra',
    'Uttarakhand pilgrimage tours',
    'Adventure travel India',
    'Kedarnath Yatra',
    'Badrinath Yatra',
    'Adi Kailash trek',
    'Om Parvat darshan',
    'spiritual tourism India',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Premium Himalayan Tours`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Travel Wale Bhai Ji - Sacred Journeys Across the Himalayas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | Premium Himalayan Tours`,
    description: SITE_CONFIG.description,
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: SITE_CONFIG.name,
              description: SITE_CONFIG.description,
              url: SITE_CONFIG.url,
              telephone: SITE_CONFIG.phone,
              email: SITE_CONFIG.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Vasu Barthwal Street',
                addressLocality: 'Rishikesh',
                addressRegion: 'Uttarakhand',
                postalCode: '249201',
                addressCountry: 'IN',
              },
              sameAs: [
                SITE_CONFIG.social.instagram,
                SITE_CONFIG.social.facebook,
                SITE_CONFIG.social.youtube,
                SITE_CONFIG.social.twitter,
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '144',
                bestRating: '5',
              },
            }).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className={`${jakarta.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
