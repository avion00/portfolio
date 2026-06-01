import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/ui/PageHero";
import { Skeleton } from "@/components/ui/Skeleton";
import { useScrollReveal } from "@/hooks/useGSAPAnimation";
import { useAppStore } from "@/store/useAppStore";
import { getLenis } from "@/hooks/useLenis";
import { Close, Play, ArrowRight } from "@/components/ui/icons";
import { ScrambleText } from "@/components/ui/ScrambleText";
import {
  galleryGroups,
  isVideo,
  type GalleryGroup,
  type GalleryItem,
} from "@/data/gallery";
import { cn, pad2 } from "@/lib/utils";

/** Filters: "All" plus one chip per category. */
const FILTERS = ["All", ...galleryGroups.map((g) => g.category)] as const;

/** What the lightbox is currently showing — a list and an index into it. */
type Lightbox = { items: GalleryItem[]; index: number } | null;

export default function Gallery() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal]",
    stagger: 0.05,
  });
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [loaded, setLoaded] = useState(false);
  const [box, setBox] = useState<Lightbox>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  const groups = useMemo(
    () =>
      filter === "All"
        ? galleryGroups
        : galleryGroups.filter((g) => g.category === filter),
    [filter],
  );

  const total = useMemo(
    () => groups.reduce((n, g) => n + g.items.length, 0),
    [groups],
  );

  const close = () => setBox(null);
  const step = (dir: 1 | -1) =>
    setBox((b) =>
      b === null
        ? b
        : { ...b, index: (b.index + dir + b.items.length) % b.items.length },
    );

  // lightbox: lock scroll + keyboard nav
  useEffect(() => {
    if (box === null) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box === null]);

  const current = box ? box.items[box.index] : null;

  return (
    <>
      <Seo
        title="Gallery"
        description="A visual gallery of moments — cricket, travel, friends and solo shots by Abhishek Kumar Chaudhary."
        path="/gallery"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />

      <PageHero
        label="Gallery"
        lines={["Moments, off", "the clock."]}
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
                    setFilter(f);
                    setBox(null);
                  }}
                />
              ))}
            </div>
            <span className="font-mono-label text-muted/60">
              {pad2(total)} Items
            </span>
          </div>

          {/* collection grid — same bordered cell design as the Projects page,
              each cell is a category with an auto-rotating image carousel */}
          {loaded ? (
            <div
              className={cn(
                "grid grid-cols-1 border-l border-t border-line",
                groups.length > 1 && "md:grid-cols-2",
              )}
            >
              {groups.map((group) => (
                <GalleryCollectionCard
                  key={group.category}
                  group={group}
                  onOpen={(index) => setBox({ items: group.items, index })}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 border-l border-t border-line md:grid-cols-2">
              {[0, 1].map((i) => (
                <Skeleton
                  key={i}
                  className="h-[420px] w-full border-b border-r border-line md:h-[560px]"
                />
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
                {current.category} · {pad2(box.index + 1)} /{" "}
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
  );
}

/* ------------------------------ filter chip ----------------------------- */

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);
  return (
    <button
      onClick={onClick}
      onPointerEnter={() => setCursorVariant("hover")}
      onPointerLeave={() => setCursorVariant("default")}
      className={cn(
        "font-mono-label rounded-full border px-4 py-2.5 transition-colors duration-300",
        active
          ? "border-accent bg-accent text-white"
          : "border-line text-muted hover:border-line-strong hover:text-fg",
      )}
    >
      {label}
    </button>
  );
}

/* --------------------------- collection card ---------------------------- */

/**
 * One bordered grid cell per category — mirrors the Projects WorkCard (title +
 * year header, hover tint fill, 80%-width centered media) but the image area is
 * an auto-rotating carousel: it advances every 3s, pauses on hover, and exposes
 * prev/next + dot controls. Clicking the cell opens the full-screen lightbox at
 * the image on show.
 */
function GalleryCollectionCard({
  group,
  onOpen,
}: {
  group: GalleryGroup;
  onOpen: (index: number) => void;
}) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);
  const { items } = group;
  const count = items.length;
  const multi = count > 1;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // auto-advance every 3s, unless paused (hover) or there's a single item
  useEffect(() => {
    if (!multi || paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), 3000);
    return () => window.clearInterval(t);
  }, [multi, paused, count]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  const current = items[index];
  const { meta } = group;

  return (
    <article
      data-reveal
      onClick={() => onOpen(index)}
      onPointerEnter={() => {
        setCursorVariant("view");
        setPaused(true);
      }}
      onPointerLeave={() => {
        setCursorVariant("default");
        setPaused(false);
      }}
      className="group relative flex h-full cursor-pointer flex-col items-center overflow-hidden border-b border-r border-line pb-10 md:pb-16"
    >
      {/* hover tint fill (mirrors the Works cells) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{
          backgroundImage: `linear-gradient(160deg, ${meta.tint[0]}, ${meta.tint[1]})`,
        }}
      />

      {/* header: title + year (item count when no year set) */}
      <div className="relative z-10 flex w-full items-baseline justify-between gap-4 px-6 pt-6 md:px-8 md:pt-8">
        <ScrambleText
          as="h2"
          text={meta.title || group.category}
          play={false}
          hover
          className="font-display text-lg font-medium tracking-tight text-fg md:text-xl"
        />
        <span className="font-mono-label shrink-0 text-muted transition-colors group-hover:text-fg/85">
          {meta.year || `${pad2(count)} ${count === 1 ? "Item" : "Items"}`}
        </span>
      </div>

      {/* carousel: 80% width, centered, generous margins (Works proportions) */}
      <div className="relative z-10 my-10 w-4/5 overflow-hidden rounded-[5px] border border-white/10 bg-ink-2 md:my-16">
        <div className="relative aspect-[4/3] w-full">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {isVideo(current) ? (
                <video
                  // React sets `muted` as an attribute but not the property,
                  // which some browsers require before allowing muted autoplay.
                  ref={(el) => {
                    if (el) el.muted = true;
                  }}
                  src={current.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={current.src}
                  alt={current.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* type badge */}
          <span className="font-mono-label absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/40 px-3 py-1.5 text-white/90 backdrop-blur-sm">
            {isVideo(current) ? (
              <>
                <Play size={11} /> Video
              </>
            ) : (
              "Photo"
            )}
          </span>

          {/* prev / next + dots, only for multi-item collections */}
          {multi && (
            <>
              <CarouselBtn side="left" onClick={() => go(-1)} />
              <CarouselBtn side="right" onClick={() => go(1)} />

              <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    aria-label={`Show image ${i + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIndex(i);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index
                        ? "w-5 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/70",
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

/** Compact prev/next control for the in-card carousel (reveals on hover). */
function CarouselBtn({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/50 text-white/90 opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:text-accent group-hover:opacity-100",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <ArrowRight size={16} className={side === "left" ? "rotate-180" : ""} />
    </button>
  );
}

function NavBtn({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={cn(
        "absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/40 text-fg backdrop-blur-sm transition-colors hover:border-accent hover:text-accent",
        side === "left" ? "left-4 md:left-8" : "right-4 md:right-8",
      )}
    >
      <ArrowRight size={18} className={side === "left" ? "rotate-180" : ""} />
    </button>
  );
}
