import { projects } from '@/data/projects'
import { ProjectCard } from './ProjectCard'

/** The center stage: all project panels stacked, ready for GSAP crossfade. */
export function ProjectShowcase() {
  return (
    <div data-stage className="relative h-full min-h-0 flex-1">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  )
}
