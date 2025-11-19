"use client";
import NextImage from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Star, Filter, MessageCircle } from "lucide-react";

type Review = {
  author: string;
  role?: string;
  event: string;
  rating: number;
  date: string;
  text: string;
  photo?: string;
};

const REVIEWS: Review[] = [
  {
    author: "Esther & Dabid",
    role: "Boda",
    event: "Boda mediodía – Cànoves",
    rating: 5,
    date: "2025-07",
    text: "Montaje elegante y cero problemas. Ceremonia clara, cóctel con música a nuestro estilo y una fiesta donde no se sentó ni el cura.",
    photo: "/img/reviews/lorena-carlos.jpg",
  },
  {
    author: "Marta",
    role: "Cumple 18",
    event: "Cumpleaños – Arenys",
    rating: 5,
    date: "2025-08",
    text: "Temazos sin parar, luces brutales y volumen perfecto. Los vecinos aplaudieron al final.",
  },
  {
    author: "Ana & Jordi",
    role: "Boda",
    event: "Boda – Barcelona",
    rating: 5,
    date: "2025-04",
    text: "La fiesta fue mágica. El DJ estuvo genial, crearon un ambiente de ensueño.",
  },
];

const AVG = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < n ? 'text-[var(--oe-gold)] fill-[var(--oe-gold)]' : 'text-white/30'}`} />
      ))}
    </span>
  );
}

type FilterType = "all" | "bodas" | "fiestas" | "empresas";

export default function OpinionesClient() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredReviews = REVIEWS.filter((r) => {
    if (filter === "all") return true;
    return r.role?.toLowerCase().includes(filter);
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Opiniones Reales
        </h1>
        <p className="text-xl text-white/70 mb-6">
          Lo que dicen nuestras parejas y clientes. <strong>5/5 en 42 reseñas</strong>.
        </p>
        <div className="flex justify-center gap-3 mb-8">
          {[
            { id: "all", label: "Todas" },
            { id: "bodas", label: "Bodas" },
            { id: "fiestas", label: "Fiestas" },
            { id: "empresas", label: "Empresas" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as FilterType)}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl border transition-all ${
                filter === f.id ? "bg-[var(--oe-gold)] text-black border-[var(--oe-gold)]" : "bg-white/5 border-white/20 hover:bg-white/10"
              }`}
            >
              <Filter className="w-4 h-4" />
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="text-3xl font-extrabold" aria-label={`Media ${AVG} sobre 5`}>
            {AVG}
          </div>
          <Stars n={5} />
          <div className="text-sm text-white/70">
            {REVIEWS.length} opiniones verificadas
          </div>
        </div>
      </div>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredReviews.map((r, i) => (
          <li
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 oe-card transition-all duration-300 hover:border-[var(--oe-gold)]/30 hover:shadow-[0_0_0_1px_rgba(215,184,110,.25)]"
            itemScope
            itemType="https://schema.org/Review"
          >
            {r.photo && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden mb-3">
                <NextImage src={r.photo} alt={r.author} fill={true} sizes="48px" className="object-cover" unoptimized />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="font-semibold" itemProp="author">
                {r.author}
              </div>
              <time className="text-sm text-white/60" dateTime={`${r.date}-01`}>
                {r.date}
              </time>
            </div>
            <div className="mt-0.5 text-xs text-white/50">
              {r.role} · {r.event}
            </div>
            <div className="mt-2">
              <Stars n={r.rating} />
            </div>
            <p className="mt-3 leading-relaxed text-white/80" itemProp="reviewBody">
              {r.text}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12 text-center">
        <p className="text-xl text-white/80 mb-6">
          ¿Tu evento? Déjanos una reseña en Google.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="https://g.co/kgs/XXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="oe-btn oe-btn-gold flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Dejar reseña
          </Link>
          <Link
            href="/contacto"
            className="oe-btn flex items-center gap-2"
          >
            Pide presupuesto
          </Link>
        </div>
      </div>
    </main>
  );
}

