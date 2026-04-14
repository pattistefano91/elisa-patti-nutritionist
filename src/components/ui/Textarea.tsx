import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, disabled, className, id, rows = 4, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-label"
            style={{ color: 'var(--color-neutral-700)' }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          className={clsx(
            'w-full px-4 py-3 rounded-lg text-body-md resize-y',
            'border transition-all duration-[150ms]',
            'outline-none',
            error
              ? 'border-[#B84040] focus:ring-2 focus:ring-[#B84040]/20'
              : 'border-[#D3CCBF] focus:border-[#5E8350] focus:ring-2 focus:ring-[#5E8350]/15',
            disabled && 'opacity-50 cursor-not-allowed',
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

Textarea.displayName = 'Textarea'
