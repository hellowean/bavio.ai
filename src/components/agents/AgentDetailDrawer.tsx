import { AnimatePresence, motion } from 'framer-motion'
import { PhoneCall, Settings2, X } from 'lucide-react'
import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { DetailDrawerSkeleton } from '@/components/layout/PageSkeleton'
import type { AgentStatus, VoiceAgent } from '@/types'

type AgentDetailDrawerProps = {
  agent: VoiceAgent | null
  loading?: boolean
  open: boolean
  onClose: () => void
}

const statusTone: Record<AgentStatus, 'success' | 'warning' | 'error' | 'accent' | 'muted'> = {
  Live: 'success',
  Draft: 'accent',
  Paused: 'muted',
  Error: 'error',
}

export function AgentDetailDrawer({ agent, loading = false, open, onClose }: AgentDetailDrawerProps) {
  if (loading && open) {
    return <DetailDrawerSkeleton ariaLabel="Agent details" maxWidth="max-w-[540px]" onClose={onClose} />
  }

  return (
    <AnimatePresence>
      {agent && open ? (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            aria-label="Close agent detail drawer"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            aria-label="Agent details"
            className="absolute bottom-0 right-0 top-0 flex w-full max-w-[540px] flex-col border-l border-[var(--dashboard-border)] bg-[color:var(--dashboard-surface)]/98 shadow-[var(--dashboard-card-shadow-hover)] backdrop-blur-xl"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 28 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
        <header className="flex items-start justify-between gap-4 border-b border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-[var(--dashboard-text)]">{agent.name}</h2>
              <Badge tone={statusTone[agent.status]}>{agent.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-[var(--dashboard-muted)]">{agent.displayName}</p>
          </div>
          <Button
            aria-label="Close drawer"
            className="text-[var(--dashboard-muted)] hover:text-[var(--dashboard-text)]"
            size="icon"
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <section className="grid grid-cols-2 gap-3">
            <DetailItem label="Calls this week" value={agent.callsThisWeek.toLocaleString()} />
            <DetailItem label="Resolution" value={agent.resolutionRate} />
            <DetailItem label="Avg duration" value={agent.avgDuration} />
            <DetailItem label="Uptime" value={agent.uptime} />
            <DetailItem label="Last active" value={agent.lastActive} />
            <DetailItem label="Assigned number" value={agent.assignedNumber} />
          </section>

          <DrawerSection title="Prompt Preview">
            <p className="text-sm leading-6 text-[var(--dashboard-muted)]">{agent.promptPreview}</p>
          </DrawerSection>

          <DrawerSection title="Voice Settings">
            <div className="grid grid-cols-1 gap-3">
              <DetailItem label="Voice" value={agent.voiceSettings.voice} />
              <DetailItem label="Speaking pace" value={agent.voiceSettings.pace} />
              <DetailItem label="Language" value={agent.voiceSettings.language} />
            </div>
          </DrawerSection>

          <DrawerSection title="Assigned Number">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] p-3">
              <div>
                <p className="text-sm font-semibold text-[var(--dashboard-text)]">{agent.assignedNumber}</p>
                <p className="mt-1 text-xs text-[var(--dashboard-muted)]">Inbound and outbound voice routing</p>
              </div>
              <PhoneCall className="h-5 w-5 text-[var(--dashboard-accent)]" aria-hidden="true" />
            </div>
          </DrawerSection>

          <DrawerSection title="Recent Calls">
            {agent.recentCalls.length > 0 ? (
              <div className="space-y-3">
                {agent.recentCalls.map((call) => (
                  <article className="rounded-md bg-[var(--dashboard-surface-raised)] p-3" key={call.id}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[var(--dashboard-text)]">{call.caller}</p>
                      <p className="text-xs text-[var(--dashboard-muted)]">{call.time}</p>
                    </div>
                    <p className="mt-1 text-sm text-[var(--dashboard-muted)]">
                      {call.outcome} · {call.duration}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                className="min-h-[160px]"
                title="No recent calls"
                description="Recent calls for this agent will appear after it starts handling conversations."
              />
            )}
          </DrawerSection>

          <DrawerSection title="Activity Log">
            {agent.activityLog.length > 0 ? (
              <div className="space-y-4">
                {agent.activityLog.map((item) => (
                  <article className="relative pl-6" key={item.id}>
                    <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--dashboard-accent)]" />
                    <p className="text-sm font-semibold text-[var(--dashboard-text)]">{item.title}</p>
                    <p className="mt-1 text-sm text-[var(--dashboard-muted)]">{item.detail}</p>
                    <p className="mt-1 text-xs text-[var(--dashboard-muted)]">{item.time}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                className="min-h-[160px]"
                title="No activity yet"
                description="Configuration changes, tests, and runtime events will appear here."
              />
            )}
          </DrawerSection>

          <section className="mt-5 grid grid-cols-1 gap-3">
            <Button className="justify-start" type="button">
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              Test Call
            </Button>
            <Button className="justify-start" type="button" variant="secondary">
              <Settings2 className="h-4 w-4" aria-hidden="true" />
              Configure Agent
            </Button>
          </section>
        </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function DrawerSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="mt-5 rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-[var(--dashboard-text)]">{title}</h3>
      {children}
    </section>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] p-3">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dashboard-muted)]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[var(--dashboard-text)]">{value}</p>
    </div>
  )
}
