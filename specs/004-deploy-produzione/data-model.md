# Data Model: Deploy Produzione

**Feature**: 004-deploy-produzione  
**Date**: 2026-04-15

---

## Entities

### ProfessionalInfo

Dati professionali della Dott.ssa per il footer. File: `src/data/professional.ts`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | `string` | Yes | Es. "Dott.ssa Elisa Patti" |
| `title` | `string` | Yes | Es. "Biologa Nutrizionista" |
| `alboOrder` | `string` | Yes | Es. "Ordine Nazionale dei Biologi" |
| `alboNumber` | `string` | Yes | Placeholder: `"AA_XXXXX"` — da aggiornare con numero reale |

**Lifecycle**: Dati statici. Nessuna transizione di stato. Modificabili solo via PR.

**Constraints**:
- `alboNumber` è un placeholder sintattico valido — il build non si rompe se contiene il valore placeholder
- Nessuna validazione runtime — i dati sono costanti TypeScript

---

## Environment Variables

Non sono entità nel senso tradizionale, ma sono i "dati configurabili" di questa feature.

| Variabile | Type | Required | Description |
|-----------|------|----------|-------------|
| `SITE_URL` | `string` | No | URL base per next-sitemap. Default: `http://localhost:3000` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `string` | No | Dominio registrato su Plausible. Se assente, script non iniettato |

---

## Static Pages (non-entities, ma "contenuto dati")

### PrivacyPolicyContent

File: `src/app/privacy/page.tsx`  
Contenuto: testo boilerplate italiano GDPR art. 13 per professionista sanitario  
Aggiornabile da: Dott.ssa o legale tramite PR (no CMS — giustificato: contenuto legale non editoriale)

### CookiePolicyContent

File: `src/app/cookie-policy/page.tsx`  
Contenuto: descrizione cookie tecnici only (no profilazione, no terze parti)  
Aggiornabile da: Dott.ssa o legale tramite PR

---

## No Complex Entities

Questa feature non introduce entità con relazioni, state machine, o persistenza. Il modello dati è intenzionalmente semplice (YAGNI).
