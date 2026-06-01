import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { sectionCardClass } from '@/components/settings/settingsStyles'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/store/uiStore'

type ThemePreference = 'Dark' | 'Light' | 'System'
type SidebarMode = 'Expanded' | 'Collapsed'
type DashboardDensity = 'Comfortable' | 'Compact'

export function AppearanceSettings() {
  const currentTheme = useUiStore((state) => state.theme)
  const toggleTheme = useUiStore((state) => state.toggleTheme)
  const [themePreference, setThemePreference] = useState<ThemePreference>(currentTheme === 'dark' ? 'Dark' : 'Light')
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('Expanded')
  const [density, setDensity] = useState<DashboardDensity>('Comfortable')

  const handleThemeChange = (nextTheme: ThemePreference) => {
    setThemePreference(nextTheme)

    if (nextTheme !== 'System' && nextTheme.toLowerCase() !== currentTheme) {
      toggleTheme()
    }
  }

  return (
    <section className={sectionCardClass}>
      <SectionHeader title="Appearance" description="Tune how Bavio looks and feels on this desktop." />
      <div className="mt-6 space-y-6">
        <OptionGroup
          label="Theme selection"
          options={['Dark', 'Light', 'System']}
          selected={themePreference}
          onSelect={handleThemeChange}
        />
        <OptionGroup
          label="Sidebar mode"
          options={['Expanded', 'Collapsed']}
          selected={sidebarMode}
          onSelect={setSidebarMode}
        />
        <OptionGroup
          label="Dashboard density"
          options={['Comfortable', 'Compact']}
          selected={density}
          onSelect={setDensity}
        />
        <Button type="button" variant="secondary">Save Appearance</Button>
      </div>
    </section>
  )
}

function OptionGroup<TOption extends string>({
  label,
  onSelect,
  options,
  selected,
}: {
  label: string
  options: readonly TOption[]
  selected: TOption
  onSelect: (option: TOption) => void
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-[var(--dashboard-muted)]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            className={cn(
              'h-10 rounded-md border border-[var(--dashboard-border)] px-4 text-sm font-medium text-[var(--dashboard-muted)] transition-colors hover:bg-[var(--dashboard-surface-raised)] hover:text-[var(--dashboard-text)]',
              selected === option && 'border-[var(--dashboard-accent)] bg-[color:var(--dashboard-accent)]/10 text-[var(--dashboard-text)]',
            )}
            key={option}
            type="button"
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
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
