import type {
  AccountSettingsData,
  ApiKeyItem,
  AuthUser,
  CallLogEntry,
  CallResolution,
  CallSentiment,
  DashboardMetric,
  LeadEntry,
  LeadStatus,
  LoginHistoryItem,
  SecuritySession,
  UserProfileSettings,
  VoiceAgent,
  WebhookUrlItem,
} from '@/types'

export const MOCK_API_DELAY_MS = 90

export function simulateApiDelay(ms = MOCK_API_DELAY_MS) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export function cloneMockData<T>(data: T): T {
  return structuredClone(data)
}

export type AuthSession = {
  user: AuthUser
  token: string
}

export type OverviewStats = {
  metrics: DashboardMetric[]
  todaysAiSummary: Array<{
    label: string
    value: string
  }>
}

export type CallsFilters = {
  query?: string
  agent?: CallLogEntry['agent']
  resolution?: CallResolution
  sentiment?: CallSentiment
}

export type CallsPageData = {
  metrics: DashboardMetric[]
  calls: CallLogEntry[]
}

export type LeadsFilters = {
  query?: string
  agent?: LeadEntry['sourceAgent']
  score?: 'high' | 'medium' | 'low'
  status?: LeadStatus
}

export type LeadPipelineItem = {
  status: string
  count: number
}

export type LeadsPageData = {
  metrics: DashboardMetric[]
  leads: LeadEntry[]
  pipeline: LeadPipelineItem[]
}

export type AgentsPageData = {
  metrics: DashboardMetric[]
  agents: VoiceAgent[]
}

export type SecuritySettingsData = {
  twoFactorEnabled: boolean
  sessions: SecuritySession[]
  loginHistory: LoginHistoryItem[]
}

export type DeveloperSettingsData = {
  apiKeys: ApiKeyItem[]
  webhooks: WebhookUrlItem[]
}

export type SettingsPageData = {
  profile: UserProfileSettings
  security: SecuritySettingsData
  account: AccountSettingsData
  developer: DeveloperSettingsData
}
