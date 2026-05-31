export interface GalleryItem {
  id: string
  type: 'image' | 'video'
  /** Image src, or video file (mp4/webm) for video items. */
  src: string
  /** Poster image for video items. */
  poster?: string
  title: string
  /** Intrinsic size — reserves layout space (avoids shift) + masonry sizing. */
  w: number
  h: number
}

/**
 * Gallery placeholders — swap `src` for real photos, and for videos set
 * `type: 'video'` with an mp4/webm `src` (the lightbox renders a <video>).
 */
export const gallery: GalleryItem[] = [
  { id: 'g1', type: 'image', src: '/gallery/gallery-01.svg', title: 'Studio Session', w: 1000, h: 1250 },
  { id: 'g2', type: 'video', src: '', poster: '/gallery/gallery-02.svg', title: 'Conference 2025', w: 1000, h: 820 },
  { id: 'g3', type: 'image', src: '/gallery/gallery-03.svg', title: 'Team Offsite', w: 1000, h: 1100 },
  { id: 'g4', type: 'image', src: '/gallery/gallery-04.svg', title: 'Award Night', w: 1000, h: 900 },
  { id: 'g5', type: 'video', src: '', poster: '/gallery/gallery-05.svg', title: 'Hackathon', w: 1000, h: 1380 },
  { id: 'g6', type: 'image', src: '/gallery/gallery-06.svg', title: 'Workshop', w: 1000, h: 760 },
  { id: 'g7', type: 'image', src: '/gallery/gallery-07.svg', title: 'Launch Day', w: 1000, h: 1040 },
  { id: 'g8', type: 'image', src: '/gallery/gallery-08.svg', title: 'Keynote Talk', w: 1000, h: 1180 },
  { id: 'g9', type: 'video', src: '', poster: '/gallery/gallery-09.svg', title: 'Behind The Scenes', w: 1000, h: 860 },
  { id: 'g10', type: 'image', src: '/gallery/gallery-10.svg', title: 'Community Meetup', w: 1000, h: 1120 },
  { id: 'g11', type: 'image', src: '/gallery/gallery-11.svg', title: 'Late Night Build', w: 1000, h: 980 },
  { id: 'g12', type: 'image', src: '/gallery/gallery-12.svg', title: 'Demo Day', w: 1000, h: 1240 },
]

const isVideoFile = (s: string) => /\.(mp4|webm|mov)$/i.test(s)

/** True when the item has a real, playable video file. */
export const hasPlayableVideo = (item: GalleryItem) =>
  item.type === 'video' && isVideoFile(item.src)

/** The image to show in grid/lightbox fallback. */
export const galleryPoster = (item: GalleryItem) =>
  item.type === 'video' ? (item.poster ?? item.src) : item.src
