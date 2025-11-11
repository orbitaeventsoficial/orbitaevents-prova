'use client';

import Section from '@/components/ui/Section';
import SmartImage, { getPortfolioImage } from '@/components/ui/SmartImage';
import { useState, useEffect } from 'react';

type PortfolioClientProps = {
  slug: string;
  title: string;
};

export default function PortfolioClient({ slug, title }: PortfolioClientProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generar array de imágenes basado en convención
    // Asumimos máximo 20 imágenes por categoría (01.webp a 20.webp)
    const imageArray = Array.from({ length: 20 }, (_, i) =>
      getPortfolioImage(slug, i + 1)
    );

    setImages(imageArray);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <Section className="py-16">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#d7b86e] border-t-transparent" />
          <p className="mt-4 text-white/70">Cargando galería...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-center mb-4">{title}</h1>
        <p className="text-center text-white/70 mb-12">
          Selección de trabajos reales con equipamiento profesional
        </p>

        {/* Grid de imágenes */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((imagePath, i) => (
            <SmartImage
              key={i}
              src={imagePath}
              alt={`${title} - Imagen ${i + 1}`}
              width={600}
              height={400}
              className="rounded-2xl hover:scale-105 transition-transform duration-300"
              priority={i < 6} // Priorizar primeras 6 imágenes
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
