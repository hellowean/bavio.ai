import type {
  AgentHealthItem,
  CallLogEntry,
  CallVolumePoint,
  DashboardMetric,
  LeadEntry,
  LiveActivityItem,
  RecentCall,
  VoiceAgent,
  AccountSettingsData,
  ApiKeyItem,
  LoginHistoryItem,
  SecuritySession,
  UserProfileSettings,
  WebhookUrlItem,
} from '@/types'

export const overviewMetrics: DashboardMetric[] = [
  {
    label: 'AI Calls Today',
    value: '1,247',
    change: '+18%',
    trend: 'up',
    helper: 'vs yesterday',
  },
  {
    label: 'Active Voice Agents',
    value: '12',
    change: '+2',
    trend: 'up',
    helper: 'all systems operational',
  },
  {
    label: 'AI Minutes Remaining',
    value: '18,432',
    change: '-12%',
    trend: 'down',
    helper: 'of 25,000 this month',
  },
  {
    label: 'Leads Captured',
    value: '89',
    change: '+24%',
    trend: 'up',
    helper: 'this week',
  },
]

export const todaysAiSummary = [
  { label: 'Calls handled', value: '1,247' },
  { label: 'Leads captured', value: '89' },
  { label: 'Appointments booked', value: '14' },
  { label: 'Resolved by AI', value: '96.8%' },
] as const

export const callVolumeData: CallVolumePoint[] = [
  { time: '6am', calls: 24 },
  { time: '7am', calls: 46 },
  { time: '8am', calls: 86 },
  { time: '9am', calls: 150 },
  { time: '10am', calls: 230 },
  { time: '11am', calls: 295 },
  { time: '12pm', calls: 312 },
  { time: '1pm', calls: 288 },
  { time: '2pm', calls: 256 },
  { time: '3pm', calls: 222 },
  { time: '4pm', calls: 186 },
  { time: '5pm', calls: 144 },
]

export const agentHealthData: AgentHealthItem[] = [
  { name: 'Sales Assistant', calls: 423, uptime: '99.8%', status: 'online' },
  { name: 'Support Bot', calls: 389, uptime: '99.9%', status: 'online' },
  { name: 'Lead Qualifier', calls: 267, uptime: '100%', status: 'online' },
  { name: 'Scheduler', calls: 168, uptime: '98.2%', status: 'online' },
  { name: 'Follow-up Agent', calls: 0, uptime: '100%', status: 'idle' },
]

export const recentCallsData: RecentCall[] = [
  {
    id: 'call-1',
    contact: 'Sarah Chen',
    company: 'Acme Inc',
    duration: '4m 23s',
    agent: 'Sales Assistant',
    outcome: 'Qualified',
    outcomeTone: 'success',
    occurredAt: '2 minutes ago',
  },
  {
    id: 'call-2',
    contact: 'Michael Torres',
    company: 'TechCorp',
    duration: '2m 45s',
    agent: 'Scheduler',
    outcome: 'Meeting Booked',
    outcomeTone: 'accent',
    occurredAt: '8 minutes ago',
  },
  {
    id: 'call-3',
    contact: 'Emily Watson',
    company: 'StartupXYZ',
    duration: '6m 12s',
    agent: 'Support Bot',
    outcome: 'Support Ticket',
    outcomeTone: 'warning',
    occurredAt: '15 minutes ago',
  },
  {
    id: 'call-4',
    contact: 'James Liu',
    company: 'Enterprise Co',
    duration: '3m 34s',
    agent: 'Lead Qualifier',
    outcome: 'Qualified',
    outcomeTone: 'success',
    occurredAt: '23 minutes ago',
  },
  {
    id: 'call-5',
    contact: 'Anna Martinez',
    company: 'Global Ltd',
    duration: '5m 18s',
    agent: 'Sales Assistant',
    outcome: 'Follow-up Scheduled',
    outcomeTone: 'muted',
    occurredAt: '34 minutes ago',
  },
]

export const liveActivityData: LiveActivityItem[] = [
  {
    id: 'activity-1',
    title: 'Inbound call completed',
    detail: 'Sarah Chen · 4m 23s',
    time: '2m ago',
  },
  {
    id: 'activity-2',
    title: 'New lead captured',
    detail: 'Michael Torres · Enterprise',
    time: '8m ago',
  },
  {
    id: 'activity-3',
    title: 'Demo scheduled',
    detail: 'Emily Watson · Jun 2, 2pm',
    time: '15m ago',
  },
  {
    id: 'activity-4',
    title: 'Outbound call initiated',
    detail: 'James Liu · In progress',
    time: '23m ago',
  },
  {
    id: 'activity-5',
    title: 'Lead qualified',
    detail: 'Anna Martinez · High intent',
    time: '34m ago',
  },
  {
    id: 'activity-6',
    title: 'Meeting confirmed',
    detail: 'Robert Kim · Jun 1, 10am',
    time: '1h ago',
  },
]

export const callsMetrics: DashboardMetric[] = [
  {
    label: 'Total Calls',
    value: '1,247',
    change: '+18%',
    trend: 'up',
    helper: 'handled today',
  },
  {
    label: 'Resolved by AI',
    value: '96.8%',
    change: '+3.2%',
    trend: 'up',
    helper: 'without handoff',
  },
  {
    label: 'Escalated',
    value: '38',
    change: '-11%',
    trend: 'up',
    helper: 'sent to team',
  },
  {
    label: 'Avg Duration',
    value: '3m 42s',
    change: '-8s',
    trend: 'up',
    helper: 'per conversation',
  },
]

export const callsLogData: CallLogEntry[] = [
  {
    id: 'call-log-1',
    dateTime: 'May 30, 2026 · 10:42 AM',
    callerName: 'Sarah Chen',
    callerNumber: '+91 XXXXX X4532',
    agent: 'Sales Assistant',
    duration: '4m 23s',
    resolution: 'Resolved',
    sentiment: 'Positive',
    lead: true,
    summary:
      'Sarah asked about Bavio pricing for a 25-seat sales team. The AI qualified budget, timeline, and use case, then booked a product demo.',
    transcript: [
      {
        speaker: 'Caller',
        timestamp: '00:08',
        message: 'Hi, I want to know if Bavio can qualify inbound demo requests for our sales team.',
      },
      {
        speaker: 'AI Agent',
        timestamp: '00:18',
        message:
          'Absolutely. Bavio can answer initial questions, qualify intent, and schedule the right next step. How many reps are on your team?',
      },
      {
        speaker: 'Caller',
        timestamp: '01:04',
        message: 'We have 25 reps and around 400 inbound calls a week.',
      },
      {
        speaker: 'AI Agent',
        timestamp: '03:52',
        message: 'Great. I found a demo slot for Tuesday at 2 PM and will send the invite now.',
      },
    ],
    leadData: {
      name: 'Sarah Chen',
      company: 'Acme Inc',
      email: 'sarah.chen@acme.example',
      intent: 'High intent · Demo requested',
      nextStep: 'Demo booked for Jun 2, 2:00 PM',
    },
    workflowTrace: [
      { label: 'Inbound call received', status: 'completed', detail: 'Routed to Sales Assistant' },
      { label: 'Lead qualification', status: 'completed', detail: 'Budget, team size, and timeline captured' },
      { label: 'CRM lead created', status: 'completed', detail: 'Lead marked as qualified' },
      { label: 'Calendar booking', status: 'completed', detail: 'Demo invite sent' },
    ],
  },
  {
    id: 'call-log-2',
    dateTime: 'May 30, 2026 · 10:35 AM',
    callerName: 'Michael Torres',
    callerNumber: '+91 XXXXX X1187',
    agent: 'Scheduler',
    duration: '2m 45s',
    resolution: 'Resolved',
    sentiment: 'Neutral',
    lead: true,
    summary:
      'Michael rescheduled a discovery call after confirming timezone and availability. The AI updated the appointment and sent a confirmation.',
    transcript: [
      {
        speaker: 'Caller',
        timestamp: '00:06',
        message: 'I need to move my call with your sales team to later this week.',
      },
      {
        speaker: 'AI Agent',
        timestamp: '00:16',
        message: 'I can help with that. Would Thursday at 4 PM IST work for you?',
      },
      {
        speaker: 'Caller',
        timestamp: '01:22',
        message: 'Yes, that works.',
      },
      {
        speaker: 'AI Agent',
        timestamp: '02:18',
        message: 'Done. I have updated the meeting and sent a new confirmation.',
      },
    ],
    leadData: {
      name: 'Michael Torres',
      company: 'TechCorp',
      email: 'michael.torres@techcorp.example',
      intent: 'Medium intent · Meeting rescheduled',
      nextStep: 'Discovery call confirmed',
    },
    workflowTrace: [
      { label: 'Caller identified', status: 'completed', detail: 'Matched existing lead record' },
      { label: 'Calendar availability checked', status: 'completed', detail: 'Thursday 4 PM IST selected' },
      { label: 'Meeting updated', status: 'completed', detail: 'Confirmation message sent' },
    ],
  },
  {
    id: 'call-log-3',
    dateTime: 'May 30, 2026 · 10:21 AM',
    callerName: 'Emily Watson',
    callerNumber: '+91 XXXXX X7821',
    agent: 'Support Bot',
    duration: '6m 12s',
    resolution: 'Escalated',
    sentiment: 'Negative',
    lead: false,
    summary:
      'Emily reported repeated webhook failures. The AI collected logs and escalated the issue to support with priority context.',
    transcript: [
      {
        speaker: 'Caller',
        timestamp: '00:11',
        message: 'Our call outcome webhooks have failed three times this morning.',
      },
      {
        speaker: 'AI Agent',
        timestamp: '00:27',
        message: 'I am sorry about that. I can collect details and create a priority support ticket.',
      },
      {
        speaker: 'Caller',
        timestamp: '02:09',
        message: 'The endpoint is returning 502 and our CRM is not updating.',
      },
      {
        speaker: 'AI Agent',
        timestamp: '05:44',
        message: 'I have created a ticket and escalated it to the integrations team with your error details.',
      },
    ],
    leadData: {
      name: 'Emily Watson',
      company: 'StartupXYZ',
      email: 'emily.watson@startupxyz.example',
      intent: 'Support issue · Integration failure',
      nextStep: 'Priority ticket assigned',
    },
    workflowTrace: [
      { label: 'Support issue detected', status: 'completed', detail: 'Webhook failure classification' },
      { label: 'Diagnostic details captured', status: 'completed', detail: 'Endpoint, status code, and CRM impact saved' },
      { label: 'Human escalation', status: 'completed', detail: 'Support team notified' },
      { label: 'Lead workflow', status: 'skipped', detail: 'Not a sales lead' },
    ],
  },
  {
    id: 'call-log-4',
    dateTime: 'May 30, 2026 · 10:09 AM',
    callerName: 'James Liu',
    callerNumber: '+91 XXXXX X6390',
    agent: 'Lead Qualifier',
    duration: '3m 34s',
    resolution: 'Resolved',
    sentiment: 'Positive',
    lead: true,
    summary:
      'James confirmed enterprise interest, use case, expected call volume, and buying timeline. The AI added him to the enterprise follow-up workflow.',
    transcript: [
      {
        speaker: 'Caller',
        timestamp: '00:05',
        message: 'We are evaluating AI phone agents for enterprise support.',
      },
      {
        speaker: 'AI Agent',
        timestamp: '00:21',
        message: 'I can help qualify the right plan. What monthly call volume are you expecting?',
      },
      {
        speaker: 'Caller',
        timestamp: '01:34',
        message: 'Roughly 30,000 calls a month across support and sales.',
      },
      {
        speaker: 'AI Agent',
        timestamp: '03:10',
        message: 'Thanks. I have tagged this as enterprise and routed your details to the right specialist.',
      },
    ],
    leadData: {
      name: 'James Liu',
      company: 'Enterprise Co',
      email: 'james.liu@enterprise.example',
      intent: 'High intent · Enterprise evaluation',
      nextStep: 'Enterprise follow-up created',
    },
    workflowTrace: [
      { label: 'Qualification started', status: 'completed', detail: 'Enterprise use case detected' },
      { label: 'Volume captured', status: 'completed', detail: '30,000 monthly calls' },
      { label: 'Sales routing', status: 'completed', detail: 'Assigned to enterprise specialist' },
    ],
  },
  {
    id: 'call-log-5',
    dateTime: 'May 30, 2026 · 9:58 AM',
    callerName: 'Anna Martinez',
    callerNumber: '+91 XXXXX X2408',
    agent: 'Sales Assistant',
    duration: '5m 18s',
    resolution: 'Voicemail',
    sentiment: 'Neutral',
    lead: true,
    summary:
      'Anna left a voicemail asking for a callback about outbound campaign automation. The AI extracted intent and created a callback task.',
    transcript: [
      {
        speaker: 'Caller',
        timestamp: '00:03',
        message: 'Please call me back. I want to discuss outbound voice campaigns for our launch.',
      },
      {
        speaker: 'AI Agent',
        timestamp: '00:30',
        message: 'Thanks. I have captured your request and will notify the team for a callback.',
      },
    ],
    leadData: {
      name: 'Anna Martinez',
      company: 'Global Ltd',
      email: 'anna.martinez@global.example',
      intent: 'Medium intent · Callback requested',
      nextStep: 'Callback task created',
    },
    workflowTrace: [
      { label: 'Voicemail detected', status: 'completed', detail: 'Message transcribed' },
      { label: 'Intent extracted', status: 'completed', detail: 'Outbound campaign automation' },
      { label: 'Callback task', status: 'completed', detail: 'Assigned to sales queue' },
    ],
  },
  {
    id: 'call-log-6',
    dateTime: 'May 30, 2026 · 9:44 AM',
    callerName: 'Robert Kim',
    callerNumber: '+91 XXXXX X9026',
    agent: 'Support Bot',
    duration: '0m 18s',
    resolution: 'Missed',
    sentiment: 'Neutral',
    lead: false,
    summary: 'Robert disconnected before verification completed. The AI marked the call as missed and queued a retry.',
    transcript: [
      {
        speaker: 'AI Agent',
        timestamp: '00:04',
        message: 'Hello, this is Bavio support. How can I help you today?',
      },
      {
        speaker: 'Caller',
        timestamp: '00:12',
        message: 'I will call back later.',
      },
    ],
    leadData: {
      name: 'Robert Kim',
      company: 'Unknown',
      email: 'Not captured',
      intent: 'Unknown · Disconnected early',
      nextStep: 'Retry queued',
    },
    workflowTrace: [
      { label: 'Call connected', status: 'completed', detail: 'Support Bot answered' },
      { label: 'Verification', status: 'pending', detail: 'Caller disconnected' },
      { label: 'Retry workflow', status: 'completed', detail: 'Callback reminder queued' },
    ],
  },
]

export const leadsMetrics: DashboardMetric[] = [
  {
    label: 'Total Leads',
    value: '342',
    change: '+24%',
    trend: 'up',
    helper: 'captured this month',
  },
  {
    label: 'New Leads',
    value: '89',
    change: '+16%',
    trend: 'up',
    helper: 'awaiting review',
  },
  {
    label: 'Qualified',
    value: '126',
    change: '+21%',
    trend: 'up',
    helper: 'ready for sales',
  },
  {
    label: 'Conversion Rate',
    value: '36.8%',
    change: '+4.1%',
    trend: 'up',
    helper: 'lead to opportunity',
  },
]

export const leadsData: LeadEntry[] = [
  {
    id: 'lead-1',
    name: 'Sarah Chen',
    phone: '+91 XXXXX X4532',
    email: 'sarah.chen@acme.example',
    intent: 'Demo Request',
    score: 9,
    status: 'Qualified',
    sourceAgent: 'Sales Assistant',
    sourceCallId: 'call-log-1',
    created: 'May 30, 2026 · 10:46 AM',
    summary:
      'Sarah is evaluating Bavio for a 25-person sales team handling around 400 inbound calls per week. She requested pricing and booked a demo.',
    timeline: [
      { id: 'lead-1-t1', title: 'Lead captured', detail: 'Caller asked for pricing and sales automation details', time: '10:42 AM' },
      { id: 'lead-1-t2', title: 'Qualified by AI', detail: 'Budget, volume, and team size captured', time: '10:45 AM' },
      { id: 'lead-1-t3', title: 'Demo booked', detail: 'Calendar invite scheduled for Jun 2, 2:00 PM', time: '10:46 AM' },
    ],
    extractedFields: {
      company: 'Acme Inc',
      email: 'sarah.chen@acme.example',
      budget: 'Evaluating annual SaaS budget',
      timeline: 'This month',
      priority: 'High',
    },
  },
  {
    id: 'lead-2',
    name: 'Michael Torres',
    phone: '+91 XXXXX X1187',
    email: 'michael.torres@techcorp.example',
    intent: 'Appointment Booking',
    score: 7,
    status: 'Contacted',
    sourceAgent: 'Scheduler',
    sourceCallId: 'call-log-2',
    created: 'May 30, 2026 · 10:38 AM',
    summary:
      'Michael rescheduled an existing discovery call and confirmed enterprise interest for a customer success voice workflow.',
    timeline: [
      { id: 'lead-2-t1', title: 'Existing lead matched', detail: 'Phone number matched TechCorp record', time: '10:35 AM' },
      { id: 'lead-2-t2', title: 'Appointment updated', detail: 'Discovery call moved to Thursday at 4 PM IST', time: '10:37 AM' },
      { id: 'lead-2-t3', title: 'Confirmation sent', detail: 'AI sent calendar update and SMS confirmation', time: '10:38 AM' },
    ],
    extractedFields: {
      company: 'TechCorp',
      email: 'michael.torres@techcorp.example',
      budget: 'Not disclosed',
      timeline: 'This week',
      priority: 'Medium',
    },
  },
  {
    id: 'lead-3',
    name: 'James Liu',
    phone: '+91 XXXXX X6390',
    email: 'james.liu@enterprise.example',
    intent: 'Price Inquiry',
    score: 10,
    status: 'Qualified',
    sourceAgent: 'Lead Qualifier',
    sourceCallId: 'call-log-4',
    created: 'May 30, 2026 · 10:12 AM',
    summary:
      'James is comparing enterprise plans for 30,000 monthly calls across support and sales. AI routed him to the enterprise team.',
    timeline: [
      { id: 'lead-3-t1', title: 'Enterprise intent detected', detail: 'Caller mentioned support and sales deployment', time: '10:09 AM' },
      { id: 'lead-3-t2', title: 'Volume captured', detail: 'Estimated 30,000 calls per month', time: '10:11 AM' },
      { id: 'lead-3-t3', title: 'Routed to enterprise sales', detail: 'Assigned to high-priority follow-up queue', time: '10:12 AM' },
    ],
    extractedFields: {
      company: 'Enterprise Co',
      email: 'james.liu@enterprise.example',
      budget: 'Enterprise plan',
      timeline: 'Next quarter',
      priority: 'High',
    },
  },
  {
    id: 'lead-4',
    name: 'Anna Martinez',
    phone: '+91 XXXXX X2408',
    email: 'anna.martinez@global.example',
    intent: 'Appointment Booking',
    score: 6,
    status: 'New',
    sourceAgent: 'Sales Assistant',
    sourceCallId: 'call-log-5',
    created: 'May 30, 2026 · 9:59 AM',
    summary:
      'Anna left a voicemail requesting a callback about outbound voice campaigns for an upcoming product launch.',
    timeline: [
      { id: 'lead-4-t1', title: 'Voicemail transcribed', detail: 'Callback request captured from voicemail', time: '9:58 AM' },
      { id: 'lead-4-t2', title: 'Intent extracted', detail: 'Outbound campaign automation identified', time: '9:59 AM' },
      { id: 'lead-4-t3', title: 'Follow-up queued', detail: 'Sales callback task created', time: '9:59 AM' },
    ],
    extractedFields: {
      company: 'Global Ltd',
      email: 'anna.martinez@global.example',
      budget: 'Unknown',
      timeline: 'Before launch',
      priority: 'Medium',
    },
  },
  {
    id: 'lead-5',
    name: 'Priya Nair',
    phone: '+91 XXXXX X7741',
    email: 'priya.nair@northstar.example',
    intent: 'Support Request',
    score: 3,
    status: 'Junk',
    sourceAgent: 'Support Bot',
    sourceCallId: 'call-log-3',
    created: 'May 30, 2026 · 9:31 AM',
    summary:
      'Priya contacted support about an existing account issue. The AI identified it as non-sales and routed the request to support.',
    timeline: [
      { id: 'lead-5-t1', title: 'Support request received', detail: 'Caller asked about account access', time: '9:29 AM' },
      { id: 'lead-5-t2', title: 'Sales lead rejected', detail: 'No buying intent detected', time: '9:30 AM' },
      { id: 'lead-5-t3', title: 'Support handoff', detail: 'Ticket created for account team', time: '9:31 AM' },
    ],
    extractedFields: {
      company: 'Northstar Ops',
      email: 'priya.nair@northstar.example',
      budget: 'Not applicable',
      timeline: 'Immediate support',
      priority: 'Low',
    },
  },
  {
    id: 'lead-6',
    name: 'Arjun Mehta',
    phone: '+91 XXXXX X5602',
    email: 'arjun.mehta@pixelwave.example',
    intent: 'Demo Request',
    score: 8,
    status: 'Closed Won',
    sourceAgent: 'Lead Qualifier',
    sourceCallId: 'call-log-1',
    created: 'May 29, 2026 · 4:18 PM',
    summary:
      'Arjun requested a demo for agency call handling. The AI qualified his requirements and the sales team closed the pilot plan.',
    timeline: [
      { id: 'lead-6-t1', title: 'Demo requested', detail: 'Agency use case captured by AI', time: 'May 29, 4:18 PM' },
      { id: 'lead-6-t2', title: 'Sales follow-up completed', detail: 'Pilot scope agreed', time: 'May 29, 6:10 PM' },
      { id: 'lead-6-t3', title: 'Closed won', detail: 'Pilot subscription confirmed', time: 'May 30, 8:52 AM' },
    ],
    extractedFields: {
      company: 'Pixelwave Studio',
      email: 'arjun.mehta@pixelwave.example',
      budget: 'Pilot plan approved',
      timeline: 'Immediate',
      priority: 'High',
    },
  },
  {
    id: 'lead-7',
    name: 'Neha Kapoor',
    phone: '+91 XXXXX X3384',
    email: 'neha.kapoor@orbitcrm.example',
    intent: 'Price Inquiry',
    score: 5,
    status: 'Closed Lost',
    sourceAgent: 'Sales Assistant',
    sourceCallId: 'call-log-2',
    created: 'May 29, 2026 · 2:04 PM',
    summary:
      'Neha asked for pricing but indicated the team is not ready to purchase this quarter. AI marked the lead as low urgency.',
    timeline: [
      { id: 'lead-7-t1', title: 'Price inquiry captured', detail: 'Caller asked for monthly usage tiers', time: 'May 29, 2:04 PM' },
      { id: 'lead-7-t2', title: 'Timeline captured', detail: 'No purchase planned this quarter', time: 'May 29, 2:07 PM' },
      { id: 'lead-7-t3', title: 'Closed lost', detail: 'Nurture sequence suggested for later', time: 'May 29, 2:12 PM' },
    ],
    extractedFields: {
      company: 'Orbit CRM',
      email: 'neha.kapoor@orbitcrm.example',
      budget: 'Too early',
      timeline: 'Later this year',
      priority: 'Low',
    },
  },
]

export const leadPipelineData = [
  { status: 'New', count: 89 },
  { status: 'Contacted', count: 71 },
  { status: 'Qualified', count: 126 },
  { status: 'Closed Won', count: 56 },
] as const

export const agentsMetrics: DashboardMetric[] = [
  {
    label: 'Total Agents',
    value: '5',
    change: '+1',
    trend: 'up',
    helper: 'configured agents',
  },
  {
    label: 'Live Agents',
    value: '4',
    change: 'online',
    trend: 'up',
    helper: 'handling calls',
  },
  {
    label: 'Avg Resolution',
    value: '96.8%',
    change: '+3.2%',
    trend: 'up',
    helper: 'resolved by AI',
  },
  {
    label: 'Calls This Week',
    value: '1,247',
    change: '+18%',
    trend: 'up',
    helper: 'across all agents',
  },
]

export const voiceAgentsData: VoiceAgent[] = [
  {
    id: 'agent-sales-assistant',
    name: 'Sales Assistant',
    displayName: 'Bavio Sales Concierge',
    status: 'Live',
    assignedNumber: '+91 80 4567 4532',
    language: 'English (India)',
    callsThisWeek: 423,
    resolutionRate: '97.4%',
    avgDuration: '4m 12s',
    uptime: '99.8%',
    lastActive: '2 minutes ago',
    promptPreview:
      'Qualify inbound prospects, answer pricing questions, capture company details, and book demos for high-intent callers.',
    voiceSettings: {
      voice: 'Maya - Warm',
      pace: 'Balanced',
      language: 'English (India)',
    },
    recentCalls: [
      { id: 'sales-call-1', caller: '+91 XXXXX X4532', outcome: 'Demo booked', duration: '4m 23s', time: '2m ago' },
      { id: 'sales-call-2', caller: '+91 XXXXX X2408', outcome: 'Callback queued', duration: '5m 18s', time: '34m ago' },
      { id: 'sales-call-3', caller: '+91 XXXXX X3384', outcome: 'Pricing sent', duration: '3m 06s', time: '1h ago' },
    ],
    activityLog: [
      { id: 'sales-log-1', title: 'Prompt updated', detail: 'Added enterprise pricing guardrail', time: 'Today, 9:12 AM' },
      { id: 'sales-log-2', title: 'Number assigned', detail: '+91 80 4567 4532 connected', time: 'May 29, 4:20 PM' },
      { id: 'sales-log-3', title: 'Test call passed', detail: 'Demo booking workflow verified', time: 'May 29, 3:44 PM' },
    ],
  },
  {
    id: 'agent-support-bot',
    name: 'Support Bot',
    displayName: 'Bavio Support Desk',
    status: 'Live',
    assignedNumber: '+91 80 4567 1187',
    language: 'English (India)',
    callsThisWeek: 389,
    resolutionRate: '94.9%',
    avgDuration: '5m 02s',
    uptime: '99.9%',
    lastActive: '6 minutes ago',
    promptPreview:
      'Diagnose account, integration, and billing questions. Create support tickets when policy or system access is required.',
    voiceSettings: {
      voice: 'Rohan - Calm',
      pace: 'Measured',
      language: 'English (India)',
    },
    recentCalls: [
      { id: 'support-call-1', caller: '+91 XXXXX X7821', outcome: 'Escalated ticket', duration: '6m 12s', time: '21m ago' },
      { id: 'support-call-2', caller: '+91 XXXXX X7741', outcome: 'Account issue routed', duration: '2m 48s', time: '1h ago' },
      { id: 'support-call-3', caller: '+91 XXXXX X9026', outcome: 'Retry queued', duration: '0m 18s', time: '2h ago' },
    ],
    activityLog: [
      { id: 'support-log-1', title: 'Knowledge base synced', detail: '42 help articles refreshed', time: 'Today, 8:40 AM' },
      { id: 'support-log-2', title: 'Escalation rule changed', detail: 'Webhook failures now priority P2', time: 'May 29, 5:05 PM' },
      { id: 'support-log-3', title: 'Voice tuned', detail: 'Reduced speaking pace by 8%', time: 'May 28, 11:16 AM' },
    ],
  },
  {
    id: 'agent-lead-qualifier',
    name: 'Lead Qualifier',
    displayName: 'Enterprise Qualifier',
    status: 'Live',
    assignedNumber: '+91 80 4567 6390',
    language: 'English (US)',
    callsThisWeek: 267,
    resolutionRate: '98.1%',
    avgDuration: '3m 38s',
    uptime: '100%',
    lastActive: '11 minutes ago',
    promptPreview:
      'Identify company size, monthly call volume, buying timeline, and enterprise routing needs before creating qualified leads.',
    voiceSettings: {
      voice: 'Ava - Professional',
      pace: 'Balanced',
      language: 'English (US)',
    },
    recentCalls: [
      { id: 'qualifier-call-1', caller: '+91 XXXXX X6390', outcome: 'Enterprise qualified', duration: '3m 34s', time: '11m ago' },
      { id: 'qualifier-call-2', caller: '+91 XXXXX X5602', outcome: 'Pilot qualified', duration: '4m 02s', time: '1d ago' },
      { id: 'qualifier-call-3', caller: '+91 XXXXX X1187', outcome: 'Discovery confirmed', duration: '2m 45s', time: '1d ago' },
    ],
    activityLog: [
      { id: 'qualifier-log-1', title: 'Routing enabled', detail: 'Enterprise queue assignment active', time: 'Today, 10:10 AM' },
      { id: 'qualifier-log-2', title: 'Template updated', detail: 'Added volume threshold question', time: 'May 29, 1:26 PM' },
      { id: 'qualifier-log-3', title: 'Agent published', detail: 'Version 1.8 deployed', time: 'May 27, 4:00 PM' },
    ],
  },
  {
    id: 'agent-appointment-scheduler',
    name: 'Appointment Scheduler',
    displayName: 'Calendar Coordinator',
    status: 'Live',
    assignedNumber: '+91 80 4567 9914',
    language: 'English (India)',
    callsThisWeek: 168,
    resolutionRate: '95.6%',
    avgDuration: '2m 58s',
    uptime: '98.2%',
    lastActive: '28 minutes ago',
    promptPreview:
      'Book, reschedule, and confirm meetings. Verify timezone, attendee email, and sales owner before sending calendar invites.',
    voiceSettings: {
      voice: 'Maya - Warm',
      pace: 'Fast',
      language: 'English (India)',
    },
    recentCalls: [
      { id: 'scheduler-call-1', caller: '+91 XXXXX X1187', outcome: 'Meeting rescheduled', duration: '2m 45s', time: '28m ago' },
      { id: 'scheduler-call-2', caller: '+91 XXXXX X4532', outcome: 'Demo booked', duration: '4m 23s', time: '45m ago' },
      { id: 'scheduler-call-3', caller: '+91 XXXXX X2408', outcome: 'Callback scheduled', duration: '1m 56s', time: '3h ago' },
    ],
    activityLog: [
      { id: 'scheduler-log-1', title: 'Calendar connected', detail: 'Sales calendar availability synced', time: 'Today, 9:02 AM' },
      { id: 'scheduler-log-2', title: 'Pause window added', detail: 'Blocked weekends from scheduling', time: 'May 29, 12:12 PM' },
      { id: 'scheduler-log-3', title: 'Test call passed', detail: 'Timezone verification completed', time: 'May 28, 5:41 PM' },
    ],
  },
  {
    id: 'agent-follow-up',
    name: 'Follow-up Agent',
    displayName: 'Post-call Follow-up',
    status: 'Paused',
    assignedNumber: 'Unassigned',
    language: 'English (India)',
    callsThisWeek: 0,
    resolutionRate: '100%',
    avgDuration: '0m 00s',
    uptime: '100%',
    lastActive: 'Paused 2 days ago',
    promptPreview:
      'Call warm leads after demos, confirm next steps, and collect missing fields before routing to account executives.',
    voiceSettings: {
      voice: 'Rohan - Calm',
      pace: 'Balanced',
      language: 'English (India)',
    },
    recentCalls: [],
    activityLog: [
      { id: 'follow-log-1', title: 'Agent paused', detail: 'Paused by workspace admin', time: 'May 28, 3:04 PM' },
      { id: 'follow-log-2', title: 'Draft reviewed', detail: 'Follow-up prompt approved for testing', time: 'May 27, 2:31 PM' },
      { id: 'follow-log-3', title: 'Agent created', detail: 'Created from sales follow-up template', time: 'May 27, 1:18 PM' },
    ],
  },
]

export const profileSettingsData: UserProfileSettings = {
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@acme.example',
  phone: '+91 98765 43210',
  timezone: 'Asia/Kolkata',
  language: 'English (India)',
}

export const securitySessionsData: SecuritySession[] = [
  {
    id: 'session-1',
    device: 'Windows Desktop · Bavio App',
    location: 'Bengaluru, India',
    lastActive: 'Active now',
  },
  {
    id: 'session-2',
    device: 'Chrome on macOS',
    location: 'Mumbai, India',
    lastActive: '2 hours ago',
  },
  {
    id: 'session-3',
    device: 'Edge on Windows',
    location: 'Delhi, India',
    lastActive: 'Yesterday',
  },
]

export const loginHistoryData: LoginHistoryItem[] = [
  {
    id: 'login-1',
    event: 'Successful login',
    location: 'Bengaluru, India',
    time: 'Today, 12:08 PM',
  },
  {
    id: 'login-2',
    event: 'Password changed',
    location: 'Bengaluru, India',
    time: 'May 29, 5:12 PM',
  },
  {
    id: 'login-3',
    event: 'New device authorized',
    location: 'Mumbai, India',
    time: 'May 28, 9:44 AM',
  },
]

export const accountSettingsData: AccountSettingsData = {
  companyName: 'Acme Corp',
  industry: 'SaaS',
  website: 'https://acme.example',
  businessHours: 'Monday-Friday, 9:00 AM-6:00 PM IST',
}

export const apiKeysData: ApiKeyItem[] = [
  {
    id: 'api-key-1',
    name: 'Production API',
    keyPreview: 'bavio_live_••••••••A92F',
    created: 'May 12, 2026',
    lastUsed: '3 minutes ago',
  },
  {
    id: 'api-key-2',
    name: 'Analytics Sync',
    keyPreview: 'bavio_live_••••••••K71B',
    created: 'Apr 28, 2026',
    lastUsed: '2 hours ago',
  },
]

export const webhookUrlsData: WebhookUrlItem[] = [
  {
    id: 'webhook-1',
    name: 'Call completed',
    url: 'https://api.acme.example/webhooks/bavio/call-completed',
  },
  {
    id: 'webhook-2',
    name: 'Lead captured',
    url: 'https://api.acme.example/webhooks/bavio/lead-captured',
  },
  {
    id: 'webhook-3',
    name: 'Agent escalation',
    url: 'https://api.acme.example/webhooks/bavio/escalation',
  },
]
