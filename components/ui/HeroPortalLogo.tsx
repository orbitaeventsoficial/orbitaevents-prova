"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function HeroPortalLogo({
  endColor = "#0b0c0d",
  enabled = true,
  durationMs = 900
}: { endColor?: string; enabled?: boolean; durationMs?: number }) {
  const [visible, setVisible] = useState<boolean>(!!enabled);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) { setVisible(false); return; }
    let alive = true;

    // Carga ligera del SVG
    fetch("/img/brand/orbita-glyph.anim.svg", { cache: "force-cache" })
      .then(r => r.ok ? r.text() : Promise.resolve(""))
      .then(t => { if (alive) setSvg(t || null); })
      .catch(() => setSvg(null));

    // Autodesmontaje: fade y fuera
    const t = setTimeout(() => { if (alive) setVisible(false); }, durationMs + 200);
    return () => { alive = false; clearTimeout(t); };
  }, [enabled, durationMs]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none"
      initial={{ opacity: 1, backgroundColor: "#000" }}
      animate={{ opacity: 0, backgroundColor: endColor }}
      transition={{ duration: durationMs / 1000 }}
    >
      {svg && (
        <div
          className="absolute inset-0 grid place-items-center"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </motion.div>
  );
}