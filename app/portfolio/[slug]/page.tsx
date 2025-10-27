// app/portfolio/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ===== Datos mínimos por caso =====
type Case = {
  slug: string;
  title: string;
  subtitle: string;
  place: string;
  cover: string;
  gallery: string[];
  tags: string[];
  tech: string[];
  blurb: string;
};

const CASES: Case[] = [
  {
    slug: "boda-bosque-canoves",
    title: "Boda en el bosque, Cànoves",
    subtitle: "Ceremonia + cóctel + fiesta",
    place: "Cànoves (Barcelona)",
    cover: "/img/portfolio/shot-01.jpg",
    gallery: [
      "/img/portfolio/shot-01.jpg",
      "/img/portfolio/shot-02.jpg",
      "/img/portfolio/shot-03.jpg",
      "/img/portfolio/shot-01.jpg"
    ],
    tags: ["Boda", "Iluminación", "DJ"],
    tech: [
      "Sistema PA 2.1 con subgrave",
      "Cabina DJ con controladora REV7",
      "Truss bajo con focos LED y haz",
      "Máquina de humo + láser mapeado",
      "Microfonía inalámbrica ceremonia"
    ],
    blurb:
      "Montaje discreto y potente para mantener el bosque bonito y la pista llena. Sonido limpio en ceremonia, cóctel musical fino y sesión final con hits y clásicos bien mezclados."
  },
  {
    slug: "fiesta-empresa-barcelona",
    title: "Cena de empresa, Barcelona",
    subtitle: "Show + discomóvil",
    place: "Barcelona",
    cover: "/img/portfolio/shot-02.jpg",
    gallery: [
      "/img/portfolio/shot-02.jpg",
      "/img/portfolio/shot-03.jpg",
      "/img/portfolio/shot-01.jpg",
      "/img/portfolio/shot-02.jpg"
    ],
    tags: ["Empresa", "Sonido", "Efectos"],
    tech: [
      "PA full-range para 150 pax",
      "Iluminación wash + efecto",
      "Micros para speeches",
      "Láser con cues corporativos",
      "Cabina DJ y playlist previa"
    ],
    blurb:
      "Después del speech, el baile. Timing cronometrado y repertorio adaptado a la plantilla. Zero tiempos muertos, cero vergüenza ajena."
  },
  {
    slug: "cumple-18-arenys",
    title: "Cumpleaños 18, Arenys",
    subtitle: "Temazos + luces + humo",
    place: "Arenys",
    cover: "/img/portfolio/shot-03.jpg",
    gallery: [
      "/img/portfolio/shot-03.jpg",
      "/img/portfolio/shot-01.jpg",
      "/img/portfolio/shot-02.jpg",
      "/img/portfolio/shot-03.jpg"
    ],
    tags: ["Fiesta", "Láser", "Set DJ"],
    tech: [
      "PA compacto con pegada",
      "Láser central con gobos",
      "Focos ritmo + strobes",
      "Cabina DJ con efectos",
      "Máquina de humo controlada"
    ],
    blurb:
      "Setup contundente en espacio pequeño. Control de niveles para no matar al vecino y suficiente presión para cantarlo todo."
  }
];

const MAP = new Map(CASES.map((c) => [c.slug, c]));

// BlurDataURL para evitar parpadeo
const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P8z8DwHwAFhAK2Dq6HbwAAAABJRU5ErkJggg==";

// Base absoluta para JSON-LD
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://orbitaevents-prova.vercel.app";

// ===== Static params para SSG =====
export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

// ===== Metadata dinámica por caso =====
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = MAP.get(params.slug);
  if (!data) return { title: "Proyecto no encontrado", robots: { index: false, follow: false } };

  const title = `${data.title} — Òrbita Events`;
  const description = `${data.subtitle}. ${data.blurb}`;
  const path = `/portfolio/${data.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "article",
      url: path,
      images: [
        {
          url: data.cover,
          width: 1200,
          height: 675,
          alt: `${data.title} — ${data.subtitle}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [data.cover]
    },
    robots: { index: true, follow: true }
  };
}

// ===== JSON-LD (CreativeWork) =====
function JsonLD({ data }: { data: Case }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${BASE}/portfolio/${data.slug}#work`,
    name: data.title,
    headline: data.subtitle,
    about: data.tags,
    locationCreated: data.place,
    image: data.gallery.map((g) => ({ "@type": "ImageObject", url: `${BASE}${g}` })),
    url: `${BASE}/portfolio/${data.slug}`,
    author: { "@type": "Organization", name: "Òrbita Events" }
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

type Props = { params: { slug: string } };

export default function Proyecto({ params }: Props) {
  const data = MAP.get(params.slug);
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      <JsonLD data={data} />

      <Link href="/portfolio" className="text-white/70 hover:text-white">
        ← Volver al portfolio
      </Link>

      <h1 className="mt-4 text-3xl md:text-5xl font-black text-white">{data.title}</h1>
      <p className="mt-2 text-white/70">{data.subtitle}</p>
      <p className="mt-2 text-sm text-white/70">{data.place}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {data.gallery.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <Image
              src={src}
              alt={`${data.title} — foto ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-white">Qué montamos</h2>
          <ul className="mt-3 grid gap-2 text-sm text-white/80">
            {data.tech.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/60"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-white">Resultado</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80">{data.blurb}</p>
        </div>
      </section>

      <div className="mt-10 text-center">
        <Link
          href="/contacto"
          className="inline-flex items-center rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
        >
          ¿Hacemos el tuyo?
        </Link>
      </div>
    </div>
  );
}
