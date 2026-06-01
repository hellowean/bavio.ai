import { leadPipelineData, leadsData, leadsMetrics } from '@/api/mockData'
import { cloneMockData, simulateApiDelay, type LeadPipelineItem, type LeadsFilters } from '@/api/types'
import type { DashboardMetric, LeadEntry } from '@/types'

export async function getLeads(filters: LeadsFilters = {}): Promise<LeadEntry[]> {
  await simulateApiDelay()

  const query = filters.query?.trim().toLowerCase()
  const leads = leadsData.filter((lead) => {
    const matchesQuery =
      !query ||
      [lead.name, lead.phone, lead.intent, lead.summary]
        .join(' ')
        .toLowerCase()
        .includes(query)
    const matchesScore =
      !filters.score ||
      (filters.score === 'high' && lead.score >= 8) ||
      (filters.score === 'medium' && lead.score >= 5 && lead.score <= 7) ||
      (filters.score === 'low' && lead.score <= 4)

    return (
      matchesQuery &&
      matchesScore &&
      (!filters.agent || lead.sourceAgent === filters.agent) &&
      (!filters.status || lead.status === filters.status)
    )
  })

  return cloneMockData(leads)
}

export async function getLeadById(id: string): Promise<LeadEntry | null> {
  await simulateApiDelay()

  const lead = leadsData.find((entry) => entry.id === id)

  return lead ? cloneMockData(lead) : null
}

export async function getLeadStats(): Promise<DashboardMetric[]> {
  await simulateApiDelay()

  return cloneMockData(leadsMetrics)
}

export async function getLeadPipeline(): Promise<LeadPipelineItem[]> {
  await simulateApiDelay()

  return cloneMockData([...leadPipelineData])
}
