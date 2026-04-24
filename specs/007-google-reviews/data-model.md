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

Configurazione statica della sezione, esportata come `REVIEWS_CONFIG: ReviewsConfig`. Contiene i testi delle recensioni curate e i valori di **fallback** per rating e conteggio (usati solo se Google Places API non è configurata).

```typescript
interface ReviewsConfig {
  averageRating: number   // fallback: usato se GOOGLE_PLACES_API_KEY non è impostata
  totalCount: number      // fallback: usato se GOOGLE_PLACES_API_KEY non è impostata
  googleUrl: string       // URL stabile profilo Google
  reviews: Review[]       // lista recensioni curate da mostrare nel carousel
}
```

### `GooglePlacesStats`

Dati live recuperati server-side da Google Places API. Sovrascrivono i valori di fallback.

```typescript
interface GooglePlacesStats {
  rating: number          // punteggio medio live da Google
  userRatingCount: number // totale recensioni live da Google
}
```

**Flusso dati**:
1. Server Component (`page.tsx`) chiama `getGooglePlacesStats()` → `GooglePlacesStats | null`
2. Passa i risultati come prop a `<ReviewsSection googleStats={...} />`
3. `ReviewsSection` usa `googleStats.rating` se disponibile, altrimenti `REVIEWS_CONFIG.averageRating`

**Env vars richieste**:
- `GOOGLE_PLACES_API_KEY` — chiave API Google Cloud (Places API abilitata)
- `GOOGLE_PLACE_ID` — Place ID del profilo Google della Dott.ssa (es. `ChIJ...`)

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
