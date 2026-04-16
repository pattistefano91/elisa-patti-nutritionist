'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { Container } from '@/components/ui'
import { NAV_LINKS } from '@/data/navigation'

const CALENDLY_URL = 'https://calendly.com/elisapatti/consulenza-gratuita'

function openCalendly() {
  if (typeof window !== 'undefined' && (window as any).Calendly) {
    ;(window as any).Calendly.initPopupWidget({ url: CALENDLY_URL })
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  // Chiudi su ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Chiudi su click esterno
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handler)
    }
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    // anchor link (#contatti) → attivo solo sulla homepage
    if (href.startsWith('/#')) return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav
      ref={navRef}
      aria-label="Navigazione principale"
      className="sticky top-0 z-50 border-b border-neutral-200"
      style={{ backgroundColor: 'var(--color-surface-page)' }}
    >
      <Container>
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-heading-5 transition-opacity hover:opacity-75"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Dott.ssa Elisa Patti
          </Link>

          {/* Link */}
          <ul className="flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={clsx(
                    'text-label transition-colors',
                    isActive(link.href)
                      ? 'font-semibold'
                      : 'hover:opacity-80',
                  )}
                  style={{
                    color: isActive(link.href)
                      ? 'var(--color-primary-600)'
                      : 'var(--color-neutral-600)',
                  }}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={openCalendly}
            aria-label="Prenota consulenza gratuita"
            className="text-label font-semibold px-5 py-2 rounded-full transition-all"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white',
            }}
          >
            Prenota ora
          </button>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-heading-6"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Dott.ssa Elisa Patti
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Chiudi menù' : 'Apri menù'}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-neutral-700)' }}
          >
            {isOpen ? (
              // X icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-neutral-200"
          style={{ backgroundColor: 'var(--color-surface-page)' }}
        >
          <Container>
            <ul className="flex flex-col py-4 gap-1" role="menu">
              {NAV_LINKS.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      'block py-3 text-label transition-colors',
                      isActive(link.href)
                        ? 'font-semibold'
                        : 'hover:opacity-80',
                    )}
                    style={{
                      color: isActive(link.href)
                        ? 'var(--color-primary-600)'
                        : 'var(--color-neutral-700)',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3 border-t border-neutral-100">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    openCalendly()
                  }}
                  className="w-full text-label font-semibold px-5 py-3 rounded-full transition-all"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                  }}
                >
                  Prenota ora
                </button>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </nav>
  )
}
