"use client";

import React, { useState } from "react";
import Link from "next/link";

type Props = {
  toEmail?: string; // override si quieres
};

const GOLD = "var(--oe-gold, #d7b86e)";

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

export default function ContactoClient({ toEmail = "info@orbitaevents.cat" }: Props) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return; // evita doble click
    setErr(null);
    setOk(false);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const date = String(fd.get("date") || "").trim();
    const place = String(fd.get("place") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const hp = String(fd.get("hp") || ""); // honeypot

    if (!name || !email || !message) {
      setErr("Nombre, email y mensaje son obligatorios.");
      return;
    }
    // validación básica de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Email inválido.");
      return;
    }

    // Mailto inmediato (para tranquilidad del usuario)
    const subject = `Contacto web — ${name} (${date || "sin fecha"})`;
    const body = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      date && `Fecha: ${date}`,
      place && `Lugar: ${place}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // POST a tu API y, en paralelo, abre el mailto
    try {
      setLoading(true);
      void window.open(mailto, "_blank", "noopener,noreferrer");

      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date, place, message, hp }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data?.error || "Error enviando el formulario.");
      }

      setOk(true);
      (e.currentTarget as HTMLFormElement).reset();
    } catch (ex: any) {
      setErr(ex?.message || "Error inesperado. Prueba otra vez.");
    } finally {
      setLoading(false);
    }
  }

  const phone = "+34699121023";
  const waUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hola Òrbita, necesito producción técnica para mi evento."
  )}&utm_source=web&utm_medium=cta_contacto&utm_campaign=whatsapp`;

  return (
    <section className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-black">Contacto y reservas</h1>
        <p className="mt-2 text-white/70">
          Cuéntanos fecha, lugar y tipo de evento. Respondemos con disponibilidad y precio cerrado.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[1fr,0.9fr] items-start">
        {/* FORM */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          aria-describedby="form-status"
        >
          {/* Honeypot invisible */}
          <input type="text" name="hp" tabIndex={-1} className="hidden" autoComplete="off" />

          <div className="grid gap-4">
            <label className="grid gap-1 text-sm text-white/80">
              Nombre *
              <input
                name="name"
                required
                autoComplete="name"
                className="h-10 rounded-xl bg-black/30 px-3 outline-none border border-white/10 text-white"
              />
            </label>

            <label className="grid gap-1 text-sm text-white/80">
              Email *
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="h-10 rounded-xl bg-black/30 px-3 outline-none border border-white/10 text-white"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-1 text-sm text-white/80">
                Fecha
                <input
                  type="date"
                  name="date"
                  className="h-10 rounded-xl bg-black/30 px-3 outline-none border border-white/10 text-white"
                />
              </label>
              <label className="grid gap-1 text-sm text-white/80">
                Lugar
                <input
                  name="place"
                  placeholder="Ciudad, finca, sala…"
                  className="h-10 rounded-xl bg-black/30 px-3 outline-none border border-white/10 text-white"
                />
              </label>
            </div>

            <label className="grid gap-1 text-sm text-white/80">
              Mensaje *
              <textarea
                name="message"
                required
                rows={5}
                className="rounded-xl bg-black/30 p-3 outline-none border border-white/10 text-white"
              />
            </label>

            {/* Estado accesible */}
            <div id="form-status" className="min-h-[1.25rem]">
              {err && <p className="text-sm text-red-300" role="alert">{err}</p>}
              {ok && (
                <p className="text-sm text-emerald-300" role="status" aria-live="polite">
                  Listo. Se ha abierto un email con tu solicitud y hemos registrado tu mensaje.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className={cx(
                  "inline-flex items-center justify-center rounded-2xl px-5 py-2 font-semibold text-slate-900",
                  "bg-gradient-to-br from-[#f1d99c] via-[#e9c87a] to-[#d7b86e]",
                  "shadow-[0_8px_40px_rgba(215,184,110,0.25)] transition",
                  "hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                )}
              >
                {loading ? "Enviando…" : "Enviar"}
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-2 font-semibold text-white hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </form>

        {/* INFO LATERAL */}
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-lg font-semibold mb-2">Otras vías</h2>
          <ul className="space-y-2 text-white/80">
            <li>
              Email:{" "}
              <a className="underline" href={`mailto:${toEmail}`}>
                {toEmail}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a className="underline" href={waUrl} target="_blank" rel="nofollow noopener noreferrer">
                +34 699 121 023
              </a>
            </li>
          </ul>

          <div className="mt-6 text-sm text-white/60">
            <p>
              Al enviar aceptas nuestra{" "}
              <Link href="/legal/privacidad" className="underline">
                política de privacidad
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
