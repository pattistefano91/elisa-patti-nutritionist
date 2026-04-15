# Feature Specification: Sezione Contatti

**Feature Branch**: `003-sezione-contatti`
**Created**: 2026-04-15
**Status**: Draft
**Input**: User description: "voglio inserire una parti di contatti, dove inserire la mail della dottoressa, il numero di telefono e il link instagram e la location (che può essere più di una) dove effettua le visite"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitatore trova i recapiti e contatta la Dott.ssa (Priority: P1)

Un potenziale paziente ha visto i servizi, vuole prendere contatto prima di prenotare.
Cerca un numero di telefono o una email. Scorre la pagina fino alla sezione contatti,
trova tutti i recapiti con icone chiare e li usa direttamente dal dispositivo
(click-to-call su mobile, click-to-email, link Instagram in nuova tab).

**Why this priority**: È il canale diretto alternativo a Calendly. Alcuni pazienti
preferiscono scrivere o chiamare prima di prenotare online — senza questa sezione
si perdono conversioni.

**Independent Test**: Aprire la home su mobile (375px). Nella sezione contatti,
toccare il numero di telefono — deve aprire il dialer nativo. Toccare l'email —
deve aprire il client email con destinatario precompilato. Toccare Instagram —
deve aprire il profilo in nuova tab.

**Acceptance Scenarios**:

1. **Given** un visitatore sulla home, **When** scorre fino alla sezione contatti, **Then** vede email, telefono, Instagram e tutte le location con indirizzo completo
2. **Given** un visitatore su mobile, **When** tocca il numero di telefono, **Then** il dialer nativo si apre con il numero precompilato (`tel:` link)
3. **Given** un visitatore su desktop o mobile, **When** clicca sull'email, **Then** il client email si apre con destinatario precompilato (`mailto:` link)
4. **Given** un visitatore, **When** clicca il link Instagram, **Then** il profilo si apre in nuova tab (`target="_blank"`, `rel="noopener noreferrer"`)

---

### User Story 2 — Visitatore individua lo studio più vicino (Priority: P2)

Un paziente vuole sapere dove si trovano gli studi e quale è raggiungibile per lui.
La sezione mostra le location con indirizzo completo e — per ogni indirizzo —
un link diretto a Google Maps che apre le indicazioni stradali.

**Why this priority**: La Dott.ssa opera in più location. Un paziente che non trova
l'indirizzo giusto non prenota. Mostrare le location è fondamentale per ridurre
le domande via email sul "dove si trova".

**Independent Test**: Aprire la sezione su mobile. Devono essere visibili tutte
le location con indirizzo. Cliccando su una location si apre Google Maps
con le indicazioni stradali verso quell'indirizzo.

**Acceptance Scenarios**:

1. **Given** la sezione contatti, **When** visualizzata, **Then** ogni location mostra nome dello studio (opzionale), indirizzo completo (via, città, CAP) e un link "Apri in Google Maps"
2. **Given** più location, **When** visualizzate su desktop, **Then** sono affiancate in griglia (max 2 colonne) — su mobile impilate a colonna singola
3. **Given** un visitatore su mobile, **When** clicca "Apri in Google Maps", **Then** si apre l'app Google Maps (o browser) con l'indirizzo preimpostato

---

### Edge Cases

- Cosa succede se la Dott.ssa ha una sola location? → la griglia mostra un solo blocco senza layout "vuoto" a destra
- Cosa succede se il client email non è configurato sul dispositivo? → il click-to-email apre comunque il sistema operativo; nessun comportamento custom richiesto
- Come si comporta il numero di telefono su desktop? → il `tel:` link può aprire Skype/FaceTime/VoIP; comportamento standard del browser, non richiede gestione custom
- Cosa succede se l'URL Instagram non è ancora disponibile? → il dato è placeholder, sostituibile in `src/data/contact.ts` senza toccare i componenti

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La sezione DEVE mostrare l'indirizzo email della Dott.ssa con link `mailto:` cliccabile
- **FR-002**: La sezione DEVE mostrare il numero di telefono con link `tel:` cliccabile (click-to-call su mobile)
- **FR-003**: La sezione DEVE mostrare il link al profilo Instagram che si apre in nuova tab
- **FR-004**: La sezione DEVE mostrare tutte le location con indirizzo completo e link "Apri in Google Maps" per ognuna
- **FR-005**: Il numero di location DEVE essere configurabile in un unico file dati (`src/data/contact.ts`) senza modificare i componenti
- **FR-006**: Tutti i dati di contatto (email, telefono, Instagram, location) DEVONO essere definiti in `src/data/contact.ts` — pronti per futura integrazione CMS
- **FR-007**: La sezione DEVE essere inserita nella home page dopo `<ServicesSection />` e prima del footer
- **FR-008**: La sezione DEVE essere accessibile (WCAG 2.1 AA): link con `aria-label` descrittivi, contrasto sufficiente, focus visibile
- **FR-009**: La sezione DEVE usare esclusivamente i componenti del design system 001 (Card, Container, Divider, Badge, Button) — nessun nuovo componente UI generico
- **FR-010**: Le location DEVONO mostrare solo indirizzo testuale + link "Apri in Google Maps"
- **FR-011**: Il layout desktop DEVE essere a 2 colonne: colonna sinistra = recapiti (email, telefono, Instagram) · colonna destra = location card(s); su mobile le colonne si impilano (recapiti sopra, location sotto) (`https://maps.google.com/?q=<indirizzo>`) — nessuna mappa interattiva embedded, nessuna API key richiesta

### Key Entities

- **ContattoInfo**: email, telefono, instagramUrl, instagramHandle
- **Location**: id, nome (opzionale), indirizzo, città, cap, provincia, googleMapsUrl

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visitatore trova il numero di telefono e lo chiama in meno di 10 secondi dall'apertura della sezione
- **SC-002**: Su mobile, il click-to-call funziona correttamente su almeno 2 dispositivi iOS e Android
- **SC-003**: La sezione non genera nessuna violazione WCAG AA (verificato con axe)
- **SC-004**: L'aggiunta o rimozione di una location richiede la modifica di un solo file (`src/data/contact.ts`), senza toccare componenti o layout
- **SC-005**: La sezione è completamente leggibile e funzionante su viewport 320px–1440px

## Clarifications

### Session 2026-04-15

- Q: Come sono organizzati visivamente i blocchi della sezione? → A: Due colonne — colonna sinistra con recapiti (email, telefono, Instagram), colonna destra con location card(s); su mobile impilate verticalmente
- Q: La sezione include orari di ricevimento o informazioni aggiuntive oltre ai recapiti? → A: No — solo email, telefono, Instagram e location; orario e testo introduttivo esclusi dallo scope

## Assumptions

- I dati reali (email, telefono, Instagram handle, indirizzi) saranno forniti dalla Dott.ssa — per ora si usano placeholder
- Non è previsto un form di contatto in questa feature (può essere aggiunto come feature separata)
- Non è previsto l'orario di ricevimento in questa feature (può essere aggiunto in iterazioni future)
- La sezione non richiede animazioni specifiche — usa le transizioni standard del design system
- Il link Google Maps è un semplice URL `https://maps.google.com/?q=<indirizzo>` — non richiede API key
- Il profilo Instagram è personale/professionale della Dott.ssa, non una pagina business separata
- Si usa il design system già approvato (001): Card, Container, Badge, Divider
