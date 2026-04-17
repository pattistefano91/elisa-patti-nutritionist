export interface PhotoInfo {
  src: string
  alt: string
  width: number
  height: number
}

export interface PhilosophyValue {
  icon: string
  title: string
  description: string
}

export interface Credential {
  year?: string
  title: string
  institution?: string
}

export interface AboutContent {
  bio: string
  photo: PhotoInfo
  philosophy: PhilosophyValue[]
  credentials: Credential[]
}

export const ABOUT_CONTENT: AboutContent = {
  bio: `Sono la Dott.ssa Elisa Patti, Biologa Nutrizionista iscritta all'Albo dei Biologi
dell'Emilia Romagna e delle Marche. Mi occupo di nutrizione clinica e benessere alimentare
con un approccio scientifico e profondamente umano. Il mio obiettivo è accompagnare ogni
persona in un percorso nutrizionale su misura, che rispetti le sue esigenze, i suoi ritmi
e il suo stile di vita.`,

  photo: {
    src: '/images/dottoressa/elisa-patti-studio-1.jpg',
    alt: 'Dott.ssa Elisa Patti, Biologa Nutrizionista, nel suo studio a Civitanova Marche',
    width: 800,
    height: 1000,
  },

  philosophy: [
    {
      icon: '🌿',
      title: 'Approccio personalizzato',
      description:
        'Ogni percorso è unico come la persona che lo intraprende. Nessun piano alimentare standard: solo strategie costruite su misura per te.',
    },
    {
      icon: '🔬',
      title: 'Basi scientifiche',
      description:
        'Ogni consiglio è fondato su evidenze scientifiche aggiornate e linee guida internazionali. La nutrizione è una scienza: la tratto come tale.',
    },
    {
      icon: '❤️',
      title: 'Ascolto e rispetto',
      description:
        'La relazione con il paziente è al centro di tutto. Ascolto, empatia e rispetto dei tempi di ognuno sono la base del nostro lavoro insieme.',
    },
    {
      icon: '🌱',
      title: 'Nutrizione come stile di vita',
      description:
        "L'obiettivo non è una dieta temporanea, ma costruire un rapporto sereno e duraturo con il cibo, che duri nel tempo.",
    },
  ],

  credentials: [
    {
      title: 'Laurea Triennale in Biologia della Nutrizione',
    },
    {
      title: 'Laurea Magistrale in Biologia Molecolare, Sanitaria e della Nutrizione',
    },
    {
      title: 'Corso di formazione in Nutrizione Sportiva "Eat to Perform"',
      institution: 'Scuola di Nutrizione Salernitana',
    },
    {
      title: 'Corso di Formazione in Nutrizione Applicata "Dalla Scienza al Campo"',
      institution: 'Dolikos',
    },
    {
      title: 'Corso di Formazione "IBS e dieta Low FODMAP"',
      institution: 'Scuola di Nutrizione Salernitana',
    },
    {
      title: 'Corso di Aggiornamento "Integrazione nello Sport"',
      institution: 'Scuola di Nutrizione Salernitana',
    },
    {
      title: 'Seminario "Strategie proteiche per l\'ottimizzazione della risposta insulinica nell\'attività fisica"',
      institution: 'SIFA',
    },
    {
      title: 'Seminario "Lipedema e Linfedema"',
      institution: 'Scuola di Nutrizione Salernitana',
    },
    {
      title: 'Seminario "Psoriasi e Artrite Psoriasica: il ruolo dell\'alimentazione nella gestione della malattia"',
      institution: 'SIFA',
    },
    {
      title: 'Corso monotematico in Medicina Biointegrata',
      institution: 'FOD. MED. SRL',
    },
    {
      title: 'Tirocinio formativo post-laurea di 150 ore',
    },
  ],
}
