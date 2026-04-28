export interface NavLink {
  label: string
  href: string
  isExternal?: boolean
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Chi sono', href: '/about' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Contatti', href: '/#contatti' },
]
