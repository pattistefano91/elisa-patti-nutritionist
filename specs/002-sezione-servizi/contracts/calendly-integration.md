# Contract: Calendly Integration

**Feature**: 002-sezione-servizi
**Date**: 2026-04-14

---

## Scopo

Definisce come il popup widget Calendly viene caricato e attivato nel sito.

## Script loading

```tsx
// In src/app/layout.tsx (o page.tsx)
import Script from 'next/script'

<Script
  src="https://assets.calendly.com/assets/external/widget.js"
  strategy="lazyOnload"
/>
```

Il CSS Calendly viene importato in `src/app/globals.css` o come `<link>` in layout.tsx:
```html
<link
  href="https://assets.calendly.com/assets/external/widget.css"
  rel="stylesheet"
/>
```

## Apertura popup

```typescript
// Signature del wrapper (src/components/sections/ServicesSection.tsx)
function openCalendly(url: string): void {
  if (typeof window !== 'undefined' && (window as any).Calendly) {
    (window as any).Calendly.initPopupWidget({ url })
  } else {
    // fallback: apri in nuova tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
```

## Invarianti

- Lo script NON viene caricato al server-side render (SSR) — solo client-side
- Il popup si apre SOLO su click esplicito dell'utente (mai automaticamente)
- Se `window.Calendly` non è disponibile (script non caricato o bloccato da ad-blocker), si apre l'URL Calendly in nuova tab con `window.open(url, '_blank', 'noopener,noreferrer')` — check sincrono al click, nessun timer di attesa
- L'URL passato a `initPopupWidget` corrisponde sempre al `calendlyUrl` del `Service` specifico

## GDPR Note

- Lo script Calendly imposta cookie solo dopo il click dell'utente
- `lazyOnload` garantisce che nessun cookie venga impostato al caricamento pagina
- Calendly deve essere menzionato nella Cookie Policy del sito come sub-processor tecnico
- DPA disponibile su: https://calendly.com/legal/dpa (da firmare dalla Dott.ssa)
