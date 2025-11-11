// app/servicios/produccion/client.tsx
'use client';

import { useEffect } from "react";
import ContactForm from "@/app/components/forms/ContactForm.client";
import { Mic, Speaker, Lightbulb, Star, Check, MessageCircle, Shield, RotateCcw } from "lucide-react";

// Analytics
let track: (event: string, data?: any) => void = () => {};
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  import("@vercel/analytics").then((mod) => {
    track = mod.track;
  });
}

const WA_LINK = `https://wa.me/34699121023?text=${encodeURIComponent(
  "Hola! Quiero info sobre producción técnica"
)}`;

export default function ProduccionClient() {
  useEffect(() => {
    track("View_Produccion");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-bg-main z-10" />
          <img
            src="/img/portfolio/produccion-cover.webp"
            alt="Producción técnica de eventos Órbita"
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>

        <div className="relative z-20 mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-5xl sm:text-7xl font-display font-black text-white mb-6 leading-[1.05]">
            Producción Técnica
            <br />
            <span className="gradient-text breathe">Profesional y Sin Fallos</span>
          </h1>
          <p className="text-xl sm:text-2xl text-text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            Escenarios, sonido, luces y pantallas LED para eventos grandes.
            <br />Montaje limpio, seguro y con técnico onsite.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="oe-btn-gold text-lg px-8 py-5 inline-flex items-center justify-center gap-3"
              onClick={() => track("CTA_WhatsApp_Produccion")}
            >
              <MessageCircle className="w-5 h-5" />
              Consultar Disponibilidad
            </a>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-main to-bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-h2 text-center text-white mb-12">
            Soluciones Técnicas <span className="text-oe-gold">Integrales</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mic,
                title: "Sonido Profesional",
                text: "Equipos EV / Line Array de alto rendimiento. Cobertura perfecta sin distorsión.",
              },
              {
                icon: Lightbulb,
                title: "Iluminación Escénica",
                text: "Focos LED, barras móviles, truss con DMX sincronizado. Efecto visual y control total.",
              },
              {
                icon: Speaker,
                title: "Pantallas LED y Escenarios",
                text: "Estructuras certificadas, pantallas P3.9 y montaje rápido, limpio y seguro.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-bg-surface border border-border hover:border-oe-gold/50 transition-all text-center"
              >
                <s.icon className="w-12 h-12 text-oe-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTÍA */}
      <section className="py-20 sm:py-32 bg-bg-surface">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="oe-card p-10 rounded-3xl border-2 border-oe-gold/50">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-oe-gold/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-oe-gold" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">
              Garantía de Estabilidad y Seguridad
            </h2>
            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              Todo el material certificado, con técnico onsite durante el evento y redundancia completa en puntos críticos (audio, potencia, señal).
            </p>

            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-bg-main rounded-xl">
                <Star className="w-6 h-6 text-oe-gold mx-auto mb-2" />
                <p className="text-white font-bold">4.9/5</p>
                <p className="text-text-muted text-xs">Valoración media</p>
              </div>
              <div className="p-4 bg-bg-main rounded-xl">
                <Check className="w-6 h-6 text-oe-gold mx-auto mb-2" />
                <p className="text-white font-bold">100%</p>
                <p className="text-text-muted text-xs">Montajes sin incidencias</p>
              </div>
              <div className="p-4 bg-bg-main rounded-xl">
                <RotateCcw className="w-6 h-6 text-oe-gold mx-auto mb-2" />
                <p className="text-white font-bold">Backup total</p>
                <p className="text-text-muted text-xs">Sistema redundante</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-bg-surface to-bg-main">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-display font-black text-white mb-6">
            Cuéntanos Tu Evento
          </h2>
          <p className="text-lg text-text-muted mb-10">
            Dinos qué necesitas y te enviaremos una propuesta técnica adaptada a tu espacio.
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}