// app/servicios/discomobil/ClientShell.tsx
'use client';

import { useEffect } from 'react';
import {
  Music,
  Sparkles,
  PartyPopper,
  Check,
  Star,
  Calendar,
  ArrowRight,
  Zap,
  Users,
  Clock,
  MessageCircle,
  Flame,
  Heart,
  TrendingUp,
  X,
} from 'lucide-react';
import { getPacksByService } from '@/lib/packs-config';

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

// 🔗 BASE WHATSAPP
const WA_BASE = 'https://wa.me/34699121023';
const buildWhatsAppUrl = (message: string) =>
  `${WA_BASE}?text=${encodeURIComponent(message)}`;

// 🔥 PACKS CENTRALIZADOS
const discoPackages = getPacksByService('discomobil');

const partyTestimonials = [
  {
    name: 'Marc',
    age: 30,
    event: 'Cumpleaños',
    location: 'Barcelona',
    image: '/img/portfolio/fiestas-privadas/shot-01.webp',
    quote:
      'Mis amigos aún me preguntan dónde contraté el DJ. La pista estuvo llena hasta el final. Supo qué poner en cada momento.',
    rating: 5,
    pack: 'Premium',
  },
  {
    name: 'Laura',
    age: 25,
    event: 'Fiesta Graduación',
    location: 'Lleida',
    image: '/img/portfolio/fiestas-privadas/shot-02.webp',
    quote:
      'Profesionales de principio a fin. Montaje rápido, sonido claro y luces que daban ambiente de verdad. Todo el mundo bailando.',
    rating: 5,
    pack: 'Básica',
  },
  {
    name: 'Carlos y Ana',
    age: null,
    event: 'Boda',
    location: 'Girona',
    image: '/img/portfolio/fiestas-privadas/shot-03.webp',
    quote:
      'Queríamos una boda con buena fiesta, no solo música de fondo. Humo, luces y cambios de ritmo muy bien medidos. Los invitados siguen hablando de la noche.',
    rating: 5,
    pack: 'VIP',
  },
];

const comparisonPoints = [
  {
    wrong: '❌ Playlist en aleatorio desde el móvil',
    consequence: 'Pista vacía a medianoche, cambios de tema raros y gente sentada',
    right: '✅ DJ que lee la pista en tiempo real',
    benefit:
      'Si no reaccionan, cambia. Si sube el ambiente, aprieta. El objetivo: pista llena el máximo rato posible.',
  },
  {
    wrong: '❌ Luces genéricas que solo parpadean',
    consequence: '"Estuvo bien… pero parecía una luz cualquiera"',
    right: '✅ Luces pensadas para la pista',
    benefit:
      'Ambiente distinto para calentamiento, subidones y finales. La luz acompaña la música, no molesta.',
  },
  {
    wrong: '❌ Equipamiento barato sin garantía',
    consequence: 'Sonido pobre, posibles acoples o fallos a media fiesta',
    right: '✅ Equipamiento profesional EV + controladora DJ',
    benefit: 'Sonido nítido, estable y con backup preparado por si algo falla.',
  },
];

const availabilityData = [
  { date: '2024-12-14', status: 'disponible', label: 'Sáb 14 Dic' },
  { date: '2024-12-21', status: 'completo', label: 'Sáb 21 Dic' },
  { date: '2024-12-28', status: 'ultimo', label: 'Sáb 28 Dic' },
  { date: '2025-01-04', status: 'disponible', label: 'Sáb 4 Ene' },
  { date: '2025-01-11', status: 'disponible', label: 'Sáb 11 Ene' },
  { date: '2025-01-18', status: 'completo', label: 'Sáb 18 Ene' },
];

export default function ClientShell() {
  useEffect(() => {
    track('View_Discomovil');
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-bg-main z-10" />
          <img
            src="/img/portfolio/discomovil-cover.webp"
            alt="Discomóvil Òrbita Events"
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>

        <div className="relative z-20 mx-auto max-w-6xl px-4 py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-oe-gold/20 border border-oe-gold px-4 py-2 mb-6 backdrop-blur-sm">
            <Flame className="w-4 h-4 text-oe-gold" />
            <span className="text-sm font-medium text-oe-gold">+200 fiestas en Catalunya</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white mb-6 leading-[1.05]">
            La Fiesta Que
            <br />
            <span className="gradient-text breathe">Tus Amigos NO Olvidarán</span>
          </h1>

          <p className="text-2xl sm:text-3xl text-text-muted max-w-4xl mb-8 leading-relaxed">
            No es solo poner música.
            <br />
            Es que <span className="text-oe-gold font-bold">la pista tenga sentido</span> desde el primer
            tema hasta el último.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">DJ que lee la pista y se adapta al público</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">Equipamiento profesional EV, nada de kits de juguete</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">Montaje cuidado y efectos en los momentos clave</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-oe-gold text-oe-gold" />
              ))}
              <span className="text-white/80 ml-2">4.9/5 · 203 fiestas</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#packs"
              className="oe-btn-gold text-lg px-8 py-5 inline-flex items-center justify-center gap-3"
              onClick={() => track('Hero_CTA_Ver_Packs')}
            >
              <PartyPopper className="w-6 h-6" />
              Ver Packs de Fiesta
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={buildWhatsAppUrl('Hola! Quiero info para mi fiesta')}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn text-lg px-8 py-5 inline-flex items-center justify-center gap-3 bg-bg-surface border border-oe-gold/30 hover:border-oe-gold hover:bg-oe-gold/10"
              onClick={() => track('Hero_CTA_WhatsApp')}
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp Directo
            </a>
          </div>
        </div>
      </section>

      {/* TRANSFORMACIÓN */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-main to-bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-h2 text-center text-white mb-6">
            DJ Normalito vs <span className="text-oe-gold">DJ Òrbita</span>
          </h2>

          <p className="text-xl text-text-muted text-center max-w-3xl mx-auto mb-16">
            La diferencia entre una fiesta "que estuvo bien" y una fiesta{' '}
            <span className="text-oe-gold font-bold">que apetece repetir</span>.
          </p>

          <div className="space-y-8">
            {comparisonPoints.map((point, idx) => (
              <div
                key={idx}
                className="grid md:grid-cols-2 gap-6 items-center oe-card p-8 rounded-3xl hover:border-oe-gold/50 transition-all"
              >
                {/* PROBLEMA */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2">
                    <X className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 font-bold text-sm">OTROS DJ</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{point.wrong}</h3>
                  <p className="text-text-muted italic">"{point.consequence}"</p>
                </div>

                {/* SOLUCIÓN */}
                <div className="space-y-3 relative md:pl-6 md:border-l-2 md:border-oe-gold/30">
                  <div className="inline-flex items-center gap-2 bg-oe-gold/10 border border-oe-gold rounded-full px-4 py-2">
                    <Sparkles className="w-4 h-4 text-oe-gold" />
                    <span className="text-oe-gold font-bold text-sm">CON ÒRBITA</span>
                  </div>
                  <h3 className="text-2xl font-bold text-oe-gold">{point.right}</h3>
                  <p className="text-white">{point.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* URGENCIA - DISPONIBILIDAD */}
      <section className="py-20 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-5xl px-4">
          <div className="oe-card p-10 rounded-3xl border-2 border-oe-gold/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
                📅 Disponibilidad en Tiempo Real
              </h2>
              <p className="text-lg text-text-muted">
                Los <span className="text-oe-gold font-bold">viernes y sábados se llenan rápido</span>.
                Mejor mirar la fecha antes de pensar en la playlist.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {availabilityData.map((day) => (
                <div
                  key={day.date}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    day.status === 'disponible'
                      ? 'bg-green-500/10 border-green-500/50'
                      : day.status === 'ultimo'
                      ? 'bg-yellow-500/10 border-yellow-500/50 animate-pulse'
                      : 'bg-red-500/10 border-red-500/50'
                  }`}
                >
                  <p className="text-sm font-bold text-white mb-1">{day.label}</p>
                  <p
                    className={`text-xs font-medium ${
                      day.status === 'disponible'
                        ? 'text-green-400'
                        : day.status === 'ultimo'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}
                  >
                    {day.status === 'disponible'
                      ? '✅ Disponible'
                      : day.status === 'ultimo'
                      ? '⚠️ Última fecha'
                      : '❌ Completo'}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-text-muted mb-4">
                🔥 <span className="text-oe-gold font-bold">Hace unas horas:</span> reservada una fecha de
                sábado para discomóvil
              </p>
              <a
                href={buildWhatsAppUrl('Hola! Quiero consultar disponibilidad para una discomóvil')}
                target="_blank"
                rel="noopener noreferrer"
                className="oe-btn-gold inline-flex items-center gap-2"
                onClick={() => track('CTA_Disponibilidad')}
              >
                <Calendar className="w-5 h-5" />
                Consultar Mi Fecha
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section id="packs" className="py-20 sm:py-32 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-white mb-4">
              Elige Tu Pack
              <br />
              <span className="text-oe-gold">(Pista Llena Garantizada)</span>
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Todos los packs incluyen DJ profesional, equipo de calidad y montaje/desmontaje. La diferencia
              está en la potencia, la luz y el nivel de producción.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {discoPackages.map((pack) => (
              <div
                key={pack.id}
                id={pack.slug}
                className={`relative rounded-3xl p-8 overflow-visible transition-all duration-400 ${
                  pack.highlight
                    ? 'oe-card border-2 border-oe-gold scale-105 ring-2 ring-oe-gold/20 ring-offset-4 ring-offset-bg-surface'
                    : 'bg-bg-main border border-border hover:border-oe-gold/30 hover:scale-[1.02]'
                }`}
              >
                {pack.popular && pack.badge && (
                  <div
                    className="absolute left-1/2 -top-6 -translate-x-1/2 z-20 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide
                 bg-oe-gold text-black ring-1 ring-oe-gold-dark shadow-oe-gold"
                  >
                    {pack.badge}
                  </div>
                )}

                <h3 className="text-3xl font-display font-black text-white mb-2">{pack.name}</h3>
                <p className="text-sm font-medium text-oe-gold mb-3">{pack.tagline}</p>
                {pack.emotion && (
                  <p className="text-text-muted italic mb-6 leading-relaxed min-h-[3rem]">
                    "{pack.emotion}"
                  </p>
                )}

                <div className="flex items-baseline gap-3 mb-2">
                  <div className="text-4xl font-display font-black text-white">{pack.price}</div>
                  {pack.priceOriginal && (
                    <div className="text-xl text-text-muted line-through">{pack.priceOriginal}</div>
                  )}
                </div>

                <ul className="space-y-3 mb-6 min-h-[20rem]">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                      <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 mb-6">
                  {pack.ideal && (
                    <div className="p-3 rounded-xl bg-oe-gold/10 border border-oe-gold/20">
                      <p className="text-xs text-oe-gold font-medium">👥 {pack.ideal}</p>
                    </div>
                  )}
                  {pack.bestFor && (
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                      <p className="text-xs text-blue-400 font-medium">✨ {pack.bestFor}</p>
                    </div>
                  )}
                </div>

                <a
                  href={buildWhatsAppUrl(
                    `Hola! Quiero info sobre el ${pack.name} (${pack.price}) para una discomóvil`
                  )}
                  className={`group inline-flex items-center justify-center gap-2 w-full rounded-xl px-6 py-4 font-bold font-display transition-all ${
                    pack.highlight
                      ? 'oe-btn-gold'
                      : 'bg-bg-surface border border-oe-gold/30 text-white hover:border-oe-gold hover:bg-oe-gold/10'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track('Click_Pack_Discomovil', { pack: pack.id, price: pack.priceValue })
                  }
                >
                  {pack.cta || 'Reservar Pack'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-muted mb-4">
              ¿No tienes claro qué pack encaja mejor? Cuéntanos espacio, horario y nº de personas y te decimos
              cuál tiene más sentido.
            </p>
            <a
              href={buildWhatsAppUrl('Hola! Necesito ayuda eligiendo pack de discomóvil')}
              className="inline-flex items-center gap-2 text-oe-gold hover:underline"
              onClick={() => track('CTA_Ayuda_Pack')}
            >
              <MessageCircle className="w-5 h-5" />
              Hablar con un asesor (gratis)
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-h2 text-center text-white mb-4">
            Fiestas Reales,
            <br />
            <span className="text-oe-gold">Comentarios Reales</span>
          </h2>

          <p className="text-xl text-text-muted text-center max-w-3xl mx-auto mb-16">
            Opiniones de gente que ya ha confiado en Òrbita para dejar la música en manos de alguien que sabe
            lo que hace.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {partyTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden bg-bg-surface border border-border hover:border-oe-gold/50 transition-all group"
              >
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img
                    src={testimonial.image}
                    alt={`Fiesta ${testimonial.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform	duration-500"
                  />
                  <div className="absolute bottom-3 right-3 z-20 bg-oe-gold/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-xs font-bold text-black">Pack {testimonial.pack}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-oe-gold text-oe-gold" />
                    ))}
                  </div>

                  <p className="text-white italic mb-4 leading-relaxed">"{testimonial.quote}"</p>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-oe-gold/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-oe-gold" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">
                        {testimonial.name}
                        {testimonial.age && ` (${testimonial.age} años)`}
                      </p>
                      <p className="text-xs text-text-muted">
                        {testimonial.event} · {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-muted text-sm">
              ⭐ 4.9/5 valoración media · 203 fiestas · 89% repiten o recomiendan
            </p>
          </div>
        </div>
      </section>

      {/* GARANTÍA PISTA LLENA */}
      <section className="py-20 sm:py-32 bg-bg-surface">
        <div className="mx-auto max-w-4xl px-4">
          <div className="oe-card p-10 rounded-3xl text-center border-2 border-oe-gold/50">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-oe-gold/10 flex items-center justify-center">
              <Heart className="w-10 h-10 text-oe-gold" />
            </div>

            <h2 className="text-3xl sm:4xl font-display font-black text-white mb-4">
              Garantía "Pista Llena"
            </h2>

            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              Si la música no acompaña y la pista se vacía por nuestra culpa,{' '}
              <span className="text-oe-gold font-bold">te devolvemos el 50% del dinero</span>. No tiene sentido
              llamarnos si no es para tener buena fiesta.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-bg-main">
                <TrendingUp className="w-8 h-8 text-oe-gold mx-auto mb-2" />
                <p className="text-sm text-white font-bold">93%</p>
                <p className="text-xs text-text-muted">Pista activa más de 3 horas</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-main">
                <Clock className="w-8 h-8 text-oe-gold mx-auto mb-2" />
                <p className="text-sm text-white font-bold">Hasta las 5am</p>
                <p className="text-xs text-text-muted">Duración media de las fiestas largas</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-main">
                <Star className="w-8 h-8 text-oe-gold mx-auto mb-2" />
                <p className="text-sm text-white font-bold">4.9/5</p>
                <p className="text-xs text-text-muted">Valoración de ambiente</p>
              </div>
            </div>

            <p className="text-sm text-text-muted">
              * Garantía válida si se respetan recomendaciones de horario, espacio y aforo
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl sm:6xl font-display font-black text-white mb-6 leading-tight">
            ¿Lista Para La Fiesta
            <br />
            <span className="text-oe-gold">Del Año?</span>
          </h2>

          <p className="text-xl text-text-muted mb-10 leading-relaxed">
            Solo <span className="text-oe-gold font-bold">unas pocas fechas libres</span> en los próximos meses.
            <br />
            Si tienes fecha aproximada, mejor mirarla ahora que lamentarlo luego.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={buildWhatsAppUrl('Hola! Quiero reservar mi fiesta de discomóvil')}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center justify-center gap-3"
              onClick={() => track('CTA_Final_Discomovil')}
            >
              <Calendar className="w-7 h-7" />
              Reservar Mi Fecha
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>

          <p className="text-sm text-text-muted">
            ⚡ Respondemos en menos de 2h (incluidos fines de semana)
            <br />
            💶 Señal 30% | Resto el día del evento
            <br />
            🎁 A veces incluimos alguna hora extra según el evento y la fecha
          </p>
        </div>
      </section>

      {/* CTA STICKY MOBILE */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <a
          href={buildWhatsAppUrl('Hola! Quiero info para mi fiesta de discomóvil')}
          target="_blank"
          rel="noopener noreferrer"
          className="oe-btn-gold w-full flex items-center justify-center gap-2 shadow-2xl animate-bounce"
          onClick={() => track('Sticky_WA_Discomovil')}
        >
          <MessageCircle className="w-5 h-5" />
          Reservar Mi Fiesta
        </a>
      </div>
    </div>
  );
}
