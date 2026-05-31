import { type PointerEvent } from 'react'
import { motion } from 'motion/react'
import { services, type Service } from '@/data/services'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import { ArrowUpRight } from '@/components/ui/icons'

function ServiceCard({ service, index }: { service: Service; index: number }) {
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
      className="spotlight group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface/60 p-7 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/45 hover:shadow-[0_0_0_1px_rgba(31,107,255,0.15),0_30px_80px_-50px_rgba(31,107,255,0.6)]"
    >
      <div className="relative z-10 flex items-start justify-between">
        <span className="font-mono-label text-muted/60">{service.tag}</span>
        <span className="font-mono-label text-muted/40">
          0{index + 1}
        </span>
      </div>

      <div className="relative z-10">
        <h3 className="font-display text-xl font-medium tracking-tight text-fg">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {service.description}
        </p>
      </div>

      <span className="relative z-10 mt-6 grid h-9 w-9 place-items-center self-end rounded-full border border-line text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:text-accent">
        <ArrowUpRight size={16} />
      </span>
    </motion.div>
  )
}

export function ServicesSection() {
  const ref = useScrollReveal<HTMLElement>({ selector: '[data-reveal]', stagger: 0.06 })

  return (
    <section
      id="services"
      ref={ref}
      className="relative border-t border-line py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div data-reveal>
              <SectionLabel>Services</SectionLabel>
            </div>
            <RevealText
              as="h2"
              lines={['Everything you need to', 'build, automate and scale.']}
              className="mt-8 max-w-[18ch] font-display text-3xl font-medium leading-[1.08] tracking-tight text-fg sm:text-4xl md:text-6xl"
            />
          </div>
          <p data-reveal className="max-w-sm text-sm leading-relaxed text-muted">
            One engineer, full stack. From AI automation to mobile, web and
            cloud — built, integrated and shipped end to end.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
