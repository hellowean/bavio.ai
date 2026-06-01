import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { memo } from 'react'

import { EmptyState } from '@/components/ui/empty-state'
import { listContainer, listItem } from '@/lib/motion'
import type { LiveActivityItem } from '@/types'

type LiveActivityProps = {
  activities: LiveActivityItem[]
}

function LiveActivityComponent({ activities }: LiveActivityProps) {
  return (
    <section className="rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-6 shadow-[var(--dashboard-card-shadow)]">
      <header>
        <h2 className="text-lg font-semibold tracking-tight text-[var(--dashboard-text)]">Live Activity</h2>
        <p className="mt-1 text-sm text-[var(--dashboard-muted)]">Real-time updates</p>
      </header>

      {activities.length > 0 ? (
        <motion.div className="mt-8 space-y-7" variants={listContainer} initial="hidden" animate="show">
          {activities.map((activity, index) => (
            <motion.article className="relative pl-7" key={activity.id} variants={listItem}>
              <span
                className="absolute left-0 top-2 h-2 w-2 rounded-full bg-[var(--dashboard-accent)]"
                aria-hidden="true"
              />
              {index < activities.length - 1 ? (
                <span
                  className="absolute left-[3px] top-6 h-[52px] w-px bg-[var(--dashboard-border)]"
                  aria-hidden="true"
                />
              ) : null}
              <h3 className="text-base font-medium text-[var(--dashboard-text)]">{activity.title}</h3>
              <p className="mt-1 text-sm text-[var(--dashboard-muted)]">{activity.detail}</p>
              <p className="mt-3 text-xs text-[var(--dashboard-muted)]">{activity.time}</p>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <div className="mt-8">
          <EmptyState
            description="Your live activity feed will update as calls, leads, and workflows happen."
            icon={<Activity className="h-5 w-5" aria-hidden="true" />}
            title="No activity yet"
          />
        </div>
      )}
    </section>
  )
}

export const LiveActivity = memo(LiveActivityComponent)
