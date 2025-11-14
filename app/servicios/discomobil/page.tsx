// app/servicios/discomobil/page.tsx

import type { Metadata } from 'next';
import Breadcrumbs from '@/app/components/seo/Breadcrumbs';
import ServiceJsonLD from '@/app/components/seo/ServiceJsonLD';
import FAQ from '@/app/components/seo/FAQ';
import Client from './client';
import { getMinPriceByService, getPacksByService } from '@/lib/packs-config';

const DISCO_MIN_PRICE = getMinPriceByService('discomobil');
const DISCO_PACKS = getPacksByService('discomobil');

export const metadata: Metadata = {
  title: 'Discomóvil Barcelona | DJ + EV + Luces LED | La Fiesta que NO Olvidarán | Òrbita Events',
  description: `Discomóvil con DJ profesional, sonido EV profesional y luces LED para que la pista tenga sentido toda la noche. Leemos la pista, no ponemos playlists en aleatorio. Packs desde ${DISCO_MIN_PRICE}€. Barcelona, Lleida, Girona, Tarragona.`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.cat'),
  alternates: { canonical: '/servicios/discomobil' },
  openGraph: {
    title: 'Discomóvil | La Fiesta Que Tus Amigos NO Olvidarán',
    description: `DJ que lee la pista, equipamiento profesional EV y luces LED pensadas para la pista. Packs desde ${DISCO_MIN_PRICE}€ para fiestas, bodas y eventos privados.`,
    url: '/servicios/discomobil',
    images: [
      {
        url: '/api/og?title=Discomovil',
        alt: 'Discomóvil profesional con DJ y luces para fiestas privadas',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Discomóvil | Pista Llena Garantizada desde ${DISCO_MIN_PRICE}€`,
    description: 'DJ profesional + sonido EV + luces LED. La fiesta que tus amigos recordarán.',
    images: ['/api/og?title=Discomovil'],
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
        description={`Discomóvil con DJ profesional que lee la pista en tiempo real. Sonido EV profesional según pack, iluminación LED para pista y efectos en momentos clave. Pensado para fiestas, bodas y eventos privados en Catalunya. Packs desde ${DISCO_MIN_PRICE}€.`}
        serviceType={[
          'Discomóvil',
          'DJ para fiestas',
          'DJ bodas',
          'DJ cumpleaños',
          'Iluminación LED',
        ]}
        areaServed={['Barcelona', 'Lleida', 'Girona', 'Tarragona', 'Catalunya']}
        priceFrom={String(DISCO_MIN_PRICE)}
        priceCurrency="EUR"
        availability="https://schema.org/InStock"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 203,
        }}
        offers={DISCO_PACKS.map((pack) => ({
          '@type': 'Offer',
          name: pack.name,
          price: String(pack.priceValue),
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `/servicios/discomobil#${pack.slug}`,
          description: pack.tagline,
        }))}
      />

      <Client />

      <FAQ
        items={[
          {
            q: '¿Cuánto tiempo tardáis en montar la discomóvil?',
            a: 'Entre 45 y 60 minutos según el acceso y el espacio. Llegamos siempre con antelación para montar con calma, hacer prueba de sonido y dejar todo listo antes de que lleguen los invitados.',
          },
          {
            q: '¿Qué diferencia hay entre vuestro DJ y una playlist de Spotify?',
            a: 'Nuestro DJ lee la pista en tiempo real: si un tema no funciona, cambia; si el ambiente sube, aprieta. Una playlist es estática. Nosotros adaptamos la música al público para mantener la pista activa el máximo tiempo posible.',
          },
          {
            q: '¿Incluye luces LED móviles y efectos especiales?',
            a: 'En el pack básico tienes luz suficiente para que la pista tenga ambiente. En los packs superiores añadimos más puntos de luz, máquina de humo y, según el espacio, algunos efectos especiales extra. Todo se define según tu evento y las limitaciones del local.',
          },
          {
            q: '¿Puedo elegir la música o el estilo?',
            a: 'Sí. Puedes enviarnos una lista de temas imprescindibles, artistas y estilos que quieres (reggaeton, pop, 80s, techno suave, etc.). A partir de ahí, el DJ mezcla tu criterio con la lectura de pista para que tenga sentido musicalmente y la gente baile.',
          },
          {
            q: '¿Trabajáis fuera de Barcelona? ¿En Lleida, Girona, Tarragona?',
            a: 'Sí, trabajamos en toda Catalunya. En muchos casos el desplazamiento alrededor de Barcelona está incluido; para otras zonas aplicamos un pequeño suplemento que siempre se detalla en el presupuesto antes de confirmar.',
          },
          {
            q: '¿Qué pasa si hay problemas técnicos durante la fiesta?',
            a: 'Llevamos equipo de backup preparado (cables, controladora y solución alternativa de sonido). Si algo falla, cambiamos rápido y la música no se para. El objetivo es que tú ni te enteres del problema.',
          },
          {
            q: '¿Cuánto tiempo antes hay que reservar?',
            a: 'Como mínimo 2 semanas, pero para viernes y sábados lo normal es reservar con 6-8 semanas de antelación. Son los días que se llenan primero. Lo mejor es consultar disponibilidad por WhatsApp cuanto antes.',
          },
          {
            q: '¿Qué incluye exactamente cada pack?',
            a: 'Todos los packs incluyen DJ profesional, sonido EV e iluminación de pista acordes al espacio. A partir de ahí, cambian las horas de servicio, la potencia de sonido, la cantidad de luz y los efectos extra. Lo normal es elegir pack según nº de personas, tipo de fiesta y horario, y ajustar detalles en la propuesta.',
          },
        ]}
      />
    </>
  );
}
