export const SITE_URL = 'https://nutrizionistaelisapatti.it'
export const SITE_NAME = 'Dott.ssa Elisa Patti — Biologa Nutrizionista'

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'MedicalBusiness'],
  name: 'Dott.ssa Elisa Patti — Biologa Nutrizionista',
  description:
    'Percorsi nutrizionali personalizzati con la Dott.ssa Elisa Patti, Biologa Nutrizionista a Civitanova Marche. Specializzata in metabolismo e glicemia, benessere intestinale e performance nutrition.',
  url: SITE_URL,
  email: 'nutrizionista.elisapatti@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '',
    addressLocality: 'Civitanova Marche',
    addressRegion: 'MC',
    postalCode: '62012',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.3063,
    longitude: 13.7313,
  },
  areaServed: [
    'Civitanova Marche',
    'Macerata',
    'Porto Recanati',
    'Recanati',
    'Porto San Giorgio',
    'Fermo',
    'Ancona',
    'Marche',
  ],
  priceRange: '€€',
  openingHoursSpecification: [],
  sameAs: [],
}

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Elisa Patti',
  jobTitle: 'Biologa Nutrizionista',
  url: SITE_URL,
  email: 'nutrizionista.elisapatti@gmail.com',
  worksFor: {
    '@type': 'MedicalBusiness',
    name: 'Studio Nutrizionista Elisa Patti',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Civitanova Marche',
      addressRegion: 'MC',
      addressCountry: 'IT',
    },
  },
  knowsAbout: ['Nutrizione', 'Dietetica', 'Metabolismo', 'Glicemia', 'Performance Nutrition'],
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.url}`,
      })),
    ],
  }
}
