export type UserRole = 'owner' | 'admin' | 'member' | 'viewer'

export type AuthUser = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type ApiResponse<T> = {
  data: T | null
  error: string | null
}

export type DashboardMetric = {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'flat'
  helper?: string
}

export type CallVolumePoint = {
  time: string
  calls: number
}

export type AgentHealthStatus = 'online' | 'idle'

export type AgentHealthItem = {
  name: string
  calls: number
  uptime: string
  status: AgentHealthStatus
}

export type RecentCall = {
  id: string
  contact: string
  company: string
  duration: string
  agent: string
  outcome: string
  outcomeTone: 'success' | 'warning' | 'accent' | 'muted'
  occurredAt: string
}

export type LiveActivityItem = {
  id: string
  title: string
  detail: string
  time: string
}

export type CallResolution = 'Resolved' | 'Escalated' | 'Missed' | 'Voicemail'

export type CallSentiment = 'Positive' | 'Neutral' | 'Negative'

export type CallTranscriptMessage = {
  speaker: 'Caller' | 'AI Agent'
  message: string
  timestamp: string
}

export type ExtractedLeadData = {
  name: string
  company: string
  email: string
  intent: string
  nextStep: string
}

export type WorkflowTraceStep = {
  label: string
  status: 'completed' | 'skipped' | 'pending'
  detail: string
}

export type CallLogEntry = {
  id: string
  dateTime: string
  callerName: string
  callerNumber: string
  agent: 'Sales Assistant' | 'Support Bot' | 'Lead Qualifier' | 'Scheduler'
  duration: string
  resolution: CallResolution
  sentiment: CallSentiment
  lead: boolean
  summary: string
  transcript: CallTranscriptMessage[]
  leadData: ExtractedLeadData
  workflowTrace: WorkflowTraceStep[]
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Closed Won' | 'Closed Lost' | 'Junk'

export type LeadIntent = 'Appointment Booking' | 'Price Inquiry' | 'Support Request' | 'Demo Request'

export type LeadTimelineItem = {
  id: string
  title: string
  detail: string
  time: string
}

export type LeadExtractedFields = {
  company: string
  email: string
  budget: string
  timeline: string
  priority: string
}

export type LeadEntry = {
  id: string
  name: string
  phone: string
  email: string
  intent: LeadIntent
  score: number
  status: LeadStatus
  sourceAgent: 'Sales Assistant' | 'Support Bot' | 'Lead Qualifier' | 'Scheduler'
  sourceCallId: string
  created: string
  summary: string
  timeline: LeadTimelineItem[]
  extractedFields: LeadExtractedFields
}

export type AgentStatus = 'Live' | 'Draft' | 'Paused' | 'Error'

export type AgentRecentCall = {
  id: string
  caller: string
  outcome: string
  duration: string
  time: string
}

export type AgentActivityLogItem = {
  id: string
  title: string
  detail: string
  time: string
}

export type VoiceSettings = {
  voice: string
  pace: string
  language: string
}

export type VoiceAgent = {
  id: string
  name: string
  displayName: string
  status: AgentStatus
  assignedNumber: string
  language: string
  callsThisWeek: number
  resolutionRate: string
  avgDuration: string
  uptime: string
  lastActive: string
  promptPreview: string
  voiceSettings: VoiceSettings
  recentCalls: AgentRecentCall[]
  activityLog: AgentActivityLogItem[]
}

export type SettingsSectionId = 'profile' | 'security' | 'appearance' | 'account' | 'developer'

export type UserProfileSettings = {
  fullName: string
  email: string
  phone: string
  timezone: string
  language: string
}

export type SecuritySession = {
  id: string
  device: string
  location: string
  lastActive: string
}

export type LoginHistoryItem = {
  id: string
  event: string
  location: string
  time: string
}

export type AccountSettingsData = {
  companyName: string
  industry: string
  website: string
  businessHours: string
}

export type ApiKeyItem = {
  id: string
  name: string
  keyPreview: string
  created: string
  lastUsed: string
}

export type WebhookUrlItem = {
  id: string
  name: string
  url: string
}

export type NavigationSection =
  | 'overview'
  | 'calls'
  | 'leads'
  | 'usage'
  | 'minutes'
  | 'agents'
  | 'analytics'
  | 'subscription'
  | 'billing'
  | 'settings'
