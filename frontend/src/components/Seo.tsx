import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description: string
  path: string
}

const SITE = 'Abhishek Kumar Chaudhary'
const ORIGIN = 'https://autostacks.com'

/** Per-route document head: title, description, Open Graph + canonical. */
export function Seo({ title, description, path }: SeoProps) {
  const fullTitle = `${title} — ${SITE}`
  const url = `${ORIGIN}${path}`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
