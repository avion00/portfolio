import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Skeleton } from '@/components/ui/Skeleton'
import { ScrambleText } from '@/components/ui/ScrambleText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Play } from '@/components/ui/icons'
import { projects } from '@/data/projects'
import { prefersReducedMotion } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const HEADING = [
  'A selection of AI systems,',
  'platforms and products built',
  'for clients worldwide.',
]

const INDUSTRIES = [
  'AI Automation',
  'ERP / CRM',
  'SaaS',
  'Mobile Apps',
  'Enterprise',
]

/** Big play-mark drawn in on load (reinforces the loading theme). */
function PlayMark() {
  const circleRef = useRef<SVGCircleElement>(null)
  const triRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const els = [circleRef.current, triRef.current]
    els.forEach((el, i) => {
      if (!el) return
      const len = el.getTotalLength()
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: 1.6,
        delay: 0.25 + i * 0.25,
        ease: 'power2.inOut',
      })
    })
  }, [])

  return (
    <svg
      viewBox="0 0 520 360"
      className="w-full max-w-[460px] text-line-strong"
      fill="none"
      aria-hidden
    >
      <circle
        ref={circleRef}
        cx="150"
        cy="180"
        r="148"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        ref={triRef}
        d="M300 64 L474 180 L300 296 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function WorksIntro() {
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 1100)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section className="relative flex min-h-[100svh] flex-col px-5 pb-8 pt-28 md:px-10 md:pt-32">
      <div className="grid flex-1 grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT — play mark + intro paragraph */}
        <div className="flex flex-col justify-between gap-12">
          <div className="flex flex-1 items-center">
            <PlayMark />
          </div>
          <div className="max-w-md">
            {loaded ? (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="text-base leading-relaxed text-muted"
              >
                Each project reflects my approach to combining AI, clean
                architecture and performance into reliable, scalable systems.
              </motion.p>
            ) : (
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[78%]" />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — label + heading + CTA */}
        <div className="flex flex-col justify-between gap-12">
          <div>
            <SectionLabel dot={false}>
              <span className="text-accent">
                <Play size={9} />
              </span>
              Who we are?
            </SectionLabel>

            <div className="mt-8 lg:mt-12">
              {loaded ? (
                <h1 className="font-display text-[2.2rem] font-medium leading-[1.08] tracking-tight text-fg sm:text-5xl md:text-6xl">
                  {HEADING.map((line, i) => (
                    <span key={i} className="block overflow-hidden">
                      <motion.span
                        className="block"
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.85, ease: EASE, delay: i * 0.12 }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>
              ) : (
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-11 w-full md:h-14" />
                  <Skeleton className="h-11 w-[92%] md:h-14" />
                  <Skeleton className="h-11 w-[68%] md:h-14" />
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="font-mono-label mb-4 text-muted/60">
              Have a project in mind?
            </p>
            <MagneticButton variant="outline" onClick={() => navigate('/contact')}>
              <ScrambleText text="Start your project" play={loaded} speed={1.1} />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Industries bar */}
      <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-mono-label text-muted/50">Industries:</span>
          {INDUSTRIES.map((industry) => (
            <span key={industry} className="font-mono-label text-fg/70">
              {industry}
            </span>
          ))}
        </div>
        <div className="font-mono-label flex items-center gap-2 text-muted/60">
          <span className="text-fg">{String(projects.length).padStart(2, '0')}</span>
          <span>Projects</span>
        </div>
      </div>
    </section>
  )
}
