import {
  useEffect,
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

type Variant = 'solid' | 'outline' | 'ghost'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: Variant
  className?: string
  icon?: ReactNode
  /** Strength of the magnetic pull in px. */
  strength?: number
  type?: 'button' | 'submit'
  disabled?: boolean
  ariaLabel?: string
}

const variants: Record<Variant, string> = {
  solid:
    'bg-accent text-white hover:brightness-110 border border-transparent',
  outline:
    'border border-line-strong text-fg hover:border-accent hover:text-fg bg-transparent',
  ghost: 'text-fg hover:text-accent border border-transparent',
}

/**
 * Button / link with a magnetic hover pull (GSAP) and an animated corner arrow.
 * Updates the global cursor variant so the custom cursor reacts on hover.
 */
export function MagneticButton({
  children,
  onClick,
  href,
  variant = 'outline',
  className,
  icon,
  strength = 28,
  type = 'button',
  disabled,
  ariaLabel,
}: MagneticButtonProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const setRef = (el: HTMLElement | null) => {
    rootRef.current = el
  }
  const labelRef = useRef<HTMLSpanElement>(null)
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)

  useEffect(() => {
    const el = rootRef.current
    if (!el || prefersReducedMotion()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    const lx = labelRef.current
      ? gsap.quickTo(labelRef.current, 'x', { duration: 0.6, ease: 'power3' })
      : null
    const ly = labelRef.current
      ? gsap.quickTo(labelRef.current, 'y', { duration: 0.6, ease: 'power3' })
      : null

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const relX = e.clientX - (r.left + r.width / 2)
      const relY = e.clientY - (r.top + r.height / 2)
      xTo((relX / r.width) * strength)
      yTo((relY / r.height) * strength)
      lx?.((relX / r.width) * strength * 0.4)
      ly?.((relY / r.height) * strength * 0.4)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
      lx?.(0)
      ly?.(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [strength])

  const handleEnter = () => setCursorVariant('hover')
  const handleLeave = () => setCursorVariant('default')

  const content = (
    <>
      <span className="grid h-7 w-7 place-items-center rounded-full border border-current/30 transition-transform duration-500 group-hover:rotate-45">
        {icon ?? <Arrow />}
      </span>
      <span ref={labelRef} className="inline-block">
        {children}
      </span>
    </>
  )

  const classes = cn(
    'group relative inline-flex items-center gap-3 rounded-full px-5 py-3',
    'font-mono-label !tracking-[0.16em] transition-colors duration-300 will-change-transform',
    variants[variant],
    disabled && 'pointer-events-none opacity-50',
    className,
  )

  const onClickGuarded = (e: ReactMouseEvent) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick?.()
  }

  if (href) {
    return (
      <a
        ref={setRef}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        onClick={onClickGuarded}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={setRef}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      className={classes}
      onClick={onClickGuarded}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      {content}
    </button>
  )
}

function Arrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}
