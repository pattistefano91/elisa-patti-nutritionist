# Tasks: Navigazione

**Feature Branch**: `005-navigazione`
**Input**: [spec.md](spec.md) · [plan.md](plan.md) · [data-model.md](data-model.md) · [contracts/](contracts/) · [research.md](research.md)
**Totale task**: 12 · **Paralleli**: 5 · **User Stories**: 3

---

## Phase 1: Setup — Dati di navigazione

**Purpose**: File dati pronto prima di qualsiasi componente.
**⚠️ BLOCCA US1** — completare prima di creare Navbar.tsx.

- [x] T001 Creare `src/data/navigation.ts` — definire `interface NavLink { label: string; href: string; isExternal?: boolean }`; esportare `NAV_LINKS: NavLink[]` con 4 voci: `{ label: 'Chi sono', href: '/about' }`, `{ label: 'Servizi', href: '/servizi' }`, `{ label: 'Blog', href: '/blog' }`, `{ label: 'Contatti', href: '/#contatti' }`; convenzione identica a `src/data/contact.ts`

**Checkpoint**: `npx tsc --noEmit` pulito. Le voci sono modificabili senza toccare il componente.

---

## Phase 2: User Story 1 — Navbar desktop sticky (Priority: P1) 🎯 MVP

**Goal**: Navbar con logo, link orizzontali, active state e CTA visibile su desktop.

**Independent Test**: Aprire `localhost:3000` su 1280px. Navbar visibile in cima con logo, 4 link e bottone "Prenota ora". Scorrere la pagina: navbar rimane fissa. Cliccare "Chi sono": navigazione a `/about` e link evidenziato.

- [x] T002 [US1] Creare `src/components/sections/Navbar.tsx` — client component (`'use client'`); import `usePathname` da `next/navigation`; import `NAV_LINKS` da `@/data/navigation`; import `Button`, `Container` da `@/components/ui`; import `Link` da `next/link`; struttura: `<nav aria-label="Navigazione principale">` sticky `top-0 z-50 bg-surface-page border-b border-neutral-200`; layout desktop `hidden md:flex items-center justify-between` con: sinistra logo `<Link href="/">` testo "Dott.ssa Elisa Patti" in `font-display text-heading-5`; centro/destra lista link `NAV_LINKS.map(link => <Link>)` con active state `pathname === link.href` → `text-primary-600 font-semibold` altrimenti `text-neutral-600 hover:text-primary-600`; estrema destra `<Button variant="primary" size="sm">Prenota ora</Button>` che chiama `window.Calendly?.initPopupWidget`; accessibilità: `aria-current="page"` sul link attivo

- [x] T003 [US1] Modificare `src/app/layout.tsx` — aggiungere `import Navbar from '@/components/sections/Navbar'`; inserire `<Navbar />` come primo figlio di `<body>`, prima di `{children}`

- [x] T004 [US1] Modificare `src/components/sections/ContactSection.tsx` ← già presente id="contatti" — aggiungere `id="contatti"` all'elemento `<section>` o wrapper esterno della sezione, per abilitare il deep-link `/#contatti` dalla navbar

**Checkpoint**: Aprire `localhost:3000` su 1280px. Navbar sticky con logo, link e CTA. Navigare a `/about` (404 per ora) e tornare: link "Chi sono" è evidenziato su `/about`. User Story 1 MVP completa.

---

## Phase 3: User Story 2 — Menù hamburger mobile (Priority: P2)

**Goal**: Toggle hamburger/dropdown funzionante su 375px con chiusura su link, ESC e click esterno.

**Independent Test**: Aprire `localhost:3000` su 375px. Link desktop non visibili; hamburger visibile. Toccare: dropdown si apre con link in colonna. Toccare un link: dropdown si chiude. Premere ESC: dropdown si chiude. Toccare fuori: dropdown si chiude.

- [x] T005 [US2] Estendere `src/components/sections/Navbar.tsx` ← hamburger incluso in T002 — aggiungere `useState<boolean>(false)` per `isOpen`; aggiungere layout mobile `flex md:hidden items-center justify-between` con hamburger button `aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? 'Chiudi menù' : 'Apri menù'}`; SVG hamburger (3 linee, 24px) quando `!isOpen`, SVG X quando `isOpen`; dropdown `id="mobile-menu"` condizionale `{isOpen && ...}`: `absolute top-full left-0 right-0 bg-surface-page border-b border-neutral-200 shadow-md`; lista link verticale `flex flex-col py-4` con stessi stili active state del desktop; CTA "Prenota ora" in fondo al dropdown; `useEffect` per handler ESC: `document.addEventListener('keydown', handler)` con `if (e.key === 'Escape') setIsOpen(false)`; `useRef` + listener `mousedown` per chiusura click esterno (o overlay `fixed inset-0 z-40` dietro il dropdown che su click setta `isOpen(false)`); `onClick` su ogni link: `setIsOpen(false)`

**Checkpoint**: Su 375px hamburger funziona. Dropdown si apre/chiude correttamente con tutti e 3 i trigger. Body non scrolla durante apertura (non necessario per dropdown non full-screen). User Story 2 completa.

---

## Phase 4: User Story 3 — Pagine placeholder (Priority: P3)

**Goal**: `/about`, `/servizi`, `/blog` esistono, rispondono 200, mostrano navbar e footer.

**Independent Test**: `GET /about`, `GET /servizi`, `GET /blog` → 200. Ogni pagina mostra navbar in cima e footer in fondo. `/blog` ha `noindex` nel `<head>`.

- [x] T006 [P] [US3] Creare `src/app/about/page.tsx` — `export const metadata = { title: 'Chi sono | Elisa Patti' }`; server component; usa `Container` da `@/components/ui`; struttura: `<main className="py-16 min-h-screen">`; heading H1 `text-heading-2` "Chi sono"; sottotitolo `text-body-lg text-neutral-600` "Biologa Nutrizionista — Civitanova Marche"; paragrafo placeholder `text-body-md text-neutral-600` "Questa pagina è in aggiornamento. Torna presto per scoprire il mio percorso professionale e la mia filosofia nutrizionale."; nota discreta `text-caption text-neutral-400` "Contenuto in arrivo"

- [x] T007 [P] [US3] Creare `src/app/servizi/page.tsx` — `export const metadata = { title: 'Servizi | Elisa Patti' }`; server component; usa `Container`; struttura: `<main className="py-16 min-h-screen">`; heading H1 `text-heading-2` "I Percorsi"; sottotitolo `text-body-lg text-neutral-600` "Percorsi nutrizionali personalizzati"; paragrafo placeholder con link alla homepage: `<Link href="/#servizi">Scopri i percorsi disponibili →</Link>` in `text-primary-600 hover:underline`; nota `text-caption text-neutral-400` "Pagina dedicata in arrivo"

- [x] T008 [P] [US3] Creare `src/app/blog/page.tsx` — `export const metadata = { title: 'Blog | Elisa Patti', robots: { index: false } }`; server component; usa `Container`; struttura: `<main className="py-16 min-h-screen">`; heading H1 `text-heading-2` "Blog"; sottotitolo `text-body-lg text-neutral-600` "Consigli di nutrizione e benessere"; paragrafo placeholder `text-body-md text-neutral-600` "Gli articoli sono in arrivo. Torna presto per leggere consigli pratici su alimentazione e stile di vita sano."; nota `text-caption text-neutral-400` "Contenuto in arrivo"

**Checkpoint**: Tutte e 3 le pagine rispondono 200. Navbar e footer visibili su ognuna. Nel sorgente HTML di `/blog`: `<meta name="robots" content="noindex">`. User Story 3 completa.

---

## Phase 5: Polish & Qualità

**Purpose**: Test aggiornati, documentazione, build finale.

- [x] T009 [P] Aggiornare `tests/smoke.spec.ts` — aggiungere test suite "Smoke — Navbar": (1) `page.locator('nav[aria-label="Navigazione principale"]').toBeVisible()` — navbar presente; (2) `page.locator('nav a[href="/about"]').toBeVisible()` — link Chi sono visibile su desktop; (3) `page.locator('nav a[href="/servizi"]').toBeVisible()` — link Servizi visibile; (4) `page.locator('nav a[href="/blog"]').toBeVisible()` — link Blog visibile; (5) `page.goto('/about')` + `expect(page).toHaveTitle(/Chi sono/)` — pagina about risponde; (6) `page.goto('/servizi')` + `expect(page).toHaveTitle(/Servizi/)` — pagina servizi risponde; (7) `page.goto('/blog')` + `expect(page).toHaveTitle(/Blog/)` — pagina blog risponde

- [x] T010 [P] Aggiornare `CLAUDE.md` — aggiungere alla struttura `src/`: `src/data/navigation.ts` (voci navbar: NavLink[], NAV_LINKS), `src/components/sections/Navbar.tsx` (navbar sticky, hamburger mobile, active state), `src/app/about/page.tsx` (Chi sono — placeholder), `src/app/servizi/page.tsx` (Servizi — placeholder), `src/app/blog/page.tsx` (Blog — placeholder, noindex)

- [x] T011 Verificare build pulita — eseguire `npx tsc --noEmit` (zero errori TypeScript strict) e `npm run build`; verificare che tutte le nuove pagine compaiano nell'output di build

- [ ] T012 Commit e push branch `005-navigazione` — creare nuovo branch o usare quello corrente; push su GitHub per deploy preview Vercel

---

## Dipendenze & Ordine di Esecuzione

### Dipendenze tra fasi

- **Phase 1 (Setup)**: nessuna dipendenza — inizia subito
- **Phase 2 (US1)**: dipende da Phase 1 (T001 `navigation.ts` deve esistere per T002 Navbar)
- **Phase 3 (US2)**: dipende da Phase 2 (T005 estende lo stesso file T002)
- **Phase 4 (US3)**: nessuna dipendenza da US1/US2 — file diversi, in parallelo dopo Phase 1
- **Phase 5 (Polish)**: dipende da tutte le fasi precedenti

### Dipendenze interne

- T002 → T003 sequenziale (T003 importa Navbar da T002)
- T003 → T004 può essere in parallelo (file diversi: layout.tsx vs ContactSection.tsx)
- T005 — estende T002, sequenziale
- T006 [P] + T007 [P] + T008 [P] — file diversi, tutti in parallelo
- T009 [P] + T010 [P] — file diversi, in parallelo

### Opportunità di parallelismo

- T006, T007, T008 (Phase 4) — tutti file diversi, in parallelo
- T009, T010 (Phase 5) — file diversi, in parallelo
- Phase 4 può iniziare dopo Phase 1, in parallelo a Phase 2 e 3

---

## Strategia di Implementazione

### MVP: Solo User Story 1

1. Phase 1: T001 (navigation.ts)
2. Phase 2: T002 → T003 → T004 (Navbar + layout + id contatti)
3. **STOP e VALIDA**: Navbar desktop funziona? Link attivo corretto?
4. Se sì → deploy preview Vercel per feedback

### Consegna Incrementale

1. Setup (T001) → dati pronti
2. US1 (T002–T004) → navbar desktop **→ MVP dimostrabile**
3. US2 (T005) → hamburger mobile
4. US3 (T006–T008) → pagine placeholder (in parallelo a US2)
5. Polish (T009–T012) → qualità, test, deploy

### Note

- `Navbar.tsx` è un **client component** (`'use client'`) — unico nel layout; tutto il resto rimane server
- `usePathname` funziona solo in client component — corretto
- Il click sul CTA "Prenota ora" nella navbar riusa `window.Calendly?.initPopupWidget` già presente nell'hero — zero codice aggiuntivo se il widget Calendly è già caricato in layout.tsx
- T004 (aggiungere `id="contatti"`) è una modifica di 1 riga a `ContactSection.tsx`
