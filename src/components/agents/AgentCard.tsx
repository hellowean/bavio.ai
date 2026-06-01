import { motion } from 'framer-motion'
import { Bot, Pause, Pencil, PhoneCall, Play, Radio } from 'lucide-react'
import { memo } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { listItem, softScale } from '@/lib/motion'
import type { AgentStatus, VoiceAgent } from '@/types'

type AgentCardProps = {
  agent: VoiceAgent
  onEdit: (agent: VoiceAgent) => void
  onOpen: (agent: VoiceAgent) => void
  onToggleStatus: (agent: VoiceAgent) => void
}

const statusTone: Record<AgentStatus, 'success' | 'warning' | 'error' | 'accent' | 'muted'> = {
  Live: 'success',
  Draft: 'accent',
  Paused: 'muted',
  Error: 'error',
}

function AgentCardComponent({ agent, onEdit, onOpen, onToggleStatus }: AgentCardProps) {
  const isPaused = agent.status === 'Paused'

  return (
    <motion.article
      className="cursor-pointer rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-5 shadow-[var(--dashboard-card-shadow)] transition-colors hover:border-[color:var(--dashboard-accent)]/28 hover:bg-[var(--dashboard-surface)] hover:shadow-[var(--dashboard-card-shadow-hover)]"
      role="button"
      tabIndex={0}
      variants={{ ...listItem, ...softScale }}
      initial="hidden"
      animate="show"
      whileHover="hover"
      whileTap={{ scale: 0.995 }}
      onClick={() => onOpen(agent)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(agent)
        }
      }}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[color:var(--dashboard-accent)]/12 text-[var(--dashboard-accent)]">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-[var(--dashboard-text)]">{agent.name}</h2>
            <p className="mt-1 truncate text-sm text-[var(--dashboard-muted)]">{agent.displayName}</p>
          </div>
        </div>
        <Badge tone={statusTone[agent.status]}>{agent.status}</Badge>
      </header>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="Assigned phone number" value={agent.assignedNumber} />
        <Metric label="Language" value={agent.language} />
        <Metric label="Calls this week" value={agent.callsThisWeek.toLocaleString()} />
        <Metric label="Resolution rate" value={agent.resolutionRate} />
        <Metric label="Avg duration" value={agent.avgDuration} />
        <Metric label="Uptime" value={agent.uptime} />
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-[var(--dashboard-muted)]">
        <Radio className="h-4 w-4 text-[var(--dashboard-success)]" aria-hidden="true" />
        Last active: {agent.lastActive}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          className="h-9 px-3"
          type="button"
          variant="secondary"
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <PhoneCall className="h-4 w-4" aria-hidden="true" />
          Test Call
        </Button>
        <Button
          className="h-9 px-3"
          type="button"
          variant="ghost"
          onClick={(event) => {
            event.stopPropagation()
            onEdit(agent)
          }}
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit
        </Button>
        <Button
          className="h-9 px-3"
          type="button"
          variant="ghost"
          onClick={(event) => {
            event.stopPropagation()
            onToggleStatus(agent)
          }}
        >
          {isPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
      </div>
    </motion.article>
  )
}

export const AgentCard = memo(AgentCardComponent)

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--dashboard-muted)]">{label}</p>
      <p className="mt-2 truncate text-sm font-semibold text-[var(--dashboard-text)]">{value}</p>
    </div>
  )
}
