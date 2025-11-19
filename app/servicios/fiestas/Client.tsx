'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Zap, MessageCircle, Star, TrendingUp } from 'lucide-react';

// Tipos
interface Pack {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  minGuests: number;
  maxGuests: number;
  features: string[];
  isFlash?: boolean;
  popular?: boolean;
}

// Packs disponibles
const PARTY_PACKS: Pack[] = [
  {
    id: 'oferta-flash',
    name: '⚡ Oferta Flash',
    tagline: 'Solo 250€',
    price: 250,
    originalPrice: 450,
    minGuests: 20,
    maxGuests: 60,
    isFlash: true,
    features: [
      '🔊 Sistema de sonido básico (2x800W)',
      '💡 Iluminación LED básica',
      '🎧 DJ/animador 3 horas',
      '✨ Máquina de humo',
      '📦 Montaje y desmontaje',
    ],
  },
  {
    id: 'pack-basico',
    name: 'Pack Básico',
    tagline: 'Ideal para empezar',
    price: 350,
    minGuests: 20,
    maxGuests: 50,
    features: [
      '🔊 Sistema de sonido 1000W',
      '💡 Iluminación LED completa',
      '🎧 DJ profesional 4 horas',
      '✨ Efectos especiales básicos',
      '📦 Todo incluido',
    ],
  },
  {
    id: 'pack-pro',
    name: 'Pack Pro',
    tagline: 'El más vendido',
    price: 550,
    minGuests: 50,
    maxGuests: 100,
    popular: true,
    features: [
      '🔊 Sonido profesional EV ETX (2000W)',
      '💡 Iluminación LED + cabezas móviles',
      '🎧 DJ profesional 5 horas',
      '✨ Efectos especiales avanzados',
      '🎨 Luces personalizadas',
      '📦 Montaje premium',
    ],
  },
  {
    id: 'pack-premium',
    name: 'Pack Premium',
    tagline: 'Experiencia VIP',
    price: 850,
    minGuests: 80,
    maxGuests: 150,
    features: [
      '🔊 Sistema sonido completo (4000W+)',
      '💡 Iluminación espectacular + láser',
      '🎧 DJ profesional 6 horas',
      '✨ Efectos especiales premium',
      '🎨 Show de luces coreografiado',
      '🎭 Decoración temática',
      '📦 Producción completa',
    ],
  },
  {
    id: 'pack-xl',
    name: 'Pack XL',
    tagline: 'Para eventos grandes',
    price: 1200,
    minGuests: 120,
    maxGuests: 200,
    features: [
      '🔊 Sistema sonido profesional línea (6000W+)',
      '💡 Iluminación arquitectónica completa',
      '🎧 2x DJ profesionales 7 horas',
      '✨ Efectos especiales ilimitados',
      '🎨 Mapping de video',
      '🎭 Decoración temática premium',
      '👨‍💼 Productor ejecutivo dedicado',
      '📦 Producción integral',
    ],
  },
];

// Recomendaciones por número de invitados
const getRecommendedPack = (guests: number): Pack | undefined => {
  return PARTY_PACKS.find(
    pack => !pack.isFlash && guests >= pack.minGuests && guests <= pack.maxGuests
  );
};

export default function FiestasClient() {
  const [numGuests, setNumGuests] = useState(60);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Actualizar recomendación cuando cambian los invitados
  useEffect(() => {
    const recommended = getRecommendedPack(numGuests);
    if (recommended) {
      setShowRecommendation(true);
      // Auto-seleccionar el recomendado después de 1 segundo
      const timer = setTimeout(() => {
        if (!selectedPack) {
          setSelectedPack(recommended.id);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [numGuests]);

  // Generar mensaje WhatsApp
  const handleWhatsApp = (pack: Pack) => {
    const message = `¡Hola! Quiero info del *${pack.name}* para *${numGuests} personas*.\n\n${pack.tagline}\nPrecio: ${pack.price}€\n\n¿Tenéis disponibilidad?`;
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/34660671119?text=${encoded}`;

    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'fiesta_whatsapp_click', {
        pack_id: pack.id,
        pack_name: pack.name,
        num_guests: numGuests,
        price: pack.price,
      });
    }

    window.open(url, '_blank');
  };

  // Analytics al cambiar número de invitados
  const handleGuestsChange = (value: number) => {
    setNumGuests(value);
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'guests_slider_change', {
        num_guests: value,
      });
    }
  };

  const recommendedPack = getRecommendedPack(numGuests);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Packs para Fiestas
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Configura tu fiesta perfecta según el número de invitados
        </p>
      </div>

      {/* Configurador de invitados */}
      <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl border border-purple-500/30">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold">¿Cuántos invitados esperas?</h3>
        </div>

        {/* Número grande */}
        <div className="text-center mb-8">
          <div className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {numGuests}
          </div>
          <div className="text-gray-400 mt-2">personas</div>
        </div>

        {/* Slider */}
        <div className="space-y-4">
          <input
            type="range"
            min="20"
            max="200"
            step="5"
            value={numGuests}
            onChange={(e) => handleGuestsChange(parseInt(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer slider-custom"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>20 personas</span>
            <span>200 personas</span>
          </div>
        </div>

        {/* Recomendación */}
        <AnimatePresence>
          {showRecommendation && recommendedPack && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-purple-500/20 rounded-xl border border-purple-500/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="font-bold text-purple-300">Recomendado para ti:</span>
              </div>
              <div className="text-lg">
                <strong>{recommendedPack.name}</strong> - {recommendedPack.price}€
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Oferta Flash - DESTACADA */}
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="relative p-8 rounded-3xl border-4 border-oe-gold bg-gradient-to-br from-amber-900/30 to-orange-900/30 shadow-2xl shadow-oe-gold"
        >
          {/* Badge Flash */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="px-6 py-2 bg-gradient-to-r from-oe-gold to-oe-gold-light rounded-full font-bold flex items-center gap-2 shadow-lg animate-pulse">
              <Zap className="w-5 h-5" fill="currentColor" />
              OFERTA FLASH
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-4">
            {/* Info */}
            <div className="space-y-4">
              <h3 className="text-4xl font-bold">{PARTY_PACKS[0].name}</h3>
              <p className="text-xl text-gray-300">{PARTY_PACKS[0].tagline}</p>

              {/* Precio */}
              <div className="flex items-baseline gap-4">
                <div className="text-5xl font-bold text-oe-gold-light">
                  {PARTY_PACKS[0].price}€
                </div>
                <div className="text-2xl text-gray-500 line-through">
                  {PARTY_PACKS[0].originalPrice}€
                </div>
              </div>

              {/* Ahorro */}
              <div className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
                <span className="text-green-400 font-bold">
                  Ahorras {(PARTY_PACKS[0].originalPrice! - PARTY_PACKS[0].price)}€ (44% OFF)
                </span>
              </div>

              {/* Rango */}
              <div className="text-gray-400">
                📊 Ideal para {PARTY_PACKS[0].minGuests}-{PARTY_PACKS[0].maxGuests} personas
              </div>
            </div>

            {/* Features + CTA */}
            <div className="space-y-6">
              <ul className="space-y-3">
                {PARTY_PACKS[0].features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-oe-gold/20 border border-oe-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-3 h-3 text-oe-gold-light" fill="currentColor" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleWhatsApp(PARTY_PACKS[0])}
                className="w-full py-4 bg-gradient-to-r from-oe-gold to-oe-gold-light rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-amber-500/40 transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                ¡Quiero esta oferta!
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Resto de packs */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8">Todos los Packs</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTY_PACKS.filter(pack => !pack.isFlash).map(pack => {
            const isSelected = selectedPack === pack.id;
            const isRecommended = recommendedPack?.id === pack.id;
            
            return (
              <motion.div
                key={pack.id}
                layout
                className={`
                  relative p-6 rounded-2xl border-2 cursor-pointer
                  transition-all duration-300
                  ${isSelected
                    ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20 scale-105'
                    : isRecommended
                    ? 'border-oe-gold bg-oe-gold/5'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }
                `}
                onClick={() => setSelectedPack(pack.id)}
              >
                {/* Badge Popular */}
                {pack.popular && (
                  <div className="absolute -top-3 right-4">
                    <div className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" fill="currentColor" />
                      MÁS VENDIDO
                    </div>
                  </div>
                )}

                {/* Badge Recomendado */}
                {isRecommended && (
                  <div className="absolute -top-3 left-4">
                    <div className="px-3 py-1 bg-oe-gold rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      RECOMENDADO
                    </div>
                  </div>
                )}

                {/* Contenido */}
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-2xl font-bold">{pack.name}</h3>
                    <p className="text-sm text-gray-400">{pack.tagline}</p>
                  </div>

                  {/* Precio */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-purple-400">
                      {pack.price}€
                    </span>
                  </div>

                  {/* Rango */}
                  <div className="text-sm text-gray-400">
                    📊 {pack.minGuests}-{pack.maxGuests} personas
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 pt-4 border-t border-white/10">
                    {pack.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 flex-shrink-0">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsApp(pack);
                    }}
                    className={`
                      w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2
                      transition-all
                      ${isSelected
                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }
                    `}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Pedir Info
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info adicional */}
      <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">💡 Información Importante</h3>
        <div className="grid md:grid-cols-2 gap-6 text-gray-300">
          <div>
            <strong className="text-white">✅ Todos los packs incluyen:</strong>
            <ul className="mt-2 space-y-1 ml-4">
              <li>• Transporte e instalación</li>
              <li>• Técnico/DJ durante el evento</li>
              <li>• Montaje y desmontaje completo</li>
              <li>• Seguro de responsabilidad civil</li>
            </ul>
          </div>
          <div>
            <strong className="text-white">🎨 Personalización:</strong>
            <ul className="mt-2 space-y-1 ml-4">
              <li>• Tematización disponible (+150€)</li>
              <li>• Decoración personalizada</li>
              <li>• Show especial de luces</li>
              <li>• ¡Consulta sin compromiso!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
