# Implementation Plan: Sezione Recensioni Google

**Branch**: `010-google-reviews` | **Date**: 2026-04-24 | **Spec**: [spec.md](spec.md)

---

## Summary

Aggiungere nella homepage una sezione carousel di recensioni Google con scorrimento automatico, navigazione manuale, swipe mobile, badge rating e link al profilo Google. Dati statici in `src/data/reviews.ts` (pattern già consolidato), carousel tramite Embla Carousel (12kb), reveal con Framer Motion già presente.

---

## Technical Context

**Language/Version**: TypeScript 5+ strict + noUncheckedIndexedAccess, Node.js 20 LTS
**Primary Dependencies**: Next.js 15 App Router, Tailwind CSS v4, Framer Motion 11, Embla Carousel (nuova dipendenza)
**Storage**: N/A — dati statici in `src/data/reviews.ts`
**Testing**: Type check (`tsc --noEmit`), smoke test manuale da quickstart.md
**Target Platform**: Web (desktop 1280px+, tablet 768px, mobile 375px)
**Project Type**: Web application — sito statico Next.js
**Performance Goals**: Nessun impatto su LCP (nessuna immagine esterna, nessuna richiesta di rete aggiuntiva)
**Constraints**: Zero cookie di terze parti, zero embed Google, bundle increment ≤ 15kb gzipped
**Scale/Scope**: 5–20 recensioni nel carousel

---

## Constitution Check

- [x] **I. Design Organico**: card con `rounded-2xl`, avatar circolari, nessun bordo vivo
- [x] **II. Conversion-First**: sezione posizionata dopo i servizi — supporta conversione, non compete con hero CTA
- [x] **III. Mobile-First**: 1 card su 375px → 2 su 768px → 3 su 1280px+
- [x] **IV. Performance**: Embla 12kb, nessuna immagine esterna, Framer Motion già in bundle
- [x] **V. GDPR**: dati statici, nessun embed Google, nessun cookie, nessun tracker terze parti
- [x] **VI. CMS-First**: deferred — dati in file statico (pattern consolidato); struttura identica a futura schema Sanity per migrazione 1:1
- [x] **VII. YAGNI**: Embla giustificata come minimo necessario per swipe + autoplay + infinite loop

---

## Project Structure

### Documentation (this feature)

```text
specs/007-google-reviews/
├── plan.md          ← questo file
├── spec.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md         ← generato da /speckit.tasks
```

### Source Code

```text
src/
├── data/
│   └── reviews.ts                     ← NUOVO: ReviewsConfig, Review, REVIEWS_CONFIG
├── components/
│   └── sections/
│       └── ReviewsSection.tsx         ← NUOVO: carousel client component
└── app/
    └── page.tsx                       ← MODIFICA: aggiunge <ReviewsSection /> tra Servizi e Contatti

package.json                           ← MODIFICA: aggiunge embla-carousel-react, embla-carousel-autoplay
```

---

## Phases

### Phase 0: Setup dipendenze

Installare Embla Carousel:
```bash
npm install embla-carousel-react embla-carousel-autoplay
```

### Phase 1: Data layer

Creare `src/data/reviews.ts` con:
- Interface `Review` (id, author, rating, text?, date)
- Interface `ReviewsConfig` (averageRating, totalCount, googleUrl, reviews[])
- Export `REVIEWS_CONFIG` con dati placeholder realistici (5–8 recensioni)

### Phase 2: Componente ReviewsSection

Creare `src/components/sections/ReviewsSection.tsx` (`'use client'`):

**Struttura interna**:
- `ReviewCard` — card singola recensione: avatar initials, stelle SVG, testo (troncato a 200 char), nome, data
- `StarRating` — 5 stelle SVG, riempite in base al rating
- `ReviewsCarousel` — wrapper Embla con autoplay + hover pause + swipe + `loop: true` (scorrimento ciclico infinito)
- `ReviewsSection` — sezione completa: header con badge rating, carousel, link Google

**Layout responsive**:
- Mobile (< 768px): `slidesToScroll: 1`, 1 card visibile
- Tablet (768–1279px): `slidesToScroll: 1`, 2 card visibili (CSS `flex-basis: 50%`)
- Desktop (≥ 1280px): `slidesToScroll: 1`, 3 card visibili (CSS `flex-basis: 33.33%`)

**Avatar colori**:
```typescript
const AVATAR_COLORS = [
  'var(--color-primary-100)',
  'var(--color-secondary-100)',
  'var(--color-accent-100)',
  // ...
]
function getAvatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}
```

**Autoplay**: `embla-carousel-autoplay` con `delay: 4500`, `stopOnInteraction: false`, `stopOnMouseEnter: true`

**Animazione sezione**: Framer Motion `whileInView` con `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }` e `viewport={{ once: true }}`

### Phase 3: Integrazione homepage

Modificare `src/app/page.tsx`:
```tsx
import { ReviewsSection } from '@/components/sections/ReviewsSection'
// ...
<ServicesSection />
<Divider />
<ReviewsSection />     {/* NUOVO */}
<Divider />
<ContactSection />
```

---

## Complexity Tracking

| Item | Justificazione |
|------|----------------|
| Nuova dipendenza: Embla Carousel | Swipe nativo + autoplay + infinite loop non implementabili con CSS puro o Framer Motion senza complessità sproporzionata. Embla è 12kb e purpose-built. |
