// components/ui/HeroPortalLogo.tsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Versión “sencilla y legal” del HeroPortalLogo:
 * - Carga el SVG desde /public y lo centra.
 * - Anima planeta/anillo/satélite si existen.
 * - Opción de auto-ocultar al final para no molestar.
 * - Sin “as any” dentro de objetos, sin comas colgando, sin JSX raro.
 */

export type HeroPortalLogoProps = {
  svgUrl?: string;       // p.ej. "/img/brand/orbita-glyph.anim.svg"
  autoHide?: boolean;    // si true, desaparece al terminar
  durationMs?: number;   // duración total visible
  fadeMs?: number;       // duración del fade final
  zIndexClass?: string;  // p.ej. "z-[9999]"
  sizePx?: number;       // tamaño máximo del logo
  liftVh?: number;       // desplazamiento vertical
  showWordmark?: boolean;
  onFinish?: () => void;
};

export default function HeroPortalLogo({
  svgUrl = "/img/brand/orbita-glyph.anim.svg",
  autoHide = true,
  durationMs = 5600,
  fadeMs = 1300,
  zIndexClass = "z-[9999]",
  sizePx = 280,
  liftVh = -8,
  showWordmark = true,
  onFinish,
}: HeroPortalLogoProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [svgMarkup, setSvgMarkup] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(true);
  const [fading, setFading] = useState<boolean>(false);

  // Carga del SVG
  useEffect(() => {
    let alive = true;
    fetch(svgUrl)
      .then(r => r.text())
      .then(txt => { if (alive) setSvgMarkup(txt); })
      .catch(() => { if (alive) setSvgMarkup(""); });
    return () => { alive = false; };
  }, [svgUrl]);

  // Recentrado y animaciones básicas
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const svg = el.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;

    // Limpia tamaño fijo
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // Envolver contenido para poder trasladar
    let wrap = svg.querySelector("#__wrap_center__") as SVGGElement | null;
    if (!wrap) {
      wrap = document.createElementNS("http://www.w3.org/2000/svg", "g");
      wrap.setAttribute("id", "__wrap_center__");
      const kids = Array.from(svg.childNodes);
      kids.forEach(n => wrap!.appendChild(n));
      svg.appendChild(wrap);
    }

    const target =
      (svg.querySelector("#planet, #planeta, #ring, #anillo") as SVGGraphicsElement | null) || wrap;

    const centerNow = () => {
      if (!svg.viewBox || !svg.viewBox.baseVal) return;
      const vb = svg.viewBox.baseVal;
      const b = target ? target.getBBox() : { x: 0, y: 0, width: vb.width, height: vb.height };
      const cx = b.x + b.width / 2;
      const cy = b.y + b.height / 2;
      const desiredX = vb.x + vb.width / 2;
      const desiredY = vb.y + vb.height / 2;
      const dx = desiredX - cx;
      const dy = desiredY - cy;
      wrap!.setAttribute("transform", "translate(" + dx + "," + dy + ")");
    };

    centerNow();
    const ro = new ResizeObserver(centerNow);
    ro.observe(document.documentElement);

    // Wordmark: oculta de inicio si procede
    const wordmarkSel = "text, tspan, #wordmark, #texto, #logotype";
    const wmNodes = Array.from(svg.querySelectorAll<SVGGraphicsElement>(wordmarkSel));
    if (!showWordmark) {
      wmNodes.forEach(n => {
        const s = n.style as CSSStyleDeclaration;
        s.display = "none";
      });
    } else {
      wmNodes.forEach(n => {
        const s = n.style as CSSStyleDeclaration;
        s.opacity = "0";
      });
    }

    // Anim utilitaria nativa
    const anim = (selector: string, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
      const nodes = svg.querySelectorAll(selector);
      nodes.forEach(n => {
        const elAny = n as unknown as HTMLElement;
        if (typeof elAny.animate === "function") {
          elAny.animate(keyframes, options);
        }
      });
    };

    // Planeta
    anim(
      "#planet, #planeta",
      [
        { opacity: 0, transform: "scale(0.9) translateY(30px)", filter: "blur(10px)" },
        { opacity: 1, transform: "scale(1.04) translateY(0)", filter: "blur(0)" },
        { opacity: 1, transform: "scale(1)", filter: "blur(0)" }
      ],
      { duration: 950, delay: 0, easing: "ease-out", fill: "forwards" }
    );

    // Anillo
    const RING_DELAY = 250;
    const RING_DURATION = 1100;
    anim(
      "#ring, #anillo",
      [
        { opacity: 0, transform: "translate(80px,-60px) rotate(-22deg) scale(0.9)", filter: "blur(10px)" },
        { opacity: 1, transform: "translate(-5px,5px) rotate(6deg) scale(1.05)", filter: "blur(2px)" },
        { opacity: 1, transform: "translate(0,0) rotate(0deg) scale(1)", filter: "blur(0)" }
      ],
      { duration: RING_DURATION, delay: RING_DELAY, easing: "ease-out", fill: "forwards" }
    );

    // Wordmark después del anillo
    const WORDMARK_DELAY = RING_DELAY + RING_DURATION + 120;
    const wmTimer = window.setTimeout(() => {
      if (showWordmark) {
        wmNodes.forEach(n => {
          const s = n.style as CSSStyleDeclaration;
          s.opacity = "";
        });
        anim(
          wordmarkSel,
          [
            { opacity: 0, transform: "translateY(24px)", filter: "blur(10px)" },
            { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }
          ],
          { duration: 900, delay: 0, easing: "ease-out", fill: "forwards" }
        );
      }
    }, WORDMARK_DELAY);

    // Auto-ocultar
    const t1 = window.setTimeout(() => {
      if (autoHide) setFading(true);
    }, Math.max(0, durationMs - fadeMs));

    const t2 = window.setTimeout(() => {
      if (autoHide) setMounted(false);
      if (onFinish) onFinish();
    }, durationMs);

    return () => {
      window.clearTimeout(wmTimer);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro.disconnect();
    };
  }, [svgMarkup, showWordmark, autoHide, durationMs, fadeMs, onFinish]);

  if (!mounted) return null;

  return (
    <div
      role="presentation"
      aria-hidden={fading}
      className={"fixed inset-0 " + zIndexClass + " overflow-visible"}
      style={{
        opacity: fading ? 0 : 1,
        backgroundColor: "#000000",
        transition: "opacity 1.2s ease-in-out",
        pointerEvents: fading ? "none" : "auto"
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          zIndex: 2,
          transform: "translateY(" + String(liftVh) + "vh)"
        }}
      >
        <div
          ref={hostRef}
          className="relative overflow-visible"
          style={{ width: String(sizePx) + "px", height: String(sizePx) + "px" }}
          // Sí, esto es intencionado y válido
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      </div>
    </div>
  );
}
