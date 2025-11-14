import type { Metadata } from 'next';
import Client from './client';

export const metadata: Metadata = {
  title: 'Contacto | Òrbita Events',
  description: 'Pide presupuesto de Discomobil, tematizaciones, eventos. Respondemos en 24h.',
  alternates: { canonical: '/contacto' },
  robots: { index: true, follow: true },
};

export default function ContactoPage() {
  return <Client />;
}
