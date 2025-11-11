// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';

import Header from './components/ui/header';
import Footer from './components/ui/footer';
import StickyCTA from './StickyCTA';
import WhatsAppSticky from './components/ui/WhatsAppSticky';
import PageTransition from './components/ui/PageTransition.client';
import OfferModal from './components/marketing/OfferModal.client';
import CookieConsent from './components/legal/CookieConsent.client';
import JsonLdOrganization from './components/seo/JsonLdOrganization';
import ScrollTracker from './components/utils/ScrollTracker';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
    { media: '(prefers-color-scheme: light)', color: '#0a0a0b' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.com'),
  title: {
    default: 'Òrbita Events | DJ + Luces + Efectos | Barcelona, Lleida, Girona',
    template: '%s | Òrbita Events',
  },
  description:
    'Eventos profesionales en Catalunya: bodas épicas, fiestas privadas memorables, eventos corporativos impactantes. DJ que lee la pista + luces sincronizadas + efectos especiales. +300 eventos. 4.9/5⭐',
  keywords: [
    'eventos catalunya',
    'dj profesional barcelona',
    'bodas barcelona',
    'eventos lleida',
    'fiestas girona',
    'eventos corporativos',
    'discomovil profesional',
    'produccion eventos',
    'sonido profesional',
    'iluminacion eventos',
  ],
  authors: [{ name: 'Òrbita Events', url: 'https://orbitaevents.com' }],
  creator: 'Òrbita Events',
  publisher: 'Òrbita Events',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'Òrbita Events',
    title: 'Òrbita Events | El Evento Que Tu Gente NO Olvidará',
    description:
      'DJ profesional + luces + efectos para bodas, fiestas y eventos corporativos en toda Catalunya. +300 eventos. 4.9/5⭐',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Òrbita Events - Eventos profesionales Catalunya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@orbitaevents',
    creator: '@orbitaevents',
    title: 'Òrbita Events | DJ + Luces + Efectos',
    description: 'Eventos épicos en Catalunya. +300 eventos. 4.9/5⭐',
    images: ['/og-default.jpg'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/',
      'ca-ES': '/ca',
    },
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  category: 'events',
  classification: 'Events & Entertainment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        {/* Preconnect a dominios externos críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* Favicon mejorado */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD Organization Schema */}
        <JsonLdOrganization />
      </head>

      <body className="bg-[var(--bg-main)] text-white antialiased overflow-x-hidden">
        {/* Skip to main content para accesibilidad */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-oe-gold focus:text-black focus:rounded-xl focus:font-bold"
        >
          Saltar al contenido principal
        </a>

        <Suspense fallback={null}>
          <Header />

          <PageTransition>
            <main id="main-content" className="pb-24 min-h-screen">
              {children}
            </main>
          </PageTransition>

          {/* 📊 Scroll tracking de interacción */}
          <ScrollTracker />

          {/* Popup oferta estratégica - aparece después de 30s o al intentar salir */}
          <OfferModal />

          {/* Cookie Consent GDPR compliant */}
          <CookieConsent />

          <Footer />

          {/* CTAs flotantes estratégicos */}
          <StickyCTA />
          <WhatsAppSticky />
        </Suspense>

        {/* Analytics & Tracking (solo en producción) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            {process.env.NEXT_PUBLIC_GA_ID && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                />
                <script
                  id="google-analytics"
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                        page_path: window.location.pathname,
                        anonymize_ip: true,
                        cookie_flags: 'SameSite=None;Secure'
                      });
                    `,
                  }}
                />
              </>
            )}

            {/* Meta Pixel */}
            {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
              <script
                id="meta-pixel"
                dangerouslySetInnerHTML={{
                  __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                    fbq('track', 'PageView');
                  `,
                }}
              />
            )}
          </>
        )}
      </body>
    </html>
  );
}
