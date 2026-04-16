import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import {
  CONTACT,
  LOCATIONS,
  type ContactInfo,
  type Location,
} from '@/data/contact'

function ContactLinks({ contact }: { contact: ContactInfo }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Email */}
      <a
        href={`mailto:${contact.email}`}
        aria-label={`Invia email a ${contact.email}`}
        className="flex items-center gap-4 group"
      >
        <span
          className="flex items-center justify-center w-11 h-11 rounded-full shrink-0 text-xl transition-colors"
          style={{ backgroundColor: 'var(--color-primary-100)' }}
        >
          ✉️
        </span>
        <span
          className="text-body-md group-hover:underline"
          style={{ color: 'var(--color-neutral-700)' }}
        >
          {contact.email}
        </span>
      </a>

      {/* Telefono */}
      <a
        href={`tel:${contact.phone}`}
        aria-label={`Chiama Dott.ssa Elisa Patti al ${contact.phoneDisplay}`}
        className="flex items-center gap-4 group"
      >
        <span
          className="flex items-center justify-center w-11 h-11 rounded-full shrink-0 text-xl transition-colors"
          style={{ backgroundColor: 'var(--color-primary-100)' }}
        >
          📞
        </span>
        <span
          className="text-body-md group-hover:underline"
          style={{ color: 'var(--color-neutral-700)' }}
        >
          {contact.phoneDisplay}
        </span>
      </a>

      {/* Instagram */}
      <a
        href={contact.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Profilo Instagram di Elisa Patti ${contact.instagramHandle} (apre nuova tab)`}
        className="flex items-center gap-4 group"
      >
        <span
          className="flex items-center justify-center w-11 h-11 rounded-full shrink-0 transition-colors"
          style={{ backgroundColor: 'var(--color-primary-100)' }}
        >
          {/* Instagram SVG inline */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ color: 'var(--color-primary-700)' }}
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span
          className="text-body-md group-hover:underline"
          style={{ color: 'var(--color-neutral-700)' }}
        >
          {contact.instagramHandle}
        </span>
      </a>
    </div>
  )
}

function LocationCard({ location }: { location: Location }) {
  return (
    <Card variant="default" shadow="sm" className="flex flex-col gap-3">
      {/* Nome studio (opzionale) */}
      {location.name && (
        <p
          className="text-label"
          style={{ color: 'var(--color-primary-700)' }}
        >
          {location.name}
        </p>
      )}

      {/* Indirizzo */}
      <div style={{ color: 'var(--color-neutral-700)' }}>
        <p className="text-body-md">{location.address}</p>
        <p className="text-body-md">
          {location.cap} {location.city} ({location.province})
        </p>
      </div>

      {/* Link Google Maps */}
      <a
        href={location.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Apri ${location.address}, ${location.city} in Google Maps (apre nuova tab)`}
        className="inline-flex items-center gap-1.5 text-body-sm font-medium mt-1 hover:underline"
        style={{ color: 'var(--color-primary-600)' }}
      >
        📍 Apri in Google Maps
        <span aria-hidden="true" className="text-xs">↗</span>
      </a>
    </Card>
  )
}

export function ContactSection() {
  return (
    <section
      id="contatti"
      aria-labelledby="contact-heading"
      style={{ backgroundColor: 'var(--color-surface-page)' }}
      className="py-20"
    >
      <Container>
        {/* Intestazione */}
        <div className="text-center mb-12">
          <p
            className="text-label uppercase mb-3"
            style={{ color: 'var(--color-primary-600)' }}
          >
            Contatti
          </p>
          <h2
            id="contact-heading"
            className="text-heading-2 mb-4"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Scrivimi o vieni a trovarmi
          </h2>
          <p
            className="text-body-lg max-w-md mx-auto"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            Sono disponibile per rispondere a qualsiasi domanda
          </p>
        </div>

        {/* Griglia 2 colonne */}
        <div className={`grid gap-12 ${LOCATIONS.length > 0 ? 'lg:grid-cols-2' : ''}`}>

          {/* Colonna sinistra: recapiti */}
          <div>
            <h3
              className="text-heading-4 mb-6"
              style={{ color: 'var(--color-neutral-900)' }}
            >
              Come contattarmi
            </h3>
            <ContactLinks contact={CONTACT} />
          </div>

          {/* Colonna destra: location (solo se presenti) */}
          {LOCATIONS.length > 0 && (
            <div>
              <h3
                className="text-heading-4 mb-6"
                style={{ color: 'var(--color-neutral-900)' }}
              >
                Dove trovarmi
              </h3>
              <div className="flex flex-col gap-4">
                {LOCATIONS.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>
            </div>
          )}

        </div>
      </Container>
    </section>
  )
}
