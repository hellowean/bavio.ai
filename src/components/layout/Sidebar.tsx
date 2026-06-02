import { motion } from 'framer-motion'
import {
  BarChart3,
  Bell,
  Bot,
  CreditCard,
  Grid2X2,
  HelpCircle,
  ListChecks,
  LogOut,
  Phone,
  PhoneCall,
  Receipt,
  Settings,
  Sparkles,
  Timer,
  UsersRound,
  Workflow,
  Zap,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

import { logout } from '@/api/auth'
import { Logo } from '@/components/brand/Logo'
import { APP_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

const navigationItems = [
  { label: 'Overview', path: '/overview', icon: Grid2X2 },
  { label: 'Calls', path: '/calls', icon: Phone },
  { label: 'Leads', path: '/leads', icon: UsersRound },
  { label: 'AI Usage', path: '/usage', icon: Sparkles },
  { label: 'Minutes', path: '/minutes', icon: Timer },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Agents', path: '/agents', icon: Bot },
  { label: 'Integrations', path: '/integrations', icon: Zap },
  { label: 'Workflows', path: '/workflows', icon: Workflow },
  { label: 'Phone Numbers', path: '/phone-numbers', icon: PhoneCall },
  { label: 'Subscription', path: '/subscription', icon: CreditCard },
  { label: 'Billing', path: '/billing', icon: Receipt },
  { label: 'Team', path: '/team', icon: ListChecks },
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Support', path: '/support', icon: HelpCircle },
  { label: 'Settings', path: '/settings', icon: Settings },
]

export function Sidebar() {
  const navigate = useNavigate()
  const clearSession = useAuthStore((state) => state.clearSession)
  const user = useAuthStore((state) => state.user)

  const handleLogout = () => {
    void logout()
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <motion.aside
      className="fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-[var(--dashboard-border)] bg-[color:var(--dashboard-sidebar)]/98 shadow-[14px_0_36px_rgba(0,0,0,0.14)]"
    >
      <div className="flex h-[108px] items-center gap-3 px-5">
        <Logo size={32} />
        <div>
          <p className="text-lg font-semibold leading-none tracking-normal text-[var(--dashboard-text)]">{APP_NAME}</p>
          <p className="mt-1.5 text-[11px] font-medium leading-4 text-[var(--dashboard-muted)]">
            Voice AI Infrastructure
          </p>
        </div>
      </div>

      <motion.nav
        className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-5"
        aria-label="Primary"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 1 },
          show: { opacity: 1, transition: { staggerChildren: 0.025, delayChildren: 0.08 } },
        }}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'relative flex h-11 items-center gap-3 rounded-lg px-4 text-[15px] font-medium text-[var(--dashboard-muted)] transition-all duration-150 hover:bg-[var(--dashboard-surface-raised)] hover:text-[var(--dashboard-text)]',
                  isActive &&
                    'bg-[color:var(--dashboard-accent)]/12 text-[var(--dashboard-text)] shadow-sm ring-1 ring-[color:var(--dashboard-accent)]/20 before:absolute before:left-1.5 before:top-1/2 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-[var(--dashboard-accent)]',
                )
              }
            >
              <motion.span
                className="flex items-center gap-3"
                variants={{
                  hidden: { opacity: 0, x: -6 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.2 } },
                }}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={1.9} />
                {item.label}
              </motion.span>
            </NavLink>
          )
        })}
      </motion.nav>

      <div className="border-t border-[var(--dashboard-border)] p-4">
        <div className="rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)]/65 p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dashboard-accent)] text-sm font-semibold text-white shadow-[0_10px_24px_color-mix(in_srgb,var(--dashboard-accent)_24%,transparent)]">
            {user?.name
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2) ?? 'AC'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--dashboard-text)]">{user?.name ?? 'Acme Corp'}</p>
            <p className="truncate text-xs text-[var(--dashboard-muted)]">{user?.email ?? 'Pro Plan'}</p>
          </div>
        </div>
        <button
          className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[var(--dashboard-border)] text-sm font-semibold text-[var(--dashboard-muted)] transition-all duration-150 hover:border-[color:var(--dashboard-error)]/30 hover:bg-[color:var(--dashboard-error)]/10 hover:text-[var(--dashboard-error)]"
          type="button"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Logout
        </button>
        </div>
      </div>
    </motion.aside>
  )
}
