<!-- SYNC IMPACT REPORT
Version change: N/A → 1.0.0 (initial ratification)
Added sections:
  - Core Principles (I–VII)
  - Technology Stack
  - Development Workflow
  - Compliance & Legal
  - Governance
Templates requiring updates:
  ✅ plan-template.md — Constitution Check gates added (see notes below)
  ✅ spec-template.md — no structural changes needed; guidelines apply
  ✅ tasks-template.md — no structural changes needed; guidelines apply
Deferred items: none
-->

# Elisa Patti — Sito Nutrizionista: Constitution

## Core Principles

### I. Design Organico (NON NEGOZIABILE)

Il sistema visivo DEVE utilizzare esclusivamente forme morbide, curve e organiche.
Bordi squadrati, angoli vivi e geometrie rigide sono VIETATI in qualsiasi componente UI.
Ogni feature implementata DEVE rispettare il design system definito in `001-design-system`
prima di essere considerata completata. Nessuna eccezione senza approvazione esplicita.

Rationale: l'identità visiva della Dott.ssa Patti si distingue dal segmento clinico/farmaceutico
attraverso un linguaggio estetico caldo, naturale e umano. La coerenza stilistica è un asset
competitivo diretto.

### II. Conversion-First (NON NEGOZIABILE)

Ogni pagina DEVE esporre esattamente una CTA primaria ben visibile above the fold.
La CTA primaria del sito è "Prenota consulenza gratuita". Ogni altra azione (prenotazione visita,
contatto, newsletter) è CTA secondaria e non DEVE competere visivamente con la primaria.
Le metriche di conversione (click-to-booking rate) DEVONO essere misurabili tramite analytics.

Rationale: il sito è uno strumento di business per acquisire nuovi pazienti. Un design
esteticamente eccellente che non converte non raggiunge l'obiettivo.

### III. Mobile-First

Tutti i layout DEVONO essere progettati e testati su viewport mobile (375px) prima
di essere estesi a tablet (768px) e desktop (1280px+).
Breakpoint minori di 375px sono fuori scope.
Il 63% del traffico web attuale arriva da mobile: fallire su mobile significa fallire.

Rationale: il target principale (donne 25–50 anni) naviga prevalentemente da smartphone.

### IV. Performance — Core Web Vitals

Il sito DEVE raggiungere e mantenere questi target misurati su PageSpeed Insights (mobile):
- LCP (Largest Contentful Paint): ≤ 2.5s
- CLS (Cumulative Layout Shift): ≤ 0.1
- INP (Interaction to Next Paint): ≤ 200ms
- Lighthouse Performance Score: ≥ 90

Immagini DEVONO essere ottimizzate (WebP/AVIF, lazy loading, next/image o equivalente).
Font DEVONO essere caricati con `font-display: swap` o `optional`.

Rationale: performance diretta di ranking SEO e impatto diretto sul bounce rate.

### V. Privacy by Design & GDPR

Il sito DEVE essere conforme al GDPR (Regolamento UE 2016/679) e alle linee guida del
Garante Privacy italiano fin dal primo deploy.
Requisiti non negoziabili:
- Cookie banner conforme (consenso esplicito prima del caricamento di cookie non tecnici)
- Nessun tracciatore di terze parti caricato senza consenso esplicito
- Privacy Policy e Cookie Policy sempre accessibili dal footer
- Form di contatto DEVONO includere checkbox consenso trattamento dati
- Dati sensibili sanitari (anamnesi, documenti pazienti) NON possono essere archiviati
  su servizi cloud non certificati per dati sanitari italiani

Rationale: la Dott.ssa Patti è un professionista sanitario. Una violazione GDPR comporta
sanzioni fino a €20M o 4% del fatturato annuo globale, oltre a danni reputazionali gravi.

### VI. Autonomia Editoriale (CMS-First)

Tutti i contenuti testuali e le immagini del sito DEVONO essere gestibili dalla
Dott.ssa Patti tramite CMS, senza richiedere intervento dello sviluppatore.
Sono esclusi da questo principio: layout strutturali, animazioni, codice logico.
Il CMS scelto è Sanity (piano gratuito sufficiente per questo scope).

Rationale: il sito deve evolvere autonomamente con nuovi articoli, aggiornamenti
ai servizi e alle tariffe senza dipendenza tecnica continuativa.

### VII. Semplicità & YAGNI

Nessuna astrazione, libreria o pattern viene introdotto senza una feature concreta che
lo richieda in questa iterazione. Funzionalità "future" non vanno implementate preventivamente.
Complessità aggiuntiva DEVE essere giustificata nella sezione Complexity Tracking del plan.md.

Rationale: un sito semplice, performante e maintainable batte un sito over-engineered
che diventa impossibile da modificare.

## Technology Stack

### Frontend

- **Framework**: Next.js 15+ (App Router) con TypeScript strict mode
- **Styling**: Tailwind CSS v4 + CSS custom properties per il design system organico
- **Animazioni**: Framer Motion (fluid transitions, scroll-triggered reveals, blob shapes)
- **UI Components**: Radix UI primitives (accessibilità WCAG 2.1 AA garantita)
- **Form**: React Hook Form + Zod (validazione schema-driven)
- **Font**: Google Fonts o self-hosted (Playfair Display per titoli, Inter per corpo testo)

### CMS & Contenuti

- **CMS**: Sanity v3 (Studio embedded, GROQ queries, immagini ottimizzate via Sanity CDN)
- **Rich Text**: Portable Text (Sanity) renderizzato con componenti custom

### Booking & Pagamenti

- **Prenotazione consulenza gratuita**: Calendly embed (widget non invasivo, personalizzato)
- **Prenotazione visita a pagamento**: Calendly + Stripe (pagamento anticipato opzionale)
- **Email transazionali**: Resend + React Email (template brandizzati)

### Analytics & SEO

- **Analytics**: Plausible Analytics (privacy-first, GDPR-compliant nativo, no cookie consent richiesto)
- **SEO**: Next.js Metadata API + structured data (Schema.org: `Physician`, `MedicalBusiness`)
- **Sitemap**: generazione automatica con `next-sitemap`

### Hosting & CI/CD

- **Hosting**: Vercel (piano Hobby gratuito sufficiente per il traffico iniziale)
- **Preview deployments**: automatici su ogni PR
- **Domain**: da configurare (dominio della Dott.ssa Patti)

### Testing

- **Unit/Component**: Vitest + Testing Library (solo per logica critica: form, booking flow)
- **E2E**: Playwright (percorso critico: homepage → consulenza gratuita → conferma)
- I test NON sono obbligatori per componenti puramente visivi o statici

## Development Workflow

- Il progetto segue Spec-Driven Development con spec-kit v0.6.2
- Ogni feature inizia con un branch dedicato (`###-nome-feature`) creato da `/speckit-specify`
- Sequenza obbligatoria: `specify` → `clarify` (opzionale) → `plan` → `tasks` → `implement`
- Il branch `main` è deployato automaticamente su Vercel; è il branch di produzione
- Nessun commit diretto su `main`; tutto passa da feature branch + PR
- Ogni feature DEVE avere un demo visual (screenshot o video) prima della merge

## Compliance & Legal

- Il sito opera in Italia; si applicano: GDPR, Codice del Consumo (D.Lgs. 206/2005),
  e le norme deontologiche dell'Ordine Nazionale dei Biologi per la pubblicità sanitaria
- Le tariffe dei servizi DEVONO essere indicate chiaramente (obbligo Bersani, L. 248/2006)
- Il titolo professionale "Biologa Nutrizionista" e il numero di iscrizione all'albo
  DEVONO essere visibili nella pagina Chi Sono
- Testimonial e recensioni DEVONO essere autentiche e non fuorvianti

## Governance

Questa constitution è il documento normativo che sovrasta qualsiasi altra decisione tecnica
o estetica nel progetto. In caso di conflitto tra un requisito di feature e un principio
della constitution, la constitution prevale.

**Procedura di modifica**:
1. Aprire una PR dedicata con titolo `constitution: <descrizione modifica>`
2. Documentare la motivazione della modifica
3. Aggiornare `LAST_AMENDED_DATE` e incrementare `CONSTITUTION_VERSION`
4. Aggiornare i template dipendenti se necessario

**Compliance review**: verificare aderenza alla constitution prima della merge di ogni feature PR.

**Versionamento semantico**:
- MAJOR: rimozione o ridefinizione incompatibile di un principio
- MINOR: aggiunta di nuovi principi o sezioni
- PATCH: chiarimenti, correzioni di testo, raffinamenti non semantici

**Version**: 1.0.0 | **Ratified**: 2026-04-14 | **Last Amended**: 2026-04-14
