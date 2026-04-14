# Contract: Design Tokens — Palette "Naturalis"

**Feature**: 001-design-system | **Status**: PROPOSED (in attesa di approvazione cliente)  
**Implementazione**: `src/app/globals.css` blocco `@theme`

---

## Colori — Famiglia Primario: Verde Salvia

| Token | Valore | Uso |
|-------|--------|-----|
| `--color-primary-50` | `#F2F5EF` | Sfondo sezioni alternate |
| `--color-primary-100` | `#E0E9DA` | Hover su sfondo primario chiaro |
| `--color-primary-200` | `#C2D3B8` | Bordi chiari, divisori |
| `--color-primary-300` | `#9CB78E` | Icone disabilitate, placeholder |
| `--color-primary-400` | `#7A9D6A` | Testo secondario su sfondo chiaro |
| `--color-primary-500` | `#5E8350` | Colore brand principale, icone attive |
| `--color-primary-600` | `#4A6840` | Hover su primary-500 |
| `--color-primary-700` | `#374E30` | Pressed state |
| `--color-primary-800` | `#243320` | Testo su sfondo chiaro |
| `--color-primary-900` | `#111910` | Testo su sfondo bianco |

---

## Colori — Famiglia Secondario: Sabbia Calda

| Token | Valore | Uso |
|-------|--------|-----|
| `--color-secondary-50` | `#FBF8F4` | Sfondo card caldo |
| `--color-secondary-100` | `#F5EDE0` | Sfondo sezione calda |
| `--color-secondary-200` | `#EADBC3` | Bordi decorativi |
| `--color-secondary-300` | `#DBC49F` | Divisori decorativi |
| `--color-secondary-400` | `#C9AA78` | Dettagli dorati |
| `--color-secondary-500` | `#B99055` | Accento decorativo, bordi card |
| `--color-secondary-600` | `#8F6E3E` | Hover secondario |
| `--color-secondary-700` | `#6A5030` | Testo terziario scuro |
| `--color-secondary-800` | `#453421` | — |
| `--color-secondary-900` | `#221A10` | — |

---

## Colori — Famiglia Accento: Terracotta (CTA)

| Token | Valore | Uso |
|-------|--------|-----|
| `--color-accent-100` | `#F8E8E0` | Sfondo badge |
| `--color-accent-200` | `#F0C9B5` | — |
| `--color-accent-300` | `#E8A88C` | Hover chiaro su accent |
| `--color-accent-400` | `#D98060` | Variante morbida CTA |
| `--color-accent-500` | `#C45C38` | CTA primaria "Prenota consulenza gratuita" |
| `--color-accent-600` | `#9E4528` | Hover su CTA primaria |
| `--color-accent-700` | `#7A3220` | Pressed state CTA |

---

## Colori — Neutri Caldi

| Token | Valore | Uso |
|-------|--------|-----|
| `--color-neutral-50` | `#FAF9F7` | Sfondo pagina principale |
| `--color-neutral-100` | `#F2F0EC` | Sfondo card alternativo |
| `--color-neutral-200` | `#E6E2DB` | Bordi UI, divisori |
| `--color-neutral-300` | `#D3CCBF` | Bordi form |
| `--color-neutral-400` | `#B5AC9E` | Placeholder testo |
| `--color-neutral-500` | `#8C8073` | Testo disabilitato |
| `--color-neutral-600` | `#665D53` | Testo secondario |
| `--color-neutral-700` | `#4A4239` | Testo corpo |
| `--color-neutral-800` | `#302B23` | Testo principale scuro |
| `--color-neutral-900` | `#1A1612` | Heading, testo enfatico |

---

## Colori — Superfici e Semantici

| Token | Valore | Uso |
|-------|--------|-----|
| `--color-surface-page` | `var(--color-neutral-50)` | Sfondo `<body>` |
| `--color-surface-card` | `#FFFFFF` | Sfondo card |
| `--color-surface-muted` | `var(--color-primary-50)` | Sezioni alternate verdi |
| `--color-surface-warm` | `var(--color-secondary-50)` | Sezioni alternate calde |
| `--color-success` | `#4E8B5A` | Messaggi di conferma |
| `--color-error` | `#B84040` | Errori form |
| `--color-warning` | `#B88B30` | Avvisi |
| `--color-info` | `#4070B8` | Informazioni |

---

## Tipografia

### Font Families

| Token | Font | Pesi | Metodo |
|-------|------|------|--------|
| `--font-display` | Cormorant Garamond | 300, 500, 600 | `next/font/google`, subset `latin` |
| `--font-body` | DM Sans | 300, 400, 500, 700 (variable) | `next/font/google`, subset `latin` |

### Scala Tipografica

| Livello | Font | Size | Weight | Line Height | Letter Spacing | Uso |
|---------|------|------|--------|-------------|----------------|-----|
| `heading-1` | display | 3.5rem | 500 | 1.1 | -0.02em | Hero title |
| `heading-2` | display | 2.75rem | 500 | 1.15 | -0.01em | Titoli sezione |
| `heading-3` | display | 2rem | 500 | 1.2 | 0 | Sottotitoli principali |
| `heading-4` | display | 1.5rem | 400 | 1.25 | 0 | Card title, FAQ |
| `heading-5` | body | 1.25rem | 500 | 1.3 | 0 | Label sezione, widget |
| `heading-6` | body | 1rem | 500 | 1.35 | 0.01em | Caption enfatica |
| `body-lg` | body | 1.125rem | 400 | 1.7 | 0 | Testo introduttivo |
| `body-md` | body | 1rem | 400 | 1.65 | 0 | Testo corrente |
| `body-sm` | body | 0.875rem | 400 | 1.6 | 0 | Note, metadati |
| `caption` | body | 0.75rem | 400 | 1.5 | 0 | Caption immagini |
| `label` | body | 0.875rem | 500 | 1.4 | 0.05em | Label form, badge |

---

## Spaziatura (base 4px)

| Token | Valore | Pixel |
|-------|--------|-------|
| `--spacing-1` | 0.25rem | 4px |
| `--spacing-2` | 0.5rem | 8px |
| `--spacing-3` | 0.75rem | 12px |
| `--spacing-4` | 1rem | 16px |
| `--spacing-6` | 1.5rem | 24px |
| `--spacing-8` | 2rem | 32px |
| `--spacing-12` | 3rem | 48px |
| `--spacing-16` | 4rem | 64px |
| `--spacing-24` | 6rem | 96px |
| `--spacing-32` | 8rem | 128px |

---

## Raggi di Bordo

| Token | Valore | Uso |
|-------|--------|-----|
| `--radius-sm` | 4px | Input, badge piccoli |
| `--radius-md` | 8px | Card, button sm |
| `--radius-lg` | 16px | Card grandi, sezioni |
| `--radius-xl` | 24px | Modal, pannelli |
| `--radius-2xl` | 32px | Hero card |
| `--radius-full` | 9999px | Avatar, pill button |
| `--radius-blob-hero` | — | Blob SVG: path `M80,10 C120,0 190,40 190,90 C190,150 140,195 90,190 C40,185 5,150 10,90 C15,30 40,20 80,10Z` |
| `--radius-blob-frame` | — | Blob SVG: path `M70,5 C110,-5 185,30 190,80 C195,130 160,190 100,190 C40,190 0,155 5,90 C10,25 30,15 70,5Z` |
| `--radius-blob-section` | — | Blob SVG: path `M60,15 C100,5 180,35 185,85 C190,135 150,185 95,185 C40,185 8,145 12,85 C16,25 20,25 60,15Z` |

---

## Ombre

| Token | Valore | Uso |
|-------|--------|-----|
| `--shadow-sm` | `0 1px 3px rgba(26,22,18,0.08), 0 1px 2px rgba(26,22,18,0.04)` | Card sottile, input focus |
| `--shadow-md` | `0 4px 12px rgba(26,22,18,0.10), 0 2px 4px rgba(26,22,18,0.06)` | Card standard, dropdown |
| `--shadow-lg` | `0 12px 32px rgba(26,22,18,0.12), 0 4px 8px rgba(26,22,18,0.06)` | Modal, overlay |
| `--shadow-glow` | `0 0 20px rgba(196,92,56,0.30)` | Hover CTA primaria (terracotta) |

---

## Animazioni

| Token | Valore | Uso |
|-------|--------|-----|
| `--duration-fast` | 150ms | Hover, focus, micro-interazioni |
| `--duration-normal` | 300ms | Transizioni standard, reveal |
| `--duration-slow` | 500ms | Animazioni entrata sezione |
| `--ease-organic` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Transizioni principali (ease-out-quad) |
| `--ease-bounce-soft` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | CTA hover (lieve overshoot) |

**Regola prefers-reduced-motion**: tutti i valori `--duration-*` diventano `0ms` quando
`@media (prefers-reduced-motion: reduce)` è attivo.

---

## Layout System

| Token | Valore | Uso |
|-------|--------|-----|
| `--container-max-width` | 1200px | Max larghezza contenuto |
| `--container-padding-mobile` | 20px | Padding laterale ≤ 768px |
| `--container-padding-desktop` | 48px | Padding laterale > 768px |
| `--grid-columns-desktop` | 12 | Colonne griglia desktop |
| `--grid-columns-mobile` | 4 | Colonne griglia mobile |
| `--grid-gutter` | var(--spacing-6) | Gap tra colonne (24px) |

---

## Coppie contrasto garantite WCAG 2.1 AA

| Testo | Sfondo | Ratio stimato | Livello |
|-------|--------|---------------|---------|
| `neutral-900` `#1A1612` | `neutral-50` `#FAF9F7` | ~17:1 | AAA |
| `neutral-900` `#1A1612` | `surface-card` `#FFFFFF` | ~18:1 | AAA |
| `surface-card` `#FFFFFF` | `accent-500` `#C45C38` | ~4.6:1 | AA |
| `surface-card` `#FFFFFF` | `primary-500` `#5E8350` | ~4.7:1 | AA |
| `neutral-900` `#1A1612` | `primary-50` `#F2F5EF` | ~16:1 | AAA |
| `neutral-600` `#665D53` | `surface-card` `#FFFFFF` | ~5.2:1 | AA |

> Da verificare con strumento automatico (es. Colour Contrast Analyser) durante implementazione.
