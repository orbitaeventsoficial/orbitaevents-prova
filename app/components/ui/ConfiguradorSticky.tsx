// app/components/ui/ConfiguradorSticky.tsx
'use client';

import { useState, useEffect } from 'react';
import { Calculator, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

export default function ConfiguradorSticky() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    track('Click_Sticky_Configurador', {
      timestamp: new Date().toISOString(),
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
    >
      <Link
        href="/configurador"
        onClick={handleClick}
        className="group relative flex items-center gap-3 bg-gradient-to-r from-oe-gold to-yellow-500 hover:from-yellow-500 hover:to-oe-gold text-black pl-4 pr-5 py-3 rounded-full shadow-2xl transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Calculator className="w-6 h-6 relative z-10" />
        </motion.div>

        {/* Texto desktop */}
        <span className="hidden sm:inline relative z-10 font-bold text-sm">
          Calcula Precio
        </span>

        {/* Badge sparkle */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
        </motion.div>

        {/* Tooltip hover - desktop */}
        <div className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-bg-surface border border-oe-gold/50 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
            <p className="font-bold text-oe-gold">Presupuesto en 3 min ⚡</p>
            <p className="text-xs text-white/70">Sin compromiso</p>
          </div>
        </div>
      </Link>

      {/* Texto mobile debajo */}
      <motion.p
        className="sm:hidden text-xs text-white/60 mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        ⚡ 3 min
      </motion.p>
    </motion.div>
  );
}
