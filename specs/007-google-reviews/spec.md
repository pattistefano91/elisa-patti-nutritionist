# Feature Specification: Sezione Recensioni Google

**Feature Branch**: `010-google-reviews`  
**Created**: 2026-04-24  
**Status**: Draft  
**Input**: Aggiungere una sezione con le recensioni Google della Dott.ssa Patti, con presentazione dinamica (carousel/animata) nel modo più professionale possibile.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitatore scopre le recensioni Google (Priority: P1)

Un potenziale paziente visita il sito e vuole verificare l'affidabilità della Dott.ssa Patti prima di prenotare. Nella homepage trova una sezione dedicata che mostra le recensioni reali di Google: score complessivo, numero totale di recensioni e un carousel animato con le singole testimonianze. Può leggere nome del recensore, stelle, testo e data.

**Why this priority**: La social proof è il principale driver di conversione per uno studio professionale. Mostrare recensioni reali direttamente sulla homepage abbatte la diffidenza e aumenta le prenotazioni.

**Independent Test**: La sezione è visibile e funzionante nella homepage, mostra almeno 5 recensioni con scorrimento automatico e un badge con il punteggio medio.

**Acceptance Scenarios**:

1. **Given** il visitatore apre la homepage, **When** scorre verso il basso, **Then** vede una sezione "Cosa dicono i pazienti" con badge rating complessivo (es. "4.9 ⭐") e numero di recensioni
2. **Given** la sezione è visibile, **When** il carousel scorre automaticamente, **Then** le card delle recensioni avanzano in modo fluido ogni 4-5 secondi
3. **Given** il carousel è in scorrimento, **When** il visitatore passa il mouse sopra una card, **Then** lo scorrimento si mette in pausa
4. **Given** la sezione è visibile, **When** il visitatore clicca "Vedi tutte le recensioni su Google", **Then** si apre il profilo Google della Dott.ssa in una nuova tab
5. **Given** il sito viene visitato da mobile, **When** il visitatore arriva alla sezione, **Then** il carousel è utilizzabile con swipe orizzontale e le card sono leggibili senza zoom

---

### User Story 2 — Navigazione manuale tra le recensioni (Priority: P2)

Il visitatore vuole controllare recensioni specifiche senza aspettare lo scorrimento automatico.

**Why this priority**: Migliora l'esperienza utente ma non è bloccante; il valore principale è già nel P1.

**Independent Test**: Frecce di navigazione (prev/next) o indicatori dot permettono di passare manualmente da una recensione all'altra.

**Acceptance Scenarios**:

1. **Given** il carousel è visibile, **When** il visitatore clicca freccia successiva/precedente o un dot indicatore, **Then** la recensione corrispondente è mostrata
2. **Given** il carousel è all'ultima recensione, **When** il visitatore clicca "avanti", **Then** torna alla prima recensione (scorrimento ciclico)

---

### Edge Cases

- Cosa succede se il testo di una recensione è molto lungo? → Troncare a ~200 caratteri con "…" e possibilità di espandere
- Cosa succede se non ci sono recensioni nel data file? → La sezione non viene renderizzata (hidden)
- Come si gestisce una recensione senza testo (solo stelle)? → Mostrare solo la valutazione senza area testo
- Come funziona su screen reader? → Le card devono avere attributi aria corretti; il carousel deve essere navigabile da tastiera

---

## Clarifications

### Session 2026-04-24

- Q: Quante card sono visibili contemporaneamente su desktop? → A: 3 card affiancate

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Il sito DEVE mostrare una sezione di recensioni Google nella homepage, visibile tra la sezione servizi e la sezione contatti
- **FR-002**: La sezione DEVE mostrare un badge con il punteggio medio (es. "4.9") e il numero totale di recensioni (es. "27 recensioni")
- **FR-003**: Le recensioni DEVONO essere presentate in un carousel a scorrimento automatico con intervallo di 4-5 secondi; su desktop sono visibili 3 card affiancate, su tablet 2, su mobile 1
- **FR-004**: Ogni card recensione DEVE mostrare: nome del recensore, valutazione in stelle (1-5), testo della recensione, data
- **FR-005**: Il carousel DEVE mettere in pausa lo scorrimento automatico quando il cursore è sopra la sezione (hover pause)
- **FR-006**: Il carousel DEVE supportare la navigazione manuale tramite frecce o indicatori dot
- **FR-007**: La sezione DEVE includere un link "Vedi su Google" che apre il profilo Google della Dott.ssa in una nuova tab
- **FR-008**: Il carousel DEVE essere navigabile con swipe orizzontale su dispositivi touch (mobile/tablet)
- **FR-009**: I dati delle recensioni DEVONO essere gestiti in un file dati strutturato, facilmente aggiornabile senza toccare i componenti
- **FR-010**: Le recensioni con testo superiore a 200 caratteri DEVONO essere troncate con indicazione visiva
- **FR-011**: La sezione DEVE essere accessibile: navigazione da tastiera, attributi aria per screen reader, contrasto sufficiente

### Key Entities

- **Review**: singola recensione — id, nome recensore, rating (1–5), testo (opzionale), data (stringa leggibile), avatar initials (derivato dal nome)
- **ReviewsSection**: configurazione globale — punteggio medio, numero totale recensioni, URL profilo Google, lista Review[]

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: La sezione è visibile nella homepage senza scroll aggiuntivo oltre la sezione servizi (above-the-fold rispetto alla sezione contatti)
- **SC-002**: Il carousel scorre automaticamente con transizione fluida percepita come professionale (nessun salto visivo)
- **SC-003**: Il tempo di caricamento della sezione non impatta negativamente il punteggio LCP della pagina (nessuna immagine esterna, testo e SVG only)
- **SC-004**: La sezione è completamente funzionante su mobile (swipe, leggibilità, CTA accessibile) senza necessità di zoom
- **SC-005**: Un nuovo visitatore in 5 secondi di lettura percepisce il valore della social proof (rating visibile, almeno una recensione leggibile)

---

## Assumptions

- Le recensioni sono inserite manualmente nel data file a partire da quelle reali visibili su Google; non si usa un'API live (nessun backend, nessuna chiave API, zero costi aggiuntivi — coerente con l'architettura statica del sito)
- Il profilo Google della Dott.ssa è raggiungibile tramite il link fornito nella ricerca Google
- Il numero di recensioni iniziali è tra 5 e 20 (gestibile con carousel infinito)
- L'animazione del carousel usa CSS/JS lato client; non richiede librerie aggiuntive pesanti
- La sezione è posizionata nella homepage tra `ServicesSection` e `ContactSection`
- Le foto profilo dei recensori non sono disponibili (solo initials come avatar, per privacy e semplicità)
- Il rating medio e il totale recensioni sono impostati manualmente nel data file e aggiornati periodicamente dalla Dott.ssa (o su richiesta)
