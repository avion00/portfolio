import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  navItems,
  extraNavItems,
  legalNavItems,
  SOCIALS,
  // CONTACT_EMAIL,
  // CONTACT_PHONE,
  COMPANY_NAME,
} from '@/data/nav'
// import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
// import { MagneticButton } from '@/components/ui/MagneticButton'
import { ArrowUpRight, ArrowDown } from '@/components/ui/icons'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import { scrollToTarget } from '@/hooks/useLenis'

/* ------------------------------ link ----------------------------------- */

function FooterLink({
  to,
  href,
  children,
}: {
  to?: string
  href?: string
  children: ReactNode
}) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const hover = {
    onPointerEnter: () => setCursorVariant('hover'),
    onPointerLeave: () => setCursorVariant('default'),
  }
  const inner = (
    <span className="group/link relative inline-flex items-center gap-1.5 text-base text-muted transition-colors duration-300 hover:text-fg">
      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
        {children}
      </span>
      <ArrowUpRight
        size={14}
        className="-translate-x-2 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100"
      />
    </span>
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...hover}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={to ?? '/'} {...hover}>
      {inner}
    </Link>
  )
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div data-reveal>
      <p className="font-mono-label mb-6 text-muted/50">{title}</p>
      <ul className="space-y-3.5">{children}</ul>
    </div>
  )
}

/* ----------------------------- footer ---------------------------------- */

export function Footer() {
  const ref = useScrollReveal<HTMLElement>({ selector: '[data-reveal]', stagger: 0.07 })
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    setTime(fmt())
    const id = window.setInterval(() => setTime(fmt()), 30000)
    return () => window.clearInterval(id)
  }, [])

  const hover = {
    onPointerEnter: () => setCursorVariant('hover'),
    onPointerLeave: () => setCursorVariant('default'),
  }

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-line bg-ink-2"
    >
      {/* ambient glow + faint grid */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[680px] -translate-x-1/2 rounded-full bg-accent/10 blur-[160px]" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,transparent,black_40%)]" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        {/* ── link columns ── */}
        <div className="grid grid-cols-2 gap-10 border-b border-line py-16 md:grid-cols-4">
          <Column title="Navigation">
            {navItems.map((n) => (
              <li key={n.to}>
                <FooterLink to={n.to}>{n.label}</FooterLink>
              </li>
            ))}
          </Column>
          <Column title="Explore">
            {extraNavItems.map((n) => (
              <li key={n.to}>
                <FooterLink to={n.to}>{n.label}</FooterLink>
              </li>
            ))}
          </Column>
          <Column title="Legal">
            {legalNavItems.map((n) => (
              <li key={n.to}>
                <FooterLink to={n.to}>{n.label}</FooterLink>
              </li>
            ))}
          </Column>
          <Column title="Connect">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <FooterLink href={s.href}>{s.label}</FooterLink>
              </li>
            ))}
          </Column>
        </div>

        {/* ── oversized wordmark ── */}
        <div className="py-10">
          <RevealText
            as="h2"
            lines={["Abhishek"]}
            className="select-none font-display text-[22vw] font-semibold leading-[0.9] tracking-tighter text-fg/90 md:text-[15vw]"
          />
          <div className="-mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold tracking-tight text-fg md:text-4xl">
              Chaudhary
            </span>
            <span className="h-2 w-2 translate-y-[-2px] rounded-full bg-accent" />
          </div>
        </div>

        {/* ── bottom bar ── */}
        <div className="border-t border-line py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <span className="font-mono-label text-muted/60">
              © 2026 Abhishek Chaudhary · {COMPANY_NAME}
            </span>

            {/* legal quick links */}
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalNavItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  {...hover}
                  className="text-sm text-muted/70 transition-colors hover:text-fg"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <button
              {...hover}
              onClick={() => scrollToTarget(0)}
              className="group font-mono-label flex items-center gap-2 text-muted transition-colors hover:text-fg"
            >
              Back to top
              <span className="grid h-7 w-7 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:text-accent">
                <ArrowDown size={13} className="rotate-180" />
              </span>
            </button>
          </div>

          <p className="mt-6 text-sm text-muted/70">
            Based in Nepal — serving clients worldwide.
          </p>
          <p className="hidden">{time}</p>
        </div>
      </div>
    </footer>
  );
}
