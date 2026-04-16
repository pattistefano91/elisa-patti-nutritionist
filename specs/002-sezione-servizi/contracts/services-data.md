# Contract: Services Data

**Feature**: 002-sezione-servizi
**File**: `src/data/services.ts`
**Date**: 2026-04-14

---

## Scopo

Questo file è il punto unico di verità per il contenuto della sezione servizi.
I componenti UI non devono contenere testi hardcoded — importano tutto da qui.

## Contratto del modulo

```typescript
// src/data/services.ts

export type ServiceMode = 'studio' | 'online' | 'entrambe'

export interface Service {
  id: string
  name: string
  description: string
  duration: string
  mode: ServiceMode
  modeLabel: string
  tag?: string
  tagVariant?: 'primary' | 'secondary' | 'accent' | 'neutral'
  calendlyUrl: string
  bullets?: string[]
  featured?: boolean
}

export interface IncludedService {
  id: string
  name: string
  subtitle: string
  description: string
  icon: string
}

export const SERVICES: Service[]           // array ordinato per display (featured first)
export const INCLUDED_SERVICES: IncludedService[]
export const SERVICES_CTA_URL: string      // URL Calendly consulenza gratuita (alias)
```

## Invarianti

- `SERVICES` ha sempre esattamente 4 elementi (in questa feature)
- `SERVICES[0]` è sempre la Consulenza Gratuita (`featured: true`)
- `SERVICES_CTA_URL === SERVICES[0].calendlyUrl`
- Tutti i `calendlyUrl` sono URL validi (anche se placeholder)
- I `tagVariant` usano solo varianti definite nel design system 001

## Placeholder URL Calendly

Fino a quando la Dott.ssa non fornisce gli URL definitivi:
```
https://calendly.com/elisapatti/consulenza-gratuita
https://calendly.com/elisapatti/prima-visita
https://calendly.com/elisapatti/visita-controllo
https://calendly.com/elisapatti/visita-online
```
