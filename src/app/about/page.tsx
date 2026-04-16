import type { Metadata } from 'next'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Chi sono | Elisa Patti',
  description:
    'Scopri il percorso professionale della Dott.ssa Elisa Patti, Biologa Nutrizionista a Civitanova Marche.',
}

export default function AboutPage() {
  return (
    <main className="py-20 min-h-screen">
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          <p
            className="text-label uppercase tracking-wide"
            style={{ color: 'var(--color-primary-600)' }}
          >
            Chi sono
          </p>
          <h1
            className="text-heading-2"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Dott.ssa Elisa Patti
          </h1>
          <p
            className="text-body-lg"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            Biologa Nutrizionista — Civitanova Marche
          </p>
          <p
            className="text-body-md"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            Questa pagina è in aggiornamento. Torna presto per scoprire il
            mio percorso professionale, la mia formazione e la filosofia
            nutrizionale che guida il mio lavoro con i pazienti.
          </p>
          <p
            className="text-caption"
            style={{ color: 'var(--color-neutral-400)' }}
          >
            Contenuto in arrivo
          </p>
        </div>
      </Container>
    </main>
  )
}
