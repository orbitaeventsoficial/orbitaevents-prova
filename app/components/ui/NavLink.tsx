"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
};

const NavLink = React.forwardRef<HTMLAnchorElement, Props>(function NavLink(
  { href, children, className, onClick },
  ref
) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  const classes = [
    "px-3 py-2 rounded-xl text-sm transition",
    active ? "bg-white/10 text-white" : "text-white/80 hover:text-white hover:bg-white/10",
    className || "",
  ].filter(Boolean).join(" ");

  return (
    <Link href={href} legacyBehavior prefetch={false}>
      <a
        ref={ref}
        className={classes}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
});

NavLink.displayName = "NavLink";
export default NavLink;
