import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import { BlobHero } from '@/components/shapes/BlobHero'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <main
        className="relative min-h-screen overflow-hidden flex items-center"
        style={{ backgroundColor: 'var(--color-surface-page)' }}
      >
        {/* Blob decorativo — in alto a destra */}
        <BlobHero
          className="absolute -top-16 -right-16 w-80 h-80 md:w-[480px] md:h-[480px] opacity-15 pointer-events-none"
          style={{ color: 'var(--color-primary-400)' } as React.CSSProperties}
        />
        {/* Blob secondario — in basso a sinistra */}
        <BlobHero
          className="absolute -bottom-24 -left-24 w-64 h-64 md:w-96 md:h-96 opacity-10 pointer-events-none rotate-180"
          style={{ color: 'var(--color-secondary-400)' } as React.CSSProperties}
        />

        <div className="relative z-10 w-full px-5 md:px-12 py-24 max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* ── Colonna sinistra: testo ── */}
            <div>
              <p
                className="text-label uppercase mb-4"
                style={{ color: 'var(--color-primary-600)' }}
              >
                Biologa Nutrizionista
              </p>

              <h1
                className="text-heading-1 mb-6"
                style={{ color: 'var(--color-neutral-900)' }}
              >
                Cura il tuo benessere con la nutrizione
              </h1>

              <p
                className="text-body-lg mb-10 max-w-lg"
                style={{ color: 'var(--color-neutral-600)' }}
              >
                Percorsi personalizzati per ritrovare l&apos;equilibrio
                alimentare, migliorare la salute e sentirti bene ogni giorno.
                Con un approccio umano e scientifico.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg">
                  Prenota consulenza gratuita
                </Button>
                <a
                  href="#servizi"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-[150ms] cursor-pointer select-none px-8 py-4 text-lg bg-[#F2F5EF] text-[#374E30] border border-[#C2D3B8] hover:bg-[#E0E9DA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E8350]"
                >
                  Scopri i servizi
                </a>
              </div>
            </div>

            {/* ── Colonna destra: foto ── */}
            <div className="hidden lg:flex justify-center xl:justify-end">
              <div className="relative">

                {/* Blob verde chiaro dietro la foto */}
                <div
                  className="absolute -top-8 -left-8 w-full h-full rounded-[2.5rem]"
                  style={{ backgroundColor: 'var(--color-primary-100)' }}
                />

                {/* Accent secondario in basso a destra */}
                <div
                  className="absolute -bottom-5 -right-5 w-36 h-36 rounded-full"
                  style={{ backgroundColor: 'var(--color-secondary-100)' }}
                />

                {/* Foto */}
                <div
                  className="relative rounded-[2rem] overflow-hidden shadow-2xl"
                  style={{ width: '380px', height: '500px' }}
                >
                  <Image
                    src="/images/dottoressa/elisa-patti-studio-2.jpg"
                    alt="Dott.ssa Elisa Patti, Biologa Nutrizionista"
                    fill
                    className="object-cover object-top"
                    priority
                  />

                  {/* Badge nome in overlay */}
                  <div
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full px-5 py-2.5 shadow-lg whitespace-nowrap"
                    style={{
                      backgroundColor: 'rgba(250, 248, 245, 0.92)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <p
                      className="text-label"
                      style={{ color: 'var(--color-neutral-900)' }}
                    >
                      Dott.ssa Elisa Patti · Biologa Nutrizionista
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Divider />
      <ServicesSection />
      <Divider />
      <ContactSection />
    </>
  )
}
