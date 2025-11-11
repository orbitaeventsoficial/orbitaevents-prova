// app/components/ui/StickyCTA.tsx
'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Calendar, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

const WA_LINK = `https://wa.me/34699121023?text=${encodeURIComponent(
  '¡Hola! Quiero presupuesto rápido para mi evento'
)}`;

// Copy rotativo para crear urgencia
const rotatingCopy = [
  { text: 'Presupuesto en 2h', icon: Zap,       bg: 'from-oe-gold to-yellow-500' },
  { text: '20% OFF hoy',       icon: Sparkles,  bg: 'from-oe-gold to-amber-500' },
  { text: 'Solo 3 fechas libres', icon: Calendar, bg: 'from-oe-gold to-orange-500' },
] as const;

export default function StickyCTA() {
  const [confetti, setConfetti] = useState(false);
  const [currentCopyIndex, setCurrentCopyIndex] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Rotación del copy cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCopyIndex((prev) => (prev + 1) % rotatingCopy.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Tamaño confetti
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Retraso de visibilidad
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Índice y valores seguros
  const safeIndex =
    rotatingCopy.length > 0
      ? ((currentCopyIndex % rotatingCopy.length) + rotatingCopy.length) % rotatingCopy.length
      : 0;

  const currentCopy = rotatingCopy[safeIndex] ?? { text: 'WhatsApp', icon: MessageCircle, bg: 'from-oe-gold to-amber-500' };
  const Icon = currentCopy.icon ?? MessageCircle;
  const bg = currentCopy.bg ?? 'from-oe-gold to-amber-500';

  const handleClick = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);

    // Track evento con texto seguro
    track('Click_Sticky_CTA', {
      copy: currentCopy?.text ?? 'WhatsApp',
      timestamp: new Date().toISOString(),
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Confetti */}
      {confetti && size.w > 0 && (
        <Confetti
          width={size.w}
          height={size.h}
          recycle={false}
          numberOfPieces={150}
          gravity={0.3}
          colors={['#d7b86e', '#f8e5a1', '#b9994b', '#ffffff']}
          className="pointer-events-none"
        />
      )}

      {/* Sticky CTA */}
      <motion.div
        className="fixed bottom-6 left-4 right-4 z-50 pointer-events-none md:bottom-8 md:left-8 md:right-auto"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto group relative inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-black font-display text-base font-bold border border-oe-gold/60 shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${bg.replace('from-', '#').replace('to-', ', #')})`,
            boxShadow:
              '0 0 0 1px rgba(215,184,110,.3), 0 20px 50px rgba(215,184,110,.4), 0 0 60px rgba(215,184,110,.3)',
          }}
          onClick={handleClick}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contactar por WhatsApp para presupuesto rápido"
        >
          {/* Barrido brillante */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Icons */}
          <MessageCircle className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
          <Icon className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />

          {/* Texto rotativo */}
          <AnimatePresence mode="wait">
            <motion.span
              key={safeIndex}
              className="hidden sm:inline relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentCopy.text}
            </motion.span>
          </AnimatePresence>

          {/* Texto móvil estático */}
          <span className="sm:hidden relative z-10">WhatsApp</span>

          {/* Indicador pulso */}
          <motion.span
            className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.a>

        {/* Nota bajo CTA */}
        <motion.p
          className="text-xs text-white/60 mt-2 ml-2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ⚡ Respuesta en menos de 2 horas
        </motion.p>
      </motion.div>
    </>
  );
}
