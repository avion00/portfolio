import { useNavigate } from 'react-router-dom'
import type { Project } from '@/data/projects'
import { useAppStore } from '@/store/useAppStore'
import { ScrambleText } from '@/components/ui/ScrambleText'

/**
 * Reference-matched project cell: thin-bordered flex column (no radius), a
 * title/year row on top, and an 80%-width centered image with large vertical
 * margins. On hover a per-project colour overlay fills the cell.
 */
export function WorkCard({ project }: { project: Project }) {
  const navigate = useNavigate()
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)

  return (
    <article
      data-reveal
      onClick={() => navigate(`/project/${project.id}`)}
      onPointerEnter={() => setCursorVariant('view')}
      onPointerLeave={() => setCursorVariant('default')}
      className="group relative flex h-full cursor-pointer flex-col items-center overflow-hidden border-b border-r border-line pb-12 md:pb-[72px]"
    >
      {/* hover background overlay = the project's image colours */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{
          backgroundImage: `linear-gradient(160deg, ${project.tint[0]}, ${project.tint[1]})`,
        }}
      />

      {/* project-top: title + year */}
      <div className="relative z-10 flex w-full items-baseline justify-between gap-4 px-6 pt-6 md:px-8 md:pt-8">
        <ScrambleText
          as="h2"
          text={project.title}
          play={false}
          hover
          className="font-display text-lg font-medium tracking-tight text-fg md:text-xl"
        />
        <span className="font-mono-label shrink-0 text-muted transition-colors group-hover:text-fg/85">
          {project.year}
        </span>
      </div>

      {/* project-image: 80% width, centered, large margins */}
      <div className="relative z-10 my-12 w-4/5 overflow-hidden rounded-[5px] border border-white/10 bg-surface md:my-[120px]">
        <img
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          loading="lazy"
          decoding="async"
          className="block w-full "
        />
      </div>
    </article>
  )
}
