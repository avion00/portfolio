import { createElement, useEffect, useRef, type ElementType } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn, prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface RevealTextProps {
  /** Either pass a single string (split on \n) or explicit lines. */
  text?: string
  lines?: string[]
  as?: ElementType
  className?: string
  /** Stagger delay between lines (s). */
  stagger?: number
  delay?: number
  start?: string
}

/**
 * Editorial line-by-line mask reveal. Each line sits in an overflow-hidden
 * track and slides up into place when scrolled into view.
 */
export function RevealText({
  text,
  lines,
  as: Tag = 'h2',
  className,
  stagger = 0.12,
  delay = 0,
  start = 'top 85%',
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const resolved = lines ?? (text ? text.split('\n') : [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const inners = el.querySelectorAll<HTMLElement>('[data-line-inner]')
    if (!inners.length) return

    if (prefersReducedMotion()) {
      gsap.set(inners, { yPercent: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inners,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [stagger, delay, start, resolved.length])

  return createElement(
    Tag,
    { ref, className: cn(className) },
    resolved.map((line, i) => (
      <span
        key={i}
        className="block overflow-hidden"
        style={{ paddingBottom: '0.05em' }}
      >
        <span data-line-inner className="block will-change-transform">
          {line || ' '}
        </span>
      </span>
    )),
  )
}
