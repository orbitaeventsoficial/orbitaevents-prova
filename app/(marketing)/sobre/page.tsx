import Section from '@/components/Section'
import { CTA } from '@/components/CTA'
export const metadata = { title: 'Sobre Òrbita Events — Òrbita Events', description: 'DJ, tècnica i animació amb criteri.' }
export default function Page(){
  return (
    <Section title="Sobre Òrbita Events" subtitle="DJ, tècnica i animació amb criteri.">
      <div className="prose max-w-none">
        <p className="opacity-80">Contingut provisional. Ajustarem text real.</p>
      </div>
      <CTA />
    </Section>
  )
}