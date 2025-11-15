'use client';
// 🔥 MANOLO VERSION - Cada interacción empuja hacia conversión

import Link from 'next/link';
import { useState } from "react";
import { Search, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { FAQ_DATA } from '@/data/faq-data';

type CategoryType = "all" | "general" | "sonido" | "iluminacion" | "precios" | "reservas";

export default function FAQClient() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [category, setCategory] = useState<CategoryType>("all");

  const WA_LINK = `https://wa.me/34699121023?text=${encodeURIComponent(
    "Hola, tengo una duda sobre [pregunta]"
  )}`;

  const filteredFAQs = FAQ_DATA.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || faq.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-white">
      {/* Hero - Copy directo y sin mierdas */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Preguntas Frecuentes
        </h1>
        <p className="text-xl text-white/80 mb-4">
          Respuestas reales. Sin marketing. Sin filtros.
        </p>
        <p className="text-white/60 max-w-2xl mx-auto">
          Sabes exactamente lo que contratas, antes de hacerlo.
        </p>
      </div>

      {/* 🔥 CTA URGENCIA SUPERIOR - Captura micro-momentos */}
      <div className="max-w-3xl mx-auto mb-12 p-6 bg-gradient-to-r from-[#d7b86e]/10 to-transparent border border-[#d7b86e]/30 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold mb-1">¿Tu boda es en menos de 3 meses?</p>
            <p className="text-white/60 text-sm">Quedan pocas fechas. Hablemos YA.</p>
          </div>
          <div className="flex gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn oe-btn-gold flex items-center gap-2 whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Ahora
            </a>
            <a
              href="tel:+34699121023"
              className="oe-btn flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-5 h-5" />
              Llamar
            </a>
          </div>
        </div>
      </div>

      {/* Búsqueda + Filtros */}
      <div className="mb-12">
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Buscar duda (ej: precio, limitador, lluvia...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-[#d7b86e] transition text-white placeholder:text-white/40"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: "all", label: "📋 Todas" },
            { id: "general", label: "🎯 General" },
            { id: "sonido", label: "🔊 Sonido" },
            { id: "iluminacion", label: "💡 Luces" },
            { id: "precios", label: "💰 Precios" },
            { id: "reservas", label: "📅 Reservas" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id as CategoryType)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat.id
                  ? "bg-[#d7b86e] text-black"
                  : "bg-white/5 border border-white/20 hover:bg-white/10 text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Acordeón - Cada respuesta empuja a contactar */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 mb-4">No encontramos esa pregunta</p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn oe-btn-gold inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Pregúntanos directamente
            </a>
          </div>
        ) : (
          filteredFAQs.map((faq, i) => (
            <div
              key={i}
              className="oe-card rounded-2xl border border-white/10 transition-all duration-300 hover:border-[#d7b86e]/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left group"
              >
                <h2 className="text-lg font-semibold pr-4 group-hover:text-[#d7b86e] transition">
                  {faq.q}
                </h2>
                <ChevronDown
                  className={`w-5 h-5 transition-transform flex-shrink-0 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-white/80">
                  <p className="mb-4 leading-relaxed">{faq.a}</p>
                  {/* 🔥 CTA contextual en CADA respuesta */}
                  <div className="flex flex-wrap gap-3 pt-2 border-t border-white/10">
                    <a
                      href={WA_LINK.replace("[pregunta]", encodeURIComponent(faq.q))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#d7b86e] hover:text-white transition text-sm font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Preguntar por WhatsApp
                    </a>
                    <Link
                      href="/contacto"
                      className="inline-flex items-center gap-2 text-white/60 hover:text-white transition text-sm"
                    >
                      O enviar formulario →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* CTA Final - Doble opción para maximizar conversión */}
      <div className="mt-16 text-center bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8">
        <p className="text-2xl font-bold mb-2">¿Tu duda no está aquí?</p>
        <p className="text-white/70 mb-6 max-w-xl mx-auto">
          Hablemos. Respuesta en menos de 2 hora (horario laboral).
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="oe-btn oe-btn-gold flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp (Respuesta Inmediata)
          </a>
          <Link
            href="/contacto"
            className="oe-btn flex items-center justify-center gap-2"
          >
            Formulario Contacto
          </Link>
        </div>
        <p className="text-white/40 text-sm mt-4">
          También: +34 699 12 10 23 (WhatsApp o llamada)
        </p>
      </div>
    </section>
  );
}

