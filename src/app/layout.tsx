import type { Metadata } from 'next'
import Script from 'next/script'
import { fontDisplay, fontBody } from '@/lib/fonts'
import Footer from '@/components/sections/Footer'
import Navbar from '@/components/sections/Navbar'
import './globals.css'

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export const metadata: Metadata = {
  title: 'Dott.ssa Elisa Patti — Biologa Nutrizionista',
  description:
    'Percorsi nutrizionali personalizzati con la Dott.ssa Elisa Patti, Biologa Nutrizionista. Prenota la tua consulenza gratuita.',
  metadataBase: new URL('https://elisapatti.it'),
  openGraph: {
    title: 'Dott.ssa Elisa Patti — Biologa Nutrizionista',
    description:
      'Percorsi nutrizionali personalizzati con la Dott.ssa Elisa Patti, Biologa Nutrizionista. Prenota la tua consulenza gratuita.',
    url: 'https://elisapatti.it',
    siteName: 'Dott.ssa Elisa Patti',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/images/dottoressa/elisa-patti-studio-1.jpg',
        alt: 'Dott.ssa Elisa Patti, Biologa Nutrizionista',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dott.ssa Elisa Patti — Biologa Nutrizionista',
    description:
      'Percorsi nutrizionali personalizzati con la Dott.ssa Elisa Patti, Biologa Nutrizionista. Prenota la tua consulenza gratuita.',
    images: ['/images/dottoressa/elisa-patti-studio-1.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={`${fontDisplay.variable} ${fontBody.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
