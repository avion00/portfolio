import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/lib/utils'

const socials = [
  { label: 'IG', href: 'https://instagram.com' },
  { label: 'X', href: 'https://x.com' },
  { label: 'IN', href: 'https://linkedin.com' },
  { label: 'BE', href: 'https://behance.net' },
]

/**
 * Slim persistent left rail (desktop only). Lives in the layout gutter so it
 * never overlaps content on wide screens.
 */
export function Sidebar() {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  const hover = {
    onPointerEnter: () => setCursorVariant('hover'),
    onPointerLeave: () => setCursorVariant('default'),
  }

  return (
    <aside className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-12 flex-col items-center justify-between py-24 xl:flex">
      {/* top: vertical copyright */}
      <span className="font-mono-label rotate-180 text-muted/60 [writing-mode:vertical-rl]">
        © 2026 — ABHISHEK CHAUDHARY
      </span>

      {/* middle: animated thin line */}
      <div className="relative h-28 w-px overflow-hidden bg-line">
        <span className="absolute inset-x-0 top-0 h-10 animate-[slideDown_2.4s_ease-in-out_infinite] bg-accent" />
      </div>

      {/* bottom: socials */}
      <ul className="pointer-events-auto flex flex-col items-center gap-4">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              {...hover}
              className={cn(
                'font-mono-label text-muted/70 transition-colors hover:text-accent',
              )}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
