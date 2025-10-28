// app/portfolio/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Case = {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  gallery: string[];
  summary: string;
  services: string[];
  tags: string[];
};

const CASES: Record<string, Case> = {
  "boda-bosque-canoves": {
    slug: "boda-bosque-canoves",
    title: "Boda en el bosque, Cànoves",
    subtitle: "Ceremonia + cóctel + fiesta",
    cover: "/img/portfolio/shot-01.jpg",
    gallery: [
      "/img/portfolio/shot-01.jpg",
      "/img/portfolio/shot-02.jpg",
      "/img/portfolio/shot-03.jpg"
    ],
    summary:
      "Ceremonia en claro de bosque, cóctel con microfonía discreta y fiesta con cabina compacta. Sonido controlado para exterior y luz cálida sin deslumbrar.",
    services: ["Ceremonia", "Microfonía", "Cabina DJ", "Iluminación ambiente", "Efectos suaves"],
    tags: ["Boda", "Exterior", "DJ", "Iluminación"]
  },
  "fiesta-empresa-barcelona": {
    slug: "fiesta-empresa-barcelona",
    title: "Cena de empresa, Barcelona",
    subtitle: "Sonorización + microfonía + DJ",
    cover: "/img/portfolio/shot-02.jpg",
    gallery: [
      "/img/portfolio/shot-02.jpg",
      "/img/portfolio/shot-03.jpg",
      "/img/portfolio/shot-01.jpg"
    ],
    summary:
      "Cena con speeches, microfonía de mano y ambientación elegante. Tras el postre, sesión abierta con repertorio mixto y transición progresiva a baile.",
    services: ["PA principal", "Micros de mano", "Ambientación", "Cabina DJ"],
    tags: ["Empresa", "Sonido", "DJ"]
  },
  "cumple-18-arenys": {
    slug: "cumple-18-arenys",
    title: "Cumple 18, Arenys",
    subtitle: "Packs de discomóvil + efectos",
    cover: "/img/portfolio/shot-03.jpg",
    gallery: [
      "/img/portfolio/shot-03.jpg",
      "/img/portfolio/shot-01.jpg",
      "/img/portfolio/shot-02.jpg"
    ],
    summary:
      "Formato compacto con pegada: subgraves, juego de luces con escenas programadas y playlist combinando hits actuales y recuerdos familiares.",
    services: ["Discomóvil", "Subgraves", "Luces programadas", "Efectos"],
    tags: ["Fiesta", "Discomóvil", "Efectos"]
  }
};

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const item = CASES[params.slug];
  if (!item) return { title: "Proyecto no encontrado | Òrbita Events" };
  const title = `${item.title} | Òrbita Events`;
  const desc = `${item.subtitle}. ${item.summary}`;
  return {
    title,
    description: desc,
    alternates: { canonical: `/portfolio/${item.slug}` },
    openGraph: {
      title,
      description: desc,
      url: `/portfolio/${item.slug}`,
      type: "article",
      images: [{ url: item.cover }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [item.cover]
    },
    robots: { index: true, follow: true }
  };
}

function JsonLD({ item }: { item: Case }) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `/portfolio/${item.slug}#case`,
    name: item.title,
    about: item.tags,
    headline: item.subtitle,
    image: [item.cover, ...item.gallery],
    mainEntityOfPage: `/portfolio/${item.slug}`
  };
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

export default function PortfolioCasePage({ params }: Params) {
  const item = CASES[params.slug];
  if (!item) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 pt-24 pb-16 text-white">
      <JsonLD item={item} />

      <nav aria-label="Migas" className="mb-6 text-sm text-white/60">
        <Link href="/" className="hover:text-white">Inicio</Link>
        <span aria-hidden="true" className="mx-1">/</span>
        <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
        <span aria-hidden="true" className="mx-1">/</span>
        <span className="text-white/80">{item.title}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">{item.title}</h1>
        <p className="mt-2 text-white/70">{item.subtitle}</p>
      </header>

      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <Image
          src={item.cover}
          alt={item.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <section className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="mb-3 text-xl font-semibold">Resumen</h2>
          <p className="text-white/80 leading-relaxed">{item.summary}</p>
        </article>

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="mb-3 text-xl font-semibold">Servicios</h2>
          <ul className="space-y-2 text-white/80">
            {item.services.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                {s}
              </li>
            ))}
          </ul>

          <h3 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-wider text-white/60">
            Etiquetas
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">Galería</h2>
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {item.gallery.map((src, i) => (
            <li key={src} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="relative aspect-[4/3]">
                <Image
                  src={src}
                  alt={`${item.title} — foto ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/contacto"
          className="inline-flex items-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
        >
          ¿Hacemos el tuyo?
        </Link>
      </div>
    </main>
  );
}
