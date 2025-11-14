// app/components/marketing/TransformationSection.tsx
'use client';

import { motion } from 'framer-motion';
import { X, Check, Sparkles } from 'lucide-react';

const comparisons = [
  {
    wrong: 'Playlist de Spotify en aleatorio',
    problem: 'Pista vacía a medianoche, gente aburrida',
    right: 'DJ que LEE la pista en tiempo real',
    benefit: 'Adapta música al ambiente. Invitados que disfrutan.',
  },
  {
    wrong: 'Luces estáticas aburridas',
    problem: '"Estuvo bien... pero nada especial"',
    right: 'Luces sincronizadas con música',
    benefit: 'Cada cambio = nuevo ambiente. IMPACTO visual.',
  },
  {
    wrong: 'Equipamiento cutre de Amazon',
    problem: 'Sonido distorsionado, problemas técnicos',
    right: 'Equipamiento profesional EV + Pioneer',
    benefit: 'Sonido cristalino 4000W. Backup completo. CERO problemas.',
  },
];

export default function TransformationSection() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-main to-bg-surface">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-oe-gold/20 border border-oe-gold px-4 py-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-oe-gold" />
            <span className="text-sm font-medium text-oe-gold">La diferencia es BRUTAL</span>
          </motion.div>

          <h2 className="text-h2 text-white mb-6">
            Evento Normalito vs
            <br />
            <span className="text-oe-gold">Evento Òrbita</span>
          </h2>

          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            La diferencia entre una fiesta "que estuvo bien" y una fiesta{' '}
            <span className="text-oe-gold font-bold">que se recordará durante años</span>.
          </p>
        </div>

        <div className="space-y-8">
          {comparisons.map((comparison, idx) => (
            <motion.div
              key={idx}
              className="grid md:grid-cols-2 gap-6 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* PROBLEMA */}
              <div className="relative rounded-3xl border-2 border-red-500/30 bg-red-500/5 p-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <X className="w-4 h-4" />
                  OTROS
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 mt-2">{comparison.wrong}</h3>
                <p className="text-red-400 italic">"{comparison.problem}"</p>
              </div>

              {/* SOLUCIÓN */}
              <div className="relative rounded-3xl border-2 border-oe-gold bg-oe-gold/5 p-8 shadow-oe-glow">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-oe-gold text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  CON ÒRBITA
                </div>
                <h3 className="text-2xl font-bold text-oe-gold mb-3 mt-2">{comparison.right}</h3>
                <p className="text-white">{comparison.benefit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
