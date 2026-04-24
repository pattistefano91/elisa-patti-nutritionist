import type { Metadata } from 'next'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy | Elisa Patti',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <main className="py-16">
      <Container>
        <div className="max-w-2xl mx-auto prose-like space-y-8">
          <h1 className="text-heading-2 text-neutral-900">Privacy Policy</h1>
          <p className="text-caption text-neutral-500">
            Ultimo aggiornamento: aprile 2026
          </p>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">
              1. Titolare del trattamento
            </h2>
            <p className="text-body-md text-neutral-700">
              Titolare del trattamento dei dati personali è la Dott.ssa Elisa
              Patti, Biologa Nutrizionista, con sede a Civitanova Marche (MC).
              Per qualsiasi richiesta relativa al trattamento dei tuoi dati
              personali puoi contattarla all&apos;indirizzo:{' '}
              <a
                href="mailto:nutrizionista.elisapatti@gmail.com"
                className="text-primary-600 hover:underline"
              >
                nutrizionista.elisapatti@gmail.com
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">
              2. Dati trattati
            </h2>
            <p className="text-body-md text-neutral-700">
              Questo sito raccoglie esclusivamente dati tecnici di navigazione
              (indirizzo IP anonimizzato, browser, sistema operativo, pagine
              visitate) tramite Plausible Analytics, un servizio di analisi
              delle statistiche di navigazione che non utilizza cookie e non
              raccoglie dati personali identificabili. Non vengono utilizzati
              tracker di terze parti né cookie di profilazione.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">
              3. Finalità e base giuridica
            </h2>
            <p className="text-body-md text-neutral-700">
              I dati tecnici di navigazione sono trattati per finalità
              statistiche aggregate (es. conteggio visitatori, pagine più
              visitate) sulla base del legittimo interesse del titolare ai
              sensi dell&apos;art. 6(1)(f) GDPR. Nessun dato viene utilizzato
              per finalità di marketing o profilazione.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">
              4. Conservazione dei dati
            </h2>
            <p className="text-body-md text-neutral-700">
              I dati tecnici aggregati sono conservati su Plausible Analytics
              per un periodo non superiore a 24 mesi. Non vengono conservati
              dati personali identificabili.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">
              5. Diritti dell&apos;interessato
            </h2>
            <p className="text-body-md text-neutral-700">
              Ai sensi degli artt. 15–22 del GDPR (Reg. UE 2016/679) hai
              diritto di accedere ai tuoi dati personali, richiederne la
              rettifica o la cancellazione, opporti al trattamento e
              richiederne la limitazione. Poiché questo sito non raccoglie dati
              personali identificabili, tali diritti si applicano in misura
              limitata. Per esercitare i tuoi diritti contatta il titolare
              all&apos;indirizzo email indicato al punto 1.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-heading-5 text-neutral-800">6. Reclami</h2>
            <p className="text-body-md text-neutral-700">
              Hai il diritto di proporre reclamo al Garante per la Protezione
              dei Dati Personali (
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                www.garanteprivacy.it
              </a>
              ) qualora ritenga che il trattamento dei tuoi dati personali
              violi il GDPR.
            </p>
          </section>
        </div>
      </Container>
    </main>
  )
}
