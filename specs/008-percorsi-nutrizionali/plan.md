# Implementation Plan: Pagina Percorsi Nutrizionali

**Branch**: `015-percorsi-nutrizionali` | **Date**: 2026-04-28 | **Spec**: [spec.md](spec.md)

---

## Summary

Sostituire la pagina placeholder `/servizi` con una pagina `/percorsi` accattivante e data-driven. La pagina ha un hero con due CTA (Calendly + scroll), una griglia responsive di card percorso con colore accent distinto per ciascuna, e un file dati strutturato (`src/data/percorsi.ts`) che permette di aggiungere/modificare percorsi senza toccare i componenti. Redirect permanente da `/servizi` a `/percorsi`. Navigazione aggiornata.

---

## Technical Context

**Language/Version**: TypeScript 5+ strict + noUncheckedIndexedAccess, Node.js 20 LTS
**Primary Dependencies**: Next.js 15 App Router, Tailwind CSS v4, Framer Motion 11
**Storage**: N/A — dati statici in `src/data/percorsi.ts`
**Testing**: nessun test automatico (componente visivo/statico)
**Target Platform**: Web — Vercel, mobile-first (375px → 768px → 1280px)
**Performance Goals**: LCP ≤ 2.5s, Lighthouse ≥ 90 (nessuna risorsa esterna aggiuntiva)
**Constraints**: Zero dipendenze npm nuove, coerenza con design system 001

---

## Constitution Check

- [x] **I. Design Organico** — card `rounded-2xl`, hero con forme morbide, nessun bordo vivo
- [x] **II. Conversion-First** — CTA "Prenota ora" above the fold nel hero; ogni card ha propria CTA
- [x] **III. Mobile-First** — griglia 1col (375px) → 2col (768px) → 3col (1280px)
- [x] **IV. Performance** — dati statici, nessuna immagine esterna, nessuna dipendenza aggiuntiva
- [x] **V. GDPR** — nessun tracker, nessun cookie di terze parti
- [~] **VI. CMS-First** — deferimento documentato: Sanity non ancora implementato nel progetto; dati in file statico coerente con tutte le feature precedenti
- [x] **VII. YAGNI** — nessuna astrazione oltre il necessario

---

## Project Structure

### Documentation (this feature)

```text
specs/008-percorsi-nutrizionali/
├── plan.md          ← questo file
├── research.md      ← 4 decisioni architetturali
├── data-model.md    ← PercorsoNutrizionale, ColoreAccent, dati iniziali
├── quickstart.md    ← 7 scenari di test
└── tasks.md         ← generato da /speckit.tasks
```

### Source Code

```text
src/
├── app/
│   ├── percorsi/
│   │   └── page.tsx                ← NUOVO — Server Component, importa PERCORSI
│   └── servizi/
│       └── page.tsx                ← RIMOSSO — sostituito da redirect next.config.ts
├── components/
│   └── sections/
│       └── PercorsiHeroCTA.tsx     ← NUOVO — 'use client', bottone Calendly + anchor scroll
└── data/
    └── percorsi.ts                 ← NUOVO — PercorsoNutrizionale, ColoreAccent, PERCORSI[]

next.config.ts                      ← MODIFICATO — redirect /servizi → /percorsi (permanent)
src/data/navigation.ts              ← MODIFICATO — label "Percorsi", href "/percorsi"
```

---

## Phase 0: Research

*Completato — vedi [research.md](research.md)*

| Decisione | Scelta |
|-----------|--------|
| Server vs Client Component | Server Component pagina + Client Component isolato per Calendly |
| Redirect `/servizi` | `next.config.ts` redirect array, permanent: true |
| Colori accent card | Token semantici `'primary' \| 'secondary' \| 'accent'` nel dato |
| Scroll "Scopri i percorsi" | Anchor HTML + `scroll-behavior: smooth` (già in globals.css) |

---

## Phase 1: Design & Contracts

### Data Model

*Vedi [data-model.md](data-model.md) per il tipo completo e i dati iniziali.*

```typescript
// src/data/percorsi.ts
type ColoreAccent = 'primary' | 'secondary' | 'accent'

interface PercorsoNutrizionale {
  id: string
  nome: string
  destinatari: string
  obiettivo: string
  benefici: string[]
  coloreAccent: ColoreAccent
}

export const PERCORSI: PercorsoNutrizionale[] = [ /* 3 percorsi iniziali */ ]
```

### Layout Pagina

```
/percorsi
├── Hero Section (above the fold)
│   ├── Badge label "Percorsi Nutrizionali"
│   ├── H1 titolo principale
│   ├── Sottotitolo motivazionale
│   └── PercorsiHeroCTA (Client): [Prenota ora] [Scopri i percorsi ↓]
│
└── Griglia Percorsi (id="percorsi")
    ├── Titolo sezione
    └── Grid responsive 1→2→3 col
        └── PercorsoCard × N
            ├── Header colorato (coloreAccent)
            ├── Nome percorso (H2)
            ├── "Per chi è" + destinatari
            ├── "Obiettivo" + testo obiettivo
            ├── "Cosa otterrai" + lista benefici
            └── CTA "Prenota consulenza gratuita" (Calendly)
```

### Componente `PercorsiHeroCTA`

```typescript
// 'use client'
// Due elementi: button onClick Calendly + anchor href="#percorsi"
// Stesso pattern di HeroCTA.tsx già esistente
```

### Nessun contratto API esterno

La pagina è interamente statica. L'unica integrazione esterna è Calendly (già configurato nel progetto via script in layout.tsx).

---

## Complexity Tracking

| Elemento | Nota |
|----------|------|
| Principio VI (CMS-First) | Sanity non implementato nel progetto. Tutti i contenuti del sito usano file statici in `src/data/`. Questo è il pattern consolidato. La migrazione a Sanity è una feature futura separata. |

---

## Next Step

Eseguire `/speckit.tasks` per generare `tasks.md` con i task atomici di implementazione.
