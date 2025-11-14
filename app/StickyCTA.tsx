// app/components/ui/StickyCTA.tsx
'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

const WA_LINK = `https://wa.me/34699121023?text=${encodeURIComponent(
  '¡Hola! Quiero presupuesto para mi evento'
)}`;

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar después de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    track('Click_Sticky_WhatsApp', {
      timestamp: new Date().toISOString(),
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group relative flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-4 rounded-full shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulso animado de fondo */}
        <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />

        {/* Icono WhatsApp */}
        <MessageCircle className="w-6 h-6 relative z-10" />

        {/* Texto - solo visible en desktop */}
        <span className="hidden sm:inline relative z-10 font-bold">
          ¡Hablemos!
        </span>

        {/* Badge de notificación */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
          1
        </span>

        {/* Tooltip al hover - solo desktop */}
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden lg:block">
          <span className="bg-bg-surface border border-oe-gold/50 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
            <span className="block font-bold text-oe-gold">Presupuesto Rápido</span>
            <span className="block text-sm text-white/70">Respuesta en 2h 📱</span>
          </span>
        </span>
      </motion.a>

      {/* Texto debajo - solo mobile */}
      <motion.p
        className="sm:hidden text-xs text-white/60 mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Respuesta rápida 📱
      </motion.p>
    </motion.div>
  );
}
