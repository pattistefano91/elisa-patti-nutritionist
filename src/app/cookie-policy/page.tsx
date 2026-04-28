import type { Metadata } from 'next'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Cookie Policy | Dott.ssa Elisa Patti',
  robots: { index: false },
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-surface-page)' }}>

      {/* Header */}
      <section className="py-14" style={{ backgroundColor: 'var(--color-surface-warm)' }}>
        <Container>
          <div className="max-w-2xl mx-auto">
            <p
              className="text-label uppercase tracking-wide mb-3"
              style={{ color: 'var(--color-primary-600)' }}
            >
              Informativa sull&apos;uso dei cookie
            </p>
            <h1 className="text-heading-2" style={{ color: 'var(--color-neutral-900)' }}>
              Cookie Policy
            </h1>
            <p className="text-caption mt-3" style={{ color: 'var(--color-neutral-500)' }}>
              Ultimo aggiornamento: aprile 2026
            </p>
          </div>
        </Container>
      </section>

      {/* Contenuto */}
      <section className="py-14">
        <Container>
          <div className="max-w-2xl mx-auto space-y-10">

            <section className="space-y-3">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                Cosa sono i cookie
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo durante
                la navigazione. Vengono utilizzati per far funzionare i siti correttamente e raccogliere
                informazioni statistiche anonime.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                Cookie utilizzati da questo sito
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Questo sito utilizza esclusivamente <strong>cookie tecnici</strong> necessari al
                funzionamento. Non vengono utilizzati cookie di profilazione, marketing o tracciamento.
              </p>
              <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--color-primary-200)' }}>
                <table className="w-full text-body-sm border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-primary-50)' }}>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--color-neutral-700)' }}>Nome</th>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--color-neutral-700)' }}>Tipo</th>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--color-neutral-700)' }}>Durata</th>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--color-neutral-700)' }}>Finalità</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t" style={{ borderColor: 'var(--color-primary-100)' }}>
                      <td className="py-3 px-4 font-mono text-caption" style={{ color: 'var(--color-neutral-600)' }}>_vercel_*</td>
                      <td className="py-3 px-4" style={{ color: 'var(--color-neutral-600)' }}>Tecnico</td>
                      <td className="py-3 px-4" style={{ color: 'var(--color-neutral-600)' }}>Sessione</td>
                      <td className="py-3 px-4" style={{ color: 'var(--color-neutral-600)' }}>
                        Infrastruttura hosting (Vercel) — necessario al funzionamento del sito
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                Strumenti senza cookie
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Questo sito utilizza strumenti esterni che <strong>non installano alcun cookie</strong>:
              </p>
              <ul className="space-y-3 text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                <li>
                  <strong>Plausible Analytics</strong> — servizio di analisi statistica delle visite
                  completamente cookie-free. Non raccoglie dati personali identificabili e i server
                  si trovano all&apos;interno dell&apos;Unione Europea. Per maggiori informazioni:{' '}
                  <a
                    href="https://plausible.io/privacy-focused-web-analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: 'var(--color-primary-600)' }}
                  >
                    plausible.io
                  </a>
                </li>
                <li>
                  <strong>Calendly</strong> — il widget per la prenotazione appuntamenti viene
                  caricato <em>solo</em> quando fai clic sul pulsante di prenotazione. Prima di
                  quel momento nessun contenuto Calendly viene scaricato.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                Come gestire i cookie
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Puoi configurare il tuo browser per rifiutare tutti i cookie o per ricevere una
                notifica quando viene inviato un cookie. Tieni presente che disabilitare i cookie
                tecnici potrebbe compromettere il corretto funzionamento del sito.
              </p>
              <ul className="list-disc list-inside space-y-1 text-body-md" style={{ color: 'var(--color-neutral-600)' }}>
                <li>Chrome: Impostazioni → Privacy e sicurezza → Cookie</li>
                <li>Firefox: Preferenze → Privacy e sicurezza</li>
                <li>Safari: Preferenze → Privacy</li>
                <li>Edge: Impostazioni → Cookie e autorizzazioni sito</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                Contatti
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Per qualsiasi domanda relativa ai cookie su questo sito contatta la Dott.ssa Elisa Patti:{' '}
                <a
                  href="mailto:nutrizionista.elisapatti@gmail.com"
                  className="hover:underline"
                  style={{ color: 'var(--color-primary-600)' }}
                >
                  nutrizionista.elisapatti@gmail.com
                </a>
              </p>
            </section>

          </div>
        </Container>
      </section>
    </main>
  )
}
