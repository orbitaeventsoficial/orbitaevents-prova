import Link from 'next/link';


const services = [
{ href: '/servicios/bodas', title: 'Bodas', points: ['DJ + Efectos y luces', 'Ceremonia y banquete', 'Show y animación'] },
{ href: '/servicios/empresas', title: 'Empresas', points: ['Team building', 'Galas y lanzamientos', 'Brand experiences'] },
{ href: '/servicios/alquiler', title: 'Alquiler técnico', points: ['Sonido', 'Iluminación', 'Efectos y microfonía'] },
];


export default function ServicesGrid() {
return (
  <div>
<h2 className="text-h2 text-center">Servicios</h2>
<div className="mt-10 grid gap-6 sm:grid-cols-3">
{services.map(s => (
<Link key={s.title} href={s.href} className="oe-card hover:no-underline">
<p className="text-lg font-semibold">{s.title}</p>
<ul className="mt-4 space-y-2 text-white/75">
{s.points.map(p => <li key={p}>• {p}</li>)}
</ul>
<span className="mt-6 inline-block text-[var(--oe-gold)]">Saber más →</span>
</Link>
))}
</div>
  </div>
);
}
