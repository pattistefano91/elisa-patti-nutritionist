interface BlobHeroProps {
  className?: string
  style?: React.CSSProperties
}

export function BlobHero({ className = '', style }: BlobHeroProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M80,10 C120,0 190,40 190,90 C190,150 140,195 90,190 C40,185 5,150 10,90 C15,30 40,20 80,10Z"
      />
    </svg>
  )
}
