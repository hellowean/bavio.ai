import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { memo } from 'react'

import { EmptyState } from '@/components/ui/empty-state'
import { cn } from '@/lib/utils'
import { listContainer, listItem } from '@/lib/motion'
import type { RecentCall } from '@/types'

type RecentCallsProps = {
  calls: RecentCall[]
}

const outcomeToneClass: Record<RecentCall['outcomeTone'], string> = {
  success: 'text-[var(--dashboard-success)]',
  warning: 'text-[var(--dashboard-warning)]',
  accent: 'text-[var(--dashboard-accent)]',
  muted: 'text-[var(--dashboard-muted)]',
}

function RecentCallsComponent({ calls }: RecentCallsProps) {
  return (
    <section className="rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-6 shadow-[var(--dashboard-card-shadow)]">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--dashboard-text)]">Recent Calls</h2>
          <p className="mt-1 text-sm text-[var(--dashboard-muted)]">Latest inbound and outbound activity</p>
        </div>
        <button
          className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[var(--dashboard-accent)]"
          type="button"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </header>

      {calls.length > 0 ? (
        <motion.div className="mt-8 space-y-8" variants={listContainer} initial="hidden" animate="show">
          {calls.map((call) => (
            <motion.article className="grid grid-cols-[40px_1fr_auto] items-start gap-4" key={call.id} variants={listItem}>
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--dashboard-accent)]/10 text-[var(--dashboard-accent)]">
                <Phone className="h-4 w-4" aria-hidden="true" strokeWidth={1.9} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--dashboard-text)]">{call.contact}</h3>
                <p className="mt-1 text-sm text-[var(--dashboard-muted)]">
                  {call.company} <span className="mx-2">·</span> {call.duration} <span className="mx-2">·</span>{' '}
                  {call.agent}
                </p>
                <p className={cn('mt-1 text-sm font-semibold', outcomeToneClass[call.outcomeTone])}>{call.outcome}</p>
              </div>
              <p className="pt-1 text-sm text-[var(--dashboard-muted)]">{call.occurredAt}</p>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="No recent calls"
            description="Recent inbound and outbound AI call activity will appear here."
          />
        </div>
      )}
    </section>
  )
}

export const RecentCalls = memo(RecentCallsComponent)
