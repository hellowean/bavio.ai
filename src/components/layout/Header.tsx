import { motion, useReducedMotion } from 'framer-motion'
import { Bell, ChevronDown, LogOut, Moon, Settings, Sun } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { logout } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { useUiStore } from '@/store/uiStore'

export function Header() {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()
  const clearSession = useAuthStore((state) => state.clearSession)
  const user = useAuthStore((state) => state.user)
  const theme = useUiStore((state) => state.theme)
  const toggleTheme = useUiStore((state) => state.toggleTheme)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const ThemeIcon = theme === 'dark' ? Sun : Moon
  const nextThemeLabel = theme === 'dark' ? 'Light' : 'Dark'
  const userInitials =
    user?.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2) ?? 'AC'

  const handleLogout = () => {
    void logout()
    clearSession()
    setProfileMenuOpen(false)
    navigate('/login', { replace: true })
  }

  return (
    <motion.header
      className="fixed left-[248px] right-0 top-0 z-30 flex h-16 items-center justify-end border-b border-[var(--dashboard-border)] bg-[color:var(--dashboard-surface)]/92 px-7 shadow-[0_12px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-4">
        <div
          aria-label="AI Infrastructure Online"
          className="inline-flex h-9 items-center gap-2 rounded-full border border-[color:var(--dashboard-success)]/30 bg-[color:var(--dashboard-success)]/10 px-3.5 text-sm font-semibold text-[var(--dashboard-success)] shadow-sm"
          role="status"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-[var(--dashboard-success)]"
            aria-hidden="true"
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.76, 1, 0.76] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 2, ease: 'easeInOut', repeat: Infinity }
            }
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

        <Button
          aria-label="Open notifications"
          className="relative h-9 w-9 border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)]/60 text-[var(--dashboard-muted)] hover:border-[color:var(--dashboard-accent)]/30 hover:bg-[color:var(--dashboard-accent)]/10 hover:text-[var(--dashboard-text)]"
          size="icon"
          type="button"
          variant="ghost"
          onClick={() => navigate('/notifications')}
        >
          <Bell className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={1.9} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--dashboard-accent)]" />
        </Button>

        <div className="relative">
          <Button
            aria-expanded={profileMenuOpen}
            aria-haspopup="menu"
            aria-label="Open profile menu"
            className="h-9 gap-2 border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)]/60 px-2.5 text-[var(--dashboard-muted)] hover:border-[color:var(--dashboard-accent)]/30 hover:bg-[color:var(--dashboard-accent)]/10 hover:text-[var(--dashboard-text)]"
            type="button"
            variant="ghost"
            onClick={() => setProfileMenuOpen((current) => !current)}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--dashboard-accent)] text-[11px] font-bold text-white">
              {userInitials}
            </span>
            <ChevronDown className="h-4 w-4" aria-hidden="true" strokeWidth={1.8} />
          </Button>

          {profileMenuOpen ? (
            <div
              className="absolute right-0 top-11 w-64 rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] p-2 shadow-[var(--dashboard-card-shadow-hover)]"
              role="menu"
            >
              <div className="border-b border-[var(--dashboard-border)] px-3 py-2.5">
                <p className="truncate text-sm font-semibold text-[var(--dashboard-text)]">{user?.name ?? 'Acme Corp'}</p>
                <p className="mt-1 truncate text-xs text-[var(--dashboard-muted)]">{user?.email ?? 'Pro Plan'}</p>
              </div>
              <button
                className="mt-2 flex h-9 w-full items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[var(--dashboard-muted)] transition hover:bg-[var(--dashboard-surface-raised)] hover:text-[var(--dashboard-text)]"
                role="menuitem"
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false)
                  navigate('/settings')
                }}
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
                Settings
              </button>
              <button
                className="flex h-9 w-full items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[var(--dashboard-muted)] transition hover:bg-[color:var(--dashboard-error)]/10 hover:text-[var(--dashboard-error)]"
                role="menuitem"
                type="button"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </motion.header>
  )
}
