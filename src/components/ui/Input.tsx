import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, disabled, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label"
            style={{ color: 'var(--color-neutral-700)' }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={clsx(
            'w-full px-4 py-3 rounded-lg text-body-md',
            'border transition-all duration-[150ms]',
            'outline-none',
            error
              ? 'border-[#B84040] focus:ring-2 focus:ring-[#B84040]/20'
              : 'border-[#D3CCBF] focus:border-[#5E8350] focus:ring-2 focus:ring-[#5E8350]/15',
            disabled && 'opacity-50 cursor-not-allowed bg-[#F2F0EC]',
            className,
          )}
          style={{
            backgroundColor: disabled ? 'var(--color-neutral-100)' : 'var(--color-surface-card)',
            color: 'var(--color-neutral-900)',
          }}
          {...props}
        />
        {error && (
          <p className="text-body-sm" style={{ color: 'var(--color-error)' }}>
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
