import { motion } from 'framer-motion'
import { memo, useEffect, useRef, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from 'recharts'

import { EmptyState } from '@/components/ui/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { listItem } from '@/lib/motion'
import type { CallVolumePoint } from '@/types'

type ChartCardProps = {
  data: CallVolumePoint[]
}

function ChartTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] px-3 py-2 shadow-[var(--dashboard-card-shadow)]">
      <p className="text-xs font-medium text-[var(--dashboard-muted)]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[var(--dashboard-text)]">{payload[0].value} calls</p>
    </div>
  )
}

function ChartCardComponent({ data }: ChartCardProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState(0)

  useEffect(() => {
    const container = chartContainerRef.current

    if (!container) {
      return undefined
    }

    const updateWidth = () => {
      setChartWidth(Math.max(0, Math.floor(container.getBoundingClientRect().width)))
    }

    updateWidth()

    const observer = new ResizeObserver(([entry]) => {
      setChartWidth(Math.max(0, Math.floor(entry.contentRect.width)))
    })

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      className="min-w-0 rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-6 shadow-[var(--dashboard-card-shadow)]"
      variants={listItem}
      initial="hidden"
      animate="show"
    >
      <header>
        <h2 className="text-lg font-semibold tracking-tight text-[var(--dashboard-text)]">Call Volume</h2>
        <p className="mt-1 text-sm text-[var(--dashboard-muted)]">Hourly breakdown for today</p>
      </header>

      <div className="mt-7 h-[330px] min-w-0" ref={chartContainerRef}>
        {data.length === 0 ? (
          <EmptyState
            className="h-full min-h-0"
            title="No call volume yet"
            description="Hourly call volume will populate once Bavio agents begin handling calls today."
          />
        ) : chartWidth > 0 ? (
          <AreaChart data={data} height={330} margin={{ top: 8, right: 10, bottom: 0, left: 0 }} width={chartWidth}>
            <defs>
              <linearGradient id="callVolumeFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="var(--dashboard-accent)" stopOpacity={0.12} />
                <stop offset="95%" stopColor="var(--dashboard-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--dashboard-border)" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="time"
              dy={12}
              tick={{ fill: 'var(--dashboard-muted)', fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              domain={[0, 340]}
              ticks={[0, 80, 160, 240, 320]}
              tick={{ fill: 'var(--dashboard-muted)', fontSize: 12 }}
              tickLine={false}
              width={48}
            />
            <Tooltip content={ChartTooltip} cursor={{ stroke: 'var(--dashboard-accent)', strokeOpacity: 0.16 }} />
            <Area
              dataKey="calls"
              fill="url(#callVolumeFill)"
              stroke="var(--dashboard-accent)"
              strokeWidth={2.25}
              type="monotone"
            />
          </AreaChart>
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </div>
    </motion.section>
  )
}

export const ChartCard = memo(ChartCardComponent)
