import { cloneMockData, simulateApiDelay, type AuthSession } from '@/api/types'
import type { AuthUser } from '@/types'

let currentSession: AuthSession | null = null

function createMockSession(email: string): AuthSession {
  return {
    user: {
      id: 'user_mock_admin',
      name: 'Bavio Admin',
      email,
      role: 'owner',
    },
    token: `mock-bavio-session-${Date.now()}`,
  }
}

export async function login(email: string, password: string): Promise<AuthSession> {
  await simulateApiDelay(180)

  const normalizedEmail = email.trim()

  if (!normalizedEmail || !password.trim()) {
    throw new Error('Enter your email and password to continue.')
  }

  currentSession = createMockSession(normalizedEmail)

  return cloneMockData(currentSession)
}

export async function loginWithGoogle(): Promise<AuthSession> {
  await simulateApiDelay(180)

  currentSession = createMockSession('google.user@bavio.ai')

  return cloneMockData(currentSession)
}

export async function logout(): Promise<void> {
  await simulateApiDelay(60)

  currentSession = null
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  await simulateApiDelay(60)

  return currentSession ? cloneMockData(currentSession.user) : null
}
