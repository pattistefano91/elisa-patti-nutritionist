# Implementation Plan: Deploy Produzione

**Branch**: `004-deploy-produzione` | **Date**: 2026-04-15 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `specs/004-deploy-produzione/spec.md`

---

## Summary

Deploy del sito su Vercel con configurazione infrastruttura completa: merge branch su `main`, variabile `SITE_URL` per dominio configurabile senza modificare il codice, Plausible Analytics GDPR-compliant, footer legale con dati professionali, pagine Privacy/Cookie Policy in italiano, e verifica performance Core Web Vitals.

---

## Technical Context

**Language/Version**: TypeScript 5+ strict + noUncheckedIndexedAccess, Node.js 20 LTS  
**Primary Dependencies**: Next.js 15 App Router, next-sitemap, next/script (Plausible), Tailwind CSS v4  
**Storage**: N/A — sito statico, nessun database  
**Testing**: Playwright + @axe-core/playwright (già configurati)  
**Target Platform**: Vercel (Node.js 20, Edge Network)  
**Project Type**: Web application (Next.js SSG/SSR, single-page marketing site)  
**Performance Goals**: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms, Lighthouse Performance ≥ 90 (mobile)  
**Constraints**: Build non deve fallire se `SITE_URL` assente; GDPR-compliant senza cookie banner  
**Scale/Scope**: Sito single-page a basso traffico iniziale; unica pagina pubblica + 2 pagine legali

---

## Constitution Check

*GATE: Must pass before implementation.*

- [x] **I. Design Organico**: Footer usa design system 001 (border-radius organici, colori palette, DM Sans) — PASS
- [x] **II. Conversion-First**: Footer è in fondo alla pagina, non compete visivamente con CTA hero above the fold — PASS
- [x] **III. Mobile-First**: Footer responsive, layout mobile-first a colonna singola su 375px — PASS
- [x] **IV. Performance**: next-sitemap è build-time (zero runtime), Plausible è ~1KB script `afterInteractive` — PASS
- [x] **V. GDPR**: Footer con link Privacy Policy + Cookie Policy; Plausible senza cookie; Calendly on-demand — questa feature IMPLEMENTA la compliance GDPR richiesta
- [x] **VI. CMS-First**: Pagine legali statiche — VIOLATION JUSTIFIED (vedi Complexity Tracking)
- [x] **VII. YAGNI**: solo Footer, Plausible, sitemap, pagine legali — nessuna astrazione non necessaria — PASS

---

## Project Structure

### Documentation (this feature)

```text
specs/004-deploy-produzione/
├── plan.md           ← questo file
├── research.md       ← decisioni tecniche (env vars, Plausible, sitemap, footer)
├── data-model.md     ← ProfessionalInfo entity, env vars contract
├── quickstart.md     ← 4 scenari di test (deploy, Plausible, dominio, performance)
├── contracts/
│   └── env-vars.md   ← contratto SITE_URL + NEXT_PUBLIC_PLAUSIBLE_DOMAIN
└── tasks.md          ← generato da /speckit-tasks
```

### Source Code

```text
src/
├── app/
│   ├── layout.tsx              ← MODIFY: aggiungere <Footer />, Script Plausible
│   ├── privacy/
│   │   └── page.tsx            ← NEW: Privacy Policy (boilerplate italiano GDPR)
│   └── cookie-policy/
│       └── page.tsx            ← NEW: Cookie Policy (solo cookie tecnici)
├── components/
│   └── sections/
│       └── Footer.tsx          ← NEW: Footer server component
└── data/
    └── professional.ts         ← NEW: ProfessionalInfo (nome, titolo, albo placeholder)

next-sitemap.config.js          ← VERIFY: SITE_URL fallback già configurato?
.env.example                    ← NEW/UPDATE: SITE_URL + NEXT_PUBLIC_PLAUSIBLE_DOMAIN
tests/
└── smoke.spec.ts               ← MODIFY: aggiungere test footer + sitemap
```

---

## Implementation Phases

### Phase 1: Infrastruttura & Configurazione (US1 — P1)

**Goal**: `main` aggiornato, env vars documentate, next-sitemap funzionante con SITE_URL

**Tasks**:
1. Creare/aggiornare `.env.example` con `SITE_URL` e `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
2. Verificare/aggiornare `next-sitemap.config.js` — `siteUrl: process.env.SITE_URL || 'http://localhost:3000'`
3. Verificare che `/brand-review` sia esclusa da sitemap e bloccata in robots.txt
4. Merge di `002-sezione-servizi` (con feature 003 già integrata) su `main` via PR

### Phase 2: Footer Legale (US3 — P3)

**Goal**: Footer visibile su tutte le pagine con dati professionali e link legali

**Tasks**:
1. Creare `src/data/professional.ts` — `ProfessionalInfo` con placeholder albo
2. Creare `src/components/sections/Footer.tsx` — server component, design system 001
3. Aggiungere `<Footer />` in `src/app/layout.tsx`
4. Creare `src/app/privacy/page.tsx` — boilerplate italiano GDPR
5. Creare `src/app/cookie-policy/page.tsx` — boilerplate italiano cookie tecnici

### Phase 3: Plausible Analytics (US2 — P2)

**Goal**: Script Plausible iniettato condizionalmente, GDPR-compliant

**Tasks**:
1. Aggiungere `<Script>` Plausible in `src/app/layout.tsx` — condizionale su `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
2. Verificare: nessun cookie impostato, script non blocca LCP

### Phase 4: Polish & Verifica (US4 — P4)

**Goal**: Test aggiornati, build pulito, performance verificate

**Tasks**:
1. Aggiornare `tests/smoke.spec.ts` — test footer, sitemap, pagine legali
2. Aggiornare `CLAUDE.md` — nuovi file aggiunti
3. Verifica `npm run build` pulita
4. Commit e push branch
5. PageSpeed Insights check (manuale, post-deploy)

---

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| VI. CMS-First — pagine legali statiche | Il contenuto legale è redatto da un legale, non dalla Dott.ssa in autonomia; raramente aggiornato | Sanity per 2 pagine legali è over-engineering (costo setup vs frequenza aggiornamento); il placeholder viene sostituito via PR una tantum |
