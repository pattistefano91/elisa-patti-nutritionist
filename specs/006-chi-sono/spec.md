# Feature Specification: Pagina Chi sono

**Feature Branch**: `006-chi-sono`
**Created**: 2026-04-16
**Status**: Draft
**Input**: Pagina "Chi sono" completa per la Dott.ssa Elisa Patti: biografia professionale, foto, formazione accademica, filosofia nutrizionale, numero di iscrizione all'albo

---

## Clarifications

### Session 2026-04-16

- Q: Implementiamo con contenuto reale (da fornire) o con placeholder realistico ora? → A: Implementare subito con testo placeholder realistico; i contenuti vengono sostituiti dopo in un file dati separato (`src/data/about.ts`) senza toccare il componente
- Q: Layout principale della pagina? → A: Split hero — foto a sinistra, nome + bio a destra (desktop); stacked su mobile
- Q: Struttura e ordine delle sezioni? → A: Hero split (foto + nome + bio) → Filosofia nutrizionale → Formazione & Credenziali → CTA
- Q: Come presentare la sezione Formazione & Credenziali? → A: Lista semplice — ogni voce con anno, titolo, istituto; numero albo separato in fondo
- Q: Come presentare la sezione "Filosofia nutrizionale"? → A: Lista di 3-4 valori/principi chiave con bullet o icona decorativa

---

## User Scenarios & Testing

### User Story 1 — Presentazione e biografia (Priority: P1)

Un visitatore arriva sulla pagina `/about` e vuole capire chi è la Dott.ssa Elisa Patti: chi è, dove lavora, perché si è specializzata in nutrizione e cosa la rende diversa dagli altri professionisti.

**Why this priority**: È il contenuto principale della pagina — senza bio e foto la pagina non ha valore. È anche il contenuto che converte: il visitatore decide se prenotare una consulenza basandosi su questa sezione.

**Independent Test**: Aprire `/about`. Sono visibili: nome completo, titolo professionale, foto della Dott.ssa, un paragrafo di presentazione e un paragrafo sulla sua filosofia nutrizionale.

**Acceptance Scenarios**:

1. **Given** un visitatore apre `/about`, **When** la pagina carica, **Then** vede la foto della Dott.ssa, il suo nome e titolo in evidenza, e un testo di presentazione personale
2. **Given** un visitatore legge la pagina, **When** scorre verso il basso, **Then** trova la filosofia nutrizionale della Dott.ssa (approccio al paziente, valori professionali)
3. **Given** un visitatore su mobile, **When** apre `/about`, **Then** foto e testo sono leggibili senza scroll orizzontale

---

### User Story 2 — Formazione e credenziali (Priority: P2)

Un visitatore vuole verificare le credenziali accademiche e professionali della Dott.ssa prima di prenotare una consulenza.

**Why this priority**: La fiducia è fondamentale per un professionista sanitario. Mostrare titoli di studio e iscrizione all'albo riduce le barriere alla prenotazione.

**Independent Test**: Nella pagina `/about` è visibile una sezione con: titolo di laurea, eventuali specializzazioni/master, numero di iscrizione all'albo dei biologi.

**Acceptance Scenarios**:

1. **Given** un visitatore cerca le credenziali, **When** scorre la pagina, **Then** trova il percorso formativo (laurea, specializzazioni) elencato in modo leggibile
2. **Given** un visitatore vuole verificare l'iscrizione all'albo, **When** guarda la pagina, **Then** vede il numero di iscrizione "Sezione A n. 5404 — Albo dei Biologi dell'Emilia Romagna e delle Marche"
3. **Given** un visitatore usa uno screen reader, **When** naviga la sezione credenziali, **Then** la struttura è semanticamente corretta (liste, heading gerarchici)

---

### User Story 3 — Invito all'azione (Priority: P3)

Un visitatore che ha letto la pagina è convinto e vuole prenotare una consulenza senza dover tornare alla homepage.

**Why this priority**: Riduce il numero di passi tra "mi fido" e "prenoto". Una CTA in fondo alla pagina cattura l'utente nel momento di massima intenzione.

**Independent Test**: In fondo alla pagina `/about` è presente un blocco CTA con bottone "Prenota ora" che apre il widget Calendly.

**Acceptance Scenarios**:

1. **Given** un visitatore ha letto tutta la pagina, **When** arriva in fondo, **Then** trova una sezione CTA con invito a prenotare
2. **Given** un visitatore clicca "Prenota ora", **When** il widget Calendly si apre, **Then** può selezionare un appuntamento senza lasciare la pagina
3. **Given** un visitatore su mobile, **When** vede la CTA, **Then** il bottone è abbastanza grande da essere toccato facilmente

---

### Edge Cases

- Cosa succede se la foto non è ancora disponibile? → placeholder visivo coerente col design
- Cosa succede se il visitatore arriva direttamente su `/about` da Google? → la pagina è indicizzata, ha meta description e title ottimizzati per SEO
- Cosa succede se il testo bio è molto lungo? → layout non si spezza, il testo rimane leggibile su tutti i breakpoint

---

## Requirements

### Functional Requirements

- **FR-001**: La pagina DEVE mostrare una foto della Dott.ssa Elisa Patti (formato verticale/portrait, ottimizzata con `next/image`)
- **FR-002**: La pagina DEVE includere un testo di presentazione biografica (fornito dalla Dott.ssa)
- **FR-003**: La pagina DEVE includere una sezione "Filosofia nutrizionale" con 3-4 valori/principi chiave presentati come lista con bullet o icona decorativa
- **FR-004**: La pagina DEVE elencare il percorso formativo: laurea, eventuali specializzazioni/master (da fornire)
- **FR-005**: La pagina DEVE mostrare il numero di iscrizione all'albo: "Sezione A n. 5404 — Albo dei Biologi dell'Emilia Romagna e delle Marche"
- **FR-006**: La pagina DEVE avere un blocco CTA finale con bottone "Prenota ora" che apre il widget Calendly
- **FR-007**: La pagina DEVE avere `<title>` e `<meta description>` ottimizzati per SEO
- **FR-008**: La pagina DEVE essere indicizzabile dai motori di ricerca (nessun `noindex`)
- **FR-009**: Il layout DEVE usare uno split hero: foto a sinistra e nome + bio a destra su desktop; foto sopra e testo sotto su mobile
- **FR-010**: Le sezioni della pagina DEVONO seguire questo ordine: (1) Hero split — foto + nome + bio; (2) Filosofia nutrizionale; (3) Formazione & Credenziali; (4) CTA "Prenota ora"

### Key Entities

- **BioContent**: testo di presentazione (paragrafo) + lista di 3-4 valori/principi nutrizionali `{ icon?: string, title: string, description: string }` — placeholder realistico nell'implementazione, sostituibile da `src/data/about.ts`
- **Credentials**: lista di voci `{ year: string, title: string, institution: string }` — presentate come lista semplice; numero albo visualizzato separatamente in fondo alla sezione; placeholder realistico nell'implementazione, sostituibile da `src/data/about.ts`
- **Photo**: immagine portrait della Dott.ssa — file già presenti in `public/images/dottoressa/`

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: La pagina carica in meno di 2 secondi su connessione 4G (immagine ottimizzata)
- **SC-002**: La pagina supera il controllo WCAG AA (zero violazioni axe)
- **SC-003**: La pagina è indicizzata da Google con title e description corretti
- **SC-004**: Il click su "Prenota ora" dalla pagina `/about` è tracciato come evento in Plausible

---

## Assumptions

- L'implementazione usa testo placeholder realistico in `src/data/about.ts`; i contenuti reali (bio, filosofia, formazione) verranno sostituiti dalla Dott.ssa in un secondo momento senza modificare il componente
- Le foto sono già presenti in `public/images/dottoressa/` (elisa-patti-studio-1.jpg, elisa-patti-studio-2.jpg)
- Il widget Calendly è già caricato nel layout globale — nessuna modifica a `layout.tsx` necessaria
- Il design segue il sistema esistente (token Tailwind v4, componenti UI da `@/components/ui`)
- La pagina sostituisce il placeholder corrente in `src/app/about/page.tsx`
