import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-[#C45C38] text-white',
    'hover:bg-[#9E4528]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C45C38]',
    'shadow-[0_0_20px_rgba(196,92,56,0.30)]',
    'hover:shadow-[0_0_28px_rgba(196,92,56,0.45)]',
  ].join(' '),
  secondary: [
    'bg-[#F2F5EF] text-[#374E30]',
    'border border-[#C2D3B8]',
    'hover:bg-[#E0E9DA]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E8350]',
  ].join(' '),
  ghost: [
    'text-[#4A6840]',
    'hover:bg-[#F2F5EF]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5E8350]',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled ?? loading

  return (
    <button
      {...props}
      disabled={isDisabled}
      data-testid={variant === 'primary' ? 'cta-primary' : undefined}
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center gap-2',
          'rounded-full font-medium',
          'transition-all duration-[150ms]',
          'cursor-pointer select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ),
      )}
    >
      {loading && (
        <svg
          className="animate-spin w-4 h-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
