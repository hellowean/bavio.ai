import { useState } from 'react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { fieldClass, labelClass, sectionCardClass } from '@/components/settings/settingsStyles'
import type { AccountSettingsData } from '@/types'

type AccountSettingsProps = {
  initialAccount: AccountSettingsData
}

export function AccountSettings({ initialAccount }: AccountSettingsProps) {
  const [account, setAccount] = useState(initialAccount)

  const updateAccount = (field: keyof AccountSettingsData, value: string) => {
    setAccount((current) => ({ ...current, [field]: value }))
  }

  return (
    <section className={sectionCardClass}>
      <SectionHeader title="Account" description="Manage company details used by AI agents and billing workflows." />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Company Name">
          <input
            className={fieldClass}
            value={account.companyName}
            onChange={(event) => updateAccount('companyName', event.target.value)}
          />
        </Field>
        <Field label="Industry">
          <select className={fieldClass} value={account.industry} onChange={(event) => updateAccount('industry', event.target.value)}>
            <option>SaaS</option>
            <option>Healthcare</option>
            <option>Real Estate</option>
            <option>Financial Services</option>
            <option>Ecommerce</option>
          </select>
        </Field>
        <Field label="Website">
          <input className={fieldClass} value={account.website} onChange={(event) => updateAccount('website', event.target.value)} />
        </Field>
        <Field label="Business Hours">
          <input
            className={fieldClass}
            value={account.businessHours}
            onChange={(event) => updateAccount('businessHours', event.target.value)}
          />
        </Field>
      </div>
      <div className="mt-6">
        <Button type="button">Save Account</Button>
      </div>
    </section>
  )
}

function Field({ children, label }: { children: ReactNode; label: string }) {
  return (
    <label>
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  )
}

function SectionHeader({ description, title }: { description: string; title: string }) {
  return (
    <header>
      <h2 className="text-lg font-semibold text-[var(--dashboard-text)]">{title}</h2>
      <p className="mt-1 text-sm text-[var(--dashboard-muted)]">{description}</p>
    </header>
  )
}
