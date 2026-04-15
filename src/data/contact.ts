export interface ContactInfo {
  email: string
  phone: string        // formato E.164 es. "+39333000000"
  phoneDisplay: string // formato leggibile es. "+39 333 000 0000"
  instagramUrl: string
  instagramHandle: string // es. "@elisapatti"
}

export interface Location {
  id: string
  name?: string    // nome studio opzionale
  address: string  // via e numero civico
  city: string
  cap: string
  province: string // sigla es. "MI"
  googleMapsUrl: string
}

export const CONTACT: ContactInfo = {
  email: 'info@elisapatti.it',
  phone: '+39000000000',
  phoneDisplay: '+39 000 000 0000',
  instagramUrl: 'https://instagram.com/elisapatti',
  instagramHandle: '@elisapatti',
}

export const LOCATIONS: Location[] = [
  {
    id: 'studio-1',
    name: 'Studio Nutrizionale',
    address: 'Via Placeholder 1',
    city: 'Città',
    cap: '00000',
    province: 'XX',
    googleMapsUrl: 'https://maps.google.com/?q=Via+Placeholder+1+Città',
  },
]
