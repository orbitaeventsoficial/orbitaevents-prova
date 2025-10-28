// app/components/forms/ContactForm.client.tsx
"use client";

import { useState } from "react";

type Props = {
  toEmail?: string;
};

export default function ContactForm({ toEmail = "info@orbitaevents.cat" }: Props) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(false);

    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string || "").trim();
    const email = (fd.get("email") as string || "").trim();
    const date = (fd.get("date") as string || "").trim();
    const place = (fd.get("place") as string || "").trim();
    const message = (fd.get("message") as string || "").trim();
    const hp = (fd.get("hp") as string || "").trim(); // honeypot invisible

    if (!name || !email || !message) {
      setErr("Nombre, email y mensaje son obligatorios.");
      return;
    }

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

    // mailto inmediato por si el servidor falla
    const mailto = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank", "noopener,noreferrer");

    try {
      setLoading(true);
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date, place, message, hp }),
      }).catch(() => {});
      setOk(true);
      (e.currentTarget as HTMLFormElement).reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
    >
      <div className="grid gap-4">
        {/* Honeypot oculto para bots */}
        <input
          type="text"
          name="hp"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <label className="grid gap-1 text-sm text-white/80">
          Nombre *
          <input
            name="name"
            required
            className="h-10 rounded-xl bg-black/30 px-3 outline-none border border-white/10 text-white"
          />
        </label>

        <label className="grid gap-1 text-sm text-white/80">
          Email *
          <input
            type="email"
            name="email"
            required
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
            rows={4}
            className="rounded-xl bg-black/30 p-3 outline-none border border-white/10 text-white"
          />
        </label>

        {err && <p className="text-sm text-red-300">{err}</p>}
        {ok && (
          <p className="text-sm text-emerald-300">
            Enviado correctamente. Se ha abierto un correo con tu solicitud.
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-2xl px-5 py-2 font-semibold text-slate-900 bg-gradient-to-br from-[#ffe08a] via-[#ffc93c] to-[#ffb300] shadow-[0_8px_40px_rgba(255,200,0,0.25)] hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-60"
          >
            {loading ? "Enviando…" : "Enviar"}
          </button>
        </div>
      </div>
    </form>
  );
}
