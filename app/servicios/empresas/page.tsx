// app/servicios/empresas/page.tsx
import type { Metadata } from 'next';
import Breadcrumbs from '@/app/components/seo/Breadcrumbs';
import ServiceJsonLD from '@/app/components/seo/ServiceJsonLD';
import FAQ from '@/app/components/seo/FAQ';
import Client from './client';
import { getMinPriceByService, getPacksByService } from '@/lib/packs-config';

const EMP_MIN_PRICE = getMinPriceByService('empresas');
const EMP_PACKS = getPacksByService('empresas');

export const metadata: Metadata = {
  title: 'Eventos Corporativos Barcelona | DJ, Cenas de Empresa y Team Building | Òrbita Events',
  description:
    'Eventos corporativos que tu equipo recordará durante meses. Cenas de empresa con DJ, dinámicas, bingo musical y team building. Sonido profesional Pioneer + EV.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.com'),
  alternates: { canonical: '/servicios/empresas' },
  openGraph: {
    title: 'Eventos Corporativos | El Evento que Te Hace Quedar Como un Crack',
    description:
      'Cenas de empresa, DJ, actividades y team building. Sonido profesional y producción cuidada sin complicaciones.',
    url: '/servicios/empresas',
    images: [
      {
        url: '/api/og?title=Eventos%20Corporativos',
        alt: 'Eventos corporativos profesionales con DJ y producción técnica',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eventos Corporativos | DJ, Cenas Empresa y Team Building',
    description: 'Eventos corporativos con buen sonido, buena música y cero dramas técnicos.',
    images: ['/api/og?title=Eventos%20Corporativos'],
  },
  robots: { index: true, follow: true },
  keywords: [
    'eventos corporativos Barcelona',
    'team building Barcelona',
    'cenas de empresa',
    'eventos empresariales',
    'presentaciones corporativas',
    'bingo musical empresa',
    'DJ eventos empresa',
    'dinámicas de equipo',
  ],
};

export default function EmpresasPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Inicio', url: '/' },
          { name: 'Servicios', url: '/servicios' },
          { name: 'Eventos Empresas', url: '/servicios/empresas' },
        ]}
      />

      <ServiceJsonLD
        name="Eventos Corporativos Profesionales"
        slugPath="/servicios/empresas"
        description="Eventos corporativos con DJ, cenas de empresa, dinámicas de equipo y team building. Producción técnica cuidada con sonido Pioneer + EV."
        serviceType={[
          'Eventos corporativos',
          'Team building',
          'Cenas de empresa',
          'Eventos empresariales',
          'Animación empresarial',
        ]}
        areaServed={['Barcelona', 'Lleida', 'Girona', 'Tarragona', 'Catalunya']}
        priceFrom={String(EMP_MIN_PRICE)}
        priceCurrency="EUR"
        availability="https://schema.org/InStock"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 47,
        }}
        offers={EMP_PACKS.map((pack) => ({
          '@type': 'Offer',
          name: pack.name,
          price: String(pack.priceValue),
          priceCurrency: 'EUR',
          url: `/servicios/empresas#${pack.slug}`,
          availability: 'https://schema.org/InStock',
          description: pack.tagline,
        }))}
      />

      <Client />

      <FAQ
        items={[
          {
            q: '¿Podéis facturar a nombre de la empresa?',
            a: 'Sí, factura digital con IVA desglosado en menos de 24h.',
          },
          {
            q: '¿Trabajáis en oficinas, hoteles o naves?',
            a: 'Sí, adaptamos sonido e iluminación a cualquier espacio. Incluye visita previa.',
          },
          {
            q: '¿Qué pasa si hay problemas técnicos?',
            a: 'Trabajamos con equipo profesional y backup completo. El evento NO se para.',
          },
          {
            q: '¿Incluye branding o personalización?',
            a: 'Podemos integrar logo, colores y mensajes corporativos en pantallas y dinámicas.',
          },
          {
            q: '¿Coordináis con el espacio o catering?',
            a: 'Sí, nos encargamos de la coordinación técnica y de tiempos.',
          },
          {
            q: '¿Con cuánta antelación hay que reservar?',
            a: 'Para eventos grandes, unas 4 semanas. Para eventos menores, 2 semanas suele ser suficiente.',
          },
        ]}
      />
    </>
  );
}
