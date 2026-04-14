# Research: Design System & Fondamenta Visiva

**Feature**: 001-design-system | **Date**: 2026-04-14

---

## Decisione 1: Tailwind CSS v4 — @theme come layer dei design token

**Decisione**: Usare la direttiva `@theme` di Tailwind CSS v4 in `app/globals.css` per
dichiarare tutti i token di design. Tailwind li espone automaticamente come CSS custom
properties (`var(--color-primary-500)`) e genera le utility class corrispondenti.

**Rationale**: In Tailwind v4 non esiste più `tailwind.config.js` — la configurazione
è CSS-first. Il blocco `@theme { }` diventa la single source of truth dei token: li usa
Tailwind per generare utility, li usa il browser come variabili CSS native a runtime.
Zero duplicazione tra configurazione e CSS.

**Alternatives considered**:
- Style Dictionary (W3C design token spec): potente ma sovra-ingegnerizzato per un sito
  singolo; introduce build pipeline separata non giustificata (Principio VII YAGNI).
- CSS custom properties manuali senza Tailwind: manca generazione automatica delle utility
  class, ogni token andrebbe usato solo via `var()`.

---

## Decisione 2: Font — next/font/google con self-hosting automatico

**Decisione**: Usare `next/font/google` di Next.js 15 per caricare **Cormorant Garamond**
(titoli) e **DM Sans** (corpo testo). Next.js scarica i font a build-time e li serve dal
dominio del sito (Vercel), senza mai contattare `fonts.googleapis.com` a runtime.

**Rationale**: `next/font/google` è il metodo raccomandato da Next.js per font GDPR-compliant:
zero richieste a server Google, font serviti dallo stesso dominio, `font-display: swap`
automatico, subset ottimizzato (`latin` per italiano). Nessun NPM package aggiuntivo
necessario — funzionalità built-in di Next.js.

**Font scelti**:
- **Cormorant Garamond** — serif elegante con tratti calligrafici organici. Trasmette
  raffinatezza e calore. Pesi usati: 300 (light headers), 500 (medium), 600 (semibold).
  Disponibile via `next/font/google`. Ottimo supporto caratteri accentati italiani.
- **DM Sans** — sans-serif geometrico-umanista. Leggibilissimo a body size, carattere
  variabile disponibile (un solo file per tutti i pesi). Pesi: 300–700.

**font-display scelto**: `swap` — Next.js mostra il font di sistema immediatamente e lo
sostituisce con il custom font appena caricato. Il font brand (Cormorant Garamond) è
parte critica dell'identità visiva: non mostrarlo mai (come farebbe `optional` su reti
lente) sarebbe peggio di un breve FOUT. Il preloading automatico di `next/font/google`
minimizza il tempo di swap rendendo il FOUT impercettibile nella pratica.

**Alternatives considered**:
- `font-display: optional` — elimina FOUT ma sacrifica il font brand se la rete è lenta.
  Incompatibile con un sito dove la tipografia è asset visivo primario (Principio I).
- Fontsource (NPM): valido ma aggiunge bundle weight; `next/font/google` è più integrato.
- Playfair Display: troppo formale/editoriale, meno calore organico di Cormorant.
- Inter: ottimo ma neutro; DM Sans ha più personalità per il contesto wellness.

---

## Decisione 3: Blob shapes — SVG inline come componenti React

**Decisione**: I 3 blob (`blob-hero`, `blob-frame`, `blob-section`) sono implementati
come componenti React che rendono SVG inline. Le forme sono path SVG cubici Bezier
disegnati a mano per massima organicità; colore e dimensione sono props CSS.

**Rationale**: SVG inline è scalabile (vettoriale), colorabile via `currentColor` o
CSS variable, animabile con Framer Motion, e non richiede richieste HTTP aggiuntive.
Rispetto a clip-path CSS i blob SVG hanno supporto browser più ampio e sono più facili
da modificare visivamente.

**Alternatives considered**:
- `clip-path: path()` CSS: supporto Safari ancora parziale per path complessi al momento;
  meno intuitivo da aggiornare.
- Immagini rasterizzate (PNG/WebP): non scalabili, pesanti, non animabili — escluse per
  Principio IV (Performance).
- CSS `border-radius` estremi (es. `30% 70% 70% 30% / 30% 30% 70% 70%`): adatto per
  forme semplici ma non per blob complessi multi-curva; usato solo per `blob-frame` semplice.

---

## Decisione 4: Palette cromatica — "Naturalis"

**Decisione**: Palette basata su analisi visiva del profilo Instagram di Elisa Patti e
dei siti di riferimento. Tre famiglie cromatiche: Verde Salvia (primario), Sabbia Calda
(secondario), Terracotta (accento CTA). Neutri con sottotono caldo.

**Rationale**: I siti di riferimento (fabiolapanfili.it, dimperionutrizionista.com) usano
terre, verdi naturali e creme. Instagram di Elisa Patti mostra contenuti con toni naturali,
cibo fresco, ambienti luminosi e caldi. La palette "Naturalis" riflette questi input con
colori che comunicano: salute naturale (verde), calore umano (sabbia), azione energica
(terracotta CTA). Da approvare con la Dott.ssa prima dell'implementazione.

**Palette proposta** (valori definitivi in `contracts/design-tokens.md`):
- Primario: Verde Salvia `#5E8350` — colori brand, hover states, icone
- Secondario: Sabbia Calda `#B99055` — dettagli decorativi, bordi sottili
- Accento: Terracotta `#C45C38` — CTA "Prenota consulenza gratuita", badge, highlights
- Neutri caldi: da `#FAF9F7` (sfondo) a `#1A1612` (testo)
- Superficie: `#FFFFFF` (card), `#F2F5EF` (sezioni alternate verde chiaro)

**Alternatives considered**:
- Rosa cipria + verde acqua: troppo fashion/beauty, meno credibilità sanitaria.
- Verde bosco scuro: elegante ma meno caldo e accessibile per il target femminile 25–50.
- Monocromatico grigio: troppo clinico, contrasta con il principio I (Design Organico).

---

## Decisione 5: Browser fallback strategy per CSS moderno

**Decisione**: Usare `@supports` per le feature non supportate da Safari 16 e browser
fuori target. I fallback sono visivamente accettabili, non identici. oklch() usato
nei token con fallback hex esplicito nello stesso `@theme`.

**Rationale**: oklch() è supportato da Chrome 111+, Firefox 113+, Safari 15.4+.
Con target Safari 16+ siamo sicuri, ma per robustezza aggiungiamo il fallback hex
in ogni variabile (CSS mantiene il valore precedente se oklch non è supportato).

**Alternatives considered**:
- Usare solo hex/hsl: più compatibile ma perde i vantaggi perceptually-uniform di
  oklch per creare scale cromatiche coerenti e sfumature predittive.
- PostCSS plugin per transpile oklch: aggiunge build complexity (Principio VII YAGNI).
