# Contract: Componente Navbar

**Feature**: 005-navigazione
**Date**: 2026-04-16

---

## Navbar

**File**: `src/components/sections/Navbar.tsx`  
**Type**: Client Component (`'use client'`)  
**Props**: nessuna — legge `NAV_LINKS` da `@/data/navigation` e `CALENDLY_URL` da `@/data/services`

### Comportamento atteso

| Condizione | Comportamento |
|------------|---------------|
| Viewport ≥ 768px | Mostra logo + link orizzontali + CTA button |
| Viewport < 768px | Mostra logo + icona hamburger; link nascosti |
| `isOpen = true` (mobile) | Dropdown visibile sotto navbar, link in colonna |
| `isOpen = false` (mobile) | Dropdown nascosto |
| Link cliccato | `isOpen → false`, navigazione alla pagina |
| Tasto ESC | `isOpen → false` |
| Click esterno al dropdown | `isOpen → false` |
| Pathname corrisponde a `href` | Link ha classe "attiva" (colore `primary-600`, font `semibold`) |

### Accessibilità

- `<nav>` con `aria-label="Navigazione principale"`
- Hamburger button: `aria-expanded={isOpen}`, `aria-controls="mobile-menu"`, `aria-label="Apri menù"`
- Dropdown: `id="mobile-menu"`, `role="menu"` quando aperto
- Link attivo: `aria-current="page"`

---

## NavLink Component (inline in Navbar)

Non esposto come componente separato — definito inline in `Navbar.tsx`.

### Active state styling

```tsx
const isActive = pathname === link.href || 
  (link.href !== '/' && pathname.startsWith(link.href))

className={cn(
  'text-label transition-colors hover:text-primary-600',
  isActive ? 'text-primary-600 font-semibold' : 'text-neutral-600'
)}
```

---

## CTA Button nella Navbar

Riusa il componente `<Button>` dal design system con `variant="primary"` e `size="sm"`.
Apre Calendly via `window.Calendly.initPopupWidget` — stesso pattern del bottone hero.
`aria-label="Prenota consulenza gratuita"`
