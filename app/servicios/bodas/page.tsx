// app/servicios/bodas/page.tsx
import type { Metadata } from 'next';
import ServiceJsonLD from '@/app/components/seo/ServiceJsonLD';
import FAQ from '@/app/components/seo/FAQ';
import dynamic from 'next/dynamic';

const BodasClient = dynamic(() => import('./client'));

export const metadata: Metadata = {
  title: '💍 DJ Bodas Barcelona - El Día Que TODOS Recordarán | Órbita Events',
  description:
    'La diferencia entre "estuvo bien" y "FUE ÉPICO". DJ + Luces + Efectos para bodas inolvidables en Barcelona, Lleida, Girona y Tarragona. 87 bodas · 4.9⭐',
  keywords: 'dj bodas barcelona, dj boda lleida, sonido bodas, luces bodas, musica boda, efectos especiales bodas',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.cat'),
  alternates: { canonical: '/servicios/bodas' },
  openGraph: {
    title: 'DJ Bodas Barcelona - El Día Que TODOS Recordarán | Órbita Events',
    description:
      'DJ profesional + Luces LED + Efectos especiales. Tu entrada con humo sincronizado... lágrimas garantizadas. Desde 1.290€',
    url: '/servicios/bodas',
    images: [{ url: '/img/portfolio/bodas-cover.webp', alt: 'DJ Bodas Órbita Events' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DJ Bodas Barcelona - Órbita Events',
    description: 'DJ + Luces + Efectos · 87 bodas · 4.9⭐ · Desde 1.290€',
    images: ['/img/portfolio/bodas-cover.webp'],
  },
  robots: { index: true, follow: true },
};

export default function BodasPage() {
  return (
    <>
      {/* JSON-LD de servicio */}
      <ServiceJsonLD
        name="DJ para Bodas Premium"
        slugPath="/servicios/bodas"
        description="DJ profesional, sonido EV 4.000W, iluminación LED completa y efectos especiales para bodas inolvidables. Desde la ceremonia hasta el último baile."
        serviceType={['DJ para bodas', 'Sonido e iluminación bodas', 'Producción musical bodas', 'Efectos especiales bodas']}
        areaServed={['Barcelona', 'Girona', 'Tarragona', 'Lleida', 'Catalunya']}
        priceFrom="1290"
        priceCurrency="EUR"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 87 }}
      />

      {/* Contenido principal */}
      <BodasClient />

      {/* FAQ especializado bodas */}
      <FAQ
        items={[
          {
            q: '¿Podemos pasar nuestra playlist o elegir las canciones?',
            a: 'Por supuesto. Podéis enviarnos una playlist previa con vuestras canciones favoritas y también aceptamos peticiones en directo durante la boda. El DJ adapta la sesión completamente a vuestro gusto mientras mantiene la pista llena.',
          },
          {
            q: '¿Hacéis música para la ceremonia y el cóctel también?',
            a: 'Sí, cubrimos todos los momentos: ceremonia (con micrófono inalámbrico), cóctel, banquete y baile. Cada momento tiene su montaje y transición fluida entre espacios.',
          },
          {
            q: '¿Cuánto tiempo tardáis en montar el equipo?',
            a: 'Entre 45 y 60 minutos según el acceso y el espacio. Llegamos siempre con antelación (mínimo 2h antes) para hacer pruebas de sonido y coordinar con fotógrafo/vídeo.',
          },
          {
            q: '¿Qué pasa si hay problemas técnicos durante la boda?',
            a: 'Llevamos equipo de backup completo (altavoces, controladora, micros) y un técnico dedicado que está presente TODO el evento. En 87 bodas nunca hemos tenido que parar la música por un fallo técnico.',
          },
          {
            q: '¿Trabajáis en masías, fincas o espacios al aire libre?',
            a: 'Sí, tenemos experiencia en todo tipo de espacios: masías, fincas, jardines, hoteles, restaurantes. Adaptamos el equipo y la logística a cada venue específico.',
          },
          {
            q: '¿Incluye los efectos especiales (humo, confeti, etc.)?',
            a: 'Los efectos especiales están incluidos en los packs Premium y Luxury. En el pack Esencial se pueden añadir como extra. Coordinamos los efectos con vuestros momentos especiales (entrada, primer baile, etc).',
          },
        ]}
      />
    </>
  );
}
