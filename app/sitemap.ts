// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://orbitaevents-prova.vercel.app";
  const routes = [
    "/",
    "/servicios",
    "/servicios/discomobil",
    "/servicios/bodas",
    "/servicios/empresas",
    "/servicios/produccion",
    "/portfolio",
    "/contacto",
  ];
  return routes.map((p) => ({
    url: `${base.replace(/\/+$/,"")}${p}`,
    changefreq: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
