import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Servizi | Elisa Patti',
  description:
    'Percorsi nutrizionali personalizzati con la Dott.ssa Elisa Patti: prima visita, visite di controllo, consulenze online.',
}

export default function ServiziPage() {
  return (
    <main className="py-20 min-h-screen">
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          <p
            className="text-label uppercase tracking-wide"
            style={{ color: 'var(--color-primary-600)' }}
          >
            Servizi
          </p>
          <h1
            className="text-heading-2"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            I Percorsi
          </h1>
          <p
            className="text-body-lg"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            Percorsi nutrizionali personalizzati per ogni esigenza
          </p>
          <p
            className="text-body-md"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            La pagina dedicata ai percorsi è in arrivo. Nel frattempo puoi
            scoprire tutti i servizi disponibili direttamente nella homepage.
          </p>
          <Link
            href="/#servizi"
            className="inline-flex items-center gap-2 text-label font-semibold transition-opacity hover:opacity-75"
            style={{ color: 'var(--color-primary-600)' }}
          >
            Scopri i percorsi disponibili →
          </Link>
          <p
            className="text-caption"
            style={{ color: 'var(--color-neutral-400)' }}
          >
            Pagina dedicata in arrivo
          </p>
        </div>
      </Container>
    </main>
  )
}
