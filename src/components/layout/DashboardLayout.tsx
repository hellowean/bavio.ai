import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { useUiStore } from '@/store/uiStore'

export function DashboardLayout() {
  const theme = useUiStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('light', theme === 'light')
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-screen bg-[var(--dashboard-bg)] text-[var(--dashboard-text)]">
      <Sidebar />
      <Header />
      <main className="min-h-screen bg-[var(--dashboard-bg)] pl-[248px] pt-16">
        <Outlet />
      </main>
    </div>
  )
}
