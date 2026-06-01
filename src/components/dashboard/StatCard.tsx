import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { memo } from 'react'

import { listItem, softScale } from '@/lib/motion'
import type { DashboardMetric } from '@/types'

type StatCardProps = {
  metric: DashboardMetric
}

function StatCardComponent({ metric }: StatCardProps) {
  const trendTone =
    metric.trend === 'up'
      ? 'text-[var(--dashboard-success)]'
      : metric.trend === 'down'
        ? 'text-[var(--dashboard-error)]'
        : 'text-[var(--dashboard-muted)]'
  const TrendIcon = metric.trend === 'up' ? ArrowUpRight : metric.trend === 'down' ? ArrowDownRight : Minus

  return (
    <motion.article
      className="h-[112px] rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-4 shadow-[var(--dashboard-card-shadow)] transition-colors hover:border-[color:var(--dashboard-accent)]/28 hover:shadow-[var(--dashboard-card-shadow-hover)]"
      variants={{ ...listItem, ...softScale }}
      initial="hidden"
      animate="show"
      whileHover="hover"
      whileTap={{ scale: 0.995 }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-[170px] text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--dashboard-muted)]">
          {metric.label}
        </p>
        <div className={`flex items-center gap-1 rounded-full bg-[var(--dashboard-surface-raised)] px-2 py-1 text-xs font-bold ${trendTone}`}>
          <TrendIcon className="h-4 w-4" aria-hidden="true" />
          {metric.change}
        </div>
      </div>
      <p className="mt-3 text-[28px] font-semibold leading-none tracking-normal text-[var(--dashboard-text)]">
        {metric.value}
      </p>
      {metric.helper ? <p className="mt-2 text-sm text-[var(--dashboard-muted)]">{metric.helper}</p> : null}
    </motion.article>
  )
}

export const StatCard = memo(StatCardComponent)
