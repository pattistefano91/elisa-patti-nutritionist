# Contract: Contact Data

**Feature**: 003-sezione-contatti
**Date**: 2026-04-15

---

## Scopo

Definisce la forma esatta dei dati esportati da `src/data/contact.ts` e le invarianti che i componenti possono assumere.

## Tipi TypeScript

```typescript
// src/data/contact.ts

export interface ContactInfo {
  email: string
  phone: string          // E.164: "+39333000000"
  phoneDisplay: string   // leggibile: "+39 333 000 0000"
  instagramUrl: string   // "https://instagram.com/handle"
  instagramHandle: string // "@handle"
}

export interface Location {
  id: string
  name?: string           // opzionale
  address: string         // "Via Roma 12"
  city: string
  cap: string
  province: string        // sigla: "MI"
  googleMapsUrl: string   // URL già formato, pronto per href
}

export const CONTACT: ContactInfo
export const LOCATIONS: Location[]
```

## Invarianti garantite ai componenti

- `CONTACT.email` è sempre non-vuoto → `ContactSection` può renderizzare il link direttamente
- `CONTACT.phone` inizia sempre con `+` → usabile direttamente in `href="tel:"`
- `LOCATIONS` può essere array vuoto → `ContactSection` deve gestire questo caso (non renderizza il blocco location)
- `googleMapsUrl` è sempre un URL assoluto → usabile direttamente in `href`

## Invarianti di comportamento UI

- Cliccando `tel:` su mobile: apre il dialer nativo — comportamento OS, non gestito dal codice
- Cliccando `mailto:`: apre il client email — comportamento OS, non gestito dal codice
- Cliccando `instagramUrl`: si apre in `target="_blank"` con `rel="noopener noreferrer"`
- Cliccando `googleMapsUrl`: si apre in `target="_blank"` con `rel="noopener noreferrer"`
