import { useMemo, useState } from 'react'
import { Seo } from '@/components/Seo'
import { WorksIntro } from '@/components/works/WorksIntro'
import { WorkCard } from '@/components/works/WorkCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { projects, WORK_FILTERS } from '@/data/projects'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import { cn, pad2 } from '@/lib/utils'

export default function Works() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: '[data-reveal]',
    stagger: 0.08,
  })
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const [filter, setFilter] = useState<string>('All')

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => p.industry === filter),
    [filter],
  )

  return (
    <>
      <Seo
        title="Projects"
        description="Selected projects by Abhishek Kumar Chaudhary — AI automation platforms, ERP/CRM, AI chatbots, mobile apps, SaaS products, e-commerce and enterprise dashboards."
        path="/works"
      />

      <WorksIntro />

      <section ref={ref} className="border-t border-line py-20 md:py-28">
        <div className="  px-5 md:px-10">
          <div
            data-reveal
            className="mb-8 flex items-end justify-between gap-6"
          >
            <SectionLabel>Selected Works</SectionLabel>
            <span className="font-mono-label text-muted/60">
              {pad2(filtered.length)} — Projects
            </span>
          </div>

          {/* category filters */}
          <div
            data-reveal
            className="mb-12 flex flex-wrap gap-2.5 border-b border-line pb-8"
          >
            {WORK_FILTERS.map((f) => {
              const active = filter === f
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  onPointerEnter={() => setCursorVariant('hover')}
                  onPointerLeave={() => setCursorVariant('default')}
                  className={cn(
                    'font-mono-label rounded-full border px-4 py-2.5 transition-colors duration-300',
                    active
                      ? 'border-accent bg-accent text-white'
                      : 'border-line text-muted hover:border-line-strong hover:text-fg',
                  )}
                >
                  {f}
                </button>
              )
            })}
          </div>

          {/* grid */}
          <div className="grid grid-cols-1 border-l border-t border-line md:grid-cols-2">
            {filtered.map((project) => (
              <WorkCard key={project.id} project={project} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="font-mono-label py-16 text-center text-muted">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
