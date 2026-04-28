# Feature Specification: Pagina Percorsi Nutrizionali

**Feature Branch**: `015-percorsi-nutrizionali`  
**Created**: 2026-04-28  
**Status**: Draft  
**Input**: Rinominare la pagina "Servizi" in "Percorsi Nutrizionali", con layout accattivante e lista percorsi gestibile da file dati. Percorsi iniziali: Metabolismo & Glicemia, Reset Intestinale, Performance Nutrition.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitatore scopre i percorsi disponibili (Priority: P1)

Un potenziale paziente arriva sulla pagina "Percorsi Nutrizionali" dalla navbar o dai link interni. Trova un'intestazione coinvolgente che comunica il valore dei percorsi, poi scorre una griglia di card che mostrano i percorsi disponibili. Per ciascuno vede a chi è rivolto, l'obiettivo e cosa otterrà. Una CTA ben visibile lo invita a prenotare una consulenza gratuita.

**Why this priority**: È il flusso principale di conversione — il visitatore deve capire immediatamente quale percorso fa per lui e sentirsi motivato ad agire.

**Independent Test**: La pagina è raggiungibile da navbar, mostra almeno 3 percorsi con tutte le informazioni e la CTA funzionante.

**Acceptance Scenarios**:

1. **Given** il visitatore clicca "Percorsi" nella navbar, **When** la pagina si carica, **Then** vede un titolo/hero accattivante con due CTA affiancate: "Prenota ora" e "Scopri i percorsi"
1b. **Given** il visitatore clicca "Scopri i percorsi" nel hero, **When** viene cliccato, **Then** la pagina scrolla in modo fluido alla griglia dei percorsi
2. **Given** la pagina è caricata, **When** il visitatore scorre, **Then** vede le card di tutti i percorsi disponibili, ciascuna con: nome, destinatari, obiettivo, lista benefici
3. **Given** il visitatore ha letto una card, **When** clicca la CTA del percorso, **Then** viene avviata la prenotazione della consulenza gratuita (Calendly)
4. **Given** il sito viene visitato da mobile, **When** il visitatore arriva alla pagina, **Then** le card sono leggibili e la CTA è accessibile senza zoom

---

### User Story 2 — Aggiunta o modifica di un percorso (Priority: P2)

La Dott.ssa Patti vuole aggiungere un nuovo percorso o modificare i dettagli di uno esistente senza coinvolgere uno sviluppatore per ogni modifica.

**Why this priority**: Il catalogo percorsi evolverà nel tempo. La manutenibilità è essenziale per ridurre il costo operativo.

**Independent Test**: Aggiungendo un nuovo oggetto nel file dati, il percorso appare automaticamente nella pagina senza modificare i componenti UI.

**Acceptance Scenarios**:

1. **Given** un nuovo percorso viene aggiunto al file dati, **When** la pagina si ricarica, **Then** il nuovo percorso appare nella griglia con tutte le informazioni
2. **Given** il testo di un percorso esistente viene modificato nel file dati, **When** la pagina si ricarica, **Then** il testo aggiornato è visibile

---

### Edge Cases

- Cosa succede se la lista percorsi è vuota? → La sezione percorsi non viene renderizzata; la pagina mostra solo hero e CTA
- Cosa succede se la lista benefici di un percorso è vuota? → La card mostra solo nome, destinatari e obiettivo, senza la sezione "Cosa otterrai"
- Cosa succede se il nome del percorso è molto lungo? → Il testo va a capo senza overflow
- Come funziona su screen reader? → Le card devono avere struttura semantica corretta (heading, lista)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La pagina DEVE essere raggiungibile all'URL `/percorsi` e la voce di navigazione DEVE essere rinominata da "Servizi" a "Percorsi"
- **FR-002**: La pagina DEVE aprirsi con una sezione hero accattivante contenente: titolo principale, sottotitolo motivazionale, e due CTA affiancate: "Prenota ora" (apre Calendly) e "Scopri i percorsi" (scroll smooth alla griglia dei percorsi)
- **FR-003**: La pagina DEVE mostrare tutti i percorsi definiti nel file dati in una griglia responsive (1 colonna mobile, 2 tablet, 3 desktop)
- **FR-004**: Ogni card percorso DEVE mostrare: nome del percorso, destinatari ("Per chi è"), obiettivo, lista dei benefici ("Cosa otterrai")
- **FR-005**: Ogni card percorso DEVE includere una CTA per prenotare la consulenza gratuita
- **FR-006**: I dati dei percorsi DEVONO essere gestiti in un file dati strutturato, modificabile senza toccare i componenti UI
- **FR-007**: La pagina DEVE essere visivamente coerente con il design system del sito (palette colori, tipografia, stile card)
- **FR-008**: La vecchia pagina `/servizi` DEVE reindirizzare a `/percorsi` per non spezzare link esistenti
- **FR-009**: La pagina DEVE essere accessibile: struttura heading corretta, contrasto testo ≥ 4.5:1, navigabile da tastiera

### Key Entities

- **PercorsoNutrizionale**: nome (stringa), destinatari (stringa), obiettivo (stringa), benefici (array di stringhe), id (slug unico), coloreAccent (token colore dalla palette del sito)

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visitatore riesce a identificare il percorso più adatto a sé in meno di 30 secondi di lettura
- **SC-002**: La CTA di prenotazione è visibile senza scorrere la pagina su desktop (above the fold)
- **SC-003**: Aggiungere un nuovo percorso richiede solo la modifica del file dati, senza modifiche ai componenti — verificabile in meno di 5 minuti
- **SC-004**: La pagina è completamente fruibile su mobile senza zoom o scroll orizzontale
- **SC-005**: Il tempo di caricamento della pagina non degrada rispetto alle altre pagine del sito (nessuna risorsa esterna aggiuntiva)

---

## Clarifications

### Session 2026-04-28

- Q: La CTA nel hero apre Calendly direttamente o prima guida l'utente a scoprire i percorsi? → A: Due CTA affiancate: "Prenota ora" (apre Calendly) + "Scopri i percorsi" (scroll smooth alla griglia)
- Q: Le card dei percorsi hanno un colore accent visivo distintivo per ciascuna, o stile uniforme? → A: Ogni card con un colore accent diverso dalla palette del sito

---

## Assumptions

- La CTA di ogni percorso apre lo stesso widget Calendly della consulenza gratuita (non percorsi Calendly separati per tipo)
- Il redirect da `/servizi` a `/percorsi` è necessario anche se il sito non è ancora indicizzato, per coerenza con i link interni esistenti (es. `/#servizi` in homepage)
- I percorsi iniziali sono 3; il sistema deve supportarne fino a ~10 senza problemi di layout
- Non è prevista una pagina di dettaglio per ogni singolo percorso (v1) — tutto il contenuto è nella card
- Ogni percorso ha un `coloreAccent` definito nel file dati, scelto dalla palette del sito (es. primary, secondary, accent); le emoji/icone nei nomi sono opzionali e a discrezione del design
- Il design della pagina deve essere più ricco e visivo rispetto all'attuale placeholder
