// app/components/utils/ScrollTracker.tsx
'use client';

import { useEffect } from 'react';
import { trackScrollDepth } from '@/lib/analytics';

/**
 * MANOLO'S SCROLL TRACKER
 * Mide qué tan profundo scrollean los usuarios
 * Ayuda a identificar dónde pierden interés
 */
export default function ScrollTracker() {
  useEffect(() => {
    // Milestones a trackear (25%, 50%, 75%, 100%)
    const milestones = [25, 50, 75, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableDistance = documentHeight - windowHeight;
      
      // Calcular porcentaje de scroll
      const scrollPercentage = (scrollTop / scrollableDistance) * 100;

      // Trackear cada milestone solo una vez
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          trackScrollDepth(milestone);
          
          // Log en desarrollo
          if (process.env.NODE_ENV === 'development') {
            console.log(`📜 Scroll ${milestone}% alcanzado`);
          }
        }
      });
    };

    // Throttle para evitar demasiados cálculos
    let timeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 200);
    };

    window.addEventListener('scroll', throttledScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  // Este componente no renderiza nada
  return null;
}
