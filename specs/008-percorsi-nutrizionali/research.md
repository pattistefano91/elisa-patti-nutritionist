# Research: Pagina Percorsi Nutrizionali

**Feature Branch**: `015-percorsi-nutrizionali`
**Generated**: 2026-04-28

---

## Decision 1: Struttura pagina — Server Component vs Client Component

**Decision**: Server Component per la pagina, Client Component isolato solo per la CTA Calendly

**Rationale**: I dati dei percorsi sono statici (file `src/data/percorsi.ts`), nessun fetch asincrono necessario. La pagina è un Server Component puro. Solo il bottone "Prenota ora" ha bisogno di `window.Calendly` (API browser) → estratto in `PercorsiHeroCTA.tsx` come Client Component, pattern già usato da `HeroCTA.tsx` in homepage.

**Alternatives considered**:
- Pagina Client Component intera → inutile, peggiora performance (no SSR del contenuto)
- Inline onClick direttamente in page.tsx → impossibile, Server Component non gestisce eventi browser

---

## Decision 2: Redirect `/servizi` → `/percorsi`

**Decision**: Redirect permanente (301) configurato in `next.config.ts` via array `redirects`

**Rationale**: Next.js supporta nativamente redirect statici nel file di configurazione, senza runtime overhead. Un redirect 301 è corretto per un cambio di URL definitivo e preserva l'eventuale link equity SEO. Nessuna libreria aggiuntiva necessaria.

**Implementation**:
```typescript
redirects: async () => [
  { source: '/servizi', destination: '/percorsi', permanent: true }
]
```

**Alternatives considered**:
- Mantenere `/servizi` e rinominare solo la navbar → lascia URL inconsistente con il brand
- Redirect via middleware → overkill per un singolo redirect statico

---

## Decision 3: Colore accent per card — approccio token

**Decision**: Campo `coloreAccent: 'primary' | 'secondary' | 'accent'` nel tipo `PercorsoNutrizionale`; il componente card mappa il token ai CSS custom properties corrispondenti

**Rationale**: Non si hardcodano valori esadecimali nei dati — si usano i nomi semantici della palette. Così se il design system cambia colori, le card si aggiornano automaticamente. La mappa token→CSS è centralizzata nel componente.

**Mapping**:
- `'primary'` → sfondo `--color-primary-50`, bordo `--color-primary-200`, testo accento `--color-primary-700`
- `'secondary'` → sfondo `--color-secondary-50`, bordo `--color-secondary-200`, testo accento `--color-secondary-700`
- `'accent'` → sfondo `--color-accent-100`, bordo `--color-accent-200`, testo accento `--color-accent-600`

**Assegnazione percorsi iniziali**:
- Metabolismo & Glicemia → `primary` (verde salvia — salute, equilibrio)
- Reset Intestinale → `secondary` (sabbia calda — delicatezza, leggerezza)
- Performance Nutrition → `accent` (terracotta — energia, azione)

**Alternatives considered**:
- Valore CSS diretto nel dato → accoppia dati al design system, fragile
- Colore derivato dall'indice nell'array → non deterministico se si riordina la lista

---

## Decision 4: Scroll "Scopri i percorsi" — anchor vs scrollIntoView

**Decision**: Anchor HTML `href="#percorsi"` con `id="percorsi"` sulla sezione griglia

**Rationale**: `scroll-behavior: smooth` è già definito in `globals.css` su `html`. Un semplice anchor `<a href="#percorsi">` è sufficiente — zero JavaScript, funziona anche senza JS abilitato, accessibile nativamente. Il Client Component `PercorsiHeroCTA.tsx` gestisce solo il bottone Calendly; il link di scroll può essere un `<a>` standard nel componente stesso.

**Alternatives considered**:
- `scrollIntoView()` via JavaScript → overkill, richiede `useRef` + handler, stesso risultato
- `next/link` con hash → uguale a un anchor HTML per hash navigation
