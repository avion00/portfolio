import { useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealText } from '@/components/ui/RevealText'
import { Plus } from '@/components/ui/icons'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import { faqs } from '@/data/faq'
import { cn, pad2 } from '@/lib/utils'

/**
 * Visible FAQ (also emitted as FAQPage JSON-LD on the home page). Answers stay
 * mounted in the DOM and collapse via a CSS grid-rows animation, so search
 * engines and the prerender always capture the full text.
 */
export function FaqSection() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: '[data-reveal]',
    stagger: 0.05,
  })
  const [open, setOpen] = useState<number | null>(0)
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)

  return (
    <section className="border-t border-line py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-24">
          {/* heading */}
          <div data-reveal className="mb-12 lg:mb-0">
            <SectionLabel>FAQ</SectionLabel>
            <RevealText
              as="h2"
              lines={['Questions,', 'answered.']}
              className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl"
            />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
              What clients and recruiters ask most — about services, stack and
              how I work. Can't find it? Reach out on the contact page.
            </p>
          </div>

          {/* accordion */}
          <ul className="border-t border-line">
            {faqs.map((item, i) => {
              const isOpen = open === i
              return (
                <li key={i} data-reveal className="border-b border-line">
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      onPointerEnter={() => setCursorVariant('hover')}
                      onPointerLeave={() => setCursorVariant('default')}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-4 py-6 text-left md:gap-6"
                    >
                      <span className="font-mono-label text-muted/40">
                        {pad2(i + 1)}
                      </span>
                      <span className="flex-1 font-display text-lg font-medium tracking-tight text-fg transition-colors group-hover:text-accent md:text-xl">
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent',
                          isOpen && 'rotate-45 border-accent text-accent',
                        )}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                  </h3>

                  {/* grid-rows trick keeps the answer in the DOM while collapsing */}
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={cn(
                          'max-w-2xl pb-7 pl-9 pr-4 text-base leading-relaxed text-muted transition-opacity duration-300 md:pl-12',
                          isOpen ? 'opacity-100' : 'opacity-0',
                        )}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
