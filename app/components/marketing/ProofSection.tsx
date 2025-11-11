'use client';

import { Star, Users, Calendar, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: Calendar, value: '+150',   label: 'Eventos realizados',     color: 'text-oe-gold' },
  { icon: Users,    value: '+5.000', label: 'Personas bailando',      color: 'text-oe-gold' },
  { icon: Star,     value: '4.9/5',  label: 'Valoración media',       color: 'text-oe-gold' },
  { icon: Award,    value: '92%',    label: 'Repiten o recomiendan',  color: 'text-oe-gold' },
];

const clientLogos = [
  { name: 'Camping la Maresma',        initial: 'CLM' },
  { name: 'Masia Can Massaguer',       initial: 'FEP' },
  { name: 'Motoffroadacademy',         initial: 'MOA' },
  { name: 'Ajuntament de Terrassa',    initial: 'ATS' },
  { name: 'Ametlla park zona motor',   initial: 'AZM' },
  { name: 'MG Estètica',               initial: 'MG' },
];

export default function ProofSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-bg-main to-bg-surface">
      <div className="mx-auto max-w-7xl px-4">
        {/* Encabezado SIEMPRE primero, mismo árbol en SSR y cliente */}
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

        {/* Stats grid SIEMPRE después */}
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
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Logos clientes */}
        <div className="text-center mb-8">
          <p className="text-sm text-text-muted mb-8">Confían en nosotros:</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {clientLogos.map((client, idx) => (
              <motion.div
                key={client.initial}
                className="group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.2 }}
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-bg-surface border border-border flex items-center justify-center group-hover:border-oe-gold/50 transition-all">
                  <div className="text-center">
                    <div className="text-lg font-bold text-oe-gold">{client.initial}</div>
                    <div className="text-[8px] text-text-muted mt-1 leading-tight">
                      {client.name.split(' ')[0]}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
