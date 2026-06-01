import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type BadgeTone = 'default' | 'success' | 'warning' | 'error' | 'accent' | 'muted'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
}

const toneClasses: Record<BadgeTone, string> = {
  default: 'border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] text-[var(--dashboard-text)]',
  success: 'border-[color:var(--dashboard-success)]/25 bg-[color:var(--dashboard-success)]/10 text-[var(--dashboard-success)]',
  warning: 'border-[color:var(--dashboard-warning)]/25 bg-[color:var(--dashboard-warning)]/10 text-[var(--dashboard-warning)]',
  error: 'border-[color:var(--dashboard-error)]/25 bg-[color:var(--dashboard-error)]/10 text-[var(--dashboard-error)]',
  accent: 'border-[color:var(--dashboard-accent)]/25 bg-[color:var(--dashboard-accent)]/10 text-[var(--dashboard-accent)]',
  muted: 'border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)]/55 text-[var(--dashboard-muted)]',
}

export function Badge({ className, tone = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-semibold leading-none',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}
