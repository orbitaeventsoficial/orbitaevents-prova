'use client';
// app/configurador/client.tsx
import { ALL_SERVICES, EXTRAS, OFFERS, getPacksByService, type ServiceSlug } from '@/data/packs-config';
import { useState, useEffect } from 'react';
import {
  Check,
  ChevronRight,
  Calendar,
  Users,
  MessageCircle,
  Sparkles,
  Tag,
  Clock,
  Zap,
  AlertCircle,
  TrendingDown,
  ArrowLeft,
} from 'lucide-react';

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

type EventType = 'bodas' | 'discomovil' | 'fiestas' | 'alquiler' | 'empresas';

interface ConfigState {
  eventType: EventType | null;
  selectedPack: any | null;
  date: string;
  guests: number;
  extras: string[];
  appliedOffer: string | null;
}

export default function ConfiguradorClient() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ConfigState>({
    eventType: null,
    selectedPack: null,
    date: '',
    guests: 50,
    extras: [],
    appliedOffer: null,
  });

  useEffect(() => {
    track('View_Configurador');
  }, []);

  // 💰 CÁLCULO DE PRECIO CON DESCUENTOS
  const calculatePricing = () => {
    let basePrice = config.selectedPack?.priceValue || 0;
    let extrasPrice = 0;
    let discount = 0;
    let discountReason = '';

    // Calcular extras
    config.extras.forEach((extraId) => {
      const extra = EXTRAS.find((e) => e.id === extraId);
      if (extra) extrasPrice += extra.price;
    });

    const subtotal = basePrice + extrasPrice;

    // APLICAR DESCUENTOS (prioridad: mayor descuento gana)
    const applicableOffers = [];

    // 1. Early Bird (reserva inmediata)
    if (config.appliedOffer === 'early-bird' && subtotal >= (OFFERS.earlyBird.minAmount || 0)) {
      applicableOffers.push({
        discount: Math.round((subtotal * (OFFERS.earlyBird.discount || 0)) / 100),
        reason: OFFERS.earlyBird.name,
        priority: OFFERS.earlyBird.priority || 0,
      });
    }

    // 2. Combo de extras (3 o más)
    if (config.extras.length >= (OFFERS.combo.minExtras || 3)) {
      applicableOffers.push({
        discount: Math.round((extrasPrice * (OFFERS.combo.discount || 0)) / 100),
        reason: OFFERS.combo.name,
        priority: OFFERS.combo.priority || 0,
      });
    }

    // 3. Temporada baja
    if (config.date) {
      const eventMonth = new Date(config.date).getMonth() + 1;
      if (OFFERS.seasonal.months?.includes(eventMonth)) {
        applicableOffers.push({
          discount: Math.round((subtotal * (OFFERS.seasonal.discount || 0)) / 100),
          reason: OFFERS.seasonal.name,
          priority: OFFERS.seasonal.priority || 0,
        });
      }
    }

    // Seleccionar el mejor descuento
    if (applicableOffers.length > 0) {
      const bestOffer = applicableOffers.sort((a, b) => b.discount - a.discount)[0];
      discount = bestOffer.discount;
      discountReason = bestOffer.reason;
    }

    const total = subtotal - discount;

    return { basePrice, extrasPrice, subtotal, discount, discountReason, total };
  };

  const getWhatsAppLink = () => {
    const pricing = calculatePricing();
    const serviceName = ALL_SERVICES.find((s: any) => s === config.eventType);
    const extrasNames = config.extras
      .map((id) => EXTRAS.find((e) => e.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const message = `¡Hola! He configurado mi evento en el configurador web:

📅 Tipo: ${serviceName || 'N/A'}
💎 Pack: ${config.selectedPack?.name || 'N/A'} (${pricing.basePrice}€)
👥 Invitados: ${config.guests}
📆 Fecha: ${config.date || 'Por definir'}
✨ Extras: ${extrasNames || 'Ninguno'} (${pricing.extrasPrice}€)

${pricing.discount > 0 ? `🎁 Descuento ${pricing.discountReason}: -${pricing.discount}€\n` : ''}
💰 TOTAL: ${pricing.total}€

¿Podemos confirmar disponibilidad y cerrar?`;

    return `https://wa.me/34699121023?text=${encodeURIComponent(message)}`;
  };

  // PASO 1: Tipo de Evento
  const renderStep1 = () => {
    const services = [
      { slug: 'bodas', name: 'Bodas', icon: '💒' },
      { slug: 'fiestas', name: 'Fiestas Privadas', icon: '🎉' },
      { slug: 'discomovil', name: 'Discomóvil', icon: '🎵' },
      { slug: 'empresas', name: 'Eventos Corporativos', icon: '💼' },
    ];

    return (
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-4">
            ¿Qué tipo de evento es?
          </h2>
          <p className="text-xl text-text-muted">Elige para ver los packs disponibles</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const packs = getPacksByService(service.slug as ServiceSlug);
            const minPrice = packs.length > 0 ? Math.min(...packs.map((p) => p.priceValue)) : 0;

            return (
              <button
                key={service.slug}
                onClick={() => {
                  setConfig({ ...config, eventType: service.slug as EventType });
                  setStep(2);
                  track('Configurador_Step1_EventType', { type: service.slug });
                }}
                className="p-8 rounded-2xl bg-bg-surface border-2 border-border hover:border-oe-gold transition-all text-left group"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-oe-gold transition-colors">
                  {service.name}
                </h3>
                <p className="text-text-muted text-sm mb-4">Desde {minPrice}€</p>
                <div className="flex items-center text-oe-gold text-sm font-bold">
                  Ver packs <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // PASO 2: Selección de pack
  const renderStep2 = () => {
    const packs = getPacksByService(config.eventType as ServiceSlug);
    if (!packs || packs.length === 0) return null;

    const serviceName = {
      bodas: 'Bodas',
      fiestas: 'Fiestas Privadas',
      discomovil: 'Discomóvil',
      empresas: 'Eventos Corporativos',
      alquiler: 'Alquiler',
    }[config.eventType || 'bodas'];

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <button
            onClick={() => setStep(1)}
            className="text-oe-gold hover:underline mb-4 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Cambiar tipo de evento
          </button>
          <h2 className="text-4xl font-display font-black text-white mb-4">{serviceName}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`p-8 rounded-2xl border-2 transition-all ${
                config.selectedPack?.id === pack.id
                  ? 'border-oe-gold bg-oe-gold/5'
                  : 'border-border bg-bg-surface hover:border-oe-gold/50'
              } ${pack.highlight ? 'ring-2 ring-oe-gold/50' : ''}`}
            >
              {pack.popular && (
                <div className="inline-block px-3 py-1 rounded-full bg-oe-gold text-black text-xs font-bold mb-4">
                  MÁS VENDIDO
                </div>
              )}
              {pack.highlight && (
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-oe-gold to-oe-gold text-black text-xs font-bold mb-4">
                  ⭐ PREMIUM
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{pack.name}</h3>
              <p className="text-text-muted text-sm mb-4">{pack.tagline}</p>

              <div className="mb-6">
                <div className="text-4xl font-black text-oe-gold mb-1">{pack.price}</div>
                <div className="text-text-muted text-sm">{pack.duration}</div>
              </div>

              <ul className="space-y-2 mb-6">
                {pack.features.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-text-muted">
                    <Check className="w-4 h-4 text-oe-gold mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {pack.features.length > 4 && (
                  <li className="text-xs text-oe-gold">+ {pack.features.length - 4} más...</li>
                )}
              </ul>

              <button
                onClick={() => {
                  setConfig({ ...config, selectedPack: pack });
                  setStep(3);
                  track('Configurador_Step2_PackSelected', { pack: pack.id, price: pack.priceValue });
                }}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  config.selectedPack?.id === pack.id
                    ? 'bg-oe-gold text-black'
                    : 'bg-bg-main text-white hover:bg-oe-gold hover:text-black'
                }`}
              >
                {config.selectedPack?.id === pack.id ? 'Seleccionado ✓' : 'Seleccionar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // PASO 3: Detalles y Extras
  const renderStep3 = () => {
    const pricing = calculatePricing();

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <button
            onClick={() => setStep(2)}
            className="text-oe-gold hover:underline mb-4 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Cambiar pack
          </button>
          <h2 className="text-4xl font-display font-black text-white mb-4">Detalles de tu evento</h2>
        </div>

        {/* Fecha y Asistentes */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-bg-surface border border-border">
            <label className="block text-white font-bold mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-oe-gold" />
              Fecha aproximada
            </label>
            <input
              type="date"
              value={config.date}
              onChange={(e) => setConfig({ ...config, date: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-bg-main text-white border border-border focus:border-oe-gold outline-none"
              min={new Date().toISOString().split('T')[0]}
            />
            {config.date && (
              <p className="mt-2 text-xs text-text-muted flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Verificaremos disponibilidad real al contactar
              </p>
            )}
          </div>

          <div className="p-6 rounded-xl bg-bg-surface border border-border">
            <label className="block text-white font-bold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-oe-gold" />
              Número de invitados
            </label>
            <input
              type="number"
              value={config.guests}
              onChange={(e) => setConfig({ ...config, guests: parseInt(e.target.value) || 0 })}
              min="10"
              max="1000"
              className="w-full px-4 py-3 rounded-lg bg-bg-main text-white border border-border focus:border-oe-gold outline-none"
            />
          </div>
        </div>

        {/* Extras */}
        <div className="p-8 rounded-xl bg-bg-surface border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-oe-gold" />
              Mejora tu experiencia
            </h3>
            {config.extras.length >= (OFFERS.combo.minExtras || 3) && (
              <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">
                🎁 15% OFF en extras
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {EXTRAS.map((extra) => (
              <label
                key={extra.id}
                className={`relative flex items-start justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  config.extras.includes(extra.id)
                    ? 'border-oe-gold bg-oe-gold/5'
                    : 'border-border hover:border-oe-gold/50'
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={config.extras.includes(extra.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setConfig({ ...config, extras: [...config.extras, extra.id] });
                      } else {
                        setConfig({
                          ...config,
                          extras: config.extras.filter((id) => id !== extra.id),
                        });
                      }
                    }}
                    className="w-5 h-5 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-white font-semibold flex items-center gap-2">
                      <span>{extra.icon}</span>
                      {extra.name}
                    </div>
                    <div className="text-text-muted text-xs mt-1">{extra.description}</div>
                    <div className="text-oe-gold text-sm font-bold mt-1">+{extra.price}€</div>
                  </div>
                </div>
                {extra.popular && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
                {extra.premium && (
                  <span className="absolute -top-2 -right-2 bg-oe-gold text-white text-xs px-2 py-0.5 rounded-full">
                    Premium
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Resumen Precio */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-oe-gold/10 to-oe-gold/5 border-2 border-oe-gold/50">
          <h3 className="text-2xl font-bold text-white mb-4">Resumen de Precio</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-text-muted">
              <span>Pack base:</span>
              <span>{pricing.basePrice}€</span>
            </div>
            {pricing.extrasPrice > 0 && (
              <div className="flex justify-between text-text-muted">
                <span>Extras ({config.extras.length}):</span>
                <span>{pricing.extrasPrice}€</span>
              </div>
            )}
            {pricing.discount > 0 && (
              <div className="flex justify-between text-green-400 font-bold">
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {pricing.discountReason}:
                </span>
                <span>-{pricing.discount}€</span>
              </div>
            )}
            <div className="border-t border-border pt-2 mt-2 flex justify-between items-center">
              <span className="text-xl font-bold text-white">Total:</span>
              <span className="text-3xl font-black text-oe-gold">{pricing.total}€</span>
            </div>
          </div>

          <button
            onClick={() => {
              setStep(4);
              track('Configurador_Step3_Continue', { total: pricing.total });
            }}
            className="w-full oe-btn-gold text-lg py-4 flex items-center justify-center gap-2"
          >
            Continuar
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // 🔥 PASO 4 NUEVO: OFERTA DE CIERRE
  const renderStep4 = () => {
    const pricing = calculatePricing();
    const earlyBirdDiscount = Math.round((pricing.total * (OFFERS.earlyBird.discount || 10)) / 100);
    const finalPrice = pricing.total - earlyBirdDiscount;

    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-bold mb-4 animate-pulse">
            ⏰ OFERTA EXPIRA EN 15 MINUTOS
          </div>
          <h2 className="text-5xl font-display font-black text-white mb-4">
            ¡Último Paso para tu Evento Épico!
          </h2>
          <p className="text-xl text-text-muted">
            Reserva ahora y <span className="text-oe-gold font-bold">ahorra {earlyBirdDiscount}€</span>
          </p>
        </div>

        {/* Comparación de precios */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sin oferta */}
          <div className="p-6 rounded-xl bg-bg-surface border border-border opacity-60">
            <div className="text-center">
              <p className="text-text-muted mb-2">Si reservas después:</p>
              <p className="text-3xl font-black text-white line-through">{pricing.total}€</p>
              <p className="text-sm text-text-muted mt-2">Precio normal</p>
            </div>
          </div>

          {/* Con oferta */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-oe-gold/20 to-oe-gold/5 border-2 border-oe-gold ring-4 ring-oe-gold/30">
            <div className="text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-oe-gold text-black text-xs font-bold mb-3">
                🔥 RESERVA HOY
              </div>
              <p className="text-sm text-text-muted mb-2">Tu precio final:</p>
              <p className="text-5xl font-black text-oe-gold mb-2">{finalPrice}€</p>
              <p className="text-green-400 font-bold flex items-center justify-center gap-1">
                <TrendingDown className="w-4 h-4" />
                Ahorras {earlyBirdDiscount}€
              </p>
            </div>
          </div>
        </div>

        {/* Urgencia visual */}
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/50">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-bold mb-2">¿Por qué esta oferta?</h4>
              <p className="text-text-muted text-sm leading-relaxed">
                Cuando reservas hoy, podemos <strong className="text-white">confirmar tu fecha al
                instante</strong> y empezar la preparación. Cuanto antes empecemos, mejor será tu
                evento. Cada día que pasa, perdemos tiempo de personalización.
              </p>
            </div>
          </div>
        </div>

        {/* Garantía */}
        <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/50">
          <div className="flex items-start gap-4">
            <Zap className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-bold mb-2">Garantía de Satisfacción 100%</h4>
              <p className="text-text-muted text-sm leading-relaxed">
                Si cambias de opinión en las próximas 48h, te devolvemos el 100% del dinero. Sin
                preguntas. Sin letra pequeña. <strong className="text-green-400">Cero riesgo</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="space-y-4">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setConfig({ ...config, appliedOffer: 'early-bird' });
              track('Configurador_Step4_EarlyBird', {
                originalPrice: pricing.total,
                discount: earlyBirdDiscount,
                finalPrice,
              });
            }}
            className="w-full oe-btn-gold text-xl py-6 flex items-center justify-center gap-3 animate-pulse hover:animate-none"
          >
            <MessageCircle className="w-6 h-6" />
            Reservar con {earlyBirdDiscount}€ OFF
          </a>

          <button
            onClick={() => setStep(3)}
            className="w-full text-text-muted hover:text-white text-sm underline"
          >
            ← Volver a revisar mi configuración
          </button>
        </div>

        {/* Social proof */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-sm text-text-muted">
            ⭐⭐⭐⭐⭐ <strong className="text-white">+12 clientes</strong> han reservado con esta
            oferta este mes
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-bg-main py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Progress Steps */}
        <div className="mb-16 flex justify-center">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s
                      ? 'bg-oe-gold text-black'
                      : 'bg-bg-surface text-text-muted border border-border'
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 4 && <div className={`h-0.5 w-12 ${step > s ? 'bg-oe-gold' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
}

