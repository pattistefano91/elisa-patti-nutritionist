# Quickstart: Pagina Percorsi Nutrizionali

**Feature Branch**: `015-percorsi-nutrizionali`
**Generated**: 2026-04-28

---

## Scenari di test

### Scenario 1 — Pagina raggiungibile e completa (US1)

```
1. Avvia il dev server: npm run dev
2. Apri http://localhost:3000/percorsi
3. Verifica: titolo hero visibile above the fold
4. Verifica: due CTA nel hero ("Prenota ora" + "Scopri i percorsi")
5. Scorri: vedi 3 card con nome, destinatari, obiettivo, lista benefici
6. Verifica: ogni card ha colore accent diverso (verde / sabbia / terracotta)
7. Verifica: ogni card ha la propria CTA "Prenota consulenza gratuita"
```

### Scenario 2 — Scroll dal hero (US1)

```
1. Clicca "Scopri i percorsi" nel hero
2. Verifica: la pagina scrolla in modo fluido alla griglia delle card
3. (scroll-behavior: smooth già in globals.css — nessun JS necessario)
```

### Scenario 3 — CTA Calendly (US1)

```
1. Clicca "Prenota ora" nel hero O la CTA su una card percorso
2. Verifica: si apre il widget Calendly (popup) per la consulenza gratuita
3. (Richiede lo script Calendly caricato — funziona in produzione o con lo script nel layout)
```

### Scenario 4 — Redirect `/servizi` (FR-008)

```
1. Apri http://localhost:3000/servizi
2. Verifica: redirect automatico a http://localhost:3000/percorsi (status 308 in dev)
```

### Scenario 5 — Navbar aggiornata (FR-001)

```
1. Apri http://localhost:3000
2. Verifica: voce navbar mostra "Percorsi" (non "Servizi")
3. Clicca "Percorsi": porta a /percorsi
```

### Scenario 6 — Aggiunta percorso (US2)

```
1. Apri src/data/percorsi.ts
2. Aggiungi un nuovo oggetto PercorsoNutrizionale all'array PERCORSI
3. Salva il file
4. Verifica: il nuovo percorso appare nella griglia senza modificare altri file
```

### Scenario 7 — Mobile (FR-003, SC-004)

```
1. Apri DevTools → viewport 375px (iPhone SE)
2. Vai su /percorsi
3. Verifica: 1 card per riga, testo leggibile, CTA accessibile senza zoom
4. Verifica: hero visibile completamente, entrambe le CTA accessibili
```

---

## Struttura file prodotta da questa feature

```
src/
├── app/
│   ├── percorsi/
│   │   └── page.tsx                    ← NUOVO — Server Component pagina
│   └── servizi/
│       └── page.tsx                    ← RIMOSSO (redirect via next.config.ts)
├── components/
│   └── sections/
│       └── PercorsiHeroCTA.tsx         ← NUOVO — Client Component CTA hero
└── data/
    └── percorsi.ts                     ← NUOVO — dati percorsi + tipo

next.config.ts                          ← MODIFICATO — aggiunto redirect /servizi→/percorsi
src/data/navigation.ts                  ← MODIFICATO — "Servizi"→"Percorsi", /servizi→/percorsi
```
