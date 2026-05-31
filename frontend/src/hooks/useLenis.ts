import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

/** Access the shared Lenis instance from anywhere (e.g. anchor scrolls). */
export const getLenis = () => lenisInstance

/** Smooth-scroll helper used by nav links and CTA buttons. */
export const scrollToTarget = (
  target: string | HTMLElement | number,
  offset = 0,
) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 })
  } else if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Initialise Lenis once and drive it from GSAP's ticker so ScrollTrigger and
 * Lenis stay perfectly in sync. Respects prefers-reduced-motion.
 */
export function useLenis() {
  useEffect(() => {
    const reduce = prefersReducedMotion()

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      lerp: 0.1,
    })
    lenisInstance = lenis

    document.documentElement.classList.add('lenis')

    lenis.on('scroll', ScrollTrigger.update)

    const onRaf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    // Keep ScrollTrigger measurements correct after fonts/images settle.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      gsap.ticker.remove(onRaf)
      window.removeEventListener('load', refresh)
      lenis.destroy()
      document.documentElement.classList.remove('lenis')
      lenisInstance = null
    }
  }, [])
}
