# Research: Navigazione

**Feature**: 005-navigazione
**Date**: 2026-04-16

---

## Decision 1: Navbar come Client Component

**Decision**: `Navbar.tsx` usa `'use client'` per gestire lo stato `isOpen` del menù mobile tramite `useState`.

**Rationale**: Il menù hamburger richiede interattività (apri/chiudi) che non è possibile con un server component. `usePathname` di `next/navigation` richiede anch'esso client context. Il resto del layout rimane server-side — l'impatto sul bundle è minimo (solo il componente Navbar viene idratato).

**Alternatives considered**:
- Server component con form/URL state: troppo complesso per una semplice toggle di visibilità
- Radix UI NavigationMenu: overkill per questa struttura semplice (YAGNI)

---

## Decision 2: Active link via `usePathname`

**Decision**: Usare `usePathname()` da `next/navigation` per confrontare il pathname corrente con `href` di ogni `NavLink`.

**Pattern**:
```tsx
'use client'
import { usePathname } from 'next/navigation'

const pathname = usePathname()
const isActive = pathname === link.href
// oppure per match parziale (es. /servizi/dettaglio):
const isActive = pathname.startsWith(link.href) && link.href !== '/'
```

**Rationale**: Zero dipendenze aggiuntive, nativo Next.js 15. Il caso speciale `href !== '/'` evita che la home sia sempre "attiva".

---

## Decision 3: Dati di navigazione in `src/data/navigation.ts`

**Decision**: Centralizzare le voci di navigazione in un file dati separato dal componente.

**Rationale**: Singola fonte di verità — se si aggiunge/rimuove una pagina basta aggiornare `navigation.ts`, non il componente. Rispetta il pattern già usato da `services.ts` e `contact.ts` nel progetto.

**Struttura**:
```ts
export interface NavLink {
  label: string
  href: string
  isExternal?: boolean
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Chi sono', href: '/about' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/#contatti' },
]
```

**Alternatives considered**:
- Links hardcoded nel componente: più semplice ma meno maintainable; scartato perché il pattern del progetto favorisce la separazione dati/UI

---

## Decision 4: Icona hamburger — SVG inline, nessuna libreria

**Decision**: Usare SVG inline per l'icona hamburger (3 linee) e la X di chiusura, direttamente nel JSX.

**Rationale**: Zero dipendenze aggiuntive (YAGNI). Le icone sono semplici e non richiedono una libreria. Il toggle hamburger↔X è gestito con `isOpen` state.

**Pattern**:
```tsx
{isOpen ? (
  <svg>/* X icon */</svg>
) : (
  <svg>/* Hamburger icon */</svg>
)}
```

---

## Decision 5: Chiusura menù mobile — eventi multipli

**Decision**: Il dropdown mobile si chiude su: (1) click su un link, (2) tasto ESC, (3) click fuori dal menù.

**Pattern per ESC**:
```tsx
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false)
  }
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}, [])
```

**Pattern per click esterno**: `useRef` sul container della navbar + listener su `mousedown` nel documento. Alternativa più semplice: overlay invisibile dietro il menu che cattura il click.

**Rationale**: Accessibilità (ESC è standard ARIA per chiudere menu), UX (click esterno è atteso). Body scroll lock NON necessario per il dropdown style (non copre tutto lo schermo).

---

## Decision 6: Pagine placeholder — struttura minima

**Decision**: Pagine statiche Next.js con `Container`, heading H1, sottotitolo, testo "in arrivo". Nessun dato dinamico, nessun CMS.

**`/about`**: 
- Titolo: "Chi sono"
- Sottotitolo: titolo professionale
- Placeholder: breve testo introduttivo con annuncio "pagina in arrivo"

**`/servizi`**:
- Titolo: "I Percorsi"
- Placeholder: rimanda alla homepage per ora + annuncio "pagina dedicata in arrivo"

**`/blog`**:
- Titolo: "Blog"
- Placeholder: "Articoli in arrivo"
- `robots: { index: false }` — nessun contenuto reale ancora

**Rationale**: Pagine esistenti evitano 404 dai link navbar. Il contenuto reale è oggetto di spec successive (006-about, 007-servizi-page, 008-blog). YAGNI: nessuna struttura complessa per pagine che saranno riscritte.
