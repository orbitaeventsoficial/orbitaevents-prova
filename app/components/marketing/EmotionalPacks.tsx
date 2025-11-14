// app/components/marketing/EmotionalPacks.tsx
'use client';

import { useState, useRef } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Heart, Building2, Zap } from 'lucide-react';
import { trackPackSelection } from '@/lib/analytics';

const packs = [
  {
    icon: Heart,
    name: '💍 Boda Épica',
    tagline: 'El día que todos recordarán',
    emotion: 'Tu entrada con ese efecto de humo y luces... tu suegra va a llorar',
    price: 'desde 1.490€',
    originalPrice: '1.890€',
    discount: '21%',
    features: [
      '🎵 DJ profesional 6h',
      '💡 Iluminación completa (20+ focos LED)',
      '🌫️ Efectos especiales (humo, confeti)',
      '🎤 Sonido 4.000W cristalino',
      '👔 Técnico dedicado todo el evento',
      '🎬 Coordinación con fotógrafo/vídeo',
    ],
    highlight: true,
    ctaLabel: 'Quiero esa boda',
    ctaHref: '/contacto?pack=boda',
    gradient: 'from-pink-500/20 via-red-500/20 to-orange-500/20',
    glowColor: 'rgba(236, 72, 153, 0.3)',
  },
  {
    icon: Building2,
    name: '🏢 Corporate Power',
    tagline: 'Tus empleados aún hablarán de esto en 6 meses',
    emotion: 'Team building que NO aburre. Lanzamos tu idea, en una Gala que quedaran impresionados',
    price: 'desde 1.990€',
    originalPrice: '2.490€',
    discount: '20%',
    features: [
      '🎬 Pantalla LED 3x2m',
      '🎙️ Sonido conferencia + fiesta',
      '💡 Branding visual corporativo',
      '🎭 DJ + presentador profesional',
      '📊 Coordinación técnica completa',
      '🎥 Streaming en vivo (opcional)',
    ],
    highlight: false,
    ctaLabel: 'Hablar con un experto',
    ctaHref: '/contacto?pack=corporate',
    gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    icon: Sparkles,
    name: '🎉 Fiesta Salvaje',
    tagline: 'Cumpleaños, despedidas,fiestas soprpesa, lo que sea',
    emotion: 'Esa fiesta de la que tus amigos hablarán durante años',
    price: 'desde 590€',
    originalPrice: '790€',
    discount: '20%',
    features: [
      '🎵 DJ + setup completo 4h',
      '💡 Luces LED programables',
      '🔊 Sonido potente 2.000W',
      '🌈 Efectos de luz sincronizados',
      '📱 Personalizacion completa',
      '🎊 Efectos especiales básicos',
    ],
    highlight: false,
    ctaLabel: 'Quiero esa fiesta',
    ctaHref: '/contacto?pack=fiesta',
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    glowColor: 'rgba(16, 185, 129, 0.3)',
  },
];

export default function EmotionalPacks() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-main via-bg-surface to-bg-main" />
      
      {/* Efecto aurora en el fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-oe-gold/10 rounded-full blur-3xl animate-aurora" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-aurora" style={{ animationDelay: '5s' }} />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        
        {/* Headline con efectos */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 rounded-full glass border border-oe-gold/30 animate-fade-in">
            <span className="text-oe-gold font-bold text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              PACKS DISEÑADOS PARA TI
            </span>
          </div>
          
          <h2 className="text-h2 text-white mb-6 animate-fade-in-up">
            No Vendemos Equipos.
            <br />
            <span className="gradient-text-gold">Vendemos Momentos Inolvidables.</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Elige tu pack y empieza a imaginar las caras de los invitados
          </p>
        </div>

        {/* Grid de packs con efectos 3D */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {packs.map((pack, index) => {
            const Icon = pack.icon;
            const isHighlight = pack.highlight;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={pack.name}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group relative rounded-3xl p-8 transition-all duration-500 transform
                  ${isHighlight ? 'md:-translate-y-4 md:scale-105' : ''}
                  hover:scale-105 hover:-translate-y-2`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                {/* Glow de fondo animado */}
                <div 
                  className={`absolute -inset-1 bg-gradient-to-r ${pack.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500`}
                  style={{ 
                    boxShadow: isHovered ? `0 0 60px ${pack.glowColor}` : 'none',
                  }}
                />

                {/* Card principal con glass effect */}
                <div className={`relative glass-gold rounded-3xl p-8 h-full flex flex-col
                  ${isHighlight ? 'border-2 border-oe-gold shadow-oe-gold-lg' : 'border border-border'}`}
                >
                  {/* Badge más popular */}
                  {isHighlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-oe-gold to-oe-gold-light text-black text-xs font-black font-display shadow-oe-gold animate-pulse-glow">
                      ⭐ MÁS POPULAR
                    </div>
                  )}

                  {/* Badge de descuento */}
                  {pack.discount && (
                    <div className="absolute -top-3 -right-3 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-brutal animate-bounce">
                      <div className="text-center">
                        <div className="text-white font-black text-lg leading-none">-{pack.discount}</div>
                        <div className="text-white text-xs font-bold">OFF</div>
                      </div>
                    </div>
                  )}

                  {/* Icono con efecto de hover */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 relative
                    ${isHighlight ? 'bg-oe-gold/20' : 'bg-white/5'}
                    group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <Icon className={`w-8 h-8 ${isHighlight ? 'text-oe-gold' : 'text-white'} drop-shadow-glow`} />
                    
                    {/* Glow del icono */}
                    <div className="absolute inset-0 bg-oe-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Nombre y tagline */}
                  <h3 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 group-hover:text-oe-gold transition-colors">
                    {pack.name}
                  </h3>
                  <p className="text-sm font-bold text-oe-gold mb-4 uppercase tracking-wide">
                    {pack.tagline}
                  </p>

                  {/* Emoción (lo que realmente importa) */}
                  <div className="relative mb-6 p-4 rounded-xl bg-white/5 border border-oe-gold/20">
                    <p className="text-text-muted italic text-sm leading-relaxed">
                      "{pack.emotion}"
                    </p>
                    
                    {/* Quote mark decorativo */}
                    <div className="absolute -top-2 -left-2 text-4xl text-oe-gold/20 font-serif">"</div>
                  </div>

                  {/* Precio con tachado */}
                  <div className="mb-6">
                    {pack.originalPrice && (
                      <div className="text-sm text-text-muted line-through mb-1">
                        {pack.originalPrice}
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <div className={`text-4xl font-display font-black ${isHighlight ? 'gradient-text-gold' : 'text-white'}`}>
                        {pack.price}
                      </div>
                      {pack.discount && (
                        <span className="text-xs text-green-400 font-bold px-2 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                          ¡AHORRA {pack.discount}!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features con iconos */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {pack.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-3 text-text-muted group/item hover:text-white transition-colors"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <span className="text-sm leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA con efecto shine */}
                  <a
                    href={pack.ctaHref}
                    onClick={() => trackPackSelection({
                      packName: pack.name,
                      packType: pack.name.includes('Boda') ? 'boda' : pack.name.includes('Corporate') ? 'empresa' : 'fiesta',
                      price: parseInt(pack.price.match(/\d+/)?.[0] || '0')
                    })}
                    className={`group/btn relative inline-flex items-center justify-center gap-2 w-full rounded-xl px-6 py-4 font-bold font-display transition-all duration-300 overflow-hidden shine
                      ${isHighlight 
                        ? 'oe-btn-gold shadow-oe-gold-lg' 
                        : 'bg-white/5 border-2 border-oe-gold/30 text-white hover:border-oe-gold hover:bg-oe-gold/10'
                      }`}
                  >
                    <span className="relative z-10">{pack.ctaLabel}</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    
                    {/* Efecto de hover background */}
                    {!isHighlight && (
                      <div className="absolute inset-0 bg-gradient-to-r from-oe-gold/0 via-oe-gold/10 to-oe-gold/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                    )}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer de packs */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center gap-3 glass rounded-2xl px-8 py-4 border border-oe-gold/20">
            <Sparkles className="w-5 h-5 text-oe-gold animate-pulse" />
            <p className="text-white/70 text-sm">
              <span className="font-bold text-white">Todos los packs incluyen:</span> Configuración, prueba de sonido, técnico en el evento y desmontaje
            </p>
          </div>
        </div>

        {/* Garantía de satisfacción */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-green-400 text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Garantía Satisfacción </span>
          </div>
        </div>
      </div>
    </section>
  );
}
