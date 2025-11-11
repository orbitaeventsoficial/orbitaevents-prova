// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://orbitaevents.com';

  const routes = [
    '',
    '/servicios',
    '/servicios/discomobil',
    '/servicios/empresas',
    '/servicios/fiestas',
    '/servicios/bodas',
    '/servicios/alquiler',
    '/portfolio',
    '/contacto',
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
