'use client'

import { SERVICES_CTA_URL } from '@/data/services'

interface Props {
  accentColor: string
}

export function PercorsoCardCTA({ accentColor }: Props) {
  return (
    <button
      onClick={() => {
        if ((window as any).Calendly) {
          ;(window as any).Calendly.initPopupWidget({ url: SERVICES_CTA_URL })
        } else {
          window.open(SERVICES_CTA_URL, '_blank', 'noopener,noreferrer')
        }
      }}
      className="w-full rounded-full py-3 px-6 text-label font-semibold transition-opacity hover:opacity-80 cursor-pointer"
      style={{ backgroundColor: accentColor, color: 'var(--color-surface-page)' }}
    >
      Prenota consulenza gratuita
    </button>
  )
}
