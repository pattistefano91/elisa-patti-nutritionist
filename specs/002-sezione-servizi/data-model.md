# Data Model: Sezione Servizi

**Feature**: 002-sezione-servizi
**Date**: 2026-04-14

---

## Entità: `Service`

Rappresenta un singolo servizio offerto dalla Dott.ssa Patti.
Definita in `src/data/services.ts`, sarà sostituibile con un documento Sanity senza modificare i componenti.

```typescript
type ServiceMode = 'studio' | 'online' | 'entrambe'

interface Service {
  id: string              // slug univoco, es. "consulenza-gratuita"
  name: string            // nome visualizzato nella card
  description: string     // testo breve (2-3 righe)
  duration: string        // es. "15 min", "60 min"
  mode: ServiceMode       // modalità erogazione
  modeLabel: string       // testo visualizzato, es. "Online / Telefono"
  tag?: string            // badge opzionale, es. "Gratuita"
  tagVariant?: 'primary' | 'secondary' | 'accent' | 'neutral'
  calendlyUrl: string     // URL Calendly per questo servizio (placeholder se non disponibile)
  bullets?: string[]      // punti elenco dettaglio (opzionale, per card espansa futura)
  featured?: boolean      // true per Consulenza Gratuita (evidenziazione visiva)
}
```

## Valori: array `SERVICES` (placeholder definitivi)

| id | name | duration | mode | tag | featured |
|----|------|----------|------|-----|----------|
| `consulenza-gratuita` | Consulenza Gratuita | 15 min | online | Gratuita | true |
| `prima-visita` | Prima Visita Nutrizionale | 60 min | studio | — | false |
| `visite-controllo` | Visite di Controllo | 45 min | studio | — | false |
| `visita-online` | Visita Online | 60 min | online | — | false |

## Entità: `IncludedService`

Rappresenta un servizio incluso (es. Newsletter), mostrato nel banner sotto la griglia.

```typescript
interface IncludedService {
  id: string
  name: string
  description: string
  icon?: string   // emoji o nome icona
}
```

**Valore**: Newsletter "Nutrizione Pratica" — ricettario mensile + guida nutrizionale pratica.

## Relazioni

```
page.tsx
  └── ServicesSection
        ├── [4×] ServiceCard (usa Service[])
        ├── IncludedServicesBanner (usa IncludedService[])
        └── ServicesCtaBanner
```

## Note CMS-readiness

La forma di `Service` è progettata per mappare 1:1 a un documento Sanity:
```
// Futuro schema Sanity (schemaTypes/service.ts)
{ name: 'service', type: 'document', fields: [
  { name: 'id', type: 'slug' },
  { name: 'name', type: 'string' },
  { name: 'description', type: 'text' },
  { name: 'duration', type: 'string' },
  { name: 'mode', type: 'string', options: { list: ['studio','online','entrambe'] } },
  { name: 'tag', type: 'string' },
  { name: 'calendlyUrl', type: 'url' },
  { name: 'bullets', type: 'array', of: [{ type: 'string' }] },
  { name: 'featured', type: 'boolean' },
]}
```
