/**
 * HeroPortalLogo.tsx
 * 
 * ANIMACIÓN PORTAL ÓRBITA EVENTS - VERSIÓN BRUTAL Y FIABLE
 * ========================================================
 * 
 * Secuencia garantizada:
 * 1. Pantalla negra (hold)
 * 2. Burbujas/partículas
 * 3. Planeta
 * 4. Anillo
 * 5. Satélite
 * 6. Texto/Wordmark
 * 7. Fundido cinematográfico
 * 
 * FEATURES:
 * - Compatible SSR/CSR (Next.js safe)
 * - Fallbacks robustos si SVG no existe o tiene IDs diferentes
 * - CSS inline para evitar conflictos con globals
 * - Timings precisos y configurables
 * - Optimizado para Chrome, Safari, Firefox
 * - Sin memory leaks
 * - Accesible (aria-hidden, no bloquea interacción)
 */

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ========================================
// TYPES
// ========================================

type GlowColor = "gold" | "fuchsia" | "none";

interface HeroPortalLogoProps {
  /** Color de fondo final (después del fade) */
  endColor?: string;
  
  /** Color del glow (gold/fuchsia/none) */
  glowColor?: GlowColor;
  
  /** Intensidad del glow (0-1) */
  glowStrength?: number;
  
  /** Callback cuando termina la animación */
  onFinish?: () => void;
  
  /** URL del SVG (debe estar en /public) */
  svgUrl?: string;
  
  /** Duración total de la animación (ms) */
  totalMs?: number;
  
  /** Duración del fade final (ms) */
  fadeMs?: number;
  
  /** Duración del hold inicial de pantalla negra (ms) */
  introHoldMs?: number;
  
  /** Duración del fade del telón negro (ms) */
  introFadeMs?: number;
  
  /** Multiplicador de velocidad (1 = normal, >1 = más lento) */
  speedMultiplier?: number;
}

// ========================================
// COMPONENT PRINCIPAL
// ========================================

export default function HeroPortalLogo({
  endColor = "#0a0a0a",
  glowColor = "gold",
  glowStrength = 0.65,
  onFinish,
  svgUrl = "/img/orbita-glyph.anim.svg",
  totalMs = 2800,
  fadeMs = 800,
  introHoldMs = 400,
  introFadeMs = 600,
  speedMultiplier = 1,
}: HeroPortalLogoProps) {
  // ========================================
  // STATE & REFS
  // ========================================
  
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);
  const [svgError, setSvgError] = useState(false);
  
  const hostRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);
  const hasAnimated = useRef(false);
  
  // ========================================
  // TIMING CALCULATIONS
  // ========================================
  
  const SPEED = speedMultiplier;
  
  // Telón negro inicial
  const TELON_HOLD = Math.round(introHoldMs * SPEED);
  const TELON_FADE = Math.round(introFadeMs * SPEED);
  const SEQ_TELON_END = TELON_HOLD + TELON_FADE;
  
  // Delays entre elementos
  const BUBBLES_DELAY = Math.round(0 * SPEED); // Aparecen con el telón
  const PLANET_DELAY = Math.round(120 * SPEED);
  const RING_DELAY = Math.round(180 * SPEED);
  const SAT_DELAY = Math.round(200 * SPEED);
  const WORDMARK_DELAY = Math.round(180 * SPEED);
  
  // Duraciones de animación
  const DUR_PLANET = Math.round(500 * SPEED);
  const DUR_RING = Math.round(600 * SPEED);
  const DUR_SAT = Math.round(500 * SPEED);
  const DUR_WORDMARK = Math.round(600 * SPEED);
  
  // Timestamps absolutos
  const PLANET_START = SEQ_TELON_END + PLANET_DELAY;
  const RING_START = PLANET_START + RING_DELAY;
  const SAT_START = RING_START + SAT_DELAY;
  const WORDMARK_START = SAT_START + WORDMARK_DELAY;
  
  const EFFECTIVE_TOTAL_MS = Math.round(totalMs * SPEED);
  const EFFECTIVE_FADE_MS = Math.round(fadeMs * SPEED);
  
  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  
  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);
  
  // ========================================
  // FETCH SVG
  // ========================================
  
  useEffect(() => {
    let alive = true;
    
    fetch(svgUrl, { cache: "force-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (alive) {
          setSvgMarkup(text);
          setSvgError(false);
        }
      })
      .catch((err) => {
        console.warn(`[HeroPortalLogo] Error loading SVG: ${err.message}`);
        if (alive) {
          setSvgError(true);
          setSvgMarkup(null);
        }
      });
    
    return () => {
      alive = false;
    };
  }, [svgUrl]);
  
  // ========================================
  // CENTER SVG (VIEWPORT CENTERING)
  // ========================================
  
  useEffect(() => {
    if (!svgMarkup || !hostRef.current) return;
    
    const svg = hostRef.current.querySelector("svg") as SVGSVGElement | null;
    if (!svg?.viewBox?.baseVal) return;
    
    // Remove hardcoded dimensions
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    (svg.style as any).overflow = "visible";
    
    // Wrap all content for centering
    let wrap = svg.querySelector("#__wrap_center__") as SVGGElement | null;
    if (!wrap) {
      wrap = document.createElementNS("http://www.w3.org/2000/svg", "g");
      wrap.setAttribute("id", "__wrap_center__");
      const kids = Array.from(svg.childNodes);
      for (const k of kids) wrap.appendChild(k);
      svg.appendChild(wrap);
    }
    
    // Find target element to center (prefer planet/ring)
    const targetGrp =
      (svg.querySelector("#planet, #planeta, #ring, #anillo") as SVGGraphicsElement | null) || wrap;
    
    const centerNow = () => {
      try {
        const vb = svg.viewBox.baseVal;
        const b = targetGrp.getBBox();
        const cx = b.x + b.width / 2;
        const cy = b.y + b.height / 2;
        const desiredX = vb.x + vb.width / 2;
        const desiredY = vb.y + vb.height / 2;
        wrap!.setAttribute("transform", `translate(${desiredX - cx}, ${desiredY - cy})`);
      } catch (e) {
        // Silently ignore bbox errors
      }
    };
    
    centerNow();
    const ro = new ResizeObserver(centerNow);
    ro.observe(document.documentElement);
    
    return () => ro.disconnect();
  }, [svgMarkup]);
  
  // ========================================
  // MAIN ANIMATION SEQUENCE
  // ========================================
  
  useEffect(() => {
    if (!svgMarkup || !hostRef.current || hasAnimated.current) return;
    
    const svg = hostRef.current.querySelector("svg");
    if (!svg) return;
    
    // Mark as animated to prevent re-runs
    hasAnimated.current = true;
    
    // ========================================
    // FIND SVG ELEMENTS (with fallbacks)
    // ========================================
    
    const findElements = (selectors: string[]): SVGElement[] => {
      for (const sel of selectors) {
        const els = Array.from(svg.querySelectorAll<SVGElement>(sel));
        if (els.length > 0) return els;
      }
      return [];
    };
    
    let planetEls = findElements([
      "#planet",
      "#planeta",
      "[id*='planet' i]",
      "[class*='planet' i]",
    ]);
    
    let ringEls = findElements([
      "#ring",
      "#anillo",
      "[id*='ring' i]",
      "[id*='anillo' i]",
      "[class*='ring' i]",
    ]);
    
    let satEls = findElements([
      "#satellite",
      "#satelite",
      "[id*='satellite' i]",
      "[id*='satelite' i]",
      "[class*='sat' i]",
    ]);
    
    let wmEls = findElements([
      "#wordmark",
      "#texto",
      "#logotype",
      "[id*='wordmark' i]",
      "[id*='texto' i]",
      "[id*='logotype' i]",
      "text",
      "tspan",
    ]);
    
    // Fallback: use first visible <g> elements if specific IDs not found
    if (planetEls.length === 0 || ringEls.length === 0 || satEls.length === 0) {
      const groups = Array.from(svg.querySelectorAll("g")).filter((g) => {
        try {
          const bb = (g as SVGGraphicsElement).getBBox();
          return bb && bb.width + bb.height > 0;
        } catch {
          return false;
        }
      });
      
      if (groups.length >= 3) {
        if (planetEls.length === 0) planetEls = [groups[0]];
        if (ringEls.length === 0) ringEls = [groups[1]];
        if (satEls.length === 0) satEls = [groups[2]];
      }
    }
    
    // Fallback for wordmark: any text element
    if (wmEls.length === 0) {
      const textNodes = Array.from(svg.querySelectorAll("text, tspan"));
      if (textNodes.length > 0) {
        wmEls = textNodes as unknown as SVGElement[];
      } else {
        // Last resort: elements with "word" or "logo" in class/id
        const alt = Array.from(
          svg.querySelectorAll("[class*='logo' i], [id*='logo' i], [class*='word' i]")
        );
        if (alt.length > 0) wmEls = alt as unknown as SVGElement[];
      }
    }
    
    // Log what we found (debug)
    console.log("[HeroPortalLogo] Elements found:", {
      planet: planetEls.length,
      ring: ringEls.length,
      sat: satEls.length,
      wordmark: wmEls.length,
    });
    
    // ========================================
    // FORCE INITIAL HIDDEN STATE (INLINE)
    // ========================================
    
    const allElements = Array.from(new Set([...planetEls, ...ringEls, ...satEls, ...wmEls]));
    
    for (const el of allElements) {
      try {
        // Clear any existing styles/attrs
        el.removeAttribute("style");
        el.removeAttribute("opacity");
        
       (el as ElementCSSInlineStyle).style.cssText = `
  opacity: 0 !important;
  visibility: visible !important;
  transform-origin: 50% 50% !important;
  transform: translateY(12px) scale(0.96) !important;
  will-change: opacity, transform !important;
`;
      } catch (e) {
        // Silently ignore
      }
    }
    
    // ========================================
    // ANIMATION HELPER
    // ========================================
    
    const animateElements = (
      elements: Element[],
      options: {
        transform?: string;
        duration?: number;
        delay?: number;
      } = {}
    ) => {
      const { transform = "none", duration = 400, delay = 0 } = options;
      
      const animate = () => {
        for (const el of elements) {
          try {
            const htmlEl = el as HTMLElement;
            
            // Set transition
            htmlEl.style.transition = `
              opacity ${duration}ms cubic-bezier(0.22, 0.9, 0.32, 1),
              transform ${duration}ms cubic-bezier(0.22, 0.9, 0.32, 1)
            `;
            
            // Trigger animation on next frame
            requestAnimationFrame(() => {
              htmlEl.style.opacity = "1";
              htmlEl.style.transform = transform;
            });
          } catch (e) {
            // Fallback: just set opacity
            try {
              (el as HTMLElement).style.opacity = "1";
            } catch {}
          }
        }
      };
      
      if (delay > 0) {
        const tid = window.setTimeout(animate, delay);
        timers.current.push(tid);
      } else {
        animate();
      }
    };
    
    // ========================================
    // SEQUENCE TIMELINE
    // ========================================
    
    clearTimers();
    
    // 1. PLANET
    animateElements(planetEls, {
      transform: "scale(1.02) translateY(0)",
      duration: Math.max(400, DUR_PLANET),
      delay: PLANET_START,
    });
    
    // 2. RING
    animateElements(ringEls, {
      transform: "translateX(0) rotate(0deg) scale(1)",
      duration: Math.max(420, DUR_RING),
      delay: RING_START,
    });
    
    // 3. SATELLITE (with floating animation)
    timers.current.push(
      window.setTimeout(() => {
        animateElements(satEls, {
          transform: "scale(1) translateY(0)",
          duration: Math.max(360, DUR_SAT),
        });
        
        // Add floating animation via keyframes
        if (!document.getElementById("__hp_float_kf")) {
          const style = document.createElement("style");
          style.id = "__hp_float_kf";
          style.textContent = `
            @keyframes __hp_float {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-8px) scale(1.01); }
            }
          `;
          document.head.appendChild(style);
        }
        
        for (const el of satEls) {
          try {
            const htmlEl = el as HTMLElement;
            setTimeout(() => {
              htmlEl.style.animation = "__hp_float 4s ease-in-out infinite";
            }, DUR_SAT);
          } catch {}
        }
      }, SAT_START)
    );
    
    // 4. WORDMARK
    animateElements(wmEls, {
      transform: "translateY(0) scale(1)",
      duration: DUR_WORDMARK,
      delay: WORDMARK_START,
    });
    
    // ========================================
    // GLOW REVEAL
    // ========================================
    
    if (glowColor !== "none") {
      timers.current.push(
        window.setTimeout(() => {
          const glowEl = document.getElementById("brand-glow");
          if (glowEl) {
            try {
              glowEl.style.opacity = "0";
              glowEl.style.transition = `opacity ${Math.round(500 * SPEED)}ms linear`;
              
              requestAnimationFrame(() => {
                glowEl.style.opacity = String(Math.min(0.9, glowStrength));
              });
            } catch {}
          }
        }, SEQ_TELON_END + Math.round(200 * SPEED))
      );
    }
    
    // ========================================
    // FINAL FADE OUT
    // ========================================
    
    // Start fade
    timers.current.push(
      window.setTimeout(() => {
        setVisible(false);
      }, Math.max(0, EFFECTIVE_TOTAL_MS - EFFECTIVE_FADE_MS))
    );
    
    // Complete unmount
    timers.current.push(
      window.setTimeout(() => {
        setMounted(false);
        clearTimers();
        onFinish?.();
      }, EFFECTIVE_TOTAL_MS)
    );
    
    return () => {
      clearTimers();
    };
  }, [
    svgMarkup,
    glowColor,
    glowStrength,
    SPEED,
    PLANET_START,
    DUR_PLANET,
    RING_START,
    DUR_RING,
    SAT_START,
    DUR_SAT,
    WORDMARK_START,
    DUR_WORDMARK,
    SEQ_TELON_END,
    EFFECTIVE_TOTAL_MS,
    EFFECTIVE_FADE_MS,
    clearTimers,
    onFinish,
  ]);
  
  // ========================================
  // ERROR STATE / NOT MOUNTED
  // ========================================
  
  if (!mounted) return null;
  
  if (svgError && !svgMarkup) {
    // Fallback: just show fade to main content
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            key="orbita-portal-fallback"
            aria-hidden
            className="fixed inset-0 z-[1500] bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeMs / 1000 }}
          />
        )}
      </AnimatePresence>
    );
  }
  
  if (!svgMarkup) {
    // Loading state
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-[1500] bg-black flex items-center justify-center"
      >
        <div className="w-8 h-8 border-4 border-[#d7b86e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  // ========================================
  // GLOW STYLES
  // ========================================
  
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
          pointerEvents: "none",
        }
      : {
          background:
            "radial-gradient(55% 40% at 50% 58%, rgba(255,40,180,0.75), rgba(255,40,180,0.22), transparent 72%)",
          filter: "blur(60px)",
          mixBlendMode: "screen",
          opacity: 0,
          pointerEvents: "none",
        };
  
  // ========================================
  // RENDER
  // ========================================
  
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="orbita-portal"
          aria-hidden
          className="fixed inset-0 z-[1500] overflow-visible pointer-events-none"
          initial={{ opacity: 1, backgroundColor: "#000000" }}
          animate={{ opacity: 1, backgroundColor: endColor }}
          exit={{
            opacity: 0,
            filter: "blur(28px)",
            scale: 1.02,
            transition: {
              duration: EFFECTIVE_FADE_MS / 1000,
              ease: "easeInOut",
            },
          }}
          transition={{ duration: 0.2 }}
          style={{
            isolation: "isolate", // Create stacking context
          }}
        >
          {/* Telón negro inicial */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              delay: TELON_HOLD / 1000,
              duration: TELON_FADE / 1000,
              ease: "easeInOut",
            }}
            style={{
              zIndex: 8,
              pointerEvents: "none",
            }}
          />
          
          {/* Vignette */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.25 }}
            transition={{
              delay: (TELON_HOLD + TELON_FADE) / 1000,
              duration: 0.8,
              ease: "easeOut",
            }}
          />
          
          {/* Burbujas/Partículas */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 1, pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: SEQ_TELON_END / 1000,
              duration: 0.6,
            }}
          >
            <ChampagneBubbles
              key="back"
              count={60}
              blur={16}
              speedFactor={0.4}
              opacity={0.2}
            />
            <ChampagneBubbles
              key="front"
              count={100}
              blur={8}
              speedFactor={0.85}
              opacity={0.45}
            />
          </motion.div>
          
          {/* Glow */}
          {glowColor !== "none" && (
            <div
              id="brand-glow"
              className="absolute inset-0"
              style={{
                zIndex: 3,
                ...glowStyle,
              }}
            />
          )}
          
          {/* SVG Container */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              zIndex: 4,
              pointerEvents: "none",
            }}
          >
            <motion.div
              ref={hostRef}
              className="relative overflow-visible"
              style={{
                width: "min(80vmin, 540px)",
                height: "min(80vmin, 540px)",
              }}
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
              initial={{ scale: 1.02, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: (SEQ_TELON_END + Math.round(80 * SPEED)) / 1000,
                duration: Math.max(0.45, DUR_PLANET / 1200),
                ease: "easeOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ========================================
// CHAMPAGNE BUBBLES COMPONENT
// ========================================

interface ChampagneBubblesProps {
  count?: number;
  blur?: number;
  speedFactor?: number;
  opacity?: number;
}

function ChampagneBubbles({
  count = 100,
  blur = 12,
  speedFactor = 1,
  opacity = 0.7,
}: ChampagneBubblesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const DPR = window.devicePixelRatio || 1;
    
    const resize = () => {
      const w = (canvas.width = Math.floor(window.innerWidth * DPR));
      const h = (canvas.height = Math.floor(window.innerHeight * DPR));
      canvas.style.width = `${w / DPR}px`;
      canvas.style.height = `${h / DPR}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      return { w: w / DPR, h: h / DPR };
    };
    
    let { w, h } = resize();
    
    // Create bubbles
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
        
        // Recycle bubble when it goes off-screen
        if (b.y < -b.r * 4) {
          b.y = h + 20;
          b.x = Math.random() * w;
        }
        
        // Twinkling effect
        const tw = 0.25 + Math.abs(Math.sin(b.blink)) * 0.35;
        
        // Draw bubble
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
  
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        width: "100%",
        height: "100%",
      }}
      aria-hidden="true"
    />
  );
}
