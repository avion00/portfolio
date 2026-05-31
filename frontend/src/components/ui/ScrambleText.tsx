import {
  createElement,
  useCallback,
  useEffect,
  useRef,
  type ElementType,
} from 'react'
import { cn, prefersReducedMotion } from '@/lib/utils'

const CHARS = '!<>-_\\/[]{}=+*^?#·:.'

interface ScrambleTextProps {
  text: string
  as?: ElementType
  className?: string
  /** When this becomes true the scramble plays. Defaults to play on mount. */
  play?: boolean
  /** Re-run the scramble on pointer enter. */
  hover?: boolean
  /** Higher = slower resolve. */
  speed?: number
}

/**
 * Decodes text from random characters into the final string — the classic
 * "matrix/scramble" reveal. Driven imperatively via a ref so it never triggers
 * React re-renders. Respects prefers-reduced-motion.
 */
export function ScrambleText({
  text,
  as: Tag = 'span',
  className,
  play = true,
  hover = false,
  speed = 1,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null)
  const rafRef = useRef(0)
  const frameRef = useRef(0)

  const scramble = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.textContent = text
      return
    }

    const chars = [...text]
    const queue = chars.map((to) => {
      const start = Math.floor(Math.random() * 16 * speed)
      const end = start + Math.floor(Math.random() * 16 * speed) + 8
      return { to, start, end, char: '' }
    })

    cancelAnimationFrame(rafRef.current)
    frameRef.current = 0

    const update = () => {
      let output = ''
      let complete = 0
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i]
        if (frameRef.current >= q.end) {
          complete++
          output += q.to === ' ' ? '&nbsp;' : q.to
        } else if (frameRef.current >= q.start) {
          if (!q.char || Math.random() < 0.28) {
            q.char = CHARS[Math.floor(Math.random() * CHARS.length)]
          }
          output += `<span style="opacity:.5">${q.char}</span>`
        }
      }
      el.innerHTML = output
      if (complete === queue.length) {
        el.textContent = text
        return
      }
      frameRef.current++
      rafRef.current = requestAnimationFrame(update)
    }
    update()
  }, [text, speed])

  useEffect(() => {
    if (play) scramble()
    return () => cancelAnimationFrame(rafRef.current)
  }, [play, scramble])

  return createElement(
    Tag,
    {
      ref,
      className: cn(className),
      ...(hover ? { onPointerEnter: scramble } : {}),
    },
    text,
  )
}
