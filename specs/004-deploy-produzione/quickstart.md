# Quickstart: Deploy Produzione

**Feature**: 004-deploy-produzione  
**Date**: 2026-04-15

---

## Scenario 1: Deploy iniziale su Vercel (dominio non ancora disponibile)

### Prerequisiti
- Branch `main` aggiornato con tutte le feature (002, 003)
- Repository connesso a Vercel

### Passi
1. Merge PR su `main` → Vercel deploy automatico
2. Verifica su URL `*.vercel.app`: hero, servizi, contatti visibili
3. Verifica `/sitemap.xml` — contiene `http://localhost:3000/` (SITE_URL non impostata)
4. Verifica `/robots.txt` — esiste, punta alla sitemap
5. Footer visibile con: nome Dott.ssa, titolo, numero albo placeholder, link Privacy + Cookie Policy
6. Script Plausible NON caricato (NEXT_PUBLIC_PLAUSIBLE_DOMAIN non impostata)

### Test accettazione US1
```
Aprire https://<app>.vercel.app
✓ Hero caricato
✓ Sezione servizi visibile  
✓ Sezione contatti visibile
✓ Footer visibile
✓ /sitemap.xml risponde 200
✓ /robots.txt risponde 200
```

---

## Scenario 2: Attivare Plausible Analytics

### Prerequisiti
- Account creato su plausible.io
- Dominio aggiunto su Plausible (anche `*.vercel.app` come placeholder)

### Passi
1. Vercel dashboard → Settings → Environment Variables
2. Aggiungere: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = `<app>.vercel.app`
3. Vercel rideploy automatico (variabile client-side)
4. Aprire il sito → ispezionare sorgente HTML → cercare `plausible.io/js/script.js`
5. Dashboard Plausible → verificare prima visita registrata

### Test accettazione US2
```
✓ Script plausible.io presente nel sorgente HTML
✓ Dashboard Plausible mostra pageview dopo visita
✓ Nessun cookie impostato (DevTools → Application → Cookies → vuoto)
✓ Con ad-blocker attivo: sito funziona, nessun errore JS
```

---

## Scenario 3: Aggiungere dominio reale (quando disponibile)

### Passi
1. Vercel dashboard → Settings → Domains → Add domain
2. Configurare DNS come indicato da Vercel
3. Vercel dashboard → Settings → Environment Variables → aggiornare:
   - `SITE_URL` = `https://elisapatti.it`
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = `elisapatti.it`
4. Aggiungere dominio reale anche su Plausible dashboard
5. Attendere propagazione DNS (max 48h)

### Test accettazione
```
✓ https://elisapatti.it risponde 200
✓ /sitemap.xml contiene https://elisapatti.it/
✓ Dashboard Plausible registra visite su elisapatti.it
✓ NESSUNA modifica al codice richiesta
```

---

## Scenario 4: Verifica performance PageSpeed Insights

### Passi
1. Aprire https://pagespeed.web.dev/
2. Incollare URL Vercel → selezionare Mobile
3. Verificare:
   - Performance Score ≥ 90
   - LCP ≤ 2.5s
   - CLS ≤ 0.1
   - INP ≤ 200ms

### Se score < 90
- Controllare: la foto hero usa `priority={true}` in next/image?
- Controllare: Calendly script ha `strategy="lazyOnload"`?
- Controllare: Plausible script ha `strategy="afterInteractive"`?
