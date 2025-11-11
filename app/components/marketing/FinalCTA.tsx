// app/components/marketing/FinalCTA.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, MessageCircle, ArrowRight, Zap, Star } from 'lucide-react';

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

const WA_LINK = `https://wa.me/34699121023?text=${encodeURIComponent(
  '¡Hola! Quiero reservar fecha para mi evento'
)}`;

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-main to-bg-surface relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(215, 184, 110, 0.15), transparent 70%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Badge superior */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-oe-gold/20 border border-oe-gold px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4 text-oe-gold" />
            <span className="text-sm font-medium text-oe-gold">Últimas fechas disponibles</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl font-display font-black text-white mb-6 leading-tight">
            ¿Listo Para El Evento
            <br />
            <span className="gradient-text breathe">Que Tu Gente NO Olvidará?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-text-muted mb-10 leading-relaxed">
            Solo <span className="text-oe-gold font-bold">6 fechas disponibles este mes</span>.
            <br />
            Los fines de semana se llenan 6-8 semanas antes.{' '}
            <span className="text-white font-bold">Reserva YA.</span>
          </p>

          {/* Social proof mini */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-oe-gold fill-oe-gold" />
              <span className="text-white/80">4.9/5 · 300+ eventos</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-oe-gold" />
              <span className="text-white/80">92% repiten o recomiendan</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold text-xl px-10 py-6 inline-flex items-center justify-center gap-3 group"
              onClick={() => track('CTA_Final_Home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
              Reservar Mi Fecha
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="/servicios"
              className="oe-btn text-xl px-10 py-6 inline-flex items-center justify-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Todos los Servicios
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Small print */}
          <div className="space-y-2">
            <p className="text-sm text-text-muted">
              ⚡ Respondemos en menos de 2h (incluso fines de semana)
            </p>
            <p className="text-sm text-text-muted">
              💶 Señal 30% | Resto día evento
            </p>
            <p className="text-sm text-oe-gold font-bold">
              🎁 Reserva esta semana y te regalamos 1 hora extra de DJ
            </p>
          </div>
        </motion.div>

        {/* Trust badges mini */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-oe-gold/10 flex items-center justify-center">
              <span className="text-oe-gold font-bold text-xs">✓</span>
            </div>
            <span>Garantía pista llena</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-oe-gold/10 flex items-center justify-center">
              <span className="text-oe-gold font-bold text-xs">✓</span>
            </div>
            <span>Backup completo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-oe-gold/10 flex items-center justify-center">
              <span className="text-oe-gold font-bold text-xs">✓</span>
            </div>
            <span>Seguro RC 600k€</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
