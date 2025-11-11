// app/components/ui/NavLink.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className = '' }: Props) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-lg px-3 py-2 transition hover:text-white/100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oe-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        active ? 'text-white' : 'text-white/70'
      } ${className}`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
