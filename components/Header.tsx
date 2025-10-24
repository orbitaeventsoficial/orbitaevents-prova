"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const nav = [
  { href: "/serveis", label: "Serveis" },
  { href: "/nosaltres", label: "Nosaltres" },
  { href: "/porfolio", label: "Porfolio" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacte", label: "Contacte" },
]

export function Header() {
  const pathname = usePathname()
  return (
    <header className="border-b border-white/10 bg-black/5 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          Òrbita Events
        </Link>
        <nav className="flex gap-6 text-sm">
          {nav.map(item => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${active ? "font-medium opacity-100" : "opacity-70 hover:opacity-100"} transition-opacity`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}