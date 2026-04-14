import { clsx } from 'clsx'

interface SkeletonProps {
  className?: string
  rounded?: boolean
}

export function Skeleton({ className, rounded = false }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Caricamento..."
      className={clsx(
        'animate-pulse',
        rounded ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      style={{ backgroundColor: 'var(--color-neutral-200)' }}
    />
  )
}
