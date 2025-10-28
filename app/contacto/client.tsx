// app/contacto/client.tsx
"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "err";

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_E164 || "+34699121023";
const WA_TEXT = "Hola, vengo desde la web y quiero información para mi evento";
const EVENTOS = ["Boda", "Fiesta privada", "Empresa", "Graduación", "Otro"] as const;

export default function ContactoClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setErr(null);
    setStatus("sending");

    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const payload = Object.fromEntries(fd.entries());

    // honeypot
    (payload as any).company = (payload as any).company ?? "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, ts: Date.now() }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.ok !== true) throw new Error(json?.error || "Fallo al enviar");
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (e: any) {
      setStatus("err");
      setErr(e?.message || "No se ha podido enviar. Inténtalo en un minuto.");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  const waHref =
    `https://wa.me/${PHONE.replace(/\D/g, "")}` +
    `?text=${encodeURIComponent(WA_TEXT)}&utm_source=site&utm_medium=cta&utm_campaign=contacto_wa`;

  return (
    <section className="oe-section py-12 md:py-16">
      <header className="max-w-3xl mb-8">
        <h1 className="text-4xl md:text-5xl font-[var(--font-space)] font-bold">Contacto y reservas</h1>
        <p className="oe-muted mt-2">Respuesta rápida. Dinos fecha, lugar y tipo de evento. Sin rodeos.</p>
      </header>

      <form onSubmit={onSubmit} className="max-w-5xl space-y-8" noValidate>
        {/* GRID PRINCIPAL */}
        <div className="grid gap-6 md:grid-cols-2">
          <Field id="name" label="Nombre" required autoComplete="name" />
          <Field id="email" label="Email" type="email" required autoComplete="email" />
          <Field id="phone" label="Teléfono" type="tel" autoComplete="tel" />
          <Field id="date" label="Fecha del evento" placeholder="DD/MM/AAAA" />
          <Field id="place" label="Lugar" className="md:col-span-2" />
          <Select id="type" label="Tipo de evento" options={EVENTOS as unknown as string[]} className="md:col-span-2" />
          <Textarea
            id="message"
            label="Mensaje"
            placeholder="Lo esencial: horario, invitados aprox., ambiente musical…"
            rows={6}
            className="md:col-span-2"
          />
        </div>

        {/* honeypot */}
        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="oe-btn oe-btn-gold px-6 py-3 text-base disabled:opacity-60"
            data-evt="contacto_enviar"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Enviando…" : status === "ok" ? "Enviado ✓" : "Enviar"}
          </button>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="oe-btn px-6 py-3 text-base"
            data-evt="contacto_whatsapp"
          >
            WhatsApp
          </a>
        </div>

        {/* Estado */}
        {status === "err" && (
          <p className="text-red-400 text-sm" role="alert">{err}</p>
        )}
        {status === "ok" && (
          <p className="text-green-400 text-sm">Recibido. Te contestamos en breve.</p>
        )}
      </form>
    </section>
  );
}

/* ---------- Campos con label arriba, sin florituras que rompan ---------- */

type BaseProps = {
  id: string;
  label: string;
  className?: string;
  required?: boolean;
};

function Field({
  id, label, type = "text", placeholder, autoComplete, className, required,
}: BaseProps & { type?: string; placeholder?: string; autoComplete?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm text-white/70 mb-1.5">{label}{required && " *"}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-[color:var(--bg-surface)] px-4 py-3 text-white
                   placeholder:text-white/40 focus:outline-none focus-visible:ring-2
                   focus-visible:ring-[color:var(--oe-gold)]/60 transition"
      />
    </div>
  );
}

function Select({
  id, label, options, className, required, placeholder = "Selecciona…",
}: BaseProps & { options: string[]; placeholder?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm text-white/70 mb-1.5">{label}{required && " *"}</label>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue=""
        className="w-full rounded-xl border border-white/10 bg-[color:var(--bg-surface)] px-4 py-3 text-white
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--oe-gold)]/60 transition"
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Textarea({
  id, label, rows = 5, placeholder, className, required,
}: BaseProps & { rows?: number; placeholder?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm text-white/70 mb-1.5">{label}{required && " *"}</label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-[color:var(--bg-surface)] px-4 py-3 text-white
                   placeholder:text-white/40 focus:outline-none focus-visible:ring-2
                   focus-visible:ring-[color:var(--oe-gold)]/60 transition resize-y"
      />
    </div>
  );
}
