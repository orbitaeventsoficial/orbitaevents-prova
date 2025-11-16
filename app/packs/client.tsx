// app/packs/client.tsx
'use client';

import { useEffect } from 'react';
import {
  Sparkles,
  Layers,
  SlidersHorizontal,
  ArrowRight,
  Check,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import {
  getPacksByService,
  getMinPriceByService,
  type ServiceSlug,
  type PackDefinition,
  type PackId,
} from '@/data/packs-config';

// Analytics
let track: (event: string, data?: any) => void = () => {};
let analytics: typeof import('@/lib/analytics') | null = null;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
  import('@/lib/analytics').then((mod) => {
    analytics = mod;
  });
}

const WA_BASE = 'https://wa.me/34699121023';

function buildWhatsAppUrl(message: string) {
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}

type ServiceInfo = {
  id: ServiceSlug;
  title: string;
  description: string;
  href: string;
};

const SERVICES: ServiceInfo[] = [
  {
    id: 'bodas',
    title: 'Bodas',
    description: 'Desde solo el baile hasta día completo: ceremonia, cóctel, banquete y fiesta.',
    href: '/servicios/bodas',
  },
  {
    id: 'fiestas',
    title: 'Fiestas Privadas',
    description: 'Cumpleaños, despedidas y temáticas con DJ, sonido y FX.',
    href: '/servicios/fiestas',
  },
  {
    id: 'discomovil',
    title: 'Discomóvil',
    description: 'Formato “disco” para fiestas de pueblo, salas y eventos.',
    href: '/servicios/discomobil',
  },
  {
    id: 'empresas',
    title: 'Eventos de Empresa',
    description: 'Presentaciones, corporativos y galas que necesitan que todo vaya bien.',
    href: '/servicios/empresas',
  },
  {
    id: 'alquiler',
    title: 'Alquiler Técnico',
    description: 'Sonido, luces y mesas DJ para quien ya tiene el evento montado pero le falta equipo.',
    href: '/servicios/alquiler',
  },
];

function cleanPrice(price: string) {
  return price;
}

function ServiceSection({
  service,
  packs,
}: {
  service: ServiceInfo;
  packs: PackDefinition[];
}) {
  if (!packs.length) return null;

  const minPrice = packs.length > 1 ? getMinPriceByService(service.id) : packs[0].priceValue;

  return (
    <section className="py-12 sm:py-16 border-t border-border">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-2">
              {service.title}
            </h2>
            <p className="text-text-muted max-w-2xl">{service.description}</p>
            <p className="text-sm text-oe-gold mt-2">
              Packs desde <span className="font-bold">{minPrice}€</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={service.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-text-muted hover:border-oe-gold hover:text-white transition-colors"
              onClick={() => track('Packs_Ver_Servicio', { service: service.id })}
            >
              Ver página de servicio
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={buildWhatsAppUrl(
                `Hola, tengo un evento de tipo "${service.title}" y quiero que me ayudéis a elegir pack.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-oe-gold text-black text-sm font-semibold hover:bg-oe-gold-light transition-colors"
              onClick={() => track('Packs_WA_Servicio', { service: service.id })}
            >
              <MessageCircle className="w-4 h-4" />
              Pedir ayuda rápida
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <article
              key={pack.id}
              id={`${service.id}-${pack.slug}`}
              className={`relative rounded-3xl p-6 bg-bg-surface border ${
                pack.highlight
                  ? 'border-oe-gold ring-2 ring-oe-gold/30'
                  : pack.popular
                  ? 'border-oe-gold/60'
                  : 'border-border hover:border-oe-gold/50'
              } transition-all`}
            >
              {pack.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-oe-gold text-black text-xs font-bold">
                  {pack.badge}
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">{pack.name}</h3>
                <p className="text-sm text-text-muted">{pack.tagline}</p>
                {pack.emotion && (
                  <p className="text-xs text-text-muted/80 italic mt-2">"{pack.emotion}"</p>
                )}
              </div>

              <div className="mb-4">
                <div className="text-3xl font-black text-oe-gold">
                  {cleanPrice(pack.price)}
                </div>
                {pack.duration && (
                  <div className="text-xs text-text-muted mt-1">{pack.duration}</div>
                )}
                {pack.ideal && (
                  <div className="mt-2 text-[11px] text-text-muted">
                    👥 Ideal: <span className="text-white">{pack.ideal}</span>
                  </div>
                )}
              </div>

              <ul className="space-y-2 mb-5 text-sm text-text-muted">
                {pack.features.slice(0, 6).map((feature, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-oe-gold mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {pack.features.length > 6 && (
                  <li className="text-xs text-text-muted/70">
                    +{pack.features.length - 6} puntos más pensados para este tipo de evento.
                  </li>
                )}
              </ul>

              <div className="flex flex-col gap-2">
                <a
                  href={`/servicios/${pack.service}#${pack.slug}`}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-sm font-semibold bg-bg-main text-white border border-border hover:border-oe-gold hover:bg-bg-main/80 transition-all"
                  onClick={() => track('Packs_Ver_Detalle', { pack: pack.id })}
                >
                  Ver detalle del pack
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={buildWhatsAppUrl(
                    `Hola, me interesa el pack "${pack.name}" (${pack.price}). ¿Lo veis encajado para mi evento?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-xs font-semibold text-oe-gold hover:text-oe-gold-light"
                  onClick={() => {
                    track('Packs_WA_Pack', { pack: pack.id });
                    if (analytics) {
                      analytics.trackPackSelection({
                        packId: pack.id as PackId,
                        packType: pack.service,
                      });
                    }
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Consultar este pack por WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PacksClient() {
  useEffect(() => {
    track('View_Packs_Resumen');
  }, []);

  return (
    <div className="bg-bg-main text-white">
      {/* HERO */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-oe-gold/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-oe-gold/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-oe-gold/40 bg-oe-gold/10 text-oe-gold text-xs font-semibold mb-6">
            <Layers className="w-4 h-4" />
            Packs depurados: capacidad + horas + potencia
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black mb-4">
            Todos tus <span className="text-oe-gold">packs</span>,
            <br />
            en un solo sitio
          </h1>

          <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto mb-8">
            Bodas, fiestas privadas, discomóvil, empresa y alquiler técnico.
            <br />
            Mismos packs, mismos precios, sin contradicciones entre páginas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/configurador"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-oe-gold text-black font-semibold text-sm hover:bg-oe-gold-light transition-colors"
              onClick={() => track('Packs_CTA_Configurador')}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Probar el configurador
            </a>
            <a
              href={buildWhatsAppUrl(
                'Hola, quiero orientarme rápido: tengo un evento y quiero que me digáis qué pack tiene más sentido.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-border text-sm text-text-muted hover:border-oe-gold hover:text-white transition-colors"
              onClick={() => track('Packs_CTA_WA_Hero')}
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </a>
          </div>

          <p className="mt-4 text-xs text-text-muted flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-oe-gold" />
            Todas las páginas de servicios leen de estos mismos packs. Si se cambia un precio, se
            actualiza en toda la web.
          </p>
        </div>
      </section>

      {/* SECCIONES POR SERVICIO */}
      {SERVICES.map((service) => {
        const packs = getPacksByService(service.id);
        return <ServiceSection key={service.id} service={service} packs={packs} />;
      })}

      {/* Capa tranquilizadora final */}
      <section className="py-16 bg-gradient-to-b from-bg-main to-bg-surface border-t border-border">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Calendar className="w-10 h-10 text-oe-gold mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-display font-black mb-3">
            Packs claros. Luego ya afinamos juntos.
          </h2>
          <p className="text-sm sm:text-base text-text-muted mb-6">
            El objetivo no es que te lo comas todo tú solo, sino que tengas una base clara:
            <br />
            qué incluye cada pack, cuánto cuesta y para qué tipo de evento está pensado.
          </p>
          <a
            href={buildWhatsAppUrl(
              'He mirado la página de packs pero quiero que me ayudéis a aterrizarlo en mi evento concreto.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-oe-gold text-black text-sm font-semibold hover:bg-oe-gold-light transition-colors"
            onClick={() => track('Packs_CTA_WA_Final')}
          >
            <MessageCircle className="w-4 h-4" />
            Revisar mi evento por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
