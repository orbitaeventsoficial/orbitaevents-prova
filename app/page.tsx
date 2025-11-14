// app/page.tsx
import type { Metadata } from 'next';

import HeroBrutal from './components/ui/HeroBrutal';
import ProofSection from './components/marketing/ProofSection';
import EmotionalPacks from './components/marketing/EmotionalPacks';
import UrgencyBanner from './components/marketing/UrgencyBanner';
import VideoTestimonials from './components/marketing/VideoTestimonials';
import TransformationSection from './components/marketing/TransformationSection';
import GuaranteeSection from './components/marketing/GuaranteeSection';
import FAQ from './components/seo/FAQ';
import FinalCTA from './components/marketing/FinalCTA';

export const metadata: Metadata = {
  title: 'Òrbita Events | El Evento Que Tu Gente NO Olvidará | Barcelona, Lleida, Girona',
  description:
    'No es "estuvo bien". Es "FUE ÉPICO". DJ profesional + luces sincronizadas + efectos especiales para bodas, empresas y fiestas en toda Catalunya. +150 eventos. 4.9⭐ (90 reseñas). Pista llena garantizada o reembolso 50%.',
  keywords: [
    'eventos catalunya',
    'dj bodas barcelona',
    'eventos lleida',
    'fiestas girona',
    'bodas tarragona',
    'discomovil profesional',
    'luces eventos',
    'produccion tecnica bodas',
    'dj profesional catalunya',
    'sonido profesional eventos',
    'efectos especiales bodas',
  ],
  openGraph: {
    title: 'Òrbita Events | El Evento Que Tu Gente NO Olvidará',
    description:
      'DJ + Luces + Efectos Especiales. +150 eventos en Barcelona, Lleida, Girona, Tarragona. 4.9/5⭐ Pista llena garantizada.',
    type: 'website',
    url: '/',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Òrbita Events - Eventos profesionales en Catalunya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Òrbita Events | El Evento Épico',
    description: 'DJ + Luces + Efectos. +150 eventos en Catalunya. 4.9/5⭐',
    images: ['/og-home.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <>
      {/* HERO BRUTAL - Los primeros 3 segundos que deciden todo */}
      <HeroBrutal />

      {/* PRUEBA SOCIAL APLASTANTE - Números + Logos + Ratings */}
      <ProofSection />

      {/* TRANSFORMACIÓN ANTES/DESPUÉS - "Evento normalito vs Evento Òrbita" */}
      <TransformationSection />

      {/* PACKS EMOCIONALES - Vendemos experiencias, no técnica */}
      <EmotionalPacks />

      {/* URGENCIA BRUTAL - Banner de disponibilidad en tiempo real */}
      <UrgencyBanner />

      {/* VIDEO TESTIMONIOS - Prueba social que CIERRA */}
      <VideoTestimonials />

      {/* GARANTÍA KAMIKAZE - "Pista llena o reembolso 50%" */}
      <GuaranteeSection />

      {/* FAQ - SEO + Objeciones respondidas */}
      <FAQ
        items={[
          {
            q: '¿Qué hace diferente a Òrbita de otros DJ/proveedores de eventos?',
            a: 'Nosotros NO ponemos playlists. Nuestro DJ LEE la pista en tiempo real y adapta música, luces y efectos al ambiente. Si la gente no baila, cambiamos inmediatamente. Resultado: pista llena durante todo el evento (o te devolvemos 50% del dinero). Más de 150 eventos con 4.9/5 estrellas lo demuestran.',
          },
          {
            q: '¿Cuánto cuesta contratar Òrbita para mi boda/fiesta/evento?',
            a: 'Trabajamos con packs claros y configurador según necesidades. Los precios se calculan automáticamente según horas, equipo y tipo de evento. Puedes ver todas las opciones en el configurador o pedir propuesta por WhatsApp en menos de 24h.',
          },

          {
            q: '¿Trabajáis fuera de Barcelona? ¿En Lleida, Girona, Tarragona?',
            a: 'Sí, cubrimos toda Catalunya. Desplazamiento incluido en todos los packs sin recargos ocultos. Hemos hecho eventos en Barcelona, Lleida, Girona, Tarragona, Manresa, Vic, Figueres... Si está en Catalunya, llegamos.',
          },
          {
            q: '¿Qué pasa si hay problemas técnicos durante el evento?',
            a: 'Llevamos equipamiento BACKUP completo de todo: sonido, luces, mezcladora, reproductores. Si algo falla (rarísimo), tenemos repuesto en menos de 5 minutos. Tu evento NUNCA se para. Más de 150 eventos sin incidencias técnicas serias nos respaldan.',
          },
          {
            q: '¿Puedo elegir la música o sois vosotros los que decidís?',
            a: 'Tú decides el estilo y momentos clave (entrada, primer baile, brindis...). Antes del evento hacemos reunión para crear playlist personalizada. Durante el evento, el DJ combina tus preferencias con lectura de pista en tiempo real para mantener ambiente épico.',
          },
          {
            q: '¿Cuánto tiempo antes hay que reservar?',
            a: 'Bodas: mínimo 2-3 meses (las fechas buenas se llenan 6 meses antes). Fiestas privadas: 3-4 semanas. Eventos corporativos: 4 semanas. Consulta disponibilidad por WhatsApp para tu fecha específica.',
          },
          {
            q: '¿Ofrecéis garantía de satisfacción?',
            a: 'Sí. "Garantía Pista Llena": Si tu pista no está llena la mayor parte del evento, te devolvemos el 50% del dinero. Así de seguros estamos de que sabemos mantener el ambiente. En más de 150 eventos, solo 2 personas han pedido reembolso (y fue por motivos ajenos a la parte musical).',
          },
          {
            q: '¿Qué incluye exactamente el servicio?',
            a: 'TODO lo necesario: DJ profesional, equipamiento completo (sonido EV profesional, luces LED sincronizadas, efectos especiales según pack), montaje, desmontaje, desplazamiento, coordinación, técnico dedicado, backup equipamiento, seguro responsabilidad civil. Tú solo disfrutas.',
          },
        ]}
      />

      {/* CTA FINAL BRUTAL - Último empujón para conversión */}
      <FinalCTA />
    </>
  );
}
