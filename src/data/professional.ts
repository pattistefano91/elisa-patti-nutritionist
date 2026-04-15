export interface ProfessionalInfo {
  name: string
  title: string
  alboOrder: string  // es. "Ordine Nazionale dei Biologi"
  alboNumber: string // es. "AA_12345" — placeholder da aggiornare con numero reale
}

export const PROFESSIONAL: ProfessionalInfo = {
  name: 'Dott.ssa Elisa Patti',
  title: 'Biologa Nutrizionista',
  alboOrder: 'Ordine Nazionale dei Biologi',
  alboNumber: 'AA_XXXXX', // TODO: sostituire con numero iscrizione albo reale
}
