// app/servicios/alquiler/ClientShell.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Mic2,
  Lightbulb,
  Headphones,
  Star,
  Check,
  MessageCircle,
  Package,
  Shield,
  Truck,
  Clock,
  ArrowRight,
  Zap,
  Users,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { getPacksByService } from '@/data/packs-config';  // ← ESENCIAL: DATA-DRIVEN

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

const WA_LINK = `https://wa.me/34699121023?text=${encodeURIComponent(
  'Hola, quiero alquilar equipo audiovisual profesional'
)}`;

// 🔥 PACKS DESDE packs-config.ts – NO HARDCODE
const rentalPackages = getPacksByService('alquiler');

const whyRentFromUs = [
  {
    icon: Shield,
    title: 'Equipamiento Profesional',
    description: 'EV, Pioneer, Chauvet. Mismo equipo que usamos en nuestros eventos. Revisado antes de cada alquiler.',
  },
  {
    icon: Truck,
    title: 'Entrega Incluida',
    description: 'Llevamos y recogemos el equipo. Montaje y prueba de sonido sin coste adicional.',
  },
  {
    icon: Clock,
    title: 'Disponibilidad 24h',
    description: 'Alquiler 24 horas. Recoge viernes, devuelve sábado = 1 día. Técnico disponible por teléfono.',
  },
  {
    icon: Zap,
    title: 'Backup Garantizado',
    description: 'Si hay cualquier problema técnico, equipo de backup en menos de 2 h (área Barcelona).',
  },
];

const useCases = [
  {
    title: 'DJ Freelance',
    description: 'Alquila Pioneer profesional para tus eventos sin inversión inicial',
    pack: 'Pack DJ Pioneer',
    icon: Headphones,
  },
  {
    title: 'Empresa / Evento Corporativo',
    description: 'Sonido para presentación, conferencia o team building',
    pack: 'Pack Sonido Pro',
    icon: Building2,
  },
  {
    title: 'Organizador de Eventos',
    description: 'Pack completo con técnico para eventos sin preocupaciones',
    pack: 'Pack Completo',
    icon: Users,
  },
  {
    title: 'Ceremonia / Boda',
    description: 'Sonido cristalino para votos y música de ceremonia',
    pack: 'Pack Voz',
    icon: Mic2,
  },
];

export default function ClientShell() {
  const [filter, setFilter] = useState<'all' | 'sonido' | 'iluminacion' | 'dj'>('all');

  useEffect(() => {
    track('View_Alquiler_Equipo');
  }, []);

  const filteredPacks = filter === 'all' ? rentalPackages : rentalPackages.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* HERO */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-surface to-bg-main" />

        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-oe-gold/20 border border-oe-gold px-4 py-2 mb-6">
              <Package className="w-4 h-4 text-oe-gold" />
              <span className="text-sm font-medium text-oe-gold">Equipamiento profesional desde 150€/día</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-display font-black text-white mb-6 leading-[1.1]">
              Alquiler de Equipo
              <br />
              <span className="gradient-text breathe">Audiovisual Profesional</span>
            </h1>

            <p className="text-xl sm:text-2xl text-text-muted max-w-3xl mx-auto mb-8">
              EV ETX-15P 2000W, 4 B-150 LED, Pioneer DJM-900 + CDJ-3000.
              <br />
              <span className="text-oe-gold font-bold">Con o sin técnico. Entrega incluida.</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-oe-gold" />
                <span className="text-white/80">Entrega y recogida incluidas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-oe-gold" />
                <span className="text-white/80">Equipamiento revisado prealquiler</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-oe-gold" />
                <span className="text-white/80">Soporte técnico 24 h</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 mb-10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-oe-gold text-oe-gold" />
              ))}
              <span className="text-white/80 ml-2">4.9/5 · 89 alquileres</span>
            </div>
          </div>

          {/* FILTROS */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'all', label: 'Todo', icon: Package },
              { id: 'sonido', label: 'Sonido', icon: Mic2 },
              { id: 'iluminacion', label: 'Luces LED', icon: Lightbulb },
              { id: 'dj', label: 'DJ Pioneer', icon: Headphones },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setFilter(f.id as any);
                    track('Filter_Alquiler', { filter: f.id });
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all font-medium ${
                    filter === f.id
                      ? 'bg-oe-gold text-black border-oe-gold'
                      : 'bg-bg-surface border-border hover:border-oe-gold/50 text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section className="py-20 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-white mb-4">
              Packs de Alquiler
              <br />
              <span className="text-oe-gold">(Elige Tu Equipamiento)</span>
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Todo el equipamiento incluye entrega/recogida en Barcelona. Técnico dedicado opcional (+150€).
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPacks.map((pack) => (
              <div
                key={pack.id}
                id={pack.id}
                className={`oe-card p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 ${
                  pack.popular ? 'border-2 border-oe-gold ring-2 ring-oe-gold/20 ring-offset-2 ring-offset-bg-surface' : 'hover:border-oe-gold/40'
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-oe-gold to-[#b9994b] text-black px-4 py-1.5 rounded-full text-xs font-bold">
                      ⭐ MÁS ALQUILADO
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-center gap-1 text-oe-gold mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < Math.floor(pack.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                  <span className="text-xs text-white/60 ml-1">({pack.rating})</span>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-center text-white">{pack.name}</h3>
                <p className="text-sm text-text-muted mb-4 text-center min-h-[2.5rem]">{pack.bestFor}</p>

                <div className="text-center mb-4">
                  <div className="text-4xl font-black text-oe-gold mb-1">
                    {pack.price}€<span className="text-lg text-white/70">/día</span>
                  </div>
                  <p className="text-xs text-text-muted">{pack.specs}</p>
                </div>

                <ul className="space-y-2.5 mb-6 text-sm text-white/80">
                  {pack.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-oe-gold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`${WA_LINK}%20-%20${encodeURIComponent(pack.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 w-full rounded-xl px-6 py-3.5 font-bold transition-all bg-bg-surface border border-oe-gold/30 text-white hover:border-oe-gold hover:bg-oe-gold/10"
                  onClick={() => track('Click_Alquiler_Pack', { pack: pack.name, price: pack.price })}
                >
                  Alquilar ahora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ ALQUILAR CON NOSOTROS */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-h2 text-center text-white mb-4">
            ¿Por Qué Alquilar
            <br />
            <span className="text-oe-gold">Con Òrbita?</span>
          </h2>

          <p className="text-xl text-text-muted text-center max-w-3xl mx-auto mb-16">
            No solo alquilamos equipamiento. Te damos tranquilidad, soporte y la garantía de que tu evento
            sonará perfecto.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyRentFromUs.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div
                  key={idx}
                  className="oe-card p-6 rounded-2xl text-center hover:border-oe-gold/50 transition-all"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-oe-gold/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-oe-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-sm text-text-muted">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CASOS DE USO */}
      <section className="py-20 bg-bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-h2 text-center text-white mb-4">
            ¿Para Qué Tipo de Evento
            <br />
            <span className="text-oe-gold">Necesitas Equipo?</span>
          </h2>

          <p className="text-xl text-text-muted text-center max-w-3xl mx-auto mb-16">
            Te ayudamos a elegir el pack perfecto según tu tipo de evento.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon;
              return (
                <div key={idx} className="oe-card p-8 rounded-3xl hover:border-oe-gold/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-oe-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-oe-gold/20 transition-colors">
                      <Icon className="w-6 h-6 text-oe-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                      <p className="text-text-muted mb-4">{useCase.description}</p>
                      <div className="inline-flex items-center gap-2 text-sm text-oe-gold font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        Recomendamos: {useCase.pack}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-muted mb-4">¿No sabes qué pack necesitas?</p>
            <a
              href={`${WA_LINK}%20-%20Ayuda%20eligiendo%20pack%20alquiler`}
              className="inline-flex items-center gap-2 text-oe-gold hover:underline"
              onClick={() => track('CTA_Ayuda_Alquiler')}
            >
              <MessageCircle className="w-5 h-5" />
              Hablar con un asesor técnico (gratis)
            </a>
          </div>
        </div>
      </section>

      {/* CONDICIONES ALQUILER */}
      <section className="py-20 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-4xl px-4">
          <div className="oe-card p-10 rounded-3xl">
            <h2 className="text-3xl font-display font-black text-white mb-8 text-center">
              Condiciones de Alquiler
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">Período de alquiler</p>
                    <p className="text-text-muted text-sm">24 h estándar. Fin de semana (3 días) +50%</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">Entrega</p>
                    <p className="text-text-muted text-sm">Barcelona y área metropolitana incluidas. Catalunya +50€</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">Fianza</p>
                    <p className="text-text-muted text-sm">100-300€ según pack. Reembolsable. Empresas sin fianza</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">Técnico</p>
                    <p className="text-text-muted text-sm">Opcional +150€. Montaje + pruebas + soporte in situ</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">Backup</p>
                    <p className="text-text-muted text-sm">Equipo de repuesto disponible en menos de 2 h (área Barcelona)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">Cancelación</p>
                    <p className="text-text-muted text-sm">Hasta 48 h antes: reembolso 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-32 bg-bg-main">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl sm:text-6xl font-display font-black text-white mb-6 leading-tight">
            ¿Listo para alquilar
            <br />
            <span className="text-oe-gold">equipo profesional?</span>
          </h2>

        <p className="text-xl text-text-muted mb-10 leading-relaxed">
            Consulta disponibilidad y reserva tu equipamiento.
            <br />
            <span className="text-oe-gold font-bold">Respondemos en menos de 2 horas.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center justify-center gap-3"
              onClick={() => track('CTA_Final_Alquiler')}
            >
              <MessageCircle className="w-7 h-7" />
              Consultar disponibilidad
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>

          <p className="text-sm text-text-muted mt-8">
            ⚡ Respuesta en menos de 2 h · 📦 Entrega incluida · 🛡️ Soporte 24 h
          </p>
        </div>
      </section>

      {/* CTA STICKY MOBILE */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="oe-btn-gold w-full flex items-center justify-center gap-2 shadow-2xl"
          onClick={() => track('Sticky_WA_Alquiler')}
        >
          <MessageCircle className="w-5 h-5" />
          Consultar alquiler
        </a>
      </div>
    </div>
  );
}