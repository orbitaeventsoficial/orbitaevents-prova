'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ========================================
// TYPES
// ========================================

interface StickyCTAProps {
  phone?: string;
  message?: string;
  position?: 'left' | 'right';
  offsetBottom?: number;
  offsetSide?: number;
  showAfterScroll?: number;
}

// ========================================
// CONSTANTS
// ========================================

const DEFAULT_PHONE = '+34699121023';
const DEFAULT_MESSAGE = 'Hola, me interesa contratar Òrbita Events para mi evento';

// ========================================
// ANALYTICS
// ========================================

let trackEvent: (event: string, data?: any) => void = () => {};

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics')
    .then((mod) => {
      trackEvent = mod.track;
    })
    .catch(() => {
      // Silently fail
    });
}

// ========================================
// COMPONENT
// ========================================

export default function StickyCTA({
  phone = DEFAULT_PHONE,
  message = DEFAULT_MESSAGE,
  position = 'right',
  offsetBottom = 24,
  offsetSide = 24,
  showAfterScroll = 300,
}: StickyCTAProps) {
  // ========================================
  // STATE
  // ========================================
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  
  // ========================================
  // COMPUTED
  // ========================================
  
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  
  const positionClasses = position === 'left'
    ? `left-${offsetSide / 4} sm:left-${offsetSide / 4}`
    : `right-${offsetSide / 4} sm:right-${offsetSide / 4}`;
  
  // ========================================
  // SCROLL HANDLER (throttled)
  // ========================================
  
  const handleScroll = useCallback(() => {
    lastScrollY.current = window.scrollY;
    
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        setIsVisible(lastScrollY.current > showAfterScroll);
        ticking.current = false;
      });
      
      ticking.current = true;
    }
  }, [showAfterScroll]);
  
  // ========================================
  // EFFECTS
  // ========================================
  
  useEffect(() => {
    // Check initial scroll
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  // ========================================
  // HANDLERS
  // ========================================
  
  const handleClick = useCallback(() => {
    trackEvent('Click_Sticky_WhatsApp', {
      timestamp: new Date().toISOString(),
      scrollPosition: window.scrollY,
      position,
    });
  }, [position]);
  
  // ========================================
  // RENDER
  // ========================================
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed bottom-${offsetBottom / 4} ${positionClasses} z-40`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 0.9, 0.32, 1],
          }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex items-center justify-center
                     w-14 h-14 sm:w-16 sm:h-16
                     bg-[#25D366] hover:bg-[#20BA5A]
                     rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)]
                     hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)]
                     transition-all duration-300 ease-out
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50
                     active:scale-95"
            aria-label="Contactar por WhatsApp"
          >
            {/* WhatsApp Icon with pulse animation */}
            <motion.svg
              className="w-8 h-8 sm:w-9 sm:h-9 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 0.3,
              }}
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </motion.svg>
            
            {/* Ping animation (subtle pulse) */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" aria-hidden="true" />
            
            {/* Tooltip - desktop */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className={`hidden lg:block absolute ${
                    position === 'left' ? 'left-full ml-3' : 'right-full mr-3'
                  } top-1/2 -translate-y-1/2 pointer-events-none`}
                  initial={{ opacity: 0, x: position === 'left' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: position === 'left' ? -10 : 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="bg-[var(--bg-surface)] border-2 border-[#25D366]/50 text-white px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap"
                    role="tooltip"
                  >
                    <p className="font-bold text-[#25D366] text-sm">
                      ¿Tienes dudas?
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      Escríbenos por WhatsApp
                    </p>
                  </div>
                  
                  {/* Tooltip arrow */}
                  <div
                    className={`absolute ${
                      position === 'left' ? 'right-full' : 'left-full'
                    } top-1/2 -translate-y-1/2 
                               w-0 h-0 border-8 border-transparent ${
                      position === 'left' ? 'border-l-[#25D366]/50' : 'border-r-[#25D366]/50'
                    }`}
                    aria-hidden="true"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

