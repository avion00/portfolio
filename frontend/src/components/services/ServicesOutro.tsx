import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ScrambleText } from '@/components/ui/ScrambleText'
import { Play } from '@/components/ui/icons'
import { PROCESS } from '@/data/serviceDetails'

const EASE = [0.22, 1, 0.36, 1] as const

export function ServicesOutro() {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section
      ref={ref}
      data-stack-panel
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-t border-line bg-ink shadow-[0_-30px_70px_-30px_rgba(0,0,0,0.85)] lg:sticky lg:top-0 lg:h-screen"
    >
      {/* faint concentric triangle wireframe */}
      <svg
        aria-hidden
        viewBox="0 0 600 520"
        className="pointer-events-none absolute right-0 top-1/2 hidden w-[55%] -translate-y-1/2 text-line lg:block"
        fill="none"
      >
        {[0, 70, 140, 210].map((o) => (
          <path
            key={o}
            d={`M${300} ${40 + o} L${560 - o} ${480 - o} L${40 + o} ${480 - o} Z`}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-16 px-5 py-24 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* left — CTA */}
        <div>
          <SectionLabel dot={false}>
            <span className="text-accent">
              <Play size={9} />
            </span>
            Premium by design
          </SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="mt-8 max-w-[16ch] font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl"
          >
            Ready to build, automate and scale your business with AI and modern
            software?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mt-10"
          >
            <MagneticButton variant="solid" onClick={() => navigate('/contact')}>
              Start a Project
            </MagneticButton>
          </motion.div>
        </div>

        {/* right — process */}
        <div className="lg:pl-10">
          <SectionLabel dot={false}>
            <span className="text-accent">
              <Play size={9} />
            </span>
            Our Process
          </SectionLabel>
          <ul className="mt-8 space-y-5">
            {PROCESS.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-4 border-b border-line pb-5"
              >
                <span className="h-2 w-2 shrink-0 bg-accent" />
                <span className="font-mono-label text-muted/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ScrambleText
                  text={step}
                  play={inView}
                  speed={1.2}
                  className="font-mono-label text-fg/85"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
