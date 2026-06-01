import { useState } from 'react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { fieldClass, labelClass, sectionCardClass } from '@/components/settings/settingsStyles'
import type { UserProfileSettings } from '@/types'

type ProfileSettingsProps = {
  initialProfile: UserProfileSettings
  onSave?: (profile: UserProfileSettings) => Promise<UserProfileSettings> | void
}

export function ProfileSettings({ initialProfile, onSave }: ProfileSettingsProps) {
  const [profile, setProfile] = useState(initialProfile)

  const updateProfile = (field: keyof UserProfileSettings, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  return (
    <section className={sectionCardClass}>
      <SectionHeader title="Profile" description="Manage personal contact details and locale preferences." />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Full Name">
          <input className={fieldClass} value={profile.fullName} onChange={(event) => updateProfile('fullName', event.target.value)} />
        </Field>
        <Field label="Email">
          <input className={fieldClass} value={profile.email} onChange={(event) => updateProfile('email', event.target.value)} />
        </Field>
        <Field label="Phone">
          <input className={fieldClass} value={profile.phone} onChange={(event) => updateProfile('phone', event.target.value)} />
        </Field>
        <Field label="Timezone">
          <select className={fieldClass} value={profile.timezone} onChange={(event) => updateProfile('timezone', event.target.value)}>
            <option>Asia/Kolkata</option>
            <option>Asia/Singapore</option>
            <option>Europe/London</option>
            <option>America/New_York</option>
          </select>
        </Field>
        <Field label="Language">
          <select className={fieldClass} value={profile.language} onChange={(event) => updateProfile('language', event.target.value)}>
            <option>English (India)</option>
            <option>English (US)</option>
            <option>Hindi + English</option>
          </select>
        </Field>
      </div>
      <div className="mt-6">
        <Button type="button" onClick={() => void onSave?.(profile)}>Save Changes</Button>
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
