'use client';

import SmartImage, { getPortfolioImage } from '../../../app/components/ui/SmartImage';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type PortfolioClientProps = {
  slug: string;
  title: string;
};

// Subcategorías SOLO para “fiestas-tematicas”
const TEMATICAS_SUBCATS = [
  {
    slug: 'halloween',
    label: 'Halloween',
    cover: '/img/portfolio/fiestas-tematicas-halloween-cover.jpg',
  },
  {
    slug: 'harry-potter',
    label: 'Harry Potter',
    cover: '/img/portfolio/fiestas-tematicas-harry-potter-cover.jpg',
  },
];

export default function PortfolioClient({ slug, title }: PortfolioClientProps) {
  const [media, setMedia] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 CASO ESPECIAL: fiestas temáticas → tarjetas de subcategorías
  if (slug === 'fiestas-tematicas') {
    return (
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
          <p className="text-center text-white/70 mb-12">
            Fiestas temáticas realizadas: selección de conceptos y ambientaciones.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEMATICAS_SUBCATS.map((sub) => (
              <Link
                key={sub.slug}
                href={`/portfolio/fiestas-tematicas/${sub.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)]"
              >
                <img
                  src={sub.cover}
                  alt={sub.label}
                  className="h-64 w-full object-cover opacity-90 transition group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-xl font-semibold">{sub.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
    );
  }

  // 🔥 Resto de categorías → galería dinámica REAL (sin imágenes negras)
  useEffect(() => {
    let isMounted = true;

    async function loadMedia() {
      const found: string[] = [];

      // Intentamos imágenes del 1 al 20
      for (let i = 1; i <= 20; i++) {
        const path = getPortfolioImage(slug, i);

        try {
          const res = await fetch(path, { method: 'HEAD' });

          if (res.ok) {
            // Archivo existe → lo añadimos
            found.push(path);

            // BONUS: detectamos vídeos .mp4
            const mp4Path = path.replace('.webp', '.mp4');
            const mp4Check = await fetch(mp4Path, { method: 'HEAD' }).catch(() => null);

            if (mp4Check?.ok) {
              found.push(mp4Path); // añadimos versión vídeo si existe
            }
          }
        } catch {
          // Ignorar errores
        }
      }

      if (isMounted) {
        setMedia(found);
        setLoading(false);
      }
    }

    loadMedia();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#d7b86e] border-t-transparent" />
          <p className="mt-4 text-white/70">Cargando galería...</p>
        </div>
    );
  }

  return (
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
        <p className="text-center text-white/70 mb-12">
          Selección de trabajos reales
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((file, i) => {
            const isVideo = file.endsWith('.mp4');

            return isVideo ? (
              <video
                key={i}
                src={file}
                controls
                className="rounded-2xl w-full h-auto hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <SmartImage
                key={i}
                src={file}
                alt={`${title} - Imagen ${i + 1}`}
                width={600}
                height={400}
                className="rounded-2xl hover:scale-105 transition-transform duration-300"
                priority={i < 6}
              />
            );
          })}
        </div>
      </div>
  );
}
