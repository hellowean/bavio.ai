import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, PhoneCall, Plus, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { VoiceAgent } from '@/types'

type CreateAgentModalProps = {
  open: boolean
  onClose: () => void
  onCreate: (agent: VoiceAgent) => Promise<void> | void
}

type NewAgentForm = {
  name: string
  displayName: string
  language: string
  industryTemplate: string
  voice: string
  pace: string
  businessInfo: string
  faq: string
  phoneNumber: string
}

const steps = ['Identity', 'Voice', 'Knowledge', 'Launch'] as const

const inputClass =
  'h-10 w-full rounded-md border border-[var(--dashboard-border)] bg-transparent px-3 text-sm text-[var(--dashboard-text)] outline-none transition placeholder:text-[var(--dashboard-muted)] focus:border-[var(--dashboard-accent)] focus:ring-2 focus:ring-[color:var(--dashboard-accent)]/20'

const textareaClass =
  'min-h-28 w-full rounded-md border border-[var(--dashboard-border)] bg-transparent px-3 py-3 text-sm text-[var(--dashboard-text)] outline-none transition placeholder:text-[var(--dashboard-muted)] focus:border-[var(--dashboard-accent)] focus:ring-2 focus:ring-[color:var(--dashboard-accent)]/20'

const selectTriggerClass = 'w-full rounded-md'

export function CreateAgentModal({ open, onClose, onCreate }: CreateAgentModalProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<NewAgentForm>({
    name: 'Product Demo Agent',
    displayName: 'Bavio Demo Concierge',
    language: 'English (India)',
    industryTemplate: 'SaaS Sales',
    voice: 'Maya - Warm',
    pace: 'Balanced',
    businessInfo: 'Bavio helps SaaS teams automate inbound and outbound voice workflows with AI agents.',
    faq: 'Pricing, demos, integrations, implementation timeline, and support availability.',
    phoneNumber: '+91 80 4567 7741',
  })

  const currentStep = steps[stepIndex]
  const canGoBack = stepIndex > 0
  const canGoNext = stepIndex < steps.length - 1

  const previewAgent = useMemo<VoiceAgent>(
    () => ({
      id: `agent-${form.name.toLowerCase().replaceAll(' ', '-') || 'new'}`,
      name: form.name || 'New Agent',
      displayName: form.displayName || form.name || 'New Agent',
      status: 'Draft',
      assignedNumber: form.phoneNumber,
      language: form.language,
      callsThisWeek: 0,
      resolutionRate: '0%',
      avgDuration: '0m 00s',
      uptime: '100%',
      lastActive: 'Draft created just now',
      promptPreview: form.businessInfo || 'Draft prompt will appear here after business information is added.',
      voiceSettings: {
        voice: form.voice,
        pace: form.pace,
        language: form.language,
      },
      recentCalls: [],
      activityLog: [
        {
          id: 'new-agent-log-1',
          title: 'Agent draft created',
          detail: 'Created locally from the setup wizard',
          time: 'Just now',
        },
      ],
    }),
    [form],
  )

  const updateForm = (field: keyof NewAgentForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleCreate = async () => {
    await onCreate(previewAgent)
    setStepIndex(0)
    onClose()
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            aria-label="Close create agent modal"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.section
            className="absolute left-1/2 top-1/2 flex max-h-[88vh] w-[min(760px,calc(100vw-48px))] flex-col overflow-hidden rounded-2xl border border-[var(--dashboard-border)] bg-[color:var(--dashboard-surface)]/98 shadow-[var(--dashboard-card-shadow-hover)] backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.97, x: '-50%', y: '-48%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.97, x: '-50%', y: '-48%' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
        <header className="flex items-start justify-between gap-4 border-b border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] px-6 py-5">
          <div>
            <p className="text-sm font-medium text-[var(--dashboard-muted)]">Create Agent</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--dashboard-text)]">{currentStep}</h2>
          </div>
          <Button
            aria-label="Close modal"
            className="text-[var(--dashboard-muted)] hover:text-[var(--dashboard-text)]"
            size="icon"
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </header>

        <div className="border-b border-[var(--dashboard-border)] px-6 py-4">
          <div className="grid grid-cols-4 gap-3">
            {steps.map((step, index) => (
              <div
                className={`rounded-md border px-3 py-2 ${
                  index === stepIndex
                    ? 'border-[var(--dashboard-accent)] bg-[color:var(--dashboard-accent)]/10 text-[var(--dashboard-text)]'
                    : 'border-[var(--dashboard-border)] text-[var(--dashboard-muted)]'
                }`}
                key={step}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em]">Step {index + 1}</p>
                <p className="mt-1 text-sm font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 'Identity' ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Agent name">
                <input className={inputClass} value={form.name} onChange={(event) => updateForm('name', event.target.value)} />
              </Field>
              <Field label="Display name">
                <input
                  className={inputClass}
                  value={form.displayName}
                  onChange={(event) => updateForm('displayName', event.target.value)}
                />
              </Field>
              <Field label="Language">
                <Select value={form.language} onValueChange={(value) => updateForm('language', value)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English (India)">English (India)</SelectItem>
                    <SelectItem value="English (US)">English (US)</SelectItem>
                    <SelectItem value="Hindi + English">Hindi + English</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Industry template">
                <Select value={form.industryTemplate} onValueChange={(value) => updateForm('industryTemplate', value)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SaaS Sales">SaaS Sales</SelectItem>
                    <SelectItem value="Customer Support">Customer Support</SelectItem>
                    <SelectItem value="Healthcare Scheduling">Healthcare Scheduling</SelectItem>
                    <SelectItem value="Real Estate Leads">Real Estate Leads</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          ) : null}

          {currentStep === 'Voice' ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Voice selector">
                <Select value={form.voice} onValueChange={(value) => updateForm('voice', value)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maya - Warm">Maya - Warm</SelectItem>
                    <SelectItem value="Rohan - Calm">Rohan - Calm</SelectItem>
                    <SelectItem value="Ava - Professional">Ava - Professional</SelectItem>
                    <SelectItem value="Noah - Energetic">Noah - Energetic</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Speaking pace">
                <Select value={form.pace} onValueChange={(value) => updateForm('pace', value)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select pace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Slow">Slow</SelectItem>
                    <SelectItem value="Measured">Measured</SelectItem>
                    <SelectItem value="Balanced">Balanced</SelectItem>
                    <SelectItem value="Fast">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          ) : null}

          {currentStep === 'Knowledge' ? (
            <div className="grid grid-cols-1 gap-4">
              <Field label="Business info">
                <textarea
                  className={textareaClass}
                  value={form.businessInfo}
                  onChange={(event) => updateForm('businessInfo', event.target.value)}
                />
              </Field>
              <Field label="FAQ">
                <textarea className={textareaClass} value={form.faq} onChange={(event) => updateForm('faq', event.target.value)} />
              </Field>
            </div>
          ) : null}

          {currentStep === 'Launch' ? (
            <div className="grid grid-cols-1 gap-4">
              <Field label="Phone number">
                <Select value={form.phoneNumber} onValueChange={(value) => updateForm('phoneNumber', value)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select phone number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91 80 4567 7741">+91 80 4567 7741</SelectItem>
                    <SelectItem value="+91 80 4567 2801">+91 80 4567 2801</SelectItem>
                    <SelectItem value="+91 80 4567 6409">+91 80 4567 6409</SelectItem>
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <div className="rounded-md border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] p-4">
                <h3 className="text-sm font-semibold text-[var(--dashboard-text)]">Launch checklist</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--dashboard-muted)]">
                  Test the agent voice, verify the phone number, then create the draft agent. Backend publishing will be added later.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button type="button" variant="secondary">
                    <PhoneCall className="h-4 w-4" aria-hidden="true" />
                    Test Call
                  </Button>
                  <Button type="button" onClick={handleCreate}>
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Create Agent
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <footer className="flex items-center justify-between gap-4 border-t border-[var(--dashboard-border)] p-6">
          <Button disabled={!canGoBack} type="button" variant="ghost" onClick={() => setStepIndex((index) => Math.max(0, index - 1))}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Button>
          <Button
            disabled={!canGoNext}
            type="button"
            variant={canGoNext ? 'default' : 'secondary'}
            onClick={() => setStepIndex((index) => Math.min(steps.length - 1, index + 1))}
          >
            Next
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </footer>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Field({ children, label }: { children: ReactNode; label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[var(--dashboard-muted)]">{label}</span>
      {children}
    </label>
  )
}
