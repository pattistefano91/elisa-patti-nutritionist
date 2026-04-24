# Research: Sezione Recensioni Google

**Feature Branch**: `010-google-reviews`
**Generated**: 2026-04-24

---

## Decision 1: Libreria carousel — Embla vs CSS Scroll Snap vs Framer Motion custom

**Decision**: Embla Carousel (`embla-carousel-react` + `embla-carousel-autoplay`)

**Rationale**: Il carousel richiede tre funzionalità non banali da implementare da zero: (1) scorrimento infinito/ciclico, (2) autoplay con pausa su hover/touch, (3) swipe nativo su mobile. CSS Scroll Snap nativo non gestisce autoplay né infinite loop senza JS custom. Framer Motion da zero per un carousel infinito richiede logica di clonazione nodi e gestione indici complessa — troppo per questo scope (violazione YAGNI). Embla Carousel è la libreria minima che risolve tutti e tre i requisiti con 12kb gzipped, ha React bindings ufficiali, è usata da shadcn/ui e ha ottimo supporto touch. Coesiste perfettamente con Framer Motion già presente nel progetto (Framer gestirà le animazioni di reveal sezione, Embla gestisce il carousel).

**Alternatives considered**:
- CSS Scroll Snap puro → nessun autoplay, nessun infinite loop senza JS aggiuntivo
- Swiper.js → ~40kb, overkill per questo use case
- Framer Motion drag custom → molto complesso, fragile per infinite loop, YAGNI violato
- Keen Slider → alternativa valida ma meno documentata di Embla

---

## Decision 2: Fonte dati recensioni — dati statici vs Google Places API vs embed nativo

**Decision**: File statico `src/data/reviews.ts` con dati curati manualmente

**Rationale**: L'embed nativo Google (widget Places o iframe) carica script di tracking Google senza consenso esplicito dell'utente — violazione diretta del Principio V (GDPR). Google Places API richiede backend (chiave API segreta), Google Cloud account, billing abilitato e latenza di rete aggiuntiva — violazione Principio VII (YAGNI) e Principio IV (performance). Il file statico è coerente con il pattern di tutto il progetto (`contact.ts`, `services.ts`, `about.ts`) e permette aggiornamenti senza dipendenze esterne. Svantaggio: aggiornamento manuale. Mitigazione: la struttura dati è identica a ciò che Sanity fornirebbe, rendendo la migrazione futura una sostituzione 1:1 dell'import.

**Alternatives considered**:
- Google Places API → richiede backend + API key + costi, violazione YAGNI e IV
- Google Embed iframe → carica tracker Google, violazione GDPR (Principio V)
- Widget di terze parti (Trustpilot, Elfsight) → iframe con tracker, GDPR + performance

---

## Decision 3: URL Google stabile per "Vedi su Google"

**Decision**: `https://www.google.com/search?q=Biologa+Nutrizionista+Dott.ssa+Patti+Elisa`

**Rationale**: L'URL fornito nella feature request contiene parametri di sessione (`sxsrf`, `sca_esv`, `uds`) che scadono e cambiano ad ogni sessione. L'URL di ricerca pulito con solo il parametro `q` è stabile, funziona su tutti i dispositivi e porta direttamente al Knowledge Panel Google della Dott.ssa con le recensioni visibili.

**Alternatives considered**:
- URL con parametri di sessione originale → scade, non affidabile
- Google Maps short URL (`maps.app.goo.gl/...`) → richiede il Place ID, non disponibile senza accesso all'account Google My Business

---

## Decision 4: Avatar recensori — initials vs immagini vs nessun avatar

**Decision**: Avatar con initials (prima lettera nome + prima lettera cognome) su sfondo colorato deterministico

**Rationale**: Le foto profilo dei recensori Google non sono accessibili via API pubblica senza violazioni ToS. Mostrare placeholder grigi è freddo. Le initials su sfondo colorato (colore derivato dall'hash del nome, palette coerente con design system) sono il pattern usato da Gmail, Google stessa, e tutte le app moderne. Professionale, caldo, zero immagini esterne, zero privacy issues.

**Implementation**: Colore sfondo selezionato da array di 6 tonalità della palette del sito (primary-100, secondary-100, accent-100, ecc.) tramite `authorName.charCodeAt(0) % palette.length`.

**Alternatives considered**:
- Immagini profilo Google → non accessibili, violazione ToS
- Placeholder grigio generico → impersonale, poco caldo
- Nessun avatar → card visivamente meno ricche

---

## Decision 5: Animazione reveal sezione

**Decision**: Framer Motion `whileInView` per animazione di ingresso della sezione, Embla per il carousel

**Rationale**: Framer Motion è già nel progetto. Un reveal animato (`opacity: 0 → 1`, `y: 20 → 0`) al momento in cui la sezione entra nel viewport migliora la percezione di professionalità senza impatto sulle Core Web Vitals (l'animazione avviene dopo il LCP). Responsabilità separate: Framer gestisce entry animation, Embla gestisce carousel motion.

**Alternatives considered**:
- CSS `@keyframes` puro → funziona ma meno controllo su `whileInView` / intersection observer
- Nessuna animazione → meno professionale, spec richiede "più professionale possibile"
