import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'

import { getLeadById, getLeadPipeline, getLeads, getLeadStats } from '@/api/leads'
import { LeadDetailDrawer } from '@/components/leads/LeadDetailDrawer'
import { LeadPipelinePreview } from '@/components/leads/LeadPipelinePreview'
import { LeadsFilters } from '@/components/leads/LeadsFilters'
import { LeadsTable } from '@/components/leads/LeadsTable'
import { StatCard } from '@/components/dashboard/StatCard'
import { MotionPage } from '@/components/layout/MotionPage'
import { TablePageSkeleton } from '@/components/layout/PageSkeleton'
import { useToastStore } from '@/store/toastStore'
import type { LeadEntry } from '@/types'
import { exportLeadsReportPdf } from '@/utils/exportPdf'

function LeadsPage() {
  const addToast = useToastStore((state) => state.addToast)
  const { data, isPending } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const [leads, metrics, pipeline] = await Promise.all([getLeads(), getLeadStats(), getLeadPipeline()])

      return { leads, metrics, pipeline }
    },
  })
  const [selectedLead, setSelectedLead] = useState<LeadEntry | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerLoading, setDrawerLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [agentFilter, setAgentFilter] = useState('all')
  const [scoreFilter, setScoreFilter] = useState('all')
  const hasActiveLeadFilters =
    searchQuery.trim().length > 0 ||
    statusFilter !== 'all' ||
    agentFilter !== 'all' ||
    scoreFilter !== 'all'
  const appliedLeadFilters = useMemo(() => {
    const filters: string[] = []

    if (searchQuery.trim()) {
      filters.push(`Search: ${searchQuery.trim()}`)
    }

    if (statusFilter !== 'all') {
      filters.push(`Status: ${statusFilter}`)
    }

    if (agentFilter !== 'all') {
      filters.push(`Source agent: ${agentFilter}`)
    }

    if (scoreFilter !== 'all') {
      const scoreLabels: Record<string, string> = {
        high: '8-10 High',
        low: '1-4 Low',
        medium: '5-7 Medium',
      }

      filters.push(`Score: ${scoreLabels[scoreFilter] ?? scoreFilter}`)
    }

    return filters
  }, [agentFilter, scoreFilter, searchQuery, statusFilter])

  const filteredLeads = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return (data?.leads ?? []).filter((lead) => {
      const searchableText = [lead.name, lead.phone, lead.email, lead.intent, lead.status, lead.sourceAgent]
        .join(' ')
        .toLowerCase()
      const matchesScore =
        scoreFilter === 'all' ||
        (scoreFilter === 'high' && lead.score >= 8) ||
        (scoreFilter === 'medium' && lead.score >= 5 && lead.score <= 7) ||
        (scoreFilter === 'low' && lead.score <= 4)

      return (
        (!query || searchableText.includes(query)) &&
        (statusFilter === 'all' || lead.status === statusFilter) &&
        (agentFilter === 'all' || lead.sourceAgent === agentFilter) &&
        matchesScore
      )
    })
  }, [agentFilter, data, scoreFilter, searchQuery, statusFilter])

  const handleViewLead = useCallback(async (lead: LeadEntry) => {
    setDrawerOpen(true)
    setDrawerLoading(true)

    const selectedLeadDetail = await getLeadById(lead.id)

    setSelectedLead(selectedLeadDetail)
    setDrawerLoading(false)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  const handleExportPdf = useCallback(() => {
    if (filteredLeads.length === 0) {
      addToast({
        title: 'No data available to export.',
        tone: 'warning',
      })

      return
    }

    try {
      exportLeadsReportPdf(filteredLeads, { appliedFilters: appliedLeadFilters })
      addToast({
        title: 'Leads PDF exported',
        description: 'Saved as bavio-leads-report.pdf.',
        tone: 'success',
      })
    } catch (error) {
      addToast({
        title: 'Unable to export PDF',
        description: error instanceof Error ? error.message : 'Please try again.',
        tone: 'error',
      })
    }
  }, [addToast, appliedLeadFilters, filteredLeads])

  if (isPending || !data) {
    return (
      <TablePageSkeleton
        description="Manage caller information, intent, lead score, and follow-ups captured by AI agents."
        hasPipeline
        title="Leads"
      />
    )
  }

  return (
    <>
      <MotionPage className="px-8 py-9">
        <header>
          <h1 className="text-[28px] font-semibold leading-tight tracking-normal text-[var(--dashboard-text)]">Leads</h1>
          <p className="mt-2 max-w-3xl text-base text-[var(--dashboard-muted)]">
            Manage caller information, intent, lead score, and follow-ups captured by AI agents.
          </p>
        </header>

        <section className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.metrics.map((metric) => (
            <StatCard key={metric.label} metric={metric} />
          ))}
        </section>

        <div className="mt-10">
          <LeadsFilters
            agentFilter={agentFilter}
            scoreFilter={scoreFilter}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onAgentFilterChange={setAgentFilter}
            onExportPdf={handleExportPdf}
            onScoreFilterChange={setScoreFilter}
            onSearchQueryChange={setSearchQuery}
            onStatusFilterChange={setStatusFilter}
          />
        </div>

        <div className="mt-6">
          <LeadsTable leads={filteredLeads} isFiltered={hasActiveLeadFilters} onViewLead={handleViewLead} />
        </div>

        <div className="mt-10">
          <LeadPipelinePreview items={data.pipeline} />
        </div>
      </MotionPage>

      <LeadDetailDrawer lead={selectedLead} loading={drawerLoading} open={drawerOpen} onClose={handleCloseDrawer} />
    </>
  )
}

export default LeadsPage
