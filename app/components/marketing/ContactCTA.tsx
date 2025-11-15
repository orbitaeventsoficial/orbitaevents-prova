

export default function ContactCTA() {
return (
<div className="mx-auto max-w-3xl text-center">
<h2 className="text-h2">¿Lo montamos?</h2>
<p className="mt-4 text-white/70">Agenda una llamada o envíanos tu idea. Respondemos en menos de 2h.</p>
<div className="mt-8 flex justify-center gap-4">
<a className="oe-btn-gold" href="/contacto">Contacto</a>
<a className="rounded-xl border border-[var(--border)] px-5 py-3" href="https://wa.me/34699121023" target="_blank" rel="noopener noreferrer">WhatsApp</a>
</div>
</div>
);
}
