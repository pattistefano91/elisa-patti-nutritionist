# Research: Pagina Chi sono

**Feature Branch**: `006-chi-sono`
**Generated**: 2026-04-16

---

## Decision 1: Gestione contenuti — data file vs CMS

**Decision**: Implementare con `src/data/about.ts` come bridge file strutturato

**Rationale**: La constitution (Principio VI) prescrive Sanity CMS per l'autonomia editoriale. Tuttavia, l'integrazione Sanity è una feature separata (futura). Il data file `about.ts` è il pattern già in uso nel progetto (`contact.ts`, `services.ts`, `navigation.ts`, `professional.ts`) ed è coerente con l'approccio attuale. La struttura dei tipi TypeScript in `about.ts` rispecchierà esattamente ciò che Sanity fornirebbe, rendendo la migrazione futura una sostituzione 1:1 dell'import senza toccare i componenti.

**Alternatives considered**:
- Attendere integrazione Sanity prima di implementare → ritarda inutilmente la pagina; non conforme YAGNI
- Hardcodare i contenuti nel componente → viola separazione dati/UI, difficile da aggiornare

---

## Decision 2: Layout split hero — implementazione

**Decision**: CSS Grid con `grid-cols-1 md:grid-cols-2` per split hero responsive

**Rationale**: Pattern nativo Tailwind, nessuna dipendenza aggiuntiva. Su mobile (`grid-cols-1`) la foto appare sopra e il testo sotto. Su desktop (`md:grid-cols-2`) foto a sinistra, testo a destra. Coerente con il sistema grid già in uso nel progetto.

**Alternatives considered**:
- Flexbox → equivalente in semplicità ma Grid è più leggibile per layout a due colonne
- Framer Motion split → over-engineering per questa fase; animazioni posticipabili

---

## Decision 3: Immagine — next/image con fill o dimensioni fisse

**Decision**: `next/image` con dimensioni fisse (es. 480×600) e `object-cover`, bordi arrotondati

**Rationale**: Le foto sono già in `public/images/dottoressa/`. `next/image` garantisce ottimizzazione automatica (WebP, lazy loading, preload LCP), indispensabile per rispettare il target LCP ≤ 2.5s della constitution. Bordi arrotondati (`rounded-2xl`) per rispettare il Principio I (design organico). Non serve `fill` perché le dimensioni del container sono note.

**Photo da usare**: `elisa-patti-studio-1.jpg` come default (sostituibile via `src/data/about.ts`)

**Alternatives considered**:
- `<img>` nativo → nessuna ottimizzazione automatica, viola Principio IV
- Sanity Image CDN → feature futura, non disponibile ora

---

## Decision 4: CTA sezione finale — componente riutilizzato

**Decision**: Blocco CTA autonomo con `Button` da `@/components/ui`, stessa logica `openCalendly` di `ServicesSection.tsx`

**Rationale**: Zero codice aggiuntivo; il widget Calendly è già caricato in `layout.tsx`. Riuso del pattern `(window as any).Calendly.initPopupWidget` già validato. La sezione CTA è un server component con bottone client inline (come da pattern esistente) — oppure può essere estratta come piccolo client component se necessario.

**Alternatives considered**:
- Link diretto a URL Calendly → apre nuova tab, UX peggiore
- Componente CTA separato riutilizzabile → YAGNI, non serve per ora

---

## Decision 5: Filosofia nutrizionale — dati strutturati

**Decision**: Array `PhilosophyValue[]` con `{ icon: string, title: string, description: string }` in `about.ts`

**Rationale**: Placeholder realistico con 3-4 valori tipici di una biologa nutrizionista (approccio personalizzato, nutrizione come stile di vita, ascolto del paziente, approccio scientifico). Icon come emoji o stringa SVG path — per semplicità si usa emoji nella prima implementazione, sostituibile con icone SVG senza cambiare la struttura dati.

**Alternatives considered**:
- Testo libero markdown → meno strutturato, harder to style
- Radix UI icons → dipendenza aggiuntiva non giustificata (YAGNI)
