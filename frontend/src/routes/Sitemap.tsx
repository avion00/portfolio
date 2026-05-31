import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Skeleton } from '@/components/ui/Skeleton'
import { useScrollReveal } from '@/hooks/useGSAPAnimation'
import { useAppStore } from '@/store/useAppStore'
import { ArrowUpRight } from '@/components/ui/icons'
import { navItems, extraNavItems, legalNavItems, SOCIALS } from '@/data/nav'
import { projects } from '@/data/projects'
import { pad2 } from '@/lib/utils'

interface SiteLink {
  label: string
  to?: string
  href?: string
}

interface SiteGroup {
  title: string
  links: SiteLink[]
}

const GROUPS: SiteGroup[] = [
  { title: 'Main', links: navItems },
  { title: 'More', links: extraNavItems.concat({ label: 'Contact', to: '/contact' }) },
  {
    title: 'Projects',
    links: projects.map((p) => ({ label: p.title, to: `/project/${p.id}` })),
  },
  { title: 'Legal', links: legalNavItems },
  {
    title: 'Connect',
    links: SOCIALS.map((s) => ({ label: s.label, href: s.href })),
  },
]

export default function Sitemap() {
  const ref = useScrollReveal<HTMLDivElement>({
    selector: '[data-reveal]',
    stagger: 0.06,
  })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 700)
    return () => window.clearTimeout(t)
  }, [])

  const total = GROUPS.reduce((n, g) => n + g.links.length, 0)

  return (
    <>
      <Seo
        title="Sitemap"
        description="A complete map of every page on Abhishek Kumar Chaudhary's website — main pages, projects and legal."
        path="/sitemap"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Sitemap', path: '/sitemap' },
        ]}
      />

      <PageHero
        label="Sitemap"
        lines={['Everything,', 'in one place.']}
        intro="A complete map of the site — every page, project and link, grouped for quick navigation."
      />

      <section ref={ref} className="py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div
            data-reveal
            className="mb-12 flex items-center justify-between border-b border-line pb-8"
          >
            <span className="font-mono-label text-muted/60">
              {GROUPS.length} Sections
            </span>
            <span className="font-mono-label text-muted/60">
              {pad2(total)} Links
            </span>
          </div>

          {loaded ? (
            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {GROUPS.map((group, gi) => (
                <div data-reveal key={group.title}>
                  <div className="mb-6 flex items-baseline gap-3">
                    <span className="font-mono-label text-accent">
                      {pad2(gi + 1)}
                    </span>
                    <h2 className="font-display text-xl font-medium tracking-tight text-fg">
                      {group.title}
                    </h2>
                    <span className="font-mono-label text-muted/40">
                      {pad2(group.links.length)}
                    </span>
                  </div>
                  <ul className="space-y-1 border-t border-line">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <SitemapLink link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="mb-6 h-6 w-1/3" />
                  {[0, 1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-5 w-full" />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function SitemapLink({ link }: { link: SiteLink }) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const hover = {
    onPointerEnter: () => setCursorVariant('hover'),
    onPointerLeave: () => setCursorVariant('default'),
  }

  const inner: ReactNode = (
    <span className="group/row flex items-center justify-between border-b border-line py-3.5 text-muted transition-colors hover:text-fg">
      <span className="transition-transform duration-300 group-hover/row:translate-x-1.5">
        {link.label}
      </span>
      <ArrowUpRight
        size={15}
        className="opacity-0 transition-opacity duration-300 group-hover/row:opacity-100"
      />
    </span>
  )

  if (link.href) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" {...hover}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={link.to ?? '/'} {...hover}>
      {inner}
    </Link>
  )
}
