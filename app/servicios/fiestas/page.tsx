// app/servicios/fiestas/page.tsx
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ServiceJsonLD from '@/components/seo/ServiceJsonLD';
import FAQ from '@/components/seo/FAQ';
import Client from './client';  // ← ESENCIAL: relativo, NO '/client.tsx'
import {
  getMinPriceByService,
  getPacksByService,
  getPackById,
} from '@/data/packs-config';

// ===============================
// DATOS CENTRALIZADOS DESDE packs-config
// ===============================
const FIESTAS_MIN_PRICE = getMinPriceByService('fiestas');
const FIESTAS_PACKS = getPacksByService('fiestas');

const PACK_ESENCIAL = getPackById('fiestas-cumple-basico')!;
const PACK_FIESTA_PLUS = getPackById('fiestas-despedida-plus')!;
const PACK_TEMATICA = getPackById('fiestas-tematica-completa')!;

const cleanName = (name: string) =>
  name.replace(/[^\wÀ-ÿ ]/g, '').trim();

// ===============================
// METADATA SEO (USANDO CONFIG)
// ===============================
export const metadata: Metadata = {
  title:
    'Fiestas Privadas Barcelona | Cumpleaños, Despedidas, Temáticas | DJ + Luces | Òrbita Events',
  description: `La fiesta privada que tus amigos recordarán. DJ profesional, 2 altavoces de 2.000W cada uno (4.000W totales), multibox LED para pista y máquina de humo (si el espacio lo permite). Cumpleaños, despedidas y fiestas temáticas (Halloween, años 80, mundo mágico). Desde ${FIESTAS_MIN_PRICE}€. Barcelona, Girona, Lleida y Tarragona.`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.com'),
  alternates: { canonical: '/servicios/fiestas' },
  openGraph: {
    title: 'Fiestas Privadas | La Fiesta Que Tus Amigos Recordarán',
    description:
      `Cumpleaños épicos, despedidas memorables y fiestas temáticas con DJ profesional, buen sonido y luz en condiciones. Desde ${FIESTAS_MIN_PRICE}€.`,
    url: '/servicios/fiestas',
    images: [
      {
        url: '/api/og?title=Fiestas%20Privadas%20Barcelona',
        alt: 'Fiestas privadas con DJ y efectos de luz',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fiestas Privadas | Cumpleaños + Despedidas + Temáticas',
    description:
      'DJ profesional, 2 altavoces de 2.000W cada uno, multibox LED y buena selección musical. La fiesta que recordarán.',
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

// ===============================
// PÁGINA
// ===============================
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

      {/* JSON-LD tirando de packs-config */}
      <ServiceJsonLD
        name="Fiestas Privadas y Temáticas"
        slugPath="/servicios/fiestas"
        description={`DJ profesional para cumpleaños, despedidas y fiestas temáticas. Equipo base con 2 altavoces de 2.000W cada uno (4.000W totales), multibox LED para pista de baile y máquina de humo (si el espacio lo permite). Tematización opcional y packs con más horas y complejidad. Desde ${FIESTAS_MIN_PRICE}€.`}
        serviceType={[
          'DJ para fiestas',
          'Fiestas privadas',
          'Cumpleaños',
          'Despedidas',
          'Fiestas temáticas',
          'Iluminación LED',
        ]}
        areaServed={['Barcelona', 'Lleida', 'Girona', 'Tarragona', 'Catalunya']}
        priceFrom={String(FIESTAS_MIN_PRICE)}
        priceCurrency="EUR"
        availability="https://schema.org/InStock"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 167,
        }}
        offers={FIESTAS_PACKS.map((pack) => ({
          '@type': 'Offer',
          price: String(pack.priceValue),
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `/servicios/fiestas#${pack.slug}`,
          name: pack.name,
        }))}
      />

      <Client />

      <FAQ
        items={[
          {
            q: '¿Cuánto cuesta una fiesta privada con DJ?',
            a: `El ${cleanName(PACK_ESENCIAL.name)} parte de ${PACK_ESENCIAL.price}: hasta 3 horas de DJ, 2 altavoces de 2.000W cada uno (4.000W totales), multibox LED para pista y máquina de humo si el espacio lo permite. El ${cleanName(PACK_FIESTA_PLUS.name)} sube a ${PACK_FIESTA_PLUS.price} con más horas, más juego de luz y más trabajo en los momentos clave. Y el ${cleanName(PACK_TEMATICA.name)} empieza ${PACK_TEMATICA.price}, pensado para cuando quieres fiesta con concepto y tematización.`,
          },
          {
            q: '¿Hacéis fiestas temáticas (Halloween, años 80, mundo mágico)?',
            a: `Sí. El ${cleanName(PACK_TEMATICA.name)} está pensado justo para eso: definimos tema, adaptamos música, luz y momentos especiales al concepto (Halloween, años 80, mundo mágico, tropical, etc.). Es el pack para cuando quieres algo con más intención que “poner música y ya está”.`,
          },
          {
            q: '¿Qué diferencia hay entre vuestro DJ y poner música con Spotify?',
            a: 'Nuestro DJ lee la pista en tiempo real: si un tema no funciona, cambia; si el ambiente sube, aprieta. Una playlist es estática. Nosotros adaptamos la música al público para mantener la pista activa el máximo tiempo posible.',
          },
          {
            q: '¿Trabajáis fuera de Barcelona? ¿En Lleida, Girona, Tarragona?',
            a: 'Sí, trabajamos en toda Catalunya: Barcelona, Lleida, Girona y Tarragona. Fincas, jardines, locales privados, pabellones… Ajustamos el montaje al espacio.',
          },
          {
            q: '¿Puedo elegir las canciones o el estilo musical?',
            a: 'Sí. Antes del evento revisamos estilos, “imprescindibles” y “prohibidos”. Con eso montamos una base de playlist y el DJ remata con lectura de pista para que funcione con tu grupo, no solo en teoría.',
          },
          {
            q: '¿Qué incluye exactamente el Pack Fiesta Plus?',
            a: 'Hasta 4 horas de DJ, mismo equipo base de sonido, más juego de luz y más trabajo en los momentos clave (entrada, brindis, tarta, sorpresas). Es el punto medio cuando no quieres quedarte corto y encaja muy bien para despedidas y grupos grandes.',
          },
          {
            q: '¿Cuánto tiempo antes hay que reservar?',
            a: 'Para fiestas normales, mínimo 3 semanas. Para viernes y sábados, mejor 6–8 semanas porque son las primeras fechas que se llenan.',
          },
          {
            q: '¿Qué pasa si la fiesta es en exterior y llueve?',
            a: 'Recomendamos siempre tener plan B cubierto. El equipo se protege con estructura y cobertura, pero si la lluvia es intensa o con viento fuerte, lo sensato es mover DJ y pista a zona cubierta. Lo hablamos siempre antes del evento para evitar improvisaciones de última hora.',
          },
        ]}
      />
    </>
  );
}