---
description: "Task list per 001-design-system"
---

# Tasks: Design System & Fondamenta Visiva

**Input**: Design documents da `specs/001-design-system/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅

**Tests**: Non richiesti esplicitamente nella spec. Incluso un solo smoke test E2E
(T033) per verificare che font, blob e CTA siano effettivamente visibili a runtime.

**Organizzazione**: Task raggruppati per user story per consentire implementazione
e validazione indipendente di ciascuna storia.

---

## Formato: `[ID] [P?] [Story?] Descrizione con file path`

- **[P]**: eseguibile in parallelo (file diversi, nessuna dipendenza in sospeso)
- **[Story]**: user story di riferimento (US1, US2, US3)
- Percorsi relativi alla root del repository

---

## Phase 1: Setup — Inizializzazione Progetto

**Purpose**: Creare la struttura base del progetto Next.js con tutte le dipendenze.
Nessuna user story può iniziare prima che questa fase sia completa.

- [x] T001 Inizializzare progetto Next.js 15 nella root del repo: `npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"` (sovrascrive solo i file generati, non specs/ né .specify/)
- [x] T002 [P] Installare dipendenze animazioni: `npm install framer-motion` — aggiorna `package.json`
- [x] T003 [P] Installare dipendenze UI primitives: `npm install @radix-ui/react-slot @radix-ui/react-avatar` — aggiorna `package.json`
- [x] T004 [P] Installare utility CSS: `npm install clsx tailwind-merge` — aggiorna `package.json`
- [x] T005 [P] Configurare TypeScript strict mode in `tsconfig.json`: impostare `"strict": true`, `"noUncheckedIndexedAccess": true`
- [x] T006 Verificare struttura directory creata: `src/app/`, `src/components/`, `src/lib/` esistenti; creare `src/components/ui/` e `src/components/shapes/` se assenti

**Checkpoint**: `npm run dev` avvia senza errori su `localhost:3000`. Build pulita con `npm run build`.

---

## Phase 2: Fondamenta — Token e Font (Prerequisiti Bloccanti)

**Purpose**: Implementare il layer dei design token e il caricamento font.
Nessuna user story può produrre output visivo coerente prima di questa fase.

**⚠️ CRITICO**: Nessun lavoro sulle user story prima del completamento di questa fase.

- [x] T007 Creare `src/lib/fonts.ts` — configurare `next/font/google` con Cormorant Garamond (subsets: `['latin']`, weight: `['300','500','600']`, display: `'swap'`) e DM Sans (subsets: `['latin']`, weight: `['300','400','500','700']`, variable: `'--font-body'`, display: `'swap'`); esportare `fontDisplay` e `fontBody`
- [x] T008 Aggiornare `src/app/layout.tsx` — importare `fontDisplay` e `fontBody` da `@/lib/fonts`; aggiungere variabili font alla classe `<html>`; impostare `lang="it"`; importare `./globals.css`; aggiungere metadata base (`title`, `description`, `lang`)
- [x] T009 Sostituire il contenuto di `src/app/globals.css` con: `@import "tailwindcss"`, poi blocco `@theme { }` con tutti i token da `specs/001-design-system/contracts/design-tokens.md` — colori (primary, secondary, accent, neutral, surface, semantic), tipografia (font-family, heading-1…6, body-lg/md/sm, caption, label come `@layer components`), spaziatura (spacing-1…32), raggi di bordo (radius-sm…full), ombre (shadow-sm/md/lg/glow), animazioni (duration-fast/normal/slow, ease-organic, ease-bounce-soft)
- [x] T010 Aggiungere in `src/app/globals.css` — regola `@media (prefers-reduced-motion: reduce)` che sovrascrive tutti i token `--duration-*` a `0ms` e `--ease-*` a `linear`
- [x] T011 Aggiungere in `src/app/globals.css` — stili base globali: `body { background: var(--color-surface-page); color: var(--color-neutral-900); font-family: var(--font-body); }`, `h1,h2,h3,h4 { font-family: var(--font-display); }`

**Checkpoint**: `npm run build` senza errori TypeScript. Font Cormorant Garamond e DM Sans visibili nel DOM ispezionando `<html>` in DevTools. Variabile `--color-primary-500` risolvibile in DevTools CSS.

---

## Phase 3: User Story 1 — Identità Visiva Riconoscibile (Priority: P1) 🎯 MVP

**Goal**: Un visitatore identifica correttamente il sito come "nutrizionista/salute"
entro 5 secondi. Palette organica, forme morbide e tipografia elegante presenti above the fold.

**Independent Test**: Aprire `localhost:3000` su viewport mobile (375px) e verificare
che la pagina mostri: titolo in Cormorant Garamond, almeno un blob organico, sfondo caldo
`#FAF9F7`, CTA in terracotta `#C45C38`. Screenshot da mostrare a 5 persone del target.

- [x] T012 [P] [US1] Creare `src/components/shapes/BlobHero.tsx` — componente React che renderizza SVG inline con path `M80,10 C120,0 190,40 190,90 C190,150 140,195 90,190 C40,185 5,150 10,90 C15,30 40,20 80,10Z`, viewBox `"0 0 200 200"`, prop `className` passata all'elemento `<svg>`, `aria-hidden="true"`
- [x] T013 [P] [US1] Creare `src/components/shapes/BlobFrame.tsx` — componente React SVG con path `M70,5 C110,-5 185,30 190,80 C195,130 160,190 100,190 C40,190 0,155 5,90 C10,25 30,15 70,5Z`, viewBox `"0 0 200 200"`, prop `className`, `aria-hidden="true"`
- [x] T014 [P] [US1] Creare `src/components/shapes/BlobSection.tsx` — componente React SVG con path `M60,15 C100,5 180,35 185,85 C190,135 150,185 95,185 C40,185 8,145 12,85 C16,25 20,25 60,15Z`, viewBox `"0 0 200 200"`, prop `className`, `aria-hidden="true"`
- [x] T015 [US1] Creare `src/components/ui/Button.tsx` — componente con props `variant` (`primary` | `secondary` | `ghost`), `size` (`sm` | `md` | `lg`), `loading` (`boolean`), `disabled` (`boolean`); usare `clsx` + `tailwind-merge` per classi condizionali; variant primary: `bg-accent-500 hover:bg-accent-600 text-white shadow-glow-hover rounded-full`; variant secondary: `bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 rounded-full`; variant ghost: `text-primary-600 hover:bg-primary-50 rounded-full`; stato loading mostra spinner inline e disabilita click
- [x] T016 [US1] Aggiornare `src/app/page.tsx` — creare hero section minimale che dimostri l'identità visiva: sfondo `bg-surface-page`, heading-1 in Cormorant Garamond con testo "Cura il tuo benessere con la nutrizione", `BlobHero` posizionato in assoluto come elemento decorativo, `Button` variant primary con testo "Prenota consulenza gratuita", colori da CSS token
- [x] T017 [US1] Verificare manualmente contrasto WCAG AA per le coppie critiche: `accent-500` (#C45C38) su `white` deve essere ≥ 4.5:1; `primary-500` (#5E8350) su `white` deve essere ≥ 4.5:1; documentare i ratio verificati come commento in `src/app/globals.css`

**Checkpoint**: Aprire `localhost:3000` su 375px. Visibile: titolo serif elegante, blob organico, sfondo caldo, pulsante terracotta arrotondato. Nessuna forma squadrata. User Story 1 è funzionalmente completa e indipendente.

---

## Phase 4: User Story 2 — Developer DX: Libreria Componenti (Priority: P2)

**Goal**: Lo sviluppatore costruisce qualsiasi nuova sezione usando solo i componenti
del design system in ≤ 30 minuti, senza decisioni soggettive su colori o spaziature.

**Independent Test**: Creare una Card di servizio da zero usando solo import da
`@/components/ui` e classi Tailwind dal design system, senza nessun valore hardcoded,
in meno di 30 minuti dall'apertura del file.

- [x] T018 [P] [US2] Creare `src/components/ui/Card.tsx` — componente con props `variant` (`default` | `muted` | `warm`), `shadow` (`sm` | `md` | `lg`); default: `bg-surface-card rounded-2xl shadow-md p-6`; muted: `bg-surface-muted`; warm: `bg-surface-warm`; accetta `className` e `children`
- [x] T019 [P] [US2] Creare `src/components/ui/Input.tsx` — componente input testo con props `label`, `error`, `disabled`; stati: default `border-neutral-300`, focus `border-primary-500 ring-2 ring-primary-100`, error `border-error`, disabled `opacity-50`; `rounded-lg`; usa `@radix-ui/react-slot` per forwarding ref
- [x] T020 [P] [US2] Creare `src/components/ui/Textarea.tsx` — analogo a Input ma per `<textarea>`; stessi stati e stile; auto-resize opzionale via `rows` prop
- [x] T021 [P] [US2] Creare `src/components/ui/Badge.tsx` — componente pill con props `variant` (`primary` | `secondary` | `accent` | `neutral`); sempre `rounded-full`; size unica; primary: `bg-primary-100 text-primary-700`; accent: `bg-accent-100 text-accent-700`
- [x] T022 [P] [US2] Creare `src/components/ui/Avatar.tsx` — componente con props `src`, `alt`, `size` (`sm` | `md` | `lg`); usa `@radix-ui/react-avatar` per fallback initials; forma: `rounded-full` (CSS) con effetto organico opzionale via `BlobFrame` come mask; fallback: initials su sfondo `primary-100`
- [x] T023 [P] [US2] Creare `src/components/ui/Divider.tsx` — linea divisoria con props `orientation` (`horizontal` | `vertical`), `variant` (`solid` | `dashed` | `decorative`); decorative usa gradiente da `secondary-200` a `transparent`
- [x] T024 [P] [US2] Creare `src/components/ui/Skeleton.tsx` — placeholder loading con props `width`, `height`, `variant` (`line` | `circle` | `card`); animazione pulse via Framer Motion; rispetta `prefers-reduced-motion` (no animazione se ridotta)
- [x] T025 [US2] Creare `src/components/ui/Container.tsx` — wrapper layout con `max-width: var(--container-max-width)` (1200px), `padding-inline: var(--container-padding-mobile)` su mobile e `var(--container-padding-desktop)` su desktop (media query `md:`), `margin-inline: auto`; props: `as` (tag HTML, default `div`), `className`, `children`; questo componente è prerequisito per tutte le feature di layout (002+)
- [x] T026 [US2] Creare `src/components/ui/index.ts` — barrel export di tutti i componenti: `Button`, `Card`, `Input`, `Textarea`, `Badge`, `Avatar`, `Divider`, `Skeleton`, `Container`
- [x] T027 [US2] Creare `src/components/shapes/index.ts` — barrel export: `BlobHero`, `BlobFrame`, `BlobSection`
- [x] T028 [US2] Aggiornare `specs/001-design-system/quickstart.md` — sostituire i percorsi di import con i percorsi reali verificati (`@/components/ui`, `@/components/shapes`); aggiungere esempio completo di Card servizio costruita con i componenti; aggiungere esempio di Container wrapping una sezione

**Checkpoint**: Costruire una `Card` con `Badge`, `Button` e un testo usando solo import da `@/components/ui` senza nessun valore hex o font inline. Tempo ≤ 30 minuti. User Story 2 completa e indipendente.

---

## Phase 5: User Story 3 — Approvazione Brand con Cliente (Priority: P3)

**Goal**: La Dott.ssa Patti approva palette, tipografia e forme al primo round di revisione
senza richiedere modifiche radicali.

**Independent Test**: Generare una pagina di anteprima visiva completa e condividerla
con la cliente (via Vercel preview URL o screenshot). La cliente esprime approvazione
senza richiedere cambio di colori o forme principali.

- [x] T029 [US3] Creare `docs/photography-guidelines.md` — linee guida fotografiche del design system: (1) mood fotografico atteso (luce naturale, sfondi neutri caldi, ambientazioni domestiche/naturali — no studi clinici bianchi); (2) trattamento colore (toni caldi, saturazione naturale, no filtri freddi o desaturati); (3) ratio immagini per contesto (hero: 16:9 o 4:3 landscape; avatar/profilo: 1:1; card servizio: 3:2); (4) esempi visivi do/don't descritti testualmente; (5) indicazioni per la Dott.ssa su come selezionare le foto da fornire
- [x] T030 [US3] Creare `src/app/brand-review/page.tsx` — pagina di preview non indicizzata (`export const metadata = { robots: 'noindex' }`) che mostra: l'intera palette cromatica come swatches con nome token e hex, la scala tipografica con testi di esempio in italiano, i 3 blob nelle loro dimensioni e colori tipici, tutti i componenti UI in tutti i loro stati e varianti, il Button CTA primario in contesto realistico
- [x] T031 [US3] Aggiungere a `src/app/brand-review/page.tsx` — sezione "Come appare above the fold" con un mockup del hero: blob-hero decorativo, heading-1 "Cura il tuo benessere con la nutrizione", sottotitolo body-lg, Button primary "Prenota consulenza gratuita", sfondo `surface-page`
- [ ] T032 [US3] Fare deploy su Vercel (preview branch `001-design-system`) e condividere URL `[preview].vercel.app/brand-review` con la Dott.ssa Patti per approvazione

**Checkpoint**: URL di preview condiviso. La Dott.ssa Patti approva la palette ("i colori mi rappresentano") e le forme ("le curve sono giuste"). Nessuna richiesta di cambio radicale. Se richieste modifiche: aggiornare i token in T009 e rigenerare il preview. User Story 3 completa quando approvazione ricevuta.

---

## Phase 6: Polish & Trasversali

**Purpose**: Qualità, accessibilità, pulizia post-approvazione.

- [x] T033 [P] Aggiungere `next-sitemap` al progetto: `npm install next-sitemap`; creare `next-sitemap.config.js`; escludere `/brand-review` dalla sitemap pubblica
- [x] T034 [P] Verificare con DevTools che `font-display: swap` sia applicato e che FOUT sia ≤ 100ms su connessione 3G simulata (Network throttling in Chrome DevTools)
- [x] T035 Creare `tests/smoke.spec.ts` con Playwright + axe: (1) installare `npm install --save-dev @axe-core/playwright`; (2) verificare font Cormorant Garamond caricato (`document.fonts.check('500 16px Cormorant Garamond')`); (3) verificare almeno un elemento con `data-testid="cta-primary"` visibile; (4) eseguire `checkA11y` di axe sull'intera pagina e assertire zero violazioni WCAG AA; (5) verificare `lang` dell'`<html>` è `"it"`
- [ ] T036 Rimuovere o nascondere `src/app/brand-review/page.tsx` dopo approvazione (spostare in route non pubblica o eliminare)
- [x] T037 [P] Aggiornare `CLAUDE.md` con la struttura `src/` reale post-implementazione (sostituire la struttura di placeholder con quella effettiva)

---

## Dipendenze & Ordine di Esecuzione

### Dipendenze tra fasi

- **Phase 1 (Setup)**: nessuna dipendenza — inizia subito
- **Phase 2 (Fondamenta)**: dipende da Phase 1 completa — **BLOCCA tutte le user story**
- **Phase 3 (US1 — Identità)**: dipende da Phase 2; può iniziare in parallelo con Phase 4/5 dopo Phase 2
- **Phase 4 (US2 — Components)**: dipende da Phase 2; indipendente da US1
- **Phase 5 (US3 — Brand)**: dipende da Phase 3 (serve la pagina hero per il preview) e Phase 4 (serve la libreria componenti per la pagina di revisione)
- **Phase 6 (Polish)**: dipende da Phase 3, 4, 5 complete

### Dipendenze interne alle User Story

- **US1**: T012, T013, T014 [P] → T015 → T016 → T017
- **US2**: T018–T024 [P] → T025 → T026, T027 → T028
- **US3**: T029 → T030 → T031 → T032; richiede US1 e US2 complete

### Opportunità di parallelismo

- T002, T003, T004, T005 (Setup) — tutti in parallelo
- T007 → T008 — sequenziale (fonts.ts prima di layout.tsx)
- T012, T013, T014 (Blob SVG) — tutti in parallelo
- T018, T019, T020, T021, T022, T023, T024 (Componenti UI) — tutti in parallelo
- T033, T034, T037 (Polish) — in parallelo

---

## Strategia di Implementazione

### MVP: Solo User Story 1 (Identità Visiva)

1. Completa Phase 1: Setup (T001–T006)
2. Completa Phase 2: Fondamenta (T007–T011) ← **CRITICO, blocca tutto**
3. Completa Phase 3: User Story 1 (T012–T017)
4. **STOP e VALIDA**: la pagina trasmette identità visiva organica e caldo? CTA terracotta visibile?
5. Condividi screenshot come proof of concept con la Dott.ssa

### Consegna Incrementale

1. Setup + Fondamenta → token e font pronti
2. US1 → hero page con identità visiva → **MVP dimostrabile**
3. US2 → libreria componenti completa → developer-ready per features 002+
4. US3 → pagina revisione → approvazione cliente → **palette locked in**
5. Polish → qualità, smoke test, sitemap

### Note

- `[P]` = file diversi, nessuna dipendenza — eseguibili in parallelo
- Ogni fase è testabile indipendentemente prima di passare alla successiva
- Non avanzare oltre Phase 2 senza `npm run build` pulito
- La palette è in stato **PROPOSED** fino all'approvazione US3 (T032)
- Non fare merge su `main` prima dell'approvazione palette
- T025 (Container) è prerequisito silenzioso per tutte le feature 002+ — non saltarlo
- Le linee guida fotografiche (T029) vanno condivise con la Dott.ssa insieme alla brand review
