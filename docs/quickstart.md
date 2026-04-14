# Design System — Guida rapida

## Avviare il progetto

```bash
npm run dev   # http://localhost:3000
```

---

## Token di design

Tutti i token sono definiti in `src/app/globals.css` nel blocco `@theme`.
Usali via variabili CSS (`var(--color-primary-500)`) o classi Tailwind (`text-[var(--color-primary-500)]`).

### Colori principali

| Token                      | Valore    | Uso                        |
|----------------------------|-----------|----------------------------|
| `--color-primary-500`      | `#5E8350` | Verde Salvia — brand       |
| `--color-secondary-500`    | `#B99055` | Sabbia Calda — accenti     |
| `--color-accent-500`       | `#C45C38` | Terracotta — CTA           |
| `--color-neutral-900`      | `#1A1612` | Testo principale           |
| `--color-surface-page`     | `#FAF8F5` | Sfondo pagina              |
| `--color-surface-card`     | `#FFFFFF` | Sfondo card                |

### Tipografia

Classi predefinite (applicano font, size, weight, line-height):

```
.text-heading-1   →  Cormorant Garamond 3.5rem / 1.15
.text-heading-2   →  Cormorant Garamond 2.5rem / 1.2
.text-heading-3   →  Cormorant Garamond 2rem / 1.25
.text-heading-4   →  Cormorant Garamond 1.5rem / 1.3
.text-heading-5   →  Cormorant Garamond 1.25rem / 1.35
.text-heading-6   →  Cormorant Garamond 1rem / 1.4
.text-body-lg     →  DM Sans 1.125rem / 1.7
.text-body-md     →  DM Sans 1rem / 1.6
.text-body-sm     →  DM Sans 0.875rem / 1.5
.text-caption     →  DM Sans 0.75rem / 1.4
.text-label       →  DM Sans 0.875rem / 1.4, uppercase, tracking-wide
```

---

## Componenti UI

Importa da `@/components/ui`:

```tsx
import { Button, Card, Input, Textarea, Badge, Avatar, Divider, Skeleton, Container } from '@/components/ui'
```

### Button

```tsx
<Button variant="primary" size="lg">Prenota</Button>
<Button variant="secondary" size="md">Scopri</Button>
<Button variant="ghost" size="sm">Annulla</Button>
<Button variant="primary" loading>Caricamento...</Button>
```

### Card

```tsx
<Card variant="default" shadow="md">Contenuto</Card>
<Card variant="warm" shadow="lg">Contenuto caldo</Card>
<Card variant="muted" shadow="sm">Contenuto neutro</Card>
```

### Input / Textarea

```tsx
<Input label="Nome" placeholder="Mario Rossi" />
<Input label="Email" error="Email non valida" />
<Textarea label="Messaggio" rows={5} />
```

### Badge

```tsx
<Badge variant="primary">Nutrizionista</Badge>
<Badge variant="accent">Novità</Badge>
<Badge variant="secondary">Disponibile</Badge>
<Badge variant="neutral">Info</Badge>
```

### Avatar

```tsx
<Avatar src="/foto.jpg" alt="Elisa Patti" size="lg" />
<Avatar initials="EP" size="md" />
```

### Divider

```tsx
<Divider />                          {/* orizzontale */}
<Divider orientation="vertical" />  {/* verticale */}
```

### Skeleton

```tsx
<Skeleton className="h-6 w-48" />          {/* testo */}
<Skeleton className="h-48 w-full" />       {/* immagine */}
<Skeleton rounded className="h-12 w-12" /> {/* avatar */}
```

### Container

```tsx
<Container>
  <p>Contenuto centrato con padding orizzontale responsive.</p>
</Container>
```

---

## Blob decorativi

Importa da `@/components/shapes`:

```tsx
import { BlobHero, BlobFrame, BlobSection } from '@/components/shapes'

<BlobHero
  className="absolute -top-16 -right-16 w-80 h-80 opacity-20 pointer-events-none"
  style={{ color: 'var(--color-primary-400)' }}
/>
```

---

## Accessibilità

- Contrasto WCAG 2.1 AA garantito su tutti i token semantici
- Tutti gli input hanno label associata via `htmlFor`
- Blob SVG hanno `aria-hidden="true"`
- `prefers-reduced-motion` disabilita tutte le animazioni automaticamente
