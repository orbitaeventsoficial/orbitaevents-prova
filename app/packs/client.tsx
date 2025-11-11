'use client';
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Lightbulb, Speaker, Wind, Clock3, Crown, Check, Star, MessageCircle } from "lucide-react";
import type { ReactNode, MouseEventHandler } from "react";
import type { LucideIcon as LucideIconType } from "lucide-react";

type LucideIcon = LucideIconType;

interface Pack {
  name: string;
  icon: LucideIcon;
  price: string;
  bullets: readonly string[];
  extras: readonly string[];
  best?: boolean;
}

interface Bullet {
  title: string;
  desc: string;
}

const GOLD = "var(--oe-gold, #d7b86e)";

function ChromeText({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-100"
      style={{
        WebkitTextStroke: "0.5px rgba(255,255,255,0.25)",
        textShadow: "0 0 24px rgba(255,255,255,0.15)",
      }}
    >
      {children}
    </span>
  );
}

function Button({
  children,
  href,
  className = "",
  onClick,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => onClick?.(e)}
      className={`oe-btn oe-btn-gold w-full py-3 rounded-xl font-bold text-center block transition-all hover:scale-105 ${className}`}
      prefetch={false}
    >
      {children}
    </Link>
  );
}

function track(event: string, data: Record<string, string>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", event, data);
  }
}

function Hero() {
  return (
    <section className="relative pt-32 pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl px-4"
      >
        <h1 className="mb-3 text-[40px] font-black leading-[1.05] tracking-tight text-white md:text-[56px]">
          <ChromeText>Packs y tarifas</ChromeText>
        </h1>
        <p className="text-lg text-white/80 mb-6">
          Precio cerrado con EV ETX-15P, B-150 LED y Pioneer DJ. Elige y amplía según tu evento.
        </p>
        <div className="flex items-center justify-center gap-1 text-[#d7b86e] mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
          <span className="ml-1 text-sm text-white/70">(35 reseñas)</span>
        </div>
      </motion.div>
    </section>
  );
}

const PACKS: readonly Pack[] = [
  {
    name: "Esencial",
    icon: Speaker,
    price: "desde 490 €",
    bullets: ["50–100 personas", "2 EV ETX-15P 2000W + luz cálida", "DJ hasta 4h con Pioneer DJM-900"],
    extras: ["+100€ subwoofer", "+150€ técnico extra", "+200€ 4 B-150 LED 150W"],
    best: true,
  },
  {
    name: "Pro",
    icon: Lightbulb,
    price: "desde 750 €",
    bullets: ["100–150 personas", "2 EV ETX-15P + sub", "DJ 6h + 4 B-150 LED gobos"],
    extras: ["+150€ Pioneer CDJ-3000", "+100€ luces ambiente", "+200€ extensión fiesta"],
  },
  {
    name: "Premium",
    icon: Crown,
    price: "desde 1200 €",
    bullets: ["150+ personas", "Full setup ETX + B-150 LED + Pioneer DJ", "DJ full + técnico"],
    extras: ["+200€ video mapping", "+150€ micros inalámbricos", "+300€ escenografía"],
  },
] as const;

function Packs() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="grid md:grid-cols-3 gap-8">
        {PACKS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`oe-card p-8 rounded-3xl relative transition-all duration-300 hover:-translate-y-1 hover:border-[#d7b86e]/40 ${
              p.best ? "ring-2 ring-[#d7b86e] ring-offset-2 ring-offset-transparent" : ""
            }`}
          >
            {p.best && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#d7b86e] to-[#b9994b] text-black px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  MEJOR VALORADO
                </span>
              </div>
            )}
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-xl bg-[#d7b86e]/10 border border-[#d7b86e]/20">
                <p.icon className="w-6 h-6 text-[#d7b86e]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-white">{p.name}</h3>
            <p className="text-3xl font-black text-[#d7b86e] text-center mb-6">{p.price}</p>
            <ul className="space-y-2 mb-8 text-sm text-white/80">
              {p.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#d7b86e] mt-0.5 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <h4 className="text-lg font-semibold mb-3 text-white">Extras opcionales</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {p.extras.map((e) => (
                <li key={e} className="flex items-start gap-2">
                  <Wind className="w-4 h-4 text-[#d7b86e] mt-0.5 flex-shrink-0" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
            <Button
              href={`/contacto?pack=${encodeURIComponent(p.name.toLowerCase())}`}
              className="w-full mt-6"
              onClick={() => track("Click_Pack", { pack: p.name })}
            >
              Elegir {p.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const BULLETS: readonly Bullet[] = [
  { title: "Montaje", desc: "Incluido. Llegamos 2h antes." },
  { title: "Desplazamiento", desc: "Gratis Barcelona. Resto +50€." },
  { title: "Técnico", desc: "Opcional en esencial (+150€)." },
  { title: "Ampliaciones", desc: "Por hora +100€." },
  { title: "Pagos", desc: "50% reserva, 50% fin evento." },
  { title: "Cancelación", desc: "Devolución total si >30 días." },
] as const;

function Condiciones() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Condiciones claras</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {BULLETS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="oe-card p-6 rounded-3xl text-center"
          >
            <h4 className="mb-1 text-white font-semibold">{b.title}</h4>
            <p className="text-sm text-white/70">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function PacksPage() {
  return (
    <>
      <Hero />
      <Packs />
      <Condiciones />
    </>
  );
}