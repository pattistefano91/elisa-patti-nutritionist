import { clsx } from 'clsx'

interface ContainerProps {
  className?: string
  children: React.ReactNode
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={clsx(
        'w-full mx-auto px-5 md:px-12',
        className,
      )}
      style={{ maxWidth: 'var(--layout-max-width)' }}
    >
      {children}
    </div>
  )
}
