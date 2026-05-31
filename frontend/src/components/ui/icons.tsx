import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 18): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

export function ArrowUpRight({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

export function ArrowRight({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export function ArrowDown({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 5v14" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  )
}

export function Globe({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </svg>
  )
}

export function Sun({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function Moon({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

export function MenuLines({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  )
}

export function Close({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  )
}

export function Play({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M7 4.5 19 12 7 19.5Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Plus({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function Spinner({ size, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  )
}
