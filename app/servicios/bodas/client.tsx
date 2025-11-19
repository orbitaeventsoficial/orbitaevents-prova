'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Check, Star, MessageCircle, Sparkles, 
  Users, Clock, Zap, TrendingUp, ChevronRight 
} from 'lucide-react';
import { getPacksByService, EXTRAS, type PackDefinition, type ExtraDefinition } from '@/data/packs-config';

// Obtener packs de bodas
const WEDDING_PACKS = getPacksByService('bodas');

// Extras específicos para bodas
const WEDDING_EXTRAS = EXTRAS.filter(e => 
  ['confeti', 'co2', 'humo-bajo', 'pantalla', 'photocall', 'dj-extra'].includes(e.id)
);

interface ConfigState {
  selectedPack: PackDefinition | null;
  selectedExtras: Set<string>;
  numGuests: number;
}

export default function BodasClientV2() {
  const [config, setConfig] = useState<ConfigState>({
    selectedPack: null,
    selectedExtras: new Set(),
    numGuests: 100,
  });

  const [showSummary, setShowSummary] = useState(false);

  // Calcular total
  const packPrice = config.selectedPack?.priceValue || 0;
  const extrasPrice = Array.from(config.selectedExtras).reduce((sum, id) => {
    const extra = WEDDING_EXTRAS.find(e => e.id === id);
    return sum + (extra?.price || 0);
  }, 0);
  const totalPrice = packPrice + extrasPrice;

  // Descuento por 3+ extras (15%)
  const hasComboDiscount = config.selectedExtras.size >= 3;
  const discount = hasComboDiscount ? Math.round(extrasPrice * 0.15) : 0;
  const finalPrice = totalPrice - discount;

  // Mostrar summary cuando hay algo seleccionado
  useEffect(() => {
    setShowSummary(config.selectedPack !== null);
  }, [config.selectedPack]);

  // Recomendación según invitados
  const getRecommendedPack = (): PackDefinition | null => {
    if (config.numGuests <= 80) return WEDDING_PACKS[0]; // Esencial
    if (config.numGuests <= 150) return WEDDING_PACKS[1]; // Premium
    return WEDDING_PACKS[2]; // VIP
  };

  const recommendedPack = getRecommendedPack();

  // Seleccionar pack
  const selectPack = (pack: PackDefinition) => {
    setConfig(prev => ({ ...prev, selectedPack: pack }));
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'bodas_pack_select', {
        pack_id: pack.id,
        pack_name: pack.name,
        price: pack.priceValue,
      });
    }
  };

  // Toggle extra
  const toggleExtra = (extraId: string) => {
    setConfig(prev => {
      const newExtras = new Set(prev.selectedExtras);
      if (newExtras.has(extraId)) {
        newExtras.delete(extraId);
      } else {
        newExtras.add(extraId);
      }
      return { ...prev, selectedExtras: newExtras };
    });

    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const extra = WEDDING_EXTRAS.find(e => e.id === extraId);
      (window as any).gtag('event', 'bodas_extra_toggle', {
        extra_id: extraId,
        extra_name: extra?.name,
        action: config.selectedExtras.has(extraId) ? 'remove' : 'add',
      });
    }
  };

  // Generar mensaje WhatsApp
  const generateWhatsAppMessage = () => {
    if (!config.selectedPack) return;

    const selectedExtrasText = Array.from(config.selectedExtras)
      .map(id => {
        const extra = WEDDING_EXTRAS.find(e => e.id === id);
        return extra ? `• ${extra.name} (+${extra.price}€)` : '';
      })
      .filter(Boolean)
      .join('\n');

    let message = `🎊 ¡Hola! Quiero presupuesto para mi boda\n\n`;
    message += `📦 Pack: ${config.selectedPack.name} (${config.selectedPack.priceValue}€)\n`;
    message += `👥 Invitados: ${config.numGuests} personas\n\n`;
    
    if (selectedExtrasText) {
      message += `✨ Extras:\n${selectedExtrasText}\n\n`;
    }

    if (hasComboDiscount) {
      message += `🎁 Descuento Combo 3 Extras: -${discount}€\n\n`;
    }

    message += `💰 Total: ${finalPrice}€\n\n`;
    message += `¿Tenéis disponibilidad?`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/34660671119?text=${encoded}`;

    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'bodas_whatsapp_click', {
        pack_id: config.selectedPack.id,
        num_extras: config.selectedExtras.size,
        total_price: finalPrice,
        has_discount: hasComboDiscount,
      });
    }

    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Header */}
      <section className="py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-oe-gold/10 border border-oe-gold/30 mb-6">
          <Heart className="w-4 h-4 text-oe-gold" fill="currentColor" />
          <span className="text-sm font-bold text-oe-gold">87 bodas en 2024</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-display font-black text-text-primary mb-4">
          Configurador de Boda
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          Selecciona tu pack y personaliza con extras. Presupuesto al instante.
        </p>
      </section>

      {/* Configurador de invitados */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-bg-surface to-bg-card border border-oe-gold/30">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-oe-gold" />
            <h3 className="text-2xl font-bold text-text-primary">¿Cuántos invitados esperáis?</h3>
          </div>

          <div className="text-center mb-8">
            <div className="text-7xl font-bold bg-gradient-to-r from-oe-gold to-oe-gold bg-clip-text text-transparent">
              {config.numGuests}
            </div>
            <div className="text-text-muted mt-2">personas</div>
          </div>

          <input
            type="range"
            min="30"
            max="300"
            step="10"
            value={config.numGuests}
            onChange={(e) => setConfig(prev => ({ ...prev, numGuests: parseInt(e.target.value) }))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer slider-custom"
          />
          <div className="flex justify-between text-sm text-text-muted mt-4">
            <span>30 personas</span>
            <span>300 personas</span>
          </div>

          {/* Recomendación */}
          {recommendedPack && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-oe-gold/20 rounded-xl border border-oe-gold/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-oe-gold" />
                <span className="font-bold text-oe-gold">Recomendado para vosotros:</span>
              </div>
              <div className="text-lg text-text-primary">
                <strong>{recommendedPack.name}</strong> - {recommendedPack.priceValue}€
              </div>
              <p className="text-sm text-text-muted mt-1">{recommendedPack.tagline}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Selector de packs */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
          Elige Vuestro Pack
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {WEDDING_PACKS.map(pack => {
            const isSelected = config.selectedPack?.id === pack.id;
            const isRecommended = recommendedPack?.id === pack.id;

            return (
              <motion.div
                key={pack.id}
                layout
                className={`
                  relative p-6 rounded-2xl border-2 cursor-pointer transition-all
                  ${isSelected
                    ? 'border-oe-gold bg-oe-gold/10 shadow-lg shadow-oe-gold scale-105'
                    : isRecommended
                    ? 'border-oe-gold bg-oe-gold/5'
                    : 'border bg-bg-surface hover:border-white/20 hover:bg-bg-card'
                  }
                `}
                onClick={() => selectPack(pack)}
              >
                {/* Badge Recomendado */}
                {isRecommended && !isSelected && (
                  <div className="absolute -top-3 right-4">
                    <div className="px-3 py-1 bg-oe-gold rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      RECOMENDADO
                    </div>
                  </div>
                )}

                {/* Badge Popular */}
                {pack.popular && (
                  <div className="absolute -top-3 left-4">
                    <div className="px-3 py-1 bg-gradient-to-r from-oe-gold to-oe-gold rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" fill="currentColor" />
                      MÁS ELEGIDO
                    </div>
                  </div>
                )}

                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">{pack.name}</h3>
                    <p className="text-sm text-text-muted">{pack.tagline}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-oe-gold">
                      {pack.priceValue}€
                    </span>
                  </div>

                  <div className="text-sm text-text-muted">
                    👥 {pack.ideal}
                  </div>

                  <ul className="space-y-2 pt-4 border-t border">
                    {pack.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="text-sm text-text-muted flex items-start gap-2">
                        <Check className="w-4 h-4 text-oe-gold flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className={`
                    w-full py-3 rounded-xl font-bold text-center transition-all
                    ${isSelected
                      ? 'bg-oe-gold text-text-primary'
                      : 'bg-bg-card text-text-primary hover:bg-white/20'
                    }
                  `}>
                    {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Extras */}
      {config.selectedPack && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Personaliza con Extras
            </h2>
            <p className="text-text-muted">
              Contrata 3+ extras y ahorra <span className="text-oe-gold font-bold">15%</span> automáticamente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {WEDDING_EXTRAS.map(extra => {
              const isSelected = config.selectedExtras.has(extra.id);

              return (
                <motion.div
                  key={extra.id}
                  layout
                  className={`
                    relative p-6 rounded-2xl border-2 cursor-pointer transition-all
                    ${isSelected
                      ? 'border-oe-gold bg-oe-gold/10 shadow-lg shadow-oe-gold/20'
                      : 'border bg-bg-surface hover:border-white/20 hover:bg-bg-card'
                    }
                  `}
                  onClick={() => toggleExtra(extra.id)}
                >
                  {/* Checkbox */}
                  <div className="absolute top-4 right-4">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                      ${isSelected
                        ? 'border-oe-gold bg-oe-gold'
                        : 'border-oe-gold bg-transparent'
                      }
                    `}>
                      {isSelected && (
                        <Check className="w-4 h-4 text-text-primary" strokeWidth={3} />
                      )}
                    </div>
                  </div>

                  {/* Badge Popular */}
                  {extra.popular && (
                    <div className="absolute -top-3 left-4">
                      <div className="px-2 py-1 bg-oe-gold rounded-full text-xs font-bold">
                        POPULAR
                      </div>
                    </div>
                  )}

                  {/* Badge Premium */}
                  {extra.premium && (
                    <div className="absolute -top-3 left-4">
                      <div className="px-2 py-1 bg-gradient-to-r from-oe-gold to-oe-gold rounded-full text-xs font-bold">
                        PREMIUM
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 mt-4">
                    <div className="text-4xl mb-2">{extra.icon}</div>
                    <h4 className="text-lg font-bold text-text-primary pr-8">{extra.name}</h4>
                    <p className="text-sm text-text-muted">{extra.description}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border">
                      <span className="text-2xl font-bold text-oe-gold">
                        +{extra.price}€
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Descuento combo */}
          {hasComboDiscount && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-8 p-6 bg-gradient-to-r from-green-900/30 to-oe-gold/30 rounded-2xl border-2 border-green-500/50 text-center"
            >
              <Zap className="w-12 h-12 text-green-400 mx-auto mb-3" fill="currentColor" />
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                ¡Descuento Combo Activado!
              </h3>
              <p className="text-green-400 text-lg">
                Ahorras <strong>{discount}€</strong> (15% en extras)
              </p>
            </motion.div>
          )}
        </motion.section>
      )}

      {/* Sticky Summary */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-oe-gold to-oe-gold-light shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Info */}
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-sm opacity-90">{config.selectedPack?.name}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm opacity-80">
                        {config.selectedExtras.size} extra{config.selectedExtras.size !== 1 ? 's' : ''}
                      </span>
                      {hasComboDiscount && (
                        <>
                          <span className="text-sm opacity-50">•</span>
                          <span className="text-sm bg-white/20 px-2 py-1 rounded">
                            -15% en extras
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="h-12 w-px bg-white/30" />
                  <div>
                    {discount > 0 && (
                      <div className="text-sm line-through opacity-60">{totalPrice}€</div>
                    )}
                    <div className="text-3xl font-bold">{finalPrice}€</div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={generateWhatsAppMessage}
                  className="
                    px-8 py-4 bg-white text-oe-gold rounded-full
                    font-bold flex items-center gap-2
                    hover:bg-oe-gold transition-all
                    shadow-lg hover:shadow-xl hover:scale-105
                  "
                >
                  <MessageCircle className="w-5 h-5" />
                  Pedir Presupuesto
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info adicional */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="p-8 bg-bg-surface rounded-2xl border border">
          <h3 className="text-2xl font-bold text-text-primary mb-4">💍 Información Importante</h3>
          <div className="grid md:grid-cols-2 gap-6 text-text-muted">
            <div>
              <strong className="text-text-primary">✅ Todos los packs incluyen:</strong>
              <ul className="mt-2 space-y-1 ml-4 text-sm">
                <li>• DJ profesional especializado en bodas</li>
                <li>• Sonido EV profesional 4000W</li>
                <li>• Montaje completo y desmontaje</li>
                <li>• Prueba de sonido previa</li>
              </ul>
            </div>
            <div>
              <strong className="text-text-primary">💰 Facilidades de pago:</strong>
              <ul className="mt-2 space-y-1 ml-4 text-sm">
                <li>• Señal: 30% al reservar</li>
                <li>• Resto: día del evento</li>
                <li>• Sin comisiones por transferencia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

