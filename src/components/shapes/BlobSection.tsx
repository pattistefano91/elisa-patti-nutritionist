interface BlobSectionProps {
  className?: string
}

export function BlobSection({ className = '' }: BlobSectionProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M60,15 C100,5 180,35 185,85 C190,135 150,185 95,185 C40,185 8,145 12,85 C16,25 20,25 60,15Z"
      />
    </svg>
  )
}
