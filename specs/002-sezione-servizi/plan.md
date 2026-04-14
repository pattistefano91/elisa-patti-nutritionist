# Implementation Plan: Sezione Servizi

**Branch**: `002-sezione-servizi` | **Date**: 2026-04-14 | **Spec**: [spec.md](spec.md)

## Summary

Aggiungere alla home page una sezione servizi con 4 card (Consulenza Gratuita, Prima Visita Nutrizionale, Visite di Controllo, Visita Online), un banner "Servizi Inclusi" (newsletter), e un blocco CTA finale. La prenotazione avviene tramite popup widget Calendly, caricato con `next/script` strategy `lazyOnload`. I contenuti sono definiti in un unico array tipizzato CMS-ready.

## Technical Context

**Language/Version**: TypeScript 5.4+ / Node.js 20 LTS / Next.js 15 App Router
**Primary Dependencies**: Tailwind CSS v4, clsx, tailwind-merge, next/script (Calendly)
**Storage**: N/A — dati statici in `src/data/services.ts`
**Testing**: Playwright (smoke test esistente, da estendere) + axe WCAG AA
**Target Platform**: Web — Chrome/Firefox/Edge last 2 + Safari 16+
**Project Type**: Web application (Next.js SSG)
**Performance Goals**: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms (Principio IV constitution)
**Constraints**: Script Calendly caricato solo `lazyOnload`, nessun impatto su LCP
**Scale/Scope**: Sezione singola nella home page, 4 card + 2 banner

## Constitution Check

- [x] **I. Design Organico**: tutti i componenti usano Card/Badge/Button del design system 001 (rounded-2xl, rounded-full) — nessun bordo vivo
- [x] **II. Conversion-First**: CTA primaria della sezione è il blocco finale "Non sai da dove iniziare?" (T010). I CTA nelle singole card sono CTA contestuali secondarie (ogni servizio ha la sua prenotazione) — non competono visivamente con la primaria perché puntano tutte allo stesso obiettivo di conversione (booking Calendly). Consulenza Gratuita è in prima posizione nella griglia come da principio.
- [x] **III. Mobile-First**: griglia a colonna singola su mobile (375px), 2+2 su desktop (1280px) — progettata mobile-first
- [x] **IV. Performance**: script Calendly con `strategy="lazyOnload"` — nessun impatto su LCP/CLS; CSS Calendly ~3KB non bloccante
- [x] **V. GDPR**: script Calendly caricato solo su interazione utente (`lazyOnload`), nessun cookie passivo; DPA Calendly da firmare (documentato in contracts/calendly-integration.md)
- [x] **VI. CMS-First**: tutti i contenuti in `src/data/services.ts` — struttura mappabile 1:1 a documento Sanity senza modificare i componenti
- [x] **VII. YAGNI**: nessuna astrazione non necessaria; componenti specifici per questa sezione, nessun pattern generico prematuro

## Project Structure

### Documentation (questa feature)

```text
specs/002-sezione-servizi/
├── plan.md                       ← questo file
├── spec.md                       ← feature specification
├── research.md                   ← decisioni Calendly + GDPR
├── data-model.md                 ← tipo Service, IncludedService
├── contracts/
│   ├── services-data.md          ← contratto src/data/services.ts
│   └── calendly-integration.md  ← contratto integrazione Calendly
└── tasks.md                      ← generato da /speckit-tasks
```

### Source Code

```text
src/
├── app/
│   ├── layout.tsx                ← aggiungere Script Calendly + CSS link
│   └── page.tsx                  ← aggiungere <ServicesSection />
├── components/
│   └── sections/
│       └── ServicesSection.tsx   ← nuovo: griglia card + banner + CTA
└── data/
    └── services.ts               ← nuovo: SERVICES[], INCLUDED_SERVICES[]
```

**Nessun nuovo componente UI generico** — si usano Card, Badge, Button, Container, Divider da `@/components/ui` già esistenti.

## Complexity Tracking

Nessuna violazione della constitution. Nessuna complessità aggiuntiva da giustificare.
