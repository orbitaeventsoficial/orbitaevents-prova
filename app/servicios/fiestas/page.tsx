// app/servicios/fiestas/page.tsx
import type { Metadata } from 'next';
import Breadcrumbs from '@/app/components/seo/Breadcrumbs';
import ServiceJsonLD from '@/app/components/seo/ServiceJsonLD';
import FAQ from '@/app/components/seo/FAQ';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Fiestas Privadas Barcelona | Cumpleaños, Despedidas, Temáticas | DJ + Efectos | Òrbita Events',
  description:
    'La fiesta privada que tus amigos recordarán. DJ profesional + EV ETX 3000W + 4 luces B-150 LED + efectos especiales. Cumpleaños, despedidas, fiestas temáticas (Halloween, años 80, Harry Potter). Desde 490€. Barcelona, Lleida, Girona.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.cat'),
  alternates: { canonical: '/servicios/fiestas' },
  openGraph: {
    title: 'Fiestas Privadas | La Fiesta Que Tus Amigos Recordarán',
    description:
      'Cumpleaños épicos, despedidas memorables, fiestas temáticas únicas. DJ + sonido profesional + efectos especiales. Desde 490€.',
    url: '/servicios/fiestas',
    images: [
      {
        url: '/api/og?title=Fiestas%20Privadas%20Barcelona',
        alt: 'Fiestas privadas con DJ y efectos especiales',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fiestas Privadas | Cumpleaños + Despedidas + Temáticas',
    description: 'DJ profesional + EV ETX + B-150 LED + efectos. La fiesta que recordarán.',
    images: ['/api/og?title=Fiestas%20Privadas'],
  },
  robots: { index: true, follow: true },
  keywords: [
    'fiestas privadas Barcelona',
    'DJ cumpleaños Barcelona',
    'despedidas Barcelona',
    'fiestas temáticas',
    'DJ fiestas Lleida',
    'cumpleaños con DJ',
    'fiesta Halloween',
    'fiesta años 80',
    'DJ profesional fiestas',
  ],
};

export default function FiestasPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Inicio', url: '/' },
          { name: 'Servicios', url: '/servicios' },
          { name: 'Fiestas Privadas', url: '/servicios/fiestas' },
        ]}
      />

      {/* JSON-LD OPTIMIZADO */}
      <ServiceJsonLD
        name="Fiestas Privadas y Temáticas"
        slugPath="/servicios/fiestas"
        description="DJ profesional para cumpleaños, despedidas y fiestas temáticas. Sonido EV ETX 3000W, 4 luces B-150 LED 150W, efectos especiales sincronizados. Tematización personalizada disponible."
        serviceType={[
          'DJ para fiestas',
          'Fiestas privadas',
          'Cumpleaños',
          'Despedidas',
          'Fiestas temáticas',
          'Iluminación LED',
        ]}
        areaServed={['Barcelona', 'Lleida', 'Girona', 'Tarragona', 'Catalunya']}
        priceFrom="490"
        priceCurrency="EUR"
        availability="https://schema.org/InStock"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 167,
        }}
        offers={[
          {
            '@type': 'Offer',
            price: '490',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/fiestas#cumple-basico',
            name: 'Pack Cumpleaños Básico',
          },
          {
            '@type': 'Offer',
            price: '790',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/fiestas#despedida-premium',
            name: 'Pack Despedida Premium',
          },
          {
            '@type': 'Offer',
            price: '990',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/fiestas#tematica-completa',
            name: 'Pack Fiesta Temática Completa',
          },
        ]}
      />

      <FAQ
        items={[
          {
            q: '¿Cuánto cuesta una fiesta privada con DJ y efectos especiales?',
            a: 'Desde 490€ para fiestas básicas (50-80 personas, 4h DJ, sonido 2000W, luces LED básicas). Pack Premium con efectos especiales desde 790€. Incluye montaje, desmontaje y desplazamiento en Catalunya.',
          },
          {
            q: '¿Hacéis fiestas temáticas (Halloween, años 80, Harry Potter)?',
            a: 'Sí, somos especialistas en tematización completa. Adaptamos música, luces, efectos especiales y decoración al tema que elijas. Tematización básica incluida en pack Premium, tematización completa desde 990€.',
          },
          {
            q: '¿Qué diferencia hay entre vuestro DJ y poner música con Spotify?',
            a: 'Nuestro DJ LEE la pista en tiempo real y adapta la música al ambiente. Si una canción no funciona, cambia inmediatamente. Si la gente está a tope, mantiene el ritmo. Una playlist es estática y aburrida. Nosotros garantizamos pista llena.',
          },
          {
            q: '¿Trabajáis fuera de Barcelona? ¿En Lleida, Girona, Tarragona?',
            a: 'Sí, cubrimos toda Catalunya. Desplazamiento incluido en todos los packs sin recargos ocultos. Trabajamos en espacios privados, locales, jardines, fincas, etc.',
          },
          {
            q: '¿Puedo elegir las canciones o el estilo musical?',
            a: 'Por supuesto. Antes de la fiesta hacemos reunión (presencial o videollamada) para crear playlist personalizada con tus canciones favoritas y momentos clave. El DJ combina tus preferencias con lectura de pista para mantener el ambiente.',
          },
          {
            q: '¿Qué incluye exactamente el pack de despedida?',
            a: 'DJ profesional 5 horas, sonido EV ETX 3000W, 4 B-150 LED con gobos/prismas, técnico dedicado, playlist personalizada con momentos especiales (entrada, brindis, sorpresas). Ideal para 80-120 personas.',
          },
          {
            q: '¿Cuánto tiempo antes hay que reservar?',
            a: 'Mínimo 3 semanas para fiestas normales. Para fines de semana (viernes/sábados) recomendamos 6-8 semanas porque se llenan muy rápido. Consulta disponibilidad por WhatsApp.',
          },
          {
            q: '¿Qué pasa si llueve (fiesta en exterior)?',
            a: 'Todo nuestro equipamiento está preparado para exterior. Si hay lluvia intensa, montamos carpa protectora para el equipo (sin coste adicional). Recomendamos tener plan B de espacio interior por si lluvia extrema.',
          },
        ]}
      />

      <Client />
    </>
  );
}
