// app/servicios/empresas/client.tsx
'use client';

import {
  Briefcase,
  Building2,
  Check,
  Users,
  Mic,
  Sparkles,
  Star,
  Calendar,
  MessageCircle,
  ArrowRight,
  Target,
  Coffee,
  HeartHandshake,
} from 'lucide-react';
import { useEffect } from 'react';
import { getPacksByService } from '@/lib/packs-config';

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

const WA_BASE = 'https://wa.me/34699121023';
const buildWhatsAppUrl = (message: string) =>
  `${WA_BASE}?text=${encodeURIComponent(message)}`;

// 🔥 PACKS DESDE MANOLO (FUENTE ÚNICA)
const corporatePackages = getPacksByService('empresas');

export default function EmpresasClient() {
  useEffect(() => {
    track('View_Empresas');
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-bg-main z-10" />
          <img
            src="/img/portfolio/empresas-cover.webp"
            alt="Eventos corporativos Òrbita Events"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 mx-auto max-w-6xl px-4 py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-oe-gold/10 border border-oe-gold/40 px-4 py-2 mb-6 backdrop-blur-sm">
            <Briefcase className="w-4 h-4 text-oe-gold" />
            <span className="text-xs font-semibold tracking-wide text-oe-gold">
              EVENTOS CORPORATIVOS · CENAS DE EMPRESA · TEAM BUILDING
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-4 leading-tight">
            El Evento Que Tu Equipo
            <br />
            <span className="text-oe-gold">Recordará de Verdad</span>
          </h1>

          <p className="text-lg sm:text-xl text-text-muted max-w-3xl mb-8 leading-relaxed">
            Cenas de empresa, convenciones, afterworks y jornadas de equipo con DJ, sonido profesional
            y dinámicas que no dan vergüenza ajena. Tú quedas bien, el equipo se lo pasa bien.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-oe-gold" />
              <span>Startups, pymes y equipos corporativos</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-oe-gold" />
              <span>Eventos de 30 a 300 personas</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-oe-gold" />
              <span>Sonido y micros profesionales</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={buildWhatsAppUrl('Hola, quiero información para un evento corporativo')}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold text-base sm:text-lg px-7 py-4 inline-flex items-center justify-center gap-2"
              onClick={() => track('CTA_WA_Empresas_Hero')}
            >
              <MessageCircle className="w-5 h-5" />
              Hablar por WhatsApp
            </a>
            <a
              href="#packs"
              className="oe-btn-outline text-base sm:text-lg px-7 py-4 inline-flex items-center justify-center gap-2"
            >
              Ver Packs y Opciones
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* PROOF / BENEFICIOS */}
      <section className="py-16 bg-bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <Star className="w-7 h-7 text-oe-gold mx-auto mb-2" />
              <p className="text-2xl font-black text-white mb-1">4.9/5</p>
              <p className="text-xs text-text-muted">Valoración media</p>
            </div>
            <div>
              <Users className="w-7 h-7 text-oe-gold mx-auto mb-2" />
              <p className="text-2xl font-black text-white mb-1">Equipos +30</p>
              <p className="text-xs text-text-muted">Eventos pequeños y medianos</p>
            </div>
            <div>
              <Building2 className="w-7 h-7 text-oe-gold mx-auto mb-2" />
              <p className="text-2xl font-black text-white mb-1">Hoteles · Oficinas</p>
              <p className="text-xs text-text-muted">Nos adaptamos al espacio</p>
            </div>
            <div>
              <Calendar className="w-7 h-7 text-oe-gold mx-auto mb-2" />
              <p className="text-2xl font-black text-white mb-1">Todo el Año</p>
              <p className="text-xs text-text-muted">Cenas, lanzamientos, teambuilding</p>
            </div>
          </div>
        </div>
      </section>

      {/* PACKS CORPORATIVOS */}
      <section id="packs" className="py-20 sm:py-28 bg-gradient-to-b from-bg-main to-bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-14">
            <h2 className="text-h2 text-white mb-3">
              Packs Para <span className="text-oe-gold">Eventos de Empresa</span>
            </h2>
            <p className="text-base sm:text-lg text-text-muted max-w-3xl mx-auto">
              Desde una cena de equipo sencilla hasta una convención con escenario, DJ y producción
              completa. Tú nos cuentas objetivo y gente, nosotros te decimos qué tiene sentido.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {corporatePackages.map((pack) => (
              <div
                key={pack.id}
                id={pack.slug}
                className={`relative rounded-3xl p-8 border transition-all ${
                  pack.highlight
                    ? 'bg-gradient-to-br from-oe-gold/10 to-oe-gold/5 border-oe-gold ring-2 ring-oe-gold/30 scale-[1.02]'
                    : 'bg-bg-surface border-border hover:border-oe-gold/50'
                }`}
              >
                {pack.badge && (
                  <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-oe-gold text-black text-[11px] font-bold shadow-md">
                    {pack.badge}
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-2xl font-display font-black text-white mb-1">{pack.name}</h3>
                  <p className="text-sm text-oe-gold mb-2">{pack.tagline}</p>
                  {pack.emotion && (
                    <p className="text-xs text-text-muted italic leading-relaxed">
                      "{pack.emotion}"
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">{pack.price}</span>
                    {pack.duration && (
                      <span className="text-xs text-text-muted uppercase tracking-wide">
                        · {pack.duration}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                      <Check className="w-4 h-4 text-oe-gold mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {(pack.ideal || pack.bestFor) && (
                  <div className="space-y-2 mb-6">
                    {pack.ideal && (
                      <div className="p-3 rounded-xl bg-bg-main/70 border border-border">
                        <p className="text-[11px] text-oe-gold font-semibold mb-1">IDEAL PARA</p>
                        <p className="text-xs text-white">{pack.ideal}</p>
                      </div>
                    )}
                    {pack.bestFor && (
                      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/40">
                        <p className="text-[11px] text-blue-300 font-semibold mb-1">ESPECIALMENTE ÚTIL EN</p>
                        <p className="text-xs text-text-muted">{pack.bestFor}</p>
                      </div>
                    )}
                  </div>
                )}

                <a
                  href={buildWhatsAppUrl(
                    `Hola, quiero información sobre el ${pack.name} (${pack.price}) para un evento de empresa`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                    pack.highlight
                      ? 'bg-oe-gold text-black hover:bg-oe-gold-light'
                      : 'bg-bg-main text-white border border-border hover:border-oe-gold hover:bg-bg-elevated'
                  }`}
                  onClick={() =>
                    track('CTA_WA_Pack_Empresas', { pack: pack.id, price: pack.priceValue })
                  }
                >
                  {pack.cta || 'Solicitar Propuesta'}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-xs text-text-muted mb-3">
              Si nos cuentas nº de personas, tipo de evento y espacio, te decimos qué pack tiene más
              sentido y qué habría que ajustar.
            </p>
            <a
              href={buildWhatsAppUrl(
                'Hola, necesito ayuda para elegir el pack para un evento corporativo'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-oe-gold hover:underline text-sm font-semibold"
              onClick={() => track('CTA_Ayuda_Packs_Empresas')}
            >
              <MessageCircle className="w-4 h-4" />
              Hablar con un asesor (gratis)
            </a>
          </div>
        </div>
      </section>

      {/* BLOQUE VALOR AÑADIDO */}
      <section className="py-20 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-bg-main border border-border">
              <Target className="w-8 h-8 text-oe-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Objetivo Claro</h3>
              <p className="text-sm text-text-muted">
                Romper el hielo, celebrar resultados, fidelizar equipo o presentar producto. Primero
                entendemos el objetivo, luego diseñamos el evento.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-bg-main border border-border">
              <Coffee className="w-8 h-8 text-oe-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Cero Estrés Técnico</h3>
              <p className="text-sm text-text-muted">
                Sonido, luces, micros, tiempos, coordinación con el espacio… Todo bajo control para que
                tú puedas estar con tu gente, no pendiente de cables.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-bg-main border border-border">
              <HeartHandshake className="w-8 h-8 text-oe-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Ambiente Cuidado</h3>
              <p className="text-sm text-text-muted">
                Música escogida con criterio, volumen adecuado para hablar cuando toca y subir cuando
                toca. Sin momentos incómodos ni silencios raros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-28 bg-bg-main">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">
            ¿Preparamos el Próximo Evento
            <br />
            de Tu Equipo?
          </h2>
          <p className="text-base sm:text-lg text-text-muted mb-8">
            Un mensaje por WhatsApp con fecha aproximada, nº de personas y tipo de evento es suficiente
            para enviarte una propuesta clara.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={buildWhatsAppUrl(
                'Hola, quiero una propuesta para un evento corporativo (fecha, nº personas, tipo de evento...)'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold px-8 py-4 inline-flex items-center justify-center gap-2 text-base sm:text-lg"
              onClick={() => track('CTA_WA_Empresas_Final')}
            >
              <MessageCircle className="w-5 h-5" />
              Pedir Propuesta por WhatsApp
            </a>
          </div>

          <p className="text-xs text-text-muted mt-4">
            Respondemos normalmente en menos de 24h laborables. Sin compromiso.
          </p>
        </div>
      </section>
    </div>
  );
}
