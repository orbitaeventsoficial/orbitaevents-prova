"use client";
import React from "react";
import Section from "./Section";
import SmartImage from "./SmartImage";

type Props = { title: string; subtitle?: string; children?: React.ReactNode; };

export default function Hero({ title, subtitle, children }: Props) {
  return (
    <div className="oe-hero relative border-b border-white/10 bg-black/30 backdrop-blur overflow-hidden">
      <div
        data-hero-planet
        aria-hidden="true"
        className="absolute inset-0 -z-10 grid place-items-center pointer-events-none hero-planet"
      >
        <SmartImage
          src="/img/brand/hero-planet.png"
          alt=""
          width={520}
          height={520}
          className="opacity-90"
          priority
        />
      </div>

      <Section>
        <div className="max-w-3xl">
          <h1 className="font-black font-[var(--font-space)]">{title}</h1>
          {subtitle && <p className="mt-4 oe-muted">{subtitle}</p>}
          {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Section>
    </div>
  );
}
