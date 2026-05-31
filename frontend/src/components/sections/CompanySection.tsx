import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import { COMPANY_URL } from '@/data/nav'

const features = [
  'AI Automation',
  'AI Agents',
  'ERP & CRM',
  'Mobile Apps',
  'SaaS Platforms',
  'Enterprise Solutions',
  'AI Integration',
  'Cloud Systems',
  'Automation Workflows',
  'Business Infrastructure',
]

export function CompanySection() {
  const ref = useScrollReveal<HTMLElement>({ selector: '[data-reveal]', stagger: 0.05 })
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)

  return (
    <section
      id="company"
      ref={ref}
      className="relative overflow-hidden border-t border-line py-24 md:py-36"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[480px] w-[480px] translate-x-1/3 rounded-full bg-accent/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <div data-reveal>
              <SectionLabel>Founder &amp; CEO</SectionLabel>
            </div>

            <RevealText
              as="h2"
              lines={['AutoStacks']}
              className="mt-8 font-display text-6xl font-semibold leading-none tracking-tight text-fg sm:text-7xl md:text-8xl"
            />

            <p
              data-reveal
              className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              AutoStacks is a futuristic AI automation and software development
              company focused on enterprise-grade AI systems, automation
              infrastructures, ERP/CRM platforms, SaaS products, mobile
              applications, cloud architectures and intelligent business
              ecosystems.
            </p>

            <div data-reveal className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton variant="solid" href={COMPANY_URL}>
                Visit AutoStacks
              </MagneticButton>
              <a
                href={COMPANY_URL}
                target="_blank"
                rel="noreferrer"
                onPointerEnter={() => setCursorVariant('hover')}
                onPointerLeave={() => setCursorVariant('default')}
                className="font-mono-label text-muted transition-colors hover:text-accent"
              >
                autostacks.com
              </a>
            </div>
          </div>

          {/* features */}
          <div data-reveal className="lg:pt-4">
            <p className="font-mono-label mb-6 text-muted/50">What we build</p>
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {features.map((f) => (
                <li
                  key={f}
                  className="group flex items-center gap-3 bg-ink px-5 py-4 transition-colors hover:bg-surface"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
                  <span className="text-sm text-fg/85">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
