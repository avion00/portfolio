import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, LayoutGroup } from 'motion/react'
import { navItems, type NavItem as NavItemType } from '@/data/nav'
import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Sun, Moon } from '@/components/ui/icons'

// hide/reveal easing + entrance easing
const EASE = [0.22, 1, 0.36, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const

/** Drop-from-top entrance, tuned per element via `delay`. */
const dropIn = (delay: number) => ({
  initial: { y: -26, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: EASE_OUT, delay },
})

/* ------------------------------ nav item ------------------------------ */

function NavItem({ item }: { item: NavItemType }) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      onPointerEnter={() => setCursorVariant('hover')}
      onPointerLeave={() => setCursorVariant('default')}
      className="group relative px-1 py-1.5 text-[0.95rem]"
    >
      {({ isActive }) => (
        <>
          {/* active dot — slides between items on navigation */}
          {isActive && (
            <motion.span
              layoutId="nav-dot"
              className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            />
          )}
          {/* text-roll: top copy lifts out, accent copy rolls in */}
          <span className="relative block overflow-hidden leading-tight">
            <span
              className={cn(
                'block transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full',
                isActive ? 'text-fg' : 'text-muted',
              )}
            >
              {item.label}
            </span>
            <span
              aria-hidden
              className="absolute inset-0 block translate-y-full text-accent transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
            >
              {item.label}
            </span>
          </span>
        </>
      )}
    </NavLink>
  )
}

/* ------------------------------- header ------------------------------- */

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)
  const toggleMenu = useAppStore((s) => s.toggleMenu)
  const menuOpen = useAppStore((s) => s.menuOpen)
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)

      if (y < 90) setHidden(false)
      else if (y > lastY.current + 6) setHidden(true)
      else if (y < lastY.current - 6) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hover = {
    onPointerEnter: () => setCursorVariant('hover'),
    onPointerLeave: () => setCursorVariant('default'),
  }

  // left-to-right entrance timeline
  const navBase = 0.24
  const navStep = 0.06
  const ctrlBase = navBase + navItems.length * navStep

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden && !menuOpen ? '-110%' : '0%' }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled ? 'bg-ink/60 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-[height] duration-500 md:px-10',
          scrolled ? 'h-16' : 'h-20',
        )}
      >
        <motion.div {...dropIn(0.12)}>
          <Logo />
        </motion.div>

        {/* Center nav — desktop */}
        <nav className="hidden lg:block">
          <LayoutGroup>
            <ul className="flex items-center gap-9">
              {navItems.map((item, i) => (
                <motion.li key={item.to} {...dropIn(navBase + i * navStep)}>
                  <NavItem item={item} />
                </motion.li>
              ))}
            </ul>
          </LayoutGroup>
        </nav>

        {/* Right controls — desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* <motion.button
            {...dropIn(ctrlBase)}
            {...hover}
            className="font-mono-label rounded-full border border-line px-3 py-2 text-muted transition-colors hover:border-line-strong hover:text-fg"
            aria-label="Switch language"
          >
            EN
          </motion.button> */}
          <motion.button
            {...dropIn(ctrlBase + 0.06)}
            {...hover}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="group relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <span className="transition-transform duration-500 group-hover:rotate-180">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </span>
          </motion.button>
          <motion.div {...dropIn(ctrlBase + 0.12)} className="ml-1">
            <MagneticButton variant="solid" onClick={() => navigate('/contact')}>
              Start a Project
            </MagneticButton>
          </motion.div>
        </div>

        {/* Mobile — menu trigger */}
        <motion.button
          {...dropIn(0.2)}
          {...hover}
          onClick={toggleMenu}
          aria-label="Open menu"
          className="group flex items-center gap-3 lg:hidden"
        >
          <span className="font-mono-label text-muted transition-colors group-hover:text-fg">
            MENU
          </span>
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-line text-fg">
            <span className="flex flex-col items-center gap-[5px]">
              <span className="block h-px w-4 bg-current transition-transform duration-300 group-hover:translate-y-[3px]" />
              <span className="block h-px w-4 bg-current transition-transform duration-300 group-hover:-translate-y-[3px]" />
            </span>
          </span>
        </motion.button>
      </div>
    </motion.header>
  )
}
