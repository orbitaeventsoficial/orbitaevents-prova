// app/components/ui/Hero.tsx
"use client";
import React from "react";
import Section from "./Section";
import SmartImage from "./SmartImage";

type Props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export default function Hero({ title, subtitle, children }: Props) {
  return (
    <div className="oe-hero relative border-b border-white/10 bg-black/30 backdrop-blur overflow-hidden">
      {/* Fondo del hero: planeta centrado y de tamaño CONTROLADO.
         El splash lo oculta mientras corre gracias a .oe-splash-active */}
      <div
        data-hero-planet
        aria-hidden="true"
        className="absolute inset-0 -z-10 grid place-items-center pointer-events-none"
      >
        {/* Nada de fill. Tamaño fijo y limpio. Sube/baja el número si quieres más grande. */}
        <SmartImage
          src="/img/brand/hero-planet.png"   // pon aquí tu asset real si es otro
          alt=""
          width={560}
          height={560}
          className="opacity-90"
          priority
        />
      </div>

      <Section>
        <div className="max-w-3xl">
          <h1 className="font-black font-[var(--font-space)]">{title}</h1>
          {subtitle ? <p className="mt-4 oe-muted">{subtitle}</p> : null}
          {children ? <div className="mt-6 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </Section>
    </div>
  );
}
