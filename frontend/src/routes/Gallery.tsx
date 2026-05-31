import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Skeleton } from '@/components/ui/Skeleton'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import { getLenis } from '@/hooks/useLenis'
import { Close, Play, ArrowRight } from '@/components/ui/icons'
import { galleryGroups, isVideo, type GalleryItem } from '@/data/gallery'
import { cn, pad2 } from '@/lib/utils'

/** Filters: "All" plus one chip per category. */
const FILTERS = ['All', ...galleryGroups.map((g) => g.category)] as const

/** What the lightbox is currently showing — a list and an index into it. */
type Lightbox = { items: GalleryItem[]; index: number } | null

export default function Gallery() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: '[data-reveal]',
    stagger: 0.05,
  })
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [loaded, setLoaded] = useState(false)
  const [box, setBox] = useState<Lightbox>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 900)
    return () => window.clearTimeout(t)
  }, [])

  const groups = useMemo(
    () =>
      filter === 'All'
        ? galleryGroups
        : galleryGroups.filter((g) => g.category === filter),
    [filter],
  )

  const total = useMemo(
    () => groups.reduce((n, g) => n + g.items.length, 0),
    [groups],
  )

  const close = () => setBox(null)
  const step = (dir: 1 | -1) =>
    setBox((b) =>
      b === null
        ? b
        : { ...b, index: (b.index + dir + b.items.length) % b.items.length },
    )

  // lightbox: lock scroll + keyboard nav
  useEffect(() => {
    if (box === null) return
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lenis?.start()
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box === null])

  const current = box ? box.items[box.index] : null

  return (
    <>
      <Seo
        title="Gallery"
        description="A visual gallery of moments — cricket, travel, friends and solo shots by Abhishek Kumar Chaudhary."
        path="/gallery"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ]}
      />

      <PageHero
        label="Gallery"
        lines={['Moments, off', 'the clock.']}
        intro="A visual archive grouped by chapter — cricket, travel, friends and the quiet solo moments. Tap any item to view it full-screen."
      />

      <section ref={ref} className="py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          {/* filters */}
          <div
            data-reveal
            className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-8"
          >
            <div className="flex flex-wrap gap-2.5">
              {FILTERS.map((f) => (
                <FilterChip
                  key={f}
                  label={f}
                  active={filter === f}
                  onClick={() => {
                    setFilter(f)
                    setBox(null)
                  }}
                />
              ))}
            </div>
            <span className="font-mono-label text-muted/60">
              {pad2(total)} Items
            </span>
          </div>

          {/* category cards */}
          {loaded ? (
            <div className="space-y-8 md:space-y-12">
              {groups.map((group) => (
                <article
                  key={group.category}
                  data-reveal
                  className="overflow-hidden rounded-[8px] border border-line bg-surface"
                >
                  <header className="flex items-center justify-between border-b border-line px-5 py-5 md:px-7">
                    <h2 className="font-display text-2xl font-medium tracking-tight text-fg md:text-3xl">
                      {group.category}
                    </h2>
                    <span className="font-mono-label text-muted/60">
                      {pad2(group.items.length)}{' '}
                      {group.items.length === 1 ? 'Item' : 'Items'}
                    </span>
                  </header>

                  <div className="gap-3 p-3 [column-fill:_balance] sm:columns-2 md:gap-4 md:p-5 lg:columns-3">
                    {group.items.map((item, i) => (
                      <GalleryTile
                        key={item.id}
                        item={item}
                        onOpen={() => setBox({ items: group.items, index: i })}
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {[0, 1].map((i) => (
                <Skeleton key={i} className="h-80 w-full rounded-[8px]" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── lightbox ── */}
      <AnimatePresence>
        {current && box && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl md:p-10"
          >
            {/* top bar */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 md:px-10">
              <span className="font-mono-label text-muted">
                {current.category} · {pad2(box.index + 1)} /{' '}
                {pad2(box.items.length)} — {current.title}
              </span>
              <button
                onClick={close}
                aria-label="Close"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <Close size={18} />
              </button>
            </div>

            {/* prev / next */}
            <NavBtn side="left" onClick={() => step(-1)} />
            <NavBtn side="right" onClick={() => step(1)} />

            {/* media */}
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[82vh] w-auto max-w-[90vw] overflow-hidden rounded-[6px] border border-line bg-surface"
            >
              {isVideo(current) ? (
                <video
                  src={current.src}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="block max-h-[82vh] w-auto"
                />
              ) : (
                <img
                  src={current.src}
                  alt={current.title}
                  className="block max-h-[82vh] w-auto"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ------------------------------ filter chip ----------------------------- */

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  return (
    <button
      onClick={onClick}
      onPointerEnter={() => setCursorVariant('hover')}
      onPointerLeave={() => setCursorVariant('default')}
      className={cn(
        'font-mono-label rounded-full border px-4 py-2.5 transition-colors duration-300',
        active
          ? 'border-accent bg-accent text-white'
          : 'border-line text-muted hover:border-line-strong hover:text-fg',
      )}
    >
      {label}
    </button>
  )
}

/* ------------------------------ tile ------------------------------------ */

function GalleryTile({
  item,
  onOpen,
}: {
  item: GalleryItem
  onOpen: () => void
}) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  return (
    <button
      data-reveal
      onClick={onOpen}
      onPointerEnter={() => setCursorVariant('view')}
      onPointerLeave={() => setCursorVariant('default')}
      className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[4px] border border-line bg-ink-2 md:mb-4"
    >
      {isVideo(item) ? (
        <video
          // React sets `muted` as an attribute but not the DOM property, which
          // some browsers require before they'll allow muted autoplay — force it.
          ref={(el) => {
            if (el) el.muted = true
          }}
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="block w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      ) : (
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="block w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      )}

      {/* type badge */}
      <span className="font-mono-label absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/40 px-3 py-1.5 text-white/90 backdrop-blur-sm">
        {isVideo(item) ? (
          <>
            <Play size={11} /> Video
          </>
        ) : (
          'Photo'
        )}
      </span>

      {/* hover caption */}
      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="font-display text-base font-medium text-white">
          {item.title}
        </span>
      </div>
    </button>
  )
}

function NavBtn({
  side,
  onClick,
}: {
  side: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      aria-label={side === 'left' ? 'Previous' : 'Next'}
      className={cn(
        'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/40 text-fg backdrop-blur-sm transition-colors hover:border-accent hover:text-accent',
        side === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8',
      )}
    >
      <ArrowRight size={18} className={side === 'left' ? 'rotate-180' : ''} />
    </button>
  )
}
