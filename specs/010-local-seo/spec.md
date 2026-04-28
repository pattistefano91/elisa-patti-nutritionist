# Feature Specification: SEO Locale per Nutrizionista

**Feature Branch**: `017-local-seo`
**Created**: 2026-04-28
**Status**: Draft

## Contesto

La Dott.ssa Elisa Patti è una Biologa Nutrizionista con sede a **Civitanova Marche (MC)**, provincia di Macerata, regione Marche. L'obiettivo è far apparire il sito nelle ricerche Google di persone che cercano un nutrizionista nella zona (Civitanova Marche, Porto Recanati, Recanati, Macerata, Porto San Giorgio, Fermo, Ancona) o in tutta la regione Marche.

## User Scenarios & Testing

### User Story 1 - Dati strutturati JSON-LD (Priority: P1)

Google legge i dati strutturati (Schema.org) per capire chi è il professionista, dove opera e cosa offre. Senza questi dati Google non può mostrare rich snippet (stelle, indirizzo, orari) nei risultati di ricerca.

**Why this priority**: I dati strutturati sono il segnale SEO locale più diretto e impattante per un professionista sanitario. Senza, Google non sa che il sito appartiene a una nutrizionista di Civitanova Marche.

**Independent Test**: Validare il JSON-LD con il tool di Google Rich Results Test — deve passare senza errori per il tipo `LocalBusiness` e `Person`.

**Acceptance Scenarios**:

1. **Given** la homepage del sito, **When** Google la scansiona, **Then** trova un blocco JSON-LD con schema `LocalBusiness` contenente nome, indirizzo, telefono, categoria professionale e area geografica servita
2. **Given** qualsiasi pagina del sito, **When** Google la scansiona, **Then** trova un blocco JSON-LD con schema `Person` che identifica la Dott.ssa Elisa Patti come professionista sanitaria
3. **Given** le pagine interne (`/about`, `/percorsi`), **When** Google le scansiona, **Then** trova un `BreadcrumbList` che descrive la gerarchia di navigazione

---

### User Story 2 - Meta description ottimizzate con keyword locali (Priority: P2)

Ogni pagina del sito deve avere un `<title>` e una `<meta description>` ottimizzati con le keyword più cercate localmente.

**Why this priority**: Il title e la meta description sono i testi che Google mostra nei risultati — influenzano direttamente il click-through rate.

**Independent Test**: Ispezionare il sorgente HTML di ogni pagina e verificare che title e description contengano keyword locali rilevanti.

**Acceptance Scenarios**:

1. **Given** la homepage, **When** appare nei risultati Google, **Then** il title contiene "Civitanova Marche" e "nutrizionista" e la description invita all'azione
2. **Given** la pagina `/percorsi`, **When** appare nei risultati Google, **Then** il title e la description descrivono i percorsi nutrizionali con riferimento geografico
3. **Given** la pagina `/about`, **When** appare nei risultati Google, **Then** title e description presentano Elisa come professionista locale di fiducia

---

### User Story 3 - URL canonici e metadataBase corretti (Priority: P3)

Il sito deve dichiarare il dominio definitivo `nutrizionistaelisapatti.it` come base per tutti gli URL canonici, evitando contenuto duplicato tra il dominio Vercel e quello custom.

**Why this priority**: Senza canonical corretto, Google potrebbe indicizzare `elisa-patti-nutritionist.vercel.app` invece del dominio custom, dividendo l'autorità SEO.

**Independent Test**: Controllare nel sorgente HTML che ogni pagina abbia un tag `<link rel="canonical">` con URL che inizia con `https://nutrizionistaelisapatti.it`.

**Acceptance Scenarios**:

1. **Given** qualsiasi pagina del sito, **When** Google la scansiona, **Then** il canonical URL punta a `nutrizionistaelisapatti.it` e non al dominio Vercel
2. **Given** il file `layout.tsx`, **When** viene aggiornato il `metadataBase`, **Then** tutti i meta tag open graph e twitter card usano il dominio corretto

---

### Edge Cases

- La Dott.ssa non ha ancora un numero di telefono pubblico sul sito — il JSON-LD deve gestire campi opzionali senza rompersi
- Il sito è statico lato contenuto — i dati strutturati possono essere hardcodati senza fetch dinamici
- Se in futuro viene aggiunto Google Business Profile, i dati JSON-LD devono essere coerenti con quelli del profilo

## Requirements

### Functional Requirements

- **FR-001**: La homepage DEVE contenere un componente JSON-LD con schema `LocalBusiness` + `MedicalBusiness` che include: nome, descrizione, indirizzo (Civitanova Marche MC), areaServed (Marche e province limitrofe), priceRange, url, email
- **FR-002**: Il layout globale DEVE contenere un componente JSON-LD con schema `Person` per identificare Elisa Patti come professionista sanitaria (biologa nutrizionista)
- **FR-003**: Le pagine interne (`/about`, `/percorsi`) DEVONO avere un JSON-LD `BreadcrumbList`
- **FR-004**: Il `metadataBase` in `layout.tsx` DEVE essere aggiornato da `https://elisapatti.it` a `https://nutrizionistaelisapatti.it`
- **FR-005**: Il title della homepage DEVE includere "Civitanova Marche" e "nutrizionista"
- **FR-006**: Ogni pagina DEVE avere una `description` unica ottimizzata con keyword locali
- **FR-007**: I dati strutturati DEVONO essere iniettati tramite il componente Next.js `<Script type="application/ld+json">` o tramite tag `<script>` nel `<head>` usando l'API Metadata di Next.js

### Key Entities

- **LocalBusiness**: nome, indirizzo, città, provincia, CAP, regione, email, url, categoria, areaServed
- **Person**: nome, jobTitle, url, worksFor (riferimento al LocalBusiness)
- **BreadcrumbList**: gerarchia pagina corrente rispetto alla homepage

## Success Criteria

### Measurable Outcomes

- **SC-001**: Il Rich Results Test di Google valida il JSON-LD senza errori critici
- **SC-002**: Ogni pagina ha title e description unici con almeno una keyword locale (es. "Civitanova Marche", "Marche", "nutrizionista")
- **SC-003**: Il canonical URL di ogni pagina punta al dominio `nutrizionistaelisapatti.it`
- **SC-004**: Nessuna regressione visiva — i dati strutturati sono invisibili all'utente

## Assumptions

- Il numero di telefono non è ancora pubblico — il campo viene omesso dal JSON-LD (non obbligatorio)
- Il CAP di Civitanova Marche è 62012
- L'area geografica servita include: Civitanova Marche, Macerata, Porto Recanati, Recanati, Porto San Giorgio, Fermo, Ancona e tutta la regione Marche
- Google Business Profile non è ancora configurato — non è richiesto da questa feature ma è consigliato come passo successivo
- I dati strutturati sono statici e hardcodati — non richiedono fetch o CMS
