import Image from 'next/image';


const items = [
{ src: '/images/portfolio/caso1.jpg', title: 'Lanzamiento marca — 800 pax' },
{ src: '/images/portfolio/caso2.jpg', title: 'Boda Masia — 180 pax' },
{ src: '/images/portfolio/caso3.jpg', title: 'Gala anual — 350 pax' },
{ src: '/images/portfolio/caso4.jpg', title: 'Roadshow — 5 ciudades' },
];


export default function PortfolioGrid() {
return (
  <div>
<h2 className="text-h2 text-center">Casos recientes</h2>
<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
{items.map((it) => (
<figure key={it.title} className="overflow-hidden rounded-3xl border border-[var(--border)]">
<Image src={it.src} alt={it.title} width={600} height={400} className="h-52 w-full object-cover" />
<figcaption className="p-4 text-white/80">{it.title}</figcaption>
</figure>
))}
</div>
  </div>
);
}
