import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { navItems, CONTACT_EMAIL } from '@/data/nav'
import { useAppStore } from '@/store/useAppStore'
import { getLenis } from '@/hooks/useLenis'
import { Close, Sun, Moon } from '@/components/ui/icons'
import { pad2 } from '@/lib/utils'

const overlay = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], when: 'beforeChildren', staggerChildren: 0.07, delayChildren: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.35, when: 'afterChildren' } },
} as const

const item = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { y: 30, opacity: 0, transition: { duration: 0.25 } },
} as const

export function MobileMenu() {
  const menuOpen = useAppStore((s) => s.menuOpen)
  const setMenuOpen = useAppStore((s) => s.setMenuOpen)
  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)

  // Lock scroll while the overlay is open.
  useEffect(() => {
    const lenis = getLenis()
    if (menuOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          variants={overlay}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-2xl lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-display text-lg font-semibold">
              Abhishek<span className="text-accent">.</span>Chaudhary
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg"
            >
              <Close size={18} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-6">
            <ul className="flex flex-col gap-2">
              {navItems.map((nav, i) => (
                <motion.li key={nav.to} variants={item}>
                  <Link
                    to={nav.to}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="font-mono-label text-muted">
                      {pad2(i + 1)}
                    </span>
                    <span className="font-display text-[2.75rem] font-medium leading-none tracking-tight text-fg transition-colors group-hover:text-accent">
                      {nav.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            variants={item}
            className="flex items-center justify-between border-t border-line px-6 py-6"
          >
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-muted"
            >
              {CONTACT_EMAIL}
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
