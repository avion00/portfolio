import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Skeleton } from '@/components/ui/Skeleton'
import { useGSAP } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import { scrollToTarget } from '@/hooks/useLenis'
import { pad2, prefersReducedMotion } from '@/lib/utils'
import type { LegalDoc } from '@/data/legal'

/** Shared layout for the legal pages (Privacy / Terms / Cookies). */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const [loaded, setLoaded] = useState(false)

  // skeleton -> content
  useEffect(() => {
    setLoaded(false)
    const t = window.setTimeout(() => setLoaded(true), 700)
    return () => window.clearTimeout(t)
  }, [doc.path])

  // reveal sections once content is shown (re-runs when `loaded` flips)
  const contentRef = useGSAP<HTMLDivElement>(
    ({ el }) => {
      if (!loaded) return
      const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
      if (!targets.length) return
      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(
        targets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
      ScrollTrigger.refresh()
    },
    [loaded],
  )

  const hover = {
    onPointerEnter: () => setCursorVariant('hover'),
    onPointerLeave: () => setCursorVariant('default'),
  }

  return (
    <>
      <Seo
        title={doc.lines.join(' ').replace(/\.$/, '')}
        description={doc.seo}
        path={doc.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: doc.lines.join(' ').replace(/\.$/, ''), path: doc.path },
        ]}
      />

      <PageHero label={doc.label} lines={doc.lines} intro={doc.intro} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16 xl:gap-24">
            {/* ── sticky table of contents ── */}
            <aside className="mb-14 lg:mb-0">
              <div className="lg:sticky lg:top-28">
                <p className="font-mono-label mb-5 text-muted/50">Contents</p>
                <ol className="space-y-1 border-l border-line">
                  {doc.sections.map((s, i) => (
                    <li key={s.id}>
                      <button
                        {...hover}
                        onClick={() => scrollToTarget(`#${s.id}`, -110)}
                        className="group -ml-px flex w-full items-baseline gap-3 border-l border-transparent py-1.5 pl-4 text-left text-sm text-muted transition-colors hover:border-accent hover:text-fg"
                      >
                        <span className="font-mono-label text-muted/40 transition-colors group-hover:text-accent">
                          {pad2(i + 1)}
                        </span>
                        <span className="leading-snug">{s.heading}</span>
                      </button>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="font-mono-label text-muted/50">Last Updated</p>
                  <p className="mt-2 text-sm text-fg/80">{doc.updated}</p>
                </div>
              </div>
            </aside>

            {/* ── body ── */}
            <div ref={contentRef} className="max-w-3xl">
              {loaded ? (
                doc.sections.map((s, i) => (
                  <section
                    key={s.id}
                    id={s.id}
                    data-reveal
                    className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono-label text-accent">
                        {pad2(i + 1)}
                      </span>
                      <h2 className="font-display text-2xl font-medium tracking-tight text-fg md:text-3xl">
                        {s.heading}
                      </h2>
                    </div>
                    <div className="mt-5 space-y-4 pl-0 md:pl-11">
                      {s.body.map((p, j) => (
                        <p
                          key={j}
                          className="text-base leading-relaxed text-muted"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <LegalSkeleton />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function LegalSkeleton() {
  return (
    <div className="space-y-12">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
    </div>
  )
}
