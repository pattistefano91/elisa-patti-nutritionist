'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Divider } from '@/components/ui/Divider'
import {
  SERVICES,
  INCLUDED_SERVICES,
  SERVICES_CTA_URL,
  type Service,
  type IncludedService,
} from '@/data/services'

function openCalendly(url: string): void {
  if (typeof window !== 'undefined' && (window as any).Calendly) {
    ;(window as any).Calendly.initPopupWidget({ url })
  } else {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Card
      variant={service.featured ? 'warm' : 'default'}
      shadow="md"
      className="flex flex-col h-full"
    >
      {/* Badge tag */}
      {service.tag && (
        <div className="mb-3">
          <Badge variant={service.tagVariant ?? 'neutral'}>{service.tag}</Badge>
        </div>
      )}

      {/* Nome */}
      <h3
        className="text-heading-4 mb-2"
        style={{ color: 'var(--color-neutral-900)' }}
      >
        {service.name}
      </h3>

      {/* Modalità + durata */}
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-body-sm"
          style={{ color: 'var(--color-neutral-500)' }}
        >
          {service.mode === 'online' ? '💻' : '📍'} {service.modeLabel}
        </span>
        <span
          className="text-body-sm"
          style={{ color: 'var(--color-neutral-400)' }}
        >
          ·
        </span>
        <span
          className="text-body-sm"
          style={{ color: 'var(--color-neutral-500)' }}
        >
          {service.duration}
        </span>
      </div>

      {/* Descrizione */}
      <p
        className="text-body-md mb-4 flex-1"
        style={{ color: 'var(--color-neutral-600)' }}
      >
        {service.description}
      </p>

      {/* Bullets opzionali */}
      {service.bullets && service.bullets.length > 0 && (
        <ul className="mb-4 space-y-1.5">
          {service.bullets.map((bullet) => (
            <li
              key={bullet}
              className="text-body-sm flex items-start gap-2"
              style={{ color: 'var(--color-neutral-600)' }}
            >
              <span
                className="mt-0.5 shrink-0"
                style={{ color: 'var(--color-primary-500)' }}
              >
                ✓
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <Button
        variant={service.featured ? 'primary' : 'secondary'}
        size="md"
        className="w-full mt-auto"
        onClick={() => openCalendly(service.calendlyUrl)}
        aria-label={`Prenota ${service.name}`}
      >
        Prenota ora
      </Button>
    </Card>
  )
}

function IncludedServicesBanner({ services }: { services: IncludedService[] }) {
  return (
    <Card variant="warm" shadow="sm" className="mt-8">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-heading-5">🎁</span>
        <div>
          <h3
            className="text-heading-5"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Servizi Inclusi
          </h3>
          <p
            className="text-body-sm"
            style={{ color: 'var(--color-neutral-500)' }}
          >
            Inclusi in ogni percorso, senza costi aggiuntivi
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        {services.map((s) => (
          <div key={s.id} className="flex items-start gap-3 flex-1">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p
                  className="text-label"
                  style={{ color: 'var(--color-neutral-800)' }}
                >
                  {s.name}
                </p>
                <Badge variant="primary">{s.subtitle}</Badge>
              </div>
              <p
                className="text-body-sm"
                style={{ color: 'var(--color-neutral-600)' }}
              >
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function ServicesCtaBanner() {
  return (
    <div
      className="mt-8 rounded-2xl p-8 text-center"
      style={{ backgroundColor: 'var(--color-primary-50)' }}
    >
      <h3
        className="text-heading-4 mb-3"
        style={{ color: 'var(--color-neutral-900)' }}
      >
        Non sai da dove iniziare?
      </h3>
      <p
        className="text-body-lg mb-6 max-w-lg mx-auto"
        style={{ color: 'var(--color-neutral-600)' }}
      >
        Prenota una consulenza gratuita e iniziamo insieme il tuo percorso
      </p>
      <Button
        variant="primary"
        size="lg"
        onClick={() => openCalendly(SERVICES_CTA_URL)}
        aria-label="Prenota una consulenza gratuita"
      >
        Prenota consulenza gratuita
      </Button>
    </div>
  )
}

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      style={{ backgroundColor: 'var(--color-surface-page)' }}
      className="py-20"
    >
      <Container>
        {/* Intestazione sezione */}
        <div className="text-center mb-12">
          <p
            className="text-label uppercase mb-3"
            style={{ color: 'var(--color-primary-600)' }}
          >
            I Percorsi
          </p>
          <h2
            id="services-heading"
            className="text-heading-2 mb-4"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Percorsi nutrizionali personalizzati
          </h2>
          <p
            className="text-body-lg max-w-xl mx-auto"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            Costruiti per durare nel tempo, su misura per te
          </p>
        </div>

        {/* Griglia 2+2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Banner newsletter */}
        <IncludedServicesBanner services={INCLUDED_SERVICES} />

        {/* CTA finale */}
        <ServicesCtaBanner />
      </Container>
    </section>
  )
}
