import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

function EmptyState({ action, className, description, icon, title }: EmptyStateProps) {
  return (
    <motion.div
      className={cn(
        'flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-[color:var(--dashboard-border)]/90 bg-[color:var(--dashboard-surface-raised)]/32 px-6 py-10 text-center shadow-[inset_0_1px_0_color-mix(in_srgb,var(--dashboard-text)_3%,transparent)]',
        className,
      )}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-lg border border-[color:var(--dashboard-accent)]/18 bg-[color:var(--dashboard-accent)]/10 text-[var(--dashboard-accent)] shadow-[0_8px_20px_color-mix(in_srgb,var(--dashboard-accent)_10%,transparent)]"
        initial={{ scale: 0.94 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {icon ?? <Inbox className="h-5 w-5" aria-hidden="true" />}
      </motion.div>
      <h3 className="mt-4 text-base font-semibold text-[var(--dashboard-text)]">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--dashboard-muted)]">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </motion.div>
  )
}

export { EmptyState }
