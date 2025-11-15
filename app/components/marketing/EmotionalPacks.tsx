// app/components/marketing/EmotionalPacks.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Heart, Building2, Zap } from 'lucide-react';
import { trackPackSelection } from '@/lib/analytics';
import { getAllPacks, type PackDefinition } from '@/data/packs-config';

// Mapeo directo de packs-config → componente
const mapPack = (pack: PackDefinition): Pack => ({
  id: pack.id,
  name: pack.name,
  tagline: pack.tagline,
  emotion: pack.emotion || 'Un momento que no olvidarás.',
  price: pack.priceValue,
  originalPrice: pack.priceOriginal ? parseInt(pack.priceOriginal.replace('€', '')) : undefined,
  discount: pack.priceOriginal ? Math.round((1 - pack.priceValue / parseInt(pack.priceOriginal.replace('€', ''))) * 100) : undefined,
  features: pack.features,
  highlight: pack.highlight || false,
  ctaLabel: pack.cta || 'Quiero este pack',
  ctaHref: `/packs#${pack.id}`,
  gradient: pack.service === 'bodas' ? 'from-pink-500/20 via-red-500/20 to-orange-500/20' :
           pack.service === 'empresas' ? 'from-blue-500/20 via-indigo-500/20 to-purple-500/20' :
           'from-green-500/20 via-emerald-500/20 to-teal-500/20',
  glowColor: pack.service === 'bodas' ? 'rgba(236, 72, 153, 0.3)' :
             pack.service === 'empresas' ? 'rgba(99, 102, 241, 0.3)' :
             'rgba(34, 197, 94, 0.3)',
  icon: pack.service === 'bodas' ? 'heart' : pack.service === 'empresas' ? 'building' : 'sparkles',
});

type Pack = ReturnType<typeof mapPack>;

export default function EmotionalPacks() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // SIN API → DIRECTO DE packs-config.ts
  useEffect(() => {
    const data = getAllPacks()
      .filter(p => p.service !== 'alquiler') // excluye alquiler
      .slice(0, 3) // solo 3 principales
      .map(mapPack);
    setPacks(data);
  }, []);

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
      {/* ... fondo aurora igual ... */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-main via-bg-surface to-bg-main" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-oe-gold/10 rounded-full blur-3xl animate-aurora" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-aurora" style={{ animationDelay: '5s' }} />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
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

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {packs.map((pack, index) => {
            const Icon = iconMap[pack.icon];
            const isHighlight = pack.highlight;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={pack.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group relative rounded-3xl p-8 transition-all duration-500 transform
                  ${isHighlight ? 'md:-translate-y-4 md:scale-105' : ''}
                  hover:scale-105 hover:-translate-y-2`}
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                <div className={`relative glass-gold rounded-3xl p-8 h-full flex flex-col
                  ${isHighlight ? 'border-2 border-oe-gold shadow-oe-gold-lg' : 'border border-border'}`}
                >
                  {isHighlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-oe-gold to-oe-gold-light text-black text-xs font-black font-display shadow-oe-gold animate-pulse-glow">
                      ⭐ MÁS POPULAR
                    </div>
                  )}

                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 relative
                    ${isHighlight ? 'bg-oe-gold/20' : 'bg-white/5'}
                    group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <Icon className={`w-8 h-8 ${isHighlight ? 'text-oe-gold' : 'text-white'} drop-shadow-glow`} />
                    <div className="absolute inset-0 bg-oe-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-display font-black text-white mb-2 group-hover:text-oe-gold transition-colors">
                    {pack.name}
                  </h3>
                  <p className="text-sm font-bold text-oe-gold mb-4 uppercase tracking-wide">
                    {pack.tagline}
                  </p>

                  <div className="relative mb-6 p-4 rounded-xl bg-white/5 border border-oe-gold/20">
                    <p className="text-text-muted italic text-sm leading-relaxed">
                      "{pack.emotion}"
                    </p>
                    <div className="absolute -top-2 -left-2 text-4xl text-oe-gold/20 font-serif">"</div>
                  </div>

                  <div className="mb-6">
                    {pack.originalPrice && (
                      <div className="text-sm text-text-muted line-through mb-1">
                        {pack.originalPrice}€
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <div className={`text-4xl font-display font-black ${isHighlight ? 'gradient-text-gold' : 'text-white'}`}>
                        desde {pack.price}€
                      </div>
                      {pack.discount && (
                        <span className="text-xs text-green-400 font-bold px-2 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                          ¡AHORRA {pack.discount}%!
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {pack.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-muted group/item hover:text-white transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-oe-gold flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <span className="text-sm leading-snug">{feature}</span>
                      </li>
                    ))}
                    {pack.features.length > 5 && (
                      <li className="text-xs text-text-muted/70">
                        +{pack.features.length - 5} detalles más
                      </li>
                    )}
                  </ul>

                  <a
                    href={pack.ctaHref}
                    onClick={() => trackPackSelection({
                      packId: pack.id as any,
                      packType: pack.name.includes('Boda') ? 'boda' : pack.name.includes('Corporate') ? 'empresa' : 'fiesta'
                    })}
                    className={`group/btn relative inline-flex items-center justify-center gap-2 w-full rounded-xl px-6 py-4 font-bold font-display transition-all duration-300 overflow-hidden shine
                      ${isHighlight 
                        ? 'oe-btn-gold shadow-oe-gold-lg' 
                        : 'bg-white/5 border-2 border-oe-gold/30 text-white hover:border-oe-gold hover:bg-oe-gold/10'
                      }`}
                  >
                    <span className="relative z-10">{pack.ctaLabel}</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const iconMap = {
  heart: Heart,
  building: Building2,
  sparkles: Sparkles,
};