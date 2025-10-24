import Section from '@/components/Section'
import { CTA } from '@/components/CTA'
export const metadata = { title: 'Portfolio — Òrbita Events', description: 'Projectes reals i resultats clars.' }
export default function Page(){
  return (
    <Section title="Portfolio" subtitle="Projectes reals i resultats clars.">
      <div className="prose max-w-none">
        <p className="opacity-80">Contingut provisional. Ajustarem text real.</p>
      </div>
      <CTA />
    </Section>
  )
}