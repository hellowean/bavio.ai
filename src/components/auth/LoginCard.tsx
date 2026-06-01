import { LockKeyhole, Mail } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type LoginCredentials = {
  email: string
  password: string
  rememberMe: boolean
}

type LoginCardProps = {
  error?: string | null
  isSubmitting?: boolean
  onSignIn: (credentials: LoginCredentials) => Promise<void> | void
  onGoogleSignIn: () => Promise<void> | void
}

function LoginCard({ error, isSubmitting = false, onSignIn, onGoogleSignIn }: LoginCardProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSignIn({ email, password, rememberMe })
  }

  return (
    <section className="w-full max-w-md rounded-2xl border border-[var(--dashboard-border)] bg-[color:var(--dashboard-surface)]/96 p-8 shadow-[var(--dashboard-card-shadow-hover)] backdrop-blur-xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-[var(--dashboard-accent)]">Welcome back</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--dashboard-text)]">
          Sign in to Bavio
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--dashboard-muted)]">
          Access calls, agents, leads, usage, and billing from your desktop workspace.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--dashboard-text)]" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--dashboard-subtle)]"
              aria-hidden="true"
            />
            <input
              id="email"
              className="h-11 w-full rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)]/75 pl-10 pr-3 text-sm text-[var(--dashboard-text)] outline-none transition placeholder:text-[var(--dashboard-subtle)] hover:border-[color:var(--dashboard-accent)]/25 focus:border-[var(--dashboard-accent)] focus:[box-shadow:var(--dashboard-focus-ring)]"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              required
              type="email"
              value={email}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--dashboard-text)]" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <LockKeyhole
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--dashboard-subtle)]"
              aria-hidden="true"
            />
            <input
              id="password"
              className="h-11 w-full rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)]/75 pl-10 pr-3 text-sm text-[var(--dashboard-text)] outline-none transition placeholder:text-[var(--dashboard-subtle)] hover:border-[color:var(--dashboard-accent)]/25 focus:border-[var(--dashboard-accent)] focus:[box-shadow:var(--dashboard-focus-ring)]"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              type="password"
              value={password}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label
            className="flex items-center gap-2 text-sm text-[var(--dashboard-muted)]"
            htmlFor="remember-me"
          >
            <input
              id="remember-me"
              className="h-4 w-4 rounded border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] accent-[var(--dashboard-accent)]"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              type="checkbox"
            />
            Remember me
          </label>
          <button
            className="text-sm font-semibold text-[var(--dashboard-accent)] transition-colors hover:text-[var(--dashboard-accent-hover)]"
            type="button"
          >
            Forgot password?
          </button>
        </div>

        {error ? (
          <p className="rounded-md border border-[color:var(--dashboard-error)]/25 bg-[color:var(--dashboard-error)]/10 px-3 py-2 text-sm text-[var(--dashboard-error)]">
            {error}
          </p>
        ) : null}

        <Button className="h-11 w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>

        <Button
          className={cn(
            'h-11 w-full border border-[var(--dashboard-border)] bg-transparent text-[var(--dashboard-text)]',
            'hover:bg-[var(--dashboard-surface-raised)]',
          )}
          disabled={isSubmitting}
          onClick={onGoogleSignIn}
          type="button"
          variant="secondary"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-900">
            G
          </span>
          Continue with Google
        </Button>
      </form>
    </section>
  )
}

export default LoginCard
