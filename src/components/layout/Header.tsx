import { motion } from 'framer-motion'
import { Moon, Search, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useUiStore } from '@/store/uiStore'

export function Header() {
  const theme = useUiStore((state) => state.theme)
  const toggleTheme = useUiStore((state) => state.toggleTheme)
  const ThemeIcon = theme === 'dark' ? Sun : Moon
  const nextThemeLabel = theme === 'dark' ? 'Light' : 'Dark'

  return (
    <motion.header
      className="fixed left-[248px] right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--dashboard-border)] bg-[color:var(--dashboard-surface)]/92 px-7 shadow-[0_12px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl"
    >
      <label className="relative block w-full max-w-[520px]" htmlFor="dashboard-search">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--dashboard-subtle)]"
          aria-hidden="true"
          strokeWidth={1.9}
        />
        <input
          id="dashboard-search"
          className="h-11 w-full rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)]/65 pl-12 pr-4 text-[15px] text-[var(--dashboard-text)] shadow-inner outline-none transition placeholder:text-[var(--dashboard-subtle)] hover:border-[color:var(--dashboard-accent)]/25 focus:border-[var(--dashboard-accent)] focus:bg-[var(--dashboard-surface)] focus:[box-shadow:var(--dashboard-focus-ring)]"
          placeholder="Search..."
          type="search"
        />
      </label>

      <div className="flex items-center gap-4">
        <div
          aria-label="AI Infrastructure Online"
          className="inline-flex h-9 items-center gap-2 rounded-full border border-[color:var(--dashboard-success)]/30 bg-[color:var(--dashboard-success)]/10 px-3.5 text-sm font-semibold text-[var(--dashboard-success)] shadow-sm"
          role="status"
        >
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-[var(--dashboard-success)] shadow-[0_0_12px_var(--dashboard-success)]"
            aria-hidden="true"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
          />
          AI Infrastructure Online
        </div>
        <Button
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="h-9 gap-2 border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)]/60 px-3 text-[var(--dashboard-muted)] hover:border-[color:var(--dashboard-accent)]/30 hover:bg-[color:var(--dashboard-accent)]/10 hover:text-[var(--dashboard-text)]"
          type="button"
          variant="ghost"
          onClick={toggleTheme}
        >
          <ThemeIcon className="h-5 w-5" aria-hidden="true" strokeWidth={1.8} />
          <span className="text-sm font-medium">{nextThemeLabel}</span>
        </Button>
      </div>
    </motion.header>
  )
}
