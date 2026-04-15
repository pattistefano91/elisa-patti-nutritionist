import Link from 'next/link'
import { Container } from '@/components/ui'
import { PROFESSIONAL } from '@/data/professional'

export default function Footer() {
  return (
    <footer className="bg-surface-muted border-t border-neutral-200 py-8 mt-auto">
      <Container>
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div className="space-y-1">
            <p className="text-label font-semibold text-neutral-800">
              {PROFESSIONAL.name}
            </p>
            <p className="text-caption text-neutral-600">
              {PROFESSIONAL.title}
            </p>
            <p className="text-caption text-neutral-500">
              Iscritta all&apos;{PROFESSIONAL.alboOrder} n.&nbsp;{PROFESSIONAL.alboNumber}
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <Link
              href="/privacy"
              className="text-caption text-neutral-500 hover:text-neutral-800 hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="text-caption text-neutral-500 hover:text-neutral-800 hover:underline transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
