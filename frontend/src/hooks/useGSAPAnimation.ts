import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  /** Selector (within the container) of the children to stagger in. */
  selector?: string
  y?: number
  duration?: number
  stagger?: number
  start?: string
  /** Replay the animation each time it scrolls back into view. */
  once?: boolean
}

/**
 * Reusable scroll-reveal: fades + lifts the matched children when the
 * container scrolls into view. Returns a ref to attach to the container.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T>(null)
  const {
    selector = '[data-reveal]',
    y = 40,
    duration = 0.9,
    stagger = 0.08,
    start = 'top 82%',
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = selector
      ? Array.from(el.querySelectorAll<HTMLElement>(selector))
      : [el]
    if (!targets.length) return

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? 'play none none none'
              : 'play none none reverse',
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [selector, y, duration, stagger, start, once])

  return ref
}

/** Run a custom GSAP setup scoped to a container, with automatic cleanup. */
export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: { el: T }) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => setup({ el }), el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return ref
}
