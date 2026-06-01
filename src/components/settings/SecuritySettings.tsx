import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { fieldClass, sectionCardClass } from '@/components/settings/settingsStyles'
import type { LoginHistoryItem, SecuritySession } from '@/types'

type SecuritySettingsProps = {
  sessions: SecuritySession[]
  loginHistory: LoginHistoryItem[]
  initialTwoFactorEnabled?: boolean
}

export function SecuritySettings({ initialTwoFactorEnabled = true, loginHistory, sessions }: SecuritySettingsProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(initialTwoFactorEnabled)

  return (
    <div className="space-y-5">
      <section className={sectionCardClass}>
        <SectionHeader title="Security" description="Protect your workspace and review account access." />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-md border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] p-4">
            <h3 className="text-sm font-semibold text-[var(--dashboard-text)]">Change Password</h3>
            <div className="mt-4 space-y-3">
              <input className={fieldClass} placeholder="Current password" type="password" />
              <input className={fieldClass} placeholder="New password" type="password" />
              <Button type="button" variant="secondary">Update Password</Button>
            </div>
          </div>

          <div className="rounded-md border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-[var(--dashboard-text)]">Two-Factor Authentication</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--dashboard-muted)]">
                  Require a second verification step for sensitive Bavio workspace access.
                </p>
              </div>
              <button
                aria-pressed={twoFactorEnabled}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  twoFactorEnabled ? 'bg-[var(--dashboard-success)]' : 'bg-[var(--dashboard-border)]'
                }`}
                type="button"
                onClick={() => setTwoFactorEnabled((enabled) => !enabled)}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <Badge className="mt-4" tone={twoFactorEnabled ? 'success' : 'warning'}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </div>
      </section>

      <section className={sectionCardClass}>
        <SectionHeader title="Active Sessions" description="Devices currently authorized to access your account." />
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-[680px] w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--dashboard-border)]">
                {['Device', 'Location', 'Last Active'].map((header) => (
                  <th
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--dashboard-muted)]"
                    key={header}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <tr className="border-b border-[var(--dashboard-border)] last:border-b-0" key={session.id}>
                    <td className="px-4 py-4 text-sm font-semibold text-[var(--dashboard-text)]">{session.device}</td>
                    <td className="px-4 py-4 text-sm text-[var(--dashboard-muted)]">{session.location}</td>
                    <td className="px-4 py-4 text-sm text-[var(--dashboard-muted)]">{session.lastActive}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-5" colSpan={3}>
                    <EmptyState
                      className="min-h-[180px]"
                      title="No active sessions"
                      description="Authorized devices will appear here after users sign in to this workspace."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={sectionCardClass}>
        <SectionHeader title="Login History" description="Recent authentication activity for this workspace." />
        {loginHistory.length > 0 ? (
          <div className="mt-5 space-y-4">
            {loginHistory.map((item) => (
              <article
                className="flex items-start justify-between gap-4 rounded-md bg-[var(--dashboard-surface-raised)] p-4"
                key={item.id}
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--dashboard-text)]">{item.event}</p>
                  <p className="mt-1 text-sm text-[var(--dashboard-muted)]">{item.location}</p>
                </div>
                <p className="text-sm text-[var(--dashboard-muted)]">{item.time}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <EmptyState
              className="min-h-[180px]"
              title="No login history"
              description="Recent sign-in events and security checks will appear here."
            />
          </div>
        )}
      </section>
    </div>
  )
}

function SectionHeader({ description, title }: { description: string; title: string }) {
  return (
    <header>
      <h2 className="text-lg font-semibold text-[var(--dashboard-text)]">{title}</h2>
      <p className="mt-1 text-sm text-[var(--dashboard-muted)]">{description}</p>
    </header>
  )
}
