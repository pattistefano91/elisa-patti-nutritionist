import type { Metadata } from 'next'
import Script from 'next/script'
import { fontDisplay, fontBody } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dott.ssa Elisa Patti — Biologa Nutrizionista',
  description:
    'Percorsi nutrizionali personalizzati con la Dott.ssa Elisa Patti, Biologa Nutrizionista. Prenota la tua consulenza gratuita.',
  metadataBase: new URL('https://elisapatti.it'),
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
        {children}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
