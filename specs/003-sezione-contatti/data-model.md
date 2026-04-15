# Data Model: Sezione Contatti

**Feature**: 003-sezione-contatti
**Date**: 2026-04-15

---

## Entità

### `ContactInfo`

Dati di contatto diretti della Dott.ssa. Singleton (un solo oggetto per sito).

| Campo | Tipo | Obbligatorio | Note |
|-------|------|--------------|------|
| `email` | `string` | ✅ | Usato in `href="mailto:..."` |
| `phone` | `string` | ✅ | Formato E.164 es. `+39333000000`, usato in `href="tel:..."` |
| `phoneDisplay` | `string` | ✅ | Formato leggibile es. `+39 333 000 0000` |
| `instagramUrl` | `string` | ✅ | URL completo profilo Instagram |
| `instagramHandle` | `string` | ✅ | Per display es. `@elisapatti_nutrizionista` |

### `Location`

Studio / sede dove la Dott.ssa effettua le visite. Array (0-N elementi).

| Campo | Tipo | Obbligatorio | Note |
|-------|------|--------------|------|
| `id` | `string` | ✅ | Chiave univoca es. `studio-principale` |
| `name` | `string` | ❌ | Nome studio opzionale es. `Studio Medico Centro` |
| `address` | `string` | ✅ | Via e numero civico es. `Via Roma 12` |
| `city` | `string` | ✅ | Città es. `Milano` |
| `cap` | `string` | ✅ | CAP es. `20121` |
| `province` | `string` | ✅ | Sigla provincia es. `MI` |
| `googleMapsUrl` | `string` | ✅ | URL Google Maps precostruito |

---

## Costanti esportate da `src/data/contact.ts`

```typescript
export const CONTACT: ContactInfo      // singleton
export const LOCATIONS: Location[]     // array location
```

---

## Mapping Sanity (futuro)

Quando verrà integrato Sanity (feature futura), i tipi mappano direttamente su:

- `ContactInfo` → document type `siteContact` (singleton, `_type: 'siteContact'`)
- `Location` → document type `location` (array in `siteContact.locations[]`)

I componenti non cambieranno: solo il file `contact.ts` verrà sostituito con query GROQ.

---

## Validazione

- `phone` DEVE iniziare con `+` (formato E.164)
- `instagramUrl` DEVE iniziare con `https://instagram.com/` o `https://www.instagram.com/`
- `googleMapsUrl` DEVE iniziare con `https://maps.google.com/` o `https://www.google.com/maps/`
- `LOCATIONS` può essere array vuoto (sezione location non viene renderizzata)
