// app/components/ui/PageTransition.client.tsx
"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const DURATION = 180; // ms

export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const search = useSearchParams();
  const key = `${pathname}?${search?.toString() || ""}`;

  const first = useRef(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false; // no animar primera carga
      return;
    }
    const el = ref.current;
    if (!el) return;

    // Respeta reduce motion
    const reduce =
      typeof window !== "undefined" &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    // ÚNICO FADE-IN: sin fade-out, sin desplazamientos
    el.classList.remove("pt-enter", "pt-enter-active");
    el.classList.add("pt-enter");

    // next frame -> activa transición
    const id = requestAnimationFrame(() => {
      el.classList.add("pt-enter-active");
    });

    // limpieza
    const t = window.setTimeout(() => {
      el.classList.remove("pt-enter", "pt-enter-active");
    }, DURATION + 40);

    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
    };
  }, [key]);

  return (
    <div ref={ref} className="min-h-screen">
      {children}
    </div>
  );
}
