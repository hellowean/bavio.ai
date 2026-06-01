import {
  accountSettingsData,
  apiKeysData,
  loginHistoryData,
  profileSettingsData,
  securitySessionsData,
  webhookUrlsData,
} from '@/api/mockData'
import {
  cloneMockData,
  simulateApiDelay,
  type DeveloperSettingsData,
  type SecuritySettingsData,
} from '@/api/types'
import type { AccountSettingsData, UserProfileSettings } from '@/types'

let profile = cloneMockData(profileSettingsData)

export async function getProfileSettings(): Promise<UserProfileSettings> {
  await simulateApiDelay()

  return cloneMockData(profile)
}

export async function updateProfileSettings(data: UserProfileSettings): Promise<UserProfileSettings> {
  await simulateApiDelay(120)

  profile = cloneMockData(data)

  return cloneMockData(profile)
}

export async function getSecuritySettings(): Promise<SecuritySettingsData> {
  await simulateApiDelay()

  return cloneMockData({
    twoFactorEnabled: true,
    sessions: securitySessionsData,
    loginHistory: loginHistoryData,
  })
}

export async function getDeveloperSettings(): Promise<DeveloperSettingsData> {
  await simulateApiDelay()

  return cloneMockData({
    apiKeys: apiKeysData,
    webhooks: webhookUrlsData,
  })
}

export async function getAccountSettings(): Promise<AccountSettingsData> {
  await simulateApiDelay()

  return cloneMockData(accountSettingsData)
}
