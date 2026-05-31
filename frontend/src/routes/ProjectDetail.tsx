import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Skeleton } from '@/components/ui/Skeleton'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Play, ArrowDown } from '@/components/ui/icons'
import { projects } from '@/data/projects'
import { projectGalleries } from '@/data/projectGallery'
import { projectSchema } from '@/lib/structuredData'
import { useAppStore } from '@/store/useAppStore'
import { prefersReducedMotion } from '@/lib/utils'

const SCOPE = [
  'Architecture & Planning',
  'UI / UX Design',
  'Full-Stack Development',
  'AI Integration',
  'Automation Workflows',
  'Testing & QA',
  'Deployment & DevOps',
]
const FEATURES = [
  'Responsive Design',
  'Real-Time Data',
  'Secure Authentication',
  'API Integrations',
  'Scalable Architecture',
  'Performance Optimised',
]

/** Media scrolls this much faster than the page on desktop. */
const SPEED = 1.14

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)

  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const [loaded, setLoaded] = useState(false)

  const index = projects.findIndex((p) => p.id === id)
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  // skeleton -> content
  useEffect(() => {
    setLoaded(false)
    const t = window.setTimeout(() => setLoaded(true), 700)
    return () => window.clearTimeout(t)
  }, [id])

  // faster-scrolling media (desktop only): translate the media column up
  // through its full height over a shorter scroll distance.
  useEffect(() => {
    const section = sectionRef.current
    const inner = innerRef.current
    if (!section || !inner) return

    let maxShift = 0
    let sectionScroll = 0
    let desktop = false
    let raf = 0

    const measure = () => {
      desktop =
        window.matchMedia('(min-width: 1024px)').matches &&
        !prefersReducedMotion()
      if (!desktop) {
        section.style.height = ''
        inner.style.transform = ''
        return
      }
      const vh = window.innerHeight
      maxShift = Math.max(0, inner.scrollHeight - vh)
      sectionScroll = maxShift / SPEED
      section.style.height = `${vh + sectionScroll}px`
    }

    const update = () => {
      if (!desktop) return
      const top = section.getBoundingClientRect().top
      const p =
        sectionScroll > 0 ? Math.min(1, Math.max(0, -top / sectionScroll)) : 0
      inner.style.transform = `translate3d(0, ${-p * maxShift}px, 0)`
      if (progressRef.current) {
        progressRef.current.textContent = `${Math.round(p * 100)}%`
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      update()
    }

    measure()
    update()
    // re-measure once images settle
    inner.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', onResize, { once: true })
    })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      section.style.height = ''
    }
  }, [id])

  if (index === -1) return <Navigate to="/works" replace />

  type Media =
    | { kind: 'image'; src: string; label: string }
    | { kind: 'panel'; label: string }

  // Real screenshots for this project (see src/data/projectGallery.ts). When a
  // project has any, we show them all stacked; otherwise we fall back to the
  // placeholder mockup + gradient panels.
  const gallery = projectGalleries[project.id] ?? []
  const media: Media[] =
    gallery.length > 0
      ? gallery.map((g) => ({
          kind: 'image',
          src: g.src,
          label: g.label,
        }))
      : [
          { kind: 'image', src: project.image, label: 'Overview' },
          { kind: 'panel', label: 'UI System' },
          { kind: 'image', src: project.image, label: 'Dashboard' },
          { kind: 'panel', label: 'Architecture' },
          { kind: 'image', src: project.image, label: 'Mobile View' },
        ]

  return (
    <>
      <Seo
        title={project.title}
        description={project.description}
        path={`/project/${project.id}`}
        type="article"
        image={gallery[0]?.src ?? project.image}
        keywords={[project.category, project.industry, project.framework]}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/works' },
          { name: project.title, path: `/project/${project.id}` },
        ]}
        schema={projectSchema(project, gallery[0]?.src)}
      />

      <section ref={sectionRef} className="relative lg:flex">
        {/* LEFT — sticky details */}
        <div className="flex flex-col px-5 pb-12 pt-28 md:px-10 lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:justify-between lg:pt-32">
          <div>
            <div className="flex items-center gap-5">
              <span className="font-mono-label text-muted/60">
                {project.year}
              </span>
              <SectionLabel dot={false}>
                <span className="text-accent">
                  <Play size={9} />
                </span>
                {project.category}
              </SectionLabel>
            </div>

            <div className="mt-8">
              {loaded ? (
                <h1 className="max-w-[14ch] font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
                  {project.title}
                </h1>
              ) : (
                <Skeleton className="h-14 w-3/4 md:h-20" />
              )}
            </div>

            <div className="mt-8 max-w-md">
              {loaded ? (
                <p className="text-base leading-relaxed text-muted">
                  {project.description}
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              )}
            </div>

            <div className="mt-12 grid max-w-md grid-cols-2 gap-8">
              <div>
                <p className="font-mono-label mb-3 text-muted/50">Frameworks</p>
                <p className="font-mono-label text-fg">
                  {project.framework.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="font-mono-label mb-3 text-muted/50">
                  Platform / Client
                </p>
                <p className="font-mono-label text-fg">
                  {project.client.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-2 gap-8">
              <div>
                <p className="font-mono-label mb-4 text-muted/50">
                  Scope of Work
                </p>
                <ul className="space-y-2">
                  {SCOPE.map((s) => (
                    <li key={s} className="text-sm text-fg/80">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono-label mb-4 text-muted/50">
                  Key Features
                </p>
                <ul className="space-y-2">
                  {FEATURES.map((f) => (
                    <li key={f} className="text-sm text-fg/80">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between lg:mt-0">
            <span className="font-mono-label flex items-center gap-2 text-muted/60">
              <ArrowDown size={13} className="animate-bounce" />
              Scroll
            </span>
            <span ref={progressRef} className="font-mono-label text-muted/60">
              0%
            </span>
          </div>
        </div>

        {/* RIGHT — faster-scrolling media */}
        <div className="relative bg-ink-2 lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:overflow-hidden">
          <div
            ref={innerRef}
            className="space-y-6 px-5 py-12 will-change-transform md:px-8 lg:py-24"
          >
            {media.map((m, i) =>
              m.kind === 'image' ? (
                <div
                  key={i}
                  onPointerEnter={() => setCursorVariant('view')}
                  onPointerLeave={() => setCursorVariant('default')}
                  className="overflow-hidden rounded-[5px] border border-white/10 bg-surface"
                >
                  <img
                    src={m.src}
                    alt={`${project.title} — ${m.label}`}
                    loading="lazy"
                    decoding="async"
                    className="block w-full"
                  />
                  <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                    <span className="font-mono-label text-muted/60">
                      {m.label}
                    </span>
                    <span className="font-mono-label text-muted/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className="relative flex aspect-[16/10] items-end overflow-hidden rounded-[5px] border border-white/10 p-6"
                  style={{
                    backgroundImage: `linear-gradient(150deg, ${project.tint[0]}, ${project.tint[1]})`,
                  }}
                >
                  <span className="font-mono-label text-white/80">
                    {m.label}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="border-t border-line py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 text-center md:px-10">
          <p className="font-mono-label text-muted/60">Next Project</p>
          <button
            onClick={() => navigate(`/project/${next.id}`)}
            onPointerEnter={() => setCursorVariant('hover')}
            onPointerLeave={() => setCursorVariant('default')}
            className="group mt-4 inline-block"
          >
            <h2 className="font-display text-4xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent sm:text-6xl md:text-7xl">
              {next.title}
            </h2>
          </button>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[5px] border border-line bg-surface">
            <img
              src={next.image}
              alt={next.title}
              loading="lazy"
              className="block w-full"
            />
          </div>
        </div>
      </section>
    </>
  )
}
