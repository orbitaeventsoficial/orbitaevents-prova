// app/servicios/discomobil/page.tsx
// 🔥 MANOLO VERSION - Corregido + Optimizado

import type { Metadata } from 'next';
import Breadcrumbs from '@/app/components/seo/Breadcrumbs';
import ServiceJsonLD from '@/app/components/seo/ServiceJsonLD';
import FAQ from '@/app/components/seo/FAQ';
import Client from './client';

export const metadata: Metadata = {
  title: 'Discomóvil Barcelona | DJ + EV ETX + B-150 LED | La Fiesta que NO Olvidarán | Órbita Events',
  description:
    'La discomóvil que mantiene la pista LLENA hasta que se van. DJ profesional + sonido EV ETX 3000W + 4 luces B-150 LED. No ponemos playlists, leemos la pista. Desde 690€. Barcelona, Lleida, Girona, Tarragona.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.cat'),
  alternates: { canonical: '/servicios/discomobil' },
  openGraph: {
    title: 'Discomóvil | La Fiesta Que Tus Amigos NO Olvidarán',
    description:
      'DJ que lee la pista + equipamiento profesional + efectos especiales. Pista llena garantizada. Desde 690€.',
    url: '/servicios/discomobil',
    images: [
      {
        url: '/api/og?title=Discomóvil%20Desde%20690€',
        alt: 'Discomóvil profesional con DJ y efectos especiales',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discomóvil | Pista Llena Garantizada desde 690€',
    description: 'DJ profesional + EV ETX + B-150 LED. La fiesta que tus amigos recordarán.',
    images: ['/api/og?title=Discomóvil%20690€'],
  },
  robots: { index: true, follow: true },
  keywords: [
    'discomóvil Barcelona',
    'DJ fiestas privadas',
    'discomóvil cumpleaños',
    'DJ bodas',
    'discomóvil profesional',
    'alquiler DJ Barcelona',
    'discomóvil Lleida',
    'DJ con luces LED',
    'discomóvil efectos especiales',
  ],
};

export default function DiscomobilPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Inicio', url: '/' },
          { name: 'Servicios', url: '/servicios' },
          { name: 'Discomóvil', url: '/servicios/discomobil' },
        ]}
      />

      <ServiceJsonLD
        name="Discomóvil Profesional Barcelona"
        slugPath="/servicios/discomobil"
        description="DJ profesional que lee la pista en tiempo real. Sonido EV ETX 3000W, 4 luces B-150 LED 150W, efectos especiales sincronizados. Pista llena garantizada."
        serviceType={['Discomóvil', 'DJ para fiestas', 'DJ bodas', 'DJ cumpleaños', 'Iluminación LED']}
        areaServed={['Barcelona', 'Lleida', 'Girona', 'Tarragona', 'Catalunya']}
        priceFrom="690"
        priceCurrency="EUR"
        availability="https://schema.org/InStock"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 203,
        }}
        offers={[
          {
            '@type': 'Offer',
            name: 'Fiesta Básica - DJ 4h + Sonido 2000W',
            price: '690',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/discomobil#fiesta-basica',
            description: 'DJ profesional 4 horas, sonido 2000W, luces LED básicas. Perfecto para fiestas privadas.',
          },
          {
            '@type': 'Offer',
            name: 'Fiesta Premium - La Que NO Olvidarán',
            price: '990',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/discomobil#fiesta-premium',
            description: 'DJ 5h, sonido EV 3000W, 4 B-150 LED, humo, confeti, photocall. El pack más vendido.',
          },
          {
            '@type': 'Offer',
            name: 'Fiesta VIP - Nivel Discoteca Profesional',
            price: '1490',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/discomobil#fiesta-vip',
            description: 'DJ 6h, sonido 4000W, show luces completo, tematización, videomapping, zona chill-out. Experiencia total.',
          },
        ]}
      />

      <Client />

      <FAQ
        items={[
          {
            q: '¿Cuánto tiempo tardáis en montar la discomóvil?',
            a: '30 minutos máximo. Llegamos 1 hora antes del evento para montaje completo y prueba de sonido. Tú solo preocúpate de disfrutar.',
          },
          {
            q: '¿Qué diferencia hay entre vuestro DJ y una playlist de Spotify?',
            a: 'Nuestro DJ LEE la pista en tiempo real: si la gente no baila con una canción, cambia inmediatamente. Si están a tope, mantiene el ritmo. Una playlist es estática y aburrida. Nosotros adaptamos la música al ambiente para mantener la pista LLENA.',
          },
          {
            q: '¿Incluye luces LED móviles y efectos especiales?',
            a: 'Sí, en el pack Premium y VIP incluimos 4 B-150 LED 150W con beam 6°, gobos, prismas y efectos sincronizados con la música. También máquina de humo, confeti y CO2 según el pack.',
          },
          {
            q: '¿Puedo elegir la música o el estilo?',
            a: 'Por supuesto. Puedes darnos una lista de canciones que quieres, artistas favoritos o estilo musical (reggaeton, pop, años 80, etc). El DJ combina tus preferencias con lectura de pista para mantener el ambiente.',
          },
          {
            q: '¿Trabajáis fuera de Barcelona? ¿En Lleida, Girona, Tarragona?',
            a: 'Sí, cubrimos toda Catalunya. Desplazamiento incluido en todos los packs. Sin recargos ocultos.',
          },
          {
            q: '¿Qué pasa si hay problemas técnicos durante la fiesta?',
            a: 'Llevamos equipamiento backup completo. Si algún equipo falla (rarísimo), tenemos repuesto inmediato. Tu fiesta nunca se para. Garantizado.',
          },
          {
            q: '¿Cuánto tiempo antes hay que reservar?',
            a: 'Mínimo 2 semanas. Para fines de semana (viernes/sábados) recomendamos 6-8 semanas porque se llenan rápido. Consulta disponibilidad por WhatsApp.',
          },
          {
            q: '¿Qué incluye exactamente cada pack?',
            a: 'Básico: DJ 4h + sonido 2000W + luces LED básicas. Premium: TODO lo básico + sonido 3000W + 4 B-150 LED + humo + confeti + photocall. VIP: TODO premium + 6h DJ + tematización completa + videomapping + zona chill-out. Ver detalles completos en los packs.',
          },
        ]}
      />
    </>
  );
}
