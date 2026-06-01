import { AnimatePresence, motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { DetailDrawerSkeleton } from '@/components/layout/PageSkeleton'
import type { CallLogEntry, CallResolution, CallSentiment, WorkflowTraceStep } from '@/types'

type CallDetailDrawerProps = {
  call: CallLogEntry | null
  loading?: boolean
  open: boolean
  onClose: () => void
}

const resolutionTone: Record<CallResolution, 'success' | 'warning' | 'error' | 'muted'> = {
  Resolved: 'success',
  Escalated: 'warning',
  Missed: 'error',
  Voicemail: 'muted',
}

const sentimentTone: Record<CallSentiment, 'success' | 'muted' | 'error'> = {
  Positive: 'success',
  Neutral: 'muted',
  Negative: 'error',
}

const workflowTone: Record<WorkflowTraceStep['status'], string> = {
  completed: 'bg-[var(--dashboard-success)]',
  skipped: 'bg-[var(--dashboard-subtle)]',
  pending: 'bg-[var(--dashboard-warning)]',
}

export function CallDetailDrawer({ call, loading = false, open, onClose }: CallDetailDrawerProps) {
  if (loading && open) {
    return <DetailDrawerSkeleton ariaLabel="Call details" onClose={onClose} />
  }

  return (
    <AnimatePresence>
      {call && open ? (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            aria-label="Close call detail drawer"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            aria-label="Call details"
            className="absolute bottom-0 right-0 top-0 flex w-full max-w-[520px] flex-col border-l border-[var(--dashboard-border)] bg-[color:var(--dashboard-surface)]/98 shadow-[var(--dashboard-card-shadow-hover)] backdrop-blur-xl"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 28 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
        <header className="flex items-start justify-between gap-4 border-b border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] px-6 py-5">
          <div>
            <p className="text-sm font-medium text-[var(--dashboard-muted)]">Call details</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--dashboard-text)]">{call.callerNumber}</h2>
            <p className="mt-1 text-sm text-[var(--dashboard-muted)]">{call.callerName}</p>
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
            <DetailItem label="Agent" value={call.agent} />
            <DetailItem label="Date/time" value={call.dateTime} />
            <DetailItem label="Duration" value={call.duration} />
            <div className="rounded-md bg-[var(--dashboard-surface-raised)] p-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dashboard-muted)]">Resolution</p>
              <div className="mt-2">
                <Badge tone={resolutionTone[call.resolution]}>{call.resolution}</Badge>
              </div>
            </div>
          </section>

          <section className="mt-5 rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[var(--dashboard-text)]">Audio Recording</h3>
                <p className="mt-1 text-xs text-[var(--dashboard-muted)]">Mock playback preview</p>
              </div>
              <Badge tone={sentimentTone[call.sentiment]}>{call.sentiment}</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--dashboard-accent)] text-white">
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              </div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--dashboard-border)]">
                <div className="h-full w-2/3 rounded-full bg-[var(--dashboard-accent)]" />
              </div>
              <p className="text-xs font-medium text-[var(--dashboard-muted)]">{call.duration}</p>
            </div>
          </section>

          <DrawerSection title="AI Call Summary">
            <p className="text-sm leading-6 text-[var(--dashboard-muted)]">{call.summary}</p>
          </DrawerSection>

          <DrawerSection title="Transcript">
            {call.transcript.length > 0 ? (
              <div className="space-y-3">
                {call.transcript.map((message) => (
                  <article className="rounded-md bg-[var(--dashboard-surface-raised)] p-3" key={message.timestamp}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[var(--dashboard-text)]">{message.speaker}</p>
                      <p className="text-xs text-[var(--dashboard-muted)]">{message.timestamp}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--dashboard-muted)]">{message.message}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                className="min-h-[160px]"
                title="No transcript available"
                description="Caller and AI agent messages will appear here once transcription is available."
              />
            )}
          </DrawerSection>

          <DrawerSection title="Extracted Lead Data">
            <div className="grid grid-cols-1 gap-3">
              <DetailItem label="Name" value={call.leadData.name} />
              <DetailItem label="Company" value={call.leadData.company} />
              <DetailItem label="Email" value={call.leadData.email} />
              <DetailItem label="Intent" value={call.leadData.intent} />
              <DetailItem label="Next step" value={call.leadData.nextStep} />
            </div>
          </DrawerSection>

          <DrawerSection title="Workflow Trace">
            {call.workflowTrace.length > 0 ? (
              <div className="space-y-4">
                {call.workflowTrace.map((step) => (
                  <article className="relative pl-6" key={step.label}>
                    <span className={`absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full ${workflowTone[step.status]}`} />
                    <p className="text-sm font-semibold text-[var(--dashboard-text)]">{step.label}</p>
                    <p className="mt-1 text-sm text-[var(--dashboard-muted)]">{step.detail}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                className="min-h-[160px]"
                title="No workflow trace"
                description="Workflow steps will appear after automations run during an AI-handled call."
              />
            )}
          </DrawerSection>
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
