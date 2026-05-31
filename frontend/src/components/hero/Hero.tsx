import { Suspense, lazy, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Globe, ArrowDown } from '@/components/ui/icons'
import { scrollToTarget } from '@/hooks/useLenis'
import { prefersReducedMotion } from '@/lib/utils'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const el = rootRef.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-fade]', {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.3,
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 md:pt-32"
    >
      {/* 3D backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
        {/* Readability gradient — stronger on the left where the copy sits */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_85%_40%,transparent_0%,var(--bg)_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <RevealText
          as="h1"
          lines={[
            'Building Enterprise AI Systems,',
            'Automation Platforms &',
            'Next-Generation Digital Experiences.',
          ]}
          className="max-w-[22ch] font-display text-[2rem] font-medium leading-[1.06] tracking-tight text-fg sm:text-4xl md:text-5xl lg:text-[3.7rem]"
        />

        {/* Globe info row */}
        <div
          data-hero-fade
          className="mt-10 flex items-center gap-4 text-muted"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full border border-line text-accent">
            <Globe size={18} />
          </span>
          <div className="font-mono-label leading-relaxed">
            <p>Based in Nepal</p>
            <p>Serving clients worldwide</p>
          </div>
        </div>

        {/* Lower row: CTAs + intro */}
        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-24">
          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <MagneticButton variant="solid" onClick={() => navigate('/contact')}>
              Hire Me
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => navigate('/works')}>
              View Projects
            </MagneticButton>
            
          </div>
          <p
            data-hero-fade
            className="max-w-xl text-balance text-base leading-relaxed text-muted lg:ml-auto lg:text-lg"
          >
            I help businesses automate, scale and transform using AI automation,
            multi-agent systems, enterprise software, mobile applications and
            modern cloud technologies.
          </p>
        </div>
      </div>

      {/* scroll hint */}
      <button
        data-hero-fade
        onClick={() => scrollToTarget('#featured-works', -40)}
        aria-label="Scroll to featured works"
        className="font-mono-label group absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-muted md:flex"
      >
        Scroll
        <ArrowDown
          size={14}
          className="transition-transform duration-300 group-hover:translate-y-1"
        />
      </button>
    </section>
  )
}
