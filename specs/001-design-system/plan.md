# Implementation Plan: Design System & Fondamenta Visiva

**Branch**: `001-design-system` | **Date**: 2026-04-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification da `specs/001-design-system/spec.md`

---

## Summary

Implementare il design system completo del sito della Dott.ssa Elisa Patti: token CSS
(colori, tipografia, spaziatura, forme organiche, ombre, animazioni) tramite la direttiva
`@theme` di Tailwind CSS v4, font self-hosted via `next/font/google` (Cormorant Garamond +
DM Sans), 3 blob SVG come componenti React, 8 componenti UI base, e documentazione
consultabile. La palette "Naturalis" (Verde Salvia + Sabbia Calda + Terracotta) richiede
approvazione esplicita dalla Dott.ssa Patti prima del deploy.

---

## Technical Context

**Language/Version**: TypeScript 5.4+ / Node.js 20 LTS
**Primary Dependencies**: Next.js 15 (App Router), Tailwind CSS v4, Framer Motion 11, Radix UI Primitives
**Storage**: N/A — nessun dato persistito in questa feature
**Testing**: Playwright (E2E smoke test su componenti chiave); nessun unit test richiesto per UI puri
**Target Platform**: Web (Vercel, SSR + SSG via Next.js)
**Project Type**: Web application — frontend only per questa feature
**Performance Goals**: Font FOUT ≤ 100ms (font-display: swap), zero layout shift da font (CLS = 0)
**Constraints**: Browser target: Chrome/Firefox/Edge last 2 + Safari 16+; `lang="it"` charset Latin
**Scale/Scope**: ~15 componenti/file da creare; design system stabile per ~6 feature successive

---

## Constitution Check

*GATE: verificato prima di Phase 0. Ri-verificato dopo Phase 1.*

- [x] **I. Design Organico**: tutti i componenti usano radius-md o superiore; 3 blob SVG organici definiti; zero border-radius: 0
- [x] **II. Conversion-First**: Button `variant="primary"` è il componente CTA; accent-500 (terracotta) è il colore esclusivo dei primary button — nessun altro elemento usa accent-500
- [x] **III. Mobile-First**: token layout con `--container-padding-mobile` come base; componenti progettati da 375px
- [x] **IV. Performance**: `next/font/google` (font serviti da Vercel, no CDN esterno); blob in SVG inline (0 HTTP requests); Tailwind v4 purge automatico
- [x] **V. GDPR**: nessuna dipendenza esterna a runtime (niente Google Fonts CDN, niente tracciatori); font scaricati a build-time
- [x] **VI. CMS-First**: N/A per questa feature (nessun contenuto gestito da CMS nel design system)
- [x] **VII. YAGNI**: dark mode esclusa (Assumptions), Storybook escluso, Style Dictionary escluso

**Esito**: ✅ Tutti i gate superati. Nessuna violazione.

---

## Project Structure

### Documentazione (questa feature)

```text
specs/001-design-system/
├── spec.md                      ← specifica funzionale
├── plan.md                      ← questo file
├── research.md                  ← decisioni tecnologiche
├── data-model.md                ← struttura entità token
├── quickstart.md                ← guida utilizzo
├── contracts/
│   └── design-tokens.md         ← tutti i valori token definitivi
├── checklists/
│   └── requirements.md          ← quality checklist
└── tasks.md                     ← generato da /speckit-tasks (non ancora)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── globals.css              ← @import "tailwindcss" + @theme { ... }
│   └── layout.tsx               ← next/font/google config + html lang="it"
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Divider.tsx
│   │   └── Skeleton.tsx
│   └── shapes/
│       ├── BlobHero.tsx
│       ├── BlobFrame.tsx
│       └── BlobSection.tsx
└── lib/
    └── fonts.ts                 ← esporta fontDisplay e fontBody per layout.tsx
```

**Structure Decision**: Web application (Next.js App Router). Nessun backend in questa
feature. La struttura `src/` è la root del codice. I componenti UI sono in `components/ui/`
per chiarezza di scope; le forme organiche in `components/shapes/` per separazione semantica.

---

## Phase 0: Research — Completata

Vedi [research.md](./research.md). Decisioni chiuse:

| Decisione | Scelta |
|-----------|--------|
| Token system | Tailwind v4 `@theme` in globals.css |
| Font loading | `next/font/google` (Cormorant Garamond + DM Sans) |
| Blob implementation | SVG inline come componenti React |
| Palette | "Naturalis" — Verde Salvia + Sabbia Calda + Terracotta |
| Browser fallback | `@supports` + fallback hex nei token |

---

## Phase 1: Design & Contracts — Completata

Vedi [data-model.md](./data-model.md), [contracts/design-tokens.md](./contracts/design-tokens.md), [quickstart.md](./quickstart.md).

### Ordine implementazione suggerito

1. **Inizializzare Next.js 15**: `npx create-next-app@latest` con TypeScript, Tailwind, App Router
2. **globals.css**: aggiungere `@theme` con tutti i token da `contracts/design-tokens.md`
3. **layout.tsx**: configurare `next/font/google`, `lang="it"`, applicare variabili font
4. **BlobHero / BlobFrame / BlobSection**: 3 componenti SVG con prop `className`
5. **Button**: componente con varianti primary/secondary/ghost, size sm/md/lg, stato loading
6. **Card, Input, Textarea**: componenti form e contenuto con tutti gli stati
7. **Badge, Avatar, Divider, Skeleton**: componenti utility
8. **Smoke test Playwright**: verifica contrasto WCAG su Button primary, render blob, font caricati
9. **Approvazione palette con Dott.ssa Patti**: mostrare screenshot/storyboard prima del merge

### Dipendenze NPM da installare

```bash
# Core
npx create-next-app@latest . --typescript --tailwind --app --src-dir

# Animazioni
npm install framer-motion

# Accessibilità UI primitives
npm install @radix-ui/react-slot @radix-ui/react-avatar

# Utility
npm install clsx tailwind-merge
```

---

## Complexity Tracking

> Nessuna violazione della constitution rilevata. Sezione non applicabile.
