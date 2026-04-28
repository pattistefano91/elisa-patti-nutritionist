# Tasks: Pagina Percorsi Nutrizionali

**Input**: Design documents from `specs/008-percorsi-nutrizionali/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅

---

## Phase 1: Setup

**Purpose**: Nessuna nuova dipendenza npm necessaria. Il progetto è già configurato.

- [x] T001 Verifica branch `015-percorsi-nutrizionali` attivo e aggiornato da `main`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Dati, navigazione e redirect devono essere pronti prima di implementare la pagina.

**⚠️ CRITICAL**: La pagina `/percorsi` dipende dal file dati. La navbar e il redirect sono indipendenti tra loro ma devono essere coerenti prima del deploy.

- [x] T002 Crea `src/data/percorsi.ts` — tipo `ColoreAccent`, interfaccia `PercorsoNutrizionale`, array `PERCORSI` con i 3 percorsi iniziali (dati da `data-model.md`)
- [x] T003 [P] Aggiorna `src/data/navigation.ts` — voce "Servizi" → label `"Percorsi"`, href `"/percorsi"`
- [x] T004 [P] Aggiorna `next.config.ts` — aggiungi `redirects: async () => [{ source: '/servizi', destination: '/percorsi', permanent: true }]`

**Checkpoint**: `src/data/percorsi.ts` esiste con i 3 percorsi, navbar punta a `/percorsi`, redirect configurato

---

## Phase 3: User Story 1 — Visitatore scopre i percorsi (Priority: P1) 🎯 MVP

**Goal**: Pagina `/percorsi` completa e funzionante con hero, griglia card e CTA Calendly

**Independent Test**: Aprire `http://localhost:3000/percorsi` — hero visibile, 3 card con dati completi e colori distinti, CTA funzionanti

- [x] T005 [US1] Crea `src/components/sections/PercorsiHeroCTA.tsx` — `'use client'`, bottone "Prenota ora" (apre Calendly con `SERVICES_CTA_URL`), link `<a href="#percorsi">Scopri i percorsi</a>`, stesso pattern di `HeroCTA.tsx`
- [x] T006 [US1] Crea `src/app/percorsi/page.tsx` — Server Component con metadata SEO, sezione hero (usa `PercorsiHeroCTA`), sezione griglia con `id="percorsi"`, `COLOR_MAP` per token → CSS custom properties, card per ogni percorso con: nome (H2), destinatari, obiettivo, lista benefici, CTA Calendly; griglia responsive `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

**Checkpoint**: US1 completamente funzionante e testabile indipendentemente

---

## Phase 4: User Story 2 — Gestione dati percorsi (Priority: P2)

**Goal**: Architettura data-driven verificata — aggiungere un percorso richiede solo modifica al file dati

**Independent Test**: Aggiungere un quarto percorso in `src/data/percorsi.ts` → appare automaticamente nella griglia

> **Nota**: US2 è soddisfatta dall'architettura implementata in T002 + T006. Non richiede task di codice aggiuntivi. Il task qui è di verifica.

- [x] T007 [US2] Verifica data-driven: aggiungi temporaneamente un percorso di test in `src/data/percorsi.ts`, conferma che appare nella pagina, poi rimuovilo

**Checkpoint**: US1 e US2 entrambe funzionanti

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T008 [P] Verifica redirect: `http://localhost:3000/servizi` → `http://localhost:3000/percorsi`
- [x] T009 Elimina `src/app/servizi/page.tsx` — solo dopo aver verificato il redirect in T008
- [x] T010 [P] Type check: `npx tsc --noEmit` — nessun errore
- [x] T011 Valida scenari quickstart.md: percorre i 7 scenari di test manualmente in dev

---

## Dependencies & Execution Order

- **Phase 1 → Phase 2**: T001 prima di tutto
- **Phase 2 → Phase 3**: T002 deve essere completo prima di T006 (page.tsx importa `PERCORSI`); T003 e T004 sono paralleli tra loro
- **T005 → T006**: `PercorsiHeroCTA` deve esistere prima di essere importato in `page.tsx`
- **Phase 3 → Phase 4**: T006 prima di T007 (verifica)
- **Phase 5**: dopo US1 e US2 completate; T009 dopo T008 (redirect verificato prima di eliminare il file)

### Parallel Opportunities

```
Phase 2:  T002 (data) → poi T003 + T004 in parallelo
Phase 3:  T005 → T006 (sequenziale, dipendenza diretta)
Phase 5:  T009 + T010 in parallelo
```

---

## Implementation Strategy

### MVP (US1 — 5 task core)

1. T001 → T002 → T003+T004 (paralleli) → T005 → T006
2. **STOP e valida**: apri `/percorsi`, verifica hero + 3 card + CTA
3. Deploy/demo

### Full Delivery

1. MVP completato
2. T007 (verifica US2)
3. T008–T011 (polish)

---

## Notes

- Nessun test automatico — componente visivo/statico (coerente con pattern del progetto)
- `PercorsiHeroCTA.tsx` è Client Component solo per il bottone Calendly; il link anchor è HTML puro
- Il `COLOR_MAP` vive nel componente card in `page.tsx` — non nei dati
- `scroll-behavior: smooth` già in `globals.css` — il link `#percorsi` funziona senza JS aggiuntivo
- Calendly URL: usa `SERVICES_CTA_URL` già esportato da `src/data/services.ts`
