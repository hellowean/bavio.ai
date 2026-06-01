import { callsLogData, callsMetrics } from '@/api/mockData'
import { cloneMockData, simulateApiDelay, type CallsFilters } from '@/api/types'
import type { CallLogEntry, DashboardMetric } from '@/types'

export async function getCalls(filters: CallsFilters = {}): Promise<CallLogEntry[]> {
  await simulateApiDelay()

  const query = filters.query?.trim().toLowerCase()
  const calls = callsLogData.filter((call) => {
    const matchesQuery =
      !query ||
      [call.callerName, call.callerNumber, call.agent, call.summary]
        .join(' ')
        .toLowerCase()
        .includes(query)

    return (
      matchesQuery &&
      (!filters.agent || call.agent === filters.agent) &&
      (!filters.resolution || call.resolution === filters.resolution) &&
      (!filters.sentiment || call.sentiment === filters.sentiment)
    )
  })

  return cloneMockData(calls)
}

export async function getCallById(id: string): Promise<CallLogEntry | null> {
  await simulateApiDelay()

  const call = callsLogData.find((entry) => entry.id === id)

  return call ? cloneMockData(call) : null
}

export async function getCallStats(): Promise<DashboardMetric[]> {
  await simulateApiDelay()

  return cloneMockData(callsMetrics)
}
