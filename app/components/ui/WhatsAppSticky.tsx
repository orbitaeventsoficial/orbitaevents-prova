// app/components/ui/WhatsAppSticky.tsx
'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { trackWhatsAppClick } from '@/lib/analytics'; // 👈 añadido

export default function WhatsAppSticky() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Mostrar después de 3 segundos de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ocultar tooltip después de 5 segundos
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const whatsappMessage = encodeURIComponent(
    '¡Hola Órbita Events! 🎉 Me interesa contratar vuestros servicios para un evento. ¿Me podéis dar más información?'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Tooltip flotante */}
      {showTooltip && (
        <div className="relative bg-white text-black px-4 py-3 rounded-xl shadow-2xl max-w-xs animate-breathe">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm font-medium">
            💬 ¿Tienes dudas? <br />
            <span className="text-oe-gold font-bold">¡Escríbenos por WhatsApp!</span>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Respuesta en menos de 2h
          </p>
        </div>
      )}

      {/* Botón WhatsApp */}
      <a
        href={`https://wa.me/34699121023?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] animate-float"
        aria-label="Contactar por WhatsApp"
        onClick={() => trackWhatsAppClick('sticky_button')} // 👈 añadido
      >
        {/* Pulso animado */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
        
        {/* Icono */}
        <MessageCircle className="relative w-8 h-8 text-white" />

        {/* Badge de notificación */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          1
        </span>
      </a>
    </div>
  );
}
