import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { experience } from '@/data/experience'

export function ExperienceSection() {
  const ref = useScrollReveal<HTMLElement>({ selector: '[data-reveal]', stagger: 0.1 })

  return (
    <section
      id="experience"
      ref={ref}
      className="relative border-t border-line py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div data-reveal>
          <SectionLabel>Experience</SectionLabel>
        </div>
        <RevealText
          as="h2"
          lines={['6–7 years building software,', 'AI systems and automation.']}
          className="mt-8 max-w-[22ch] font-display text-3xl font-medium leading-[1.08] tracking-tight text-fg sm:text-4xl md:text-6xl"
        />

        {/* timeline */}
        <ol className="relative mt-16 ml-1 border-l border-line pl-8 md:ml-3 md:pl-14">
          {experience.map((item) => (
            <li
              key={item.id}
              data-reveal
              className="group relative pb-14 last:pb-0"
            >
              {/* node */}
              <span className="absolute -left-[33px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-line bg-ink md:-left-[57px]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
              </span>

              <span className="font-mono-label text-muted/60">{item.period}</span>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-fg md:text-3xl">
                {item.role}
                <span className="text-accent"> · {item.company}</span>
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                {item.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {item.highlights.map((h) => (
                  <li
                    key={h}
                    className="font-mono-label rounded-full border border-line px-3 py-1.5 text-fg/70 transition-colors hover:border-accent/50 hover:text-fg"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
