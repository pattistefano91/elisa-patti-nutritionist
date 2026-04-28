# Feature Specification: Privacy Policy & Cookie Policy

**Feature Branch**: `016-privacy-cookie-policy`
**Created**: 2026-04-28
**Status**: Draft

## User Scenarios & Testing

### User Story 1 - Lettura Privacy Policy (Priority: P1)

Un visitatore del sito vuole capire come vengono trattati i suoi dati personali prima di inviare un'email o compilare un form di contatto. Apre la pagina `/privacy` e trova un documento leggibile, strutturato e conforme al GDPR italiano.

**Why this priority**: Obbligo legale GDPR — senza privacy policy il sito non è a norma.

**Independent Test**: Aprire `/privacy` e verificare che il contenuto sia completo, leggibile e contenga tutte le sezioni obbligatorie GDPR.

**Acceptance Scenarios**:

1. **Given** un visitatore su qualsiasi pagina del sito, **When** clicca sul link "Privacy Policy" nel footer, **Then** viene portato su `/privacy` con contenuto completo e leggibile
2. **Given** la pagina `/privacy`, **When** viene caricata, **Then** mostra titolare, finalità, base giuridica, diritti dell'interessato e contatti
3. **Given** la pagina `/privacy`, **When** indicizzata da Google, **Then** ha meta tag `noindex`

---

### User Story 2 - Lettura Cookie Policy (Priority: P2)

Un visitatore vuole sapere quali cookie usa il sito. Apre la pagina `/cookie-policy` e trova una spiegazione chiara di quali cookie sono presenti e perché.

**Why this priority**: Obbligo legale GDPR complementare alla privacy policy.

**Independent Test**: Aprire `/cookie-policy` e verificare che elenchi i cookie tecnici presenti e dichiari l'assenza di cookie di profilazione.

**Acceptance Scenarios**:

1. **Given** un visitatore su qualsiasi pagina del sito, **When** clicca su "Cookie Policy" nel footer, **Then** viene portato su `/cookie-policy` con contenuto completo
2. **Given** la pagina `/cookie-policy`, **When** viene caricata, **Then** mostra l'elenco dei cookie tecnici, la loro funzione e durata
3. **Given** il sito attuale, **When** si analizzano i cookie presenti, **Then** la policy dichiara correttamente solo cookie tecnici

---

### Edge Cases

- Il layout deve essere leggibile su mobile (schermi piccoli)
- I link nel footer puntano già a `/privacy` e `/cookie-policy` — non vanno modificati
- Il numero albo e l'email privacy sono placeholder — andranno aggiornati con i dati reali di Elisa

## Requirements

### Functional Requirements

- **FR-001**: La pagina `/privacy` DEVE contenere tutte le sezioni obbligatorie GDPR Art. 13: titolare, finalità, base giuridica, destinatari, conservazione, diritti dell'interessato
- **FR-002**: La pagina `/cookie-policy` DEVE elencare i cookie tecnici presenti e dichiarare l'assenza di cookie di profilazione o marketing
- **FR-003**: Entrambe le pagine DEVONO avere meta tag `noindex` per non apparire nei motori di ricerca
- **FR-004**: Il contenuto DEVE essere in italiano, scritto in modo chiaro e accessibile (no muro di testo legale)
- **FR-005**: Entrambe le pagine DEVONO usare il layout e design system esistente (Navbar, Footer, Container, token CSS)
- **FR-006**: La pagina `/privacy` DEVE indicare come titolare la Dott.ssa Elisa Patti con email di contatto privacy
- **FR-007**: I link "Privacy Policy" e "Cookie Policy" nel Footer esistente DEVONO già funzionare (sono già presenti — solo il contenuto è placeholder)

### Key Entities

- **Titolare del trattamento**: Dott.ssa Elisa Patti, Biologa Nutrizionista
- **Email contatto privacy**: placeholder `privacy@nutrizionistaelisapatti.it` (da aggiornare con dato reale)
- **Cookie tecnici presenti**: cookie di sessione Next.js, Plausible Analytics (anonimo, nessun cookie persistente)

## Success Criteria

### Measurable Outcomes

- **SC-001**: Entrambe le pagine sono accessibili dal footer in meno di 2 click
- **SC-002**: Il contenuto copre il 100% delle sezioni obbligatorie GDPR Art. 13
- **SC-003**: Le pagine hanno meta `noindex` e non vengono indicizzate da motori di ricerca
- **SC-004**: Il layout è coerente con il resto del sito (stessi font, colori, Navbar e Footer)

## Assumptions

- Il sito non usa cookie di profilazione né Google Analytics — solo Plausible Analytics in modalità anonima (nessun cookie persistente)
- I dati personali vengono raccolti solo tramite email diretta — nessun form di contatto sul sito al momento
- Il numero di iscrizione all'albo è un placeholder — andrà aggiornato con il dato reale di Elisa
- Le pagine sono statiche (Server Component), nessun dato dinamico necessario
- Il footer esistente ha già i link a `/privacy` e `/cookie-policy` — solo il contenuto delle pagine è da aggiornare
