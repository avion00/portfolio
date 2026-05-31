import { motion } from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { testimonials } from '@/data/testimonials'

export function TestimonialsSection() {
  const ref = useScrollReveal<HTMLElement>({ selector: '[data-reveal]', stagger: 0.08 })

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative border-t border-line py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div data-reveal>
          <SectionLabel>Testimonials</SectionLabel>
        </div>
        <RevealText
          as="h2"
          lines={['Trusted by founders and', 'teams around the world.']}
          className="mt-8 max-w-[20ch] font-display text-3xl font-medium leading-[1.08] tracking-tight text-fg sm:text-4xl md:text-6xl"
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <motion.figure
              key={t.id}
              data-reveal
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-8 backdrop-blur-sm transition-[border-color] duration-300 hover:border-accent/40 md:p-10"
            >
              <span className="font-display text-5xl leading-none text-accent/40">
                “
              </span>
              <blockquote className="mt-4 text-lg leading-relaxed text-fg/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="font-mono-label grid h-11 w-11 place-items-center rounded-full border border-line text-accent">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-medium text-fg">
                    {t.name}
                  </span>
                  <span className="font-mono-label block text-muted/70">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
