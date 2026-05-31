import { motion } from 'motion/react'
import type { ServiceShape as Shape } from '@/data/serviceDetails'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

/** A full isometric wireframe cube as a single path (12 edges). */
function isoCube(cx: number, cy: number, w: number, h: number) {
  const t = w / 2
  const A: [number, number] = [cx, cy - t]
  const B: [number, number] = [cx + w, cy]
  const C: [number, number] = [cx, cy + t]
  const D: [number, number] = [cx - w, cy]
  const A2: [number, number] = [A[0], A[1] + h]
  const B2: [number, number] = [B[0], B[1] + h]
  const C2: [number, number] = [C[0], C[1] + h]
  const D2: [number, number] = [D[0], D[1] + h]
  const L = (p: [number, number], q: [number, number]) =>
    `M${p[0]} ${p[1]}L${q[0]} ${q[1]}`
  return [
    L(A, B), L(B, C), L(C, D), L(D, A),
    L(A, A2), L(B, B2), L(C, C2), L(D, D2),
    L(A2, B2), L(B2, C2), L(C2, D2), L(D2, A2),
  ].join('')
}

const draw = (delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1.6, ease: EASE, delay },
})

interface ShapeProps {
  shape: Shape
  className?: string
}

/** Decorative blue isometric wireframe graphic, drawn in on view. */
export function ServiceShape({ shape, className }: ShapeProps) {
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 1.25,
    fill: 'none' as const,
    strokeLinejoin: 'round' as const,
  }

  return (
    <svg
      viewBox="0 0 460 420"
      className={cn('w-full max-w-[420px] text-accent', className)}
      aria-hidden
    >
      {shape === 'reel' && (
        <>
          <motion.circle cx="230" cy="210" r="150" {...stroke} {...draw()} />
          <motion.circle cx="230" cy="210" r="44" {...stroke} {...draw(0.2)} />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180
            const x1 = 230 + Math.cos(rad) * 56
            const y1 = 210 + Math.sin(rad) * 56
            const x2 = 230 + Math.cos(rad - 0.32) * 138
            const y2 = 210 + Math.sin(rad - 0.32) * 138
            const x3 = 230 + Math.cos(rad + 0.32) * 138
            const y3 = 210 + Math.sin(rad + 0.32) * 138
            return (
              <motion.path
                key={deg}
                d={`M${x1} ${y1}L${x2} ${y2}L${x3} ${y3}Z`}
                {...stroke}
                {...draw(0.1 + i * 0.06)}
              />
            )
          })}
        </>
      )}

      {shape === 'cube' && (
        <motion.path d={isoCube(230, 150, 150, 150)} {...stroke} {...draw()} />
      )}

      {shape === 'stack' && (
        <>
          <motion.path d={isoCube(230, 250, 150, 90)} {...stroke} {...draw()} />
          <motion.path d={isoCube(230, 120, 110, 70)} {...stroke} {...draw(0.25)} />
        </>
      )}

      {shape === 'cylinder' && (
        <>
          <motion.ellipse cx="230" cy="120" rx="140" ry="60" {...stroke} {...draw()} />
          <motion.path
            d="M90 120 L90 300 M370 120 L370 300"
            {...stroke}
            {...draw(0.2)}
          />
          <motion.path
            d="M90 300 A140 60 0 0 0 370 300"
            {...stroke}
            {...draw(0.35)}
          />
          <motion.ellipse cx="230" cy="210" rx="92" ry="40" {...stroke} {...draw(0.5)} />
        </>
      )}

      {shape === 'steps' && (
        <>
          <motion.path d={isoCube(150, 300, 110, 70)} {...stroke} {...draw()} />
          <motion.path d={isoCube(250, 235, 110, 70)} {...stroke} {...draw(0.2)} />
          <motion.path d={isoCube(350, 170, 110, 70)} {...stroke} {...draw(0.4)} />
        </>
      )}
    </svg>
  )
}
