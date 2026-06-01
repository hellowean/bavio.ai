import type { ReactNode } from 'react'

import { MotionPage } from '@/components/layout/MotionPage'

type PagePlaceholderProps = {
  title: string
  description: string
  children?: ReactNode
}

export function PagePlaceholder({ title, description, children }: PagePlaceholderProps) {
  return (
    <MotionPage className="min-h-screen px-8 py-9">
      <header className="mb-8">
        <p className="text-sm font-medium text-[var(--dashboard-accent)]">Bavio desktop</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-[var(--dashboard-text)]">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--dashboard-muted)]">{description}</p>
      </header>

      <div className="rounded-md border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-6 shadow-sm">
        {children ?? (
          <p className="text-sm text-[var(--dashboard-muted)]">
            This page is intentionally a placeholder while the desktop foundation is being established.
          </p>
        )}
      </div>
    </MotionPage>
  )
}
