interface BlobFrameProps {
  className?: string
}

export function BlobFrame({ className = '' }: BlobFrameProps) {
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
        d="M70,5 C110,-5 185,30 190,80 C195,130 160,190 100,190 C40,190 0,155 5,90 C10,25 30,15 70,5Z"
      />
    </svg>
  )
}
