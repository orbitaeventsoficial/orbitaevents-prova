// app/components/ui/HeroBrutalClient.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, MessageCircle, Star, Sparkles, Zap } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function HeroBrutal() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [availableSlots] = useState(3);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      v.removeAttribute('autoplay');
    }
  }, []);

  return (
    <section className="relative isolate overflow-hidden min-h-screen flex items-center bg-black">
      {/* === VIDEO DE FONDO === */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          playsInline
          muted
          loop
          autoPlay
          poster="/img/orbita-glyph.anim.svg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
      </div>

      {/* === PARTÍCULAS FLOTANTES === */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute w-32 h-32 rounded-full bg-yellow-500/30 blur-3xl top-[20%] left-[15%] animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute w-40 h-40 rounded-full bg-yellow-400/20 blur-3xl top-[60%] right-[20%] animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}} />
        <div className="absolute w-36 h-36 rounded-full bg-yellow-300/25 blur-3xl bottom-[30%] left-[50%] animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />
      </div>

      {/* === CONTENIDO === */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 w-full">
        
        {/* Badge de urgencia */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 rounded-full bg-red-500/20 border-2 border-red-500/50 px-6 py-3 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-base font-bold text-red-100 flex items-center gap-2">
              🔥 Solo {availableSlots} sábados disponibles este mes
              <Zap className="w-5 h-5 text-red-400" />
            </span>
          </div>
        </div>

        {/* HEADLINE ÉPICO */}
        <div className="text-center mb-12">
          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tight leading-none mb-6">
            <span className="block text-white drop-shadow-2xl">
              El Evento Que
            </span>
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl animate-pulse" style={{animationDuration: '3s'}}>
              Tus Invitados NO Olvidarán
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-center text-2xl sm:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10">
          La diferencia entre{' '}
          <span className="line-through text-gray-500">"estuvo bien"</span>
          {' '}y{' '}
          <span className="font-black text-yellow-400 text-3xl">
            "FUE ÉPICO"
          </span>
          <br />
          DJ + Luces + Efectos Especiales para bodas, empresas y fiestas temáticas que dejan huella.
        </p>

        {/* Proof social */}
        <div className="flex justify-center items-center gap-8 flex-wrap mb-16 text-lg">
          {/* Rating */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-white text-xl">4.9</span>
            <span className="text-gray-300">(243 reseñas)</span>
          </div>

          <span className="text-gray-600 text-3xl">•</span>

          {/* Eventos */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-bold text-xl">+300 eventos</span>
          </div>

          <span className="text-gray-600 text-3xl hidden sm:block">•</span>

          {/* Ubicaciones */}
          <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <span className="text-gray-300 font-medium">📍 Barcelona · Lleida · Girona · Tarragona</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          
          {/* CTA Principal: WhatsApp */}
          <a
            href="https://wa.me/34699121023?text=Hola!%20Quiero%20saber%20si%20tenéis%20mi%20fecha%20disponible%20para%20un%20evento"
            className="group relative inline-flex items-center gap-3 px-10 py-6 rounded-2xl text-black text-xl font-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('hero')}
          >
            <MessageCircle className="w-7 h-7" />
            <span>Consulta GRATIS en 2h</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>

          {/* CTA Secundario */}
          <a
            href="#disponibilidad"
            className="group inline-flex items-center gap-3 px-10 py-6 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white text-xl font-bold hover:border-yellow-400 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <Calendar className="w-6 h-6 text-yellow-400" />
            <span>Ver fechas libres</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </a>
        </div>

        {/* Garantía */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white/90">
                ⚡ <span className="font-bold text-white">Respuesta en menos de 2h</span>
              </span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-2">
              <span className="text-white/90">
                💯 <span className="font-bold text-white">Satisfacción garantizada</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-2 h-4 rounded-full bg-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
