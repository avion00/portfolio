// Galleries shown (vertically stacked) on each project's detail page.
//
// There are two ways to give a project images — use whichever you like:
//
//  A) PUBLIC FOLDER (what's wired up below)
//     Your screenshots live in:  public/projects/sub-image/
//     Map a project id -> its file names in `PUBLIC_GALLERIES`. The order in the
//     array is the order they appear on the page. To add/remove/reorder images,
//     just edit that list.
//
//  B) AUTO-LOAD FOLDER (zero code)
//     Drop images into:  src/assets/projects/<project-id>/
//     They're picked up automatically (sorted by file name). Used only for
//     projects that are NOT listed in `PUBLIC_GALLERIES`.
//
// The <project-id> must match the project's `id` in projects.ts.

export interface GalleryImage {
  /** URL for the image. */
  src: string
  /** Optional caption shown under the image. */
  label: string
}

// ── A) Public screenshots in public/projects/sub-image/ ──────────────────────
const sub = (name: string) => `/projects/sub-image/${name}`

const PUBLIC_GALLERIES: Record<string, string[]> = {
  'multi-agent-ai-platform': [sub('multi-agent.png'), sub('apex.png')],

  'enterprise-erp-system': [
    '/projects/project-02.jpeg',
    sub('pop1.jpg'),
    sub('pop2.jpg'),
    sub('pop3.jpg'),
    sub('pop4.jpg'),
  ],

  'crm-sales-platform': [
    sub('crm.jpg'),
    sub('crm1.jpg'),
    sub('crm2.jpg'),
    sub('crm3.jpg'),
    sub('crm4.jpg'),
    sub('1.png'),
    sub('2.png'),
    sub('3.png'),
  ],

  'ai-support-chatbot': [
    sub('chat1.png'),
    sub('chatbots.png'),
    sub('ch.png'),
    sub('admin-profile.png'),
  ],

  'cross-platform-mobile-app': [
    sub('mobile-app1.png'),
    sub('mob2.png'),
    sub('mob3.png'),
    sub('mob4.png'),
  ],

  'saas-analytics-dashboard': [
    sub('saas1.png'),
    sub('saas2.png'),
    sub('saas3.png'),
    sub('saas4.png'),
    sub('saas5.png'),
  ],

  'ecommerce-platform': [
    sub('ecom1.png'),
    sub('ecom2.png'),
    sub('ecom3.png'),
    sub('ecom4.png'),
    sub('ecom5.jpg'),
  ],

  'autonomous-ai-agent-system': [
    sub('autonomous1.png'),
    sub('autonomous2.png'),
    sub('autonomous3.png'),
    sub('autonomous4.png'),
  ],

  'workflow-automation-pipeline': [
    sub('pipeline.png'),
    sub('pipeline1.png'),
    sub('pipelin3.png'),
  ],
}

// ── B) Auto-loaded images under src/assets/projects/<id>/ ────────────────────
const modules = import.meta.glob<string>(
  '../assets/projects/*/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true, import: 'default', query: '?url' },
)

/** Turn a file path into a readable caption, dropping any "01-" ordering prefix. */
function labelFromPath(path: string): string {
  const base = (path.split('/').pop() ?? '')
    .replace(/\.[^.]+$/, '') // strip extension
    .replace(/^\d+[-_\s]*/, '') // strip a leading "01-" / "02_" ordering prefix
    .replace(/[-_]+/g, ' ') // dashes/underscores -> spaces
    .trim()
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : ''
}

const autoGalleries: Record<string, GalleryImage[]> = {}
for (const path of Object.keys(modules).sort()) {
  const id = path.match(/\/projects\/([^/]+)\//)?.[1]
  if (!id) continue
  ;(autoGalleries[id] ??= []).push({
    src: modules[path],
    label: labelFromPath(path),
  })
}

// ── Final lookup: explicit public mapping wins; otherwise fall back to auto ───
/** project id -> ordered list of gallery images. */
export const projectGalleries: Record<string, GalleryImage[]> = { ...autoGalleries }

for (const [id, files] of Object.entries(PUBLIC_GALLERIES)) {
  projectGalleries[id] = files.map((src) => ({ src, label: '' }))
}
