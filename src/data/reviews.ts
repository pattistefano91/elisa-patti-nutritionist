export interface Review {
  id: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  text?: string
  date: string
}

export interface ReviewsConfig {
  averageRating: number
  totalCount: number
  googleUrl: string
  reviews: Review[]
}

export const REVIEWS_CONFIG: ReviewsConfig = {
  averageRating: 5.0,
  totalCount: 38,
  googleUrl:
    'https://www.google.com/search?q=Biologa+Nutrizionista+Dott.ssa+Patti+Elisa',
  reviews: [
    {
      id: 'review-01',
      author: 'Alessia M.',
      rating: 5,
      text: 'La Dott.ssa Patti è preparatissima e molto empatica. Mi ha seguita con attenzione e professionalità. Il percorso nutrizionale che mi ha preparato ha cambiato il mio rapporto con il cibo.',
      date: 'febbraio 2025',
    },
    {
      id: 'review-02',
      author: 'Marco T.',
      rating: 5,
      text: 'Finalmente una nutrizionista che ascolta davvero. Nessuna dieta standard, percorso costruito su di me. Consiglio a tutti.',
      date: 'gennaio 2025',
    },
    {
      id: 'review-03',
      author: 'Giulia R.',
      rating: 5,
      text: 'Professionale, disponibile e sempre aggiornata. Ha saputo aiutarmi a gestire problemi legati all\'intestino con una dieta mirata e gentile. Risultati visibili già dopo poche settimane.',
      date: 'marzo 2025',
    },
    {
      id: 'review-04',
      author: 'Sara B.',
      rating: 5,
      text: 'Ho trovato in lei non solo una professionista competente ma anche una persona genuinamente interessata al mio benessere. Il piano alimentare è pratico e sostenibile nella vita di tutti i giorni.',
      date: 'dicembre 2024',
    },
    {
      id: 'review-05',
      author: 'Luca F.',
      rating: 5,
      text: 'Seguo la Dott.ssa Patti per nutrizione sportiva. Ottima preparazione, consigli concreti e mai dogmatici. Ho migliorato le prestazioni e mi sento molto meglio.',
      date: 'novembre 2024',
    },
    {
      id: 'review-06',
      author: 'Valentina C.',
      rating: 5,
      text: 'Molto soddisfatta! Approccio scientifico ma anche umano. Mi ha spiegato tutto in modo chiaro e mi ha aiutata a capire come mangiare meglio senza privazioni.',
      date: 'ottobre 2024',
    },
    {
      id: 'review-07',
      author: 'Davide P.',
      rating: 5,
      text: 'Competente, precisa e sempre disponibile per domande. Ha risolto problemi che avevo da anni con una dieta personalizzata. La consiglio senza esitazione.',
      date: 'settembre 2024',
    },
    {
      id: 'review-08',
      author: 'Chiara N.',
      rating: 5,
      text: 'La Dott.ssa Patti mi ha accompagnata in un percorso completo, con follow-up costanti e adattamenti al piano. Finalmente ho trovato il mio equilibrio alimentare.',
      date: 'agosto 2024',
    },
  ],
}
