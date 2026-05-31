import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from '@/components/layout/Header'
// import { Sidebar } from '@/components/layout/Sidebar'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { Footer } from '@/components/layout/Footer'
import { CursorFollower } from '@/components/ui/CursorFollower'
import { useLenis, getLenis } from '@/hooks/useLenis'

const Home = lazy(() => import('@/routes/Home'))
const Works = lazy(() => import('@/routes/Works'))
const About = lazy(() => import('@/routes/About'))
const Services = lazy(() => import('@/routes/Services'))
const Contact = lazy(() => import('@/routes/Contact'))
const Experience = lazy(() => import('@/routes/Experience'))
const Skills = lazy(() => import('@/routes/Skills'))
const Company = lazy(() => import('@/routes/Company'))
const ProjectDetail = lazy(() => import('@/routes/ProjectDetail'))
const Gallery = lazy(() => import('@/routes/Gallery'))
const Privacy = lazy(() => import('@/routes/Privacy'))
const Terms = lazy(() => import('@/routes/Terms'))
const Cookies = lazy(() => import('@/routes/Cookies'))
const Sitemap = lazy(() => import('@/routes/Sitemap'))

/** Full-screen wipe panel that reveals the page on each navigation. */
function RouteWipe() {
  const { pathname } = useLocation()
  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-ink-2"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease: [0.85, 0, 0.15, 1] }}
      >
        <span className="absolute inset-x-0 bottom-0 h-px bg-accent" />
      </motion.div>
    </AnimatePresence>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  // Reset scroll and re-measure pinned triggers on every route change.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => window.clearTimeout(id)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      {/* opacity-only: never sets `transform`, so it won't break ScrollTrigger pins */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onAnimationComplete={() => ScrollTrigger.refresh()}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  useLenis()

  return (
    <>
      <CursorFollower />
      <RouteWipe />
      <Header />
      {/* <Sidebar /> */}
      <MobileMenu />
      <main className="relative">
        <Suspense
          fallback={
            <div className="grid min-h-screen place-items-center">
              <span className="font-mono-label animate-pulse text-muted">
                Loading…
              </span>
            </div>
          }
        >
          <AnimatedRoutes />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
