// app/servicios/empresas/page.tsx
import type { Metadata } from 'next';
import Breadcrumbs from '@/app/components/seo/Breadcrumbs';
import ServiceJsonLD from '@/app/components/seo/ServiceJsonLD';
import FAQ from '@/app/components/seo/FAQ';
import Client from './client';

export const metadata: Metadata = {
  title: 'Eventos Corporativos Barcelona | Team Building con Tematización | Òrbita Events',
  description:
    'Eventos corporativos que tu equipo recordará durante meses. Team building Harry Potter, cenas de empresa con efectos especiales, presentaciones impactantes. Equipamiento profesional Pioneer + EV.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.cat'),
  alternates: { canonical: '/servicios/empresas' },
  openGraph: {
    title: 'Eventos Corporativos | El Evento que Te Hace Quedar Como un Crack',
    description:
      'Team building inmersivo, cenas de empresa épicas, presentaciones con impacto. Equipamiento profesional + tematización personalizada.',
    url: '/servicios/empresas',
    images: [
      {
        url: '/api/og?title=Eventos%20Corporativos%20Barcelona',
        alt: 'Eventos corporativos profesionales con tematización',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eventos Corporativos | Team Building + Cenas Empresa',
    description:
      'El evento que hace que tu equipo hable de tu empresa durante meses.',
    images: ['/api/og?title=Eventos%20Corporativos'],
  },
  robots: { index: true, follow: true },
  keywords: [
    'eventos corporativos Barcelona',
    'team building Barcelona',
    'cenas de empresa',
    'eventos empresariales',
    'presentaciones corporativas',
    'animación corporativa',
    'DJ eventos empresa',
    'tematización corporativa',
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

      {/* JSON-LD para eventos corporativos */}
      <ServiceJsonLD
        name="Eventos Corporativos Profesionales"
        slugPath="/servicios/empresas"
        description="Producción integral de eventos corporativos: team building tematizado, cenas de empresa, presentaciones impactantes, celebraciones de logros. Equipamiento Pioneer profesional + tematización personalizada."
        serviceType={[
          'Eventos corporativos',
          'Team building',
          'Cenas de empresa',
          'Presentaciones corporativas',
          'Animación empresarial',
        ]}
        areaServed={['Barcelona', 'Lleida', 'Girona', 'Tarragona', 'Catalunya']}
        priceFrom="1200"
        priceCurrency="EUR"
        availability="https://schema.org/InStock"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 47,
        }}
        offers={[
          {
            '@type': 'Offer',
            price: '1800',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/empresas#team-building',
            name: 'Team Building Tematizado',
          },
          {
            '@type': 'Offer',
            price: '2000',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/empresas#cenas-empresa',
            name: 'Cenas de Empresa Premium',
          },
          {
            '@type': 'Offer',
            price: '1200',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: '/servicios/empresas#presentaciones',
            name: 'Presentaciones Impactantes',
          },
        ]}
      />

      {/* Contenido principal */}
      <Client />

      {/* FAQ al final */}
      <FAQ
        items={[
          {
            q: '¿Podéis facturar a nombre de la empresa?',
            a: 'Sí, factura digital con IVA desglosado en menos de 24h. Incluimos todos los datos fiscales necesarios.',
          },
          {
            q: '¿Trabajáis en espacios empresariales (oficinas, naves)?',
            a: 'Sí, adaptamos sonido e iluminación a cualquier espacio: oficinas, naves industriales, hoteles, fincas. Hacemos visita previa sin coste.',
          },
          {
            q: '¿Qué pasa si hay problemas técnicos durante el evento?',
            a: 'Equipamiento backup completo + técnico on-site durante todo el evento. Plan B garantizado para cada elemento técnico.',
          },
          {
            q: '¿Hacéis eventos con branding corporativo?',
            a: 'Sí, desde proyección de logos hasta tematización completa con colores corporativos. Videomapping con datos de empresa, logros, etc.',
          },
          {
            q: '¿Incluye coordinación con otros proveedores (catering, espacios)?',
            a: 'Sí, coordinamos con catering, espacios y otros proveedores. Tienes un coordinador dedicado disponible 24h el día del evento.',
          },
          {
            q: '¿Cuánto tiempo antes hay que reservar un evento corporativo?',
            a: 'Recomendamos mínimo 4 semanas para eventos grandes (>100 personas). Para eventos más pequeños, 2 semanas. Consulta disponibilidad por WhatsApp.',
          },
        ]}
      />
    </>
  );
}
