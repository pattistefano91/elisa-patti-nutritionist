'use client'

import { Button, Container } from '@/components/ui'

interface AboutCTAProps {
  compact?: boolean
}

function openCalendly() {
  ;(window as any).Calendly?.initPopupWidget({
    url: 'https://calendly.com/nutrizionista-elisapatti/consulenza-gratuita',
  })
}

export default function AboutCTA({ compact = false }: AboutCTAProps) {
  if (compact) {
    return (
      <Button variant="primary" size="lg" onClick={openCalendly}>
        Prenota consulenza gratuita
      </Button>
    )
  }

  return (
    <section
      className="py-16"
      style={{ backgroundColor: 'var(--color-surface-warm)' }}
    >
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2
            className="text-heading-3"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Vuoi iniziare il tuo percorso?
          </h2>
          <p
            className="text-body-lg"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            Prenota una consulenza gratuita e scopri il percorso nutrizionale su
            misura per te.
          </p>
          <Button variant="primary" size="lg" onClick={openCalendly}>
            Prenota ora
          </Button>
        </div>
      </Container>
    </section>
  )
}
