import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@\/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Portfolio | Òrbita Events',
  description:
    'Casos reales de eventos, tematizacion y DJ: bodas, discomóvil, empresas y más.',
  alternates: { canonical: '/portfolio' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Portfolio | Òrbita Events',
    description:
      'Producción técnica y DJ en eventos reales. Selección de trabajos por categoría.',
    url: '/portfolio',
    images: ['/api/og?title=Portfolio'],
  },
};

const CATS = [
  { slug: 'bodas', label: 'Bodas', cover: '/img/portfolio/bodas-cover.jpg' },
  { slug: 'discomovil', label: 'Discomóvil', cover: '/img/portfolio/discomovil-cover.jpg' },
  { slug: 'empresas', label: 'Empresas', cover: '/img/portfolio/empresas-cover.jpg' },
  { slug: 'fiestas-privadas', label: 'Fiestas privadas', cover: '/img/portfolio/fiestas-privadas-cover.jpg' },
  { slug: 'fiestas-tematicas', label: 'Fiestas temáticas', cover: '/img/portfolio/fiestas-tematicas-cover.jpg' },
  { slug: 'infantil', label: 'Infantil', cover: '/img/portfolio/infantil-cover.jpg' },
  { slug: 'navidad', label: 'Navidad', cover: '/img/portfolio/navidad-cover.jpg' },
  { slug: 'produccion-tecnica', label: 'Producción técnica', cover: '/img/portfolio/produccion-tecnica-cover.jpg' },
];

export default function PortfolioHome() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Inicio', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-h2 text-center">Portfolio</h1>
        <p className="mt-4 text-center text-white/70">
          Selección de eventos reales:
        </p>

        {/* CAMBIO ÚNICO: grid de 4 -> 3 columnas */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATS.map((c) => (
            <Link
              key={c.slug}
              href={`/portfolio/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)]"
              aria-label={`Ver ${c.label}`}
            >
              <img
                src={c.cover}
                alt={c.label}
                className="h-48 w-full object-cover opacity-90 transition group-hover:opacity-100"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <h3 className="text-lg font-semibold">{c.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
