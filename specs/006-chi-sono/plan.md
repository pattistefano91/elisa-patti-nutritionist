# Implementation Plan: Pagina Chi sono

**Branch**: `006-chi-sono` | **Date**: 2026-04-16 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/006-chi-sono/spec.md`

---

## Summary

Sostituire il placeholder `src/app/about/page.tsx` con una pagina "Chi sono" completa per la Dott.ssa Elisa Patti. La pagina ha 4 sezioni in sequenza: hero split (foto + bio), filosofia nutrizionale (lista valori), formazione & credenziali (lista + albo), CTA Calendly. I contenuti sono gestiti da `src/data/about.ts` (nuovo file dati, pattern coerente con il progetto); i testi placeholder vengono sostituiti dalla Dott.ssa senza toccare il componente.

---

## Technical Context

**Language/Version**: TypeScript 5+ strict + noUncheckedIndexedAccess
**Primary Dependencies**: Next.js 15 App Router, Tailwind CSS v4, next/image
**Storage**: N/A — dati statici in `src/data/about.ts`
**Testing**: Playwright smoke tests
**Target Platform**: Web, SSG (static export), Vercel
**Project Type**: Web application — pagina statica server component
**Performance Goals**: LCP ≤ 2.5s (next/image preload hero photo), CLS ≤ 0.1
**Constraints**: Nessuna dipendenza aggiuntiva (YAGNI)
**Scale/Scope**: Singola pagina

---

## Constitution Check

- [x] **I. Design Organico**: foto con `rounded-2xl`, nessun bordo vivo; layout morbido con spaziature generose
- [x] **II. Conversion-First**: CTA "Prenota ora" in fondo alla pagina (CTA secondaria, non compete con homepage); Calendly popup
- [x] **III. Mobile-First**: layout stacked su 375px (`grid-cols-1`), split su desktop (`md:grid-cols-2`)
- [x] **IV. Performance**: `next/image` con priority su hero photo (LCP candidate); nessuna dipendenza pesante
- [x] **V. GDPR**: nessun cookie nuovo, nessun tracciatore; Calendly popup già presente in layout
- [x] **VI. CMS-First**: ⚠️ DEVIAZIONE GIUSTIFICATA — `src/data/about.ts` come bridge; struttura tipi speculare a futura integrazione Sanity; migrazione = sostituzione import senza modificare componenti
- [x] **VII. YAGNI**: nessun nuovo componente UI, nessuna dipendenza aggiuntiva; riuso di `Container`, `Button` esistenti

---

## Project Structure

```text
src/
├── app/
│   └── about/
│       └── page.tsx        ← MODIFICA: sostituisce placeholder con pagina completa
├── data/
│   ├── about.ts            ← NUOVO: AboutContent, ABOUT_CONTENT placeholder
│   ├── contact.ts          ← invariato
│   ├── navigation.ts       ← invariato
│   ├── professional.ts     ← invariato (albo riutilizzato via import)
│   └── services.ts         ← invariato
└── components/
    └── sections/
        └── AboutCTA.tsx    ← NUOVO (client component): bottone "Prenota ora" con Calendly
```

**Structure Decision**: Singolo progetto Next.js. La pagina `about/page.tsx` è un server component. Il solo bottone Calendly richiede `'use client'` → estratto come `AboutCTA.tsx` per mantenere il resto della pagina server-rendered (performance ottimale).

---

## Complexity Tracking

| Deviazione | Perché necessaria | Alternativa scartata |
|-----------|-------------------|----------------------|
| Principio VI — `src/data/about.ts` invece di Sanity | Sanity non è ancora integrato; è una feature futura separata | Attendere Sanity → ritarda inutilmente; hardcoded nel componente → viola separazione dati/UI |

---

## Fasi di implementazione

### Phase 1: Data layer

1. Creare `src/data/about.ts` con tipi `AboutContent`, `PhilosophyValue`, `Credential`, `PhotoInfo` e costante `ABOUT_CONTENT` con placeholder realistico
2. Riutilizzare `PROFESSIONAL` da `professional.ts` per i dati albo (no duplicazione)

### Phase 2: Client component CTA

3. Creare `src/components/sections/AboutCTA.tsx` — `'use client'`; `Button variant="primary"` che chiama `(window as any).Calendly?.initPopupWidget`

### Phase 3: Pagina about

4. Riscrivere `src/app/about/page.tsx` — server component; importa `ABOUT_CONTENT`, `PROFESSIONAL`, `AboutCTA`; 4 sezioni: hero split, filosofia, credenziali, CTA

### Phase 4: Test e qualità

5. Aggiornare `tests/smoke.spec.ts` — verificare `<title>`, foto visibile, sezione credenziali, CTA presente
6. Aggiornare `CLAUDE.md` — aggiungere `about.ts` e `AboutCTA.tsx`
7. Verifica build pulita — `tsc --noEmit` + `npm run build`
8. Commit e push branch `006-chi-sono`
