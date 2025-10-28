// app/components/ui/HeroPortalLogo.client.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Color final del fondo cuando se desvanece el portal (coincide con bg del sitio) */
  endColor?: string; // default "#0a0a0b"
  /** Duración total de la secuencia en ms (incluye intro + fade) */
  totalMs?: number; // default 7600
  /** Duración del desvanecido final del portal */
  fadeMs?: number; // default 2800
  /** Tiempo que el logo permanece quieto antes del fade */
  introHoldMs?: number; // default 800
  /** Duración del fundido de entrada del logo */
  introFadeMs?: number; // default 1400
};

// Curvas compatibles con motion-dom (cubic-bezier)
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function HeroPortalLogo({
  endColor = "#0a0a0b",
  totalMs = 7600,
  fadeMs = 2800,
  introHoldMs = 800,
  introFadeMs = 1400
}: Props) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timeouts = useRef<number[]>([]);

  // Crear contenedor para el portal
  useEffect(() => {
    setMounted(true);
    const clearAll = () => {
      timeouts.current.forEach((t) => window.clearTimeout(t));
      timeouts.current = [];
    };
    // Programar final automático de la secuencia
    const t = window.setTimeout(() => setDone(true), Math.max(0, totalMs));
    timeouts.current.push(t);
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalMs]);

  // Duraciones ajustadas si reduce motion
  const introDuration = reduce ? 0.6 : introFadeMs / 1000;
  const holdDelay = reduce ? 0.2 : introHoldMs / 1000;
  const outroDuration = reduce ? 0.5 : fadeMs / 1000;

  const variants = useMemo(
    () => ({
      bg: {
        initial: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: outroDuration, ease: EASE_OUT } }
      },
      logo: {
        initial: { opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 8 },
        animate: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: introDuration, ease: EASE_OUT }
        },
        exit: {
          opacity: 0,
          scale: reduce ? 1 : 1.02,
          y: reduce ? 0 : -6,
          transition: { duration: outroDuration, ease: EASE_IN_OUT, delay: holdDelay }
        }
      }
    }),
    [introDuration, outroDuration, holdDelay, reduce]
  );

  if (!mounted || done) return null;

  // Capa fija al tope de la pila visual
  const overlay = (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2000]"
      style={{ isolation: "isolate" }}
    >
      {/* Fondo: halo + degradado hacia el color final del sitio */}
      <motion.div
        className="absolute inset-0"
        initial="initial"
        animate="initial"
        exit="exit"
        variants={variants.bg}
        style={{
          background:
            `radial-gradient(60% 45% at 50% 45%, rgba(215,184,110,0.16), transparent 70%), ${endColor}`
        }}
      />

      {/* Logo centrado */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          variants={variants.logo}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pointer-events-none"
        >
          <img
            src="/img/brand/orbitalockupwhite.png"
            alt=""
            className="h-20 w-auto opacity-95 md:h-24"
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );

  return typeof window !== "undefined" ? createPortal(overlay, document.body) : null;
}
