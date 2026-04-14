# Data Model: Design System Token Structure

**Feature**: 001-design-system | **Date**: 2026-04-14

---

## Entità: DesignToken

Un token è l'unità atomica del sistema. Implementato come CSS custom property dentro
il blocco `@theme` di Tailwind v4 in `app/globals.css`.

```
DesignToken {
  name: string          -- nome CSS: --color-primary-500
  category: enum        -- color | typography | spacing | radius | shadow | animation | layout
  value: string         -- valore CSS (hex, oklch, rem, px, ecc.)
  tailwind_utility: string  -- classe Tailwind generata automaticamente (es. bg-primary-500)
  semantic_alias: string    -- nome leggibile (es. "colore brand principale")
}
```

**Naming convention**: `--{categoria}-{sottocategoria}-{scala}`
- Es: `--color-primary-500`, `--spacing-8`, `--radius-blob`, `--shadow-md`

---

## Entità: ColorScale

Ogni famiglia cromatica è una scala da 50 a 900 con semantica coerente.

```
ColorScale {
  family: string         -- primary | secondary | accent | neutral | feedback
  shades: {
    50:  string          -- sfondo sezione (quasi bianco)
    100: string          -- hover su sfondo chiaro
    200: string          -- bordi chiari, divisori
    300: string          -- testo placeholder, icone disabilitate
    400: string          -- testo secondario
    500: string          -- colore principale della famiglia
    600: string          -- hover del 500
    700: string          -- pressed state
    800: string          -- testo su sfondi chiari
    900: string          -- testo principale, quasi nero
  }
  contrast_pairs: [      -- coppie garantite WCAG AA (4.5:1)
    { bg: shade, text: shade, ratio: float }
  ]
}
```

---

## Entità: TypographyStyle

Ogni livello semantico di testo è un insieme di proprietà tipografiche.

```
TypographyStyle {
  level: string          -- heading-1...6 | body-lg | body-md | body-sm | caption | label
  font_family: string    -- var(--font-display) | var(--font-body)
  font_size: string      -- valore rem
  line_height: string    -- unitless ratio
  font_weight: number    -- 300 | 400 | 500 | 600 | 700
  letter_spacing: string -- em value (0 per la maggior parte)
  text_transform: string -- none | uppercase (solo label)
}
```

---

## Entità: BlobShape

Le 3 forme organiche del design system.

```
BlobShape {
  id: string             -- blob-hero | blob-frame | blob-section
  svg_path: string       -- path cubico Bezier (d="M...")
  viewBox: string        -- es. "0 0 200 200"
  usage_context: string  -- dove viene usato
  transform_variants: {  -- varianti CSS consentite senza ridisegnare
    scale: range         -- 0.5x – 2x
    rotate: range        -- 0° – 360°
    color: string        -- via currentColor o CSS var
  }
  fallback: string       -- border-radius CSS equivalente per browser fuori target
}
```

---

## Entità: ComponentSpec

Ogni componente base ha questa struttura logica.

```
ComponentSpec {
  name: string           -- Button | Card | Input | Textarea | Badge | Avatar | Divider | Skeleton
  variants: string[]     -- es. Button: [primary, secondary, ghost]
  sizes: string[]        -- es. [sm, md, lg]
  states: string[]       -- [default, hover, focus, disabled, loading]
  tokens_used: string[]  -- lista dei CSS token consumati
  accessibility: {
    role: string         -- ARIA role
    keyboard: string     -- interazioni tastiera attese
    contrast: string     -- ratio minimo garantito
  }
}
```

---

## Relazioni tra entità

```
globals.css (@theme)
  └── definisce → DesignToken[]
        ├── ColorScale (family: primary, secondary, accent, neutral, feedback)
        ├── TypographyStyle (via --font-display, --font-body + classi Tailwind)
        ├── SpacingToken (--spacing-4 … --spacing-128)
        ├── RadiusToken (--radius-sm … --radius-full, --radius-blob-*)
        ├── ShadowToken (--shadow-sm … --shadow-lg, --shadow-glow)
        └── AnimationToken (--duration-fast/normal/slow, --ease-organic)

components/shapes/
  └── implementa → BlobShape[3] come componenti React SVG

components/ui/
  └── implementa → ComponentSpec[8] usando DesignToken via className Tailwind
```

---

## Stato dei token: lifecycle

```
DRAFT → PROPOSED → APPROVED (dalla Dott.ssa) → IMPLEMENTED → STABLE
```

La palette cromatica è attualmente in stato `PROPOSED` — passa a `APPROVED` dopo
la revisione con la cliente. I token implementati senza approvazione della palette
sono in stato `DRAFT` e non devono andare in produzione.
