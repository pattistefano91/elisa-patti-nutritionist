# Tasks: Deploy Produzione

**Feature Branch**: `004-deploy-produzione`
**Input**: [spec.md](spec.md) · [plan.md](plan.md) · [data-model.md](data-model.md) · [contracts/](contracts/) · [research.md](research.md)
**Totale task**: 13 · **Paralleli**: 5 · **User Stories**: 4

---

## Phase 1: Setup — Variabili d'ambiente

**Purpose**: Documentare le env vars prima di qualsiasi codice.

- [x] T001 Creare/aggiornare `.env.example` nella root — aggiungere due variabili documentate: `SITE_URL=` (URL base per next-sitemap; default `http://localhost:3000` se assente) e `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=` (dominio Plausible; se assente lo script non viene iniettato); includere commenti esplicativi per ogni variabile

**Checkpoint**: `.env.example` committato, `.env.local` in `.gitignore`.

---

## Phase 2: Foundational — Dati professionali

**Purpose**: Entità `ProfessionalInfo` pronta prima del Footer.
**⚠️ BLOCCA US3** — completare prima di creare Footer.tsx.

- [x] T002 Creare `src/data/professional.ts` — definire `interface ProfessionalInfo { name: string; title: string; alboOrder: string; alboNumber: string }`; esportare `PROFESSIONAL: ProfessionalInfo` con valori placeholder: `{ name: 'Dott.ssa Elisa Patti', title: 'Biologa Nutrizionista', alboOrder: 'Ordine Nazionale dei Biologi', alboNumber: 'AA_XXXXX' }`; convenzione identica a `src/data/contact.ts`

**Checkpoint**: `npx tsc --noEmit` pulito. I placeholder sono nel codice, sostituibili senza toccare i componenti.

---

## Phase 3: User Story 1 — Il sito è raggiungibile in produzione (Priority: P1) 🎯 MVP

**Goal**: next-sitemap funzionante con SITE_URL configurabile; build non si rompe se SITE_URL assente.

**Independent Test**: Eseguire `npm run build` localmente senza `SITE_URL` impostata. Il build deve completarsi. Aprire `out/sitemap.xml` (o verificare post-deploy): contiene URL con `http://localhost:3000` come fallback. `/brand-review` assente dalla sitemap.

- [x] T003 [US1] Verificare/aggiornare `next-sitemap.config.js` — assicurarsi che `siteUrl` usi `process.env.SITE_URL || 'http://localhost:3000'`; `generateRobotsTxt: true`; array `exclude` contiene `'/brand-review'`; `robotsTxtOptions.policies` contiene `{ userAgent: '*', disallow: '/brand-review' }`; se il file è già corretto, documentare la verifica con un commento inline

**Checkpoint**: `npm run build` pulita senza `SITE_URL`; `public/sitemap.xml` e `public/robots.txt` generati; `/brand-review` esclusa. User Story 1 MVP completa.

---

## Phase 4: User Story 2 — Analytics GDPR-compliant (Priority: P2)

**Goal**: Script Plausible iniettato condizionalmente in `layout.tsx`; nessun cookie impostato.

**Independent Test**: Con `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` non impostata: ispezionare HTML — nessun riferimento a `plausible.io`. Con variabile impostata (qualsiasi valore): HTML contiene `<script ... data-domain="...">`. DevTools → Application → Cookies: vuoto dopo caricamento pagina.

- [x] T004 [US2] Modificare `src/app/layout.tsx` — aggiungere `import Script from 'next/script'`; leggere `const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; iniettare condizionalmente prima di `</body>`: `{plausibleDomain && (<Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />)}`; nessuna modifica ad altre parti del file

**Checkpoint**: Build pulita. Con variabile assente: nessun script Plausible nel DOM. Con variabile presente: script visibile nell'HTML. Nessun cookie di terze parti.

---

## Phase 5: User Story 3 — Footer legale e SEO di base (Priority: P3)

**Goal**: Footer visibile su tutte le pagine con dati professionali, link legali; `/privacy` e `/cookie-policy` accessibili; `/sitemap.xml` e `/robots.txt` funzionanti.

**Independent Test**: Aprire il sito. In fondo alla pagina: nome Dott.ssa, titolo, numero albo placeholder, link "Privacy Policy" e "Cookie Policy" visibili. Aprire `/privacy` → testo boilerplate GDPR italiano. Aprire `/cookie-policy` → testo boilerplate cookie tecnici. Aprire `/sitemap.xml` → contiene URL home.

- [x] T005 [P] [US3] Creare `src/components/sections/Footer.tsx` — server component (no `'use client'`); import `PROFESSIONAL` da `@/data/professional`; import `Container` da `@/components/ui`; struttura: `<footer>` con `Container`; griglia `grid sm:grid-cols-2 gap-8`; colonna sinistra: `<p>` con `{PROFESSIONAL.name}` (text-label bold), `{PROFESSIONAL.title}` (text-caption), `Iscritta all'{PROFESSIONAL.alboOrder} n. {PROFESSIONAL.alboNumber}` (text-caption text-neutral-500); colonna destra: due link `<a href="/privacy">Privacy Policy</a>` e `<a href="/cookie-policy">Cookie Policy</a>` (text-caption, hover:underline); sfondo `bg-surface-muted`, padding `py-8`, testo `text-neutral-600`

- [x] T006 [P] [US3] Creare `src/app/privacy/page.tsx` — pagina statica Next.js; `export const metadata = { title: 'Privacy Policy | Elisa Patti' }`; contenuto boilerplate italiano GDPR art. 13 strutturato con heading H1 "Privacy Policy", H2 per sezioni: "1. Titolare del trattamento" (Dott.ssa Elisa Patti, placeholder indirizzo/email), "2. Dati trattati" (dati di navigazione tecnici, nessun cookie di profilazione, analytics Plausible cookie-free), "3. Finalità e base giuridica" (interesse legittimo per dati tecnici), "4. Conservazione" (log tecnici max 30 giorni), "5. Diritti dell'interessato" (art. 15-22 GDPR: accesso, rettifica, cancellazione, opposizione), "6. Contatti" (email placeholder); testo in italiano semplice, non gergo legale; nota "Ultimo aggiornamento: aprile 2026"; avviso che il contenuto è placeholder da revisionare con un legale; usa `Container` da `@/components/ui`

- [x] T007 [P] [US3] Creare `src/app/cookie-policy/page.tsx` — pagina statica Next.js; `export const metadata = { title: 'Cookie Policy | Elisa Patti' }`; contenuto boilerplate italiano con H1 "Cookie Policy", sezioni: "Cosa sono i cookie" (definizione breve), "Cookie utilizzati da questo sito" (tabella: nome `__Secure-next-auth.session-token` o equivalente, tipo "Tecnico/sessione", durata "Sessione", finalità "Funzionamento del sito — obbligatorio"), "Cookie di terze parti" (nessun cookie — Plausible Analytics è cookie-free; Calendly carica risorse solo on-demand su click dell'utente), "Come disabilitare i cookie" (istruzioni browser generiche), "Contatti" (email placeholder); nota "Ultimo aggiornamento: aprile 2026"; usa `Container` da `@/components/ui`

- [x] T008 [US3] Modificare `src/app/layout.tsx` — aggiungere `import Footer from '@/components/sections/Footer'`; inserire `<Footer />` come ultimo elemento prima di `</body>`, dopo eventuali script; nessuna modifica ad altre parti del file (eseguire dopo T004, T005)

**Checkpoint**: Footer visibile su `/`, `/privacy`, `/cookie-policy`. Link legali nel footer funzionanti. `/sitemap.xml` accessibile. User Story 3 completa.

---

## Phase 6: User Story 4 — Performance Core Web Vitals (Priority: P4)

**Goal**: Verificare che PageSpeed Insights mobile rispetti i target post-deploy.

**Independent Test**: Dopo il deploy su Vercel, eseguire PageSpeed Insights sull'URL `*.vercel.app` da mobile. Score ≥ 90, LCP ≤ 2.5s, CLS ≤ 0.1.

- [ ] T009 [US4] Verificare performance post-deploy ← AZIONE MANUALE: da eseguire dopo merge su main — dopo il deploy Vercel (branch o main), aprire https://pagespeed.web.dev/ con l'URL Vercel; documentare i risultati creando `specs/004-deploy-produzione/performance-report.md` con: URL testato, data, Performance Score, LCP, CLS, INP, eventuali flag rossi; se score < 90 verificare: (1) foto hero ha `priority={true}` in `next/image`? (2) Calendly ha `strategy="lazyOnload"`? (3) Plausible ha `strategy="afterInteractive"`?

**Checkpoint**: `performance-report.md` creato. Se tutti i target rispettati, US4 completa.

---

## Phase 7: Polish & Qualità

**Purpose**: Test aggiornati, documentazione, build finale.

- [x] T010 [P] Aggiornare `tests/smoke.spec.ts` — aggiungere test suite "Smoke — Footer e Pagine Legali": (1) `page.locator('footer').toBeVisible()` — footer presente in pagina; (2) `page.locator('footer a[href="/privacy"]').toBeVisible()` — link Privacy Policy nel footer; (3) `page.locator('footer a[href="/cookie-policy"]').toBeVisible()` — link Cookie Policy nel footer; (4) `page.goto('/privacy')` + `expect(page).toHaveTitle(/Privacy Policy/)` — pagina privacy risponde; (5) `page.goto('/cookie-policy')` + `expect(page).toHaveTitle(/Cookie Policy/)` — pagina cookie policy risponde; (6) verifica Plausible (manuale, non in CI): documentare in commento che la presenza dello script `plausible.io/js/script.js` nel DOM va verificata manualmente quando `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` è impostata in Vercel

- [x] T011 [P] Aggiornare `CLAUDE.md` — aggiungere alla struttura `src/`: `src/data/professional.ts` (dati professionali per footer: nome, titolo, albo), `src/components/sections/Footer.tsx` (footer con link legali e dati professionali), `src/app/privacy/page.tsx` (Privacy Policy — boilerplate GDPR italiano), `src/app/cookie-policy/page.tsx` (Cookie Policy — solo cookie tecnici)

- [x] T012 Verificare build pulita — eseguire `npx tsc --noEmit` (zero errori TypeScript) e `npm run build` senza `SITE_URL` impostata (il build non deve fallire); verificare che `public/sitemap.xml` e `public/robots.txt` siano generati

- [x] T013 Commit e push branch `004-deploy-produzione` — verificare che il deploy Vercel preview sia verde; aprire PR verso `main`; dopo approvazione PR, merge su `main` completa US1 (sito raggiungibile su `*.vercel.app`)

---

## Dipendenze & Ordine di Esecuzione

### Dipendenze tra fasi

- **Phase 1 (Setup)**: nessuna dipendenza — inizia subito
- **Phase 2 (Foundational)**: nessuna dipendenza — inizia subito (parallelo a Phase 1)
- **Phase 3 (US1)**: nessuna dipendenza da Phase 1/2 (file diverso: `next-sitemap.config.js`)
- **Phase 4 (US2)**: nessuna dipendenza (modifica `layout.tsx`, task unico)
- **Phase 5 (US3)**: dipende da Phase 2 (T002 `professional.ts` deve esistere per T005 Footer); T008 dipende da T004 (US2) e T005 (Footer) — stesso file `layout.tsx`
- **Phase 6 (US4)**: dipende da deploy Vercel (almeno preview branch)
- **Phase 7 (Polish)**: dipende da tutte le fasi precedenti

### Dipendenze interne Phase 5 (US3)

- T005 [P] + T006 [P] + T007 [P] — file diversi, paralleli
- T008 — sequenziale dopo T004 (US2 layout.tsx) + T005 (Footer component)

### Opportunità di parallelismo

- T001 (Phase 1) e T002 (Phase 2) — file diversi, in parallelo
- T003 (US1), T004 (US2), T005+T006+T007 (US3) — tutti file diversi, in parallelo
- T010 + T011 (Polish) — file diversi, in parallelo

---

## Strategia di Implementazione

### MVP: Solo User Story 1

1. Phase 1: T001 (`.env.example`)
2. Phase 3: T003 (next-sitemap con SITE_URL)
3. Phase 7: T012 → T013 (build check → PR → merge main)
4. **STOP e VALIDA**: Il sito è raggiungibile su `*.vercel.app`?
5. Se sì → comunicare URL Vercel alla Dott.ssa per review

### Consegna Incrementale

1. Setup + Foundational (T001–T002) → dati pronti
2. US1 (T003) → sitemap configurata **→ build verificabile**
3. US2 (T004) → Plausible pronto per attivazione
4. US3 (T005–T008) → footer legale visibile **→ compliance GDPR**
5. Polish (T010–T013) → qualità, test, deploy su main

### Note

- `Footer.tsx` è un **server component** — nessun `'use client'`, nessun JS aggiuntivo al bundle
- Il placeholder `alboNumber: 'AA_XXXXX'` in `professional.ts` è visibile nel footer finché la Dott.ssa non fornisce il numero reale
- La verifica PageSpeed (T009) è **manuale** — richiede deploy su Vercel e accesso al browser
- T013 (merge su main) è l'unico task che non è puro codice — richiede che il deploy Vercel preview sia verde prima di procedere
