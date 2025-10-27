// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents-prova.vercel.app";

  const isProd = base.includes("orbitaevents.cat");
  const last = new Date();

  // Definición estructurada (más fácil de mantener)
  const pages = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/servicios", priority: 0.9, freq: "weekly" },
    { path: "/servicios/discomobil", priority: 0.9, freq: "weekly" },
    { path: "/servicios/bodas", priority: 0.9, freq: "weekly" },
    { path: "/servicios/fiestas", priority: 0.8, freq: "monthly" },
    { path: "/servicios/empresas", priority: 0.8, freq: "monthly" },
    { path: "/servicios/produccion", priority: 0.8, freq: "monthly" },
    { path: "/servicios/alquiler", priority: 0.7, freq: "monthly" },
    { path: "/portfolio", priority: 0.6, freq: "monthly" },
    { path: "/packs", priority: 0.6, freq: "monthly" },
    { path: "/opiniones", priority: 0.5, freq: "monthly" },
    { path: "/sobre-nosotros", priority: 0.5, freq: "monthly" },
    { path: "/contacto", priority: 0.6, freq: "yearly" },
    { path: "/faq", priority: 0.4, freq: "yearly" }
  ] as const;

  // En entorno de prueba bloquea sitemap real
  if (!isProd) return [];

  // Mapeo tipado exacto para MetadataRoute.Sitemap
  const sitemap: MetadataRoute.Sitemap = pages.map(p => ({
    url: `${base}${p.path}`,
    lastModified: last,
    changeFrequency: p.freq as NonNullable<MetadataRoute.Sitemap[0]["changeFrequency"]>,
    priority: p.priority
  }));

  return sitemap;
}
