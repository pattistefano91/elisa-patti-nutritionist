# Implementation Plan: Navigazione

**Branch**: `005-navigazione` | **Date**: 2026-04-16 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/005-navigazione/spec.md`

---

## Summary

Aggiungere un componente `<Navbar>` sticky al layout del sito con navigazione desktop orizzontale, menù hamburger mobile a dropdown, link attivo evidenziato, CTA "Prenota ora" e tre pagine placeholder (`/about`, `/servizi`, `/blog`). I dati di navigazione sono centralizzati in `src/data/navigation.ts`.

---

## Technical Context

**Language/Version**: TypeScript 5+ strict + noUncheckedIndexedAccess, Node.js 20 LTS
**Primary Dependencies**: Next.js 15 App Router, `next/navigation` (usePathname), Tailwind CSS v4, clsx + tailwind-merge
**Storage**: N/A — dati statici in `src/data/navigation.ts`
**Testing**: Playwright + @axe-core/playwright (già configurati)
**Target Platform**: Vercel (Node.js 20)
**Project Type**: Web application — componente UI + pagine statiche
**Performance Goals**: Navbar è un piccolo client component; zero impatto su LCP/CLS dell'homepage
**Constraints**: `'use client'` solo per `Navbar.tsx`; pagine placeholder sono server components; nessuna libreria icone esterna
**Scale/Scope**: 1 componente, 1 file dati, 3 pagine placeholder, modifiche a layout.tsx e ContactSection.tsx

---

## Constitution Check

- [x] **I. Design Organico**: Navbar usa `rounded-full` per CTA, `border-bottom` sottile, DM Sans — nessun bordo vivo — PASS
- [x] **II. Conversion-First**: CTA "Prenota ora" nella navbar garantisce conversione da ogni pagina del sito — PASS (rafforza la constitution)
- [x] **III. Mobile-First**: Layout 375px prima: logo + hamburger; poi breakpoint md: link orizzontali — PASS
- [x] **IV. Performance**: Navbar è ~2KB client JS; `usePathname` è built-in Next.js; zero librerie aggiuntive — PASS
- [x] **V. GDPR**: Nessun dato personale, nessun tracker, nessun cookie — PASS
- [x] **VI. CMS-First**: Link di navigazione in `navigation.ts` — JUSTIFIED: la constitution esclude esplicitamente "layout strutturali" dal requisito CMS
- [x] **VII. YAGNI**: Solo il necessario — Navbar, data file, 3 pagine placeholder. Nessuna libreria di navigazione esterna — PASS

---

## Project Structure

### Documentation (this feature)

```text
specs/005-navigazione/
├── plan.md                      ← questo file
├── research.md                  ← 6 decisioni tecniche
├── data-model.md                ← NavLink entity, NavbarState
├── quickstart.md                ← 5 scenari di test
├── contracts/
│   └── navbar-component.md     ← contratto UI Navbar
└── tasks.md                     ← generato da /speckit-tasks
```

### Source Code

```text
src/
├── app/
│   ├── layout.tsx              ← MODIFY: aggiungere <Navbar />
│   ├── page.tsx                ← no modifiche dirette
│   ├── about/
│   │   └── page.tsx            ← NEW: Chi sono placeholder
│   ├── servizi/
│   │   └── page.tsx            ← NEW: Servizi placeholder
│   └── blog/
│       └── page.tsx            ← NEW: Blog placeholder (robots noindex)
├── components/
│   └── sections/
│       └── Navbar.tsx          ← NEW: client component (useState + usePathname)
├── sections/
│   └── ContactSection.tsx      ← MODIFY: aggiungere id="contatti" al wrapper section
└── data/
    └── navigation.ts           ← NEW: NAV_LINKS array + NavLink interface

tests/
└── smoke.spec.ts               ← MODIFY: aggiungere test navbar + pagine
```

---

## Implementation Phases

### Phase 1: Dati di navigazione (Foundational)

**Goal**: File dati pronto prima del componente.
**Tasks**: Creare `src/data/navigation.ts`

### Phase 2: US1 — Navbar desktop sticky

**Goal**: Navbar funzionante su desktop con link, active state e CTA.
**Tasks**: Creare `Navbar.tsx`, aggiungere a `layout.tsx`, aggiungere `id="contatti"` alla sezione contatti

### Phase 3: US2 — Menù hamburger mobile

**Goal**: Toggle hamburger/dropdown funzionante su 375px.
**Tasks**: Estendere `Navbar.tsx` con `useState`, hamburger SVG, dropdown, handler ESC + click esterno

### Phase 4: US3 — Pagine placeholder

**Goal**: `/about`, `/servizi`, `/blog` rispondono 200 con navbar e footer.
**Tasks**: Creare le 3 pagine statiche

### Phase 5: Polish & Qualità

**Tasks**: smoke tests, CLAUDE.md, build check, commit e push

---

## Complexity Tracking

Nessuna violazione constitution non giustificata.
