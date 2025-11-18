// app/components/marketing/ProofSection.tsx
'use client';

import { Star, Users, Calendar, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { icon: Calendar, value: '+150', label: 'Eventos realizados', color: 'text-oe-gold' },
  { icon: Users, value: '+5.000', label: 'Personas bailando', color: 'text-oe-gold' },
  { icon: Star, value: '4.9/5', label: 'Valoración media', color: 'text-oe-gold' },
  { icon: Award, value: '92%', label: 'Repiten o recomiendan', color: 'text-oe-gold' },
];

const clientLogos = [
  { src: '/img/logos/cliente1.webp', alt: 'Moto Offroad Academy' },
  { src: '/img/logos/cliente2.webp', alt: 'Masia El Massaguer' },
  { src: '/img/logos/cliente3.webp', alt: 'AECC' },
  { src: '/img/logos/cliente4.webp', alt: 'Clap' },
  { src: '/img/logos/cliente5.webp', alt: 'Ajuntament de Granollers' },
  { src: '/img/logos/cliente6.webp', alt: 'Ajuntament de Terrassa' },
  { src: '/img/logos/cliente7.webp', alt: 'MG Medicina Estètica' },
  { src: '/img/logos/cliente8.webp', alt: 'Zona Motor L\'Ametlla Park' },

].filter(Boolean);

export default function ProofSection() {
  const validLogos = clientLogos.filter(logo => logo.src);
  if (validLogos.length === 0) return null;

  const containerSize = 'w-40 h-40';
  const logoWidth = 180;
  const itemWidth = 160 + 32;

  // DUPLICAR SOLO LOS LOGOS VÁLIDOS → LOOP PERFECTO SIN HUECOS
  const loopLogos = [...validLogos, ...validLogos];
  const translateDistance = -(itemWidth * validLogos.length);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-bg-main to-bg-surface">
      <div className="mx-auto max-w-7xl px-4">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-oe-gold/20 border border-oe-gold px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="w-4 h-4 text-oe-gold" />
            <span className="text-sm font-medium text-oe-gold">Prueba social</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Los números <span className="text-oe-gold">no mienten</span>
          </h2>

          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            +150 eventos en toda Catalunya. Miles de personas bailando.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.25 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-oe-gold/10 flex items-center justify-center">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-2">{stat.value}</div>
                <p className="text-base text-text-muted font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CARRUSEL: LOOP LIMPIO → SOLO LOGOS EXISTENTES */}
        <div className="overflow-hidden">
          <h3 className="text-center text-2xl md:text-3xl font-display font-bold text-white mb-8">
            Confían en nosotros <span className="text-oe-gold">las siguientes marcas</span>
          </h3>
          
          <div className="relative">
            {/* Fade lateral */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-surface to-transparent z-10 pointer-events-none" />

            {/* Carrusel */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8 items-center"
                animate={{ x: [0, translateDistance] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20 + (validLogos.length * 1.5),
                    ease: "linear",
                  },
                }}
              >
                {loopLogos.map((logo, idx) => (
                  <div
                    key={`${logo.alt}-${idx}`}
                    className={`flex-shrink-0 ${containerSize}`}
                  >
                    <div className="relative w-full h-full rounded-3xl border border-gray-700 p-3 flex items-center justify-center group transition-all duration-300">
                      {/* GLOW VISIBLE + ANIMADO */}
                      <div className="absolute inset-0 rounded-3xl bg-oe-gold/30 blur-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />
                      <div className="absolute inset-0 rounded-3xl bg-oe-gold/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
                      
                      {/* LOGO */}
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logoWidth}
                        height={logoWidth}
                        className="object-contain w-full h-full relative z-10 drop-shadow-lg"
                        loading="lazy"
                        onError={(e) => {
                          // Si falla → se elimina del DOM → loop se ajusta solo
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.parentElement?.remove();
                        }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
