// app/components/marketing/UrgencyBanner.tsx
'use client';

import { Calendar, ArrowRight, Clock, Zap } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics'; // 👈 añadido

export default function UrgencyBanner() {
  // Datos manuales - actualizar aquí cuando cambien las reservas
  const availableDates = 4;
  const currentMonth = 'Diciembre 2025';
  const lastBooking = { type: 'Boda', location: 'Lleida', hoursAgo: 3 };
  const recentBookings = [
    { type: 'Boda', location: 'Barcelona' },
    { type: 'Evento Empresas', location: 'Girona' },
    { type: 'Cumpleaños', location: 'Lleida' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-bg-surface to-bg-main">
      <div className="mx-auto max-w-5xl px-4">
        {/* Banner principal con urgencia */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600/20 via-bg-surface to-red-900/20 border-2 border-red-500/50 p-8 sm:p-12">
          {/* Efecto de brillo animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-breathe"></div>

          <div className="relative z-10 text-center">
            {/* Icono de urgencia */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 mb-6 animate-pulse">
              <Zap className="w-8 h-8 text-red-400" />
            </div>

            {/* Headline urgente */}
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-4">
              ⚠️ ¡Solo Quedan{' '}
              <span className="text-red-400">{availableDates} Fechas Libres</span>{' '}
              en {currentMonth}!
            </h2>

            <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8">
              Los fines de semana se están agotando <span className="text-red-400 font-bold">RÁPIDO</span>.
              <br />
              Si tienes tu evento en mente, <span className="text-oe-gold font-bold">contacta YA</span>.
            </p>

            {/* Stats rápidos */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-oe-gold" />
                <span className="text-white/80">Respuesta en menos de 2h</span>
              </div>
              <span className="hidden sm:block text-white/30">•</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-oe-gold" />
                <span className="text-white/80">Reserva con 48h de antelación</span>
              </div>
            </div>

            {/* CTA grande */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/34699121023?text=¡Hola!%20Quiero%20reservar%20una%20fecha%20para%20mi%20evento"
                className="group oe-btn-gold text-lg px-8 py-5"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('urgency_banner')} // 👈 añadido
              >
                <Calendar className="w-6 h-6" />
                Reservar Mi Fecha Ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-oe-gold/30 bg-bg-main px-6 py-4 font-bold font-display text-white hover:border-oe-gold hover:bg-oe-gold/10 transition-all"
              >
                Ver Disponibilidad Completa
              </a>
            </div>

            {/* Nota adicional */}
            <p className="text-white/50 text-sm mt-6">
              💡 <span className="text-oe-gold">Último evento reservado:</span> Hace {lastBooking.hoursAgo}h · {lastBooking.type} en {lastBooking.location}
            </p>
          </div>
        </div>

        {/* Proof social adicional */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm mb-3">Eventos confirmados esta semana:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {recentBookings.map((booking, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-oe-gold/10 border border-oe-gold/30 text-oe-gold text-xs font-medium"
              >
                {booking.type} · {booking.location}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
