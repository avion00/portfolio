import { type PointerEvent } from 'react'
import { motion } from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { TechIcon } from '@/components/ui/TechIcon'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import { skillGroups, type SkillGroup } from '@/data/skills'

function SkillCard({ group }: { group: SkillGroup }) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.div
      data-reveal
      onPointerMove={onMove}
      onPointerEnter={() => setCursorVariant('hover')}
      onPointerLeave={() => setCursorVariant('default')}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="spotlight group relative h-full overflow-hidden rounded-2xl border border-line bg-surface/60 p-7 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/45 hover:shadow-[0_0_0_1px_rgba(31,107,255,0.15),0_30px_80px_-50px_rgba(31,107,255,0.6)]"
    >
      <div className="relative z-10 flex items-center justify-between">
        <h3 className="font-display text-xl font-medium tracking-tight text-fg">
          {group.title}
        </h3>
        <span className="font-mono-label text-muted/60">{group.tag}</span>
      </div>
      <ul className="relative z-10 mt-6 flex flex-wrap gap-2">
        {group.skills.map((s) => (
          <li
            key={s}
            className="flex items-center gap-2 rounded-full border border-line py-1.5 pl-2.5 pr-3.5 text-sm text-fg/75 transition-colors hover:border-accent/50 hover:text-fg"
          >
            <TechIcon name={s} />
            {s}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function SkillsSection() {
  const ref = useScrollReveal<HTMLElement>({ selector: '[data-reveal]', stagger: 0.06 })

  return (
    <section
      id="skills"
      ref={ref}
      className="relative border-t border-line py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div data-reveal>
              <SectionLabel>Skills & Stack</SectionLabel>
            </div>
            <RevealText
              as="h2"
              lines={['A deep, modern stack', 'across the whole product.']}
              className="mt-8 max-w-[18ch] font-display text-3xl font-medium leading-[1.08] tracking-tight text-fg sm:text-4xl md:text-6xl"
            />
          </div>
          <p data-reveal className="max-w-sm text-sm leading-relaxed text-muted">
            From front-end and mobile to AI, automation, databases, cloud and
            security — full coverage from idea to production.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <SkillCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}
