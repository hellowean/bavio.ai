import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { getCallById, getCalls, getCallStats } from '@/api/calls'
import { CallDetailDrawer } from '@/components/calls/CallDetailDrawer'
import { CallsFilters } from '@/components/calls/CallsFilters'
import { CallsTable } from '@/components/calls/CallsTable'
import { StatCard } from '@/components/dashboard/StatCard'
import { MotionPage } from '@/components/layout/MotionPage'
import { TablePageSkeleton } from '@/components/layout/PageSkeleton'
import type { CallLogEntry } from '@/types'

function CallsPage() {
  const { data, isPending } = useQuery({
    queryKey: ['calls'],
    queryFn: async () => {
      const [calls, metrics] = await Promise.all([getCalls(), getCallStats()])

      return { calls, metrics }
    },
  })
  const [selectedCall, setSelectedCall] = useState<CallLogEntry | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerLoading, setDrawerLoading] = useState(false)

  const handleViewCall = useCallback(async (call: CallLogEntry) => {
    setDrawerOpen(true)
    setDrawerLoading(true)

    const selectedCallDetail = await getCallById(call.id)

    setSelectedCall(selectedCallDetail)
    setDrawerLoading(false)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  if (isPending || !data) {
    return (
      <TablePageSkeleton
        description="Review AI-handled calls, transcripts, recordings, and outcomes."
        title="Calls"
      />
    )
  }

  return (
    <>
      <MotionPage className="px-8 py-9">
        <header>
          <h1 className="text-[28px] font-semibold leading-tight tracking-normal text-[var(--dashboard-text)]">Calls</h1>
          <p className="mt-2 max-w-3xl text-base text-[var(--dashboard-muted)]">
            Review AI-handled calls, transcripts, recordings, and outcomes.
          </p>
        </header>

        <section className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.metrics.map((metric) => (
            <StatCard key={metric.label} metric={metric} />
          ))}
        </section>

        <div className="mt-10">
          <CallsFilters />
        </div>

        <div className="mt-6">
          <CallsTable calls={data.calls} onViewCall={handleViewCall} />
        </div>
      </MotionPage>

      <CallDetailDrawer call={selectedCall} loading={drawerLoading} open={drawerOpen} onClose={handleCloseDrawer} />
    </>
  )
}

export default CallsPage
