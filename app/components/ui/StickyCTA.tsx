// app/components/ui/StickyCTA.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Analytics (Vercel)
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  import('@vercel/analytics').then((mod) => {
    track = mod.track;
  });
}

const WA_LINK = `https://wa.me/34699121023?text=${encodeURIComponent(
  '¡Hola! Quiero presupuesto para mi evento'
)}`;

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    track('Click_Sticky_WhatsApp', {
      timestamp: new Date().toISOString(),
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Estilos CSS personalizados para el glow SUTIL */}
      <style jsx>{`
        @keyframes glow-pulse-subtle {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1.05);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.1);
          }
        }

        .whatsapp-glow-subtle {
          animation: glow-pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contactar por WhatsApp"
        >
          {/* GLOW SUTIL */}
          <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] blur-md whatsapp-glow-subtle" />

          {/* LOGO OFICIAL DE WHATSAPP (teléfono en bocadillo) */}
          <svg
            className="w-7 h-7 relative z-10"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0C7.164 0 0 7.164 0 16c0 2.812.732 5.455 2.008 7.74L.098 31.902l8.354-2.191A15.91 15.91 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0z"
              fill="#25D366"
              fillOpacity="0"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.002 3C8.827 3 3 8.827 3 16.002a13.003 13.003 0 001.737 6.496l-1.13 4.127 4.228-1.11A13.002 13.002 0 0016.002 29C23.177 29 29 23.173 29 16.002 29 8.827 23.173 3 16.002 3zm7.657 18.445c-.32.902-1.583 1.652-2.603 1.872-.697.148-1.606.267-4.663-.999-3.909-1.618-6.426-5.59-6.62-5.849-.188-.259-1.552-2.065-1.552-3.938 0-1.873.982-2.793 1.33-3.173.348-.38.76-.475 1.014-.475.253 0 .507.002.728.013.234.012.547-.089.856.653.319.766 1.09 2.658 1.185 2.85.095.192.159.415.032.674-.126.259-.19.422-.38.647-.19.226-.4.504-.571.676-.19.192-.388.4-.167.783.221.38 983 1.448 2.11 2.346 1.36 1.152 2.503 1.51 2.856 1.68.353.17.56.143.767-.084.207-.226.884-1.032 1.12-1.387.237-.355.473-.297.794-.178.32.119 2.04.962 2.392 1.138.353.176.589.264.675.41.087.147.087.844-.232 1.745z"
              fill="white"
            />
          </svg>

          {/* Badge notificación */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
            1
          </span>
        </motion.a>

        {/* Tooltip hover - desktop */}
        <div className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
            <p className="font-bold text-[#25D366]">Respuesta en 2h 📱</p>
            <p className="text-xs text-gray-600">Lun-Dom 10:00-22:00</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
