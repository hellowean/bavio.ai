import { motion } from 'framer-motion'
import { CalendarPlus, Search, StickyNote, UserPlus } from 'lucide-react'
import { memo } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { listContainer, listItem } from '@/lib/motion'
import type { LeadEntry, LeadStatus } from '@/types'

type LeadsTableProps = {
  isFiltered?: boolean
  leads: LeadEntry[]
  onViewLead: (lead: LeadEntry) => void
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
const leadCaptureTooltip = 'Lead capture configuration will be available in a future release.'

function LeadsTableComponent({ isFiltered = false, leads, onViewLead }: LeadsTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] shadow-[var(--dashboard-card-shadow)]">
      <header className="flex items-center justify-between gap-4 border-b border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--dashboard-text)]">Lead Directory</h2>
          <p className="mt-1 text-sm text-[var(--dashboard-muted)]">Caller intent, score, source, and follow-up state</p>
        </div>
        <div className="text-sm font-medium text-[var(--dashboard-muted)]">{leads.length} visible leads</div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--dashboard-border)]">
              {['Name', 'Phone', 'Intent', 'Score', 'Status', 'Source Agent', 'Created', 'Actions'].map((header) => (
                <th
                  className="bg-[var(--dashboard-surface-raised)]/45 px-5 py-3.5 text-left text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--dashboard-muted)]"
                  key={header}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody variants={listContainer} initial="hidden" animate="show">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <motion.tr
                  className="border-b border-[var(--dashboard-border)] transition-colors last:border-b-0 hover:bg-[color:var(--dashboard-accent)]/7"
                  key={lead.id}
                  variants={listItem}
                >
                  <td className="px-5 py-4.5 align-middle">
                    <div>
                      <p className="text-sm font-semibold text-[var(--dashboard-text)]">{lead.name}</p>
                      <p className="mt-1 text-xs text-[var(--dashboard-muted)]">{lead.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <span className="text-sm text-[var(--dashboard-muted)]">{lead.phone}</span>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <span className="text-sm text-[var(--dashboard-text)]">{lead.intent}</span>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <Badge tone={getScoreTone(lead.score)}>{lead.score}/10</Badge>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <Badge tone={statusTone[lead.status]}>{lead.status}</Badge>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <span className="text-sm text-[var(--dashboard-text)]">{lead.sourceAgent}</span>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <span className="text-sm text-[var(--dashboard-muted)]">{lead.created}</span>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <div className="flex items-center gap-2">
                      <Button
                        className="h-8 px-2 text-[var(--dashboard-muted)] hover:text-[var(--dashboard-text)]"
                        type="button"
                        variant="ghost"
                        onClick={() => onViewLead(lead)}
                      >
                        <Search className="h-3.5 w-3.5" aria-hidden="true" />
                        View
                      </Button>
                      <span className="inline-flex" title={actionTooltip}>
                        <Button
                          className="h-8 cursor-not-allowed px-2 text-[var(--dashboard-muted)]"
                          disabled
                          type="button"
                          variant="ghost"
                        >
                          <StickyNote className="h-3.5 w-3.5" aria-hidden="true" />
                          Note
                        </Button>
                      </span>
                      <span className="inline-flex" title={actionTooltip}>
                        <Button
                          className="h-8 cursor-not-allowed px-2 text-[var(--dashboard-muted)]"
                          disabled
                          type="button"
                          variant="ghost"
                        >
                          <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
                          Follow-up
                        </Button>
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td className="px-5 py-6" colSpan={8}>
                  <EmptyState
                    action={
                      isFiltered ? undefined : (
                        <span className="inline-flex" title={leadCaptureTooltip}>
                          <Button className="cursor-not-allowed" disabled type="button" variant="secondary">
                            <UserPlus className="h-4 w-4" aria-hidden="true" />
                            Configure lead capture
                          </Button>
                        </span>
                      )
                    }
                    description={
                      isFiltered
                        ? 'Try a different name, phone number, email, intent, or status.'
                        : 'Leads appear here when your AI agents collect caller information.'
                    }
                    icon={<UserPlus className="h-5 w-5" aria-hidden="true" />}
                    title={isFiltered ? 'No leads found' : 'No leads captured yet'}
                  />
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>
    </section>
  )
}

export const LeadsTable = memo(LeadsTableComponent)
