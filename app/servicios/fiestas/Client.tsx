'use client';
import { useState, useEffect } from 'react';
import {
  Music,
  Sparkles,
  PartyPopper,
  Check,
  Star,
  ArrowRight,
  Users,
  MessageCircle,
  Flame,
  Heart,
  Cake,
  Gift,
  Zap,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { getPacksByService } from '@/data/packs-config';

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

const WA_LINK = `https://wa.me/34699121023?text=${encodeURIComponent(
  'Hola! Quiero info para mi fiesta privada'
)}`;

// 🔥 PACKS DESDE CONFIGURACIÓN CENTRALIZADA
const fiestaPackages = getPacksByService('fiestas');

export default function FiestasClient() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);

  useEffect(() => {
    track('View_Fiestas_Privadas');
  }, []);

  // Anti-scroll-jump
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-bg-main z-10" />
          <img
            src="/img/portfolio/fiestas-cover.webp"
            alt="Fiestas privadas Barcelona"
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>

        <div className="relative z-20 mx-auto max-w-6xl px-4 py-20 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-oe-gold/10 border border-oe-gold/30 text-oe-gold text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4 inline mr-2" />
            CUMPLEAÑOS · DESPEDIDAS · FIESTAS TEMÁTICAS
          </div>

          <h1 className="text-5xl sm:text-7xl font-display font-black text-white mb-6 leading-[1.05]">
            La Fiesta Privada
            <br />
            <span className="gradient-text breathe">Que Tus Amigos Recordarán</span>
          </h1>

          <p className="text-xl sm:text-2xl text-text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            Cumpleaños épicos, despedidas memorables y fiestas temáticas.
            <br />
            DJ profesional, buen sonido y luz en condiciones.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold text-lg px-8 py-5 inline-flex items-center justify-center gap-3"
              onClick={() => track('CTA_WhatsApp_Fiestas_Hero')}
            >
              <MessageCircle className="w-5 h-5" />
              Consultar Disponibilidad
            </a>
            <a
              href="#packs"
              className="oe-btn-outline text-lg px-8 py-5 inline-flex items-center justify-center gap-3"
            >
              Ver Packs y Precios
            </a>
          </div>
        </div>
      </section>

      {/* PROOF SECCIÓN */}
      <section className="py-12 bg-bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: PartyPopper, label: '+167 fiestas', sublabel: 'En 2024' },
              { icon: Star, label: '4.9/5', sublabel: 'Valoración' },
              { icon: Heart, label: '94%', sublabel: 'Repiten' },
              { icon: TrendingUp, label: '+3h media', sublabel: 'Pista llena' },
            ].map((stat, i) => (
              <div key={i}>
                <stat.icon className="w-8 h-8 text-oe-gold mx-auto mb-2" />
                <div className="text-3xl font-black text-white mb-1">{stat.label}</div>
                <div className="text-sm text-text-muted">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section id="packs" className="py-20 sm:py-32 bg-gradient-to-b from-bg-main to-bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-white mb-4">
              Elige Tu <span className="text-oe-gold">Pack Perfecto</span>
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Desde lo esencial hasta fiestas temáticas completas. Precios claros, sin sorpresas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {fiestaPackages.map((pack, index) => (
              <div
                key={pack.id}
                className={`relative p-8 rounded-3xl transition-all ${
                  pack.highlight
                    ? 'bg-gradient-to-br from-oe-gold/10 to-oe-gold/5 border-2 border-oe-gold ring-4 ring-oe-gold/20 scale-105'
                    : pack.popular
                    ? 'bg-bg-surface border-2 border-oe-gold/50'
                    : 'bg-bg-surface border border-border hover:border-oe-gold/50'
                }`}
              >
                {pack.badge && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-oe-gold text-black text-xs font-bold">
                    {pack.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2">{pack.name}</h3>
                  <p className="text-text-muted mb-4">{pack.tagline}</p>
                  {pack.emotion && (
                    <p className="text-sm text-text-muted/80 italic leading-relaxed">
                      "{pack.emotion}"
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <div className="text-5xl font-black text-oe-gold mb-1">{pack.price}</div>
                  {pack.duration && (
                    <div className="text-text-muted text-sm">{pack.duration}</div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-text-muted">
                      <Check className="w-5 h-5 text-oe-gold mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {pack.ideal && (
                  <div className="mb-4 p-3 rounded-lg bg-bg-main/50">
                    <div className="text-xs text-oe-gold font-bold mb-1">IDEAL PARA:</div>
                    <div className="text-sm text-white">{pack.ideal}</div>
                  </div>
                )}

                {pack.bestFor && (
                  <div className="mb-6 text-sm text-text-muted">
                    <Users className="w-4 h-4 inline mr-1" />
                    {pack.bestFor}
                  </div>
                )}

                <a
                  href={`${WA_LINK}&text=${encodeURIComponent(
                    `Hola! Quiero info sobre el ${pack.name} (${pack.price})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-xl font-bold transition-all inline-block text-center ${
                    pack.highlight
                      ? 'bg-oe-gold text-black hover:bg-oe-gold-light shadow-gold'
                      : 'bg-bg-main text-white border border-border hover:border-oe-gold hover:bg-bg-elevated'
                  }`}
                  onClick={() =>
                    track('CTA_WhatsApp_Pack_Fiestas', { pack: pack.id, price: pack.priceValue })
                  }
                >
                  {pack.cta || 'Reservar Pack'}
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/configurador"
              className="text-oe-gold hover:underline font-bold inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              ¿Quieres personalizar? Usa nuestro configurador →
            </a>
          </div>
        </div>
      </section>

      {/* POR QUÉ ÒRBITA */}
      <section className="py-20 sm:py-32 bg-bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-h2 text-center text-white mb-16">
            ¿Por Qué <span className="text-oe-gold">Òrbita</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Music,
                title: 'DJ que Lee la Pista',
                text: 'No ponemos playlists estáticas. Si un tema no funciona, cambiamos. Si la gente está arriba, mantenemos el nivel. Pista llena varias horas, no gente sentada al cabo de una.',
              },
              {
                icon: Zap,
                title: 'Sonido y Luz en Condiciones',
                text: '4.000W reales de potencia, no altavoces chinos. Iluminación LED coordinada. Máquina de humo profesional. El setup que hace que tu fiesta parezca una fiesta, no un cumple de 12 años.',
              },
              {
                icon: Sparkles,
                title: 'Fiestas Temáticas',
                text: 'Halloween, años 80, Harry Potter, tropical... Lo que quieras. Adaptamos música, luces y efectos al concepto. Para cuando quieres algo con más intención que "poner música y ya está".',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-oe-gold/10 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-oe-gold" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-h2 text-center text-white mb-16">
            Lo Que Dicen <span className="text-oe-gold">Nuestros Clientes</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Laura M.',
                event: 'Cumpleaños 30',
                rating: 5,
                text: 'La mejor fiesta que he tenido. El DJ supo leer perfectamente el ambiente y la pista estuvo llena hasta el final. Volveré a contrataros seguro.',
              },
              {
                name: 'Carlos R.',
                event: 'Despedida de soltero',
                rating: 5,
                text: 'Pack Fiesta Plus. Brutal. Buena música, buen sonido, buen rollo. Los chicos quedaron flipados con la luz y los efectos.',
              },
              {
                name: 'Ana & Pedro',
                event: 'Fiesta Halloween',
                rating: 5,
                text: 'Fiesta temática de Halloween. Brutal la ambientación con las luces y la música. Nuestros amigos aún hablan de la fiesta. Totalmente recomendable.',
              },
            ].map((review, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-bg-surface border border-border hover:border-oe-gold/50 transition-all"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-oe-gold text-oe-gold" />
                  ))}
                </div>
                <p className="text-text-muted mb-4 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="font-bold text-white">{review.name}</div>
                  <div className="text-text-muted">· {review.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-main to-bg-surface">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Flame className="w-16 h-16 text-oe-gold mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
            ¿Listo Para Tu Fiesta Épica?
          </h2>
          <p className="text-xl text-text-muted mb-10">
            Dinos qué quieres y te montamos la fiesta que tus amigos recordarán.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center justify-center gap-3"
            onClick={() => track('CTA_WhatsApp_Fiestas_Final')}
          >
            <MessageCircle className="w-6 h-6" />
            Hablar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

