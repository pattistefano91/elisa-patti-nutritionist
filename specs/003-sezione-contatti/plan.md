# Implementation Plan: Sezione Contatti

**Branch**: `003-sezione-contatti` | **Date**: 2026-04-15 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification da `specs/003-sezione-contatti/spec.md`

## Summary

Aggiunge una sezione statica "Contatti" alla homepage, posizionata dopo `<ServicesSection />`.
Layout 2 colonne su desktop: recapiti diretti (email, telefono, Instagram) a sinistra,
location degli studi a destra. I dati sono centralizzati in `src/data/contact.ts`
con struttura CMS-ready per futura migrazione Sanity.
Nessun form, nessun embed esterno, nessuna API key necessaria.

## Technical Context

**Language/Version**: TypeScript 5+ strict, Node.js 20 LTS
**Primary Dependencies**: Next.js 15 App Router, Tailwind CSS v4, design system 001
**Storage**: N/A — dati statici in `src/data/contact.ts`
**Testing**: Playwright (smoke test aggiornato)
**Target Platform**: Web — mobile 375px priority, desktop 1280px
**Project Type**: Web application — Next.js homepage section
**Performance Goals**: Zero impatto su LCP/CLS/INP — sezione 100% statica, nessun asset extra
**Constraints**: Solo componenti design system 001, nessun embed esterno
**Scale/Scope**: 1 sezione, 2 componenti inline, 1 file dati

## Constitution Check

- [x] **I. Design Organico**: card arrotondate, icone testuali/SVG, nessun bordo vivo
- [x] **II. Conversion-First**: sezione è CTA secondaria; la CTA primaria hero rimane inalterata
- [x] **III. Mobile-First**: colonna singola su mobile (375px), 2 colonne da `lg:` (1024px+)
- [x] **IV. Performance**: zero script, zero immagini, zero embed — impatto LCP/CLS = 0
- [x] **V. GDPR**: nessun form (no raccolta dati), nessun cookie, nessun embed Google Maps (solo link)
- [x] **VI. CMS-First**: struttura `ContactInfo` + `Location` mappabile 1:1 su Sanity senza modificare i componenti
- [x] **VII. YAGNI**: nessuna astrazione generica — `ContactSection` è specifico per questa feature

## Project Structure

### Documentation (questa feature)

```text
specs/003-sezione-contatti/
├── plan.md              ← questo file
├── research.md          ← decisioni su tel:/mailto:/Google Maps/accessibilità
├── data-model.md        ← ContactInfo, Location, mapping Sanity futuro
├── contracts/
│   └── contact-data.md  ← contratto tipi e invarianti per i componenti
└── tasks.md             ← Phase 2 output (/speckit-tasks)
```

### Source Code

```text
src/
├── data/
│   └── contact.ts              ← NEW: ContactInfo, Location, CONTACT, LOCATIONS
├── components/
│   └── sections/
│       └── ContactSection.tsx  ← NEW: sezione contatti (server component)
└── app/
    └── page.tsx                ← UPDATE: aggiungere <Divider /> + <ContactSection />
tests/
└── smoke.spec.ts               ← UPDATE: aggiungere test sezione contatti
```

**Structure Decision**: `ContactSection.tsx` è un server component (nessun onClick, nessun state).
I link `tel:` e `mailto:` e `target="_blank"` funzionano senza `'use client'`.
Il file dati `contact.ts` segue la stessa convenzione di `services.ts`.

## Complexity Tracking

Nessuna violazione della Constitution. Nessuna complessità aggiuntiva da giustificare.

---

## Phase 0: Research ✅

Artefatto: [research.md](research.md)

Decisioni chiave:
1. `tel:` e `mailto:` — anchor HTML nativi, nessuna libreria
2. Google Maps — URL `https://maps.google.com/?q=...` precostruito in `contact.ts`, nessuna API key
3. Struttura dati CMS-ready — campi identici al futuro document Sanity
4. Accessibilità — `aria-label` descrittivi su tutti i link di contatto

---

## Phase 1: Design & Contracts ✅

Artefatti: [data-model.md](data-model.md) · [contracts/contact-data.md](contracts/contact-data.md)

### Componenti previsti

#### `ContactSection` (server component)
- Importa `CONTACT`, `LOCATIONS` da `@/data/contact`
- Layout: `<section>` con `<Container>`, griglia `grid lg:grid-cols-2 gap-12`
- Colonna sinistra: intestazione + 3 link (email, telefono, Instagram) con icone e `aria-label`
- Colonna destra: lista `LOCATIONS` → `LocationCard` inline per ogni studio
- Se `LOCATIONS.length === 0`: colonna destra non renderizzata (griglia diventa 1 colonna)

#### `LocationCard` (inline in `ContactSection.tsx`)
- Mostra: `location.name` (se presente), indirizzo formattato (`address`, `city`, `cap`, `province`)
- Link "Apri in Google Maps" → `target="_blank"` + `rel="noopener noreferrer"`
- Usa `Card variant="default" shadow="sm"`

### Layout desktop (lg: 2 colonne)

```
┌─────────────────────────┬─────────────────────────┐
│  📬 Contatti            │  📍 Dove trovarmi        │
│                         │                          │
│  ✉ email@...            │  ┌─────────────────────┐ │
│  📞 +39 333...          │  │ Studio Principale    │ │
│  📸 @handle             │  │ Via Roma 12          │ │
│                         │  │ 20121 Milano (MI)    │ │
│                         │  │ [Apri in Maps ↗]    │ │
│                         │  └─────────────────────┘ │
└─────────────────────────┴─────────────────────────┘
```

### Layout mobile (colonna singola)

```
📬 Contatti
  ✉ email
  📞 telefono
  📸 instagram

📍 Dove trovarmi
  [Studio card]
  [Studio card n]
```

### Icone

Icone testuali (emoji) per semplicità e zero dipendenze:
- Email: `✉` o SVG inline
- Telefono: `📞` o SVG inline  
- Instagram: SVG del logo Instagram (accessibile, inline)
- Location: `📍`

Alternativa raccomandata: SVG inline semplici (monocolore, no external file, no sprite) per coerenza con il resto del design system che usa già emoji decorative.

### Placeholder dati

```typescript
export const CONTACT: ContactInfo = {
  email: 'info@elisapatti.it',          // placeholder
  phone: '+39000000000',                // placeholder
  phoneDisplay: '+39 000 000 0000',     // placeholder
  instagramUrl: 'https://instagram.com/elisapatti',  // placeholder
  instagramHandle: '@elisapatti',       // placeholder
}

export const LOCATIONS: Location[] = [
  {
    id: 'studio-1',
    name: 'Studio Nutrizionale',        // placeholder
    address: 'Via Placeholder 1',       // placeholder
    city: 'Città',
    cap: '00000',
    province: 'XX',
    googleMapsUrl: 'https://maps.google.com/?q=Via+Placeholder+1+Città',
  },
]
```
