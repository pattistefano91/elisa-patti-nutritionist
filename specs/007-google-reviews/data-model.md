# Data Model: Sezione Recensioni Google

**Feature Branch**: `010-google-reviews`
**Generated**: 2026-04-24

---

## Entità

### `Review`

Singola recensione Google, curata manualmente nel data file.

```typescript
interface Review {
  id: string          // slug unico es. "review-maria-r-2025"
  author: string      // nome reale del recensore es. "Maria R."
  rating: 1 | 2 | 3 | 4 | 5  // stelle (solo interi)
  text?: string       // testo recensione (opzionale — alcune recensioni sono solo stelle)
  date: string        // stringa leggibile es. "marzo 2025"
}
```

**Note**: `avatar` non è un campo — viene derivato da `author` a render time (iniziali + colore deterministico dalla palette).

---

### `ReviewsConfig`

Configurazione globale della sezione, esportata come `REVIEWS_CONFIG: ReviewsConfig`.

```typescript
interface ReviewsConfig {
  averageRating: number   // punteggio medio es. 4.9
  totalCount: number      // numero totale recensioni su Google es. 27
  googleUrl: string       // URL stabile profilo Google
  reviews: Review[]       // lista recensioni da mostrare nel carousel
}
```

**Note**: `averageRating` e `totalCount` rispecchiano il valore reale su Google e vengono aggiornati manualmente quando arrivano nuove recensioni.

---

## File

| File | Contenuto |
|------|-----------|
| `src/data/reviews.ts` | `ReviewsConfig`, `Review`, `REVIEWS_CONFIG` |

---

## Placeholder realistico (valori iniziali)

```typescript
export const REVIEWS_CONFIG: ReviewsConfig = {
  averageRating: 5.0,
  totalCount: 8,
  googleUrl: 'https://www.google.com/search?q=Biologa+Nutrizionista+Dott.ssa+Patti+Elisa',
  reviews: [
    {
      id: 'review-01',
      author: 'Alessia M.',
      rating: 5,
      text: 'La Dott.ssa Patti è preparatissima e molto empatica. Mi ha seguita con attenzione e professionalità. Il percorso nutrizionale che mi ha preparato ha cambiato il mio rapporto con il cibo.',
      date: 'febbraio 2025',
    },
    {
      id: 'review-02',
      author: 'Marco T.',
      rating: 5,
      text: 'Finalmente una nutrizionista che ascolta davvero. Nessuna dieta standard, percorso costruito su di me. Consiglio a tutti.',
      date: 'gennaio 2025',
    },
    // ... ulteriori recensioni reali da inserire
  ],
}
```
