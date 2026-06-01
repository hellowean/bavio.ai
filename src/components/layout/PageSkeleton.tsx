import { X } from 'lucide-react'
import type { ReactNode } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

function PageHeaderSkeleton({
  description,
  hasAction = false,
  title,
}: {
  description: string
  hasAction?: boolean
  title: string
}) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="w-full max-w-3xl">
        <h1 className="text-[28px] font-semibold leading-tight tracking-normal text-[var(--dashboard-text)]">{title}</h1>
        <p className="mt-2 max-w-3xl text-base text-[var(--dashboard-muted)]">{description}</p>
      </div>
      {hasAction ? <Skeleton className="h-11 w-40" /> : null}
    </header>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="h-[112px] rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-4 shadow-[var(--dashboard-card-shadow)]">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-7 w-24" />
      <Skeleton className="mt-3 h-4 w-32" />
    </div>
  )
}

function StatGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </section>
  )
}

function CardShell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-6 shadow-[var(--dashboard-card-shadow)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function TableSkeleton() {
  return (
    <CardShell className="overflow-hidden">
      <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr_0.8fr_0.9fr_0.7fr_0.8fr] gap-4 border-b border-[var(--dashboard-border)] pb-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton className="h-4" key={index} />
        ))}
      </div>
      <div className="divide-y divide-[var(--dashboard-border)]">
        {Array.from({ length: 7 }).map((_, rowIndex) => (
          <div
            className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr_0.8fr_0.9fr_0.7fr_0.8fr] gap-4 py-5"
            key={rowIndex}
          >
            {Array.from({ length: 8 }).map((_, cellIndex) => (
              <Skeleton className="h-4" key={cellIndex} />
            ))}
          </div>
        ))}
      </div>
    </CardShell>
  )
}

export function ChartSkeleton() {
  return (
    <CardShell className="min-h-[408px]">
      <Skeleton className="h-6 w-36" />
      <Skeleton className="mt-3 h-4 w-48" />
      <div className="mt-8 flex h-64 items-end gap-3 border-b border-l border-[var(--dashboard-border)] px-4 pb-3">
        {[28, 38, 54, 72, 88, 96, 90, 80, 68, 56, 44, 34].map((height, index) => (
          <Skeleton className="flex-1" key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
    </CardShell>
  )
}

export function PanelSkeleton({ className, rows = 5 }: { className?: string; rows?: number }) {
  return (
    <CardShell className={cn('min-h-[320px]', className)}>
      <Skeleton className="h-6 w-36" />
      <Skeleton className="mt-3 h-4 w-48" />
      <div className="mt-8 space-y-5">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton className="h-10 w-full" key={index} />
        ))}
      </div>
    </CardShell>
  )
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <CardShell className="min-h-[286px]" key={index}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Skeleton className="h-6 w-44" />
              <Skeleton className="mt-3 h-4 w-32" />
            </div>
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, statIndex) => (
              <Skeleton className="h-12" key={statIndex} />
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </CardShell>
      ))}
    </section>
  )
}

export function DrawerSkeleton() {
  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton className="h-20" key={index} />
        ))}
      </div>
      <PanelSkeleton className="mt-5 min-h-[180px]" rows={3} />
      <PanelSkeleton className="mt-5 min-h-[240px]" rows={4} />
      <PanelSkeleton className="mt-5 min-h-[180px]" rows={3} />
    </div>
  )
}

export function DetailDrawerSkeleton({
  ariaLabel,
  maxWidth = 'max-w-[520px]',
  onClose,
}: {
  ariaLabel: string
  maxWidth?: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label={`Close ${ariaLabel.toLowerCase()}`}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        type="button"
        onClick={onClose}
      />
      <aside
        aria-label={ariaLabel}
        className={cn(
          'absolute bottom-0 right-0 top-0 flex w-full flex-col border-l border-[var(--dashboard-border)] bg-[color:var(--dashboard-surface)]/98 shadow-[var(--dashboard-card-shadow-hover)] backdrop-blur-xl',
          maxWidth,
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-[var(--dashboard-border)] px-6 py-5">
          <div>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="mt-3 h-4 w-48" />
          </div>
          <button
            aria-label="Close drawer"
            className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--dashboard-muted)] transition-colors hover:bg-[var(--dashboard-surface-raised)] hover:text-[var(--dashboard-text)]"
            type="button"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>
        <DrawerSkeleton />
      </aside>
    </div>
  )
}

function FiltersSkeleton({ controls = 5 }: { controls?: number }) {
  return (
    <CardShell className="flex flex-col gap-3 lg:flex-row">
      <Skeleton className="h-11 min-w-0 flex-1" />
      {Array.from({ length: controls }).map((_, index) => (
        <Skeleton className="h-11 w-full lg:w-40" key={index} />
      ))}
    </CardShell>
  )
}

export function OverviewPageSkeleton() {
  return (
    <div className="px-8 py-9">
      <PageHeaderSkeleton description="Friday, May 30, 2026" title="Overview" />
      <StatGridSkeleton />

      <CardShell className="mt-10">
        <Skeleton className="h-5 w-44" />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="h-16" key={index} />
          ))}
        </div>
      </CardShell>

      <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]">
        <ChartSkeleton />
        <PanelSkeleton className="min-h-[408px]" />
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]">
        <PanelSkeleton rows={5} />
        <PanelSkeleton rows={6} />
      </section>
    </div>
  )
}

export function TablePageSkeleton({
  description,
  hasPipeline = false,
  title,
}: {
  description: string
  hasPipeline?: boolean
  title: string
}) {
  return (
    <div className="px-8 py-9">
      <PageHeaderSkeleton description={description} title={title} />
      <StatGridSkeleton />
      <div className="mt-10">
        <FiltersSkeleton />
      </div>
      <div className="mt-6">
        <TableSkeleton />
      </div>
      {hasPipeline ? (
        <CardShell className="mt-10">
          <Skeleton className="h-6 w-44" />
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton className="h-24" key={index} />
            ))}
          </div>
        </CardShell>
      ) : null}
    </div>
  )
}

export function AgentsPageSkeleton() {
  return (
    <div className="px-8 py-9">
      <PageHeaderSkeleton
        description="Create, configure, test, and monitor your AI voice agents."
        hasAction
        title="Agents"
      />
      <StatGridSkeleton />
      <CardGridSkeleton />
    </div>
  )
}

export function SettingsSkeleton() {
  return (
    <div className="px-8 py-9">
      <PageHeaderSkeleton
        description="Manage account, profile, security, appearance, and developer settings."
        title="Settings"
      />
      <div className="mt-9 grid grid-cols-1 gap-6 xl:grid-cols-[248px_minmax(0,1fr)]">
        <CardShell className="h-fit">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton className="h-11" key={index} />
            ))}
          </div>
        </CardShell>
        <CardShell>
          <Skeleton className="h-7 w-44" />
          <Skeleton className="mt-3 h-4 w-80 max-w-full" />
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-2 h-11 w-full" />
              </div>
            ))}
          </div>
          <Skeleton className="mt-8 h-10 w-36" />
        </CardShell>
      </div>
    </div>
  )
}

export const SettingsPageSkeleton = SettingsSkeleton
