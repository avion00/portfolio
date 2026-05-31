// Central site / SEO configuration. Everything SEO-related reads from here so
// the domain, name and defaults live in exactly one place.

import {
  OWNER_NAME,
  OWNER_SHORT,
  COMPANY_NAME,
  COMPANY_URL,
  CONTACT_EMAIL,
  SOCIALS,
} from '@/data/nav'

/** Canonical production origin (no trailing slash). */
export const SITE_URL = 'https://abhisek.site'

export const SITE_NAME = OWNER_NAME // "Abhishek Kumar Chaudhary"
export const SITE_SHORT = OWNER_SHORT // "Abhishek Chaudhary"
export const SITE_TAGLINE = 'AI & Full Stack Developer'
export const LOCALE = 'en_US'

/** Default social-share image (1200×630). See public/og.svg. */
export const DEFAULT_OG_IMAGE = '/og.svg'
export const OG_IMAGE_W = '1200'
export const OG_IMAGE_H = '630'

export { OWNER_NAME, COMPANY_NAME, COMPANY_URL, CONTACT_EMAIL, SOCIALS }

/** Profile URLs used for `sameAs` / entity reconciliation. */
export const SAME_AS = SOCIALS.map((s) => s.href)

/** Make any path absolute against the canonical origin. */
export const abs = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`

/**
 * Site-wide keyword set. Page descriptions do the heavy lifting for ranking,
 * but this reinforces topical relevance for the whole entity.
 */
export const GLOBAL_KEYWORDS = [
  'Abhishek Kumar Chaudhary',
  'Abhishek Chaudhary',
  'Full Stack Developer Nepal',
  'AI Developer Nepal',
  'AI Automation Engineer',
  'Multi-Agent AI Developer',
  'AI Agents Developer',
  'AI Chatbot Developer',
  'RAG Systems',
  'LangChain Developer',
  'React Developer',
  'Next.js Developer',
  'React Native Developer',
  'Python Developer',
  'FastAPI Developer',
  'SaaS Developer',
  'ERP CRM Developer',
  'Enterprise Software Developer',
  'Mobile App Developer',
  'Web Developer Nepal',
  'Automation Expert',
  'Founder of AutoStacks',
]

/** Canonical entity @ids used to link the JSON-LD graph together. */
export const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  organization: `${SITE_URL}/#organization`,
}
