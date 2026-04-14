# Feature Specification: Design System & Fondamenta Visiva

**Feature Branch**: `001-design-system`
**Created**: 2026-04-14
**Status**: Draft
**Input**: Fondare il sistema visivo del sito della Dott.ssa Elisa Patti, biologa nutrizionista. Il sito deve essere moderno, caldo, organico (forme morbide, non geometriche), coerente con l'identità professionale della dottoressa e ottimizzato per la conversione verso la prenotazione di consulenze.

## User Scenarios & Testing

### User Story 1 — Primo Visitatore: Identità Visiva Riconoscibile (Priority: P1)

Una potenziale paziente arriva sul sito per la prima volta. In meno di 5 secondi percepisce
chiaramente che si tratta di una professionista della nutrizione seria, accessibile e umana —
non un ambulatorio freddo. Il sito trasmette cura, competenza e calore attraverso colori,
tipografia e immagini coerenti tra loro.

**Why this priority**: Il design system è il fondamento di ogni altra feature. Se l'identità
visiva non è definita, ogni componente successivo sarà incoerente. Inoltre, la prima impressione
determina il bounce rate: un'identità forte trattiene il visitatore.

**Independent Test**: Mostrare la homepage (solo design, senza contenuto funzionale) a 5 persone
del target (donne 25–50 anni) per 5 secondi e chiedere: "Cos'è questo sito? Ti ispira fiducia?"
≥ 4/5 DEVONO rispondere correttamente e positivamente.

**Acceptance Scenarios**:

1. **Given** un visitatore apre il sito su mobile, **When** la pagina carica, **Then** vede una
   palette cromatica coerente (massimo 3 colori principali + 2 accenti), forme morbide e arrotondate,
   e tipografia leggibile senza sforzo.
2. **Given** il visitatore scorre la pagina, **When** passa da una sezione all'altra, **Then**
   l'identità visiva rimane coerente: stessi colori, stessa tipografia, stesso linguaggio di forme.
3. **Given** il visitatore è su desktop, **When** confronta mobile e desktop, **Then** l'identità
   visiva è identica; cambiano solo proporzioni e layout.

---

### User Story 2 — Sviluppatore: Implementazione Rapida e Coerente (Priority: P2)

Lo sviluppatore (Stefano) deve poter costruire qualsiasi nuova pagina o sezione usando
esclusivamente i componenti e i token del design system, senza dover ogni volta decidere
colori, spaziature o tipografie. Il sistema deve essere la risposta a ogni scelta visiva.

**Why this priority**: Senza un design system documentato e codificato, ogni nuova feature
introduce incoerenze. Il sistema accelera lo sviluppo e garantisce qualità uniforme.

**Independent Test**: Lo sviluppatore costruisce una nuova sezione (es. una card di servizio)
usando solo il design system in meno di 30 minuti, senza consultare materiali esterni.

**Acceptance Scenarios**:

1. **Given** lo sviluppatore deve creare un nuovo componente, **When** consulta il design system,
   **Then** trova valori esatti per colori, font, spaziature, raggi di bordo e shadow — nessuna
   decisione soggettiva necessaria.
2. **Given** un componente esistente va aggiornato nel colore primario, **When** viene modificato
   un solo token, **Then** il cambiamento si propaga automaticamente a tutti i componenti che
   lo usano.
3. **Given** lo sviluppatore deve aggiungere un'animazione, **When** consulta il design system,
   **Then** trova le curve di easing, le durate standard e le linee guida per gli effetti organici.

---

### User Story 3 — Dott.ssa Patti: Riconoscimento del Brand (Priority: P3)

La Dott.ssa Patti vede il sito per la prima volta e si riconosce nel design: i colori, le forme
e l'atmosfera rispecchiano la sua identità professionale e il suo approccio umano alla nutrizione.
Il sito sembra "suo", non generico.

**Why this priority**: L'approvazione del brand da parte della cliente è prerequisito alla
pubblicazione. Un design non allineato all'identità percepita causa rilavorazioni costose.

**Independent Test**: La Dott.ssa Patti valuta una moodboard + componenti campione e dichiara
"questo rappresenta la mia professionalità" senza richiedere modifiche radicali alla palette o
alle forme.

**Acceptance Scenarios**:

1. **Given** la dottoressa vede la palette cromatica proposta, **When** la confronta con il suo
   profilo Instagram e la sua visione professionale, **Then** la percepisce coerente con la sua
   identità — calore, naturalezza, competenza.
2. **Given** la dottoressa vede i componenti tipografici, **When** legge testi campione,
   **Then** li percepisce eleganti, leggibili e professionali.
3. **Given** la dottoressa vede le forme e gli elementi grafici, **When** li confronta con siti
   di riferimento (fabiolapanfili.it per le forme), **Then** conferma che il linguaggio organico
   e morbido rispecchia il suo approccio.

---

### Edge Cases

- Cosa succede se un componente del design system viene usato su uno sfondo diverso da quello
  previsto? → I token di colore DEVONO garantire contrasto WCAG AA (4.5:1) su tutti gli sfondi
  definiti nel sistema.
- Cosa succede se la dottoressa vuole aggiornare il colore primario in futuro? → Il design system
  usa token semantici (es. `color-primary`, non il valore hex diretto), rendendo il rebranding
  un'operazione limitata a pochi token.
- Cosa succede se un browser non supporta una funzionalità CSS avanzata usata per le forme
  organiche? → Il target minimo è: ultimi 2 major versions di Chrome, Firefox, Edge + Safari 16+
  (copertura ~95% utenti italiani). Ogni effetto non supportato da browser fuori target DEVE
  degradare silenziosamente a un fallback visivamente accettabile (es. border-radius semplice
  al posto di clip-path complesso).
- Cosa succede se le immagini della dottoressa non hanno lo stile fotografico previsto dal design
  system? → Il design system definisce linee guida fotografiche (mood, trattamento colore) oltre
  ai soli componenti tecnici.

## Requirements

### Functional Requirements

- **FR-001**: Il design system DEVE definire una palette cromatica completa: colore primario,
  secondario, accento, neutri (almeno 5 toni), colori di feedback (successo, errore, avviso)
  e colori di sfondo. Ogni colore DEVE avere un nome semantico (es. `color-primary-500`) e
  un valore hex/oklch documentato.
- **FR-002**: Il design system DEVE definire una scala tipografica completa: famiglia di font
  per titoli (serif elegante) e per testo corrente (sans-serif leggibile), scale di dimensioni
  (da xs a 5xl), pesi, altezze di riga e spaziature tra lettere per ogni livello semantico
  (heading-1 … heading-6, body-lg, body-md, body-sm, caption, label).
- **FR-003**: Il design system DEVE definire tokens di spaziatura su scala geometrica (4px base:
  4, 8, 12, 16, 24, 32, 48, 64, 96, 128px) usati per padding, margin e gap in modo coerente.
- **FR-004**: Il design system DEVE definire tokens per forme organiche: raggi di bordo da morbido
  a completo (4px, 8px, 16px, 24px, 32px, 9999px), con esattamente 3 blob SVG/CSS distinti:
  `blob-hero` (forma grande e drammatica per il hero della homepage), `blob-frame` (forma per
  incorniciare foto profilo e immagini cibo), `blob-section` (forma sottile per divisori e sfondi
  sezione). Ogni blob DEVE essere riutilizzabile con trasformazioni CSS (scala, rotazione, colore).
- **FR-005**: Il design system DEVE definire un set di ombre (shadows) morbide e coerenti con
  l'estetica organica: nessuna ombra netta o dura; almeno 3 livelli (sm, md, lg) più un livello
  "glow" per effetti di hover su CTA.
- **FR-006**: Il design system DEVE definire tokens per le animazioni: durate standard (fast 150ms,
  normal 300ms, slow 500ms), curve di easing organiche (ease-in-out prevalente), e linee guida
  per scroll-triggered reveals (fade-up, fade-in) con riduzione automatica per utenti con
  `prefers-reduced-motion`.
- **FR-007**: Il design system DEVE includere una libreria di componenti base: Button (varianti:
  primary, secondary, ghost; dimensioni: sm, md, lg), Input, Textarea, Badge, Card, Avatar,
  Divider, e Skeleton loader. Ogni componente DEVE avere stati: default, hover, focus, disabled,
  loading (dove applicabile).
- **FR-008**: Il design system DEVE definire un layout system: colonne (12-colonne su desktop,
  4 su mobile), gutter, max-width del container (1200px), e padding laterale di sicurezza per
  dispositivi piccoli.
- **FR-009**: Il design system DEVE garantire contrasto minimo WCAG 2.1 AA (4.5:1 per testo
  normale, 3:1 per testo grande e componenti UI) su tutte le combinazioni colore/sfondo previste.
- **FR-010**: Il design system DEVE essere documentato in un file di riferimento consultabile
  dallo sviluppatore, con: nome token → valore → esempio visivo (descrizione testuale o
  screenshot). La documentazione DEVE essere accessibile senza avviare il server di sviluppo.

### Key Entities

- **Token di Design**: Unità atomica del sistema (es. `color-primary-500: #7C6B52`). Attributi:
  nome semantico, valore, categoria (color/typography/spacing/radius/shadow/animation), note d'uso.
- **Componente Base**: Elemento UI riutilizzabile costruito su token. Attributi: nome, varianti,
  stati, props di configurazione, linee guida d'uso, anti-pattern.
- **Palette Cromatica**: Insieme organizzato di colori. Include: colori brand, neutri, feedback,
  sfondi. Ogni colore ha scala da 50 a 900 (dove applicabile).
- **Scala Tipografica**: Mappa completa di stili testuali. Include: font family, size, weight,
  line-height, letter-spacing per ogni livello semantico.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Un componente campione (Card di servizio) viene costruito dallo sviluppatore
  usando esclusivamente il design system in ≤ 30 minuti dall'avvio.
- **SC-002**: Tutte le combinazioni testo/sfondo previste passano il check WCAG 2.1 AA
  (contrasto ≥ 4.5:1 per testo normale) verificato con strumento automatico.
- **SC-003**: La Dott.ssa Patti approva la palette cromatica, la tipografia e il linguaggio
  di forme al primo round di revisione (senza richiedere modifiche radicali).
- **SC-004**: Un visitatore del target (donna 25–50 anni) identifica correttamente il tipo
  di sito (nutrizionista/salute) in ≤ 5 secondi dal primo caricamento, su un test con 5 persone
  (≥ 4/5 corrette).
- **SC-005**: Il design system copre il 100% delle decisioni visive necessarie per implementare
  le feature 002–006 senza richiedere token o componenti aggiuntivi non previsti.
- **SC-006**: Le animazioni rispettano `prefers-reduced-motion`: su dispositivi con questa
  preferenza attiva, nessuna animazione viene eseguita.

## Assumptions

- Si assume che la Dott.ssa Patti fornisca almeno 3–5 foto professionali di sé in alta
  risoluzione prima dell'implementazione della homepage (feature 002).
- Si assume che il logo della dottoressa, se esistente, venga fornito in formato SVG o PNG
  ad alta risoluzione; se assente, la firma tipografica sarà il logo del sito.
- La palette cromatica DEVE essere proposta dallo sviluppatore tramite analisi del profilo
  Instagram (nutrizionista.elisapatti) e dei siti di riferimento indicati (fabiolapanfili.it,
  dimperionutrizionista.com), e approvata dalla Dott.ssa Patti prima dell'implementazione.
- Si assume che il design system sia implementato come CSS custom properties (variabili CSS)
  integrate con il framework di styling scelto dalla constitution (Tailwind CSS v4).
- Si assume che la documentazione del design system sia un file Markdown nella directory del
  progetto, non un Storybook o tool separato (scope minimo per questa feature).
- Si assume che le forme "blob" decorative siano generate tramite CSS o SVG inline, non
  tramite immagini rasterizzate, per garantire scalabilità e performance.
- Si assume che il sistema supporti una dark mode in futuro, ma questa non è in scope per v1.
- Il sito è esclusivamente in lingua italiana (`lang="it"`). Nessun supporto multilingue
  previsto. I font DEVONO includere il charset Latin con supporto completo ai caratteri
  accentati italiani (à, è, é, ì, ò, ù). Nessun `hreflang` alternativo necessario.
- I font DEVONO essere self-hosted sul dominio del sito (serviti da Vercel): nessuna
  dipendenza da Google Fonts CDN o altri servizi di terze parti, per conformità GDPR e
  ottimizzazione LCP (`font-display: optional`).

## Clarifications

### Session 2026-04-14

- Q: Come devono essere caricati i font del sito? → A: Self-hosted su Vercel — font scaricati, ottimizzati e serviti dal proprio dominio.
- Q: Da dove partiamo per definire i colori principali? → A: Claude propone palette da analisi Instagram (nutrizionista.elisapatti) + siti di riferimento (fabiolapanfili.it), da approvare con la Dott.ssa Patti.
- Q: Qual è il browser support minimo da garantire? → A: Ultimi 2 major versions di Chrome, Firefox, Edge + Safari 16+ (~95% copertura utenti italiani); fallback silenzioso per browser fuori target.
- Q: Quante varianti di blob shape definire nel design system? → A: 3 blob distinti: blob-hero (hero homepage), blob-frame (foto/avatar), blob-section (divisori e sfondi sezione).
- Q: In quale lingua sarà il sito? → A: Solo italiano (lang="it"); la Dott.ssa opera esclusivamente in Italia. Font con charset Latin completo per caratteri accentati italiani.
