import type { Project } from '@/data/projects'
import { useAppStore } from '@/store/useAppStore'

/**
 * A single full-stage project panel for the desktop showcase. Panels are
 * absolutely stacked and crossfaded by GSAP — markup carries data hooks
 * (`data-project-panel`, `data-frame-img`, `data-ghost`) for the timeline.
 */
export function ProjectCard({ project }: { project: Project }) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const ghostWord = project.title.split(' ')[0]

  return (
    <article data-project-panel className="absolute inset-0 flex flex-col">
      {/* header row */}
      <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
        <h3 className="font-display text-2xl font-medium tracking-tight text-fg md:text-[1.75rem]">
          {project.title}
        </h3>
        <span className="font-mono-label whitespace-nowrap text-right text-muted">
          {project.category}
        </span>
      </div>

      {/* image stage */}
      <div className="relative flex flex-1 items-center justify-center py-10">
        <span className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <span
            data-ghost
            className="text-ghost whitespace-nowrap font-display text-[20vw] font-bold leading-none lg:text-[14rem]"
          >
            {ghostWord}
          </span>
        </span>

        <div
          data-frame
          onPointerEnter={() => setCursorVariant('view')}
          onPointerLeave={() => setCursorVariant('default')}
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]"
        >
          <div data-frame-mask className="overflow-hidden">
            <img
              data-frame-img
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              loading="lazy"
              decoding="async"
              className="block w-full will-change-transform"
            />
          </div>
        </div>
      </div>
    </article>
  )
}
