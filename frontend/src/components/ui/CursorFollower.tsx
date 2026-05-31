import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useAppStore } from '@/store/useAppStore'
import { prefersReducedMotion } from '@/lib/utils'

/**
 * Minimal cursor-tracking dot. The native OS pointer stays visible (so the
 * cursor moves at the user's normal speed); a small inverse-blended dot trails
 * it for a premium accent. Fine-pointer devices only.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const variant = useAppStore((s) => s.cursorVariant)
  const [enabled, setEnabled] = useState(false)

  // 1. Enable only on fine-pointer (non-touch) devices.
  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
  }, [])

  // 2. Wire up GSAP once the dot is in the DOM. Native cursor is left intact.
  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    if (!dot) return
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  if (!enabled) return null

  const isView = variant === 'view'
  const isHover = variant === 'hover'
  const hidden = variant === 'hidden'

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference"
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: isView ? 30 : isHover ? 18 : 8,
          height: isView ? 30 : isHover ? 18 : 8,
          opacity: hidden ? 0 : isView ? 0.7 : 1,
        }}
      />
    </div>
  )
}
