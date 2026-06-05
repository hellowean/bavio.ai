import { CalendarDays, Download, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type CallsFiltersProps = {
  agentFilter: string
  dateRangeFilter: string
  resolutionFilter: string
  searchQuery: string
  sentimentFilter: string
  onAgentFilterChange: (agent: string) => void
  onDateRangeFilterChange: (dateRange: string) => void
  onExportPdf: () => void
  onResolutionFilterChange: (resolution: string) => void
  onSearchQueryChange: (query: string) => void
  onSentimentFilterChange: (sentiment: string) => void
}

export function CallsFilters({
  agentFilter,
  dateRangeFilter,
  onAgentFilterChange,
  onDateRangeFilterChange,
  onExportPdf,
  onResolutionFilterChange,
  onSearchQueryChange,
  onSentimentFilterChange,
  resolutionFilter,
  searchQuery,
  sentimentFilter,
}: CallsFiltersProps) {
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
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
          />
        </label>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5 xl:flex xl:shrink-0">
          <label className="relative">
            <CalendarDays
              className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[var(--dashboard-muted)]"
              aria-hidden="true"
              strokeWidth={1.9}
            />
            <Select
              value={dateRangeFilter}
              onValueChange={onDateRangeFilterChange}
            >
              <SelectTrigger aria-label="Date range" className="w-full pl-9 xl:w-36">
                <SelectValue placeholder="All dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7-days">Last 7 days</SelectItem>
                <SelectItem value="30-days">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <Select value={agentFilter} onValueChange={onAgentFilterChange}>
            <SelectTrigger aria-label="Agent" className="w-full xl:w-44">
              <SelectValue placeholder="All agents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All agents</SelectItem>
              <SelectItem value="Sales Assistant">Sales Assistant</SelectItem>
              <SelectItem value="Support Bot">Support Bot</SelectItem>
              <SelectItem value="Lead Qualifier">Lead Qualifier</SelectItem>
              <SelectItem value="Scheduler">Scheduler</SelectItem>
            </SelectContent>
          </Select>

          <Select value={resolutionFilter} onValueChange={onResolutionFilterChange}>
            <SelectTrigger aria-label="Resolution" className="w-full xl:w-36">
              <SelectValue placeholder="All outcomes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All outcomes</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Escalated">Escalated</SelectItem>
              <SelectItem value="Missed">Missed</SelectItem>
              <SelectItem value="Voicemail">Voicemail</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sentimentFilter} onValueChange={onSentimentFilterChange}>
            <SelectTrigger aria-label="Sentiment" className="w-full xl:w-36">
              <SelectValue placeholder="Sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sentiment</SelectItem>
              <SelectItem value="Positive">Positive</SelectItem>
              <SelectItem value="Neutral">Neutral</SelectItem>
              <SelectItem value="Negative">Negative</SelectItem>
            </SelectContent>
          </Select>

          <Button className="h-10 px-4" type="button" variant="secondary" onClick={onExportPdf}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Export PDF
          </Button>
        </div>
      </div>
    </section>
  )
}
