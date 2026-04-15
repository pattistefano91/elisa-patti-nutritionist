# Tasks: Sezione Servizi

**Feature Branch**: `002-sezione-servizi`
**Input**: [spec.md](spec.md) · [plan.md](plan.md) · [data-model.md](data-model.md) · [contracts/](contracts/)
**Totale task**: 14 · **Paralleli**: 8 · **User Stories**: 3

---

## Phase 1: Setup — Infrastruttura condivisa

**Purpose**: Dati e script di terze parti pronti prima di qualsiasi componente.
**⚠️ BLOCCA tutte le user story** — completare prima di procedere.

- [x] T001 Creare `src/data/services.ts` — definire tipi `ServiceMode`, `Service`, `IncludedService`; esportare `SERVICES: Service[]` (4 voci con contenuti reali da sito.docx), `INCLUDED_SERVICES: IncludedService[]` (newsletter Nutrizione Pratica), `SERVICES_CTA_URL: string` (alias di `SERVICES[0].calendlyUrl`); URL Calendly placeholder `https://calendly.com/elisapatti/[servizio]`
- [x] T002 Aggiornare `src/app/layout.tsx` — aggiungere `<Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />` (next/script) e `<link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />` nell'`<head>`

**Checkpoint**: `npx tsc --noEmit` pulito. I 4 servizi con i contenuti della Dott.ssa sono nel codice.

---

## Phase 2: User Story 1 — Visitatore scopre i servizi e prenota (Priority: P1) 🎯 MVP

**Goal**: 4 card visibili sulla home, CTA di ciascuna apre il popup Calendly corretto.

**Independent Test**: Aprire `localhost:3000` su 375px e 1280px. Le 4 card devono essere visibili.
Cliccando "Prenota ora" su una card si apre il popup widget Calendly (o, se bloccato da ad-blocker,
si apre il link in nuova tab).

- [x] T003 [P] [US1] Creare `src/components/sections/ServicesSection.tsx` — scheletro del componente con: import `SERVICES`, `SERVICES_CTA_URL` da `@/data/services`; helper function `openCalendly(url: string)` (chiama `window.Calendly?.initPopupWidget({ url })` con fallback `window.open(url, '_blank')`); griglia `grid-cols-1 md:grid-cols-2 gap-6`; titolo sezione "I Percorsi" + sottotitolo; usa `Container` da `@/components/ui`
- [x] T004 [P] [US1] Aggiungere componente `ServiceCard` inline in `src/components/sections/ServicesSection.tsx` — usa `Card variant="default" shadow="md"`; mostra `service.name` (heading-4), `service.description` (body-md), `service.duration` (label); `<Button variant="primary" size="md">Prenota ora</Button>` che chiama `openCalendly(service.calendlyUrl)`; `aria-label` descrittivo per accessibilità
- [x] T005 [US1] Aggiungere `<ServicesSection />` in `src/app/page.tsx` — inserirlo subito dopo il blocco hero (`<main>`), separato da `<Divider />`

**Checkpoint**: Aprire `localhost:3000`. Dopo l'hero compaiono 4 card con nome e descrizione.
Cliccando "Prenota ora" si apre il popup Calendly o la nuova tab. User Story 1 è MVP completo.

---

## Phase 3: User Story 2 — Visitatore comprende le differenze (Priority: P2)

**Goal**: Ogni card mostra chiaramente modalità, badge "Gratuita" e bullets opzionali.

**Independent Test**: Mostrare la sezione a 3 persone — devono identificare senza spiegazioni
quale servizio è gratuito, quale è online e quale prevede pacchetti a lungo termine.

- [x] T006 [P] [US2] Aggiungere indicatore modalità in `ServiceCard` — mostrare `service.modeLabel` con icona testuale (📍 per "In studio", 💻 per "Online / Telefono") come `text-body-sm` sotto la durata; usa `style={{ color: 'var(--color-neutral-500)' }}`
- [x] T007 [P] [US2] Aggiungere rendering badge in `ServiceCard` — se `service.tag` è definito, mostrare `<Badge variant={service.tagVariant ?? 'neutral'}>` in cima alla card, sopra il nome; la card "Consulenza Gratuita" deve mostrare badge variant `accent` con testo "Gratuita"
- [x] T008 [US2] Aggiungere bullets opzionali in `ServiceCard` e aggiornare `src/data/services.ts` — se `service.bullets` è definito, mostrare lista `<ul>` con punti chiave (max 3 visibili); aggiornare `SERVICES[2]` (Visite di Controllo) con bullets: "Aggiornamento piano alimentare", "Monitoraggio progressi", "Percorsi a pacchetto 3 o 6 mesi"

**Checkpoint**: Le 4 card mostrano: modalità (icona + testo), badge "Gratuita" sulla consulenza,
lista punti per Visite di Controllo. Un utente esterno distingue i servizi senza spiegazioni.

---

## Phase 4: User Story 3 — CTA finale e banner newsletter (Priority: P3)

**Goal**: Banner newsletter e blocco CTA di recupero in fondo alla sezione.

**Independent Test**: Scorrere la sezione senza cliccare nessuna card. In fondo si devono vedere:
(1) il banner "Servizi Inclusi" con la newsletter, (2) il blocco "Non sai da dove iniziare?" con CTA.

- [x] T009 [US3] Aggiungere `IncludedServicesBanner` in `src/components/sections/ServicesSection.tsx` — sezione sotto la griglia con `Card variant="warm" shadow="sm"`; titolo "🎁 Servizi Inclusi"; voce newsletter "Nutrizione Pratica" con descrizione "Ogni mese riceverai un ricettario sano e semplice e una guida nutrizionale pratica"; badge "Gratuita" variant `primary`; usa `INCLUDED_SERVICES` da `@/data/services`
- [x] T010 [US3] Aggiungere `ServicesCtaBanner` in `src/components/sections/ServicesSection.tsx` — blocco finale con sfondo `var(--color-primary-50)`, testo heading-4 "Non sai da dove iniziare?", body-md "Prenota una consulenza gratuita e iniziamo insieme il tuo percorso", `<Button variant="primary" size="lg">Prenota consulenza gratuita</Button>` che chiama `openCalendly(SERVICES_CTA_URL)`, `rounded-2xl p-8 text-center`

**Checkpoint**: Scorrere la sezione fino in fondo. Visibili: banner newsletter warm, blocco CTA verde.
CTA finale apre lo stesso popup Calendly della consulenza gratuita.

---

## Phase 5: Polish & Accessibilità

**Purpose**: Qualità trasversale, test aggiornati, documentazione.

- [x] T011 [P] Verificare WCAG AA con axe — avviare `npm run dev`, aprire `localhost:3000`, eseguire `npx playwright test`; correggere eventuali violazioni di contrasto o accessibilità nella sezione servizi (cfr. fix già applicato in 001 per contrasto label)
- [x] T012 [P] Aggiornare `tests/smoke.spec.ts` — aggiungere test: (1) la sezione servizi è visibile (`page.getByText('I Percorsi').toBeVisible()`); (2) sono presenti 4 card con testo "Prenota ora"; (3) il banner "Non sai da dove iniziare?" è visibile in fondo
- [x] T013 [P] Aggiornare `CLAUDE.md` — aggiungere alla struttura `src/`: `src/data/services.ts` (array servizi, tipi, URL Calendly) e `src/components/sections/ServicesSection.tsx` (sezione servizi homepage)
- [x] T014 [P] Commit e push branch `002-sezione-servizi` — verificare che `npx tsc --noEmit` e `npm run build` passino; push su GitHub per deploy preview Vercel

---

## Phase 6: Feedback Dott.ssa — 2026-04-15

**Source**: `commenti sito.docx` — revisione Dott.ssa Patti dopo prima visualizzazione.

- [x] T015 Aggiornare `spec.md` — aggiungere sezione "Feedback Cliente", aggiornare FR-002 (no CTA su Visite di Controllo), FR-006 (newsletter prominente), Assumptions
- [x] T016 Rimuovere CTA "Prenota ora" da card "Visite di Controllo" — aggiungere `hideCta: boolean` a `Service` interface in `services.ts`; settare `hideCta: true` su `visite-controllo`; in `ServiceCard` mostrare nota "Disponibile dopo la prima visita" al posto del bottone
- [x] T017 Ridisegnare `IncludedServicesBanner` — sfondo `--color-primary-700` (verde scuro), testo bianco, icon 3xl, heading-3 "Incluso in ogni percorso", badge Accent "Gratis", card interna semi-trasparente; prominenza visiva equivalente alle service card
- [x] T018 Copiare foto Dott.ssa in `public/images/dottoressa/` — `elisa-patti-studio-1.jpg` (IMG_4828) e `elisa-patti-studio-2.jpg` (IMG_4833); pronte per uso in sezione about (003) e hero

---

## Dipendenze & Ordine di Esecuzione

### Dipendenze tra fasi

- **Phase 1 (Setup)**: nessuna dipendenza — inizia subito
- **Phase 2 (US1)**: dipende da Phase 1 completa — BLOCCA
- **Phase 3 (US2)**: dipende da Phase 2 (ServiceCard deve esistere per aggiungere badge/mode)
- **Phase 4 (US3)**: dipende da Phase 2 (ServicesSection deve esistere per aggiungere i banner)
- **Phase 5 (Polish)**: dipende da tutte le fasi precedenti

### Dipendenze interne

- **US1**: T003 [P] + T004 [P] in parallelo → T005 sequenziale
- **US2**: T006 [P] + T007 [P] in parallelo → T008 sequenziale (dipende da T006/T007 per layout)
- **US3**: T009 → T010 sequenziali (T010 posizionato dopo T009 nella sezione)
- **Polish**: T011 [P] + T012 [P] + T013 [P] + T014 [P] tutti in parallelo

### Opportunità di parallelismo

- T001 e T002 (Phase 1) — in parallelo
- T003 e T004 (Phase 2, US1) — in parallelo (file diversi / sezioni diverse del componente)
- T006 e T007 (Phase 3, US2) — in parallelo
- T011, T012, T013, T014 (Phase 5) — tutti in parallelo

---

## Strategia di Implementazione

### MVP: Solo User Story 1

1. Phase 1: T001 + T002 (setup dati e Calendly)
2. Phase 2: T003 + T004 in parallelo → T005
3. **STOP e VALIDA**: 4 card visibili, CTA Calendly funzionante?
4. Se sì → deploy preview Vercel per feedback Dott.ssa

### Consegna Incrementale

1. Setup (T001–T002) → dati e script pronti
2. US1 (T003–T005) → 4 card base + CTA **→ MVP dimostrabile**
3. US2 (T006–T008) → contenuto chiaro, badge, modalità
4. US3 (T009–T010) → newsletter + CTA finale
5. Polish (T011–T014) → qualità, test, deploy

### Note

- `[P]` = file diversi, nessuna dipendenza tra loro — eseguibili in parallelo
- T001 contiene i testi definitivi della Dott.ssa (da sito.docx) — aggiornare se cambiano
- URL Calendly sono placeholder fino a quando la Dott.ssa non li fornisce
- La feature non introduce nessun nuovo componente UI generico — usa solo il design system 001
