# Quickstart: Navigazione

**Feature**: 005-navigazione
**Date**: 2026-04-16

---

## Scenario 1: Navbar desktop funzionante

**Setup**: `npm run dev` → aprire `localhost:3000` su 1280px

**Test**:
```
✓ Navbar visibile in cima alla pagina
✓ Logo "Dott.ssa Elisa Patti" a sinistra (link a /)
✓ Link "Chi sono", "Servizi", "Blog", "Contatti" visibili orizzontalmente
✓ Bottone "Prenota ora" a destra
✓ Scorrere la pagina → navbar rimane in cima (sticky)
✓ Cliccare "Chi sono" → navigazione a /about
✓ Su /about il link "Chi sono" è evidenziato (verde, bold)
```

---

## Scenario 2: Menù hamburger mobile

**Setup**: aprire `localhost:3000` su 375px (DevTools → responsive mode)

**Test**:
```
✓ Link desktop NON visibili
✓ Icona hamburger (3 linee) visibile a destra
✓ Cliccare hamburger → dropdown si apre con link in colonna
✓ Icona diventa X durante apertura
✓ Cliccare un link → dropdown si chiude, navigazione avviene
✓ Cliccare fuori dal dropdown → dropdown si chiude
✓ Premere ESC → dropdown si chiude
```

---

## Scenario 3: Pagine placeholder

**Test**:
```
GET /about       → 200, titolo "Chi sono | Elisa Patti", navbar + footer visibili
GET /servizi     → 200, titolo "Servizi | Elisa Patti", navbar + footer visibili
GET /blog        → 200, titolo "Blog | Elisa Patti", navbar + footer visibili
                    (robots noindex verificabile nel <head>)
```

---

## Scenario 4: Link "Contatti" → anchor homepage

**Test**:
```
Da /about, cliccare "Contatti" nel navbar
→ naviga a /#contatti (homepage + scroll alla sezione contatti)
```

**Nota**: la sezione Contatti nell'homepage deve avere `id="contatti"` — aggiunto in questa feature.

---

## Scenario 5: Aggiungere una nuova voce al menù

**Come fare** (per future spec):
1. Aprire `src/data/navigation.ts`
2. Aggiungere `{ label: 'Nuova Pagina', href: '/nuova-pagina' }` a `NAV_LINKS`
3. Creare `src/app/nuova-pagina/page.tsx`
4. La navbar mostra automaticamente il nuovo link — zero modifiche al componente
