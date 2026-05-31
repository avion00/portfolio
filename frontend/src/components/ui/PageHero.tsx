import { SectionLabel } from './SectionLabel'
import { RevealText } from './RevealText'

interface PageHeroProps {
  label: string
  /** Heading lines (each animates in separately). */
  lines: string[]
  intro?: string
}

/** Shared top-of-page header for the inner routes. */
export function PageHero({ label, lines, intro }: PageHeroProps) {
  return (
    <header className="relative border-b border-line pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionLabel>{label}</SectionLabel>
        <RevealText
          as="h1"
          lines={lines}
          className="mt-8 max-w-[16ch] font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-6xl md:text-7xl"
        />
        {intro && (
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">
            {intro}
          </p>
        )}
      </div>
    </header>
  )
}
