import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type CardVariant = 'default' | 'muted' | 'warm'
type CardShadow = 'sm' | 'md' | 'lg' | 'none'

interface CardProps {
  variant?: CardVariant
  shadow?: CardShadow
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white',
  muted:   'bg-[#F2F5EF]',
  warm:    'bg-[#FBF8F4]',
}

const shadowClasses: Record<CardShadow, string> = {
  none: '',
  sm:   'shadow-[0_1px_3px_rgba(26,22,18,0.08),0_1px_2px_rgba(26,22,18,0.04)]',
  md:   'shadow-[0_4px_12px_rgba(26,22,18,0.10),0_2px_4px_rgba(26,22,18,0.06)]',
  lg:   'shadow-[0_12px_32px_rgba(26,22,18,0.12),0_4px_8px_rgba(26,22,18,0.06)]',
}

export function Card({
  variant = 'default',
  shadow = 'md',
  className,
  children,
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl p-6',
          variantClasses[variant],
          shadowClasses[shadow],
          className,
        ),
      )}
    >
      {children}
    </div>
  )
}
