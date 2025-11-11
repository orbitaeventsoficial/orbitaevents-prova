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
};

/**
 * SmartImage - Componente optimizado para Órbita Events
 * 
 * NUEVA ESTRUCTURA:
 * - /img/portfolio/{categoria}/01.webp
 * - /img/portfolio/{categoria}/cover.webp (portada)
 * - Next.js convierte automáticamente a AVIF/WebP según browser
 */
export default function SmartImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  category = 'portfolio',
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Normalizar rutas - convertir paths antiguos a nuevos
  const normalizeSrc = (path: string): string => {
    // Si ya tiene extensión webp, usar directamente
    if (path.endsWith('.webp')) return path;
    
    // Convertir paths antiguos
    if (path.includes('/images/portfolio/')) {
      return path.replace('/images/portfolio/', '/img/portfolio/').replace(/\.(jpg|jpeg|avif)$/, '.webp');
    }
    
    // Si es path relativo sin extensión, añadir webp
    if (!path.includes('.')) {
      return `${path}.webp`;
    }
    
    return path;
  };

  const optimizedSrc = normalizeSrc(src);
  const safeWidth = width || 800;
  const safeHeight = height || 600;

  // Fallback para error
  const handleError = () => {
    console.warn(`⚠️ Error cargando imagen: ${optimizedSrc}`);
    setError(true);
    setLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {!error ? (
        <Image
          src={optimizedSrc}
          alt={alt}
          width={safeWidth}
          height={safeHeight}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={handleError}
          className={`transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
        />
      ) : (
        // Fallback visual
        <div className="flex h-full min-h-[200px] items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
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
  );
}

/**
 * HELPER: Generar path de portfolio
 * 
 * Uso:
 * <SmartImage src={getPortfolioImage('bodas', 1)} alt="Boda" />
 * <SmartImage src={getPortfolioImage('bodas', 'cover')} alt="Portada" />
 */
export function getPortfolioImage(category: string, imageNumber: number | 'cover'): string {
  if (imageNumber === 'cover') {
    return `/img/portfolio/${category}/cover.webp`;
  }
  return `/img/portfolio/${category}/${String(imageNumber).padStart(2, '0')}.webp`;
}
