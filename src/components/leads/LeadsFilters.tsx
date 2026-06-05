import { Download, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type LeadsFiltersProps = {
  agentFilter: string
  searchQuery: string
  scoreFilter: string
  statusFilter: string
  onAgentFilterChange: (agent: string) => void
  onExportPdf: () => void
  onSearchQueryChange: (query: string) => void
  onScoreFilterChange: (score: string) => void
  onStatusFilterChange: (status: string) => void
}

export function LeadsFilters({
  agentFilter,
  onAgentFilterChange,
  onExportPdf,
  onScoreFilterChange,
  onSearchQueryChange,
  onStatusFilterChange,
  scoreFilter,
  searchQuery,
  statusFilter,
}: LeadsFiltersProps) {
  return (
    <section className="rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-4 shadow-[var(--dashboard-card-shadow)]">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <label className="relative block min-w-0 flex-1" htmlFor="leads-search">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--dashboard-subtle)]"
            aria-hidden="true"
            strokeWidth={1.9}
          />
          <input
            id="leads-search"
            className="h-10 w-full rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)]/70 pl-10 pr-3 text-sm text-[var(--dashboard-text)] outline-none transition placeholder:text-[var(--dashboard-subtle)] hover:border-[color:var(--dashboard-accent)]/25 focus:border-[var(--dashboard-accent)] focus:[box-shadow:var(--dashboard-focus-ring)]"
            placeholder="Search leads, phone numbers, intent..."
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
          />
        </label>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:flex xl:shrink-0">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger aria-label="Status" className="w-full xl:w-36">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Closed Won">Closed Won</SelectItem>
              <SelectItem value="Closed Lost">Closed Lost</SelectItem>
              <SelectItem value="Junk">Junk</SelectItem>
            </SelectContent>
          </Select>

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

          <Select value={scoreFilter} onValueChange={onScoreFilterChange}>
            <SelectTrigger aria-label="Score" className="w-full xl:w-36">
              <SelectValue placeholder="All scores" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All scores</SelectItem>
              <SelectItem value="high">8-10 High</SelectItem>
              <SelectItem value="medium">5-7 Medium</SelectItem>
              <SelectItem value="low">1-4 Low</SelectItem>
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
