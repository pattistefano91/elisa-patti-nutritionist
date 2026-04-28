# Research: SEO Locale per Nutrizionista

**Feature Branch**: `017-local-seo`
**Generated**: 2026-04-28

---

## Decision 1: Schema.org type — quale tipo usare per una nutrizionista

**Decision**: `LocalBusiness` con `@type: ["LocalBusiness", "MedicalBusiness"]` + `Person` separato

**Rationale**: `MedicalBusiness` è il tipo più specifico per uno studio medico/sanitario e include `Physician`, `Dentist`, `Nutritionist` come sottotipi. La constitution specifica esplicitamente `MedicalBusiness`. Google riconosce `MedicalBusiness` per i rich result in ambito sanitario. `Person` separato descrive Elisa come professionista individuale.

**Schema types usati**:
- `LocalBusiness` + `MedicalBusiness` → studio / attività professionale
- `Person` + `medicalSpecialty: Nutrition` → Elisa Patti come individuo
- `BreadcrumbList` → navigazione pagine interne

**Alternatives considered**:
- Solo `Person` → non cattura l'aspetto "attività locale" con indirizzo, area servita
- `Physician` → troppo specifico per un biologo nutrizionista (non è un medico)

---

## Decision 2: Iniezione JSON-LD in Next.js App Router

**Decision**: Componente React `<JsonLd>` che restituisce `<script type="application/ld+json" dangerouslySetInnerHTML>` — inserito direttamente nel JSX di layout/page

**Rationale**: In Next.js App Router, `<script>` tags in Server Components vengono automaticamente hoistati nel `<head>`. Non serve `next/script` per JSON-LD (non è JavaScript eseguito, è solo dati). `dangerouslySetInnerHTML` con `JSON.stringify` è sicuro perché il dato è generato internamente (no input utente). Questa è la best practice ufficiale Next.js per structured data.

**Implementation**:
```tsx
// src/components/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

**Alternatives considered**:
- `next/script` con `strategy="beforeInteractive"` → overkill, non necessario per dati statici
- Metadata API `other` field → non supporta JSON-LD strutturato in modo pulito

---

## Decision 3: Dove inserire i JSON-LD

**Decision**:
- `layout.tsx` → `Person` schema (presente su tutte le pagine)
- `app/page.tsx` (homepage) → `LocalBusiness` + `MedicalBusiness` schema
- `app/about/page.tsx` → `BreadcrumbList`
- `app/percorsi/page.tsx` → `BreadcrumbList`

**Rationale**: Google preferisce che `LocalBusiness` sia sulla homepage (pagina più autorevole). `Person` su tutte le pagine rafforza l'identità del professionista. `BreadcrumbList` nelle pagine interne aiuta la comprensione della struttura del sito.

---

## Decision 4: Keyword locali per meta description

**Decision**: includere in ogni description almeno una tra: "Civitanova Marche", "Marche", "MC" + il termine "nutrizionista" / "biologa nutrizionista"

**Keyword target principali**:
- `nutrizionista Civitanova Marche`
- `biologa nutrizionista Marche`
- `nutrizionista Macerata`
- `nutrizionista vicino a me` (coperta implicitamente dalla geolocalizzazione Google)

**Per pagina**:
- Homepage: "Biologa Nutrizionista a Civitanova Marche (MC)"
- /about: "Dott.ssa Elisa Patti — nutrizionista a Civitanova Marche"
- /percorsi: "percorsi nutrizionali personalizzati — Civitanova Marche, Marche"

---

## Decision 5: areaServed nel LocalBusiness

**Decision**: array di città/province target più la regione Marche

```json
"areaServed": [
  "Civitanova Marche",
  "Macerata",
  "Porto Recanati",
  "Recanati",
  "Porto San Giorgio",
  "Fermo",
  "Ancona",
  "Marche"
]
```

**Rationale**: Google usa `areaServed` per determinare la rilevanza geografica nelle ricerche locali. Includere città vicine aumenta la copertura senza penalizzare la rilevanza locale primaria.
