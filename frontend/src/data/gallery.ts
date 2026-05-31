// Gallery media — real files live in public/gallery/ (served at /gallery/...).
//
// HOW TO ADD A PHOTO OR VIDEO:
//   1. Drop the file into  public/gallery/
//   2. Add an entry to the FILES list below: { file, title }
//        - `title` is what shows on hover + in the lightbox (edit it freely).
//        - `category` is optional; if omitted it's guessed from the file name.
// Videos (.mp4/.webm/.mov) autoplay muted + looped automatically.

export interface GalleryItem {
  id: string
  type: 'image' | 'video'
  /** Public URL, e.g. /gallery/cricket-winner.jpg */
  src: string
  /** Display title shown on hover + in the lightbox. */
  title: string
  category: string
}

export interface GalleryGroup {
  category: string
  items: GalleryItem[]
}

const VIDEO_RE = /\.(mp4|webm|mov)$/i

// First matching rule wins, so order matters (friends before tour so e.g.
// "friend-world-camp" lands in Friends, not Tour).
const CATEGORY_RULES: [RegExp, string][] = [
  [/cricket/i, 'Cricket'],
  [/friend/i, 'Friends'],
  [/tour|camp|world/i, 'Tour'],
  [/solo/i, 'Solo'],
]

/** Order the category cards appear on the page. */
const CATEGORY_ORDER = ['Cricket', 'Tour', 'Friends', 'Solo', 'Other']

function categoryOf(file: string): string {
  for (const [re, cat] of CATEGORY_RULES) if (re.test(file)) return cat
  return 'Other'
}

/** Fallback title from the file name, used only when an entry has no `title`. */
function titleOf(file: string): string {
  return file
    .replace(/\.[^.]+$/, '') // strip extension
    .replace(/[-_]+/g, ' ') // dashes/underscores -> spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()) // Title Case
    .trim()
}

interface FileEntry {
  file: string
  /** Shown on hover + lightbox. Falls back to a cleaned file name if omitted. */
  title?: string
  /** Optional manual category override (otherwise guessed from the name). */
  category?: string
}

// Every media file in public/gallery/. EDIT the `title` of each to taste.
const FILES: FileEntry[] = [
  // ── Cricket ──────────────────────────────────────────────────────────────
  { file: "cricket-grop.jpeg", title: "The Team" },
  { file: "cricket-champion.jpg", title: "Champions" },
  { file: "cricket-winner.jpg", title: "Winning Moment" },
  { file: "cricket-winner.mp4", title: "Victory Celebration" },
  { file: "cricket-winner-dance.mp4", title: "Winners' Dance" },
  { file: "cricket-winning-dance.mp4", title: "Celebration" },
  // ── Tour ─────────────────────────────────────────────────────────────────
  { file: "tour1.jpg", title: "On the Basantapur" },
  { file: "tour3.jpg", title: "Moment On Basantapur" },
  { file: "tour-solo.jpg", title: "Wanderer" },
  { file: "solo-tour.png", title: "kayaking" },
  { file: "world-camp.jpg", title: "World Camp Masteriyo" },
  { file: "tour-blog.mp4", title: "Travel Diary" },
  { file: "tour.MOV", title: "On the Way of Muktinath Temple" },
  { file: "tour1.MOV", title: "The 108 Mukti Dhara at Muktinath Temple" },
  // ── Friends ──────────────────────────────────────────────────────────────
  { file: "friends.jpg", title: "Best Company" },
  { file: "friends2.jpeg", title: "Yoganda Forever" },
  { file: "friends3.png", title: "Together" },
  { file: "friends4.jpg", title: "Experience" },
  { file: "friend1.jpg", title: "Mitra" },
  { file: "friend-5.jpg", title: "Political Member with Kiran Chaudhary" },
  { file: "friend-6.jpg", title: "The Gang" },
  { file: "friend7.jpg", title: "Laali Guras" },
  { file: "friend-world-camp.jpg", title: "Best Chai with best person" },
  // ── Solo ─────────────────────────────────────────────────────────────────
  { file: "solo.jpg", title: "Green Peace" },
  { file: "solo.jpeg", title: "Koshi" },
  { file: "solo.png", title: "Janakpur" },
  { file: "solo1.jpg", title: "GothGoun" },
  { file: "solo9.jpg", title: "Routa Mai" },
  { file: "solo-lumbini.jpg", title: "At Lumbini" },
  { file: "solo-relax.jpg", title: "Rangeli" },
  { file: "solo-horse.jpg", title: "Horseback in the Hills" },
];

export const gallery: GalleryItem[] = FILES.map((entry, i) => ({
  id: `g${i}`,
  type: VIDEO_RE.test(entry.file) ? 'video' : 'image',
  src: `/gallery/${entry.file}`,
  title: entry.title ?? titleOf(entry.file),
  category: entry.category ?? categoryOf(entry.file),
}))

/** Media grouped into category cards, in CATEGORY_ORDER. */
export const galleryGroups: GalleryGroup[] = (() => {
  const map = new Map<string, GalleryItem[]>()
  for (const item of gallery) {
    const list = map.get(item.category) ?? []
    list.push(item)
    map.set(item.category, list)
  }
  return [...map.entries()]
    .map(([category, items]) => ({ category, items }))
    .sort(
      (a, b) =>
        CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category),
    )
})()

export const isVideo = (item: GalleryItem) => item.type === 'video'
