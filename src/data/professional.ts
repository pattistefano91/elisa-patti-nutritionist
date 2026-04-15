export interface ProfessionalInfo {
  name: string
  title: string
  alboOrder: string  // es. "Ordine Nazionale dei Biologi"
  alboNumber: string // es. "AA_12345" — placeholder da aggiornare con numero reale
}

export const PROFESSIONAL: ProfessionalInfo = {
  name: 'Dott.ssa Elisa Patti',
  title: 'Biologa Nutrizionista',
  alboOrder: 'Albo dei Biologi dell\'Emilia Romagna e delle Marche',
  alboNumber: 'Sezione A n. 5404',
}
