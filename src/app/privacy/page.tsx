import type { Metadata } from 'next'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy | Dott.ssa Elisa Patti',
  robots: { index: false },
}

export default function PrivacyPage() {
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
              Informativa ai sensi dell&apos;art. 13 GDPR
            </p>
            <h1 className="text-heading-2" style={{ color: 'var(--color-neutral-900)' }}>
              Privacy Policy
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
                1. Titolare del trattamento
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Titolare del trattamento dei dati personali è la <strong>Dott.ssa Elisa Patti</strong>,
                Biologa Nutrizionista, con sede a Civitanova Marche (MC).
              </p>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Per qualsiasi richiesta relativa al trattamento dei tuoi dati personali puoi
                contattarla all&apos;indirizzo:{' '}
                <a
                  href="mailto:nutrizionista.elisapatti@gmail.com"
                  className="hover:underline"
                  style={{ color: 'var(--color-primary-600)' }}
                >
                  nutrizionista.elisapatti@gmail.com
                </a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                2. Dati trattati e modalità di raccolta
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Questo sito raccoglie esclusivamente <strong>dati tecnici di navigazione anonimi</strong>{' '}
                (tipo di dispositivo, browser, sistema operativo, pagine visitate, paese di provenienza
                aggregato) tramite Plausible Analytics. Nessun dato personale identificabile viene
                raccolto o conservato.
              </p>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Qualora tu scelga di contattare la Dott.ssa Elisa Patti via email, i dati da te
                forniti volontariamente (nome, indirizzo email, contenuto del messaggio) saranno
                trattati esclusivamente per rispondere alla tua richiesta.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                3. Finalità e base giuridica
              </h2>
              <ul className="space-y-2 text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                <li>
                  <strong>Statistiche di navigazione aggregate</strong>: finalità statistica (conteggio
                  visitatori, pagine più visitate) sulla base del legittimo interesse del titolare
                  ai sensi dell&apos;art. 6(1)(f) GDPR. Nessun dato viene utilizzato per profilazione
                  o marketing.
                </li>
                <li>
                  <strong>Comunicazioni via email</strong>: gestione della richiesta di contatto sulla
                  base del consenso dell&apos;interessato ai sensi dell&apos;art. 6(1)(a) GDPR.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                4. Destinatari dei dati
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                I dati di navigazione aggregati sono trattati da{' '}
                <strong>Plausible Analytics</strong> (Plausible Insights OÜ, Estonia — UE) come
                responsabile del trattamento. I server di Plausible si trovano all&apos;interno
                dell&apos;Unione Europea. Nessun dato viene trasferito a paesi terzi.
              </p>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Il sito è ospitato su <strong>Vercel Inc.</strong> (USA). Il trasferimento è coperto
                dalle clausole contrattuali standard (SCC) adottate da Vercel ai sensi dell&apos;art.
                46 GDPR.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                5. Conservazione dei dati
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                I dati statistici aggregati sono conservati su Plausible Analytics per un periodo non
                superiore a 24 mesi. Le comunicazioni email vengono conservate per il tempo strettamente
                necessario a gestire la richiesta e comunque non oltre 12 mesi.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                6. I tuoi diritti
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Ai sensi degli artt. 15–22 del GDPR (Reg. UE 2016/679) hai diritto di:
              </p>
              <ul className="list-disc list-inside space-y-1 text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                <li>accedere ai tuoi dati personali</li>
                <li>richiederne la rettifica o la cancellazione</li>
                <li>opporti al trattamento o richiederne la limitazione</li>
                <li>richiedere la portabilità dei dati</li>
                <li>revocare il consenso in qualsiasi momento (senza pregiudicare la liceità del trattamento precedente)</li>
              </ul>
              <p className="text-body-md mt-2" style={{ color: 'var(--color-neutral-700)' }}>
                Poiché questo sito non raccoglie dati personali identificabili nella navigazione
                ordinaria, tali diritti si applicano principalmente alle comunicazioni email. Per
                esercitarli scrivi a{' '}
                <a
                  href="mailto:nutrizionista.elisapatti@gmail.com"
                  className="hover:underline"
                  style={{ color: 'var(--color-primary-600)' }}
                >
                  nutrizionista.elisapatti@gmail.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-heading-5 font-semibold" style={{ color: 'var(--color-neutral-800)' }}>
                7. Reclami
              </h2>
              <p className="text-body-md" style={{ color: 'var(--color-neutral-700)' }}>
                Hai il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali
                (
                <a
                  href="https://www.garanteprivacy.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: 'var(--color-primary-600)' }}
                >
                  www.garanteprivacy.it
                </a>
                ) qualora ritenga che il trattamento dei tuoi dati personali violi il GDPR.
              </p>
            </section>

          </div>
        </Container>
      </section>
    </main>
  )
}
