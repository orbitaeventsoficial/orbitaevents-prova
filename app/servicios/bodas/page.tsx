// app/servicios/bodas/page.tsx

import type { Metadata } from 'next';
import ServiceJsonLD from '@/app/components/seo/ServiceJsonLD';
import FAQ from '@/app/components/seo/FAQ';
import dynamic from 'next/dynamic';

import { getMinPriceByService, getPacksByService } from '@/data/packs-config';

const BodasClient = dynamic(() => import('./client'));

const MIN_PRICE = getMinPriceByService('bodas'); 
const PACKS = getPacksByService('bodas');

export const metadata: Metadata = {
  title: '💍 DJ Bodas Barcelona - El Día Que tus Invitados Recordarán | Órbita Events',
  description: `DJ profesional, sonido EV 4.000 W, iluminación y efectos para bodas. Packs desde ${MIN_PRICE}€. 87 bodas · 4.9⭐`,
  keywords:
    'dj bodas barcelona, dj boda lleida, sonido bodas, luces bodas, musica boda, efectos especiales bodas',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.com'),
  alternates: { canonical: '/servicios/bodas' },
  openGraph: {
    title: 'DJ Bodas Barcelona - El Día Que TODOS Recordarán | Órbita Events',
    description: `DJ profesional + sonido EV + iluminación y efectos. Packs desde ${MIN_PRICE}€. Ceremonia, cóctel, banquete y baile.`,
    url: '/servicios/bodas',
    images: [{ url: '/img/portfolio/bodas-cover.webp', alt: 'DJ Bodas Órbita Events' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DJ Bodas Barcelona - Órbita Events',
    description: `DJ + Sonido EV 4.000 W + Luces y efectos. Packs desde ${MIN_PRICE}€. 87 bodas · 4.9⭐`,
    images: ['/img/portfolio/bodas-cover.webp'],
  },
  robots: { index: true, follow: true },
};

export default function BodasPage() {
  return (
    <>
      <ServiceJsonLD
        name="DJ para Bodas"
        slugPath="/servicios/bodas"
        description={`DJ profesional para bodas con sonido EV 4.000W, iluminación de pista y efectos especiales. Packs desde ${MIN_PRICE}€.`}
        serviceType={[
          'DJ para bodas',
          'Sonido e iluminación bodas',
          'Producción musical bodas',
          'Efectos especiales bodas',
        ]}
        areaServed={['Barcelona', 'Girona', 'Tarragona', 'Lleida', 'Catalunya']}
        priceFrom={String(MIN_PRICE)}
        priceCurrency="EUR"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 87 }}
        offers={PACKS.map((p) => ({
          '@type': 'Offer',
          name: p.name,
          price: String(p.priceValue),
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `/servicios/bodas#${p.slug}`,
          description: p.tagline,
        }))}
      />

      <BodasClient />

      <FAQ
        items={[
          {
            q: '¿Podemos pasar nuestra playlist o elegir las canciones?',
            a: 'Sí, podéis enviarnos una playlist con vuestros temas clave. El DJ la usa de referencia y adapta según la lectura de pista.',
          },
          {
            q: '¿Hacéis música para ceremonia y cóctel?',
            a: 'Sí, según el pack. Los packs Premium y VIP incluyen ceremonia + cóctel + banquete + baile.',
          },
          {
            q: '¿Cuánto tardáis en montar?',
            a: 'Entre 60 y 90 minutos según accesos. Llegamos siempre con margen para montar con calma y coordinarnos con la finca y foto/vídeo.',
          },
          {
            q: '¿Qué pasa si hay problemas técnicos?',
            a: 'Llevamos equipo de backup (controladora, cables y altavoces). Si algo falla, se cambia sin parar la música.',
          },
          {
            q: '¿Trabajáis en exteriores?',
            a: 'Sí. Revisamos potencias, accesos y adaptamos el montaje. También trabajamos con limitador si es necesario.',
          },
          {
            q: '¿Incluye efectos especiales?',
            a: 'Incluye humo, humo bajo y burbujas (según espacio). Confeti y chispas frías son extras opcionales.',
          },
        ]}
      />
    </>
  );
}

