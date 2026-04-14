import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

export const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})

export const fontBody = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
})
