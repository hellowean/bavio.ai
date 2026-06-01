import { Copy, KeyRound, Plus } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { sectionCardClass } from '@/components/settings/settingsStyles'
import type { ApiKeyItem, WebhookUrlItem } from '@/types'

type DeveloperSettingsProps = {
  apiKeys: ApiKeyItem[]
  webhooks: WebhookUrlItem[]
}

export function DeveloperSettings({ apiKeys, webhooks }: DeveloperSettingsProps) {
  const [keys, setKeys] = useState(apiKeys)

  const handleCreateKey = () => {
    setKeys((current) => [
      {
        id: `api-key-${current.length + 1}`,
        name: 'New API Key',
        keyPreview: 'bavio_live_••••••••N3W1',
        created: 'Just now',
        lastUsed: 'Never',
      },
      ...current,
    ])
  }

  return (
    <div className="space-y-5">
      <section className={sectionCardClass}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <SectionHeader title="Developer" description="Manage API access and outbound webhook destinations." />
          <Button type="button" onClick={handleCreateKey}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Create API Key
          </Button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--dashboard-border)]">
                {['Name', 'Key', 'Created', 'Last Used', 'Actions'].map((header) => (
                  <th
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--dashboard-muted)]"
                    key={header}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keys.length > 0 ? (
                keys.map((key) => (
                  <tr className="border-b border-[var(--dashboard-border)] last:border-b-0" key={key.id}>
                    <td className="px-4 py-4 text-sm font-semibold text-[var(--dashboard-text)]">{key.name}</td>
                    <td className="px-4 py-4">
                      <Badge tone="muted">{key.keyPreview}</Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-[var(--dashboard-muted)]">{key.created}</td>
                    <td className="px-4 py-4 text-sm text-[var(--dashboard-muted)]">{key.lastUsed}</td>
                    <td className="px-4 py-4">
                      <Button className="h-8 px-2" type="button" variant="ghost">
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        Copy
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-5" colSpan={5}>
                    <EmptyState
                      className="min-h-[180px]"
                      title="No API keys"
                      description="Create an API key when you are ready to connect Bavio to internal systems."
                      action={
                        <Button type="button" onClick={handleCreateKey}>
                          <Plus className="h-4 w-4" aria-hidden="true" />
                          Create API Key
                        </Button>
                      }
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={sectionCardClass}>
        <SectionHeader title="Webhook URLs" description="Receive real-time Bavio events in your systems." />
        {webhooks.length > 0 ? (
          <div className="mt-5 space-y-3">
            {webhooks.map((webhook) => (
              <article
                className="flex flex-col gap-3 rounded-md bg-[var(--dashboard-surface-raised)] p-4 md:flex-row md:items-center md:justify-between"
                key={webhook.id}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-[var(--dashboard-accent)]" aria-hidden="true" />
                    <p className="text-sm font-semibold text-[var(--dashboard-text)]">{webhook.name}</p>
                  </div>
                  <p className="mt-2 truncate text-sm text-[var(--dashboard-muted)]">{webhook.url}</p>
                </div>
                <Button className="h-9 shrink-0 px-3" type="button" variant="secondary">
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copy
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <EmptyState
              className="min-h-[180px]"
              title="No webhook URLs"
              description="Webhook destinations will appear here after you add endpoints for Bavio events."
            />
          </div>
        )}
      </section>
    </div>
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
