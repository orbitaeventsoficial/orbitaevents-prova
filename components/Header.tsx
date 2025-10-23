import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/bodas", label: "Bodas" },
  { href: "/fiestas-tematicas", label: "Fiestas temáticas" },
  { href: "/empresas", label: "Empresas" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-oe-black/70 backdrop-blur border-b border-white/5">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/img/brand/favicon.svg" alt="Òrbita Events" width={48} height={48} className="h-12 w-12" />
          <span className="font-semibold tracking-wide">Òrbita Events</span>
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map(item => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
