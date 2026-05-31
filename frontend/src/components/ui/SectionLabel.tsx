import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  /** Show the small blue accent dot before the label. */
  dot?: boolean
}

/** Small uppercase monospace label used to tag every section. */
export function SectionLabel({
  children,
  className,
  dot = true,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        'font-mono-label inline-flex items-center gap-2 text-muted',
        className,
      )}
    >
      {dot && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
      )}
      {children}
    </span>
  )
}
