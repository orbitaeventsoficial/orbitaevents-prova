"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

type Props = {
  // Props ya existentes
  endColor?: string;
  enabled?: boolean;
  durationMs?: number;

  // Props que tu App.tsx está enviando
  svgUrl?: string;            // "/img/brand/orbita-glyph.anim.svg"
  autoHide?: boolean;         // si true, se auto-oculta tras durationMs
  fadeMs?: number;            // duración del fundido
  respectOnce?: boolean;      // no volver a mostrar en esta sesión
  zIndexClass?: string;       // clase de z-index (ej: "z-[9999]")
  sizePx?: number;            // tamaño máximo del svg (px)
  liftVh?: number;            // desplazar ligeramente hacia arriba en vh
  float?: boolean;            // no usado aquí, lo aceptamos sin romper
  showWordmark?: boolean;     // si necesitaras mostrar logo/wordmark
  debug?: boolean;            // console.debug
  onFinish?: () => void;      // callback al terminar
};

export default function HeroPortalLogo({
  endColor = "#0b0c0d",
  enabled = true,
  durationMs = 2400,

  svgUrl = "/img/brand/orbita-glyph.anim.svg",
  autoHide = true,
  fadeMs = 800,
  respectOnce = true,
  zIndexClass = "z-[9999]",
  sizePx = 320,
  liftVh = 0,
  // float, showWordmark no afectan a esta implementación, los aceptamos
  debug = false,
  onFinish,
}: Props) {
  const [visible, setVisible] = useState<boolean>(!!enabled);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const onceKey = "OE_SPLASH_SEEN";
  const timerRef = useRef<number | null>(null);

  // Saltar si ya se vio en esta sesión
  const shouldSkip = useMemo(() => {
    try {
      return respectOnce && typeof window !== "undefined" && sessionStorage.getItem(onceKey) === "1";
    } catch {
      return false;
    }
  }, [respectOnce]);

  useEffect(() => {
    if (!enabled || shouldSkip) {
      setVisible(false);
      return;
    }
    let alive = true;

    // carga del svg
    fetch(svgUrl, { cache: "force-cache" })
      .then(r => (r.ok ? r.text() : ""))
      .then(t => { if (alive) setSvgMarkup(t || null); })
      .catch(() => { if (alive) setSvgMarkup(null); });

    if (autoHide) {
      timerRef.current = window.setTimeout(() => {
        if (!alive) return;
        setVisible(false);
        try { if (respectOnce) sessionStorage.setItem(onceKey, "1"); } catch {}
        if (debug) console.debug("[HeroPortalLogo] autoHide complete");
        onFinish?.();
      }, durationMs);
    }

    return () => {
      alive = false;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [enabled, autoHide, durationMs, svgUrl, respectOnce, shouldSkip, debug, onFinish]);

  if (!visible) return null;

  // estilo contenedor del svg
  const contentStyle: React.CSSProperties = {
    maxWidth: sizePx ? `${sizePx}px` : undefined,
    maxHeight: sizePx ? `${sizePx}px` : undefined,
    transform: liftVh ? `translateY(${liftVh * -1}vh)` : undefined,
  };

  return (
    <motion.div
      className={`fixed inset-0 ${zIndexClass} pointer-events-none`}
      initial={{ opacity: 1, backgroundColor: "#000" }}
      animate={{ opacity: 0, backgroundColor: endColor }}
      transition={{ duration: fadeMs / 1000 }}
      aria-hidden="true"
    >
      {svgMarkup && (
        <div
          className="absolute inset-0 grid place-items-center"
          style={contentStyle}
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      )}
    </motion.div>
  );
}