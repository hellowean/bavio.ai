import { useState } from 'react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
          <Select value={profile.timezone} onValueChange={(value) => updateProfile('timezone', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
              <SelectItem value="Asia/Singapore">Asia/Singapore</SelectItem>
              <SelectItem value="Europe/London">Europe/London</SelectItem>
              <SelectItem value="America/New_York">America/New_York</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Language">
          <Select value={profile.language} onValueChange={(value) => updateProfile('language', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English (India)">English (India)</SelectItem>
              <SelectItem value="English (US)">English (US)</SelectItem>
              <SelectItem value="Hindi + English">Hindi + English</SelectItem>
            </SelectContent>
          </Select>
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
