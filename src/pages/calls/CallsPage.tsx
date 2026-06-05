import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'

import { getCallById, getCalls, getCallStats } from '@/api/calls'
import { CallDetailDrawer } from '@/components/calls/CallDetailDrawer'
import { CallsFilters } from '@/components/calls/CallsFilters'
import { CallsTable } from '@/components/calls/CallsTable'
import { StatCard } from '@/components/dashboard/StatCard'
import { MotionPage } from '@/components/layout/MotionPage'
import { TablePageSkeleton } from '@/components/layout/PageSkeleton'
import { useToastStore } from '@/store/toastStore'
import type { CallLogEntry } from '@/types'
import { exportCallsReportPdf } from '@/utils/exportPdf'

function getCallTimestamp(call: CallLogEntry) {
  return new Date(call.dateTime.replace(' · ', ' ')).getTime()
}

function CallsPage() {
  const addToast = useToastStore((state) => state.addToast)
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
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRangeFilter, setDateRangeFilter] = useState('all')
  const [agentFilter, setAgentFilter] = useState('all')
  const [resolutionFilter, setResolutionFilter] = useState('all')
  const [sentimentFilter, setSentimentFilter] = useState('all')
  const hasActiveCallFilters =
    searchQuery.trim().length > 0 ||
    dateRangeFilter !== 'all' ||
    agentFilter !== 'all' ||
    resolutionFilter !== 'all' ||
    sentimentFilter !== 'all'
  const appliedCallFilters = useMemo(() => {
    const filters: string[] = []

    if (searchQuery.trim()) {
      filters.push(`Search: ${searchQuery.trim()}`)
    }

    if (dateRangeFilter !== 'all') {
      const dateRangeLabels: Record<string, string> = {
        '7-days': 'Last 7 days',
        '30-days': 'Last 30 days',
        today: 'Today',
      }

      filters.push(`Date range: ${dateRangeLabels[dateRangeFilter] ?? dateRangeFilter}`)
    }

    if (agentFilter !== 'all') {
      filters.push(`Agent: ${agentFilter}`)
    }

    if (resolutionFilter !== 'all') {
      filters.push(`Resolution: ${resolutionFilter}`)
    }

    if (sentimentFilter !== 'all') {
      filters.push(`Sentiment: ${sentimentFilter}`)
    }

    return filters
  }, [agentFilter, dateRangeFilter, resolutionFilter, searchQuery, sentimentFilter])

  const filteredCalls = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const calls = data?.calls ?? []
    const latestCallTimestamp = calls.reduce((latest, call) => Math.max(latest, getCallTimestamp(call)), 0)
    const latestCallDate = latestCallTimestamp ? new Date(latestCallTimestamp) : null

    return calls.filter((call) => {
      const searchableText = [
        call.callerName,
        call.callerNumber,
        call.agent,
        call.resolution,
        call.sentiment,
        call.summary,
        ...call.transcript.map((message) => message.message),
      ]
        .join(' ')
        .toLowerCase()
      const callTimestamp = getCallTimestamp(call)
      const matchesDateRange =
        dateRangeFilter === 'all' ||
        !latestCallDate ||
        (dateRangeFilter === 'today' &&
          new Date(callTimestamp).toDateString() === latestCallDate.toDateString()) ||
        (dateRangeFilter === '7-days' && latestCallTimestamp - callTimestamp <= 7 * 24 * 60 * 60 * 1000) ||
        (dateRangeFilter === '30-days' && latestCallTimestamp - callTimestamp <= 30 * 24 * 60 * 60 * 1000)

      return (
        (!query || searchableText.includes(query)) &&
        matchesDateRange &&
        (agentFilter === 'all' || call.agent === agentFilter) &&
        (resolutionFilter === 'all' || call.resolution === resolutionFilter) &&
        (sentimentFilter === 'all' || call.sentiment === sentimentFilter)
      )
    })
  }, [agentFilter, data, dateRangeFilter, resolutionFilter, searchQuery, sentimentFilter])

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

  const handleExportPdf = useCallback(() => {
    if (filteredCalls.length === 0) {
      addToast({
        title: 'No data available to export.',
        tone: 'warning',
      })

      return
    }

    try {
      exportCallsReportPdf(filteredCalls, { appliedFilters: appliedCallFilters })
      addToast({
        title: 'Calls PDF exported',
        description: 'Saved as bavio-calls-report.pdf.',
        tone: 'success',
      })
    } catch (error) {
      addToast({
        title: 'Unable to export PDF',
        description: error instanceof Error ? error.message : 'Please try again.',
        tone: 'error',
      })
    }
  }, [addToast, appliedCallFilters, filteredCalls])

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
          <CallsFilters
            agentFilter={agentFilter}
            dateRangeFilter={dateRangeFilter}
            resolutionFilter={resolutionFilter}
            searchQuery={searchQuery}
            sentimentFilter={sentimentFilter}
            onAgentFilterChange={setAgentFilter}
            onDateRangeFilterChange={setDateRangeFilter}
            onExportPdf={handleExportPdf}
            onResolutionFilterChange={setResolutionFilter}
            onSearchQueryChange={setSearchQuery}
            onSentimentFilterChange={setSentimentFilter}
          />
        </div>

        <div className="mt-6">
          <CallsTable calls={filteredCalls} isFiltered={hasActiveCallFilters} onViewCall={handleViewCall} />
        </div>
      </MotionPage>

      <CallDetailDrawer call={selectedCall} loading={drawerLoading} open={drawerOpen} onClose={handleCloseDrawer} />
    </>
  )
}

export default CallsPage
