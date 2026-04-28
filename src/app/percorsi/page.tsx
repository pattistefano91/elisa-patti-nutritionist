import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { PercorsiHeroCTA } from '@/components/sections/PercorsiHeroCTA'
import { PercorsoCardCTA } from '@/components/sections/PercorsoCardCTA'
import { PERCORSI, type ColoreAccent } from '@/data/percorsi'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/data/seo'

export const metadata: Metadata = {
  title: 'Percorsi Nutrizionali | Dott.ssa Elisa Patti — Civitanova Marche',
  description:
    'Percorsi nutrizionali personalizzati a Civitanova Marche (MC): metabolismo e glicemia, reset intestinale, performance nutrition. Nutrizionista Elisa Patti.',
}

const COLOR_MAP: Record<ColoreAccent, { bg: string; border: string; accent: string; accentText: string }> = {
  primary: {
    bg: 'var(--color-primary-50)',
    border: 'var(--color-primary-200)',
    accent: 'var(--color-primary-100)',
    accentText: 'var(--color-primary-700)',
  },
  secondary: {
    bg: 'var(--color-secondary-50)',
    border: 'var(--color-secondary-200)',
    accent: 'var(--color-secondary-100)',
    accentText: 'var(--color-secondary-700)',
  },
  accent: {
    bg: 'var(--color-accent-100)',
    border: 'var(--color-accent-200)',
    accent: 'var(--color-accent-200)',
    accentText: 'var(--color-accent-600)',
  },
}

export default function PercorsiPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Percorsi Nutrizionali', url: '/percorsi' }])} />
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-surface-page)' }}>

      {/* ── Hero ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-surface-warm)' }}>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p
              className="text-label uppercase tracking-wide mb-4"
              style={{ color: 'var(--color-primary-600)' }}
            >
              Percorsi Nutrizionali
            </p>
            <h1
              className="text-heading-1 mb-6"
              style={{ color: 'var(--color-neutral-900)' }}
            >
              Il tuo percorso verso il benessere inizia qui
            </h1>
            <p
              className="text-body-lg mb-10 max-w-xl mx-auto"
              style={{ color: 'var(--color-neutral-600)' }}
            >
              Ogni percorso è pensato per rispondere a un bisogno specifico.
              Scegli quello che ti assomiglia e inizia il cambiamento con il
              supporto di un professionista.
            </p>
            <PercorsiHeroCTA />
          </div>
        </Container>
      </section>

      {/* ── Griglia percorsi ── */}
      <section id="percorsi" className="py-20">
        <Container>
          {PERCORSI.length > 0 && (
            <>
              <div className="text-center mb-12">
                <h2
                  className="text-heading-2 mb-4"
                  style={{ color: 'var(--color-neutral-900)' }}
                >
                  I percorsi disponibili
                </h2>
                <p
                  className="text-body-lg max-w-xl mx-auto"
                  style={{ color: 'var(--color-neutral-600)' }}
                >
                  Ogni percorso è personalizzato in base alle tue esigenze e al
                  tuo stile di vita.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PERCORSI.map((percorso) => {
                  const colors = COLOR_MAP[percorso.coloreAccent]
                  return (
                    <article
                      key={percorso.id}
                      className="rounded-2xl overflow-hidden flex flex-col"
                      style={{
                        backgroundColor: colors.bg,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {/* Intestazione colorata */}
                      <div
                        className="px-6 py-5"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <h2
                          className="text-heading-5 font-semibold"
                          style={{ color: colors.accentText }}
                        >
                          {percorso.nome}
                        </h2>
                      </div>

                      {/* Corpo card */}
                      <div className="px-6 py-6 flex flex-col gap-5 flex-1">

                        {/* Per chi è */}
                        <div>
                          <p
                            className="text-label uppercase tracking-wide mb-1"
                            style={{ color: colors.accentText }}
                          >
                            Per chi è
                          </p>
                          <p
                            className="text-body-sm"
                            style={{ color: 'var(--color-neutral-700)' }}
                          >
                            {percorso.destinatari}
                          </p>
                        </div>

                        {/* Obiettivo */}
                        <div>
                          <p
                            className="text-label uppercase tracking-wide mb-1"
                            style={{ color: colors.accentText }}
                          >
                            Obiettivo
                          </p>
                          <p
                            className="text-body-sm"
                            style={{ color: 'var(--color-neutral-700)' }}
                          >
                            {percorso.obiettivo}
                          </p>
                        </div>

                        {/* Cosa otterrai */}
                        {percorso.benefici.length > 0 && (
                          <div>
                            <p
                              className="text-label uppercase tracking-wide mb-2"
                              style={{ color: colors.accentText }}
                            >
                              Cosa otterrai
                            </p>
                            <ul className="flex flex-col gap-1.5">
                              {percorso.benefici.map((beneficio) => (
                                <li
                                  key={beneficio}
                                  className="flex items-start gap-2 text-body-sm"
                                  style={{ color: 'var(--color-neutral-700)' }}
                                >
                                  <span
                                    className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: colors.accentText }}
                                    aria-hidden="true"
                                  />
                                  {beneficio}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* CTA */}
                        <div className="mt-auto pt-2">
                          <PercorsoCardCTA accentColor={colors.accentText} />
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </>
          )}
        </Container>
      </section>
    </main>
    </>
  )
}
