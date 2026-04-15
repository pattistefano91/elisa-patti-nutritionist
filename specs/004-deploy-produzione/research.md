# Research: Deploy Produzione

**Feature**: 004-deploy-produzione  
**Date**: 2026-04-15

---

## Decision 1: next-sitemap con SITE_URL env var

**Decision**: Usare `process.env.SITE_URL || 'http://localhost:3000'` come `siteUrl` in `next-sitemap.config.js`

**Rationale**: next-sitemap legge la configurazione a build-time. Il fallback a `localhost:3000` garantisce che il build non si rompa se `SITE_URL` è assente in CI/Vercel. Quando `SITE_URL` è impostata (es. `https://elisapatti.it`), la sitemap usa il dominio reale automaticamente senza modifiche al codice.

**Alternatives considered**:
- Hardcode del dominio Vercel: scartato perché richiede modifica al codice quando si acquista il dominio reale
- `NEXT_PUBLIC_SITE_URL`: scartato perché non necessario che il sito URL sia client-side; solo next-sitemap lo usa a build-time

**Pattern**:
```js
// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['/brand-review'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [{ userAgent: '*', disallow: '/brand-review' }]
  }
}
```

---

## Decision 2: Plausible Analytics — integrazione Next.js 15

**Decision**: Iniettare Plausible via `next/script` con `strategy="afterInteractive"` in `layout.tsx`

**Rationale**: 
- `afterInteractive` carica lo script dopo l'idratazione React — non blocca LCP, non impatta CLS
- `data-domain` parametrizzato via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — se env var assente, lo script non viene iniettato (guard `{domain && <Script ... />}`)
- Plausible non imposta cookie, non richiede consent banner — GDPR-compliant nativo per il Garante italiano

**Pattern**:
```tsx
// src/app/layout.tsx
import Script from 'next/script'
const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
// ...
{domain && (
  <Script
    defer
    data-domain={domain}
    src="https://plausible.io/js/script.js"
    strategy="afterInteractive"
  />
)}
```

**Account setup**: Lo sviluppatore crea l'account su plausible.io con il dominio Vercel (`*.vercel.app`) come sito placeholder. La Dott.ssa viene aggiunta come owner. Quando il dominio reale viene acquistato, si aggiunge su Plausible dashboard → zero modifiche al codice, solo aggiornamento di `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in Vercel.

**Alternatives considered**:
- `@next/third-parties` (GoogleTagManager-style wrapper): scartato — Plausible non ha un wrapper ufficiale Next.js
- Script tag in `<head>` manuale: scartato — `next/script` gestisce loading strategy in modo ottimale

---

## Decision 3: Footer — struttura e contenuto professionale

**Decision**: Footer server component in `src/components/sections/Footer.tsx`, dati professionali in `src/data/professional.ts`

**Rationale**:
- Separazione dati/UI: il numero di iscrizione albo e il titolo sono dati sostituibili senza toccare il componente
- Server component: nessun JS client-side, zero impatto su INP
- Posizionato in `layout.tsx` — appare su tutte le pagine automaticamente

**Struttura dati**:
```ts
// src/data/professional.ts
export interface ProfessionalInfo {
  name: string
  title: string
  alboOrder: string  // es. "Ordine Nazionale dei Biologi"
  alboNumber: string // es. "AA_XXXXX" — placeholder fino a conferma Dott.ssa
}
```

**Layout footer**:
- Sezione sinistra: nome + titolo + numero albo
- Sezione destra: link Privacy Policy + Cookie Policy
- Colore: sfondo neutro caldo (`surface-muted`), testo `neutral-600` — non compete con CTA hero

---

## Decision 4: Pagine legali — boilerplate italiano GDPR per professionista sanitario

**Decision**: Pagine statiche Next.js (`src/app/privacy/page.tsx`, `src/app/cookie-policy/page.tsx`) con testo boilerplate in italiano

**Rationale**:
- Nessuna dipendenza esterna (no iubenda, no cookie service)
- Modificabili direttamente dalla Dott.ssa o da un legale tramite PR
- Il contenuto copre i requisiti minimi GDPR art. 13 per un sito informativo senza form attivi

**Contenuto minimo Privacy Policy (art. 13 GDPR)**:
1. Titolare del trattamento (Dott.ssa Elisa Patti — placeholder)
2. Tipologie di dati trattati (dati di navigazione tecnici, nessun cookie profilazione)
3. Finalità del trattamento
4. Base giuridica
5. Conservazione dei dati
6. Diritti dell'interessato (art. 15-22 GDPR)
7. Contatti DPO (non obbligatorio per professionisti individuali)

**Cookie Policy**: semplificata — solo cookie tecnici di sessione Next.js, nessun cookie di terze parti (Plausible non usa cookie; Calendly caricato on-demand)

---

## Decision 5: Performance — verifiche pre-go-live

**Decision**: Nessuna ottimizzazione aggiuntiva necessaria — il sito usa già next/image con priority per la foto hero

**Rationale**:
- La foto hero usa `next/image` con `priority={true}` → preload automatico, WebP/AVIF ottimizzati
- Plausible è 1KB script caricato con `afterInteractive` → non blocca LCP
- Calendly è già caricato on-demand (click) → non impatta INP/CLS
- Font Cormorant Garamond + DM Sans via `next/font/google` con `display: swap` → no FOUT bloccante
- Vercel Edge Network → CDN globale → TTFB basso

**Azione richiesta**: Verificare score PageSpeed Insights dopo deploy su Vercel.

---

## Env Vars Summary

| Variabile | Required | Default | Scope |
|-----------|----------|---------|-------|
| `SITE_URL` | No | `http://localhost:3000` | Build-time (next-sitemap) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | — (script non iniettato) | Client-side |
