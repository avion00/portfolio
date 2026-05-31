import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

/** Wordmark "Abhishek Chaudhary" with the signature blue accent dot. */
export function Logo({ className }: { className?: string }) {
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)
  return (
    <Link
      to="/"
      aria-label="Abhishek Chaudhary — home"
      onPointerEnter={() => setCursorVariant('hover')}
      onPointerLeave={() => setCursorVariant('default')}
      className={cn(
        'group inline-flex items-baseline font-display text-lg font-semibold tracking-tight text-fg',
        className,
      )}
    >
      <span>Abhishek</span>
      <span className="mx-[1px] inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
      <span>Chaudhary</span>
    </Link>
  )
}
