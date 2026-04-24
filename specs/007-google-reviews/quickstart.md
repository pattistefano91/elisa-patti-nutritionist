# Quickstart: Sezione Recensioni Google

**Feature Branch**: `010-google-reviews`
**Generated**: 2026-04-24

---

## Scenari di test manuali

### Scenario 1 — Carousel autoplay (P1)

1. Aprire `http://localhost:3000`
2. Scorrere fino alla sezione "Cosa dicono i pazienti"
3. Attendere 4-5 secondi senza interazione
4. **Atteso**: le card avanzano automaticamente in modo fluido

### Scenario 2 — Hover pause

1. Aprire la sezione recensioni
2. Portare il cursore sopra una card del carousel
3. **Atteso**: il carousel si ferma finché il cursore è sulla sezione
4. Allontanare il cursore
5. **Atteso**: il carousel riprende automaticamente

### Scenario 3 — Navigazione manuale (P2)

1. Cliccare la freccia "avanti" (→)
2. **Atteso**: avanza alla card successiva
3. Cliccare la freccia "indietro" (←)
4. **Atteso**: torna alla card precedente
5. Arrivare all'ultima card e cliccare ancora "avanti"
6. **Atteso**: torna alla prima card (scorrimento ciclico)

### Scenario 4 — Link Google

1. Cliccare "Vedi su Google"
2. **Atteso**: si apre una nuova tab con la ricerca Google della Dott.ssa Patti
3. Verificare che la pagina Google mostri il Knowledge Panel con le recensioni

### Scenario 5 — Mobile (375px)

1. Aprire DevTools → simulare iPhone SE (375px)
2. Navigare alla sezione recensioni
3. **Atteso**: visibile 1 card alla volta, leggibile senza zoom
4. Swipe orizzontale sulla card
5. **Atteso**: passa alla card successiva/precedente

### Scenario 6 — Badge rating

1. Verificare che il badge mostri il punteggio medio corretto (es. "5.0 ⭐")
2. Verificare che mostri il numero totale di recensioni
3. **Atteso**: coerente con i valori in `src/data/reviews.ts`

---

## Come aggiornare le recensioni

Per aggiungere una nuova recensione, modificare `src/data/reviews.ts`:

```typescript
{
  id: 'review-XX',          // ID univoco
  author: 'Nome C.',        // Nome + iniziale cognome
  rating: 5,                // 1–5 stelle
  text: 'Testo recensione', // Facoltativo
  date: 'aprile 2025',      // Mese + anno
}
```

Per aggiornare il punteggio medio e il totale:
```typescript
averageRating: 5.0,   // aggiornare con il valore attuale da Google
totalCount: 12,       // aggiornare con il numero attuale da Google
```
