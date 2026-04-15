# Tasks: Sezione Contatti

**Feature Branch**: `003-sezione-contatti`
**Input**: [spec.md](spec.md) · [plan.md](plan.md) · [data-model.md](data-model.md) · [contracts/](contracts/)
**Totale task**: 8 · **Paralleli**: 5 · **User Stories**: 2

---

## Phase 1: Setup — Infrastruttura condivisa

**Purpose**: File dati pronto prima di qualsiasi componente.
**⚠️ BLOCCA entrambe le user story** — completare prima di procedere.

- [x] T001 Creare `src/data/contact.ts` — definire interfacce `ContactInfo` e `Location`; esportare `CONTACT: ContactInfo` (placeholder: email, phone E.164, phoneDisplay, instagramUrl, instagramHandle) e `LOCATIONS: Location[]` (almeno 1 entry placeholder con id, name?, address, city, cap, province, googleMapsUrl); seguire stessa convenzione di `src/data/services.ts`

**Checkpoint**: `npx tsc --noEmit` pulito. I placeholder sono nel codice, sostituibili senza toccare i componenti.

---

## Phase 2: User Story 1 — Visitatore trova i recapiti (Priority: P1) 🎯 MVP

**Goal**: Sezione visibile con email cliccabile, telefono click-to-call, link Instagram.

**Independent Test**: Aprire `localhost:3000` su 375px. La sezione "Contatti" deve essere visibile.
Toccare il numero di telefono apre il dialer (su mobile). Toccare email apre il client email.
Toccare Instagram apre il profilo in nuova tab.

- [x] T002 [P] [US1] Creare `src/components/sections/ContactSection.tsx` — server component (no `'use client'`); import `CONTACT` da `@/data/contact`; heading sezione "Contatti" (text-heading-2); griglia `grid lg:grid-cols-2 gap-12`; colonna sinistra con 3 link: `<a href="mailto:...">` (aria-label "Invia email a ..."), `<a href="tel:...">` (aria-label "Chiama Dott.ssa Elisa Patti al ..."), `<a href="... instagram..." target="_blank" rel="noopener noreferrer">` (aria-label "Profilo Instagram ... apre nuova tab"); icone decorative testuali (✉️ 📞 📸); usa `Container` da `@/components/ui`
- [x] T003 [US1] Aggiungere `<ContactSection />` in `src/app/page.tsx` — inserire dopo `<ServicesSection />` separato da `<Divider />`

**Checkpoint**: Aprire `localhost:3000`. Dopo la sezione servizi compare la sezione contatti.
Su mobile, click su telefono apre dialer. Click su email apre client email. User Story 1 MVP completa.

---

## Phase 3: User Story 2 — Visitatore individua lo studio (Priority: P2)

**Goal**: Colonna destra con tutte le location, indirizzo completo e link Google Maps per ognuna.

**Independent Test**: Nella sezione contatti deve essere visibile almeno una location card con
indirizzo e link "Apri in Google Maps". Cliccando il link si apre Google Maps con l'indirizzo.
Se `LOCATIONS` è array vuoto, la colonna destra non viene renderizzata (griglia a 1 colonna).

- [x] T004 [US2] Aggiungere `LocationCard` inline e colonna destra in `src/components/sections/ContactSection.tsx` — import `LOCATIONS` da `@/data/contact`; heading colonna destra "Dove trovarmi" (text-heading-4); se `LOCATIONS.length === 0` non renderizzare la colonna destra (griglia torna 1 colonna automaticamente); per ogni location: `Card variant="default" shadow="sm"` con nome studio (se presente), indirizzo formattato (`address`, `city (province)`, `CAP`), link "Apri in Google Maps" con `target="_blank" rel="noopener noreferrer"` e `aria-label="Apri indirizzo ... in Google Maps"`

**Checkpoint**: La sezione mostra le location card con indirizzo e link Maps. Su mobile le colonne
sono impilate (recapiti sopra, location sotto). Con `LOCATIONS = []` la griglia è a 1 colonna.

---

## Phase 4: Polish & Accessibilità

**Purpose**: Qualità trasversale, test aggiornati, documentazione.

- [x] T005 [P] Verificare WCAG AA con axe — avviare `npm run dev`, aprire `localhost:3000`, eseguire `npx playwright test`; correggere eventuali violazioni di contrasto o accessibilità nella sezione contatti (controllare in particolare i link con aria-label e il contrasto dei link hover)
- [x] T006 [P] Aggiornare `tests/smoke.spec.ts` — aggiungere test: (1) la sezione contatti è visibile (`page.getByText('Contatti').toBeVisible()`); (2) è presente un link con `href` che inizia con `mailto:`; (3) è presente un link con `href` che inizia con `tel:`
- [x] T007 [P] Aggiornare `CLAUDE.md` — aggiungere alla struttura `src/`: `src/data/contact.ts` (dati contatto, location, tipi) e `src/components/sections/ContactSection.tsx` (sezione contatti homepage)
- [ ] T008 [P] Commit e push branch `003-sezione-contatti` — verificare che `npx tsc --noEmit` e `npm run build` passino; push su GitHub per deploy preview Vercel

---

## Dipendenze & Ordine di Esecuzione

### Dipendenze tra fasi

- **Phase 1 (Setup)**: nessuna dipendenza — inizia subito
- **Phase 2 (US1)**: dipende da Phase 1 completa — BLOCCA
- **Phase 3 (US2)**: dipende da Phase 2 (ContactSection deve esistere per aggiungere LocationCard)
- **Phase 4 (Polish)**: dipende da tutte le fasi precedenti

### Dipendenze interne

- **US1**: T002 [P] → T003 sequenziale (T003 importa ContactSection da T002)
- **US2**: T004 sequenziale (modifica lo stesso file di T002)
- **Polish**: T005 [P] + T006 [P] + T007 [P] + T008 [P] tutti in parallelo

### Opportunità di parallelismo

- T002 (Phase 2, US1) — nuovo file, parallelo rispetto a eventuali altri task
- T005, T006, T007, T008 (Phase 4) — tutti file diversi, tutti in parallelo

---

## Strategia di Implementazione

### MVP: Solo User Story 1

1. Phase 1: T001 (setup dati)
2. Phase 2: T002 → T003 (componente + integrazione in page)
3. **STOP e VALIDA**: Sezione visibile, email/tel/Instagram funzionanti?
4. Se sì → deploy preview Vercel per feedback Dott.ssa

### Consegna Incrementale

1. Setup (T001) → dati pronti
2. US1 (T002–T003) → recapiti cliccabili **→ MVP dimostrabile**
3. US2 (T004) → location con Google Maps
4. Polish (T005–T008) → qualità, test, deploy

### Note

- `ContactSection.tsx` è un **server component** (nessun `onClick`) — nessun `'use client'` necessario
- I placeholder in `contact.ts` vengono sostituiti con i dati reali della Dott.ssa senza toccare i componenti
- T002 è marcato `[P]` perché crea un file nuovo: non dipende da nulla nella sua fase
- La griglia a 2 colonne si "rompe" automaticamente a 1 colonna se `LOCATIONS` è vuoto (nessun codice condizionale sul layout, solo sulla colonna destra)
