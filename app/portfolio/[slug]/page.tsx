import { notFound } from 'next/navigation';
import Breadcrumbs from '@/app/components/seo/Breadcrumbs';
import type { Metadata } from 'next';
import Client from './client';

const VALID_SLUGS = [
  'bodas',
  'discomovil',
  'empresas',
  'fiestas-privadas',
  'fiestas-tematicas',
  'infantil',
  'navidad',
  'produccion-tecnica',
];

const titleMap: Record<string, string> = {
  bodas: 'Bodas',
  discomovil: 'Discomóvil',
  empresas: 'Empresas',
  'fiestas-privadas': 'Fiestas Privadas',
  'fiestas-tematicas': 'Fiestas Temáticas',
  infantil: 'Infantil',
  navidad: 'Navidad',
  'produccion-tecnica': 'Producción Técnica',
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const safeTitle: string = String((titleMap as any)[slug] ?? slug);
  const title = safeTitle ?? String(slug);
  if (!VALID_SLUGS.includes(slug)) return { title: 'No encontrado' };

  return {
    title: `${safeTitle} | Portfolio Órbita Events`,
    description: `Trabajos realizados en ${safeTitle.toLowerCase()}. Sonido, iluminación y DJ.`,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: `${safeTitle} | Portfolio Órbita Events`,
      description: `Ejemplos de producción y DJ en ${safeTitle.toLowerCase()}.`,
      images: [`/api/og?title=Portfolio%20${encodeURIComponent(safeTitle)}`],
    },
    robots: { index: VALID_SLUGS.includes(slug), follow: true },
  };
}

export default async function PortfolioSlugPage({ params }: Props) {
  const { slug } = await params;
  const safeTitle: string = String((titleMap as any)[slug] ?? slug);
  if (!VALID_SLUGS.includes(slug)) notFound();

  const title = safeTitle;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Inicio', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: safeTitle, url: `/portfolio/${slug}` },
        ]}
      />

      <Client slug={slug} title={title} />
    </>
  );
}
