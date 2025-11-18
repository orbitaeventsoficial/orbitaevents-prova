'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Calculator, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ========================================
// ANALYTICS HELPER
// ========================================

let trackEvent: (event: string, data?: any) => void = () => {};

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics')
    .then((mod) => {
      trackEvent = mod.track;
    })
    .catch(() => {
      // Silently fail if analytics not available
    });
}

// ========================================
// CONSTANTS
// ========================================

const SCROLL_THRESHOLD = 400; // Show after 400px scroll
const ANIMATION_DELAY = 500; // Initial delay before first show

// ========================================
// COMPONENT
// ========================================

export default function ConfiguradorSticky() {
  // ========================================
  // STATE
  // ========================================
  
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  
  // ========================================
  // SCROLL HANDLER (throttled)
  // ========================================
  
  const handleScroll = useCallback(() => {
    lastScrollY.current = window.scrollY;
    
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrolled = lastScrollY.current > SCROLL_THRESHOLD;
        setHasScrolled(scrolled);
        ticking.current = false;
      });
      
      ticking.current = true;
    }
  }, []);
  
  // ========================================
  // EFFECTS
  // ========================================
  
  useEffect(() => {
    // Check initial scroll position
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  useEffect(() => {
    if (hasScrolled && !isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, ANIMATION_DELAY);
      
      return () => clearTimeout(timer);
    }
  }, [hasScrolled, isVisible]);
  
  // ========================================
  // HANDLERS
  // ========================================
  
  const handleClick = useCallback(() => {
    trackEvent('Click_Sticky_Configurador', {
      timestamp: new Date().toISOString(),
      scrollPosition: window.scrollY,
    });
  }, []);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    },
    []
  );
  
  // ========================================
  // RENDER
  // ========================================
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-6 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 0.9, 0.32, 1],
          }}
          onKeyDown={handleKeyDown}
        >
          <Link
            href="/configurador"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative flex items-center gap-3 
                     bg-gradient-to-r from-[#d7b86e] via-[#e5c982] to-[#d7b86e]
                     hover:from-[#e5c982] hover:via-[#f8e5a1] hover:to-[#e5c982]
                     text-black pl-4 pr-5 py-3 rounded-full 
                     shadow-[0_8px_30px_rgba(215,184,110,0.4)]
                     hover:shadow-[0_12px_40px_rgba(215,184,110,0.6)]
                     transition-all duration-300 ease-out
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d7b86e]/50
                     active:scale-95"
            aria-label="Ir al configurador de presupuestos"
          >
            {/* Icon with animation */}
            <motion.div
              animate={{
                rotate: isHovered ? [0, 10, -10, 0] : 0,
              }}
              transition={{
                duration: 0.6,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 0.5,
              }}
            >
              <Calculator className="w-6 h-6 relative z-10" aria-hidden="true" />
            </motion.div>
            
            {/* Text - desktop only */}
            <span className="hidden sm:inline relative z-10 font-bold text-sm">
              Calcula Precio
            </span>
            
            {/* Sparkle badge */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <Sparkles
                className="w-5 h-5 text-yellow-300 fill-yellow-300 drop-shadow-lg"
                aria-hidden="true"
              />
            </motion.div>
            
            {/* Tooltip - desktop */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="hidden lg:block absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="bg-[#111214] border-2 border-[#d7b86e]/50 text-white px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap"
                    role="tooltip"
                  >
                    <p className="font-bold text-[#d7b86e] text-sm">
                      Presupuesto en 3 min ⚡
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      Sin compromiso • Gratis
                    </p>
                  </div>
                  
                  {/* Tooltip arrow */}
                  <div
                    className="absolute right-full top-1/2 -translate-y-1/2 
                               w-0 h-0 border-8 border-transparent border-r-[#d7b86e]/50"
                    aria-hidden="true"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          
          {/* Mobile label */}
          <motion.p
            className="sm:hidden text-xs text-white/70 mt-2 text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ⚡ 3 min
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
