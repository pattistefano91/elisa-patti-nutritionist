# Research: Sezione Servizi

**Feature**: 002-sezione-servizi
**Date**: 2026-04-14

---

## Calendly Popup Widget in Next.js 15

**Decision**: Caricare lo script Calendly tramite `next/script` con `strategy="lazyOnload"`.

**Rationale**:
- `lazyOnload` carica il bundle Calendly dopo che tutti gli altri script della pagina hanno caricato e la finestra è diventata interattiva. Nessun impatto su LCP, FID o CLS.
- Il popup si apre solo al click del CTA (`Calendly.initPopupWidget({ url })`), quindi lo script non blocca mai il rendering.
- Alternativa `strategy="afterInteractive"` carica prima ma non è necessaria per questo use case.

**Implementazione**:
```
<Script
  src="https://assets.calendly.com/assets/external/widget.js"
  strategy="lazyOnload"
/>
<link
  rel="stylesheet"
  href="https://assets.calendly.com/assets/external/widget.css"
/>
```
Il CSS Calendly può essere caricato nell'`<head>` senza bloccare il rendering (è leggero).
Il click handler chiama `(window as any).Calendly?.initPopupWidget({ url: service.calendlyUrl })`.

**Alternatives considered**:
- Iframe inline (embed): più impattante su LCP, richiede spazio fisso nella pagina → scartato
- Redirect nuova tab: peggiore UX, l'utente esce dalla pagina → scartato

---

## GDPR e Calendly (Italia)

**Decision**: Il popup widget Calendly è accettabile senza cookie banner aggiuntivo, a condizione che:
1. Calendly sia menzionato nella Cookie Policy come sub-processor tecnico per prenotazioni
2. La Dott.ssa Patti firmi il DPA (Data Processing Agreement) disponibile su calendly.com/legal/dpa
3. Lo script sia caricato solo su interazione utente (`lazyOnload` + attivazione al click)

**Rationale**:
- Il Garante Privacy italiano distingue tra cookie "tecnici" (necessari per il servizio richiesto dall'utente) e cookie "di profilazione". Il cookie Calendly, impostato solo quando l'utente clicca esplicitamente "Prenota", rientra nella categoria tecnica/funzionale per il servizio richiesto.
- Caricando lo script solo con `lazyOnload` e non eseguendo chiamate Calendly al caricamento pagina, non si ha tracciamento passivo.
- Il DPA di Calendly copre i requisiti GDPR per il trasferimento dati verso USA (Standard Contractual Clauses incluse).

**Azione richiesta (non bloccante per sviluppo)**:
- Aggiungere Calendly alla Cookie Policy del sito (feature futura: footer/legal)
- Firmare DPA Calendly: calendly.com/legal/dpa

**Alternatives considered**:
- Cal.com self-hosted: open source, zero cookie di terze parti, ma richiede infrastruttura server → overkill per questo scope
- Form email manuale: zero dipendenze, ma UX peggiore e carico operativo sulla Dott.ssa → scartato per la consulenza gratuita

---

## Performance: CLS e Calendly CSS

**Decision**: Importare il CSS Calendly in `src/app/layout.tsx` (o nel component) via `<link rel="stylesheet">` nel `<head>`.

**Rationale**: Il CSS Calendly è ~3KB minificato. Caricandolo nell'head si previene un flash visivo al momento dell'apertura del popup (il modal apparirebbe non stilato per un frame). Non impatta CLS perché il popup è overlay, non layout-shifting.

---

## Struttura dati servizi (CMS-readiness)

**Decision**: Definire un array `SERVICES` in `src/data/services.ts` con tipo `Service` esplicito.

**Rationale**: FR-010 richiede che tutti i testi siano aggiornabili in un unico punto. Un array typed in TypeScript:
- È il punto unico di verità per i contenuti
- Ha la stessa forma che avrebbe un documento Sanity (`_type: 'service'`)
- Permette di sostituire l'import con una fetch GROQ senza modificare i componenti
- È type-safe: aggiungere un campo obbligatorio causa errore di compilazione immediato
