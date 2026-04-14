import { clsx } from 'clsx'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={clsx('w-px self-stretch', className)}
        style={{ backgroundColor: 'var(--color-neutral-200)' }}
      />
    )
  }

  return (
    <hr
      className={clsx('border-0 h-px w-full', className)}
      style={{ backgroundColor: 'var(--color-neutral-200)' }}
    />
  )
}
