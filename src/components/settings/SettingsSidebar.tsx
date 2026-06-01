import { Building2, Code2, LockKeyhole, Palette, UserRound } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { SettingsSectionId } from '@/types'

type SettingsSidebarProps = {
  activeSection: SettingsSectionId
  onChange: (section: SettingsSectionId) => void
}

const settingsNavItems = [
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'security', label: 'Security', icon: LockKeyhole },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'account', label: 'Account', icon: Building2 },
  { id: 'developer', label: 'Developer', icon: Code2 },
] satisfies Array<{ id: SettingsSectionId; label: string; icon: typeof UserRound }>

export function SettingsSidebar({ activeSection, onChange }: SettingsSidebarProps) {
  return (
    <aside className="rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-3 shadow-[var(--dashboard-card-shadow)]">
      <nav className="space-y-1" aria-label="Settings">
        {settingsNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              className={cn(
                'flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold text-[var(--dashboard-muted)] transition-all hover:bg-[var(--dashboard-surface-raised)] hover:text-[var(--dashboard-text)]',
                isActive &&
                  'bg-[color:var(--dashboard-accent)]/12 text-[var(--dashboard-text)] ring-1 ring-[color:var(--dashboard-accent)]/20',
              )}
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
