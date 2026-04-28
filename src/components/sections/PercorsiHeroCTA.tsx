'use client'

import { Button } from '@/components/ui/Button'
import { SERVICES_CTA_URL } from '@/data/services'

function openCalendly() {
  if ((window as any).Calendly) {
    ;(window as any).Calendly.initPopupWidget({ url: SERVICES_CTA_URL })
  } else {
    window.open(SERVICES_CTA_URL, '_blank', 'noopener,noreferrer')
  }
}

export function PercorsiHeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button variant="primary" size="lg" onClick={openCalendly}>
        Prenota ora
      </Button>
      <a
        href="#percorsi"
        className="inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-[150ms] cursor-pointer select-none px-8 py-4 text-lg bg-[#F2F5EF] text-[#374E30] border border-[#C2D3B8] hover:bg-[#E0E9DA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E8350]"
      >
        Scopri i percorsi ↓
      </a>
    </div>
  )
}
