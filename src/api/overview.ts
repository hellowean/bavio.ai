import { cloneMockData, simulateApiDelay, type OverviewStats } from '@/api/types'
import {
  agentHealthData,
  callVolumeData,
  liveActivityData,
  overviewMetrics,
  recentCallsData,
  todaysAiSummary,
} from '@/api/mockData'
import type { AgentHealthItem, CallVolumePoint, LiveActivityItem, RecentCall } from '@/types'

export async function getOverviewStats(): Promise<OverviewStats> {
  await simulateApiDelay()

  return cloneMockData({
    metrics: overviewMetrics,
    todaysAiSummary: [...todaysAiSummary],
  })
}

export async function getRecentCalls(): Promise<RecentCall[]> {
  await simulateApiDelay()

  return cloneMockData(recentCallsData)
}

export async function getLiveActivity(): Promise<LiveActivityItem[]> {
  await simulateApiDelay()

  return cloneMockData(liveActivityData)
}

export async function getAgentHealth(): Promise<AgentHealthItem[]> {
  await simulateApiDelay()

  return cloneMockData(agentHealthData)
}

export async function getCallVolumeData(): Promise<CallVolumePoint[]> {
  await simulateApiDelay()

  return cloneMockData(callVolumeData)
}
