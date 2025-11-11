// app/components/marketing/VideoTestimonials.tsx
'use client';

import { motion } from 'framer-motion';
import { Star, Play, Quote, Users, MapPin } from 'lucide-react';

const testimonials = [
  {
    name: 'Marc & Laura',
    event: 'Boda',
    location: 'Barcelona',
    date: 'Julio 2024',
    rating: 5,
    quote:
      'La mejor decisión que tomamos para nuestra boda. La pista estuvo LLENA desde las 23h hasta las 5am. El DJ supo exactamente qué poner en cada momento. Brutal.',
    image: '💍',
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    name: 'Carlos',
    event: 'Cumpleaños 30',
    location: 'Lleida',
    date: 'Septiembre 2024',
    rating: 5,
    quote:
      'Contraté el pack Premium y mis amigos AÚN me preguntan dónde encontré al DJ. Las luces sincronizadas + efectos especiales fueron espectaculares. Repetiría 100%.',
    image: '🎂',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    name: 'Empresa Tech SL',
    event: 'Cena de Empresa',
    location: 'Girona',
    date: 'Diciembre 2023',
    rating: 5,
    quote:
      'Necesitábamos un evento corporativo profesional. Òrbita nos entregó exactamente eso: factura inmediata, equipamiento top, coordinación perfecta. El equipo TODAVÍA habla del evento.',
    image: '💼',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
];

export default function VideoTestimonials() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-main to-bg-surface">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
              Lo Que Dicen
              <br />
              <span className="text-oe-gold">Quienes Ya Confiaron</span>
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              No te fíes de nosotros. Lee lo que dicen las personas que ya contrataron Òrbita para sus
              eventos.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="group relative rounded-3xl overflow-hidden bg-bg-surface border border-border hover:border-oe-gold/50 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Video placeholder / Image */}
              <div className={`relative aspect-video bg-gradient-to-br ${testimonial.color} flex items-center justify-center overflow-hidden`}>
                <div className="text-8xl opacity-50">{testimonial.image}</div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-oe-gold flex items-center justify-center">
                    <Play className="w-8 h-8 text-black ml-1" />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-oe-gold text-oe-gold" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quote */}
                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-oe-gold/30 absolute -top-2 -left-1" />
                  <p className="text-white italic leading-relaxed pl-6">"{testimonial.quote}"</p>
                </div>

                {/* Author info */}
                <div className="flex items-start gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-oe-gold/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-oe-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-text-muted">{testimonial.event}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                      <span>•</span>
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-text-muted mb-4">¿Quieres que tu evento sea el próximo testimonio?</p>
          <a
            href="https://wa.me/34699121023?text=Hola,%20quiero%20que%20mi%20evento%20sea%20épico"
            target="_blank"
            rel="noopener noreferrer"
            className="oe-btn-gold inline-flex items-center gap-2"
          >
            Reservar Mi Fecha
          </a>
        </motion.div>
      </div>
    </section>
  );
}
