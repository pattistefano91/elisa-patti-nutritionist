# ELISA PATTI Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-28

## Active Technologies
- TypeScript 5+ strict, Node.js 20 LTS + Next.js 15 App Router, Tailwind CSS v4, design system 001 (002-sezione-servizi)
- N/A — dati statici in `src/data/contact.ts` (002-sezione-servizi)
- TypeScript 5+ strict + noUncheckedIndexedAccess, Node.js 20 LTS + Next.js 15 App Router, next-sitemap, next/script (Plausible), Tailwind CSS v4 (002-sezione-servizi)
- N/A — sito statico, nessun database (002-sezione-servizi)
- TypeScript 5+ strict + noUncheckedIndexedAccess, Node.js 20 LTS + Next.js 15 App Router, `next/navigation` (usePathname), Tailwind CSS v4, clsx + tailwind-merge (002-sezione-servizi)
- N/A — dati statici in `src/data/navigation.ts` (002-sezione-servizi)
- TypeScript 5+ strict + noUncheckedIndexedAccess + Next.js 15 App Router, Tailwind CSS v4, next/image (006-chi-sono)
- N/A — dati statici in `src/data/about.ts` (006-chi-sono)
- TypeScript 5+ strict + noUncheckedIndexedAccess, Node.js 20 LTS + Next.js 15 App Router, Tailwind CSS v4, Framer Motion 11, Embla Carousel (nuova dipendenza) (010-google-reviews)
- N/A — dati statici in `src/data/reviews.ts` (010-google-reviews)
- N/A — dati statici in `src/data/percorsi.ts` (015-percorsi-nutrizionali)

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
│   ├── layout.tsx             ← Root layout: lang="it", font variables, Navbar, Footer, Plausible Script
│   ├── page.tsx               ← Hero page: identità visiva above the fold
│   ├── about/
│   │   └── page.tsx           ← Chi sono — placeholder
│   ├── servizi/
│   │   └── page.tsx           ← Servizi — placeholder, link a /#servizi
│   ├── blog/
│   │   └── page.tsx           ← Blog — placeholder, noindex
│   ├── privacy/
│   │   └── page.tsx           ← Privacy Policy (boilerplate GDPR italiano — placeholder)
│   ├── cookie-policy/
│   │   └── page.tsx           ← Cookie Policy (solo cookie tecnici — placeholder)
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
│   │   ├── Navbar.tsx          ← Navbar sticky, hamburger mobile, active state (client component)
│   │   ├── AboutCTA.tsx        ← CTA Calendly per pagina about (compact=hero button / default=full section)
│   │   ├── ServicesSection.tsx ← Sezione servizi homepage (griglia 4 card, Calendly CTA, newsletter)
│   │   ├── ContactSection.tsx  ← Sezione contatti homepage (email, tel, Instagram, location + Google Maps)
│   │   └── Footer.tsx          ← Footer globale (layout.tsx): dati professionali + link Privacy/Cookie Policy
│   └── shapes/
│       ├── index.ts           ← Barrel export: tutti i blob SVG
│       ├── BlobHero.tsx       ← SVG blob principale (hero decorativo)
│       ├── BlobFrame.tsx      ← SVG blob per frame/avatar
│       └── BlobSection.tsx    ← SVG blob per sezioni di contenuto
├── data/
│   ├── services.ts            ← Array servizi, tipi Service/IncludedService, URL Calendly placeholder
│   ├── contact.ts             ← Dati contatto (email, tel, Instagram) e location, tipi ContactInfo/Location
│   ├── navigation.ts          ← Voci navbar: interface NavLink, NAV_LINKS (Chi sono, Servizi, Blog, Contatti)
│   ├── about.ts               ← AboutContent: bio, foto, filosofia (4 valori), credenziali — placeholder realistico
│   └── professional.ts        ← Dati professionali footer: nome, titolo, albo (placeholder alboNumber)
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
- 015-percorsi-nutrizionali: Added TypeScript 5+ strict + noUncheckedIndexedAccess, Node.js 20 LTS + Next.js 15 App Router, Tailwind CSS v4, Framer Motion 11
- 010-google-reviews: Added TypeScript 5+ strict + noUncheckedIndexedAccess, Node.js 20 LTS + Next.js 15 App Router, Tailwind CSS v4, Framer Motion 11, Embla Carousel (nuova dipendenza)
- 006-chi-sono: Added TypeScript 5+ strict + noUncheckedIndexedAccess + Next.js 15 App Router, Tailwind CSS v4, next/image


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
