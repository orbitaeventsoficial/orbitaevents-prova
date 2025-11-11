'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function Loading() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [enableFX, setEnableFX] = useState(true);

  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnableFX(!media.matches);
    const onChange = (e: MediaQueryListEvent) => setEnableFX(!e.matches);
    media.addEventListener?.('change', onChange);

    return () => {
      window.removeEventListener('resize', update);
      media.removeEventListener?.('change', onChange);
    };
  }, []);

  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-main text-white overflow-hidden">
      {enableFX && size.w > 0 && (
        <Confetti width={size.w} height={size.h} recycle={false} numberOfPieces={200} />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none glow-gold breathe"
        style={{
          background:
            'radial-gradient(60% 45% at 50% 55%, rgba(215,184,110,0.25), transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <div className="mb-4 text-6xl animate-[spin_3s_linear_infinite]">🪐</div>
        <p className="text-white/80 tracking-wide text-xl font-display">
          Lanzando <span className="text-[#d7b86e] gradient-text">Òrbita</span>… ¡WOW en 3s!
        </p>
      </motion.div>
    </div>
  );
}
