# Tasks: Sezione Recensioni Google

**Input**: Design documents from `specs/007-google-reviews/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ quickstart.md ✅

**Totale task**: 12 | **Paralleli**: 4 | **MVP**: Phase 1–3 (T001–T007)

---

## Phase 1: Setup

**Purpose**: Installare la dipendenza Embla Carousel (bloccante per tutto il carousel)

- [x] T001 Install embla-carousel-react and embla-carousel-autoplay via npm (package.json)

**Checkpoint**: `node_modules/embla-carousel-react` presente, TypeScript types disponibili

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data layer — tipi e dati recensioni. Necessario prima di qualsiasi componente.

⚠️ **CRITICAL**: nessuna implementazione UI può iniziare finché questo phase non è completo

- [x] T002 Create `Review` and `ReviewsConfig` TypeScript interfaces in `src/data/reviews.ts`
- [x] T003 Populate `REVIEWS_CONFIG` export in `src/data/reviews.ts` with 5 realistic placeholder reviews (author, rating 5, text, date), averageRating: 5.0, totalCount: 8, googleUrl stable

**Checkpoint**: `src/data/reviews.ts` esporta `REVIEWS_CONFIG` correttamente tipizzato, `npx tsc --noEmit` passa

---

## Phase 3: User Story 1 — Carousel autoplay con badge rating (Priority: P1) 🎯 MVP

**Goal**: Sezione homepage visibile con badge punteggio, carousel auto-scroll, stelle, testo, link Google

**Independent Test**: Aprire `http://localhost:3000`, scorrere alla sezione recensioni, verificare: badge "5.0 ⭐ · 8 recensioni", almeno 3 card visibili su desktop, scorrimento automatico ogni ~4.5s, link "Vedi su Google" apre nuova tab

### Implementazione User Story 1

- [x] T004 [US1] Create `StarRating` component (5 SVG stars, filled/empty based on integer rating, `var(--color-secondary-400)` color) in `src/components/sections/ReviewsSection.tsx`
- [x] T005 [US1] Create `ReviewCard` component: avatar circle with initials + deterministic color from `var(--color-primary-100/secondary-100/accent-100)`, `StarRating`, text truncated to 200 chars with "…", author name, date in `src/components/sections/ReviewsSection.tsx`
- [x] T006 [US1] Implement `ReviewsCarousel` with Embla Carousel: `useEmblaCarousel` + `Autoplay({ delay: 4500, stopOnMouseEnter: true, stopOnInteraction: false })`, responsive `flex-basis` (100% mobile / 50% tablet `md:` / 33.33% desktop `lg:`), infinite loop in `src/components/sections/ReviewsSection.tsx`
- [x] T007 [US1] Create and export `ReviewsSection`: section header with average rating badge + "N recensioni su Google", `ReviewsCarousel`, "Vedi su Google" link (`target="_blank" rel="noopener noreferrer"`), Framer Motion `whileInView` reveal `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }` `viewport={{ once: true }}` in `src/components/sections/ReviewsSection.tsx`

**Checkpoint**: sezione visibile sulla homepage (dopo T010), carousel auto-scroll funzionante, badge rating corretto, link Google attivo

---

## Phase 4: User Story 2 — Navigazione manuale (Priority: P2)

**Goal**: Frecce prev/next e dot indicator per navigazione esplicita tra le recensioni

**Independent Test**: Cliccare freccia "→" avanza alla card successiva; cliccare "←" torna alla precedente; dall'ultima card "→" ritorna alla prima (ciclo); dot indicator evidenzia la posizione corrente

### Implementazione User Story 2

- [x] T008 [US2] Add prev/next arrow buttons to `ReviewsCarousel` using `emblaApi.scrollPrev()` / `emblaApi.scrollNext()`, disable when not available, styled as icon buttons `rounded-full` with `var(--color-primary-600)` in `src/components/sections/ReviewsSection.tsx`
- [x] T009 [US2] Add dot indicators below carousel: one dot per slide group, active dot styled `var(--color-primary-600)`, inactive `var(--color-neutral-300)`, click on dot scrolls to that position in `src/components/sections/ReviewsSection.tsx`

**Checkpoint**: frecce e dot visibili, navigazione manuale funzionante, scorrimento ciclico confermato

---

## Phase 5: Polish & Integrazione

**Purpose**: Wiring homepage, accessibilità, type check finale

- [x] T010 Add `<ReviewsSection />` import and render in `src/app/page.tsx` between `<ServicesSection />` and `<ContactSection />`, with `<Divider />` separators
- [x] T011 [P] Run `npx tsc --noEmit` and resolve any TypeScript errors in `src/components/sections/ReviewsSection.tsx` and `src/data/reviews.ts`
- [x] T012 [P] Verify responsive layout in browser DevTools: 375px → 1 card, 768px → 2 card, 1280px → 3 card; verify keyboard navigation (Tab/Enter/Space on prev/next buttons); verify `aria-label` on arrows and section; check Embla bundle in Network tab (≤ 15kb gzipped)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Nessuna dipendenza — inizia subito
- **Phase 2 (Foundational)**: Dipende da Phase 1 — **blocca tutte le storie**
- **Phase 3 (US1)**: Dipende da Phase 2 — MVP autonomo
- **Phase 4 (US2)**: Dipende da Phase 3 — aggiunta su componente esistente
- **Phase 5 (Polish)**: Dipende da Phase 3 (minimum); Phase 4 opzionale prima di T010

### Parallel Opportunities

- T002 è sequenziale in Phase 2 (T003 dipende da T002 — stesso file)
- T011 e T012 sono indipendenti (type check vs visual check) — paralleli

---

## Parallel Example: Phase 3 (US1)

```bash
# T004 e T005 sono sub-componenti dello stesso file — sequenziali per evitare conflitti
# T006 dipende da T004 (StarRating usato in ReviewCard) e T005 (ReviewCard usato nel carousel)
# T007 dipende da T006 (contiene ReviewsCarousel)
Ordine: T004 → T005 → T006 → T007
```

---

## Implementation Strategy

### MVP First (Phase 1–3, T001–T007)

1. Installa Embla (T001)
2. Crea data file (T002–T003)
3. Costruisci componente con autoplay (T004–T007)
4. Integra in homepage (T010)
5. **STOP e VALIDA**: carousel visibile, autoplay funzionante, badge rating corretto

### Incremental Delivery

1. MVP (US1) → sezione recensioni funzionante con autoplay
2. Aggiungi US2 (T008–T009) → navigazione manuale completa
3. Polish (T011–T012) → type check + responsive check → PR

---

## Phase 6: Enhancement — Auto-fetch testi recensioni da Google Places API

**Goal**: Estendere `getGooglePlacesStats()` per recuperare automaticamente anche i testi delle recensioni, eliminando la necessità di aggiornamento manuale

**Independent Test**: Con API configurata il carousel mostra recensioni reali da Google; senza API mostra il fallback statico

- [x] T013 [P] Extend `getGooglePlacesStats()` in `src/lib/googlePlaces.ts`: add `reviews` to `fields` param, add `&language=it`, parse `rawReviews` array → `Review[]` mapping (`author_name`, `rating`, `text`, `relative_time_description`, `time`), add `reviews: Review[]` to `GooglePlacesStats` interface; update `ReviewsSection.tsx` to use `googleStats.reviews` when non-empty, fallback to `REVIEWS_CONFIG.reviews`

**Checkpoint**: `npx tsc --noEmit` passa; con API configurata il carousel mostra recensioni reali; senza API mostra le 8 recensioni fallback di `reviews.ts`

---

## Notes

- Non sono richiesti test automatici per questa feature (componente visivo/statico)
- Google Places API restituisce al massimo 5 recensioni, selezionate per rilevanza — non è possibile ottenere tutte le 38
- `stopOnInteraction: false` su Embla Autoplay: il carousel riprende dopo click/swipe manuale
- L'avatar color è deterministico (`author.charCodeAt(0) % palette.length`) — nessuna dipendenza esterna
- Il fallback statico in `reviews.ts` è ancora necessario per ambienti senza API configurata (sviluppo locale, preview deploy)
