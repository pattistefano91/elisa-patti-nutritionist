# Feature Specification: Deploy Produzione

**Feature Branch**: `004-deploy-produzione`
**Created**: 2026-04-15
**Status**: Draft
**Input**: Configurare infrastruttura e deploy del sito in produzione su Vercel: merge feature branch, variabile SITE_URL configurabile (dominio da acquistare), sitemap, analytics GDPR-compliant, footer legale, performance check.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Il sito è raggiungibile in produzione su URL stabile (Priority: P1)

Lo sviluppatore esegue il merge di tutte le feature branch su `main`. Vercel effettua
il deploy automatico. Il sito è raggiungibile su URL Vercel di default
(`*.vercel.app`) con tutte le sezioni funzionanti. Quando il dominio reale
sarà disponibile, basterà impostare `SITE_URL` in Vercel e aggiungere il dominio
custom — zero modifiche al codice.

**Why this priority**: È il prerequisito per tutto il resto. Senza un deploy stabile
su `main` non si può verificare analytics, sitemap né performance.

**Independent Test**: Aprire l'URL Vercel di deploy (`*.vercel.app`). Il sito
deve caricare correttamente con hero, sezione servizi e sezione contatti.
Il build deve passare senza errori su Vercel CI.

**Acceptance Scenarios**:

1. **Given** il branch `main` aggiornato, **When** Vercel esegue il deploy, **Then** il sito è accessibile su URL `*.vercel.app` senza errori 404 o 500
2. **Given** `SITE_URL` non configurata, **When** il sito viene deployato, **Then** next-sitemap usa un URL di fallback senza rompere il build
3. **Given** `SITE_URL=https://elisapatti.it` configurata in Vercel, **When** il sito viene ridepleyato, **Then** sitemap.xml contiene gli URL con il dominio corretto
4. **Given** il dominio custom aggiunto in Vercel, **When** il DNS è propagato, **Then** il sito è raggiungibile sul dominio reale senza modifiche al codice

---

### User Story 2 — Analytics GDPR-compliant attivo (Priority: P2)

La Dott.ssa può vedere quanti visitatori arrivano sul sito, da dove vengono
e quali pagine visitano — senza cookie banner, senza violare il GDPR.
Plausible Analytics è privacy-first: non usa cookie, non raccoglie dati personali,
non richiede consenso esplicito secondo le linee guida del Garante italiano.

**Why this priority**: La Dott.ssa ha bisogno di misurare l'efficacia del sito
per prendere decisioni (es. quali servizi promuovere, da dove arrivano i pazienti).
Senza analytics non si può ottimizzare nulla.

**Independent Test**: Aprire il sito deployato. Nel sorgente HTML deve essere
presente lo script Plausible. Nella dashboard Plausible deve comparire
almeno una visita dopo aver aperto la pagina.

**Acceptance Scenarios**:

1. **Given** il sito in produzione, **When** un visitatore apre la home, **Then** Plausible registra la visita nella dashboard senza impostare cookie
2. **Given** la dashboard Plausible, **When** la Dott.ssa accede, **Then** vede pageviews, visitatori unici e pagine più visitate
3. **Given** un ad-blocker attivo, **When** il visitatore carica la pagina, **Then** il sito funziona normalmente (lo script Plausible è bloccato silenziosamente, non causa errori)

---

### User Story 3 — Footer legale e SEO di base (Priority: P3)

Ogni pagina del sito mostra un footer con i link obbligatori per legge
(Privacy Policy, Cookie Policy) e le informazioni professionali della Dott.ssa
(titolo, numero iscrizione albo). La sitemap è generata automaticamente
e accessibile a Google.

**Why this priority**: Obbligatorio per compliance legale (GDPR, normativa
italiana sulla pubblicità sanitaria). Bassa complessità tecnica, alto impatto
su SEO e credibilità professionale.

**Independent Test**: Aprire il sito. In fondo alla pagina devono essere visibili
i link Privacy Policy e Cookie Policy. Aprire `/sitemap.xml` — deve contenere
l'URL della home. Aprire `/robots.txt` — deve esistere e puntare alla sitemap.

**Acceptance Scenarios**:

1. **Given** qualsiasi pagina del sito, **When** visualizzata, **Then** il footer mostra: Privacy Policy (link), Cookie Policy (link), nome e titolo professionale Dott.ssa, numero iscrizione albo professionale (es. "Iscritta all'Ordine dei Biologi n. AA_XXXXX")
2. **Given** `/sitemap.xml`, **When** aperto, **Then** contiene l'URL della home con `lastmod` aggiornato; esclude `/brand-review`
3. **Given** `/robots.txt`, **When** aperto, **Then** esiste ed è ben formato con riferimento alla sitemap

---

### User Story 4 — Performance Core Web Vitals verificata (Priority: P4)

Prima del go-live su dominio reale, le performance del sito vengono verificate
su PageSpeed Insights mobile. I valori devono rispettare i target della constitution
(LCP ≤ 2.5s, CLS ≤ 0.1, Lighthouse ≥ 90).

**Why this priority**: La performance impatta direttamente il ranking SEO e il
tasso di abbandono. Va verificata prima di comunicare il dominio ai pazienti,
non dopo.

**Independent Test**: Eseguire PageSpeed Insights sull'URL Vercel (`*.vercel.app`)
da mobile. Il report deve mostrare Performance Score ≥ 90 e nessun flag rosso
su LCP o CLS.

**Acceptance Scenarios**:

1. **Given** il sito deployato su Vercel, **When** si esegue PageSpeed Insights mobile, **Then** Performance Score ≥ 90, LCP ≤ 2.5s, CLS ≤ 0.1
2. **Given** la foto della Dott.ssa nell'hero, **When** misurato il LCP, **Then** l'immagine è ottimizzata (WebP/AVIF via next/image, `priority` su above-the-fold)
3. **Given** gli script di terze parti (Calendly, Plausible), **When** misurato l'INP, **Then** INP ≤ 200ms — gli script sono caricati con `lazyOnload` o `defer`

---

### Edge Cases

- Cosa succede se `SITE_URL` non è impostata in Vercel? → next-sitemap usa `http://localhost:3000` come fallback — il build non si rompe, la sitemap non viene inviata a Google ma il sito funziona
- Cosa succede se Plausible è bloccato da ad-blocker? → script non caricato silenziosamente, nessun errore JS, sito funzionante al 100%
- Cosa succede se il dominio non è ancora disponibile al momento del deploy? → il sito è accessibile su `*.vercel.app`; il dominio custom si aggiunge dopo in Vercel dashboard senza rideploy del codice
- Come vengono gestiti i redirect da `www` a non-`www` (o viceversa)? → configurato in Vercel dashboard, non nel codice

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Il branch `main` DEVE essere aggiornato con il contenuto di `002-sezione-servizi` tramite merge/PR; nessun commit diretto su `main`
- **FR-002**: `SITE_URL` DEVE essere l'unica variabile d'ambiente necessaria per configurare il dominio — impostabile in Vercel dashboard senza modificare il codice
- **FR-003**: `next-sitemap` DEVE generare `sitemap.xml` e `robots.txt` automaticamente a ogni build usando `SITE_URL`; il build NON deve fallire se `SITE_URL` è assente
- **FR-004**: Plausible Analytics DEVE essere integrato tramite script `<Script>` in `layout.tsx` con `strategy="afterInteractive"` e `data-domain` configurabile via env var `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- **FR-005**: Il sito DEVE avere un componente `<Footer>` visibile in tutte le pagine con: link Privacy Policy, link Cookie Policy, nome e titolo professionale Dott.ssa, numero iscrizione albo professionale (es. "Iscritta all'Ordine dei Biologi n. XXXXX")
- **FR-006**: Le pagine Privacy Policy e Cookie Policy DEVONO esistere come pagine statiche (`/privacy` e `/cookie-policy`) — contenuto: testo boilerplate italiano per professionista sanitario (GDPR-compliant), modificabile dalla Dott.ssa senza dipendenze da servizi esterni
- **FR-007**: La pagina `/brand-review` DEVE essere esclusa dalla sitemap e bloccata da `robots.txt` (già configurato in `next-sitemap.config.js` — verificare)
- **FR-008**: Le performance del sito su PageSpeed Insights mobile DEVONO rispettare: LCP ≤ 2.5s, CLS ≤ 0.1, Lighthouse Performance ≥ 90

### Key Entities

- **Variabile `SITE_URL`**: URL base del sito (es. `https://elisapatti.it`), usata da next-sitemap; fallback `http://localhost:3000`
- **Variabile `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`**: dominio registrato su Plausible (es. `elisapatti.it`); se assente, lo script non viene iniettato
- **Footer**: componente server, visibile su tutte le pagine tramite `layout.tsx`
- **Pagine legali** (`/privacy`, `/cookie-policy`): contenuto statico placeholder

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Il sito è accessibile su URL Vercel (`*.vercel.app`) entro 5 minuti dal merge su `main`
- **SC-002**: Cambiare dominio richiede solo l'aggiornamento di `SITE_URL` in Vercel — zero modifiche al codice, zero rideploy manuale
- **SC-003**: PageSpeed Insights mobile: Performance Score ≥ 90, LCP ≤ 2.5s, CLS ≤ 0.1
- **SC-004**: `/sitemap.xml` e `/robots.txt` accessibili e ben formati sul sito deployato
- **SC-005**: Zero violazioni GDPR: nessun cookie impostato senza consenso (Plausible non usa cookie; Calendly caricato solo su click)

## Clarifications

### Session 2026-04-15

- Q: Il dominio è già disponibile? → A: No — dominio da acquistare; tutto configurato via `SITE_URL` env var, aggiornabile senza toccare il codice
- Q: Analytics: Plausible o altro? → A: Plausible (già definito in constitution — privacy-first, GDPR-compliant nativo)
- Q: Quali dati professionali nel footer? → A: Nome + titolo professionale + numero iscrizione albo (es. "Iscritta all'Ordine dei Biologi n. XXXXX") — standard normativa pubblicità sanitaria italiana
- Q: Chi crea e gestisce l'account Plausible? → A: Lo sviluppatore crea l'account su plausible.io usando il dominio Vercel come placeholder; la Dott.ssa riceve accesso alla dashboard in seguito
- Q: Contenuto placeholder pagine legali (/privacy, /cookie-policy)? → A: Testo boilerplate italiano per professionista sanitario che copre i punti GDPR essenziali — modificabile direttamente dalla Dott.ssa o da un legale senza dipendenze da servizi esterni

## Assumptions

- Il sito verrà deployato su Vercel (già connesso al repository GitHub in sessioni precedenti)
- Il dominio verrà acquistato dalla Dott.ssa in futuro; fino ad allora si usa l'URL `*.vercel.app`
- Plausible Analytics: l'account su plausible.io viene creato dallo sviluppatore con il dominio Vercel placeholder; la Dott.ssa riceve accesso alla dashboard come co-owner
- Le pagine Privacy Policy e Cookie Policy contengono testo boilerplate italiano (punti GDPR essenziali per professionista sanitario) — modificabile dalla Dott.ssa o da un legale; nessuna dipendenza da servizi esterni (es. iubenda)
- Il titolo professionale e numero iscrizione albo per il footer saranno forniti dalla Dott.ssa
- `next-sitemap` è già installato nel progetto (configurato in `001-design-system`)
- Non è previsto un sistema di autenticazione — il sito è pubblico
