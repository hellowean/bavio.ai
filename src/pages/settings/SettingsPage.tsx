import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import {
  getAccountSettings,
  getDeveloperSettings,
  getProfileSettings,
  getSecuritySettings,
  updateProfileSettings,
} from '@/api/settings'
import type { SettingsPageData } from '@/api/types'
import { AccountSettings } from '@/components/settings/AccountSettings'
import { AppearanceSettings } from '@/components/settings/AppearanceSettings'
import { DeveloperSettings } from '@/components/settings/DeveloperSettings'
import { MotionPage } from '@/components/layout/MotionPage'
import { SettingsPageSkeleton } from '@/components/layout/PageSkeleton'
import { ProfileSettings } from '@/components/settings/ProfileSettings'
import { SecuritySettings } from '@/components/settings/SecuritySettings'
import { SettingsSidebar } from '@/components/settings/SettingsSidebar'
import type { SettingsSectionId, UserProfileSettings } from '@/types'

function SettingsPage() {
  const queryClient = useQueryClient()
  const { data, isPending } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const [profile, security, account, developer] = await Promise.all([
        getProfileSettings(),
        getSecuritySettings(),
        getAccountSettings(),
        getDeveloperSettings(),
      ])

      return { profile, security, account, developer }
    },
  })
  const [activeSection, setActiveSection] = useState<SettingsSectionId>('profile')
  const handleSaveProfile = useCallback(async (profile: UserProfileSettings) => {
    const updatedProfile = await updateProfileSettings(profile)

    queryClient.setQueryData<SettingsPageData>(['settings'], (currentData) =>
      currentData ? { ...currentData, profile: updatedProfile } : currentData,
    )

    return updatedProfile
  }, [queryClient])

  if (isPending || !data) {
    return <SettingsPageSkeleton />
  }

  return (
    <MotionPage className="px-8 py-9">
      <header>
        <h1 className="text-[28px] font-semibold leading-tight tracking-normal text-[var(--dashboard-text)]">
          Settings
        </h1>
        <p className="mt-2 max-w-3xl text-base text-[var(--dashboard-muted)]">
          Manage account, profile, security, appearance, and developer settings.
        </p>
      </header>

      <div className="mt-9 grid grid-cols-1 gap-6 xl:grid-cols-[248px_minmax(0,1fr)]">
        <SettingsSidebar activeSection={activeSection} onChange={setActiveSection} />
        <div className="min-w-0">
          {activeSection === 'profile' ? (
            <ProfileSettings initialProfile={data.profile} onSave={handleSaveProfile} />
          ) : null}
          {activeSection === 'security' ? (
            <SecuritySettings
              initialTwoFactorEnabled={data.security.twoFactorEnabled}
              loginHistory={data.security.loginHistory}
              sessions={data.security.sessions}
            />
          ) : null}
          {activeSection === 'appearance' ? <AppearanceSettings /> : null}
          {activeSection === 'account' ? <AccountSettings initialAccount={data.account} /> : null}
          {activeSection === 'developer' ? (
            <DeveloperSettings apiKeys={data.developer.apiKeys} webhooks={data.developer.webhooks} />
          ) : null}
        </div>
      </div>
    </MotionPage>
  )
}

export default SettingsPage
