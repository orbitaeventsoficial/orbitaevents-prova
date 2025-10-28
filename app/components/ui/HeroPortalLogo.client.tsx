// app/components/ui/HeroPortalLogo.client.tsx
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type GlowColor = "gold" | "fuchsia" | "none";

type Props = {
  endColor?: string;
  zIndexClass?: string;
  sizePx?: number;
  liftVh?: number;
  glowColor?: GlowColor;
  glowStrength?: number;
  bubbles?: boolean;

  svgUrl?: string;
  enabled?: boolean;
  respectOnce?: boolean;
  autoHide?: boolean;
  fadeMs?: number;
  durationMs?: number;
  introHoldMs?: number;

  debug?: boolean;
  onFinish?: () => void;
  suppressSelectors?: string[];
};

function pickLogoNodes(svg: SVGSVGElement): SVGGraphicsElement[] {
  const sels = ["#planet, #planeta", "#ring, #anillo", "#satellite, #satelite"];
  const hits = sels.flatMap(sel => Array.from(svg.querySelectorAll<SVGGraphicsElement>(sel)));
  if (hits.length) return hits;
  return Array.from(svg.children).filter(
    (el): el is SVGGraphicsElement =>
      !/^(defs|clipPath|mask|style|title|desc)$/i.test(el.tagName)
  );
}

function killInternalAnimations(svg: SVGSVGElement) {
  svg.querySelectorAll("animate, animateTransform, animateMotion, set, script").forEach(n => n.remove());
  svg.querySelectorAll<SVGElement>("*").forEach(el => {
    el.removeAttribute("begin");
    el.removeAttribute("dur");
    el.removeAttribute("repeatCount");
    el.removeAttribute("values");
    el.removeAttribute("keyTimes");
    el.removeAttribute("calcMode");
    el.removeAttribute("onload");
  });
  const reset = document.createElementNS("http://www.w3.org/2000/svg", "style");
  reset.id = "__oe_anim_reset__";
  reset.textContent = `svg * { animation: none !important; transition: none !important; }`;
  svg.appendChild(reset);
  svg.querySelectorAll<HTMLElement>("*").forEach(el => {
    const s = (el as any).style as CSSStyleDeclaration | undefined;
    if (s) { try { s.animation = "none"; s.transition = "none"; } catch {} }
  });
}

function normalizeAndCenterSvg(svg: SVGSVGElement, debug = false) {
  killInternalAnimations(svg);

  let wrap = svg.querySelector<SVGGElement>("#__wrap_center__");
  if (!wrap) {
    wrap = document.createElementNS("http://www.w3.org/2000/svg", "g");
    wrap.id = "__wrap_center__";
    const nodes = pickLogoNodes(svg);

    const first = nodes[0];
    if (first && first.parentNode) {
      const parent = first.parentNode as Element;
      parent.appendChild(wrap);
      for (const n of nodes) {
        if (!n.closest("#__wrap_center__")) wrap.appendChild(n);
      }
    } else {
      const kids = Array.from(svg.childNodes).filter(
        n => n.nodeType === 1 && !(n as Element).tagName.match(/^(defs|clipPath|mask|style|title|desc)$/i)
      );
      svg.appendChild(wrap);
      for (const n of kids) wrap.appendChild(n as Element);
    }
  }

  let bb: DOMRect;
  try { bb = (wrap as any).getBBox(); }
  catch { svg.setAttribute("viewBox", "0 0 100 100"); return; }

  const w = Math.max(1, bb.width);
  const h = Math.max(1, bb.height);
  const cx = bb.x + w / 2;
  const cy = bb.y + h / 2;

  const size = Math.max(w, h) * 1.2;
  const vx = cx - size / 2;
  const vy = cy - size / 2;

  svg.setAttribute("viewBox", `${vx} ${vy} ${size} ${size}`);
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  Object.assign(svg.style, {
    width: "100%",
    height: "100%",
    transform: "none",
    backfaceVisibility: "hidden",
    overflow: "visible",
    contain: "layout paint style",
  } as CSSStyleDeclaration);

  svg.querySelectorAll("#wordmark, #texto, #logotype, text, tspan").forEach(el => {
    (el as SVGGraphicsElement).style.display = "none";
  });

  if (debug) console.debug("[HeroPortalLogo] viewBox:", svg.getAttribute("viewBox"));
}

function animateOne(root: HTMLElement | null, selector: string, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
  if (!root) return;
  const svg = root.querySelector("svg");
  if (!svg) return;
  const node = svg.querySelector<SVGElement>(selector);
  if (!node) return;

  (node.style as any).transformBox = "fill-box";
  (node.style as any).transformOrigin = "50% 50%";
  (node.style as any).willChange = "transform, opacity, filter";

  const anim = (node as any).animate(keyframes, {
    fill: "forwards",
    easing: "ease-out",
    composite: "replace",
    ...options,
  });

  anim.addEventListener?.("finish", () => {
    try { anim.commitStyles?.(); anim.cancel?.(); } catch {}
    (node.style as any).willChange = "auto";
  });
}

function ensureSplashCSS(selectors: string[]) {
  const id = "oe-splash-css";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  const target = [".hero-planet", ".planet-bg", "[data-hero-planet]", ...selectors]
    .filter(Boolean)
    .join(", ");
  style.textContent = `
    .oe-splash-active ${target} {
      opacity: 0 !important;
      visibility: hidden !important;
      transition: none !important;
    }
    ${target} {
      transition: opacity 360ms cubic-bezier(.16,1,.3,1), visibility 0s linear 120ms;
    }
  `;
  document.head.appendChild(style);
}

export default function HeroPortalLogo({
  endColor = "#0a0a0a",
  zIndexClass = "z-[9999]",
  sizePx = 180,
  liftVh = 0,
  glowColor = "gold",
  glowStrength = 0.75,
  bubbles = true,

  svgUrl = "/img/brand/orbita-glyph.anim.svg",

  enabled = true,
  respectOnce = true,
  autoHide = true,
  fadeMs = 950,
  durationMs,
  introHoldMs = 300,

  debug = false,
  onFinish,

  suppressSelectors = [],
}: Props) {
  const onceKey = "OE_SPLASH_SEEN";
  const [mounted, setMounted] = useState<boolean>(!!enabled);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [svgReady, setSvgReady] = useState(false);
  const [seqStarted, setSeqStarted] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  const shouldSkip = useMemo(() => {
    try { return respectOnce && typeof window !== "undefined" && sessionStorage.getItem(onceKey) === "1"; }
    catch { return false; }
  }, [respectOnce]);

  useEffect(() => {
    if (!enabled || shouldSkip) return;
    ensureSplashCSS(suppressSelectors);
    document.documentElement.classList.add("oe-splash-active");
    return () => { document.documentElement.classList.remove("oe-splash-active"); };
  }, [enabled, shouldSkip, suppressSelectors]);

  useEffect(() => {
    if (!enabled || shouldSkip) { setMounted(false); return; }
    let alive = true;
    fetch(svgUrl, { cache: "force-cache" })
      .then(r => (r.ok ? r.text() : ""))
      .then(t => { if (alive) setSvgMarkup(t || null); })
      .catch(() => { if (alive) setSvgMarkup(null); });
    return () => { alive = false; };
  }, [enabled, shouldSkip, svgUrl]);

  useEffect(() => {
    if (!svgMarkup) return;
    setSvgReady(true);
    const t = window.setTimeout(() => setSeqStarted(true), introHoldMs);
    timers.current.push(t);
  }, [svgMarkup, introHoldMs]);

  useEffect(() => {
    if (!svgReady) return;
    const svg = hostRef.current?.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;
    normalizeAndCenterSvg(svg, debug);
  }, [svgReady, debug]);

  useEffect(() => {
    if (!seqStarted) return;

    animateOne(hostRef.current, "#planet, #planeta", [
      { opacity: 0, transform: "scale(0.96) translateY(10px)", filter: "blur(10px)" },
      { opacity: 1, transform: "none",                          filter: "blur(0)"   },
    ], { duration: 620, delay: 0 });

    animateOne(hostRef.current, "#ring, #anillo", [
      { opacity: 0, transform: "translate(30px,-24px) rotate(-12deg) scale(0.94)", filter: "blur(8px)" },
      { opacity: 1, transform: "none",                                             filter: "blur(0)"   },
    ], { duration: 680, delay: 150 });

    animateOne(hostRef.current, "#satellite, #satelite", [
      { opacity: 0, transform: "translate(-14px,-18px) scale(0.92)", filter: "blur(6px)" },
      { opacity: 1, transform: "none",                                filter: "blur(0)"   },
    ], { duration: 540, delay: 300 });
  }, [seqStarted]);

  useEffect(() => {
    if (!autoHide || !mounted) return;
    const total =
      durationMs ??
      (introHoldMs + 620 + 150 + 680 + 150 + 540 + 200 + fadeMs);

    const tEnd = window.setTimeout(() => {
      document.documentElement.classList.remove("oe-splash-active");
      setMounted(false);
      try { if (respectOnce) sessionStorage.setItem(onceKey, "1"); } catch {}
      onFinish?.();
    }, total);

    timers.current.push(tEnd);
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, [autoHide, mounted, durationMs, introHoldMs, fadeMs, respectOnce, onFinish]);

  if (!mounted) return null;

  const frameStyle: React.CSSProperties = {
    width: `${sizePx}px`,
    height: `${sizePx}px`,
    transform: liftVh ? `translateY(${liftVh}vh)` : undefined,
    display: "grid",
    placeItems: "center",
  };

  const glow =
    glowColor === "none" ? undefined
    : glowColor === "gold"
      ? "radial-gradient(55% 40% at 50% 58%, rgba(255,215,150,0.6), rgba(255,215,150,0.18), transparent 72%)"
      : "radial-gradient(55% 40% at 50% 58%, rgba(255,40,180,0.75), rgba(255,40,180,0.22), transparent 72%)";
  const glowOpacity = Math.min(1, 0.8 * glowStrength);
  const glowBlur = 36 * Math.max(0.5, glowStrength);

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        className={`fixed inset-0 ${zIndexClass} pointer-events-none`}
        initial={{ opacity: 1, backgroundColor: "#000" }}
        animate={{ opacity: 1, backgroundColor: "#000" }}
        exit={{ opacity: 0, backgroundColor: endColor }}
        transition={{ duration: fadeMs / 1000, ease: "easeInOut" }}
        aria-hidden="true"
      >
        {bubbles && (
          <>
            <Bubbles count={60} blur={16} speedFactor={0.45} opacity={0.22} />
            <Bubbles count={120} blur={10} speedFactor={1.05} opacity={0.50} />
          </>
        )}

        {glow && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              background: glow,
              filter: `blur(${glowBlur}px)`,
              mixBlendMode: "screen",
              opacity: glowOpacity,
            }}
          />
        )}

        <div className="absolute inset-0 grid place-items-center" style={{ zIndex: 2 }}>
          <div className="relative overflow-visible" style={frameStyle}>
            {svgMarkup && (
              <div
                ref={hostRef}
                className="absolute inset-0 overflow-visible"
                style={{ opacity: svgReady ? 1 : 0 }}
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
              />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Bubbles({
  count = 120,
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
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

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
      const baseVy = 0.25 + Math.random() * 1.4;
      return {
        x: Math.random() * w,
        y: h + Math.random() * h * 0.5,
        r,
        vy: baseVy * speedFactor,
        vx: (-0.2 + Math.random() * 0.4) * speedFactor,
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
        b.blink += 0.02;
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
    const onResize = () => { const s = resize(); w = s.w; h = s.h; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [count, blur, speedFactor]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0" style={{ opacity, zIndex: 0 }} />;
}
