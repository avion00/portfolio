import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Skeleton } from '@/components/ui/Skeleton'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import { getLenis } from '@/hooks/useLenis'
import { Close, Play, ArrowRight } from '@/components/ui/icons'
import {
  gallery,
  galleryPoster,
  hasPlayableVideo,
  type GalleryItem,
} from '@/data/gallery'
import { cn, pad2 } from '@/lib/utils'

const FILTERS = ['All', 'Photos', 'Videos'] as const
const SKELETONS = [320, 220, 280, 360, 200, 300, 240, 340, 260]

export default function Gallery() {
  const ref = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]', stagger: 0.05 })
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 900)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = gallery.filter((g) =>
    filter === 'All' ? true : filter === 'Videos' ? g.type === 'video' : g.type === 'image',
  )

  const close = () => setActive(null)
  const next = () =>
    setActive((a) => (a === null ? a : (a + 1) % filtered.length))
  const prev = () =>
    setActive((a) =>
      a === null ? a : (a - 1 + filtered.length) % filtered.length,
    )

  // lightbox: lock scroll + keyboard nav
  useEffect(() => {
    if (active === null) return
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lenis?.start()
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, filtered.length])

  const item = active !== null ? filtered[active] : null

  return (
    <>
      <Seo
        title="Gallery"
        description="A visual gallery of moments, work and behind-the-scenes — photos and videos by Abhishek Kumar Chaudhary."
        path="/gallery"
      />

      <PageHero
        label="Gallery"
        lines={['Moments, work', 'and behind the scenes.']}
        intro="A visual archive — events, talks, builds and the small moments in between. Tap any item to view it full-screen."
      />

      <section ref={ref} className="py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          {/* filters */}
          <div
            data-reveal
            className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-8"
          >
            <div className="flex flex-wrap gap-2.5">
              {FILTERS.map((f) => {
                const activeF = filter === f
                return (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f)
                      setActive(null)
                    }}
                    onPointerEnter={() => setCursorVariant('hover')}
                    onPointerLeave={() => setCursorVariant('default')}
                    className={cn(
                      'font-mono-label rounded-full border px-4 py-2.5 transition-colors duration-300',
                      activeF
                        ? 'border-accent bg-accent text-white'
                        : 'border-line text-muted hover:border-line-strong hover:text-fg',
                    )}
                  >
                    {f}
                  </button>
                )
              })}
            </div>
            <span className="font-mono-label text-muted/60">
              {pad2(filtered.length)} Items
            </span>
          </div>

          {/* masonry */}
          {loaded ? (
            <div className="gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
              {filtered.map((g, i) => (
                <GalleryTile
                  key={g.id}
                  item={g}
                  onOpen={() => setActive(i)}
                />
              ))}
            </div>
          ) : (
            <div className="gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
              {SKELETONS.map((h, i) => (
                <div
                  key={i}
                  className="mb-4 break-inside-avoid"
                  style={{ height: h }}
                >
                  <Skeleton className="h-full w-full rounded-none" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── lightbox ── */}
      <AnimatePresence>
        {item && (
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
                {pad2((active ?? 0) + 1)} / {pad2(filtered.length)} — {item.title}
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
            <NavBtn side="left" onClick={prev} />
            <NavBtn side="right" onClick={next} />

            {/* media */}
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[82vh] w-auto max-w-[90vw] overflow-hidden rounded-[6px] border border-line bg-surface"
            >
              {hasPlayableVideo(item) ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="block max-h-[82vh] w-auto"
                />
              ) : (
                <img
                  src={galleryPoster(item)}
                  alt={item.title}
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

/* ------------------------------ tile ----------------------------------- */

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
      className="group relative mb-4 block w-full break-inside-avoid overflow-hidden border border-line bg-surface"
    >
      <div style={{ aspectRatio: `${item.w} / ${item.h}` }} className="overflow-hidden">
        <img
          src={galleryPoster(item)}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      </div>

      {/* type badge */}
      <span className="font-mono-label absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/40 px-3 py-1.5 text-white/90 backdrop-blur-sm">
        {item.type === 'video' ? (
          <>
            <Play size={11} /> Video
          </>
        ) : (
          'Photo'
        )}
      </span>

      {/* hover caption */}
      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="font-display text-lg font-medium text-white">
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
