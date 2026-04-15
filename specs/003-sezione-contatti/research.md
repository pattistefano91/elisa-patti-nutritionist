# Research: Sezione Contatti

**Feature**: 003-sezione-contatti
**Date**: 2026-04-15

---

## 1. Click-to-Call e Click-to-Email in Next.js

**Decision**: Anchor HTML nativi `<a href="tel:...">` e `<a href="mailto:...">` — nessuna libreria aggiuntiva.

**Rationale**: Sono standard HTML5 supportati da tutti i browser moderni e da tutti i sistemi operativi mobile. Next.js non richiede nessuna configurazione speciale per questi link. Su iOS/Android aprono direttamente il dialer nativo e il client email.

**Alternatives considered**:
- `window.location.href = 'tel:...'` via JavaScript — peggio: non accessibile, non funziona senza JS
- Librerie di "contact button" — over-engineered per questo use case

**Format telefono**: `+39XXXXXXXXXX` (E.164) nel `href`, formato leggibile separato per il display (`+39 XXX XXX XXXX`).

---

## 2. Google Maps URL per indirizzo testuale

**Decision**: `https://maps.google.com/?q=<indirizzo+URL+encoded>` — URL universale, nessuna API key.

**Rationale**: Funziona su tutti i dispositivi. Su mobile iOS apre Apple Maps o Google Maps (preferenze utente). Su Android apre Google Maps. Su desktop apre Google Maps nel browser. Nessun cookie, nessun tracciamento, nessuna API key richiesta.

**Alternatives considered**:
- Google Maps Embed API (iframe) — richiede API key, impatta GDPR, impatta CLS (iframe dimensioni fisse)
- `https://www.google.com/maps/search/?api=1&query=...` — alternativa equivalente, meno universale

**Encoding**: usare `encodeURIComponent(address + ' ' + city)` oppure costruire il link staticamente in `contact.ts` con l'URL già formato.

---

## 3. Struttura dati CMS-ready

**Decision**: Tipi TypeScript in `src/data/contact.ts` con campi identici a quelli che verranno definiti su Sanity.

**Rationale**: Il CMS Sanity verrà integrato in una feature futura. Se la struttura dati del file statico rispecchia la struttura del documento Sanity, la migrazione sarà un semplice swap dell'import senza toccare i componenti.

**Mapping previsto (per riferimento futuro)**:
```
ContactInfo → Sanity document type: "siteContact" (singleton)
Location    → Sanity document type: "location" (array)
```

---

## 4. Accessibilità link di contatto

**Decision**: Ogni link DEVE avere `aria-label` descrittivo che includa l'azione e il valore.

**Rationale**: Screen reader legge `href="tel:+39333..."` come stringa numerica incomprensibile. L'`aria-label` garantisce WCAG 2.1 AA (SC 2.4.6 Headings and Labels, SC 4.1.2 Name, Role, Value).

**Examples**:
```html
<a href="tel:+39333000000" aria-label="Chiama Dott.ssa Elisa Patti al +39 333 000 0000">
<a href="mailto:info@elisapatti.it" aria-label="Invia email a info@elisapatti.it">
<a href="https://instagram.com/..." aria-label="Profilo Instagram di Elisa Patti (apre nuova tab)">
```
