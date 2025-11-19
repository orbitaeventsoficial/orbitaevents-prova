// app/components/forms/ContactForm.client.tsx
'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackLead } from "@/lib/analytics";

/* -------------------------------------------------------------------------- */
/*  SCHEMA ZOD – MENSAJES CLAROS Y VALIDACIÓN RÁPIDA                           */
/* -------------------------------------------------------------------------- */
const formSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres").max(50),
  contact: z
    .string()
    .refine((val) => /^[\d\+\-\s@.]+$/.test(val), "Email o teléfono válido"),
  event: z.string().min(1, "Selecciona un evento"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setFocus,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  /* ------------------------------- AUTO‑FOCUS ------------------------------- */
  useEffect(() => setFocus("name"), [setFocus]);

  /* ------------------------------- SUBMIT ------------------------------- */
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.contact,
          message: data.message || "",
          event: data.event,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error ?? "Error al enviar el mensaje");
      }

      /* -------------------------- TRACK LEAD -------------------------- */
      trackLead({
        eventType: data.event,
        source: "contact_form",
      });

      /* -------------------------- ÉXITO -------------------------- */
      setSent(true);
      setConfetti(true);
      reset();
      setTimeout(() => setConfetti(false), 4000);
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : "Error desconocido. Prueba WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------- SUCCESS ------------------------------- */
  if (sent) {
    return (
      <motion.div
        className="text-center py-12 glow-gold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {confetti && (
          <Confetti
            width={typeof window !== "undefined" ? window.innerWidth : 300}
            height={typeof window !== "undefined" ? window.innerHeight : 300}
            recycle={false}
            numberOfPieces={300}
          />
        )}
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 float" />
        <h3 className="text-2xl font-bold mb-2 gradient-text">
          ¡Mensaje enviado!
        </h3>
        <p className="text-white/70">
          Te respondemos en menos de 2 h con tu presupuesto personalizado.
        </p>
        <p className="text-oe-gold font-bold mt-4">
          10 % Dto. aplicado en tu presupuesto
        </p>
      </motion.div>
    );
  }

  /* ------------------------------- FORM ------------------------------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* ERROR GLOBAL */}
      {error && (
        <motion.div
          className="bg-red-500/10 border border-red-500 rounded-xl p-4 flex items-start gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-semibold">Error al enviar</p>
            <p className="text-red-300 text-sm">{error}</p>
            <a
              href="https://wa.me/34699121023?text=Hola!%20Tuve%20un%20problema%20con%20el%20formulario"
              className="text-oe-gold hover:underline text-sm mt-2 inline-block"
            >
              Contactar por WhatsApp →
            </a>
          </div>
        </motion.div>
      )}

      {/* NOMBRE */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nombre *
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition ${
            errors.name
              ? "border-red-500 focus:border-red-500"
              : "border-white/20 focus:border-[var(--oe-gold)]"
          }`}
          placeholder="Tu nombre"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <motion.p
            id="name-error"
            className="mt-1 text-red-400 text-sm flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4" />
            {errors.name.message}
          </motion.p>
        )}
      </div>

      {/* CONTACTO */}
      <div>
        <label htmlFor="contact" className="block text-sm font-medium mb-2">
          Email o Teléfono *
        </label>
        <input
          id="contact"
          type="text"
          {...register("contact")}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition ${
            errors.contact
              ? "border-red-500 focus:border-red-500"
              : "border-white/20 focus:border-[var(--oe-gold)]"
          }`}
          placeholder="tu@email.com o +34 600 000 000"
          autoComplete="tel email"
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "contact-error" : undefined}
        />
        {errors.contact && (
          <motion.p
            id="contact-error"
            className="mt-1 text-red-400 text-sm flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4" />
            {errors.contact.message}
          </motion.p>
        )}
      </div>

      {/* EVENTO */}
      <div>
        <label htmlFor="event" className="block text-sm font-medium mb-2">
          Tipo de evento *
        </label>
        <select
          id="event"
          {...register("event")}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition ${
            errors.event
              ? "border-red-500 focus:border-red-500"
              : "border-white/20 focus:border-[var(--oe-gold)]"
          }`}
          aria-invalid={!!errors.event}
        >
          <option value="">Selecciona...</option>
          <option value="boda">Boda</option>
          <option value="discomovil">Discomóvil</option>
          <option value="empresa">Evento empresa</option>
          <option value="fiesta">Fiesta privada</option>
          <option value="cumpleaños">Cumpleaños</option>
          <option value="tematizacion">Tematización</option>
          <option value="otro">Otro</option>
        </select>
        {errors.event && (
          <motion.p
            className="mt-1 text-red-400 text-sm flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4" />
            {errors.event.message}
          </motion.p>
        )}
      </div>

      {/* MENSAJE (OPCIONAL) */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Mensaje (opcional)
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[var(--oe-gold)] focus:outline-none transition resize-none"
          placeholder="Fecha del evento, ubicación, detalles especiales..."
        />
      </div>

      {/* CTA WOW */}
      <motion.button
        type="submit"
        disabled={isSubmitting || loading}
        className="w-full oe-btn-gold flex items-center justify-center gap-2 shadow-2xl glow-gold breathe disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        aria-label="Enviar formulario (10 % OFF hoy)"
      >
        {loading ? (
          <motion.div
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
            aria-label="Enviando..."
          />
        ) : (
          <Send className="w-5 h-5" />
        )}
        <span className="font-bold">
          {loading ? "Enviando..." : "Enviar (¡10 % OFF hoy!)"}
        </span>
      </motion.button>

      {/* PRIVACIDAD */}
      <p className="text-xs text-white/40 text-center">
        Al enviar aceptas nuestra{" "}
        <a href="/politica-privacidad" className="text-oe-gold hover:underline">
          política de privacidad
        </a>
        . Respuesta en menos de 2 h.
      </p>
    </form>
  );
}

