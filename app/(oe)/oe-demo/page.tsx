"use client";
import dynamic from "next/dynamic";
import { OrbitaGlyph } from "@/components/oe/OrbitaGlyph";

const HeroPortalLogo = dynamic(() => import("@/components/oe/HeroPortalLogo.client"), { ssr: false });

export default function Page() {
  const showSplash = process.env.NEXT_PUBLIC_OE_SPLASH === "1";
  return (
    <>
      <HeroPortalLogo enabled={showSplash} />
      <main className="oe-gradient-bg min-h-screen">
        <section className="container mx-auto px-6 py-16 space-y-8">
          <OrbitaGlyph className="w-24 h-24" />
          <h1 className="text-3xl font-bold oe-text">Òrbita demo</h1>
          <p className="oe-text">Esto es un montaje no intrusivo. Tus páginas existentes siguen intactas.</p>
          <div className="oe-card p-6">
            <p className="oe-accent">Card con tokens y sombras Òrbita.</p>
          </div>
        </section>
      </main>
    </>
  );
}