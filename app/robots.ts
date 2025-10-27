// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://orbitaevents-prova.vercel.app";

  const isProd = base.includes("orbitaevents.cat");

  const rules: MetadataRoute.Robots["rules"] = isProd
    ? [
        { userAgent: "*", allow: "/" },
        { userAgent: "GPTBot", disallow: "/" } // bloquea scraping IA si no lo deseas
      ]
    : [{ userAgent: "*", disallow: "/" }];

  const config: MetadataRoute.Robots = { rules };

  if (isProd) {
    config.sitemap = `${base}/sitemap.xml`;
    config.host = base;
  }

  return config;
}
