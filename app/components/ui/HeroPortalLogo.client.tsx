"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type GlowColor = "gold" | "fuchsia" | "none";

type Props = {
  endColor?: string;
  glowColor?: GlowColor;
  glowStrength?: number;
  onFinish?: () => void;
  svgUrl?: string;
  totalMs?: number;
  fadeMs?: number;
  introHoldMs?: number;
  introFadeMs?: number;
};

export default function HeroPortalLogo({
  endColor = "#0a0a0a",
  glowColor = "gold",
  glowStrength = 0.65,
  onFinish,
  svgUrl = "/img/brand/orbita-glyph.anim.svg",
  totalMs = 7600,
  fadeMs = 2800,
  introHoldMs = 800,
  introFadeMs = 1400,
}: Props) {
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);

  /** Duraciones reales (sin ralentizador) */
  const DUR_PLANET = 850;
  const RING_DELAY = 200;
  const RING_DURATION = 900;
  const SAT_DELAY = 400;
  const DUR_SAT = 800;
  const EXTRA_AFTER_RING = 250;

  /* Cargar SVG */
  useEffect(() => {
    let alive = true;
    fetch(svgUrl, { cache: "force-cache" })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.statusText))))
      .then((t) => {
        if (alive) setSvgMarkup(t);
      })
      .catch(() => setSvgMarkup(null));
    return () => {
      alive = false;
    };
  }, [svgUrl]);

  /* Centrado de viewBox */
  useEffect(() => {
    if (!svgMarkup) return;
    const el = hostRef.current;
    if (!el) return;

    const svg = el.querySelector("svg") as SVGSVGElement | null;
    if (!svg?.viewBox?.baseVal) return;

    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    (svg.style as any).overflow = "visible";

    let wrap = svg.querySelector("#__wrap_center__") as SVGGElement | null;
    if (!wrap) {
      wrap = document.createElementNS("http://www.w3.org/2000/svg", "g");
      wrap.setAttribute("id", "__wrap_center__");
      const kids = Array.from(svg.childNodes);
      for (const k of kids) wrap.appendChild(k);
      svg.appendChild(wrap);
    }

    const target =
      (svg.querySelector("#planet, #planeta, #ring, #anillo") as SVGGraphicsElement | null) || wrap;

    const centerNow = () => {
      const vb = svg.viewBox.baseVal;
      const b = target.getBBox();
      const cx = b.x + b.width / 2;
      const cy = b.y + b.height / 2;
      const desiredX = vb.x + vb.width / 2;
      const desiredY = vb.y + vb.height / 2;
      wrap!.setAttribute("transform", `translate(${desiredX - cx}, ${desiredY - cy})`);
    };

    centerNow();
    const ro = new ResizeObserver(centerNow);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [svgMarkup]);

  /* Animaciones */
  useEffect(() => {
    if (!svgMarkup) return;
    const svg = hostRef.current?.querySelector("svg");
    if (!svg) return;

    const anim = (sel: string, kf: Keyframe[], opt: KeyframeAnimationOptions) =>
      svg.querySelectorAll(sel).forEach((n) => (n as any).animate(kf, opt));

    const WORDMARK_SEL =
      "#wordmark, #texto, #logotype, [id*='wordmark' i], [id*='texto' i], [id*='logotype' i], text, tspan";
    const wmNodes = Array.from(svg.querySelectorAll<SVGGraphicsElement>(WORDMARK_SEL));
    wmNodes.forEach((n) => ((n.style as any).opacity = "0"));

    // PLANETA
    anim(
      "#planet, #planeta",
      [
        { opacity: 0, transform: "scale(0.85) translateY(20px)", filter: "blur(10px)" },
        { opacity: 1, transform: "scale(1.03) translateY(0)", filter: "blur(0)" },
        { opacity: 1, transform: "scale(1)", filter: "blur(0)" },
      ],
      { duration: DUR_PLANET, easing: "ease-out", fill: "forwards" }
    );

    // ANILLO
    anim(
      "#ring, #anillo",
      [
        { opacity: 0, transform: "translate(80px,-60px) rotate(-22deg) scale(0.9)", filter: "blur(10px)" },
        { opacity: 1, transform: "translate(-5px,5px) rotate(6deg) scale(1.05)", filter: "blur(2px)", offset: 0.4 },
        { opacity: 1, transform: "translate(0,0) rotate(0deg) scale(1)", filter: "blur(0)" },
      ],
      { duration: RING_DURATION, delay: RING_DELAY, easing: "ease-out", fill: "forwards" }
    );

    // SATÉLITE — aparición + flotación continua
    const satNodes = svg.querySelectorAll("#satellite, #satelite");
    satNodes.forEach((n) => {
      (n as any).animate(
        [
          { opacity: 0, transform: "translate(-25px,-30px) scale(0.8)", filter: "blur(8px)" },
          { opacity: 1, transform: "translate(0,0) scale(1)", filter: "blur(0)" },
        ],
        {
          duration: DUR_SAT,
          delay: RING_DELAY + RING_DURATION + SAT_DELAY,
          easing: "ease-out",
          fill: "forwards",
        }
      );
      (n as any).animate(
        [
          { transform: "translateY(0px)" },
          { transform: "translateY(-3px)" },
          { transform: "translateY(0px)" },
        ],
        {
          duration: 4000,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: RING_DELAY + RING_DURATION + SAT_DELAY + DUR_SAT,
        }
      );
    });

    // WORDMARK
    const WORDMARK_DELAY = RING_DELAY + RING_DURATION + EXTRA_AFTER_RING + SAT_DELAY + DUR_SAT * 0.2;
    const wmTimer = window.setTimeout(() => {
      wmNodes.forEach((n) => ((n.style as any).opacity = ""));
      anim(
        WORDMARK_SEL,
        [
          { opacity: 0, transform: "translateY(20px)", filter: "blur(10px)", letterSpacing: "0.2em" },
          { opacity: 1, transform: "translateY(0)", filter: "blur(0)", letterSpacing: "0em" },
        ],
        { duration: 800, easing: "ease-out", fill: "forwards" }
      );
    }, WORDMARK_DELAY);

    // Glow
    const glowEl = document.getElementById("brand-glow");
    if (glowEl && glowColor !== "none") {
      (glowEl as any).animate(
        [{ opacity: 0 }, { opacity: Math.min(0.9, glowStrength) }],
        { duration: 800, delay: 600, easing: "linear", fill: "forwards" }
      );
    }

    // Fade final + desmontaje
    const t1 = window.setTimeout(() => setVisible(false), Math.max(0, totalMs - fadeMs));
    const t2 = window.setTimeout(() => {
      setMounted(false);
      onFinish?.();
    }, totalMs);

    return () => {
      clearTimeout(wmTimer);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [svgMarkup, glowColor, glowStrength, totalMs, fadeMs, onFinish]);

  if (!mounted || !svgMarkup) return null;

  const glowStyle: React.CSSProperties | undefined =
    glowColor === "none"
      ? undefined
      : glowColor === "gold"
      ? {
          background:
            "radial-gradient(55% 40% at 50% 58%, rgba(255,215,150,0.6), rgba(255,215,150,0.18), transparent 72%)",
          filter: "blur(60px)",
          mixBlendMode: "screen",
          opacity: 0,
        }
      : {
          background:
            "radial-gradient(55% 40% at 50% 58%, rgba(255,40,180,0.75), rgba(255,40,180,0.22), transparent 72%)",
          filter: "blur(60px)",
          mixBlendMode: "screen",
          opacity: 0,
        };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="orbita-portal"
          aria-hidden
          className="fixed inset-0 z-[1500] overflow-visible pointer-events-none"
          initial={{ opacity: 1, backgroundColor: "#000000" }}
          animate={{ opacity: 1, backgroundColor: endColor }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeMs / 1000, ease: "easeInOut" }}
        >
          {/* Telón negro */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              delay: introHoldMs / 1000,
              duration: introFadeMs / 1000,
              ease: "easeInOut",
            }}
            style={{ zIndex: 5 }}
          />

          {/* Viñeteado */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
              zIndex: 1,
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.25 }}
            transition={{
              delay: (introHoldMs + introFadeMs) / 1000,
              duration: 0.8,
              ease: "easeOut",
            }}
          />

          {/* Partículas */}
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <ChampagneBubbles key="back" count={90} blur={16} speedFactor={0.4} opacity={0.2} />
            <ChampagneBubbles key="front" count={150} blur={8} speedFactor={0.85} opacity={0.45} />
          </div>

          {/* Glow */}
          {glowColor !== "none" && (
            <div id="brand-glow" className="absolute inset-0" style={{ zIndex: 2, ...glowStyle }} />
          )}

          {/* SVG centrado */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
            <motion.div
              ref={hostRef}
              className="relative overflow-visible"
              style={{ width: "min(80vmin, 540px)", height: "min(80vmin, 540px)" }}
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
              initial={{ scale: 1.02, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: (introHoldMs + introFadeMs * 0.6) / 1000,
                duration: 0.6,
                ease: "easeOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Burbujeo de fondo */
function ChampagneBubbles({
  count = 180,
  blur = 12,
  speedFactor = 1,
  opacity = 0.7,
}: {
  count?: number;
  blur?: number;
  speedFactor?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      const w = (c.width = Math.floor(window.innerWidth * DPR));
      const h = (c.height = Math.floor(window.innerHeight * DPR));
      c.style.width = `${w / DPR}px`;
      c.style.height = `${h / DPR}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      return { w: w / DPR, h: h / DPR };
    };

    let { w, h } = resize();
    const bubbles = Array.from({ length: count }).map(() => {
      const r = 2 + Math.random() * 8;
      const baseVy = 0.2 + Math.random() * 1.0;
      return {
        x: Math.random() * w,
        y: h + Math.random() * h * 0.5,
        r,
        vy: baseVy * speedFactor,
        vx: (-0.1 + Math.random() * 0.2) * speedFactor,
        a: 0.25 + Math.random() * 0.3,
        blink: Math.random() * Math.PI * 2,
      };
    });

    let raf = 0;
    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      for (const b of bubbles) {
        b.y -= b.vy;
        b.x += b.vx;
        b.blink += 0.01;
        if (b.y < -b.r * 4) {
          b.y = h + 20;
          b.x = Math.random() * w;
        }
        const tw = 0.25 + Math.abs(Math.sin(b.blink)) * 0.35;
        ctx.save();
        ctx.shadowBlur = blur;
        ctx.shadowColor = "rgba(255,215,130,0.45)";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,130,${b.a * tw})`;
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(paint);
    };

    paint();
    const onResize = () => {
      const s = resize();
      w = s.w;
      h = s.h;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count, blur, speedFactor]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0" style={{ opacity }} />;
}
