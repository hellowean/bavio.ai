import { motion } from 'framer-motion'
import { FileText, PhoneCall, PlayCircle, Radio, Search } from 'lucide-react'
import { memo } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { listContainer, listItem } from '@/lib/motion'
import type { CallLogEntry, CallResolution, CallSentiment } from '@/types'

type CallsTableProps = {
  calls: CallLogEntry[]
  isFiltered?: boolean
  onViewCall: (call: CallLogEntry) => void
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

function CallsTableComponent({ calls, isFiltered = false, onViewCall }: CallsTableProps) {
  const testCallTooltip = 'Test calls will be available in a future release.'

  return (
    <section className="overflow-hidden rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] shadow-[var(--dashboard-card-shadow)]">
      <header className="flex items-center justify-between gap-4 border-b border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--dashboard-text)]">Call Log</h2>
          <p className="mt-1 text-sm text-[var(--dashboard-muted)]">AI-handled calls with outcomes and artifacts</p>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--dashboard-muted)]">
          <Radio className="h-4 w-4 text-[var(--dashboard-success)]" aria-hidden="true" />
          Live call sync
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--dashboard-border)]">
              {['Date & Time', 'Caller', 'Agent', 'Duration', 'Resolution', 'Sentiment', 'Lead', 'Actions'].map(
                (header) => (
                  <th
                    className="bg-[var(--dashboard-surface-raised)]/45 px-5 py-3.5 text-left text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--dashboard-muted)]"
                    key={header}
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <motion.tbody variants={listContainer} initial="hidden" animate="show">
            {calls.length > 0 ? (
              calls.map((call) => (
                <motion.tr
                  className="border-b border-[var(--dashboard-border)] transition-colors last:border-b-0 hover:bg-[color:var(--dashboard-accent)]/7"
                  key={call.id}
                  variants={listItem}
                >
                  <td className="px-5 py-4.5 align-middle">
                    <span className="text-sm text-[var(--dashboard-muted)]">{call.dateTime}</span>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <div>
                      <p className="text-sm font-semibold text-[var(--dashboard-text)]">{call.callerName}</p>
                      <p className="mt-1 text-xs text-[var(--dashboard-muted)]">{call.callerNumber}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <span className="text-sm text-[var(--dashboard-text)]">{call.agent}</span>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <span className="text-sm text-[var(--dashboard-muted)]">{call.duration}</span>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <Badge tone={resolutionTone[call.resolution]}>{call.resolution}</Badge>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <Badge tone={sentimentTone[call.sentiment]}>{call.sentiment}</Badge>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <Badge tone={call.lead ? 'accent' : 'muted'}>{call.lead ? 'Yes' : 'No'}</Badge>
                  </td>
                  <td className="px-5 py-4.5 align-middle">
                    <div className="flex items-center gap-2">
                      <Button
                        className="h-8 px-2 text-[var(--dashboard-muted)] hover:text-[var(--dashboard-text)]"
                        type="button"
                        variant="ghost"
                        onClick={() => onViewCall(call)}
                      >
                        <Search className="h-3.5 w-3.5" aria-hidden="true" />
                        View
                      </Button>
                      <Button
                        className="h-8 px-2 text-[var(--dashboard-muted)] hover:text-[var(--dashboard-text)]"
                        type="button"
                        variant="ghost"
                        onClick={() => onViewCall(call)}
                      >
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                        Transcript
                      </Button>
                      <Button
                        className="h-8 px-2 text-[var(--dashboard-muted)] hover:text-[var(--dashboard-text)]"
                        type="button"
                        variant="ghost"
                        onClick={() => onViewCall(call)}
                      >
                        <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        Recording
                      </Button>
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
                        <span className="inline-flex" title={testCallTooltip}>
                          <Button className="cursor-not-allowed" disabled type="button" variant="secondary">
                            <PhoneCall className="h-4 w-4" aria-hidden="true" />
                            Make a test call
                          </Button>
                        </span>
                      )
                    }
                    description={
                      isFiltered
                        ? 'Try a different caller number, agent, status, or summary keyword.'
                        : 'AI-handled calls will appear here once your voice agents start receiving calls.'
                    }
                    icon={<PhoneCall className="h-5 w-5" aria-hidden="true" />}
                    title={isFiltered ? 'No calls found' : 'No calls yet'}
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

export const CallsTable = memo(CallsTableComponent)
