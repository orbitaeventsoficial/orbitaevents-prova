import type { ReactNode } from 'react'
export default function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-2 text-base opacity-80">{subtitle}</p> : null}
      </header>
      <div>{children}</div>
    </section>
  )
}