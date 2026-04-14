import { clsx } from 'clsx'

type AvatarSize = 'sm' | 'md' | 'lg'

interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: AvatarSize
  className?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-body-sm',
  md: 'w-12 h-12 text-body-md',
  lg: 'w-16 h-16 text-body-lg',
}

export function Avatar({ src, alt = '', initials, size = 'md', className }: AvatarProps) {
  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0',
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium select-none">{initials}</span>
      )}
    </div>
  )
}
