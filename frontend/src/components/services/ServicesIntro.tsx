import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Play, ArrowDown } from '@/components/ui/icons'

const EASE = [0.22, 1, 0.36, 1] as const

const HEADING = [
  'I combine AI, automation',
  'and software engineering into',
  'one clear process.',
]

export function ServicesIntro() {
  const navigate = useNavigate()

  return (
    <section
      data-stack-panel
      className="relative flex min-h-[100svh] flex-col bg-ink lg:sticky lg:top-0 lg:h-screen"
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col px-5 pb-12 pt-28 md:px-10 lg:pt-32">
        <SectionLabel dot={false}>
          <span className="text-accent">
            <Play size={9} />
          </span>
          Our Services
        </SectionLabel>

        <div className="flex flex-1 items-center">
          <h1 className="max-w-[18ch] font-display text-[2.4rem] font-medium leading-[1.08] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-7xl">
            {HEADING.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          className="grid grid-cols-1 items-end gap-8 md:grid-cols-2"
        >
          <MagneticButton variant="outline" onClick={() => navigate('/contact')}>
            Start your project
          </MagneticButton>
          <p className="font-mono-label max-w-sm leading-relaxed text-muted/70 md:justify-self-end">
            Over 6+ years my work has evolved from full-stack development into
            enterprise AI systems, automation and intelligent infrastructure.
          </p>
        </motion.div>

        <div className="mt-10 flex items-center gap-2 text-muted/60">
          <ArrowDown size={14} className="animate-bounce" />
          <span className="font-mono-label">Scroll to learn more</span>
        </div>
      </div>

      {/* dim-on-cover overlay (driven by scroll in Services.tsx) */}
      <div
        data-dimmer
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 bg-black"
        style={{ opacity: 0 }}
      />
    </section>
  )
}
