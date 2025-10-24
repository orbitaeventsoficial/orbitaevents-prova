export function CTA({ label = 'Demana pressupost', href = '/contacte' }: { label?: string; href?: string }) {
  return (
    <div className="mt-10">
      <a href={href} className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 shadow-md hover:shadow-lg transition border text-sm">{label}</a>
    </div>
  )
}