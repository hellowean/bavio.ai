import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthUser } from '@/types'

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  setSession: (user: AuthUser, token: string) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setSession: (user, token) => set({ user, token, isAuthenticated: true }),
      clearSession: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'bavio-auth-session',
    },
  ),
)
