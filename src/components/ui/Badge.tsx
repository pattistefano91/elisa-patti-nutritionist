import { clsx } from 'clsx'

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  primary:   'bg-[#E8F0E5] text-[#3D6B30]',
  secondary: 'bg-[#F5EDD9] text-[#8A6A2E]',
  accent:    'bg-[#FAE8DF] text-[#A03D1E]',
  neutral:   'bg-[#EFEDE8] text-[#5A5448]',
}

export function Badge({ variant = 'neutral', className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-label',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
