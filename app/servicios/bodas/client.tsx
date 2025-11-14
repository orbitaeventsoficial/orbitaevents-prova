// app/servicios/bodas/client.tsx
'use client';

import { Heart, Music, Sparkles, Check, Star, MessageCircle, Shield, Users } from 'lucide-react';
import { useEffect } from 'react';
import { getPacksByService } from '@/data/packs-config';

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

// 🔗 BASE WHATSAPP (SIN TEXTOS METIDOS A LO BRUTO)
const WA_BASE = 'https://wa.me/34699121023';

const buildWhatsAppUrl = (message: string) =>
  `${WA_BASE}?text=${encodeURIComponent(message)}`;

// 🔥 PACKS DESDE CONFIGURACIÓN CENTRALIZADA
const weddingPackages = getPacksByService('bodas');

const cleanName = (name: string) => name.replace(/[^\wÀ-ÿ ]/g, '').trim();

export default function BodasClient() {
  useEffect(() => {
    track('View_Bodas');
  }, []);

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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-bg-main z-10" />
          <img
            src="/img/portfolio/bodas-cover.webp"
            alt="DJ Bodas Barcelona Òrbita Events"
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>

        <div className="relative z-20 mx-auto max-w-6xl px-4 py-20 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-oe-gold/10 border border-oe-gold/30 text-oe-gold text-sm font-bold mb-6">
            <Heart className="w-4 h-4 inline mr-2" />
            DJ + SONIDO + LUCES + EFECTOS
          </div>

          <h1 className="text-5xl sm:text-7xl font-display font-black text-white mb-6 leading-[1.05]">
            El Día Que
            <br />
            <span className="gradient-text breathe">Todos Recordarán</span>
          </h1>

          <p className="text-xl sm:text-2xl text-text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            DJ profesional, sonido EV 4.000W, iluminación y efectos coordinados.
            <br />
            Desde solo el baile hasta ceremonia + banquete + fiesta.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={buildWhatsAppUrl('Hola! Quiero info para mi boda')}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold text-lg px-8 py-5 inline-flex items-center justify-center gap-3"
              onClick={() => track('CTA_WhatsApp_Bodas_Hero')}
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

      {/* PROOF */}
      <section className="py-12 bg-bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Heart, label: '87 bodas', sublabel: 'En 2024' },
              { icon: Star, label: '4.9/5', sublabel: 'Valoración' },
              { icon: Shield, label: '100%', sublabel: 'Sin fallos' },
              { icon: Music, label: '+4h media', sublabel: 'Pista llena' },
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
              Packs <span className="text-oe-gold">Para Tu Boda</span>
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Desde solo el baile hasta producción completa del día. Precios claros.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {weddingPackages.map((pack) => (
              <div
                key={pack.id}
                id={pack.slug}
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
                  <div className="mb-6 p-3 rounded-lg bg-bg-main/50">
                    <div className="text-xs text-oe-gold font-bold mb-1">IDEAL PARA:</div>
                    <div className="text-sm text-white">{pack.ideal}</div>
                  </div>
                )}

                <a
                  href={buildWhatsAppUrl(
                    `Hola! Quiero info sobre el ${cleanName(pack.name)} (${pack.price})`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-xl font-bold transition-all inline-block text-center ${
                    pack.highlight
                      ? 'bg-oe-gold text-black hover:bg-oe-gold-light shadow-gold'
                      : 'bg-bg-main text-white border border-border hover:border-oe-gold hover:bg-bg-elevated'
                  }`}
                  onClick={() =>
                    track('CTA_WhatsApp_Pack_Bodas', { pack: pack.id, price: pack.priceValue })
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
              ¿Necesitas algo específico? Usa el configurador →
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Heart className="w-16 h-16 text-oe-gold mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-6">
            Tu Boda Merece Lo Mejor
          </h2>
          <p className="text-xl text-text-muted mb-10">
            Hablemos de tu día. Sin compromiso, sin prisa.
          </p>
          <a
            href={buildWhatsAppUrl('Hola! Queremos hablar de la música de nuestra boda')}
            target="_blank"
            rel="noopener noreferrer"
            className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center justify-center gap-3"
            onClick={() => track('CTA_WhatsApp_Bodas_Final')}
          >
            <MessageCircle className="w-6 h-6" />
            Hablar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

