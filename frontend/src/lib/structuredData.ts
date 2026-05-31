// JSON-LD (schema.org) builders. These power Google rich results and help
// answer engines (ChatGPT, Gemini, Perplexity, Google AI Overviews) understand
// who Abhishek is, what he builds, and recommend him for matching queries.
//
// The global Person / WebSite / Organization graph is emitted statically in
// index.html (so it's in the raw HTML for crawlers that don't run JS). The
// builders here add per-page schema via the <Seo> component.

import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  COMPANY_NAME,
  CONTACT_EMAIL,
  SAME_AS,
  ID,
  abs,
} from '@/data/site'
import { skillGroups } from '@/data/skills'
import { services } from '@/data/services'
import { experience } from '@/data/experience'
import { faqs } from '@/data/faq'
import type { Project } from '@/data/projects'

type Json = Record<string, unknown>

const allSkills = skillGroups.flatMap((g) => g.skills)

/** Person — the core entity. Also emitted statically in index.html. */
export function personSchema(): Json {
  return {
    '@type': 'Person',
    '@id': ID.person,
    name: SITE_NAME,
    alternateName: 'Abhishek Chaudhary',
    url: SITE_URL,
    image: abs('/og.svg'),
    jobTitle: 'Full Stack Developer & AI Automation Engineer',
    description:
      'Full Stack Developer and AI Automation Engineer specialising in multi-agent AI systems, AI agents and chatbots, ERP/CRM, SaaS products, mobile apps and automation infrastructure. Founder of AutoStacks.',
    email: `mailto:${CONTACT_EMAIL}`,
    nationality: 'Nepali',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NP',
      addressRegion: 'Nepal',
    },
    worksFor: { '@id': ID.organization },
    knowsAbout: Array.from(
      new Set([
        'Artificial Intelligence',
        'AI Automation',
        'Multi-Agent Systems',
        'AI Agents',
        'AI Chatbots',
        'RAG Systems',
        'LangChain',
        'Large Language Models',
        'Full Stack Development',
        'SaaS Development',
        'ERP Software',
        'CRM Software',
        'Mobile App Development',
        'Cloud & DevOps',
        ...allSkills,
      ]),
    ),
    knowsLanguage: ['English', 'Nepali', 'Hindi'],
    sameAs: SAME_AS,
  }
}

/** WebSite. Also emitted statically in index.html. */
export function websiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: SITE_URL,
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    inLanguage: 'en',
    publisher: { '@id': ID.person },
  }
}

/** AutoStacks — the professional service / brand. Also static in index.html. */
export function organizationSchema(): Json {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ID.organization,
    name: COMPANY_NAME,
    url: SITE_URL,
    founder: { '@id': ID.person },
    description:
      'AI automation and software engineering studio building multi-agent AI systems, ERP/CRM, SaaS products, mobile apps and automation infrastructure for startups, enterprises and international clients.',
    areaServed: 'Worldwide',
    email: `mailto:${CONTACT_EMAIL}`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NP',
      addressRegion: 'Nepal',
    },
    knowsAbout: services.map((s) => s.title),
    sameAs: SAME_AS,
  }
}

/** Breadcrumb trail for an inner page. */
export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  }
}

/** A single project as a CreativeWork, authored by the Person. */
export function projectSchema(project: Project, image?: string): Json {
  return {
    '@type': 'CreativeWork',
    '@id': abs(`/project/${project.id}`),
    name: project.title,
    headline: `${project.title} — ${project.category}`,
    description: project.description,
    url: abs(`/project/${project.id}`),
    image: abs(image ?? project.image),
    dateCreated: project.year,
    inLanguage: 'en',
    keywords: [project.category, project.industry, project.framework, project.client],
    creator: { '@id': ID.person },
    author: { '@id': ID.person },
    about: project.industry,
  }
}

/** The full project list as an ItemList (for /works). */
export function projectsCollectionSchema(projects: Project[]): Json {
  return {
    '@type': 'CollectionPage',
    '@id': abs('/works'),
    name: 'Projects',
    url: abs('/works'),
    about: { '@id': ID.person },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: abs(`/project/${p.id}`),
        name: p.title,
      })),
    },
  }
}

/** Services as an OfferCatalog provided by the Person. */
export function servicesSchema(): Json {
  return {
    '@type': 'Service',
    '@id': abs('/services#catalog'),
    serviceType: 'AI automation & full-stack software development',
    provider: { '@id': ID.person },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software & AI services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
      })),
    },
  }
}

/** Skills as a defined-term ItemList (reinforces `knowsAbout`). */
export function skillsSchema(): Json {
  return {
    '@type': 'ItemList',
    '@id': abs('/skills#list'),
    name: 'Technical skills & stack',
    itemListElement: allSkills.map((skill, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: skill,
    })),
  }
}

/** About page → ProfilePage referencing the Person, with work history. */
export function profilePageSchema(): Json {
  return {
    '@type': 'ProfilePage',
    '@id': abs('/about'),
    url: abs('/about'),
    mainEntity: {
      '@id': ID.person,
      '@type': 'Person',
      hasOccupation: experience.map((e) => ({
        '@type': 'Occupation',
        name: e.role,
        occupationLocation: { '@type': 'Organization', name: e.company },
        description: e.summary,
      })),
    },
  }
}

/** FAQ — backed by the visible FAQ section on the home page. */
export function faqSchema(): Json {
  return {
    '@type': 'FAQPage',
    '@id': abs('/#faq'),
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Contact page schema. */
export function contactPageSchema(): Json {
  return {
    '@type': 'ContactPage',
    '@id': abs('/contact'),
    url: abs('/contact'),
    name: `Contact ${SITE_NAME}`,
    about: { '@id': ID.person },
  }
}
