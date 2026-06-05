import { AnimatePresence, motion } from 'framer-motion'
import { CalendarPlus, ClipboardList, FileText, X } from 'lucide-react'
import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { DetailDrawerSkeleton } from '@/components/layout/PageSkeleton'
import type { LeadEntry, LeadStatus } from '@/types'

type LeadDetailDrawerProps = {
  lead: LeadEntry | null
  loading?: boolean
  open: boolean
  onClose: () => void
}

const statusTone: Record<LeadStatus, 'success' | 'warning' | 'error' | 'accent' | 'muted'> = {
  New: 'accent',
  Contacted: 'warning',
  Qualified: 'success',
  'Closed Won': 'success',
  'Closed Lost': 'error',
  Junk: 'muted',
}

function getScoreTone(score: number): 'success' | 'warning' | 'error' {
  if (score >= 8) {
    return 'success'
  }

  if (score >= 5) {
    return 'warning'
  }

  return 'error'
}

const actionTooltip = 'This action will be available in a future release.'
const sourceCallTooltip = 'Source call linking will be available in a future release.'

export function LeadDetailDrawer({ lead, loading = false, open, onClose }: LeadDetailDrawerProps) {
  if (loading && open) {
    return <DetailDrawerSkeleton ariaLabel="Lead details" onClose={onClose} />
  }

  return (
    <AnimatePresence>
      {lead && open ? (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            aria-label="Close lead detail drawer"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            aria-label="Lead details"
            className="absolute bottom-0 right-0 top-0 flex w-full max-w-[520px] flex-col border-l border-[var(--dashboard-border)] bg-[color:var(--dashboard-surface)]/98 shadow-[var(--dashboard-card-shadow-hover)] backdrop-blur-xl"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 28 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
        <header className="flex items-start justify-between gap-4 border-b border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] px-6 py-5">
          <div>
            <p className="text-sm font-medium text-[var(--dashboard-muted)]">Lead details</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--dashboard-text)]">{lead.name}</h2>
            <p className="mt-1 text-sm text-[var(--dashboard-muted)]">{lead.phone}</p>
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
            <DetailItem label="Phone" value={lead.phone} />
            <DetailItem label="Email" value={lead.email} />
            <DetailItem label="Intent" value={lead.intent} />
            <DetailItem label="Source agent" value={lead.sourceAgent} />
            <div className="rounded-md bg-[var(--dashboard-surface-raised)] p-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dashboard-muted)]">Lead score</p>
              <div className="mt-2">
                <Badge tone={getScoreTone(lead.score)}>{lead.score}/10</Badge>
              </div>
            </div>
            <div className="rounded-md bg-[var(--dashboard-surface-raised)] p-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dashboard-muted)]">Status</p>
              <div className="mt-2">
                <Badge tone={statusTone[lead.status]}>{lead.status}</Badge>
              </div>
            </div>
          </section>

          <section className="mt-5 rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--dashboard-muted)]">Source call</p>
            <span className="mt-2 inline-flex" title={sourceCallTooltip}>
              <button
                className="text-sm font-semibold text-[var(--dashboard-muted)] opacity-75"
                disabled
                type="button"
              >
                Open {lead.sourceCallId}
              </button>
            </span>
          </section>

          <DrawerSection title="AI Summary">
            <p className="text-sm leading-6 text-[var(--dashboard-muted)]">{lead.summary}</p>
          </DrawerSection>

          <DrawerSection title="Timeline">
            {lead.timeline.length > 0 ? (
              <div className="space-y-4">
                {lead.timeline.map((item) => (
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
                title="No timeline events"
                description="Lead qualification, outreach, and follow-up events will appear here."
              />
            )}
          </DrawerSection>

          <DrawerSection title="Extracted Fields">
            <div className="grid grid-cols-1 gap-3">
              <DetailItem label="Company" value={lead.extractedFields.company} />
              <DetailItem label="Budget" value={lead.extractedFields.budget} />
              <DetailItem label="Timeline" value={lead.extractedFields.timeline} />
              <DetailItem label="Priority" value={lead.extractedFields.priority} />
            </div>
          </DrawerSection>

          <section className="mt-5 grid grid-cols-1 gap-3">
            <span className="block" title={actionTooltip}>
              <Button className="w-full cursor-not-allowed justify-start" disabled type="button">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Add Note
              </Button>
            </span>
            <span className="block" title={actionTooltip}>
              <Button className="w-full cursor-not-allowed justify-start" disabled type="button" variant="secondary">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                Change Status
              </Button>
            </span>
            <span className="block" title={actionTooltip}>
              <Button className="w-full cursor-not-allowed justify-start" disabled type="button" variant="secondary">
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                Schedule Follow-up
              </Button>
            </span>
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
