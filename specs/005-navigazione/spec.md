# Feature Specification: Navigazione

**Feature Branch**: `005-navigazione`
**Created**: 2026-04-16
**Status**: Draft
**Input**: Aggiungere un menù di navigazione al sito con link a pagine dedicate (About, Servizi, Blog, Contatti); responsive con hamburger su mobile.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Il visitatore naviga tra le sezioni con la navbar desktop (Priority: P1)

Il visitatore apre il sito su desktop e vede in alto una barra di navigazione con il nome/logo
della Dott.ssa a sinistra, i link alle pagine principali al centro/destra
(Chi sono, Servizi, Blog, Contatti), e un bottone CTA "Prenota ora" all'estrema destra.
La navbar è sticky: rimane visibile durante lo scroll. Cliccando un link il visitatore
raggiunge la pagina corrispondente.

**Why this priority**: Senza navigazione il sito è un dead-end. La navbar è il prerequisito
per strutturare il sito come un'esperienza multi-pagina e guidare il visitatore verso la
prenotazione.

**Independent Test**: Aprire `localhost:3000` su 1280px. La navbar è visibile in alto.
Scorrere la pagina: la navbar rimane ancorata in cima. Cliccare ogni link: si viene
reindirizzati alla pagina corretta.

**Acceptance Scenarios**:

1. **Given** il sito aperto su desktop, **When** la pagina carica, **Then** la navbar è visibile con: logo/nome Dott.ssa, link "Chi sono", "Servizi", "Blog", "Contatti", bottone CTA "Prenota ora"
2. **Given** la navbar visibile, **When** il visitatore scrolla verso il basso, **Then** la navbar rimane fissa in cima alla viewport (sticky)
3. **Given** la navbar, **When** si clicca su "Chi sono", **Then** si arriva alla pagina `/about`
4. **Given** la navbar, **When** si clicca su "Servizi", **Then** si arriva alla pagina `/servizi`
5. **Given** la navbar, **When** si clicca su "Blog", **Then** si arriva alla pagina `/blog`
6. **Given** la navbar, **When** si clicca su "Contatti", **Then** si arriva alla sezione contatti della homepage (anchor `#contatti`)
7. **Given** la navbar, **When** si clicca il CTA "Prenota ora", **Then** si apre il widget Calendly per la consulenza gratuita

---

### User Story 2 — Il visitatore su mobile usa il menù hamburger (Priority: P2)

Su smartphone il visitatore vede solo il logo/nome e un'icona hamburger. Toccando
l'hamburger si apre un dropdown che scende dall'alto sotto la navbar, a larghezza
piena, con i link disposti in colonna. La navigazione è fluida e touch-friendly.

**Why this priority**: Il 63% del traffico arriva da mobile. Senza hamburger la navbar
desktop non è fruibile su 375px.

**Independent Test**: Aprire `localhost:3000` su 375px. I link desktop non sono visibili;
è visibile solo l'hamburger. Toccarlo apre il menù. Cliccare un link chiude il menù
e naviga alla pagina corretta.

**Acceptance Scenarios**:

1. **Given** il sito su viewport 375px, **When** la pagina carica, **Then** i link di navigazione sono nascosti e appare l'icona hamburger
2. **Given** l'icona hamburger visibile, **When** si tocca, **Then** il menù si apre mostrando tutti i link e il CTA
3. **Given** il menù aperto, **When** si tocca un link, **Then** il menù si chiude e il visitatore naviga alla pagina
4. **Given** il menù aperto, **When** si tocca fuori dal menù o il pulsante di chiusura, **Then** il menù si chiude
5. **Given** il menù aperto, **When** si scrolla la pagina, **Then** lo scroll è bloccato sul body (no scroll-behind)

---

### User Story 3 — Le pagine dedicate esistono come destinazioni valide (Priority: P3)

Le pagine `/about`, `/servizi` e `/blog` esistono con contenuto placeholder strutturato:
titolo, sottotitolo e un messaggio "contenuto in arrivo". Le pagine hanno la navbar
e il footer, e sono indicizzabili da Google (tranne `/blog` che attende contenuti reali).

**Why this priority**: I link della navbar devono puntare a pagine esistenti — un 404
è peggio di un placeholder. Le pagine strutturate permettono di iniziare a lavorare
sui contenuti reali in spec successive.

**Independent Test**: Aprire `/about`, `/servizi`, `/blog` — ognuna risponde 200 con
titolo corretto, navbar e footer visibili, messaggio placeholder leggibile.

**Acceptance Scenarios**:

1. **Given** il link "Chi sono" cliccato, **When** la pagina `/about` carica, **Then** mostra: navbar, heading "Chi sono" (o "Dott.ssa Elisa Patti"), sottotitolo professionale, testo placeholder, footer
2. **Given** il link "Servizi" cliccato, **When** la pagina `/servizi` carica, **Then** mostra: navbar, heading "I Percorsi", placeholder con rimando alla homepage per ora, footer
3. **Given** il link "Blog" cliccato, **When** la pagina `/blog` carica, **Then** mostra: navbar, heading "Blog", messaggio "Articoli in arrivo", footer; pagina con `noindex` finché non ha contenuti reali

---

### Edge Cases

- Cosa succede se la navbar è sopra il contenuto hero con foto? → la navbar usa sfondo sempre opaco (`surface-page` #FAF8F5) con `border-bottom` sottile — nessun glassmorphism, nessun scroll listener, massimo contrasto garantito
- Cosa succede se la pagina corrente è già quella del link cliccato? → il link appare in stato "attivo" (colore/sottolineatura diversi) ma non causa reload
- Cosa succede se Calendly non è ancora configurato con URL reale? → il CTA "Prenota ora" nella navbar usa lo stesso URL placeholder dei bottoni nella sezione servizi
- Cosa succede se si arriva su `/about` da un link esterno? → la pagina funziona standalone con navbar e footer (non dipende dall'homepage)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Il sito DEVE avere un componente `<Navbar>` visibile su tutte le pagine tramite `layout.tsx`
- **FR-002**: La `<Navbar>` DEVE essere sticky (`position: sticky; top: 0`) con sfondo sempre opaco (`surface-page` #FAF8F5) e `border-bottom` sottile — nessun cambio di stile al scroll
- **FR-003**: La `<Navbar>` DEVE contenere: logo/nome Dott.ssa (link a `/`), link "Chi sono" (`/about`), link "Servizi" (`/servizi`), link "Blog" (`/blog`), link "Contatti" (anchor `#contatti` sulla homepage), bottone CTA "Prenota ora" (Calendly consulenza gratuita)
- **FR-004**: Su viewport ≥ 768px la navbar DEVE mostrare tutti i link orizzontalmente; su viewport < 768px DEVE mostrare solo logo e icona hamburger
- **FR-005**: L'icona hamburger DEVE aprire un dropdown che scende dall'alto a larghezza piena con link in colonna e CTA; il menù DEVE chiudersi su click link, click esterno, o tasto ESC
- **FR-006**: Il link alla pagina corrente DEVE avere uno stile visivo "attivo" distinguibile dagli altri link
- **FR-007**: Le pagine `/about`, `/servizi`, `/blog` DEVONO esistere come pagine statiche con contenuto placeholder — titolo, sottotitolo, messaggio "in arrivo", navbar e footer
- **FR-008**: La pagina `/blog` DEVE avere `robots: { index: false }` finché non ha contenuti reali
- **FR-009**: La navbar DEVE rispettare il design system 001 — nessun bordo squadrato, palette colori esistente, tipografia DM Sans

### Key Entities

- **Navbar**: componente con stato (aperto/chiuso su mobile), lista voci di navigazione configurabile
- **NavLink**: voce di navigazione — label, href, isActive (derivato dall'URL corrente)
- **Pagine placeholder** (`/about`, `/servizi`, `/blog`): pagine statiche Next.js con metadata e layout

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Il visitatore raggiunge qualsiasi pagina del sito in massimo 1 click dalla navbar
- **SC-002**: Su mobile 375px il menù hamburger è apribile con un tap e tutti i link sono visibili e cliccabili senza zoom
- **SC-003**: La navbar non introduce regressioni di performance: LCP e CLS rimangono nei target (LCP ≤ 2.5s, CLS ≤ 0.1)
- **SC-004**: Le pagine `/about`, `/servizi`, `/blog` rispondono HTTP 200 e mostrano navbar e footer
- **SC-005**: Il link attivo nella navbar è visivamente distinguibile per il visitatore (colore o peso diverso)

## Clarifications

### Session 2026-04-16

- Q: "Contatti" nella navbar punta a una pagina dedicata `/contatti` o all'anchor `#contatti` sull'homepage? → A: anchor `#contatti` sull'homepage — la sezione contatti esiste già, non serve duplicarla in una pagina separata
- Q: La navbar include un CTA "Prenota ora"? → A: Sì — la constitution richiede CTA primaria ben visibile; il bottone nella navbar garantisce accesso alla prenotazione da ogni pagina
- Q: Sfondo della navbar? → A: Sempre opaco — sfondo `surface-page` (#FAF8F5) con `border-bottom` sottile; nessun glassmorphism, nessun scroll listener
- Q: Stile menù mobile? → A: Dropdown che scende dall'alto sotto la navbar, larghezza piena, link in colonna — nessun full-screen overlay né drawer laterale

## Assumptions

- Il componente `<Navbar>` è un client component (`'use client'`) per gestire lo stato aperto/chiuso del menù mobile
- Il logo è il nome "Dott.ssa Elisa Patti" in testo (Cormorant Garamond) — nessun file immagine logo al momento
- Le pagine `/about`, `/servizi`, `/blog` sono placeholder: i contenuti reali saranno oggetto di spec successive (006-about, 007-servizi-page, 008-blog)
- La sezione Contatti sull'homepage ha già `id="contatti"` o lo riceverà in questa feature per permettere il deep-link dalla navbar
- Il widget Calendly nella navbar usa lo stesso URL della consulenza gratuita già presente nell'hero
- `next/navigation` (`usePathname`) viene usato per determinare il link attivo — zero dipendenze esterne
