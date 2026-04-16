import type { Metadata } from 'next'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Blog | Elisa Patti',
  description:
    'Articoli e consigli di nutrizione e benessere dalla Dott.ssa Elisa Patti.',
  robots: { index: false },
}

export default function BlogPage() {
  return (
    <main className="py-20 min-h-screen">
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          <p
            className="text-label uppercase tracking-wide"
            style={{ color: 'var(--color-primary-600)' }}
          >
            Blog
          </p>
          <h1
            className="text-heading-2"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Blog
          </h1>
          <p
            className="text-body-lg"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            Consigli di nutrizione e benessere
          </p>
          <p
            className="text-body-md"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            Gli articoli sono in arrivo. Torna presto per leggere consigli
            pratici su alimentazione, stile di vita sano e benessere
            nutrizionale.
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
