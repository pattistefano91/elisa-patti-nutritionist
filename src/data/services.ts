export type ServiceMode = 'studio' | 'online' | 'entrambe'

export interface Service {
  id: string
  name: string
  description: string
  duration: string
  mode: ServiceMode
  modeLabel: string
  tag?: string
  tagVariant?: 'primary' | 'secondary' | 'accent' | 'neutral'
  calendlyUrl: string
  bullets?: string[]
  featured?: boolean
}

export interface IncludedService {
  id: string
  name: string
  subtitle: string
  description: string
  icon: string
}

export const SERVICES: Service[] = [
  {
    id: 'consulenza-gratuita',
    name: 'Consulenza Gratuita',
    description:
      '15 minuti per conoscerci e capire come posso aiutarti. Valutiamo insieme le tue esigenze, chiarisci i tuoi dubbi e scopri il percorso più adatto a te.',
    duration: '15 min',
    mode: 'online',
    modeLabel: 'Online / Telefono',
    tag: 'Gratuita',
    tagVariant: 'accent',
    calendlyUrl: 'https://calendly.com/elisapatti/consulenza-gratuita',
    featured: true,
  },
  {
    id: 'prima-visita',
    name: 'Prima Visita Nutrizionale',
    description:
      'Il primo passo per capire davvero da dove partire. Analizziamo storia clinica, obiettivi, stile di vita e abitudini alimentari. Al termine ricevi il tuo piano alimentare personalizzato.',
    duration: '60 min',
    mode: 'studio',
    modeLabel: 'In studio',
    calendlyUrl: 'https://calendly.com/elisapatti/prima-visita',
    bullets: [
      'Valutazione corporea completa (peso, BIA, plicometria)',
      'Analisi esami ematochimici e diagnostici',
      'Piano alimentare personalizzato incluso',
    ],
  },
  {
    id: 'visite-controllo',
    name: 'Visite di Controllo',
    description:
      'Per monitorare, adattare e migliorare il percorso nel tempo. Aggiornamento del piano alimentare, monitoraggio dei progressi e supporto continuo.',
    duration: '45 min',
    mode: 'studio',
    modeLabel: 'In studio',
    calendlyUrl: 'https://calendly.com/elisapatti/visita-controllo',
    bullets: [
      'Aggiornamento del piano alimentare',
      'Monitoraggio progressi e misurazioni',
      'Percorsi a pacchetto 3 o 6 mesi disponibili',
    ],
  },
  {
    id: 'visita-online',
    name: 'Visita Online',
    description:
      'La stessa qualità della visita in studio, comoda e flessibile. Perfetta per chi ha poco tempo o vive lontano.',
    duration: '60 min',
    mode: 'online',
    modeLabel: 'Videochiamata',
    calendlyUrl: 'https://calendly.com/elisapatti/visita-online',
    bullets: [
      'Stessa qualità della visita in studio',
      'Comoda e flessibile, ovunque tu sia',
      'Disponibile per prima visita e controlli',
    ],
  },
]

export const INCLUDED_SERVICES: IncludedService[] = [
  {
    id: 'newsletter',
    name: 'Nutrizione Pratica',
    subtitle: 'Newsletter mensile gratuita',
    description:
      'Ogni mese riceverai un ricettario sano e semplice e una guida nutrizionale pratica per trasformare la teoria in abitudini quotidiane.',
    icon: '📩',
  },
]

export const SERVICES_CTA_URL = SERVICES[0]!.calendlyUrl
