# Apex Studio — Premium Digital Studio Website

A dark, luxury, futuristic agency portfolio built with **React + TypeScript +
Vite**, **Tailwind CSS v4**, **GSAP (ScrollTrigger)**, **Lenis** smooth scroll,
**Motion**, **Three.js / React Three Fiber / Drei**, **Zustand**, **React
Router** and **react-helmet-async**.

> Brand name is a placeholder (“Apex Studio”). All imagery is original
> placeholder artwork — no third-party logos or copyrighted assets are used.

## Getting started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check + production build to /dist
npm run preview    # preview the production build
```

## Highlights

- **Hero** with a lazy-loaded React Three Fiber backdrop (wireframe rings,
  triangles, abstract solids) that reacts to the mouse and floats slowly.
- **Featured Works** — a GSAP-pinned, scroll-driven showcase of 7 projects with
  ghost titles, image mask/scale reveals, a live right-hand info panel and a
  scroll-synced counter. Falls back to a clean stacked list on mobile and for
  `prefers-reduced-motion`.
- **About / Services / Contact** sections with line-by-line text reveals,
  count-up stats, spotlight + magnetic hover cards, and a custom-styled form.
- Custom **cursor follower**, **magnetic buttons**, animated **mobile menu**,
  **page-transition wipe**, light/dark **theme toggle** and **SEO** metadata.

## Replacing the placeholder images

Project mockups live in [`public/projects/`](public/projects) as
`project-01.svg … project-07.svg`. Drop in your own images (any web format) and
update the `image` paths in [`src/data/projects.ts`](src/data/projects.ts).

## Project structure

```
src/
  main.tsx · App.tsx
  routes/        Home · Works · About · Services · Contact
  components/
    layout/      Header · Sidebar · MobileMenu · Footer · Logo
    hero/        Hero · HeroCanvas
    works/       FeaturedWorks · ProjectShowcase · ProjectCard
    sections/    AboutSection · ServicesSection · ContactSection
    ui/          MagneticButton · CursorFollower · SectionLabel · RevealText ·
                 PageHero · form · icons
    Seo.tsx
  data/          projects · services · nav
  hooks/         useLenis · useGSAPAnimation · useMouseParallax
  store/         useAppStore (Zustand: theme, menu, active project, cursor)
  lib/           utils (cn, pad2, prefersReducedMotion)
  styles/        globals.css (Tailwind v4 theme tokens + utilities)
```

## Design tokens

Defined in [`src/styles/globals.css`](src/styles/globals.css) and toggled via a
`light` class on `<html>`:

| Token        | Dark value              |
| ------------ | ----------------------- |
| Background   | `#15181e`               |
| Card         | `#191d24`               |
| Border       | `rgba(255,255,255,.08)` |
| Text primary | `#f2f2f2`               |
| Text muted   | `#9ca3af`               |
| Accent blue  | `#1f6bff`               |

## Performance & accessibility

- The Three.js canvas is `React.lazy`-loaded behind a Suspense boundary and
  split into its own bundle chunk.
- Every animation respects `prefers-reduced-motion`.
- Pointer parallax reads through refs to avoid React re-renders.
- The custom cursor only activates on fine-pointer (non-touch) devices.
