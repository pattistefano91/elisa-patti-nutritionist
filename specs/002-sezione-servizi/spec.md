# Feature Specification: Sezione Servizi

**Feature Branch**: `002-sezione-servizi`
**Created**: 2026-04-14
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitatore scopre i servizi e prenota (Priority: P1)

Un potenziale paziente atterra sulla pagina, vuole capire cosa offre la Dott.ssa Patti e prenotare
il tipo di visita più adatto alle proprie esigenze. Scorre la sezione servizi, legge le card,
trova quella giusta e clicca il pulsante di prenotazione che lo porta direttamente al calendario Calendly.

**Why this priority**: È il percorso di conversione principale del sito. Senza questa sezione il sito
non ha un chiaro invito all'azione dopo l'hero. Ogni altro contenuto dipende dalla capacità
di comunicare chiaramente i servizi offerti.

**Independent Test**: Aprire la pagina su viewport mobile (375px) e desktop (1280px).
La sezione deve mostrare tutte e 4 le card. Cliccando il pulsante di prenotazione su ciascuna card
si deve aprire il popup widget Calendly preimpostato sul servizio corretto.

**Acceptance Scenarios**:

1. **Given** un visitatore sulla home, **When** scorre fino alla sezione servizi, **Then** vede 4 card distinte, ognuna con nome, descrizione breve, durata e CTA
2. **Given** un visitatore che legge la card "Consulenza Gratuita", **When** clicca "Prenota ora", **Then** si apre il popup widget Calendly preimpostato sulla consulenza gratuita
3. **Given** un visitatore su mobile, **When** visualizza la sezione, **Then** le card sono leggibili e il CTA è facilmente cliccabile (touch target ≥ 44px)
4. **Given** Calendly non disponibile o bloccato, **When** l'utente clicca il CTA, **Then** l'URL Calendly si apre in nuova tab (fallback `window.open`)

---

### User Story 2 — Visitatore comprende le differenze tra i servizi (Priority: P2)

Un visitatore indeciso vuole capire la differenza tra la prima visita e le visite di controllo,
e se è disponibile la modalità online. La sezione deve comunicare chiaramente durata, contenuto
e scopo di ogni servizio senza richiedere di aprire pagine aggiuntive.

**Why this priority**: La chiarezza dell'offerta riduce l'attrito pre-conversione. Un visitatore
che non capisce la differenza tra i servizi non prenota.

**Independent Test**: Mostrare la sezione a 3 persone del target senza spiegazioni.
Devono essere in grado di identificare correttamente quale servizio è gratuito, quale è la prima visita
e quale è online, senza errori.

**Acceptance Scenarios**:

1. **Given** un visitatore che legge le card, **When** confronta i servizi, **Then** ogni card mostra chiaramente: nome, descrizione breve, durata stimata e modalità (in studio / online)
2. **Given** la card "Visita Online", **When** visualizzata, **Then** mostra esplicitamente la modalità da remoto e che ha la stessa qualità della visita in studio
3. **Given** la card "Consulenza Gratuita", **When** visualizzata, **Then** è visivamente distinta con badge "Gratuita" e mostra la durata di 15 minuti
4. **Given** la card "Visite di Controllo", **When** visualizzata, **Then** menziona la disponibilità di percorsi a pacchetto da 3 o 6 mesi

---

### User Story 3 — CTA finale di sezione per chi ancora non ha scelto (Priority: P3)

Un visitatore che ha scorso tutte le card ma è ancora indeciso trova, in fondo alla sezione,
un messaggio di supporto ("Non sai da dove iniziare?") con un CTA diretto alla consulenza gratuita.

**Why this priority**: Riduce il tasso di abbandono per i visitatori indecisi. Ha valore solo
se P1 e P2 sono già funzionanti.

**Independent Test**: Scorrere la sezione fino in fondo senza cliccare nessuna card.
Il blocco CTA finale deve essere visibile, con testo "Non sai da dove iniziare? Prenota una consulenza
gratuita e iniziamo insieme il tuo percorso" e pulsante che porta a Calendly.

**Acceptance Scenarios**:

1. **Given** un visitatore che ha scorso tutte le card, **When** arriva in fondo alla sezione, **Then** vede il blocco CTA con testo di supporto e pulsante "Prenota consulenza gratuita"
2. **Given** il CTA finale, **When** cliccato, **Then** apre il popup widget Calendly della consulenza gratuita

---

### Edge Cases

- Cosa succede se Calendly è irraggiungibile o bloccato da ad-blocker? → il CTA apre l'URL Calendly in nuova tab (fallback `window.open`); nessun timer di attesa — il check è sincrono al click (`window.Calendly` disponibile o no)
- Cosa succede se la Dott.ssa disabilita temporaneamente le prenotazioni? → il CTA deve poter mostrare un messaggio alternativo senza modificare il codice (gestito via CMS in future iterazioni)
- Come si comporta la sezione su viewport molto stretti (< 320px)? → layout a colonna singola, nessun overflow orizzontale
- Il widget Calendly si apre come **popup widget** tramite script ufficiale Calendly: un link attiva il modal sopra la pagina, senza iframe inline. Nuova tab come fallback se lo script non è disponibile.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La sezione DEVE mostrare esattamente 4 card di servizio nell'ordine: Consulenza Gratuita, Prima Visita Nutrizionale, Visite di Controllo, Visita Online
- **FR-002**: Ogni card DEVE contenere: nome del servizio, descrizione breve (2-3 righe), durata stimata, modalità (in studio / online), pulsante CTA "Prenota ora"
- **FR-003**: La card "Consulenza Gratuita" DEVE mostrare un badge "Gratuita" ed essere visivamente distinta
- **FR-004**: Ogni CTA DEVE aprire il **popup widget Calendly** tramite script ufficiale (`calendly.initPopupWidget`), con URL preimpostato sul servizio corretto
- **FR-005**: La card "Visite di Controllo" DEVE menzionare la disponibilità di percorsi a pacchetto (3 o 6 mesi) con leggera scontistica
- **FR-006**: Sotto la griglia DEVE comparire un banner "Servizi Inclusi" che presenta la Newsletter mensile gratuita (Nutrizione Pratica) con descrizione sintetica
- **FR-007**: In fondo alla sezione DEVE comparire un blocco CTA di recupero con testo "Non sai da dove iniziare? Prenota una consulenza gratuita e iniziamo insieme il tuo percorso" e pulsante verso Calendly
- **FR-008**: La sezione DEVE essere accessibile (WCAG 2.1 AA): contrasto sufficiente, focus visibile, markup semantico corretto
- **FR-009**: La sezione DEVE essere responsive: griglia **2+2** (2 colonne, 2 righe) su desktop, colonna singola su mobile. Ordine: riga 1 → Consulenza Gratuita + Prima Visita Nutrizionale; riga 2 → Visite di Controllo + Visita Online
- **FR-010**: I testi (nomi, descrizioni, durate) DEVONO essere definiti in un unico array/costante dati senza modificare la struttura del componente — pronti per futura integrazione CMS

### Contenuto dei servizi (placeholder definitivi da sito.docx)

| Servizio | Durata | Modalità | Descrizione |
|----------|--------|----------|-------------|
| Consulenza Gratuita | 15 min | Online / telefono | Valutiamo insieme le tue esigenze, chiarisci i tuoi dubbi e scopri il percorso più adatto a te |
| Prima Visita Nutrizionale | 60 min | In studio | Analizziamo storia clinica, obiettivi, stile di vita e abitudini alimentari. Valutazione corporea completa (peso, BIA, plicometria). Al termine ricevi il tuo piano alimentare personalizzato |
| Visite di Controllo | 45 min | In studio | Aggiornamento del piano alimentare, monitoraggio dei progressi e supporto continuo. Disponibili anche in percorsi a pacchetto da 3 o 6 mesi |
| Visita Online | 60 min | Videochiamata | Stessa qualità della visita in studio, comoda e flessibile. Perfetta per chi ha poco tempo o vive lontano |

**Servizio incluso — Nutrizione Pratica (Newsletter mensile gratuita)**:
Ogni mese riceverai un ricettario sano e semplice e una guida nutrizionale pratica per trasformare la teoria in abitudini quotidiane.

### Key Entities

- **Servizio**: nome, descrizione breve, durata, modalità (in-studio | online | entrambe), tag (es. "Gratuita"), URL Calendly associato, bullets dettaglio (opzionale)
- **Card Servizio**: componente visivo che rappresenta un Servizio, include badge tag e CTA
- **Sezione Servizi**: titolo + sottotitolo + griglia Card + banner Newsletter + blocco CTA finale

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visitatore identifica correttamente tutti e 4 i servizi e la loro modalità in meno di 60 secondi
- **SC-002**: Le prenotazioni effettuate tramite la sezione sono visibili nella dashboard Calendly della Dott.ssa (tracking nativo Calendly, senza eventi custom sul sito)
- **SC-003**: La sezione non genera nessuna violazione WCAG AA (verificato con axe)
- **SC-004**: La sezione è completamente leggibile e funzionante su viewport 320px–1440px
- **SC-005**: Il contenuto testuale di tutti i servizi può essere aggiornato in un unico punto del codice senza modificare i componenti UI

## Clarifications

### Session 2026-04-14

- Q: Tipo di integrazione Calendly (popup widget / inline embed / redirect) → A: Popup widget tramite script ufficiale Calendly (`calendly.initPopupWidget`)
- Q: Layout desktop della griglia di card → A: 2+2 (2 colonne × 2 righe); riga 1: Consulenza Gratuita + Prima Visita; riga 2: Visite di Controllo + Visita Online
- Q: Tracking prenotazioni (Plausible / Calendly nativo / entrambi) → A: Solo Calendly nativo — dashboard Calendly, nessun evento custom sul sito
- Q: Contenuto placeholder dei 4 servizi → A: Contenuti reali da sito.docx — nomi, durate e descrizioni definitivi inseriti in spec
- Q: Gestione dei 5 servizi + newsletter → A: 4 card principali; Percorsi a Pacchetto integrati nella card Visite di Controllo; Newsletter mostrata come banner "Servizi Inclusi" sotto la griglia

## Assumptions

- I link Calendly specifici per servizio saranno forniti dalla Dott.ssa; per ora si usano URL placeholder (`https://calendly.com/elisapatti/[nome-servizio]`)
- I prezzi non vengono mostrati nelle card — solo su richiesta diretta (scelta strategica per aumentare i contatti)
- La sezione viene inserita nella home page esistente, subito dopo l'hero
- Il widget Calendly viene integrato come **popup widget** tramite script ufficiale Calendly (`calendly.initPopupWidget`), non come iframe inline né redirect
- Le foto dei servizi non sono richieste in questa feature — verranno aggiunte quando disponibili
- La bio della Dott.ssa non rientra in questa feature — sarà la sezione 003-about
- Si usa il design system già approvato (001): componenti Card, Badge, Button, Container
- I contenuti testuali provengono da sito.docx fornito dalla Dott.ssa Patti e sono da considerarsi definitivi salvo revisioni
