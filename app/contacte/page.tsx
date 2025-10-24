import Section from '@/components/Section'
import './globals.css'

export const metadata = {
  title: 'Contacte — Òrbita Events',
  description: 'Demana disponibilitat i pressupost ràpid',
}

export default function Page(){
  return (
    <main className="container mx-auto px-4">
      <Section title="Contacte" subtitle="Respondrem de seguida si tens data i lloc">
        <div className="prose max-w-none">
          <p className="opacity-80">Contacte: formulari i dades provisionals.</p>
        </div>
      </Section>
    </main>
  )
}