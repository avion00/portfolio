import { useEffect, useRef } from 'react'
import { Seo } from '@/components/Seo'
import { ServicesIntro } from '@/components/services/ServicesIntro'
import { ServicePanel } from '@/components/services/ServicePanel'
import { ServicesOutro } from '@/components/services/ServicesOutro'
import { serviceDetails } from '@/data/serviceDetails'
import { servicesSchema } from '@/lib/structuredData'
import { prefersReducedMotion } from '@/lib/utils'

const MAX_DIM = 0.55

export default function Services() {
  const wrapRef = useRef<HTMLDivElement>(null)

  // As each sticky panel is covered by the next, fade in its dark overlay.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const wrap = wrapRef.current
    if (!wrap) return

    const panels = Array.from(
      wrap.querySelectorAll<HTMLElement>('[data-stack-panel]'),
    )
    const dimmers = panels.map((p) =>
      p.querySelector<HTMLElement>('[data-dimmer]'),
    )

    let tops: number[] = []
    let wrapAbs = 0
    let vh = window.innerHeight
    let desktop = false
    let raf = 0

    const measure = () => {
      desktop = window.matchMedia('(min-width: 1024px)').matches
      vh = window.innerHeight
      wrapAbs = wrap.getBoundingClientRect().top + window.scrollY
      tops = panels.map((p) => p.offsetTop)
    }

    const update = () => {
      const y = window.scrollY
      panels.forEach((_, i) => {
        const d = dimmers[i]
        if (!d) return
        if (!desktop || i === panels.length - 1) {
          d.style.opacity = '0'
          return
        }
        const start = wrapAbs + tops[i]
        const p = Math.min(1, Math.max(0, (y - start) / vh))
        d.style.opacity = String(p * MAX_DIM)
      })
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
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <Seo
        title="Services"
        description="AI automation, multi-agent systems, ERP/CRM, mobile apps, full-stack web and SaaS — Abhishek Kumar Chaudhary combines AI and software engineering into one clear process."
        path="/services"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
        schema={servicesSchema()}
      />

      {/* Sticky-stacking sections: each panel pins and the next scrolls over it. */}
      <div ref={wrapRef} className="relative">
        <ServicesIntro />
        {serviceDetails.map((service) => (
          <ServicePanel key={service.id} service={service} />
        ))}
        <ServicesOutro />
      </div>
    </>
  )
}
