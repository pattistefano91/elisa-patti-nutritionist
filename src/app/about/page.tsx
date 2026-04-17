import type { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { ABOUT_CONTENT } from '@/data/about'
import { PROFESSIONAL } from '@/data/professional'
import AboutCTA from '@/components/sections/AboutCTA'

export const metadata: Metadata = {
  title: 'Chi sono | Dott.ssa Elisa Patti',
  description:
    'Scopri il percorso professionale della Dott.ssa Elisa Patti, Biologa Nutrizionista a Civitanova Marche. Formazione, filosofia nutrizionale e approccio al paziente.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Sezione 1 — Hero split */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Colonna sinistra — Foto */}
            <div>
              <Image
                src={ABOUT_CONTENT.photo.src}
                alt={ABOUT_CONTENT.photo.alt}
                width={480}
                height={600}
                className="rounded-2xl object-cover w-full"
                priority
              />
            </div>

            {/* Colonna destra — Bio */}
            <div className="space-y-4">
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
                {PROFESSIONAL.name}
              </h1>
              <p
                className="text-body-lg"
                style={{ color: 'var(--color-neutral-600)' }}
              >
                {PROFESSIONAL.title}
              </p>
              <p
                className="text-body-md"
                style={{ color: 'var(--color-neutral-600)' }}
              >
                {ABOUT_CONTENT.bio}
              </p>
              <div className="pt-4">
                <AboutCTA compact />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sezione 2 — Filosofia nutrizionale */}
      <section
        className="py-16"
        style={{ backgroundColor: 'var(--color-surface-warm)' }}
      >
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-heading-3"
              style={{ color: 'var(--color-neutral-900)' }}
            >
              La mia filosofia
            </h2>
            <ul className="flex flex-col gap-6 mt-8">
              {ABOUT_CONTENT.philosophy.map((value) => (
                <li key={value.title} className="flex gap-4">
                  <span className="text-2xl shrink-0">{value.icon}</span>
                  <div>
                    <p
                      className="text-label font-semibold"
                      style={{ color: 'var(--color-neutral-900)' }}
                    >
                      {value.title}
                    </p>
                    <p
                      className="text-body-md mt-1"
                      style={{ color: 'var(--color-neutral-600)' }}
                    >
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Sezione 3 — Formazione & Credenziali */}
      <section className="py-16">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-heading-3"
              style={{ color: 'var(--color-neutral-900)' }}
            >
              Formazione
            </h2>
            <ul className="flex flex-col gap-3 mt-8">
              {ABOUT_CONTENT.credentials.map((c) => (
                <li key={c.title} className="flex flex-col gap-0.5">
                  <p
                    className="text-body-md font-semibold"
                    style={{ color: 'var(--color-neutral-900)' }}
                  >
                    {c.title}
                  </p>
                  {c.institution && (
                    <p
                      className="text-body-sm"
                      style={{ color: 'var(--color-neutral-600)' }}
                    >
                      {c.institution}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <hr
              className="my-8"
              style={{ borderColor: 'var(--color-neutral-200)' }}
            />
            <p
              className="text-caption"
              style={{ color: 'var(--color-neutral-500)' }}
            >
              Iscritta all&apos;
              <span className="font-medium">{PROFESSIONAL.alboOrder}</span> —{' '}
              {PROFESSIONAL.alboNumber}
            </p>
          </div>
        </Container>
      </section>

      {/* Sezione 4 — CTA */}
      <AboutCTA />
    </main>
  )
}
