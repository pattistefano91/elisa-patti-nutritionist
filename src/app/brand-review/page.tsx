import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Divider } from '@/components/ui/Divider'
import { Skeleton } from '@/components/ui/Skeleton'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Container } from '@/components/ui/Container'
import { BlobHero } from '@/components/shapes/BlobHero'
import { BlobFrame } from '@/components/shapes/BlobFrame'
import { BlobSection } from '@/components/shapes/BlobSection'

export const metadata: Metadata = {
  title: 'Brand Review — Elisa Patti',
  robots: 'noindex, nofollow',
}

const colors = [
  { name: 'primary-50',  hex: '#F2F7F0', label: 'Verde Salvia 50' },
  { name: 'primary-100', hex: '#E5EFE2', label: 'Verde Salvia 100' },
  { name: 'primary-200', hex: '#C5D9C0', label: 'Verde Salvia 200' },
  { name: 'primary-300', hex: '#A0BF99', label: 'Verde Salvia 300' },
  { name: 'primary-400', hex: '#7CA673', label: 'Verde Salvia 400' },
  { name: 'primary-500', hex: '#5E8350', label: 'Verde Salvia 500' },
  { name: 'primary-600', hex: '#4A6B3E', label: 'Verde Salvia 600' },
  { name: 'primary-700', hex: '#3D5933', label: 'Verde Salvia 700' },
  { name: 'primary-800', hex: '#2E4326', label: 'Verde Salvia 800' },
  { name: 'primary-900', hex: '#1F2D19', label: 'Verde Salvia 900' },
  { name: 'secondary-50',  hex: '#FBF7EF', label: 'Sabbia 50' },
  { name: 'secondary-300', hex: '#D4B47A', label: 'Sabbia 300' },
  { name: 'secondary-500', hex: '#B99055', label: 'Sabbia 500' },
  { name: 'secondary-700', hex: '#8A6A2E', label: 'Sabbia 700' },
  { name: 'accent-100', hex: '#FAE8DF', label: 'Terracotta 100' },
  { name: 'accent-300', hex: '#E09070', label: 'Terracotta 300' },
  { name: 'accent-500', hex: '#C45C38', label: 'Terracotta 500 (CTA)' },
  { name: 'accent-700', hex: '#8F3A1C', label: 'Terracotta 700' },
  { name: 'neutral-50',  hex: '#FAF9F7', label: 'Neutro 50' },
  { name: 'neutral-200', hex: '#E8E4DC', label: 'Neutro 200' },
  { name: 'neutral-500', hex: '#928C82', label: 'Neutro 500' },
  { name: 'neutral-900', hex: '#1A1612', label: 'Neutro 900 (Testo)' },
]

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="py-12">
    <h2 className="text-heading-3 mb-2" style={{ color: 'var(--color-neutral-900)' }}>{title}</h2>
    <Divider className="mb-8" />
    {children}
  </section>
)

export default function BrandReview() {
  return (
    <div style={{ backgroundColor: 'var(--color-surface-page)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-primary-700)' }} className="py-6">
        <Container>
          <p className="text-label" style={{ color: 'var(--color-primary-100)' }}>
            PAGINA RISERVATA — REVISIONE BRAND
          </p>
          <h1 className="text-heading-2" style={{ color: '#FFFFFF' }}>
            Design System · Dott.ssa Elisa Patti
          </h1>
        </Container>
      </div>

      <Container className="py-12">

        {/* Palette */}
        <Section title="Palette Cromatica">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col gap-1.5">
                <div
                  className="h-14 rounded-lg border border-black/5"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="text-caption" style={{ color: 'var(--color-neutral-700)' }}>
                  {c.label}
                </p>
                <p className="text-caption" style={{ color: 'var(--color-neutral-500)' }}>
                  {c.hex}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Tipografia */}
        <Section title="Scala Tipografica">
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <div key={level} className="flex items-baseline gap-4">
                <span className="text-caption w-20 shrink-0" style={{ color: 'var(--color-neutral-500)' }}>
                  heading-{level}
                </span>
                <p
                  className={`text-heading-${level}`}
                  style={{ color: 'var(--color-neutral-900)' }}
                >
                  Cura il tuo benessere
                </p>
              </div>
            ))}
            <Divider />
            {(['lg', 'md', 'sm', 'caption', 'label'] as const).map((size) => (
              <div key={size} className="flex items-baseline gap-4">
                <span className="text-caption w-20 shrink-0" style={{ color: 'var(--color-neutral-500)' }}>
                  {size === 'label' || size === 'caption' ? size : `body-${size}`}
                </span>
                <p
                  className={size === 'label' || size === 'caption' ? `text-${size}` : `text-body-${size}`}
                  style={{ color: 'var(--color-neutral-700)' }}
                >
                  Percorsi personalizzati per ritrovare l&apos;equilibrio alimentare.
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Blob */}
        <Section title="Forme Organiche (Blob)">
          <div className="grid grid-cols-3 gap-8">
            {[
              { label: 'BlobHero', Component: BlobHero },
              { label: 'BlobFrame', Component: BlobFrame },
              { label: 'BlobSection', Component: BlobSection },
            ].map(({ label, Component }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className="relative w-40 h-40">
                  <Component
                    className="w-full h-full"
                    style={{ color: 'var(--color-primary-400)' } as React.CSSProperties}
                  />
                </div>
                <p className="text-label" style={{ color: 'var(--color-neutral-600)' }}>{label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Componenti UI */}
        <Section title="Componenti UI">
          {/* Button */}
          <div className="mb-8">
            <p className="text-label mb-4" style={{ color: 'var(--color-neutral-500)' }}>BUTTON</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" size="lg">Prenota ora</Button>
              <Button variant="primary" size="md">Prenota ora</Button>
              <Button variant="primary" size="sm">Prenota ora</Button>
              <Button variant="secondary" size="md">Scopri i servizi</Button>
              <Button variant="ghost" size="md">Annulla</Button>
              <Button variant="primary" size="md" loading>Caricamento</Button>
            </div>
          </div>

          {/* Badge */}
          <div className="mb-8">
            <p className="text-label mb-4" style={{ color: 'var(--color-neutral-500)' }}>BADGE</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Nutrizionista</Badge>
              <Badge variant="secondary">Disponibile</Badge>
              <Badge variant="accent">Novità</Badge>
              <Badge variant="neutral">Info</Badge>
            </div>
          </div>

          {/* Avatar */}
          <div className="mb-8">
            <p className="text-label mb-4" style={{ color: 'var(--color-neutral-500)' }}>AVATAR</p>
            <div className="flex gap-4 items-center">
              <Avatar initials="EP" size="sm" />
              <Avatar initials="EP" size="md" />
              <Avatar initials="EP" size="lg" />
            </div>
          </div>

          {/* Card */}
          <div className="mb-8">
            <p className="text-label mb-4" style={{ color: 'var(--color-neutral-500)' }}>CARD</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card variant="default" shadow="md">
                <Badge variant="primary" className="mb-3">Servizio</Badge>
                <h3 className="text-heading-5 mb-2" style={{ color: 'var(--color-neutral-900)' }}>
                  Prima visita
                </h3>
                <p className="text-body-sm" style={{ color: 'var(--color-neutral-600)' }}>
                  Anamnesi completa e piano alimentare personalizzato.
                </p>
              </Card>
              <Card variant="warm" shadow="md">
                <Badge variant="secondary" className="mb-3">Popolare</Badge>
                <h3 className="text-heading-5 mb-2" style={{ color: 'var(--color-neutral-900)' }}>
                  Percorso 3 mesi
                </h3>
                <p className="text-body-sm" style={{ color: 'var(--color-neutral-600)' }}>
                  Accompagnamento continuo con visite mensili.
                </p>
              </Card>
              <Card variant="muted" shadow="sm">
                <Badge variant="neutral" className="mb-3">Gratuito</Badge>
                <h3 className="text-heading-5 mb-2" style={{ color: 'var(--color-neutral-900)' }}>
                  Consulenza iniziale
                </h3>
                <p className="text-body-sm" style={{ color: 'var(--color-neutral-600)' }}>
                  30 minuti per capire le tue esigenze.
                </p>
              </Card>
            </div>
          </div>

          {/* Form inputs */}
          <div className="mb-8">
            <p className="text-label mb-4" style={{ color: 'var(--color-neutral-500)' }}>INPUT / FORM</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <Input label="Nome e cognome" placeholder="Elisa Patti" />
              <Input label="Email" placeholder="elisa@esempio.it" type="email" />
              <Input label="Campo con errore" error="Valore non valido" defaultValue="testo errato" />
              <Input label="Campo disabilitato" disabled defaultValue="Non modificabile" />
              <div className="md:col-span-2">
                <Textarea label="Messaggio" placeholder="Come posso aiutarti?" rows={3} />
              </div>
            </div>
          </div>

          {/* Skeleton */}
          <div>
            <p className="text-label mb-4" style={{ color: 'var(--color-neutral-500)' }}>SKELETON (loading)</p>
            <div className="flex flex-col gap-3 max-w-sm">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <div className="flex gap-3 items-center">
                <Skeleton rounded className="h-10 w-10" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Hero mockup — above the fold */}
        <Section title="Anteprima Above the Fold">
          <div
            className="relative overflow-hidden rounded-2xl min-h-[520px] flex items-center"
            style={{ backgroundColor: 'var(--color-surface-page)' }}
          >
            {/* Blob decorativi */}
            <BlobHero
              className="absolute -top-16 -right-16 w-80 h-80 opacity-20 pointer-events-none"
              style={{ color: 'var(--color-primary-400)' } as React.CSSProperties}
            />
            <BlobHero
              className="absolute -bottom-24 -left-24 w-64 h-64 opacity-10 pointer-events-none rotate-180"
              style={{ color: 'var(--color-secondary-400)' } as React.CSSProperties}
            />

            <div className="relative z-10 px-8 py-16 max-w-xl">
              <p
                className="text-label uppercase mb-4"
                style={{ color: 'var(--color-primary-500)' }}
              >
                Biologa Nutrizionista
              </p>
              <h1
                className="text-heading-1 mb-6"
                style={{ color: 'var(--color-neutral-900)' }}
              >
                Cura il tuo benessere con la nutrizione
              </h1>
              <p
                className="text-body-lg mb-10"
                style={{ color: 'var(--color-neutral-600)' }}
              >
                Percorsi personalizzati per ritrovare l&apos;equilibrio alimentare,
                migliorare la salute e sentirti bene ogni giorno. Con un approccio
                umano e scientifico.
              </p>
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
        </Section>

      </Container>
    </div>
  )
}
