import { motion } from 'framer-motion'
import { memo } from 'react'

import { EmptyState } from '@/components/ui/empty-state'
import { listContainer, listItem } from '@/lib/motion'

type TodayAiSummaryItem = {
  label: string
  value: string
}

type TodayAiSummaryProps = {
  items: readonly TodayAiSummaryItem[]
}

function TodayAiSummaryComponent({ items }: TodayAiSummaryProps) {
  return (
    <section className="rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-5 shadow-[var(--dashboard-card-shadow)]">
      <header>
        <h2 className="text-lg font-semibold tracking-tight text-[var(--dashboard-text)]">Today's AI Summary</h2>
        <p className="mt-1 text-sm text-[var(--dashboard-muted)]">Automated voice outcomes for today</p>
      </header>

      {items.length > 0 ? (
        <motion.div
          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
          variants={listContainer}
          initial="hidden"
          animate="show"
        >
          {items.map((item) => (
            <motion.div className="rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] px-4 py-3" key={item.label} variants={listItem}>
              <p className="text-2xl font-semibold leading-none text-[var(--dashboard-text)]">{item.value}</p>
              <p className="mt-2 text-sm text-[var(--dashboard-muted)]">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="mt-5">
          <EmptyState
            className="min-h-[160px]"
            title="No AI summary yet"
            description="Daily AI call outcomes will appear once activity starts for the day."
          />
        </div>
      )}
    </section>
  )
}

export const TodayAiSummary = memo(TodayAiSummaryComponent)
