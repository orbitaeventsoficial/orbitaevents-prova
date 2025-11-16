// app/packs/client.tsx
'use client';

import { useState } from 'react';
import { trackPackSelection } from '@/lib/analytics';
import { getPacksByService } from '@/data/packs-config';

export default function Client() {
  const packs = getPacksByService('fiestas');
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {packs.map((pack) => (
        <div
          key={pack.id}
          onClick={() => {
            setSelected(pack.id);
            trackPackSelection({ packId: pack.id, packType: 'fiesta' });
          }}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all
            ${selected === pack.id ? 'border-oe-gold bg-oe-gold/5' : 'border-white/10 hover:border-white/30'}`}
        >
          <h3 className="text-xl font-bold text-white mb-2">{pack.name}</h3>
          <p className="text-oe-gold font-bold mb-3">desde {pack.priceValue}€</p>
          <ul className="space-y-1 text-sm text-text-muted">
            {pack.features.slice(0, 3).map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
          <button className="mt-4 w-full py-2 rounded-lg bg-oe-gold text-black font-bold hover:bg-oe-gold/90 transition">
            Reservar
          </button>
        </div>
      ))}
    </div>
  );
}