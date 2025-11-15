// app/packs/LowCostBanner.tsx
'use client';
import { useEffect, useState } from 'react';

export default function LowCostBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <div className="rounded-2xl bg-gradient-to-r from-oe-gold to-oe-gold-light p-1 shadow-2xl">
        <div className="rounded-xl bg-black p-4 text-white">
          <p className="text-xs uppercase tracking-wider text-oe-gold">OFERTA FLASH</p>
          <p className="text-lg font-black">Pack Cumple FLASH</p>
          <p className="text-xs text-gray-300">2h DJ + 2 altavoces + luces</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm line-through text-gray-500">350€</span>
            <span className="text-xl font-black text-oe-gold">250€</span>
          </div>
          <a
            href="https://wa.me/34699121023?text=Hola,%20quiero%20el%20Pack%20Cumple%20Bolo%20de%20200€"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-xl bg-oe-gold px-4 py-2 text-center text-xs font-bold text-black hover:bg-oe-gold-light"
          >
            RESERVAR AHORA
          </a>
          <p className="mt-2 text-[9px] text-gray-400">Solo cumpleaños pequeños · Hasta 50 pers.</p>
        </div>
      </div>
    </div>
  );
}