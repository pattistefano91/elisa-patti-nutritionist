export type ColoreAccent = 'primary' | 'secondary' | 'accent'

export interface PercorsoNutrizionale {
  id: string
  nome: string
  destinatari: string
  obiettivo: string
  benefici: string[]
  coloreAccent: ColoreAccent
}

export const PERCORSI: PercorsoNutrizionale[] = [
  {
    id: 'metabolismo-glicemia',
    nome: 'Metabolismo & Glicemia sotto controllo',
    destinatari:
      'Per chi soffre di insulino-resistenza, diabete o difficoltà nella gestione della glicemia.',
    obiettivo:
      'Stabilizzare la glicemia, ridurre i picchi e migliorare energia e benessere quotidiano.',
    benefici: [
      'Piano nutrizionale personalizzato',
      'Educazione alimentare pratica',
      'Strategie per gestire i pasti nella vita reale',
      'Monitoraggio e adattamenti progressivi',
    ],
    coloreAccent: 'primary',
  },
  {
    id: 'reset-intestinale',
    nome: 'Reset Intestinale',
    destinatari:
      'Per chi soffre di gonfiore, disturbi digestivi o problematiche intestinali.',
    obiettivo:
      'Ridurre i sintomi, migliorare la digestione e ritrovare leggerezza.',
    benefici: [
      'Analisi delle abitudini alimentari',
      'Piano nutrizionale mirato',
      'Supporto nella gestione dei sintomi',
      'Percorso graduale e sostenibile',
    ],
    coloreAccent: 'secondary',
  },
  {
    id: 'performance-nutrition',
    nome: 'Performance Nutrition',
    destinatari:
      'Atleti e persone attive che vogliono migliorare performance, recupero e composizione corporea.',
    obiettivo: 'Ottimizzare energia, prestazione e risultati.',
    benefici: [
      'Piano nutrizionale su misura per allenamenti e obiettivi',
      'Strategie pre e post workout',
      'Supporto nel miglioramento della composizione corporea',
      'Monitoraggio continuo',
    ],
    coloreAccent: 'accent',
  },
]
