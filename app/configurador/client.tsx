// app/configurador/client.tsx
'use client';

import { useState, useEffect } from 'react';
import { ALL_SERVICES, Pack } from '@/lib/packs-config';
import { Check, ChevronRight, Calendar, Users, Clock, Zap, MessageCircle, Sparkles } from 'lucide-react';

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
  selectedPack: Pack | null;
  date: string;
  guests: number;
  extras: string[];
}

const EXTRAS = [
  { id: 'confeti', name: 'Confeti + Chispas Frías', price: 150 },
  { id: 'co2', name: 'Cañones CO2', price: 200 },
  { id: 'pantalla', name: 'Pantalla LED para Visuales', price: 300 },
  { id: 'dj-extra', name: 'Hora Extra de DJ', price: 120 },
];

export default function ConfiguradorClient() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ConfigState>({
    eventType: null,
    selectedPack: null,
    date: '',
    guests: 50,
    extras: [],
  });

  useEffect(() => {
    track('View_Configurador');
  }, []);

  const calculateTotal = (): number => {
    let total = config.selectedPack?.price || 0;
    config.extras.forEach(extraId => {
      const extra = EXTRAS.find(e => e.id === extraId);
      if (extra) total += extra.price;
    });
    return total;
  };

  const getWhatsAppLink = () => {
    const total = calculateTotal();
    const service = ALL_SERVICES.find(s => s.serviceId === config.eventType);
    const message = `Hola! He configurado mi evento:
    
📅 Tipo: ${service?.serviceName || 'N/A'}
💎 Pack: ${config.selectedPack?.name || 'N/A'} (${config.selectedPack?.price}€)
👥 Invitados: ${config.guests}
📆 Fecha aproximada: ${config.date || 'Por definir'}
${config.extras.length > 0 ? `✨ Extras: ${config.extras.map(id => EXTRAS.find(e => e.id === id)?.name).join(', ')}` : ''}

💰 Total estimado: ${total}€

¿Podemos hablar para concretar detalles?`;

    return `https://wa.me/34699121023?text=${encodeURIComponent(message)}`;
  };

  // PASO 1: Tipo de Evento
  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-4">
          ¿Qué tipo de evento es?
        </h2>
        <p className="text-xl text-text-muted">Elige para ver los packs disponibles</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_SERVICES.filter(s => s.serviceId !== 'alquiler').map((service) => (
          <button
            key={service.serviceId}
            onClick={() => {
              setConfig({ ...config, eventType: service.serviceId as EventType });
              setStep(2);
              track('Configurador_Step1_EventType', { type: service.serviceId });
            }}
            className="p-8 rounded-2xl bg-bg-surface border-2 border-border hover:border-oe-gold transition-all text-left group"
          >
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-oe-gold transition-colors">
              {service.serviceName}
            </h3>
            <p className="text-text-muted text-sm mb-4">
              Desde {Math.min(...service.packs.map(p => p.price))}€
            </p>
            <div className="flex items-center text-oe-gold text-sm font-bold">
              Ver packs <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // PASO 2: Selección de Pack
  const renderStep2 = () => {
    const service = ALL_SERVICES.find(s => s.serviceId === config.eventType);
    if (!service) return null;

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <button
            onClick={() => setStep(1)}
            className="text-oe-gold hover:underline mb-4 inline-flex items-center"
          >
            ← Cambiar tipo de evento
          </button>
          <h2 className="text-4xl font-display font-black text-white mb-4">
            Elige tu pack de {service.serviceName}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {service.packs.map((pack) => (
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
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-oe-gold to-yellow-500 text-black text-xs font-bold mb-4">
                  ⭐ PREMIUM
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{pack.name}</h3>
              <p className="text-text-muted text-sm mb-4">{pack.tagline}</p>

              <div className="mb-6">
                <div className="text-4xl font-black text-oe-gold mb-1">{pack.price}€</div>
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
                  track('Configurador_Step2_PackSelected', { pack: pack.id, price: pack.price });
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
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <button
            onClick={() => setStep(2)}
            className="text-oe-gold hover:underline mb-4 inline-flex items-center"
          >
            ← Cambiar pack
          </button>
          <h2 className="text-4xl font-display font-black text-white mb-4">
            Detalles de tu evento
          </h2>
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
            />
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
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-oe-gold" />
            Mejora tu experiencia
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {EXTRAS.map((extra) => (
              <label
                key={extra.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  config.extras.includes(extra.id)
                    ? 'border-oe-gold bg-oe-gold/5'
                    : 'border-border hover:border-oe-gold/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={config.extras.includes(extra.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setConfig({ ...config, extras: [...config.extras, extra.id] });
                      } else {
                        setConfig({ ...config, extras: config.extras.filter(id => id !== extra.id) });
                      }
                    }}
                    className="w-5 h-5"
                  />
                  <div>
                    <div className="text-white font-semibold">{extra.name}</div>
                    <div className="text-text-muted text-sm">+{extra.price}€</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Resumen y CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-oe-gold/10 to-oe-gold/5 border-2 border-oe-gold/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-3xl font-black text-white mb-2">
                Total Estimado: <span className="text-oe-gold">{calculateTotal()}€</span>
              </h3>
              <p className="text-text-muted">
                {config.selectedPack?.name} + {config.extras.length} extras
              </p>
            </div>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('Configurador_Step3_WhatsApp', { total: calculateTotal() })}
              className="oe-btn-gold text-lg px-8 py-5 inline-flex items-center justify-center gap-3 whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar Presupuesto
            </a>
          </div>
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
            {[1, 2, 3].map((s) => (
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
                {s < 3 && (
                  <div
                    className={`h-0.5 w-12 ${step > s ? 'bg-oe-gold' : 'bg-border'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
}
