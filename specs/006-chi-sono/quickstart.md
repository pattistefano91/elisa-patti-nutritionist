# Quickstart: Test Pagina Chi sono

**Feature Branch**: `006-chi-sono`

---

## Scenari di test indipendenti

### US1 — Hero split con foto e bio

```bash
npm run dev
# Aprire http://localhost:3000/about su 1280px
```

**Verifica**:
- [ ] Foto della Dott.ssa visibile a sinistra (bordi arrotondati)
- [ ] Nome "Dott.ssa Elisa Patti" e titolo "Biologa Nutrizionista" visibili a destra
- [ ] Paragrafo bio leggibile
- [ ] Layout split (2 colonne) su 1280px
- [ ] Layout stacked (1 colonna) su 375px

---

### US2 — Filosofia e Credenziali

```bash
# Aprire http://localhost:3000/about e scorrere
```

**Verifica**:
- [ ] Sezione "La mia filosofia" con 3-4 voci icona + titolo + descrizione
- [ ] Sezione "Formazione" con almeno una voce (anno, titolo, istituto)
- [ ] Numero albo "Sezione A n. 5404" visibile in fondo alla sezione
- [ ] Struttura semantica corretta (heading, liste)

---

### US3 — CTA Prenota ora

```bash
# Aprire http://localhost:3000/about, scorrere in fondo
```

**Verifica**:
- [ ] Sezione CTA visibile in fondo alla pagina
- [ ] Bottone "Prenota ora" presente e cliccabile
- [ ] Click apre widget Calendly (richiede connessione internet)

---

### Accessibilità

```bash
# Con Playwright e axe
npx playwright test tests/smoke.spec.ts
```

**Verifica**:
- [ ] Zero violazioni WCAG AA
- [ ] `<title>` = "Chi sono | Dott.ssa Elisa Patti"
- [ ] `<img>` ha `alt` non vuoto

---

### SEO

```bash
# Nel browser: View Source di http://localhost:3000/about
```

**Verifica**:
- [ ] `<title>Chi sono | Dott.ssa Elisa Patti</title>`
- [ ] `<meta name="description" content="...">` presente
- [ ] Nessun `<meta name="robots" content="noindex">`
