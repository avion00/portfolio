import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    title: 'AI & Automation',
    body: 'Multi-agent systems, AI agents, chatbots and automation infrastructures that run businesses autonomously and at scale.',
  },
  {
    title: 'Full-Stack Engineering',
    body: 'Production web, mobile and SaaS on React, Next.js, React Native, Python and Node — fast, scalable and type-safe.',
  },
  {
    title: 'Enterprise Systems',
    body: 'ERP, CRM and cloud architectures designed for scale, security and the realities of day-to-day operations.',
  },
]

const stats = [
  { value: 100, suffix: '+', label: 'Projects Completed' },
  { value: 6, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '', label: 'Companies & Ventures' },
]

function StatNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`
      return
    }
    const obj = { n: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          n: value,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(obj.n)}${suffix}`
          },
        })
      },
    })
    return () => st.kill()
  }, [value, suffix])
  return <span ref={ref}>{`0${suffix}`}</span>
}

export function AboutSection() {
  const ref = useScrollReveal<HTMLElement>({ selector: '[data-reveal]' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-t border-line py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div data-reveal>
          <SectionLabel>About Me</SectionLabel>
        </div>

        <RevealText
          as="h2"
          lines={[
            'AI systems, automation and software,',
            'engineered end to end.',
          ]}
          className="mt-8 max-w-[22ch] font-display text-3xl font-medium leading-[1.08] tracking-tight text-fg sm:text-4xl md:text-6xl"
        />

        <p
          data-reveal
          className="mt-8 max-w-3xl text-base leading-relaxed text-muted md:text-lg"
        >
          Abhishek Kumar Chaudhary is a highly experienced Full Stack Developer
          and AI Automation Engineer with 6–7 years of expertise building
          enterprise applications, mobile apps, AI systems, ERP/CRM platforms,
          SaaS products, automation workflows and multi-agent infrastructures.
          As the Founder of AutoStacks, he creates intelligent AI-powered
          ecosystems, scalable architectures and autonomous business systems for
          startups, enterprises and international clients.
        </p>

        {/* pillars */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              className="group relative bg-ink p-8 md:p-10"
            >
              <span className="font-mono-label text-muted/60">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl font-medium text-fg">
                {p.title}
              </h3>
              {/* blue underline grows on hover */}
              <span className="mt-4 block h-px w-12 origin-left bg-accent transition-transform duration-500 group-hover:scale-x-[2.5]" />
              <p className="mt-5 text-sm leading-relaxed text-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* stats */}
        <div className="mt-20 grid gap-12 border-t border-line pt-14 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} data-reveal>
              <p className="font-display text-6xl font-semibold tracking-tight text-fg md:text-7xl">
                <StatNumber value={s.value} suffix={s.suffix} />
              </p>
              <p className="font-mono-label mt-3 text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
