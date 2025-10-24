import Section from '@/components/Section'
import { CTA } from '@/components/CTA'

export const metadata = { title: 'Contacte — Òrbita Events', description: 'Responem ràpid si tens data i lloc.' }

export default function Page(){
  return (
    <Section title="Contacte" subtitle="Responem ràpid si tens data i lloc.">
      <div className="prose max-w-none">
        <p className="opacity-80">Escriu-nos. Responem ràpid si tens data i lloc.</p>
      </div>
      <CTA />
    </Section>
  )
}