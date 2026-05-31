import { Helmet } from 'react-helmet-async'
import {
  SITE_URL,
  SITE_NAME,
  LOCALE,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_W,
  OG_IMAGE_H,
  GLOBAL_KEYWORDS,
  abs,
} from '@/data/site'
import { breadcrumbSchema } from '@/lib/structuredData'

interface Breadcrumb {
  name: string
  path: string
}

interface SeoProps {
  title: string
  description: string
  path: string
  /** OG/Twitter image (path or absolute). Defaults to the branded card. */
  image?: string
  /** OG type — "website" for listings, "article" for projects, "profile" for about. */
  type?: 'website' | 'article' | 'profile'
  /** Extra keywords appended to the global set. */
  keywords?: string[]
  /** Set true to keep a page out of the index (e.g. thin/utility pages). */
  noindex?: boolean
  /** Breadcrumb trail — emitted as BreadcrumbList JSON-LD. */
  breadcrumbs?: Breadcrumb[]
  /** Page-specific JSON-LD object(s) merged into the graph. */
  schema?: object | object[]
}

/**
 * Per-route document head: title, description, canonical, robots, Open Graph,
 * Twitter cards and JSON-LD structured data. The global Person/WebSite/
 * Organization graph lives statically in index.html; this adds the per-page
 * entities (breadcrumbs, project, service catalog, …).
 */
export function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  keywords = [],
  noindex = false,
  breadcrumbs,
  schema,
}: SeoProps) {
  const fullTitle = `${title} — ${SITE_NAME}`
  const url = abs(path)
  const ogImage = abs(image ?? DEFAULT_OG_IMAGE)
  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  const pageSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : []
  const graph = [
    ...(breadcrumbs?.length ? [breadcrumbSchema(breadcrumbs)] : []),
    ...pageSchemas,
  ]
  const jsonLd =
    graph.length > 0
      ? { '@context': 'https://schema.org', '@graph': graph }
      : null

  return (
    <Helmet>
      {/* primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={[...GLOBAL_KEYWORDS, ...keywords].join(', ')}
      />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={LOCALE} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={OG_IMAGE_W} />
      <meta property="og:image:height" content={OG_IMAGE_H} />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* structured data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}

export { SITE_URL }
