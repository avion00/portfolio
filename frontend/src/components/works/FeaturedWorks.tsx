import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { projects, FRAMEWORKS } from '@/data/projects'
import { useAppStore } from '@/store/useAppStore'
import { pad2, cn } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Play } from '@/components/ui/icons'

const EASE = [0.22, 1, 0.36, 1] as const
const LEFT_NOTE =
  'A selection of projects built across different industries and platforms.'

/* --------------------------------- rails --------------------------------- */

function LeftRail() {
  const active = useAppStore((s) => s.activeProject)
  return (
    <aside className="sticky top-0 flex h-screen flex-col justify-between self-start border-r border-line py-28 pr-8">
      {/* top */}
      <div>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-accent">
          <Play size={13} />
        </span>
        <p className="font-mono-label mt-7 text-fg">
          Featured Works — {pad2(active + 1)}/{pad2(projects.length)}
        </p>
      </div>

      {/* middle */}
      <div className="flex items-center gap-3 text-muted/60">
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-4 animate-[slideDown_2.4s_ease-in-out_infinite] bg-accent" />
        </span>
        <span className="font-mono-label">Scroll</span>
      </div>

      {/* bottom */}
      <p className="font-mono-label max-w-[26ch] leading-[1.8] text-muted/40">
        {LEFT_NOTE}
      </p>
    </aside>
  )
}

function RightRail({
  progressRef,
}: {
  progressRef: React.RefObject<HTMLSpanElement | null>
}) {
  const active = useAppStore((s) => s.activeProject)
  const navigate = useNavigate()
  const p = projects[active]
  const activeFw = p.framework.toUpperCase()

  return (
    <aside className="sticky top-0 flex h-screen flex-col justify-between self-start border-l border-line py-28 pl-8">
      {/* top: meta */}
      <div className="space-y-8">
        <div>
          <p className="font-mono-label mb-3 text-muted/50">Frameworks</p>
          <ul className="space-y-1.5">
            {FRAMEWORKS.map((fw) => (
              <li
                key={fw}
                className={cn(
                  'font-mono-label transition-colors duration-500',
                  fw === activeFw ? 'text-accent' : 'text-fg/60',
                )}
              >
                {fw}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono-label mb-3 text-muted/50">Client / Platform</p>
          <p className="font-mono-label text-fg">{p.client.toUpperCase()}</p>
        </div>
        <div>
          <p className="font-mono-label mb-3 text-muted/50">Year</p>
          <p className="font-mono-label text-fg">{p.year}</p>
        </div>
      </div>

      {/* middle: counter */}
      <div className="flex items-center gap-4">
        <span className="font-mono-label text-fg">{pad2(active + 1)}</span>
        <span className="relative h-px flex-1 bg-line">
          <span
            ref={progressRef}
            className="absolute inset-0 origin-left bg-accent"
            style={{ transform: 'scaleX(0)' }}
          />
        </span>
        <span className="font-mono-label text-muted/50">
          {pad2(projects.length)}
        </span>
      </div>

      {/* bottom: button */}
      <MagneticButton variant="outline" onClick={() => navigate('/works')}>
        View All Works
      </MagneticButton>
    </aside>
  )
}

/* ------------------------------ mobile list ------------------------------ */

function MobileList() {
  const ref = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]' })
  const navigate = useNavigate()
  return (
    <div ref={ref} className="px-5 py-16">
      <div data-reveal>
        <SectionLabel>Featured Works — 01/{pad2(projects.length)}</SectionLabel>
        <h2 className="mt-5 max-w-[14ch] font-display text-3xl font-medium tracking-tight text-fg">
          A selection of projects across industries.
        </h2>
      </div>

      <div className="mt-12 space-y-14">
        {projects.map((p) => (
          <article key={p.id} data-reveal>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl font-medium text-fg">
                {p.title}
              </h3>
              <span className="font-mono-label text-right text-muted">
                {pad2(p.index)}/{pad2(projects.length)}
              </span>
            </div>
            <div className="overflow-hidden border border-line bg-surface">
              <img
                src={p.image}
                alt={`${p.title} — ${p.category}`}
                loading="lazy"
                decoding="async"
                className="block w-full"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono-label text-muted">{p.category}</span>
              <span className="font-mono-label text-fg/70">
                {p.framework} — {p.year}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div data-reveal className="mt-14">
        <MagneticButton variant="outline" onClick={() => navigate('/works')}>
          View All Works
        </MagneticButton>
      </div>
    </div>
  )
}

/* ------------------------------- section -------------------------------- */

export function FeaturedWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const navigate = useNavigate()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const setActive = useAppStore.getState().setActiveProject

    // Active project = the center item currently crossing the viewport middle.
    const items = Array.from(
      section.querySelectorAll<HTMLElement>('[data-fw-item]'),
    )
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number(e.target.getAttribute('data-fw-item')))
          }
        })
      },
      { rootMargin: '-48% 0px -48% 0px' },
    )
    items.forEach((el) => io.observe(el))

    // Continuous progress bar tied to scroll through the section.
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!progressRef.current) return
        const rect = section.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
        progressRef.current.style.transform = `scaleX(${p})`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="featured-works" ref={sectionRef} className="relative">
      {/* giant ghost wordmark behind the first project */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-screen items-center justify-center lg:flex">
        <span className="select-none whitespace-nowrap font-display text-[18vw] font-bold leading-none text-fg/[0.025]">
          Featured Works
        </span>
      </div>

      {/* Desktop: sticky rails + vertically scrolling center images */}
      <div className="relative z-10 mx-auto hidden max-w-[1600px] px-5 md:px-10 lg:grid lg:grid-cols-[220px_1fr_280px]">
        <LeftRail />

        <div className="relative">
          {projects.map((project, i) => (
            <article
              key={project.id}
              data-fw-item={i}
              className="flex min-h-screen flex-col justify-center px-6 py-28 lg:px-12"
            >
              <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
                <h3 className="font-display text-2xl font-medium tracking-tight text-fg lg:text-3xl">
                  {project.title}
                </h3>
                <span className="font-mono-label whitespace-nowrap text-right text-muted">
                  {project.category}
                </span>
              </div>

              <div
                onClick={() => navigate(`/project/${project.id}`)}
                onPointerEnter={() => setCursorVariant('view')}
                onPointerLeave={() => setCursorVariant('default')}
                className="relative mt-10 cursor-pointer overflow-hidden border border-line bg-surface"
              >
                <motion.img
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.06 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: EASE }}
                  className="block w-full will-change-transform"
                />
              </div>
            </article>
          ))}
        </div>

        <RightRail progressRef={progressRef} />
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <MobileList />
      </div>
    </section>
  )
}
