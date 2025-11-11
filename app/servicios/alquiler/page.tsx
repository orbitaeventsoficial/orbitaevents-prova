// app/servicios/alquiler/page.tsx
// 🔥 MANOLO VERSION - CORREGIDO + Optimizado para conversión máxima

import type { Metadata } from 'next';
import Breadcrumbs from '@/app/components/seo/Breadcrumbs';
import ServiceJsonLD from '@/app/components/seo/ServiceJsonLD';
import FAQ from '@/app/components/seo/FAQ';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Alquiler Sonido Profesional Barcelona | EV ETX 2000W + B-150 LED + Pioneer DJ | Órbita Events',
  description:
    'Alquila equipamiento audiovisual PRO: altavoces EV ETX-15P 2000W, 4 luces B-150 LED 150W con efectos, Pioneer DJM-900 + CDJ-3000. Con o sin técnico. Entrega/recogida incluida Barcelona. Desde 150€/día. Empresas y particulares.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.cat'),
  alternates: { canonical: '/servicios/alquiler' },
  openGraph: {
    title: 'Alquiler Equipo Audiovisual PRO | EV + Pioneer + LED desde 150€',
    description:
      'Sonido EV ETX, luces móviles B-150 LED, mesas Pioneer DJ. Con técnico opcional. Entrega gratis Barcelona.',
    url: '/servicios/alquiler',
    images: [
      {
        url: '/api/og?title=Alquiler%20Equipo%20desde%20150€',
        alt: 'Alquiler equipamiento audiovisual profesional Barcelona',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alquiler Equipo Audiovisual | EV + Pioneer + LED',
    description: 'Desde 150€/día. Entrega incluida Barcelona.',
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
        description="Alquiler de equipamiento audiovisual profesional: altavoces EV ETX-15P 2000W RMS, 4 luces B-150 LED 150W con beam 6° y efectos gobos/prism, Pioneer DJM-900 + CDJ-3000. Con o sin técnico dedicado. Entrega y recogida incluida en Barcelona y área metropolitana. Ideal para bodas, eventos corporativos, fiestas privadas y producciones audiovisuales."
        serviceType={[
          'Alquiler sonido profesional',
          'Alquiler iluminación LED',
          'Alquiler equipamiento DJ',
          'Alquiler equipo audiovisual',
          'Alquiler sonido bodas',
          'Alquiler luces eventos',
        ]}
        areaServed={['Barcelona', 'Girona', 'Tarragona', 'Lleida', 'Catalunya', 'Área Metropolitana Barcelona']}
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
            name: 'Pack Sonido PRO - 2x EV ETX + Mezcladora',
            price: '280',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/alquiler#pack-sonido',
            description: '2 altavoces EV ETX-15P 2000W + mezcladora + cables. Perfecto para fiestas 50-150 personas.',
          },
          {
            '@type': 'Offer',
            name: 'Pack Luces LED - 4x B-150 Moving Head',
            price: '220',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/alquiler#pack-luces',
            description: '4 luces B-150 LED 150W con control DMX, trípodes, efectos gobos/prism. Iluminación profesional.',
          },
          {
            '@type': 'Offer',
            name: 'Pack DJ Pioneer - DJM-900 + 2x CDJ-3000',
            price: '380',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/alquiler#pack-pioneer',
            description: 'Equipamiento DJ club profesional. Mezcladora Pioneer DJM-900 + 2 CDJ-3000 + cables.',
          },
          {
            '@type': 'Offer',
            name: 'Pack Completo + Técnico - Sonido + Luces + DJ + Operador',
            price: '750',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/alquiler#pack-completo',
            description: 'Todo incluido: sonido EV, luces LED, Pioneer DJ, técnico full day. Solución llave en mano.',
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
            a: 'SÍ, entrega y recogida INCLUIDA en Barcelona y área metropolitana (hasta 25km). Resto de Catalunya +50€. Montamos el equipo, hacemos prueba de sonido y dejamos todo operativo. Sin costes ocultos.',
          },
          {
            q: '¿Puedo alquilar solo las luces B-150 LED sin sonido?',
            a: 'SÍ. Pack de 4 luces B-150 LED 150W desde 220€/día. Incluye control DMX, 4 trípodes, todos los cables, programación básica de efectos. Gobos, prismas y beam 6° incluidos. Perfecto para ambientar eventos sin sonido.',
          },
          {
            q: '¿Ofrecéis técnico con el alquiler? ¿Cuánto cuesta?',
            a: 'SÍ. Técnico dedicado disponible por +150€/día. Incluye: montaje completo profesional, configuración y calibración, pruebas exhaustivas, soporte in situ durante TODO el evento. MUY recomendado si es tu primer alquiler o evento importante.',
          },
          {
            q: '¿Cuánto dura el período de alquiler? ¿Puedo extenderlo?',
            a: '24 horas estándar (recogida día siguiente mismo horario). Fin de semana viernes-lunes: +50% del precio diario. Semana completa (7 días): paga 5 días. Alquileres mensuales: consultar descuento especial.',
          },
          {
            q: '¿Qué pasa si hay un problema técnico con el equipo durante mi evento?',
            a: 'TODO el equipamiento se revisa y testea antes de cada alquiler. Si surge cualquier problema: equipo de backup disponible en menos de 2h (área Barcelona). Técnico disponible por teléfono 24h durante tu alquiler. Garantía total.',
          },
          {
            q: '¿Puedo alquilar solo el equipamiento DJ Pioneer sin contratar DJ ni sonido?',
            a: 'SÍ. Pioneer DJM-900 + 2x CDJ-3000 por 380€/día. Incluye todos los cables XLR/RCA, flight case y soporte técnico DJ. Ideal para DJs que quieren usar equipamiento club profesional en su evento privado.',
          },
          {
            q: '¿Hay descuentos para alquileres de varios días o recurrentes?',
            a: 'SÍ. Fin de semana (3 días) = +50% del diario. Semana completa (7 días) = paga 5. Alquileres recurrentes (mismo cliente mensual) o empresas con volumen: descuentos especiales hasta 30%. Consulta tu caso.',
          },
          {
            q: '¿Qué documentación necesito para alquilar? ¿Hay fianza?',
            a: 'Particulares: DNI/NIE + fianza reembolsable (100-300€ según pack). Empresas: CIF/NIF, factura a nombre empresa, SIN fianza. Fianza se devuelve inmediatamente al verificar estado equipamiento tras devolución. Pago: transferencia o Bizum.',
          },
        ]}
      />
    </>
  );
}
