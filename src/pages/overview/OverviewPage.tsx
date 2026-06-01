import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import {
  getAgentHealth,
  getCallVolumeData,
  getLiveActivity,
  getOverviewStats,
  getRecentCalls,
} from '@/api/overview'
import { AgentHealth } from '@/components/dashboard/AgentHealth'
import { ChartCard } from '@/components/dashboard/ChartCard'
import { LiveActivity } from '@/components/dashboard/LiveActivity'
import { RecentCalls } from '@/components/dashboard/RecentCalls'
import { StatCard } from '@/components/dashboard/StatCard'
import { TodayAiSummary } from '@/components/dashboard/TodayAiSummary'
import { MotionPage } from '@/components/layout/MotionPage'
import { OverviewPageSkeleton } from '@/components/layout/PageSkeleton'

function OverviewPage() {
  const { data, isPending } = useQuery({
    queryKey: ['overview'],
    queryFn: async () => {
      const [stats, recentCalls, liveActivity, agentHealth, callVolume] = await Promise.all([
        getOverviewStats(),
        getRecentCalls(),
        getLiveActivity(),
        getAgentHealth(),
        getCallVolumeData(),
      ])

      return { stats, recentCalls, liveActivity, agentHealth, callVolume }
    },
  })
  const dashboardDate = format(new Date(2026, 4, 30), 'EEEE, MMMM d, yyyy')

  if (isPending || !data) {
    return <OverviewPageSkeleton />
  }

  return (
    <MotionPage className="px-8 py-9">
      <header>
        <h1 className="text-[28px] font-semibold leading-tight tracking-normal text-[var(--dashboard-text)]">
          Overview
        </h1>
        <p className="mt-2 text-base text-[var(--dashboard-muted)]">{dashboardDate}</p>
      </header>

      <section className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.stats.metrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </section>

      <div className="mt-10">
        <TodayAiSummary items={data.stats.todaysAiSummary} />
      </div>

      <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]">
        <ChartCard data={data.callVolume} />
        <AgentHealth agents={data.agentHealth} />
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]">
        <RecentCalls calls={data.recentCalls} />
        <LiveActivity activities={data.liveActivity} />
      </section>
    </MotionPage>
  )
}

export default OverviewPage
