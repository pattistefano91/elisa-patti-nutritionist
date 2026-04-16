# Contract: Variabili d'Ambiente

**Feature**: 004-deploy-produzione  
**Date**: 2026-04-15

---

## SITE_URL

| Campo | Valore |
|-------|--------|
| Tipo | `string` (URL assoluto) |
| Scope | Build-time (server-only) |
| Required | No |
| Default | `http://localhost:3000` |
| Consumer | `next-sitemap.config.js` |

**Formato atteso**: URL assoluto con schema (`https://` o `http://`), senza trailing slash  
**Esempio valido**: `https://elisapatti.it`  
**Esempio invalido**: `elisapatti.it` (manca lo schema)

**Comportamento se assente**:
- Il build NON fallisce
- `sitemap.xml` contiene URL `http://localhost:3000/...` — non inviata a Google
- Il sito funziona normalmente su `*.vercel.app`

**Aggiornamento**: solo Vercel dashboard → Settings → Environment Variables → nessun rideploy manuale richiesto (Vercel rideploy automaticamente se impostata via UI)

---

## NEXT_PUBLIC_PLAUSIBLE_DOMAIN

| Campo | Valore |
|-------|--------|
| Tipo | `string` (hostname senza schema) |
| Scope | Client-side (prefisso `NEXT_PUBLIC_`) |
| Required | No |
| Default | — (undefined) |
| Consumer | `src/app/layout.tsx` (Script Plausible) |

**Formato atteso**: hostname senza schema e senza trailing slash  
**Esempio valido**: `elisapatti.it`  
**Esempio invalido**: `https://elisapatti.it` (non deve avere lo schema)

**Comportamento se assente**:
- Lo script Plausible NON viene iniettato nel HTML
- Il sito funziona normalmente senza analytics
- Nessun errore JS

**Aggiornamento**: solo Vercel dashboard → Settings → Environment Variables → richiede rideploy (variabile client-side è embedded nel bundle al build-time)

---

## .env.example

Il file `.env.example` (da committare in git) documenta entrambe le variabili:

```env
# URL base del sito — usato da next-sitemap per generare sitemap.xml
# Impostare in Vercel dashboard. Lasciare vuoto per usare il default (localhost:3000)
SITE_URL=

# Dominio registrato su Plausible Analytics (es. elisapatti.it)
# Senza questo valore, lo script Plausible non viene caricato
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```
