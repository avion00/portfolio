import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

const fieldBase =
  'w-full rounded-xl border border-line bg-surface/60 px-4 py-3.5 text-sm text-fg ' +
  'placeholder:text-muted/70 outline-none transition-colors duration-300 ' +
  'focus:border-accent focus:bg-surface hover:border-line-strong'

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(fieldBase, className)} {...props} />
))
Input.displayName = 'Input'

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(fieldBase, 'min-h-32 resize-none', className)}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        fieldBase,
        'appearance-none pr-10 [&>option]:bg-surface [&>option]:text-fg',
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <svg
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </div>
))
Select.displayName = 'Select'

interface FieldProps {
  label: string
  htmlFor: string
  children: ReactNode
  className?: string
}

export function Field({ label, htmlFor, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="font-mono-label text-muted">
        {label}
      </label>
      {children}
    </div>
  )
}
