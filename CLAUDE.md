# ELISA PATTI Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-15

## Active Technologies
- TypeScript 5+ strict, Node.js 20 LTS + Next.js 15 App Router, Tailwind CSS v4, design system 001 (002-sezione-servizi)
- N/A — dati statici in `src/data/contact.ts` (002-sezione-servizi)

- **Framework**: Next.js 15 (App Router), TypeScript strict + noUncheckedIndexedAccess, Node.js 20 LTS
- **Styling**: Tailwind CSS v4 (`@theme` CSS-first, no tailwind.config.js), clsx + tailwind-merge
- **Fonts**: Cormorant Garamond (display) + DM Sans (body) via `next/font/google` — self-hosted, GDPR compliant
- **Animation**: Framer Motion 11
- **Accessibility**: Radix UI Primitives, @axe-core/playwright
- **Sitemap**: next-sitemap (`SITE_URL` env var required)

## Project Structure

```text
src/
├── app/
│   ├── globals.css            ← @theme Tailwind v4: tutti i design token (colori, tipografia, spaziature)
│   ├── layout.tsx             ← Root layout: lang="it", font variables su <html>
│   ├── page.tsx               ← Hero page: identità visiva above the fold
│   └── brand-review/
│       └── page.tsx           ← Pagina revisione brand (noindex) — rimuovere dopo approvazione cliente
├── components/
│   ├── ui/
│   │   ├── index.ts           ← Barrel export: tutti i componenti UI
│   │   ├── Avatar.tsx         ← Avatar con fallback initials
│   │   ├── Badge.tsx          ← Pill badge con varianti primary/secondary/accent/neutral
│   │   ├── Button.tsx         ← CTA button (primary/secondary/ghost), loading state
│   │   ├── Card.tsx           ← Card container (default/muted/warm, shadow levels)
│   │   ├── Container.tsx      ← Layout wrapper max-width centrato con padding responsive
│   │   ├── Divider.tsx        ← Separatore orizzontale/verticale
│   │   ├── Input.tsx          ← Input testo con label, errore, stati focus/disabled
│   │   ├── Skeleton.tsx       ← Placeholder loading con animate-pulse
│   │   └── Textarea.tsx       ← Textarea con stessi stati di Input
│   ├── sections/
│   │   ├── ServicesSection.tsx ← Sezione servizi homepage (griglia 4 card, Calendly CTA, newsletter)
│   │   └── ContactSection.tsx  ← Sezione contatti homepage (email, tel, Instagram, location + Google Maps)
│   └── shapes/
│       ├── index.ts           ← Barrel export: tutti i blob SVG
│       ├── BlobHero.tsx       ← SVG blob principale (hero decorativo)
│       ├── BlobFrame.tsx      ← SVG blob per frame/avatar
│       └── BlobSection.tsx    ← SVG blob per sezioni di contenuto
├── data/
│   ├── services.ts            ← Array servizi, tipi Service/IncludedService, URL Calendly placeholder
│   └── contact.ts             ← Dati contatto (email, tel, Instagram) e location, tipi ContactInfo/Location
└── lib/
    └── fonts.ts               ← Cormorant Garamond + DM Sans con variabili CSS
docs/
├── quickstart.md              ← Guida rapida: token, componenti, esempi
└── photography-guidelines.md  ← Mood, formati, istruzioni per la Dott.ssa
specs/
└── 001-design-system/
    ├── spec.md                ← Feature spec con user stories e criteri di accettazione
    ├── contracts/
    │   └── design-tokens.md   ← Contratto token: colori, tipografia, spaziature
    ├── tasks.md               ← 37 task con stato [x]/[ ] e checkpoint indipendenti
    └── quickstart.md          ← (deprecated → usare docs/quickstart.md)
next-sitemap.config.js         ← Sitemap config: esclude /brand-review, robots.txt
```

## Design Tokens (sintesi)

- **Palette**: Verde Salvia `#5E8350` (primary), Sabbia Calda `#B99055` (secondary), Terracotta `#C45C38` (accent/CTA)
- **Testo**: `--color-neutral-900` (#1A1612) su `--color-surface-page` (#FAF8F5)
- **Tipografia**: `.text-heading-1…6` (Cormorant Garamond), `.text-body-lg/md/sm` `.text-label` `.text-caption` (DM Sans)
- Import componenti: `import { Button, Card, … } from '@/components/ui'`
- Import blob: `import { BlobHero, … } from '@/components/shapes'`

## Commands

```bash
npm run dev      # dev server http://localhost:3000
npm run build    # build produzione
npm run lint     # ESLint
npx tsc --noEmit # type check
```

## Recent Changes
- 002-sezione-servizi: Added TypeScript 5+ strict, Node.js 20 LTS + Next.js 15 App Router, Tailwind CSS v4, design system 001

- 003-sezione-contatti: Sezione contatti completa — email (mailto:), telefono (tel:), Instagram, location con Google Maps. Dati placeholder in src/data/contact.ts (da aggiornare con dati reali Dott.ssa).
- 002-sezione-servizi: Sezione servizi completa — 4 card (Consulenza Gratuita, Prima Visita, Visite di Controllo, Visita Online), Calendly popup widget, IncludedServicesBanner newsletter, ServicesCtaBanner. T001–T013 completi. URL Calendly placeholder (da aggiornare con URL reali dalla Dott.ssa).
- 001-design-system: Design system completo — Phase 1–5 implemented (T001–T031, T033). Pending: T032 (Vercel deploy), T034 (FOUT check), T035 (Playwright smoke test), T036 (rimuovi brand-review post-approvazione)

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
