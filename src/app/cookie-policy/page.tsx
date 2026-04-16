import type { Metadata } from 'next'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Cookie Policy | Elisa Patti',
  robots: { index: false },
}

export default function CookiePolicyPage() {
  return (
    <main className="py-16">
      <Container>
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-heading-2 text-neutral-900">Cookie Policy</h1>
          <p className="text-caption text-neutral-500">
            Ultimo aggiornamento: aprile 2026 —{' '}
            <em>
              Questo documento è un placeholder. Il contenuto legale definitivo
              sarà redatto dalla Dott.ssa Patti o da un legale prima del
              go-live sul dominio reale.
            </em>
          </p>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">
              Cosa sono i cookie
            </h2>
            <p className="text-body-md text-neutral-700">
              I cookie sono piccoli file di testo che i siti web salvano sul
              tuo dispositivo durante la navigazione. Vengono utilizzati per
              far funzionare i siti correttamente, ricordare le tue preferenze
              e raccogliere informazioni statistiche.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">
              Cookie utilizzati da questo sito
            </h2>
            <p className="text-body-md text-neutral-700">
              Questo sito utilizza esclusivamente cookie tecnici necessari al
              funzionamento:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-body-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 pr-4 text-neutral-700 font-semibold">
                      Nome
                    </th>
                    <th className="text-left py-2 pr-4 text-neutral-700 font-semibold">
                      Tipo
                    </th>
                    <th className="text-left py-2 pr-4 text-neutral-700 font-semibold">
                      Durata
                    </th>
                    <th className="text-left py-2 text-neutral-700 font-semibold">
                      Finalità
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2 pr-4 text-neutral-600 font-mono text-caption">
                      _vercel_*
                    </td>
                    <td className="py-2 pr-4 text-neutral-600">Tecnico</td>
                    <td className="py-2 pr-4 text-neutral-600">Sessione</td>
                    <td className="py-2 text-neutral-600">
                      Infrastruttura hosting (Vercel) — necessario al
                      funzionamento del sito
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">
              Cookie di terze parti
            </h2>
            <p className="text-body-md text-neutral-700">
              Questo sito <strong>non utilizza cookie di profilazione</strong>{' '}
              né tracker di terze parti.
            </p>
            <ul className="list-disc list-inside space-y-2 text-body-md text-neutral-700">
              <li>
                <strong>Plausible Analytics</strong>: il servizio di
                statistiche utilizzato è Plausible Analytics, che è{' '}
                <em>completamente cookie-free</em>. Non installa alcun cookie
                sul tuo dispositivo e non raccoglie dati personali
                identificabili.
              </li>
              <li>
                <strong>Calendly</strong>: il widget per la prenotazione
                appuntamenti viene caricato solo nel momento in cui fai clic
                sul pulsante di prenotazione. Prima di quel momento nessun
                contenuto Calendly viene scaricato.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">
              Come disabilitare i cookie
            </h2>
            <p className="text-body-md text-neutral-700">
              Puoi configurare il tuo browser per rifiutare tutti i cookie o
              per ricevere una notifica quando un cookie viene inviato. Tieni
              presente che disabilitare i cookie tecnici potrebbe compromettere
              il corretto funzionamento del sito. Per istruzioni specifiche
              consulta le impostazioni del tuo browser:
            </p>
            <ul className="list-disc list-inside space-y-1 text-body-md text-neutral-600">
              <li>Chrome: Impostazioni → Privacy e sicurezza → Cookie</li>
              <li>Firefox: Preferenze → Privacy e sicurezza</li>
              <li>Safari: Preferenze → Privacy</li>
              <li>Edge: Impostazioni → Cookie e autorizzazioni sito</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">Contatti</h2>
            <p className="text-body-md text-neutral-700">
              Per qualsiasi domanda relativa all&apos;utilizzo dei cookie su
              questo sito contatta la Dott.ssa Elisa Patti:{' '}
              <a
                href="mailto:nutrizionista.elisapatti@gmail.com"
                className="text-primary-600 hover:underline"
              >
                nutrizionista.elisapatti@gmail.com
              </a>
            </p>
          </section>
        </div>
      </Container>
    </main>
  )
}
