# Contract: About Page

**Feature Branch**: `006-chi-sono`
**Type**: UI Component Contract

---

## Sezioni della pagina `/about`

### 1. Hero Split

```
┌─────────────────────────────────────────────────────┐
│  [Foto portrait]  │  Dott.ssa Elisa Patti            │
│                   │  Biologa Nutrizionista            │
│  480×600 px       │  Civitanova Marche                │
│  rounded-2xl      │                                   │
│  object-cover     │  [Bio paragraph]                  │
│                   │                                   │
└─────────────────────────────────────────────────────┘
Mobile: foto sopra (full-width), testo sotto
Desktop: grid-cols-2, foto a sinistra, testo a destra
```

**Props contratto**:
- `photo: PhotoInfo` — src, alt, width, height
- `bio: string` — paragrafo di presentazione
- Nome e titolo da `PROFESSIONAL` (`professional.ts`)

---

### 2. Filosofia Nutrizionale

```
┌─────────────────────────────────────────────────────┐
│  La mia filosofia                                    │
│                                                      │
│  🌿 Approccio personalizzato                        │
│     Descrizione...                                   │
│                                                      │
│  🔬 Basi scientifiche                               │
│     Descrizione...                                   │
│                                                      │
│  ❤️  Ascolto e rispetto                             │
│     Descrizione...                                   │
│                                                      │
│  🌱 Nutrizione come stile di vita                   │
│     Descrizione...                                   │
└─────────────────────────────────────────────────────┘
```

**Props contratto**:
- `philosophy: PhilosophyValue[]` — array di 3-4 voci
- Layout: lista verticale (`flex flex-col gap-6`)

---

### 3. Formazione & Credenziali

```
┌─────────────────────────────────────────────────────┐
│  Formazione                                          │
│                                                      │
│  2020  Laurea Magistrale in Biologia                │
│        Università degli Studi [...]                  │
│                                                      │
│  ─────────────────────────────────────────          │
│  Iscritta all'Albo dei Biologi dell'Emilia          │
│  Romagna e delle Marche — Sezione A n. 5404         │
└─────────────────────────────────────────────────────┘
```

**Props contratto**:
- `credentials: Credential[]` — array ordinato per anno discendente
- `albo: AlboInfo` — da `PROFESSIONAL` (no duplicazione)

---

### 4. CTA

```
┌─────────────────────────────────────────────────────┐
│  Vuoi iniziare il tuo percorso?                      │
│  [Prenota ora]                                       │
└─────────────────────────────────────────────────────┘
```

**Comportamento**:
- `Button variant="primary"` — apre Calendly popup
- `onClick`: `(window as any).Calendly?.initPopupWidget({ url: ... })`
- Richiede `'use client'` sul componente che contiene il bottone

---

## Metadata

```typescript
export const metadata: Metadata = {
  title: 'Chi sono | Dott.ssa Elisa Patti',
  description: 'Scopri il percorso professionale della Dott.ssa Elisa Patti, Biologa Nutrizionista a Civitanova Marche. Formazione, filosofia nutrizionale e approccio al paziente.',
}
```

---

## Vincoli accessibility

- `<img>` DEVE avere `alt` descrittivo (via `photo.alt`)
- Sezione filosofia: `<ul>` con `<li>` per ogni valore
- Sezione credenziali: `<ul>` con `<li>` per ogni voce
- Heading hierarchy: `<h1>` nome, `<h2>` per ogni sezione
- `aria-label` sul bottone CTA se il testo non è autoesplicativo
