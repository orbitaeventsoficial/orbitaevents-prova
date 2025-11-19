'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clapperboard, Check, Star, MessageCircle, Zap, Settings,
  Users, Clock, TrendingUp, ChevronRight, Sparkles
} from 'lucide-react';

// Servicios modulares de producción
interface ProductionService {
  id: string;
  category: 'audio' | 'visual' | 'stage' | 'effects' | 'crew';
  name: string;
  description: string;
  price: number;
  icon: string;
  popular?: boolean;
  premium?: boolean;
  unit?: string; // "por día", "por hora", etc.
}

const PRODUCTION_SERVICES: ProductionService[] = [
  // AUDIO
  {
    id: 'sonido-basico',
    category: 'audio',
    name: 'Sistema Sonido Básico',
    description: '2x altavoces 2000W + mezclador + cables',
    price: 300,
    icon: '🔊',
    popular: true,
    unit: 'por día',
  },
  {
    id: 'sonido-pro',
    category: 'audio',
    name: 'Sistema Sonido PRO',
    description: '4x altavoces EV 8000W + subs + procesador',
    price: 600,
    icon: '🔉',
    premium: true,
    unit: 'por día',
  },
  {
    id: 'micros-inalambricos',
    category: 'audio',
    name: 'Micrófonos Inalámbricos',
    description: 'Set de 4 micros profesionales',
    price: 150,
    icon: '🎤',
    unit: 'por día',
  },
  {
    id: 'monitor-escenario',
    category: 'audio',
    name: 'Monitores de Escenario',
    description: '2x monitores retorno para artistas',
    price: 200,
    icon: '📢',
    unit: 'por día',
  },

  // VISUAL
  {
    id: 'luces-basicas',
    category: 'visual',
    name: 'Iluminación Básica',
    description: '8x focos PAR LED + controlador DMX',
    price: 250,
    icon: '💡',
    popular: true,
    unit: 'por día',
  },
  {
    id: 'luces-profesionales',
    category: 'visual',
    name: 'Iluminación Profesional',
    description: 'Cabezas móviles + láser + efectos',
    price: 500,
    icon: '✨',
    premium: true,
    unit: 'por día',
  },
  {
    id: 'pantalla-led',
    category: 'visual',
    name: 'Pantalla LED',
    description: 'Pantalla LED 3x2m para proyección',
    price: 400,
    icon: '📺',
    unit: 'por día',
  },
  {
    id: 'video-mapping',
    category: 'visual',
    name: 'Video Mapping',
    description: 'Proyección arquitectónica 3D',
    price: 800,
    icon: '🎬',
    premium: true,
    unit: 'por proyecto',
  },

  // STAGE
  {
    id: 'escenario-small',
    category: 'stage',
    name: 'Escenario Pequeño',
    description: '4x3m altura 40cm + escaleras',
    price: 350,
    icon: '🎪',
    unit: 'por evento',
  },
  {
    id: 'escenario-medium',
    category: 'stage',
    name: 'Escenario Mediano',
    description: '6x4m altura 60cm + escaleras + barandilla',
    price: 600,
    icon: '🎭',
    popular: true,
    unit: 'por evento',
  },
  {
    id: 'escenario-large',
    category: 'stage',
    name: 'Escenario Grande',
    description: '8x6m altura 80cm + estructura completa',
    price: 1000,
    icon: '🏟️',
    premium: true,
    unit: 'por evento',
  },
  {
    id: 'truss',
    category: 'stage',
    name: 'Estructura Truss',
    description: 'Truss aérea para colgar luces/sonido',
    price: 400,
    icon: '⚙️',
    unit: 'por evento',
  },

  // EFFECTS
  {
    id: 'humo',
    category: 'effects',
    name: 'Máquinas de Humo',
    description: '2x máquinas 1500W + fluido',
    price: 100,
    icon: '🌫️',
    popular: true,
    unit: 'por día',
  },
  {
    id: 'confeti-canones',
    category: 'effects',
    name: 'Cañones de Confeti',
    description: '4x cañones eléctricos + confeti',
    price: 250,
    icon: '🎊',
    unit: 'por evento',
  },
  {
    id: 'co2-jets',
    category: 'effects',
    name: 'Jets de CO2',
    description: '6x jets + tanque CO2',
    price: 350,
    icon: '❄️',
    premium: true,
    unit: 'por evento',
  },
  {
    id: 'pirotecnia-fria',
    category: 'effects',
    name: 'Pirotecnia Fría',
    description: 'Chispas frías + fuentes frías',
    price: 300,
    icon: '✨',
    unit: 'por evento',
  },

  // CREW
  {
    id: 'tecnico-sonido',
    category: 'crew',
    name: 'Técnico de Sonido',
    description: 'Técnico dedicado para audio',
    price: 200,
    icon: '👨‍💼',
    popular: true,
    unit: 'por día',
  },
  {
    id: 'tecnico-luces',
    category: 'crew',
    name: 'Técnico de Iluminación',
    description: 'Técnico dedicado para luces',
    price: 200,
    icon: '👨‍💻',
    unit: 'por día',
  },
  {
    id: 'roadie',
    category: 'crew',
    name: 'Roadie / Ayudante',
    description: 'Apoyo en montaje y desmontaje',
    price: 120,
    icon: '🔧',
    unit: 'por día',
  },
  {
    id: 'productor-ejecutivo',
    category: 'crew',
    name: 'Productor Ejecutivo',
    description: 'Coordinación completa del evento',
    price: 400,
    icon: '🎯',
    premium: true,
    unit: 'por evento',
  },
];

const CATEGORIES = [
  { id: 'audio', label: 'Audio', icon: '🔊', color: 'from-oe-gold to-oe-gold' },
  { id: 'visual', label: 'Visual', icon: '💡', color: 'from-oe-gold to-oe-gold' },
  { id: 'stage', label: 'Escenario', icon: '🎪', color: 'from-oe-gold to-red-500' },
  { id: 'effects', label: 'Efectos', icon: '✨', color: 'from-green-500 to-oe-gold' },
  { id: 'crew', label: 'Equipo', icon: '👥', color: 'from-oe-gold to-oe-gold' },
];

interface ConfigState {
  selectedServices: Set<string>;
  selectedCategory: string;
}

export default function ProduccionClientV2() {
  const [config, setConfig] = useState<ConfigState>({
    selectedServices: new Set(),
    selectedCategory: 'audio',
  });

  const [showSummary, setShowSummary] = useState(false);

  // Calcular total
  const totalPrice = Array.from(config.selectedServices).reduce((sum, id) => {
    const service = PRODUCTION_SERVICES.find(s => s.id === id);
    return sum + (service?.price || 0);
  }, 0);

  // Descuento por volumen (>2000€ = 10%)
  const hasVolumeDiscount = totalPrice >= 2000;
  const discount = hasVolumeDiscount ? Math.round(totalPrice * 0.10) : 0;
  const finalPrice = totalPrice - discount;

  // Mostrar summary cuando hay servicios seleccionados
  useEffect(() => {
    setShowSummary(config.selectedServices.size > 0);
  }, [config.selectedServices]);

  // Filtrar servicios por categoría
  const filteredServices = PRODUCTION_SERVICES.filter(
    s => s.category === config.selectedCategory
  );

  // Toggle servicio
  const toggleService = (serviceId: string) => {
    setConfig(prev => {
      const newServices = new Set(prev.selectedServices);
      if (newServices.has(serviceId)) {
        newServices.delete(serviceId);
      } else {
        newServices.add(serviceId);
      }
      return { ...prev, selectedServices: newServices };
    });

    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const service = PRODUCTION_SERVICES.find(s => s.id === serviceId);
      (window as any).gtag('event', 'produccion_service_toggle', {
        service_id: serviceId,
        service_name: service?.name,
        action: config.selectedServices.has(serviceId) ? 'remove' : 'add',
      });
    }
  };

  // Generar mensaje WhatsApp
  const generateWhatsAppMessage = () => {
    const servicesByCategory: Record<string, string[]> = {};
    
    Array.from(config.selectedServices).forEach(id => {
      const service = PRODUCTION_SERVICES.find(s => s.id === id);
      if (service) {
        if (!servicesByCategory[service.category]) {
          servicesByCategory[service.category] = [];
        }
        servicesByCategory[service.category].push(
          `• ${service.name} (${service.price}€ ${service.unit})`
        );
      }
    });

    let message = `🎬 ¡Hola! Solicito presupuesto de producción técnica\n\n`;
    
    Object.entries(servicesByCategory).forEach(([category, services]) => {
      const cat = CATEGORIES.find(c => c.id === category);
      message += `${cat?.icon} ${cat?.label.toUpperCase()}:\n`;
      message += services.join('\n') + '\n\n';
    });

    message += `💰 Subtotal: ${totalPrice}€\n`;
    
    if (hasVolumeDiscount) {
      message += `🎁 Descuento por volumen: -${discount}€ (10%)\n`;
      message += `💵 Total: ${finalPrice}€\n\n`;
    } else {
      message += `\n`;
    }

    message += `¿Podemos hablar de los detalles y fechas?`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/34660671119?text=${encoded}`;

    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'produccion_whatsapp_click', {
        num_services: config.selectedServices.size,
        total_price: finalPrice,
        has_discount: hasVolumeDiscount,
      });
    }

    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Header */}
      <section className="py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-oe-gold/10 border border-oe-gold/30 mb-6">
          <Clapperboard className="w-4 h-4 text-oe-gold" />
          <span className="text-sm font-bold text-oe-gold">Producción Técnica Profesional</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-display font-black text-text-primary mb-4">
          Configurador de Producción
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          Selecciona solo lo que necesitas. Sistema modular a la carta.
        </p>
      </section>

      {/* Filtros de categoría */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map(category => {
            const isSelected = config.selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setConfig(prev => ({ ...prev, selectedCategory: category.id }))}
                className={`
                  px-6 py-3 rounded-full font-bold transition-all
                  ${isSelected
                    ? `bg-gradient-to-r ${category.color} text-text-primary shadow-lg scale-105`
                    : 'bg-bg-surface text-text-muted hover:bg-bg-card'
                  }
                `}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => {
            const isSelected = config.selectedServices.has(service.id);

            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`
                  relative p-6 rounded-2xl border-2 cursor-pointer transition-all
                  ${isSelected
                    ? 'border-oe-gold bg-oe-gold/10 shadow-lg shadow-oe-gold'
                    : 'border bg-bg-surface hover:border-hover hover:bg-bg-card'
                  }
                `}
                onClick={() => toggleService(service.id)}
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
                {service.popular && (
                  <div className="absolute -top-3 left-4">
                    <div className="px-2 py-1 bg-oe-gold rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  </div>
                )}

                {/* Badge Premium */}
                {service.premium && (
                  <div className="absolute -top-3 left-4">
                    <div className="px-2 py-1 bg-gradient-to-r from-oe-gold to-oe-gold rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" fill="currentColor" />
                      PREMIUM
                    </div>
                  </div>
                )}

                <div className="space-y-3 mt-4">
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <h4 className="text-lg font-bold text-text-primary pr-8">{service.name}</h4>
                  <p className="text-sm text-text-muted">{service.description}</p>
                  
                  <div className="flex flex-col gap-1 pt-3 border-t border">
                    <span className="text-2xl font-bold text-oe-gold">
                      {service.price}€
                    </span>
                    <span className="text-xs text-text-disabled">{service.unit}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Resumen de selección por categoría */}
      {config.selectedServices.size > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 mb-16"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-bg-surface to-bg-card border border-oe-gold/30">
            <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Tu Configuración Actual
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map(category => {
                const categoryServices = Array.from(config.selectedServices)
                  .map(id => PRODUCTION_SERVICES.find(s => s.id === id))
                  .filter(s => s?.category === category.id);

                if (categoryServices.length === 0) return null;

                const categoryTotal = categoryServices.reduce(
                  (sum, s) => sum + (s?.price || 0),
                  0
                );

                return (
                  <div key={category.id} className="p-4 rounded-xl bg-bg-surface border border">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <div className="font-bold text-text-primary">{category.label}</div>
                        <div className="text-sm text-oe-gold">{categoryTotal}€</div>
                      </div>
                    </div>
                    <ul className="space-y-1 text-sm text-text-muted">
                      {categoryServices.map(service => (
                        <li key={service?.id} className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-oe-gold flex-shrink-0" />
                          {service?.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* Descuento por volumen */}
      {hasVolumeDiscount && (
        <motion.section
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-5xl mx-auto px-4 mb-16"
        >
          <div className="p-6 bg-gradient-to-r from-green-900/30 to-oe-gold/30 rounded-2xl border-2 border-green-500/50 text-center">
            <Zap className="w-12 h-12 text-green-400 mx-auto mb-3" fill="currentColor" />
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Descuento por Volumen Activado
            </h3>
            <p className="text-green-400 text-lg">
              Producción +2.000€ = Ahorro de <strong>{discount}€</strong> (10%)
            </p>
          </div>
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
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Info */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <div className="text-sm opacity-90">
                      {config.selectedServices.size} servicio{config.selectedServices.size !== 1 ? 's' : ''} seleccionado{config.selectedServices.size !== 1 ? 's' : ''}
                    </div>
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      {hasVolumeDiscount && (
                        <span className="bg-white/20 px-2 py-1 rounded">
                          -10% por volumen
                        </span>
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
                    px-8 py-4 bg-white text-oe-gold-dark rounded-full
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
          <h3 className="text-2xl font-bold text-text-primary mb-4">🎬 Producción Técnica Profesional</h3>
          <div className="grid md:grid-cols-2 gap-6 text-text-muted">
            <div>
              <strong className="text-text-primary">✅ Servicio completo:</strong>
              <ul className="mt-2 space-y-1 ml-4 text-sm">
                <li>• Equipamiento profesional certificado</li>
                <li>• Transporte e instalación incluidos</li>
                <li>• Técnicos especializados disponibles</li>
                <li>• Backup de equipamiento crítico</li>
              </ul>
            </div>
            <div>
              <strong className="text-text-primary">💼 Experiencia demostrable:</strong>
              <ul className="mt-2 space-y-1 ml-4 text-sm">
                <li>• +50 producciones realizadas</li>
                <li>• Festivales, conciertos y eventos</li>
                <li>• Productoras y empresas de confianza</li>
                <li>• Referencias verificables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

