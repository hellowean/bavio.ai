import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { getLeadById, getLeadPipeline, getLeads, getLeadStats } from '@/api/leads'
import { LeadDetailDrawer } from '@/components/leads/LeadDetailDrawer'
import { LeadPipelinePreview } from '@/components/leads/LeadPipelinePreview'
import { LeadsFilters } from '@/components/leads/LeadsFilters'
import { LeadsTable } from '@/components/leads/LeadsTable'
import { StatCard } from '@/components/dashboard/StatCard'
import { MotionPage } from '@/components/layout/MotionPage'
import { TablePageSkeleton } from '@/components/layout/PageSkeleton'
import type { LeadEntry } from '@/types'

function LeadsPage() {
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
          <LeadsFilters />
        </div>

        <div className="mt-6">
          <LeadsTable leads={data.leads} onViewLead={handleViewLead} />
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
