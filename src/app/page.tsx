import { Button } from '@/components/ui/Button'
import { BlobHero } from '@/components/shapes/BlobHero'

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: 'var(--color-surface-page)' }}
    >
      {/* Blob decorativo hero — posizionato in alto a destra */}
      <BlobHero
        className="absolute -top-16 -right-16 w-80 h-80 md:w-[480px] md:h-[480px] opacity-20 pointer-events-none"
        style={{ color: 'var(--color-primary-400)' } as React.CSSProperties}
      />
      {/* Blob secondario — in basso a sinistra */}
      <BlobHero
        className="absolute -bottom-24 -left-24 w-64 h-64 md:w-96 md:h-96 opacity-10 pointer-events-none rotate-180"
        style={{ color: 'var(--color-secondary-400)' } as React.CSSProperties}
      />

      <div
        className="relative z-10 w-full px-5 md:px-12 py-24 max-w-screen-xl mx-auto"
      >
        <div className="max-w-2xl">
          {/* Label categoria */}
          <p
            className="text-label uppercase mb-4"
            style={{ color: 'var(--color-primary-600)' }}
          >
            Biologa Nutrizionista
          </p>

          {/* Heading principale */}
          <h1
            className="text-heading-1 mb-6"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Cura il tuo benessere con la nutrizione
          </h1>

          {/* Sottotitolo */}
          <p
            className="text-body-lg mb-10 max-w-xl"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            Percorsi personalizzati per ritrovare l&apos;equilibrio alimentare,
            migliorare la salute e sentirti bene ogni giorno. Con un approccio
            umano e scientifico.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg">
              Prenota consulenza gratuita
            </Button>
            <Button variant="secondary" size="lg">
              Scopri i servizi
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
