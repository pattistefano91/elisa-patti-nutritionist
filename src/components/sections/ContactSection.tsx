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

      {/* WhatsApp */}
      <a
        href={contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Scrivimi su WhatsApp (apre nuova tab)"
        className="flex items-center gap-4 group"
      >
        <span
          className="flex items-center justify-center w-11 h-11 rounded-full shrink-0 transition-colors"
          style={{ backgroundColor: 'var(--color-primary-100)' }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            style={{ color: 'var(--color-primary-700)' }}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
        <span
          className="text-body-md group-hover:underline"
          style={{ color: 'var(--color-neutral-700)' }}
        >
          WhatsApp
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
