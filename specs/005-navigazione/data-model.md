# Data Model: Navigazione

**Feature**: 005-navigazione
**Date**: 2026-04-16

---

## Entities

### NavLink

Voce di navigazione. File: `src/data/navigation.ts`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `label` | `string` | Yes | Testo visibile nel menù (es. "Chi sono") |
| `href` | `string` | Yes | URL di destinazione (es. `/about`, `/#contatti`) |
| `isExternal` | `boolean` | No | Default `false`; se `true` apre in nuova tab |

**Constraints**:
- `href` che inizia con `/#` → anchor sulla homepage (Contatti)
- `href` che inizia con `/` → route interna Next.js
- Lista statica — modificabile solo via PR (nessun CMS; navigazione è struttura, non contenuto editoriale)

**Istanze** (`NAV_LINKS: NavLink[]`):

| label | href | isExternal |
|-------|------|------------|
| Chi sono | /about | false |
| Servizi | /servizi | false |
| Blog | /blog | false |
| Contatti | /#contatti | false |

---

### NavbarState

Stato interno del componente `Navbar.tsx` (non persistito, solo React state).

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| `isOpen` | `boolean` | `false` | Menù mobile aperto/chiuso |

**Transizioni**:
- `false → true`: click hamburger
- `true → false`: click link, tasto ESC, click esterno al dropdown

---

## No Complex Entities

Questa feature non ha entità con persistenza, relazioni DB, o lifecycle complessi.
Il "data model" è puramente una lista statica di link configurabili.
