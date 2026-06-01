import { create } from 'zustand'

type UiState = {
  sidebarCollapsed: boolean
  theme: 'dark' | 'light'
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  toggleTheme: () => void
}

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: false,
  theme: 'dark',
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}))
