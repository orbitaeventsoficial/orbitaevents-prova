
'use client';
import React from 'react';   // ← ESTA LÍNEA FALTABA
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { trackPackSelection } from '@/lib/analytics';
import { getPacksByService, type PackDefinition } from '@/data/packs-config';

// ========================================
// TYPES
// ========================================

interface PackCardProps {
  pack: PackDefinition;
  isSelected: boolean;
  onSelect: (packId: string) => void;
}

// ========================================
// PACK CARD COMPONENT (Memoized)
// ========================================

function PackCard({ pack, isSelected, onSelect }: PackCardProps) {
  const handleClick = useCallback(() => {
    onSelect(pack.id);
  }, [pack.id, onSelect]);
  
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(pack.id);
      }
    },
    [pack.id, onSelect]
  );
  
  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Seleccionar ${pack.name}, precio desde ${pack.priceValue} euros`}
      className={`
        group relative p-6 rounded-2xl border-2 cursor-pointer 
        transition-all duration-300 ease-out
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d7b86e]/50
        hover:scale-[1.02] active:scale-[0.98]
        ${
          isSelected
            ? 'border-[#d7b86e] bg-[#d7b86e]/10 shadow-[0_0_30px_rgba(215,184,110,0.3)]'
            : 'border-white/10 bg-[#111214] hover:border-white/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
        }
      `}
    >
      {/* Badge si existe */}
      {pack.badge && (
        <div
          className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#d7b86e] to-[#f8e5a1] 
                     text-black text-xs font-bold shadow-lg"
          aria-label={pack.badge}
        >
          {pack.badge}
        </div>
      )}
      
      {/* Header */}
      <div className="mb-4">
        <h3
          className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#d7b86e] transition-colors"
          id={`pack-${pack.id}-title`}
        >
          {pack.name}
        </h3>
        
        {pack.tagline && (
          <p className="text-sm text-white/60 mb-3">{pack.tagline}</p>
        )}
        
        <div className="flex items-baseline gap-2">
          <span
            className="text-2xl md:text-3xl font-bold text-[#d7b86e]"
            aria-label={`Precio: ${pack.priceValue} euros`}
          >
            {pack.priceValue}€
          </span>
          
          {pack.priceOriginal && (
            <span
              className="text-lg text-white/40 line-through"
              aria-label={`Precio original: ${pack.priceOriginal}`}
            >
              {pack.priceOriginal}
            </span>
          )}
        </div>
        
        {pack.duration && (
          <p className="text-sm text-white/50 mt-1">{pack.duration}</p>
        )}
      </div>
      
      {/* Features */}
      <ul
        className="space-y-2 mb-6 text-sm text-white/70"
        aria-labelledby={`pack-${pack.id}-title`}
      >
        {pack.features.slice(0, 5).map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-[#d7b86e] mt-0.5 flex-shrink-0" aria-hidden="true">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
        
        {pack.features.length > 5 && (
          <li className="text-[#d7b86e] text-xs">
            + {pack.features.length - 5} características más
          </li>
        )}
      </ul>
      
      {/* Ideal para */}
      {pack.ideal && (
        <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-white/50 mb-1">Ideal para:</p>
          <p className="text-sm text-white/80">{pack.ideal}</p>
        </div>
      )}
      
      {/* CTA Button */}
      <button
        onClick={handleClick}
        className={`
          w-full py-3 rounded-xl font-bold text-sm md:text-base
          transition-all duration-300
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d7b86e]/50
          ${
            isSelected
              ? 'bg-gradient-to-r from-[#d7b86e] to-[#f8e5a1] text-black shadow-lg hover:shadow-xl'
              : 'bg-[#d7b86e] text-black hover:bg-[#f8e5a1] shadow-md hover:shadow-lg'
          }
        `}
        aria-label={pack.cta || 'Reservar este pack'}
      >
        {isSelected ? '✓ Seleccionado' : pack.cta || 'Seleccionar Pack'}
      </button>
      
      {/* Emotion tagline (si existe) */}
      {pack.emotion && !isSelected && (
        <p className="mt-3 text-xs text-white/40 italic text-center">
          {pack.emotion}
        </p>
      )}
    </div>
  );
}

// Memoize para evitar re-renders innecesarios
const MemoizedPackCard = React.memo(PackCard);

// ========================================
// MAIN CLIENT COMPONENT
// ========================================

export default function PacksClient() {
  // ========================================
  // STATE
  // ========================================
  
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // ========================================
  // DATA FETCHING (memoized)
  // ========================================
  
  const packs = useMemo(() => {
    try {
      return getPacksByService('fiestas');
    } catch (err) {
      console.error('[PacksClient] Error loading packs:', err);
      setError('Error al cargar los packs. Por favor, recarga la página.');
      return [];
    }
  }, []);
  
  // ========================================
  // EFFECTS
  // ========================================
  
  // Simulate loading state (remove in production if data is instant)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Scroll to selected pack on mobile
  useEffect(() => {
    if (!selected || !containerRef.current) return;
    
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    
    const selectedCard = containerRef.current.querySelector(
      `[aria-label*="${selected}"]`
    );
    
    if (selectedCard) {
      selectedCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selected]);
  
  // ========================================
  // HANDLERS
  // ========================================
  
  const handleSelect = useCallback((packId: string) => {
    setSelected(packId);
    
    // Analytics tracking
    try {
      trackPackSelection({ packId, packType: 'fiesta' });
    } catch (err) {
      console.warn('[PacksClient] Analytics tracking failed:', err);
    }
  }, []);
  
  // ========================================
  // LOADING STATE
  // ========================================
  
  if (isLoading) {
    return (
      <section
        className="mx-auto max-w-7xl px-4 py-20"
        aria-busy="true"
        aria-label="Cargando packs"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border-2 border-white/10 bg-[#111214] animate-pulse"
              aria-hidden="true"
            >
              <div className="h-8 bg-white/10 rounded mb-4 w-3/4" />
              <div className="h-6 bg-white/10 rounded mb-6 w-1/2" />
              <div className="space-y-2 mb-6">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 bg-white/10 rounded w-full" />
                ))}
              </div>
              <div className="h-12 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  // ========================================
  // ERROR STATE
  // ========================================
  
  if (error) {
    return (
      <section
        className="mx-auto max-w-5xl px-4 py-20 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="p-8 rounded-2xl bg-red-500/10 border-2 border-red-500/30">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
          >
            Recargar Página
          </button>
        </div>
      </section>
    );
  }
  
  // ========================================
  // EMPTY STATE
  // ========================================
  
  if (packs.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <p className="text-white/70 text-lg">
          No hay packs disponibles en este momento.
        </p>
      </section>
    );
  }
  
  // ========================================
  // MAIN RENDER
  // ========================================
  
  return (
    <section
      ref={containerRef}
      className="mx-auto max-w-7xl px-4 py-12 md:py-20"
      aria-label="Selección de packs de eventos"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          <span className="gradient-text-gold">Packs de Fiestas</span>
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Selecciona el pack perfecto para tu evento. Todos incluyen DJ profesional,
          sonido de alta potencia y efectos de iluminación.
        </p>
      </div>
      
      {/* Grid de Packs */}
      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Lista de packs disponibles"
      >
        {packs.map((pack) => (
          <MemoizedPackCard
            key={pack.id}
            pack={pack}
            isSelected={selected === pack.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
      
      {/* Selected Pack Info */}
      {selected && (
        <div
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#d7b86e]/10 to-transparent border-2 border-[#d7b86e]/30"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-white text-center">
            <strong className="text-[#d7b86e]">Pack seleccionado:</strong>{' '}
            {packs.find((p) => p.id === selected)?.name}
          </p>
          <p className="text-white/60 text-sm text-center mt-2">
            Continúa al configurador o contacta por WhatsApp para reservar
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a
              href="/configurador"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#d7b86e] to-[#f8e5a1] text-black font-bold text-center
                       hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
            >
              Ir al Configurador →
            </a>
            
            <a
              href="https://wa.me/34699121023?text=Hola%2C%20me%20interesa%20el%20pack%20de%20fiestas"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl border-2 border-[#d7b86e] text-[#d7b86e] font-bold text-center
                       hover:bg-[#d7b86e] hover:text-black transition-all"
            >
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      )}
      
      {/* Trust signals */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { icon: '⚡', text: 'Respuesta en 24h' },
          { icon: '🔒', text: 'Pago seguro' },
          { icon: '🎵', text: 'DJ profesional' },
          { icon: '✨', text: 'Garantía total' },
        ].map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#d7b86e]/50 transition-colors"
          >
            <div className="text-3xl mb-2" aria-hidden="true">
              {item.icon}
            </div>
            <p className="text-sm text-white/70">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
