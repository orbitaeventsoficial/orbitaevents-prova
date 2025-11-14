// app/components/ui/WhatsAppSticky.tsx
'use client';

import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const WA_LINK = 'https://wa.me/34699121023?text=' + encodeURIComponent('Hola! Quiero info sobre Òrbita Events');

export default function WhatsAppSticky() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mostrar después de 1 segundo (para que se note la animación)
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Botón principal */}
      <div className="relative">
        {/* Pulso animado */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
        
        {/* Botón */}
        <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110">
          <MessageCircle className="w-7 h-7" />
        </div>

        {/* Badge de notificación */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
          1
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-bg-surface border border-oe-gold/50 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
          <p className="font-bold text-oe-gold">¡Hablemos por WhatsApp!</p>
          <p className="text-sm text-white/70">Respuesta rápida 📱</p>
        </div>
      </div>
    </a>
  );
}
