import { cn } from '@/lib/utils'

/** A single shimmering placeholder bar. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded-lg', className)} />
}
