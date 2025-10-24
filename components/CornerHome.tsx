"use client";
import Link from "next/link";

export default function CornerHome(){
  return (
    <Link href="/" aria-label="Home"
      className="fixed left-3 top-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur text-white hover:bg-black/80 transition">
      <span className="text-xl">🪐</span>
    </Link>
  );
}