import { motion } from 'framer-motion'
import { memo } from 'react'

import { EmptyState } from '@/components/ui/empty-state'
import { listContainer, listItem } from '@/lib/motion'

type PipelineItem = {
  status: string
  count: number
}

type LeadPipelinePreviewProps = {
  items: readonly PipelineItem[]
}

function LeadPipelinePreviewComponent({ items }: LeadPipelinePreviewProps) {
  return (
    <section className="rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-5 shadow-[var(--dashboard-card-shadow)]">
      <header>
        <h2 className="text-lg font-semibold tracking-tight text-[var(--dashboard-text)]">Lead Pipeline Preview</h2>
        <p className="mt-1 text-sm text-[var(--dashboard-muted)]">Current flow of AI-captured opportunities</p>
      </header>

      {items.length > 0 ? (
        <motion.div
          className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
          variants={listContainer}
          initial="hidden"
          animate="show"
        >
          {items.map((item) => (
            <motion.article
              className="rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] p-4"
              key={item.status}
              variants={listItem}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--dashboard-text)]">{item.status}</p>
                <span className="h-2 w-2 rounded-full bg-[var(--dashboard-accent)]" aria-hidden="true" />
              </div>
              <p className="mt-4 text-3xl font-semibold leading-none text-[var(--dashboard-text)]">{item.count}</p>
              <p className="mt-2 text-sm text-[var(--dashboard-muted)]">leads</p>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <div className="mt-5">
          <EmptyState
            className="min-h-[180px]"
            title="No pipeline data"
            description="Lead stage counts will appear once AI agents capture and qualify leads."
          />
        </div>
      )}
    </section>
  )
}

export const LeadPipelinePreview = memo(LeadPipelinePreviewComponent)
