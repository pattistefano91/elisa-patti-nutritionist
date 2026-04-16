# Tasks: Pagina Chi sono

**Feature Branch**: `006-chi-sono`
**Input**: [spec.md](spec.md) · [plan.md](plan.md) · [data-model.md](data-model.md) · [contracts/](contracts/) · [research.md](research.md)
**Totale task**: 9 · **Paralleli**: 2 · **User Stories**: 3

---

## Phase 1: Setup — Data layer

**Purpose**: File dati pronto prima di qualsiasi componente.
**⚠️ BLOCCA US1, US2, US3** — completare prima di creare la pagina.

- [x] T001 Creare `src/data/about.ts` — definire interfacce `PhotoInfo { src: string; alt: string; width: number; height: number }`, `PhilosophyValue { icon: string; title: string; description: string }`, `Credential { year: string; title: string; institution: string }`, `AboutContent { bio: string; photo: PhotoInfo; philosophy: PhilosophyValue[]; credentials: Credential[] }`; esportare `ABOUT_CONTENT: AboutContent` con placeholder realistico: bio paragrafo, photo `elisa-patti-studio-1.jpg` (800×1000), 4 valori filosofia (🌿 Approccio personalizzato, 🔬 Basi scientifiche, ❤️ Ascolto e rispetto, 🌱 Nutrizione come stile di vita), 1 credenziale placeholder; NON duplicare i dati albo (vengono da `PROFESSIONAL` in `professional.ts`)

**Checkpoint**: `npx tsc --noEmit` pulito. I contenuti sono modificabili senza toccare il componente.

---

## Phase 2: User Story 3 — CTA Calendly (Priority: P3) — prerequisito tecnico

**Goal**: Client component per il bottone "Prenota ora" — deve esistere prima della pagina.
**⚠️ BLOCCA US3** — T003 (pagina) importa `AboutCTA`.

- [x] T002 Creare `src/components/sections/AboutCTA.tsx` — `'use client'`; importa `Button`, `Container` da `@/components/ui`; props: `interface AboutCTAProps { compact?: boolean }`; funzione `openCalendly`: `(window as any).Calendly?.initPopupWidget({ url: 'https://calendly.com/elisapatti' })`; se `compact=true` → renderizza solo `<Button variant="primary" size="lg" onClick={openCalendly}>Prenota ora</Button>` (nessun wrapper section); se `compact=false` (default) → struttura completa: `<section className="py-16 bg-surface-page">` con `Container`, heading `text-heading-3` "Vuoi iniziare il tuo percorso?", sottotitolo `text-body-lg text-neutral-600` "Prenota una consulenza gratuita e scopri il percorso nutrizionale su misura per te.", bottone `<Button variant="primary" size="lg" onClick={openCalendly}>Prenota ora</Button>`

**Checkpoint**: `npx tsc --noEmit` pulito. Il componente esiste e compila senza errori.

---

## Phase 3: User Story 1 — Hero split e biografia (Priority: P1) 🎯 MVP

**Goal**: Pagina `/about` con hero split foto+bio, sezione filosofia nutrizionale e metadata SEO.

**Independent Test**: Aprire `localhost:3000/about` su 1280px. Visibili: foto a sinistra (bordi arrotondati), nome + titolo + bio a destra. Su 375px: layout stacked. `<title>` = "Chi sono | Dott.ssa Elisa Patti". Sezione filosofia con 4 valori icona+titolo+descrizione.

- [x] T003 [US1] Riscrivere `src/app/about/page.tsx` — server component; `export const metadata: Metadata = { title: 'Chi sono | Dott.ssa Elisa Patti', description: 'Scopri il percorso professionale della Dott.ssa Elisa Patti...' }`; importa `ABOUT_CONTENT` da `@/data/about`; importa `PROFESSIONAL` da `@/data/professional`; importa `Container` da `@/components/ui`; importa `Image` da `next/image`; importa `AboutCTA` da `@/components/sections/AboutCTA`; **Sezione 1 — Hero split**: `<section className="py-16 md:py-24">`; grid `grid grid-cols-1 md:grid-cols-2 gap-12 items-center`; colonna sinistra: `<Image src={ABOUT_CONTENT.photo.src} alt={ABOUT_CONTENT.photo.alt} width={480} height={600} className="rounded-2xl object-cover w-full" priority />`; colonna destra: label `text-label uppercase text-primary-600`, `<h1 className="text-heading-2">{PROFESSIONAL.name}</h1>`, `<p className="text-body-lg text-neutral-600">{PROFESSIONAL.title}</p>`, bio `<p className="text-body-md text-neutral-600 mt-4">{ABOUT_CONTENT.bio}</p>`; CTA above-the-fold: `<div className="mt-8"><AboutCTA compact /></div>` — usa il componente già importato in modalità compatta (solo bottone, nessuna section wrapper); **Sezione 2 — Filosofia**: `<section className="py-16 bg-surface-warm">`; `<h2 className="text-heading-3">La mia filosofia</h2>`; `<ul className="flex flex-col gap-6 mt-8">`; per ogni valore: `<li className="flex gap-4">` con `<span className="text-2xl">{v.icon}</span>` + div `<p className="text-label font-semibold">{v.title}</p><p className="text-body-md text-neutral-600">{v.description}</p>`

**Checkpoint**: Aprire `localhost:3000/about` su 1280px e 375px. Hero split/stacked corretto. Filosofia visibile. User Story 1 MVP completa.

---

## Phase 4: User Story 2 — Formazione & Credenziali (Priority: P2)

**Goal**: Sezione formazione con lista credenziali e numero albo.

**Independent Test**: Scorrere `/about`. Sezione "Formazione" visibile con voce placeholder (anno, titolo, istituto). Numero albo "Sezione A n. 5404" presente in fondo alla sezione.

- [x] T004 [US2] Aggiungere sezione Formazione & Credenziali a `src/app/about/page.tsx` — dopo la sezione Filosofia; `<section className="py-16">`; `<h2 className="text-heading-3">Formazione</h2>`; `<ul className="flex flex-col gap-4 mt-8">`; per ogni credenziale: `<li className="flex gap-4">` con `<span className="text-label text-primary-600 font-semibold w-12 shrink-0">{c.year}</span>` + div `<p className="text-body-md font-semibold">{c.title}</p><p className="text-body-sm text-neutral-600">{c.institution}</p>`; separatore `<hr className="my-8 border-neutral-200">`; albo: `<p className="text-caption text-neutral-500">Iscritta all'<span className="font-medium">{PROFESSIONAL.alboOrder}</span> — {PROFESSIONAL.alboNumber}</p>`

**Checkpoint**: Sezione formazione visibile. Albo corretto. User Story 2 completa.

---

## Phase 5: User Story 3 — CTA "Prenota ora" (Priority: P3)

**Goal**: Blocco CTA in fondo alla pagina.

**Independent Test**: Scorrere fino in fondo a `/about`. Sezione CTA visibile con bottone "Prenota ora".

- [x] T005 [US3] Aggiungere `<AboutCTA />` a `src/app/about/page.tsx` — inserire dopo la sezione Formazione & Credenziali, come ultima sezione prima della chiusura di `<main>`

**Checkpoint**: Bottone "Prenota ora" visibile in fondo. Click apre widget Calendly. User Story 3 completa.

---

## Phase 6: Polish & Qualità

**Purpose**: Test aggiornati, documentazione, build finale.

- [x] T006 [P] Aggiornare `tests/smoke.spec.ts` — aggiungere test suite "Smoke — Pagina Chi sono": (1) `page.goto('/about')` + `expect(page).toHaveTitle(/Chi sono/)` — title corretto; (2) `page.locator('img[alt*="Elisa Patti"]').toBeVisible()` — foto visibile; (3) `page.getByRole('heading', { name: /Dott\.ssa Elisa Patti/ }).toBeVisible()` — nome visibile; (4) `page.getByText('La mia filosofia').toBeVisible()` — sezione filosofia; (5) `page.getByText('Formazione').toBeVisible()` — sezione credenziali; (6) `page.getByRole('button', { name: /Prenota ora/ }).toBeVisible()` — CTA presente

- [x] T007 [P] Aggiornare `CLAUDE.md` — aggiungere alla struttura `src/`: `src/data/about.ts` (AboutContent: bio, foto, filosofia, credenziali — placeholder realistico), `src/components/sections/AboutCTA.tsx` (CTA Calendly client component per pagina about)

- [x] T008 Verificare build pulita — eseguire `npx tsc --noEmit` (zero errori) e `npm run build`; verificare che `/about` compaia nell'output con dati corretti

- [ ] T009 Commit e push branch `006-chi-sono` — creare commit con tutti i file modificati; push su GitHub per deploy preview Vercel

---

## Dipendenze & Ordine di Esecuzione

### Dipendenze tra fasi

- **Phase 1 (Setup)**: nessuna dipendenza — inizia subito
- **Phase 2 (T002)**: dipende da Phase 1 (AboutCTA non usa about.ts ma deve esistere prima di T003)
- **Phase 3 (US1)**: dipende da Phase 1 + Phase 2 (T003 importa ABOUT_CONTENT e AboutCTA)
- **Phase 4 (US2)**: dipende da Phase 3 (aggiunge sezione allo stesso file)
- **Phase 5 (US3)**: dipende da Phase 2 + Phase 4 (aggiunge AboutCTA allo stesso file)
- **Phase 6 (Polish)**: dipende da tutte le fasi precedenti

### Dipendenze interne

- T001 → T002 sequenziale (AboutCTA potrebbe in futuro usare about.ts)
- T002 → T003 sequenziale (T003 importa AboutCTA)
- T003 → T004 sequenziale (stesso file, aggiunta sezione)
- T004 → T005 sequenziale (stesso file, aggiunta CTA)
- T006 [P] + T007 [P] — file diversi, in parallelo

### Opportunità di parallelismo

- T006, T007 (Phase 6) — file diversi, eseguibili in parallelo
- T002 e T001 potrebbero essere paralleli (file diversi) ma sequenziali per chiarezza

---

## Strategia di Implementazione

### MVP: Solo User Story 1

1. Phase 1: T001 (about.ts)
2. Phase 2: T002 (AboutCTA.tsx)
3. Phase 3: T003 (pagina about con hero + filosofia)
4. **STOP e VALIDA**: Hero split corretto? Layout mobile ok?
5. Se sì → aggiungere US2 e US3

### Consegna Incrementale

1. Setup (T001) → dati pronti
2. T002 → AboutCTA client component
3. US1 (T003) → hero + filosofia **→ MVP dimostrabile**
4. US2 (T004) → formazione e credenziali
5. US3 (T005) → CTA in fondo
6. Polish (T006–T009) → qualità, test, deploy
