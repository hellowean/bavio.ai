import { CalendarDays, Download, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'

const selectClass =
  'h-10 rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)]/70 px-3 text-sm font-medium text-[var(--dashboard-muted)] outline-none transition hover:border-[color:var(--dashboard-accent)]/25 focus:border-[var(--dashboard-accent)] focus:[box-shadow:var(--dashboard-focus-ring)]'

export function CallsFilters() {
  return (
    <section className="rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-4 shadow-[var(--dashboard-card-shadow)]">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <label className="relative block min-w-0 flex-1" htmlFor="calls-search">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--dashboard-subtle)]"
            aria-hidden="true"
            strokeWidth={1.9}
          />
          <input
            id="calls-search"
            className="h-10 w-full rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)]/70 pl-10 pr-3 text-sm text-[var(--dashboard-text)] outline-none transition placeholder:text-[var(--dashboard-subtle)] hover:border-[color:var(--dashboard-accent)]/25 focus:border-[var(--dashboard-accent)] focus:[box-shadow:var(--dashboard-focus-ring)]"
            placeholder="Search calls, callers, transcripts..."
            type="search"
          />
        </label>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5 xl:flex xl:shrink-0">
          <label className="relative">
            <CalendarDays
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--dashboard-muted)]"
              aria-hidden="true"
              strokeWidth={1.9}
            />
            <select aria-label="Date range" className={`${selectClass} w-full pl-9 xl:w-36`} defaultValue="today">
              <option value="today">Today</option>
              <option value="7-days">Last 7 days</option>
              <option value="30-days">Last 30 days</option>
            </select>
          </label>

          <select aria-label="Agent" className={`${selectClass} w-full xl:w-44`} defaultValue="all">
            <option value="all">All agents</option>
            <option value="sales">Sales Assistant</option>
            <option value="support">Support Bot</option>
            <option value="lead">Lead Qualifier</option>
            <option value="scheduler">Scheduler</option>
          </select>

          <select aria-label="Resolution" className={`${selectClass} w-full xl:w-36`} defaultValue="all">
            <option value="all">All outcomes</option>
            <option value="resolved">Resolved</option>
            <option value="escalated">Escalated</option>
            <option value="missed">Missed</option>
            <option value="voicemail">Voicemail</option>
          </select>

          <select aria-label="Sentiment" className={`${selectClass} w-full xl:w-36`} defaultValue="all">
            <option value="all">Sentiment</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          <Button
            className="h-10 px-4"
            type="button"
            variant="secondary"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Export
          </Button>
        </div>
      </div>
    </section>
  )
}
