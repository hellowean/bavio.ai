import { agentsMetrics, voiceAgentsData } from '@/api/mockData'
import { cloneMockData, simulateApiDelay } from '@/api/types'
import type { DashboardMetric, VoiceAgent } from '@/types'

let agents = cloneMockData(voiceAgentsData)

export async function getAgents(): Promise<VoiceAgent[]> {
  await simulateApiDelay()

  return cloneMockData(agents)
}

export async function getAgentById(id: string): Promise<VoiceAgent | null> {
  await simulateApiDelay()

  const agent = agents.find((entry) => entry.id === id)

  return agent ? cloneMockData(agent) : null
}

export async function createAgent(data: VoiceAgent): Promise<VoiceAgent> {
  await simulateApiDelay(120)

  const idExists = agents.some((agent) => agent.id === data.id)
  const agent = {
    ...cloneMockData(data),
    id: idExists ? `${data.id}-${agents.length + 1}` : data.id,
  }

  agents = [agent, ...agents]

  return cloneMockData(agent)
}

export async function updateAgent(id: string, data: Partial<VoiceAgent>): Promise<VoiceAgent | null> {
  await simulateApiDelay(80)

  const agentIndex = agents.findIndex((agent) => agent.id === id)

  if (agentIndex === -1) {
    return null
  }

  const agent = {
    ...agents[agentIndex],
    ...cloneMockData(data),
    id,
  }

  agents = agents.map((currentAgent, index) => (index === agentIndex ? agent : currentAgent))

  return cloneMockData(agent)
}

export async function getAgentStats(): Promise<DashboardMetric[]> {
  await simulateApiDelay()

  return cloneMockData(agentsMetrics)
}
