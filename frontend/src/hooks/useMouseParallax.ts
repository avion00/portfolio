import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/utils'

export interface ParallaxState {
  /** Normalised pointer position, -1..1, relative to viewport centre. */
  x: number
  y: number
}

/**
 * Tracks the pointer as a smoothed, normalised vector. Reads happen through a
 * ref so consumers (R3F frame loops, transforms) avoid re-rendering React.
 */
export function useMouseParallax(smoothing = 0.08) {
  const state = useRef<ParallaxState>({ x: 0, y: 0 })
  const target = useRef<ParallaxState>({ x: 0, y: 0 })

  useEffect(() => {
    if (prefersReducedMotion()) return

    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    let raf = 0
    const tick = () => {
      state.current.x += (target.current.x - state.current.x) * smoothing
      state.current.y += (target.current.y - state.current.y) * smoothing
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [smoothing])

  return state
}
