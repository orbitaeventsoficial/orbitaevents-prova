"use client";
export default function StickyCTA() {
  const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_E164 || "+34699121023";
  const WA_TEXT = "Hola, vengo desde la web y quiero información para mi evento";
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] md:hidden">
      <div className="mx-auto max-w-7xl px-4 pb-3">
        <div className="rounded-2xl border border-white/10 bg-[color:var(--bg-surface)]/95 backdrop-blur p-2 flex gap-2">
          <a href="/contacto" className="oe-btn flex-1 text-center" data-evt="sticky_contacto">Presupuesto</a>
          <a
            href={`https://wa.me/${PHONE.replace("+","")}?text=${encodeURIComponent(WA_TEXT)}&utm_source=site&utm_medium=cta&utm_campaign=sticky`}
            target="_blank" rel="noopener noreferrer" className="oe-btn oe-btn-gold flex-1 text-center"
            data-evt="sticky_wa"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
