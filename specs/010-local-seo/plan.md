# Implementation Plan: SEO Locale per Nutrizionista

**Feature Branch**: `017-local-seo`
**Created**: 2026-04-28

## Technical Stack

- Next.js 15 App Router, TypeScript strict
- Nessuna dipendenza aggiuntiva — solo componenti React nativi
- Schema.org JSON-LD tramite `<script>` in Server Components

## Constitution Check

- ✅ Principio IV (Performance): JSON-LD è testo puro, nessun impatto su LCP/CLS/INP
- ✅ Principio VII (YAGNI): nessuna libreria aggiuntiva, componente minimalista
- ✅ Principio V (GDPR): nessun dato personale dell'utente nei JSON-LD
- ✅ Principio I (Design Organico): nessun impatto visivo

## File Impattati

```
src/
├── components/
│   └── JsonLd.tsx                  ← NUOVO: componente generico JSON-LD
├── data/
│   └── seo.ts                      ← NUOVO: dati strutturati centralizzati
├── app/
│   ├── layout.tsx                  ← MODIFICA: metadataBase + Person schema
│   ├── page.tsx                    ← MODIFICA: LocalBusiness schema + meta ottimizzati
│   ├── about/
│   │   └── page.tsx                ← MODIFICA: BreadcrumbList + meta ottimizzati
│   └── percorsi/
│       └── page.tsx                ← MODIFICA: BreadcrumbList + meta ottimizzati
```

## Fasi di Implementazione

### Fase 1 — Fondamenta

1. Creare `src/data/seo.ts` con tutti i dati strutturati centralizzati (LocalBusiness, Person, breadcrumb helpers)
2. Creare `src/components/JsonLd.tsx` componente generico

### Fase 2 — Iniezione schemi

3. Aggiornare `layout.tsx`: metadataBase → `nutrizionistaelisapatti.it`, aggiungere `Person` JsonLd
4. Aggiornare `app/page.tsx`: aggiungere `LocalBusiness` JsonLd, ottimizzare metadata homepage
5. Aggiornare `app/about/page.tsx`: aggiungere `BreadcrumbList`, ottimizzare metadata
6. Aggiornare `app/percorsi/page.tsx`: aggiungere `BreadcrumbList`, ottimizzare metadata

### Fase 3 — Validazione

7. Type check TypeScript
8. Verifica manuale JSON-LD valido (struttura corretta)
