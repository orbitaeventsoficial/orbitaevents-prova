// app/not-found.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Home, MessageCircle, Sparkles, Search, ArrowRight } from 'lucide-react';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const quickLinks = [
  { name: 'Bodas', href: '/servicios/bodas', icon: '💍' },
  { name: 'Discomóvil', href: '/servicios/discomobil', icon: '🎵' },
  { name: 'Fiestas', href: '/servicios/fiestas', icon: '🎉' },
  { name: 'Empresas', href: '/servicios/empresas', icon: '💼' },
  { name: 'Alquiler', href: '/servicios/alquiler', icon: '📦' },
  { name: 'Contacto', href: '/contacto', icon: '📞' },
];

export default function NotFound() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [enableFX, setEnableFX] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnableFX(!media.matches);
    const onChange = (e: MediaQueryListEvent) => setEnableFX(!e.matches);
    media.addEventListener?.('change', onChange);

    // Confetti inicial
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);

    return () => {
      window.removeEventListener('resize', onResize);
      media.removeEventListener?.('change', onChange);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-24 text-center relative min-h-screen flex flex-col items-center justify-center">
      {/* Confetti effect */}
      {enableFX && size.w > 0 && showConfetti && (
        <Confetti
          width={size.w}
          height={size.h}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#d7b86e', '#f8e5a1', '#b9994b', '#ffffff']}
        />
      )}

      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(215, 184, 110, 0.08), transparent 70%)',
        }}
      />

      {/* 404 Number */}
      <motion.div
        className="mb-8"
        initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 360, opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <div className="text-[12rem] md:text-[16rem] font-black text-oe-gold/20 leading-none">
          404
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-black mb-4 gradient-text">
          Página Perdida en el Espacio
        </h1>
        <p className="text-xl text-text-muted mb-10 leading-relaxed">
          Esta página se fue de fiesta y no volvió.
          <br />
          Pero <span className="text-oe-gold font-bold">tu evento puede ser épico</span>. Reserva
          ahora.
        </p>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p className="text-sm text-text-muted mb-4 flex items-center justify-center gap-2">
          <Search className="w-4 h-4" />
          ¿Buscabas alguno de estos?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-surface border border-border hover:border-oe-gold/50 hover:bg-bg-card transition-all text-sm font-medium"
            >
              <span>{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Main Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <Link
          href="/"
          className="oe-btn inline-flex items-center justify-center gap-2 group"
          aria-label="Volver al inicio"
        >
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Volver al Inicio
        </Link>

        <Link
          href="/contacto"
          className="oe-btn-gold inline-flex items-center justify-center gap-2 group"
          aria-label="Ir a contacto para pedir presupuesto"
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Pedir Presupuesto
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Fun fact */}
      <motion.p
        className="text-sm text-text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        🎉 Dato curioso: El 94% de nuestros eventos tienen la pista llena hasta las 4am.
        <br />
        <span className="text-oe-gold">Incluye el tuyo en esa estadística.</span>
      </motion.p>
    </main>
  );
}
