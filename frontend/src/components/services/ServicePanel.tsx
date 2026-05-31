import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import type { ServiceDetail } from '@/data/serviceDetails'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ServiceShape } from './ServiceShape'
import { pad2 } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.8, ease: EASE, delay },
})

/**
 * One full-screen service panel. On desktop it is `sticky top-0`, so the next
 * panel scrolls up and stacks over it. Mobile falls back to normal flow.
 */
export function ServicePanel({ service }: { service: ServiceDetail }) {
  const navigate = useNavigate()

  return (
    <section
      data-stack-panel
      className="relative overflow-hidden border-t border-line bg-ink  lg:sticky lg:top-0 lg:h-screen"
    >
      <div className="relative mx-auto h-full max-w-[1600px] px-5 pb-16 pt-28 md:px-10 lg:pb-12 lg:pt-32">
        {/* ghost index */}
        <span className="pointer-events-none absolute right-4 top-24 select-none font-display text-[7rem] font-semibold leading-none text-fg/[0.04] md:right-10 lg:top-1/4 lg:text-[15rem]">
          {pad2(service.index)}
        </span>

        <div className="grid h-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — title, lead, wireframe */}
          <div className="relative flex flex-col justify-between">
            <div>
              <motion.span
                {...rise()}
                className="mb-7 inline-block h-2.5 w-2.5 bg-accent"
              />
              <motion.h2
                {...rise(0.05)}
                className="max-w-[16ch] font-display text-[2.4rem] font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl"
              >
                {service.title}
              </motion.h2>
              <motion.p
                {...rise(0.12)}
                className="mt-6 max-w-md text-base leading-relaxed text-muted"
              >
                {service.lead}
              </motion.p>
            </div>

            <div className="pointer-events-none mt-10 hidden w-[78%] max-w-[420px] self-start lg:block">
              <ServiceShape shape={service.shape} />
            </div>
          </div>

          {/* RIGHT — key focuses, list, outro */}
          <div className="flex flex-col justify-between gap-8 lg:gap-6">
            <motion.div {...rise(0.1)}>
              <SectionLabel>Key Focuses</SectionLabel>
              <p className="mt-5 max-w-md text-base leading-relaxed text-fg/90">
                {service.focusIntro}
              </p>
            </motion.div>

            <ul>
              {service.focuses.map((focus, i) => (
                <motion.li
                  key={focus}
                  {...rise(0.06 * i)}
                  className="flex items-center gap-3 border-b border-line py-3"
                >
                  <span className="h-2 w-2 shrink-0 bg-accent" />
                  <span className="font-mono-label text-fg/80">{focus}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div {...rise(0.1)}>
              <p className="max-w-lg text-base leading-relaxed text-fg/85 lg:text-lg">
                {service.outro}
              </p>
              <div className="mt-6">
                <MagneticButton
                  variant="outline"
                  onClick={() => navigate('/contact')}
                >
                  {service.cta}
                </MagneticButton>
              </div>
            </motion.div>
          </div>
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
