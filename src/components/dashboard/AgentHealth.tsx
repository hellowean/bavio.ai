import { motion } from 'framer-motion'
import { memo } from 'react'

import { EmptyState } from '@/components/ui/empty-state'
import { listContainer, listItem } from '@/lib/motion'
import type { AgentHealthItem } from '@/types'

type AgentHealthProps = {
  agents: AgentHealthItem[]
}

function AgentHealthComponent({ agents }: AgentHealthProps) {
  return (
    <motion.section
      className="rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-6 shadow-[var(--dashboard-card-shadow)]"
      variants={listItem}
      initial="hidden"
      animate="show"
    >
      <header>
        <h2 className="text-lg font-semibold tracking-tight text-[var(--dashboard-text)]">Agent Health</h2>
        <p className="mt-1 text-sm text-[var(--dashboard-muted)]">All systems operational</p>
      </header>

      {agents.length > 0 ? (
        <>
          <motion.div className="mt-7 space-y-6" variants={listContainer} initial="hidden" animate="show">
            {agents.map((agent) => (
              <motion.div className="flex gap-3" key={agent.name} variants={listItem}>
                <span
                  className={`mt-2 h-2.5 w-2.5 rounded-full ${
                    agent.status === 'online' ? 'bg-[var(--dashboard-success)]' : 'bg-[var(--dashboard-subtle)]'
                  }`}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-[var(--dashboard-text)]">{agent.name}</p>
                  <p className="mt-1 text-sm text-[var(--dashboard-muted)]">
                    {agent.calls} calls · {agent.uptime} uptime
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-7 flex items-center justify-between border-t border-[var(--dashboard-border)] pt-5">
            <p className="text-sm font-medium text-[var(--dashboard-muted)]">System Status</p>
            <p className="text-sm font-semibold text-[var(--dashboard-success)]">99.6% uptime</p>
          </div>
        </>
      ) : (
        <div className="mt-7">
          <EmptyState
            title="No agent health data"
            description="Agent uptime and call status will appear after your first voice agent goes live."
          />
        </div>
      )}
    </motion.section>
  )
}

export const AgentHealth = memo(AgentHealthComponent)
