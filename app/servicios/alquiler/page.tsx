// app/servicios/alquiler/page.tsx
// 🔥 MANOLO VERSION - CORREGIDO + Optimizado para conversión máxima

import type { Metadata } from 'next';
import Breadcrumbs from '@/app/components/seo/Breadcrumbs';
import ServiceJsonLD from '@/app/components/seo/ServiceJsonLD';
import FAQ from '@/app/components/seo/FAQ';
import Client from './client';

export const metadata: Metadata = {
  title: 'Alquiler Sonido Profesional Barcelona | EV ETX 2000W + B-150 LED + Pioneer DJ | Órbita Events',
  description:
    'Alquila equipamiento audiovisual profesional: altavoces EV ETX-15P 2000 W, 4 luces B-150 LED 150 W con efectos, Pioneer DDJ REV7. Con o sin técnico. Entrega y recogida incluidas en Barcelona. Desde 150 €/día. Empresas y particulares.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.com'),
  alternates: { canonical: '/servicios/alquiler' },
  openGraph: {
    title: 'Alquiler Equipo Audiovisual PRO | EV + Pioneer + LED desde 150 €',
    description:
      'Sonido EV ETX, luces móviles B-150 LED y mesas Pioneer DJ. Técnico opcional. Entrega incluida en Barcelona.',
    url: '/servicios/alquiler',
    images: [
      {
        url: '/api/og?title=Alquiler%20Equipo%20desde%20150€',
        alt: 'Alquiler de equipamiento audiovisual profesional en Barcelona',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alquiler Equipo Audiovisual | EV + Pioneer + LED',
    description: 'Desde 150 €/día. Entrega incluida en Barcelona.',
    images: ['/api/og?title=Alquiler%20Equipo%20150€'],
  },
  robots: { index: true, follow: true },
  keywords: [
    'alquiler sonido Barcelona',
    'alquiler luces LED Barcelona',
    'alquiler equipamiento DJ',
    'EV ETX alquiler',
    'B-150 LED alquiler',
    'Pioneer DJ alquiler',
    'alquiler equipo audiovisual profesional',
    'alquiler sonido bodas',
    'alquiler iluminación eventos',
    'alquiler equipamiento fiestas',
  ],
};

export default function AlquilerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Inicio', url: '/' },
          { name: 'Servicios', url: '/servicios' },
          { name: 'Alquiler', url: '/servicios/alquiler' },
        ]}
      />

      {/* 🔥 JSON-LD CORREGIDO - Ahora funciona con múltiples ofertas */}
      <ServiceJsonLD
        name="Alquiler Equipo Audiovisual Profesional Barcelona"
        slugPath="/servicios/alquiler"
        description="Alquiler de equipamiento audiovisual profesional: altavoces EV ETX-15P 2000 W RMS, 4 luces B-150 LED 150 W con beam de 6° y efectos gobo/prisma, Pioneer DDJ REV7. Con o sin técnico dedicado. Entrega y recogida incluidas en Barcelona y área metropolitana. Ideal para bodas, eventos corporativos, fiestas privadas y producciones."
        serviceType={[
          'Alquiler sonido profesional',
          'Alquiler iluminación LED',
          'Alquiler equipamiento DJ',
          'Alquiler equipo audiovisual',
          'Alquiler sonido bodas',
          'Alquiler luces eventos',
        ]}
        areaServed={['Barcelona', 'Girona', 'Tarragona', 'Lleida', 'Catalunya', 'Área Metropolitana de Barcelona']}
        priceFrom="150"
        priceCurrency="EUR"
        availability="https://schema.org/InStock"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 89,
        }}
        offers={[
          {
            '@type': 'Offer',
            name: 'Pack Sonido PRO — 2x EV ETX + mezcladora',
            price: '280',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/alquiler#pack-sonido',
            description: '2 altavoces EV ETX-15P 2000 W + mezcladora + cableado. Ideal para 50–150 personas.',
          },
          {
            '@type': 'Offer',
            name: 'Pack Luces LED — 4x B-150 moving head',
            price: '220',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/alquiler#pack-luces',
            description: '4 B-150 LED 150 W con control DMX, trípodes y efectos (gobos, prisma, beam 6°).',
          },
          
          {
            '@type': 'Offer',
            name: 'Pack Completo + técnico — Sonido + luces + DJ + operador',
            price: '750',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/alquiler#pack-completo',
            description: 'Sonido EV, luces LED, Pioneer DJ y técnico full day. Solución llave en mano.',
          },
        ]}
      />

      {/* CONTENIDO PRINCIPAL - Client Component */}
      <Client />

      {/* 🔥 FAQ OPTIMIZADO - Neutraliza objeciones específicas de alquiler */}
      <FAQ
        items={[
          {
            q: '¿El precio incluye entrega y recogida del equipamiento?',
            a: 'Sí, entrega y recogida incluidas en Barcelona y área metropolitana (hasta 25 km). Resto de Catalunya +50 €. Montamos el equipo, hacemos la prueba y lo dejamos operativo. Sin costes ocultos.',
          },
          {
            q: '¿Puedo alquilar solo las luces B-150 LED sin sonido?',
            a: 'Sí. Pack de 4 B-150 LED 150 W desde 220 €/día. Incluye control DMX, cableado y programación básica de efectos.',
          },
          {
            q: '¿Ofrecéis técnico con el alquiler? ¿Cuánto cuesta?',
            a: 'Sí. Técnico dedicado disponible por +150 €/día. Incluye montaje profesional, configuración y calibración, pruebas y soporte in situ durante todo el evento. Muy recomendable si es tu primer alquiler o un evento importante.',
          },
          {
            q: '¿Cuánto dura el período de alquiler? ¿Puedo extenderlo?',
            a: '24 horas estándar (devolución al día siguiente a la misma hora). Fin de semana viernes-lunes: +50% del precio diario. Semana completa (7 días): pagas 5. Para mensuales, consulta descuentos.',
          },
          {
            q: '¿Qué pasa si hay un problema técnico con el equipo durante mi evento?',
            a: 'Todo el equipamiento se revisa y se testea antes de cada alquiler. Si surge cualquier problema, tenemos equipo de backup en menos de 2 h (área Barcelona). Soporte telefónico 24 h durante tu alquiler.',
          },
        
          {
            q: '¿Hay descuentos para alquileres de varios días o recurrentes?',
            a: 'Sí. Fin de semana (3 días) = +50% del diario. Semana (7 días) = pagas 5. Recurrentes o empresas con volumen: descuentos hasta el 30%. Consúltanos.',
          },
          {
            q: '¿Qué documentación necesito para alquilar? ¿Hay fianza?',
            a: 'Particulares: DNI/NIE + fianza reembolsable (100–300 € según pack). Empresas: CIF/NIF, factura a nombre de la empresa y sin fianza. La fianza se devuelve al verificar el estado del equipo. Pago por transferencia o Bizum.',
          },
        ]}
      />
    </>
  );
}
