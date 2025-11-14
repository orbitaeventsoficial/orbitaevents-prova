'use client';
import { useRef, useEffect } from 'react';
import Section from '../ui/Section';


const TESTIMONIOS = [
'“Todo salió perfecto, cero estrés.” — Raquel, Camping Maresma',
'“Equipo serio, producción impresionante.” — Motoffroadacademy',
'“Sonido brutal y pautas bien medidas.” — Oriol y Anna',
'“Repetimos el año que viene.” — AECC',
];


export default function TestimonialsMarquee() {
const ref = useRef<HTMLDivElement | null>(null);


useEffect(() => {
const el = ref.current;
if (!el) return;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) return;
el.animate(
[{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
{ duration: 18000, iterations: Infinity, easing: 'linear' }
);
}, []);


return (
<Section className="py-16">
<div className="overflow-hidden border-y border-[var(--border)]">
<div ref={ref} className="whitespace-nowrap py-6">
{[...TESTIMONIOS, ...TESTIMONIOS].map((t, i) => (
<span key={i} className="mx-8 text-white/80">{t}</span>
))}
</div>
</div>
</Section>
);
}
