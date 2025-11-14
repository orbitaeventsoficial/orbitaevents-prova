'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  category?: 'portfolio' | 'services' | 'equipment' | 'branding';
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto'; // NUEVO: control de aspect ratio
};

/**
 * SmartImage - Componente optimizado para Òrbita Events
 * 
 * MEJORAS:
 * - Aspect ratio consistente (sin estirar imágenes)
 * - object-cover para recortar centrado
 * - Fallback elegante si falta imagen
 */
export default function SmartImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  category = 'portfolio',
  aspectRatio = '16/9', // Por defecto 16:9
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Normalizar rutas
  const normalizeSrc = (path: string): string => {
    if (path.endsWith('.webp')) return path;
    
    if (path.includes('/images/portfolio/')) {
      return path.replace('/images/portfolio/', '/img/portfolio/').replace(/\.(jpg|jpeg|avif)$/, '.webp');
    }
    
    if (!path.includes('.')) {
      return `${path}.webp`;
    }
    
    return path;
  };

  const optimizedSrc = normalizeSrc(src);

  // Calcular padding para aspect ratio
  const aspectRatioMap = {
    '16/9': 'pb-[56.25%]',   // 9/16 * 100
    '4/3': 'pb-[75%]',       // 3/4 * 100
    '1/1': 'pb-[100%]',      // cuadrado
    'auto': ''
  };

  const paddingClass = aspectRatioMap[aspectRatio];

  const handleError = () => {
    console.warn(`⚠️ Error cargando imagen: ${optimizedSrc}`);
    setError(true);
    setLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Wrapper con aspect ratio fijo */}
      <div className={`relative ${paddingClass ? paddingClass : ''}`}>
        {!error ? (
          <Image
            src={optimizedSrc}
            alt={alt}
            fill={aspectRatio !== 'auto'} // fill si hay aspect ratio
            width={aspectRatio === 'auto' ? width : undefined}
            height={aspectRatio === 'auto' ? height : undefined}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={handleError}
            className={`transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            } ${aspectRatio !== 'auto' ? 'object-cover' : ''}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
        ) : (
          // Fallback visual elegante
          <div className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${
            aspectRatio !== 'auto' ? 'absolute inset-0' : 'min-h-[200px]'
          }`}>
            <div className="text-center text-white/50">
              <svg
                className="mx-auto h-12 w-12 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">Imagen no disponible</p>
            </div>
          </div>
        )}
        
        {/* Skeleton loader */}
        {!loaded && !error && (
          <div className="absolute inset-0 bg-white/10 animate-pulse" />
        )}
      </div>
    </div>
  );
}

/**
 * HELPER: Generar path de portfolio
 */
export function getPortfolioImage(category: string, imageNumber: number | 'cover'): string {
  if (imageNumber === 'cover') {
    return `/img/portfolio/${category}/cover.webp`;
  }
  return `/img/portfolio/${category}/${String(imageNumber).padStart(2, '0')}.webp`;
}
