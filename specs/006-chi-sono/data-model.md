# Data Model: Pagina Chi sono

**Feature Branch**: `006-chi-sono`
**Generated**: 2026-04-16

---

## Entità

### `AboutContent`

Root entity esportata da `src/data/about.ts` come `ABOUT_CONTENT: AboutContent`.

```typescript
interface AboutContent {
  bio: string                      // Paragrafo di presentazione biografica
  photo: PhotoInfo                 // Immagine portrait
  philosophy: PhilosophyValue[]    // 3-4 valori/principi nutrizionali
  credentials: Credential[]        // Percorso formativo (laurea, master, ecc.)
  albo: AlboInfo                   // Iscrizione all'albo professionale
}
```

---

### `PhotoInfo`

```typescript
interface PhotoInfo {
  src: string    // Path relativo da /public, es. "/images/dottoressa/elisa-patti-studio-1.jpg"
  alt: string    // Testo alternativo accessibile
  width: number  // Larghezza originale px (per next/image)
  height: number // Altezza originale px (per next/image)
}
```

**Validazione**: `src` deve iniziare con `/images/`; `width` e `height` > 0.

---

### `PhilosophyValue`

```typescript
interface PhilosophyValue {
  icon: string        // Emoji o simbolo decorativo (es. "🌿", "❤️")
  title: string       // Titolo breve del principio (es. "Approccio personalizzato")
  description: string // Descrizione breve 1-2 frasi
}
```

**Constraint**: array di 3-4 elementi; non estendere oltre 5 senza revisione layout.

---

### `Credential`

```typescript
interface Credential {
  year: string        // Anno conseguimento (es. "2018")
  title: string       // Titolo del percorso (es. "Laurea Magistrale in Biologia")
  institution: string // Istituto (es. "Università di Bologna")
}
```

**Ordinamento**: discendente per anno (più recente prima).

---

### `AlboInfo`

```typescript
interface AlboInfo {
  order: string  // "Albo dei Biologi dell'Emilia Romagna e delle Marche"
  number: string // "Sezione A n. 5404"
}
```

**Note**: Questi dati sono già presenti in `src/data/professional.ts` (`PROFESSIONAL.alboOrder`, `PROFESSIONAL.alboNumber`). L'implementazione DEVE riutilizzare `PROFESSIONAL` anziché duplicare i dati dell'albo in `about.ts`.

---

## Dipendenze dati

| File | Uso |
|------|-----|
| `src/data/about.ts` | Nuovo — bio, foto, filosofia, formazione |
| `src/data/professional.ts` | Già esistente — riutilizzato per albo (evita duplicazione) |

---

## Placeholder realistico (valori iniziali)

```typescript
export const ABOUT_CONTENT: AboutContent = {
  bio: `Sono la Dott.ssa Elisa Patti, Biologa Nutrizionista iscritta all'Albo dei Biologi
dell'Emilia Romagna e delle Marche. Mi occupo di nutrizione clinica e benessere alimentare
con un approccio scientifico e profondamente umano. Il mio obiettivo è accompagnare ogni
persona in un percorso nutrizionale su misura, che rispetti le sue esigenze, i suoi ritmi
e il suo stile di vita.`,

  photo: {
    src: '/images/dottoressa/elisa-patti-bio.jpg',
    alt: 'Dott.ssa Elisa Patti, Biologa Nutrizionista',
    width: 4032,
    height: 3024,
  },

  philosophy: [
    {
      icon: '🌿',
      title: 'Approccio personalizzato',
      description: 'Ogni percorso è unico come la persona che lo intraprende. Nessun piano alimentare standard.',
    },
    {
      icon: '🔬',
      title: 'Basi scientifiche',
      description: 'Ogni consiglio è fondato su evidenze scientifiche aggiornate e linee guida internazionali.',
    },
    {
      icon: '❤️',
      title: 'Ascolto e rispetto',
      description: 'La relazione con il paziente è al centro del percorso. Ascolto, empatia e rispetto dei tempi di ognuno.',
    },
    {
      icon: '🌱',
      title: 'Nutrizione come stile di vita',
      description: 'L\'obiettivo non è una dieta temporanea, ma costruire un rapporto sereno e duraturo con il cibo.',
    },
  ],

  credentials: [
    {
      year: '2020',
      title: 'Laurea Magistrale in Biologia — indirizzo Nutrizionale',
      institution: 'Università degli Studi [da aggiornare]',
    },
  ],
}
```
