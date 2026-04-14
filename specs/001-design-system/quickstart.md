# Quickstart: Usare il Design System

**Feature**: 001-design-system | **Per**: sviluppatore (Stefano)

---

## Struttura dei file di questa feature

```
src/
├── app/
│   ├── globals.css        ← @theme Tailwind v4: tutti i token
│   └── layout.tsx         ← next/font/google: caricamento font
├── components/
│   ├── ui/                ← Componenti base (Button, Card, ecc.)
│   └── shapes/            ← Blob SVG (BlobHero, BlobFrame, BlobSection)
└── lib/
    └── fonts.ts           ← Configurazione font esportata
```

---

## Come usare un colore

```tsx
// Via classe Tailwind (preferito)
<div className="bg-primary-500 text-neutral-50">...</div>
<button className="bg-accent-500 hover:bg-accent-600 text-white">Prenota</button>

// Via CSS variable (per stili dinamici o animazioni)
<div style={{ backgroundColor: 'var(--color-primary-100)' }}>...</div>
```

---

## Come usare la tipografia

```tsx
// Le classi tipografiche sono definite come @layer components in globals.css
<h1 className="text-heading-1">Cura il tuo benessere</h1>
<p className="text-body-lg">Percorsi personalizzati...</p>
<span className="text-label uppercase">Servizi</span>

// Font variables
// var(--font-display) → Cormorant Garamond
// var(--font-body)    → DM Sans
```

---

## Come usare un blob

```tsx
import { BlobHero } from '@/components/shapes/BlobHero'
import { BlobFrame } from '@/components/shapes/BlobFrame'

// Blob decorativo hero (grande, sfondo)
<BlobHero className="text-primary-100 w-96 h-96 absolute -top-12 -right-12" />

// Blob per incorniciare foto
<div className="relative w-64 h-64">
  <BlobFrame className="absolute inset-0 text-primary-200" />
  <img className="absolute inset-4 object-cover" src="..." alt="Dott.ssa Patti" />
</div>
```

---

## Come usare il Button

```tsx
import { Button } from '@/components/ui/Button'

// CTA primaria (sempre e solo "Prenota consulenza gratuita" o equivalente)
<Button variant="primary" size="lg">Prenota consulenza gratuita</Button>

// CTA secondaria
<Button variant="secondary" size="md">Scopri i servizi</Button>

// Ghost (per azioni terziarie)
<Button variant="ghost" size="sm">Leggi di più</Button>

// Stato loading
<Button variant="primary" loading>Caricamento...</Button>
```

---

## Validation checklist prima di ogni PR

- [ ] Nessun colore hex hardcoded: usare sempre `var(--color-*)` o classe Tailwind
- [ ] Nessun font-family inline: usare `var(--font-display)` o `var(--font-body)`
- [ ] Blob usati da `components/shapes/`, non ridisegnati inline
- [ ] Contrasto WCAG AA verificato per ogni nuova combinazione testo/sfondo
- [ ] Tutte le animazioni disattivate sotto `prefers-reduced-motion`
- [ ] Nessun bordo vivo (border-radius: 0) tranne dove esplicitamente documentato

---

## Come validare l'accessibilità del contrasto

Usa l'estensione VSCode **axe Accessibility Linter** o il tool online
[Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) con
i valori hex dalla tabella in `contracts/design-tokens.md`.
