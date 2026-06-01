import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Bot, Plus } from 'lucide-react'
import { useCallback, useState } from 'react'

import { createAgent, getAgentById, getAgents, getAgentStats, updateAgent } from '@/api/agents'
import type { AgentsPageData } from '@/api/types'
import { AgentCard } from '@/components/agents/AgentCard'
import { AgentDetailDrawer } from '@/components/agents/AgentDetailDrawer'
import { CreateAgentModal } from '@/components/agents/CreateAgentModal'
import { StatCard } from '@/components/dashboard/StatCard'
import { MotionPage } from '@/components/layout/MotionPage'
import { AgentsPageSkeleton } from '@/components/layout/PageSkeleton'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import type { VoiceAgent } from '@/types'

function AgentsPage() {
  const queryClient = useQueryClient()
  const { data, isPending } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const [agents, metrics] = await Promise.all([getAgents(), getAgentStats()])

      return { agents, metrics }
    },
  })
  const [selectedAgent, setSelectedAgent] = useState<VoiceAgent | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerLoading, setDrawerLoading] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const agents = data?.agents ?? []

  const handleOpenAgent = useCallback(async (agent: VoiceAgent) => {
    setDrawerOpen(true)
    setDrawerLoading(true)

    const selectedAgentDetail = await getAgentById(agent.id)

    setSelectedAgent(selectedAgentDetail)
    setDrawerLoading(false)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  const handleCreateAgent = useCallback(async (agent: VoiceAgent) => {
    const createdAgent = await createAgent(agent)

    queryClient.setQueryData<AgentsPageData>(['agents'], (currentData) =>
      currentData ? { ...currentData, agents: [createdAgent, ...currentData.agents] } : currentData,
    )
  }, [queryClient])

  const handleToggleStatus = useCallback(async (agent: VoiceAgent) => {
    const updatedAgent = await updateAgent(agent.id, {
      status: agent.status === 'Paused' ? 'Live' : 'Paused',
      lastActive: agent.status === 'Paused' ? 'Resumed just now' : 'Paused just now',
    })

    if (updatedAgent) {
      queryClient.setQueryData<AgentsPageData>(['agents'], (currentData) =>
        currentData
          ? {
              ...currentData,
              agents: currentData.agents.map((currentAgent) =>
                currentAgent.id === updatedAgent.id ? updatedAgent : currentAgent,
              ),
            }
          : currentData,
      )
    }
  }, [queryClient])

  if (isPending || !data) {
    return <AgentsPageSkeleton />
  }

  return (
    <>
      <MotionPage className="px-8 py-9">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[28px] font-semibold leading-tight tracking-normal text-[var(--dashboard-text)]">
              Agents
            </h1>
            <p className="mt-2 max-w-3xl text-base text-[var(--dashboard-muted)]">
              Create, configure, test, and monitor your AI voice agents.
            </p>
          </div>
          <Button className="h-11 px-5 text-base" type="button" onClick={() => setCreateModalOpen(true)}>
            <Plus className="h-5 w-5" aria-hidden="true" />
            + Create Agent
          </Button>
        </header>

        <section className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.metrics.map((metric) => (
            <StatCard key={metric.label} metric={metric} />
          ))}
        </section>

        {agents.length > 0 ? (
          <section className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            {agents.map((agent) => (
              <AgentCard
                agent={agent}
                key={agent.id}
                onEdit={handleOpenAgent}
                onOpen={handleOpenAgent}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </section>
        ) : (
          <section className="mt-10 rounded-md border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-6">
            <EmptyState
              action={
                <Button type="button" onClick={() => setCreateModalOpen(true)}>
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  + Create Agent
                </Button>
              }
              description="Launch an AI receptionist, sales assistant, or support agent in minutes."
              icon={<Bot className="h-5 w-5" aria-hidden="true" />}
              title="Create your first AI voice agent"
            />
          </section>
        )}
      </MotionPage>

      <CreateAgentModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateAgent}
      />
      <AgentDetailDrawer agent={selectedAgent} loading={drawerLoading} open={drawerOpen} onClose={handleCloseDrawer} />
    </>
  )
}

export default AgentsPage
