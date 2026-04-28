# Data Model: Pagina Percorsi Nutrizionali

**Feature Branch**: `015-percorsi-nutrizionali`
**Generated**: 2026-04-28

---

## Entità

### `PercorsoNutrizionale`

Singolo percorso nutrizionale, gestito nel file dati `src/data/percorsi.ts`.

```typescript
type ColoreAccent = 'primary' | 'secondary' | 'accent'

interface PercorsoNutrizionale {
  id: string           // slug unico es. "metabolismo-glicemia"
  nome: string         // nome completo es. "Metabolismo & Glicemia sotto controllo"
  destinatari: string  // descrizione del target es. "Per chi soffre di..."
  obiettivo: string    // obiettivo del percorso es. "Stabilizzare la glicemia..."
  benefici: string[]   // lista benefici es. ["Piano nutrizionale personalizzato", ...]
  coloreAccent: ColoreAccent  // token palette: 'primary' | 'secondary' | 'accent'
}
```

**Note**:
- `id` deve essere unico nell'array — usato come `key` React e potenzialmente come anchor
- `benefici` è un array ordinato; l'ordine di inserimento è l'ordine di visualizzazione
- `coloreAccent` mappa ai CSS custom properties del design system (vedi research.md Decision 3)

---

### `ColorMap` (runtime, non persistito)

Mappa interna al componente card per tradurre `ColoreAccent` in CSS custom properties.

```typescript
const COLOR_MAP: Record<ColoreAccent, { bg: string; border: string; text: string }> = {
  primary: {
    bg: 'var(--color-primary-50)',
    border: 'var(--color-primary-200)',
    text: 'var(--color-primary-700)',
  },
  secondary: {
    bg: 'var(--color-secondary-50)',
    border: 'var(--color-secondary-200)',
    text: 'var(--color-secondary-700)',
  },
  accent: {
    bg: 'var(--color-accent-100)',
    border: 'var(--color-accent-200)',
    text: 'var(--color-accent-600)',
  },
}
```

---

## File

| File | Contenuto |
|------|-----------|
| `src/data/percorsi.ts` | `PercorsoNutrizionale`, `ColoreAccent`, `PERCORSI` array |
| `src/app/percorsi/page.tsx` | Server Component pagina — importa `PERCORSI` |
| `src/components/sections/PercorsiHeroCTA.tsx` | Client Component — bottone Calendly + link scroll |

---

## Dati iniziali

```typescript
export const PERCORSI: PercorsoNutrizionale[] = [
  {
    id: 'metabolismo-glicemia',
    nome: 'Metabolismo & Glicemia sotto controllo',
    destinatari: 'Per chi soffre di insulino-resistenza, diabete o difficoltà nella gestione della glicemia.',
    obiettivo: 'Stabilizzare la glicemia, ridurre i picchi e migliorare energia e benessere quotidiano.',
    benefici: [
      'Piano nutrizionale personalizzato',
      'Educazione alimentare pratica',
      'Strategie per gestire i pasti nella vita reale',
      'Monitoraggio e adattamenti progressivi',
    ],
    coloreAccent: 'primary',
  },
  {
    id: 'reset-intestinale',
    nome: 'Reset Intestinale',
    destinatari: 'Per chi soffre di gonfiore, disturbi digestivi o problematiche intestinali.',
    obiettivo: 'Ridurre i sintomi, migliorare la digestione e ritrovare leggerezza.',
    benefici: [
      'Analisi delle abitudini alimentari',
      'Piano nutrizionale mirato',
      'Supporto nella gestione dei sintomi',
      'Percorso graduale e sostenibile',
    ],
    coloreAccent: 'secondary',
  },
  {
    id: 'performance-nutrition',
    nome: 'Performance Nutrition',
    destinatari: 'Atleti e persone attive che vogliono migliorare performance, recupero e composizione corporea.',
    obiettivo: 'Ottimizzare energia, prestazione e risultati.',
    benefici: [
      'Piano nutrizionale su misura per allenamenti e obiettivi',
      'Strategie pre e post workout',
      'Supporto nel miglioramento della composizione corporea',
      'Monitoraggio continuo',
    ],
    coloreAccent: 'accent',
  },
]
```
