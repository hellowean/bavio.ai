import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { login } from '@/api/auth'
import { Logo } from '@/components/brand/Logo'
import LoginCard from '@/components/auth/LoginCard'
import { MotionPage } from '@/components/layout/MotionPage'
import { APP_NAME } from '@/lib/constants'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { useUiStore } from '@/store/uiStore'

const loginFeatures = ['Monitor calls', 'Capture leads', 'Track AI usage', 'Manage voice agents']

function LoginPage() {
  const navigate = useNavigate()
  const addToast = useToastStore((state) => state.addToast)
  const setSession = useAuthStore((state) => state.setSession)
  const theme = useUiStore((state) => state.theme)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const completeMockSignIn = async (credentials: { email: string; password: string; rememberMe: boolean }) => {
    setAuthError(null)
    setIsSubmitting(true)

    try {
      const session = await login(credentials.email, credentials.password)

      setSession(session.user, session.token)
      navigate('/overview', { replace: true })
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to sign in with those credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const completeGoogleSignIn = () => {
    setAuthError(null)
    addToast({
      title: 'Google sign-in will be available in beta.',
      tone: 'warning',
    })
  }

  return (
    <MotionPage className="grid min-h-screen bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] lg:grid-cols-[1.08fr_0.92fr]">
      <section className="relative flex min-h-[48vh] flex-col justify-between overflow-hidden border-b border-[var(--dashboard-border)] px-8 py-10 sm:px-12 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-16 xl:px-20">
        <div className="relative flex items-center gap-3">
          <Logo size={64} />
          <div>
            <p className="text-xl font-semibold tracking-tight">{APP_NAME}</p>
            <p className="mt-1 text-xs font-medium text-[var(--dashboard-muted)]">
              Voice AI Infrastructure
            </p>
          </div>
        </div>

        <div className="relative my-16 max-w-2xl lg:my-0">
          <p className="mb-5 inline-flex rounded-full border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] px-3 py-1 text-sm font-medium text-[var(--dashboard-muted)]">
            Desktop command center for AI voice operations
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[var(--dashboard-text)] sm:text-5xl">
            Manage your AI voice agents from one place.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-[var(--dashboard-muted)]">
            Sign in to monitor live conversations, review outcomes, and keep every Bavio workflow
            moving cleanly.
          </p>

          <div className="mt-10 grid max-w-lg gap-3 sm:grid-cols-2">
            {loginFeatures.map((feature) => (
              <div
                className="flex items-center gap-3 rounded-md border border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] px-4 py-3 text-sm font-medium text-[var(--dashboard-text)]"
                key={feature}
              >
                <CheckCircle2 className="h-4 w-4 text-bavio-success" aria-hidden="true" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-[var(--dashboard-muted)]">
          Built for teams running AI-first call operations.
        </p>
      </section>

      <section className="flex min-h-[52vh] items-center justify-center px-6 py-10 sm:px-10 lg:min-h-screen">
        <div className="w-full max-w-md">
          <LoginCard
            error={authError}
            isSubmitting={isSubmitting}
            onGoogleSignIn={completeGoogleSignIn}
            onSignIn={completeMockSignIn}
          />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--dashboard-subtle)]">
            <span>Version 0.1.0</span>
            <span>Copyright 2026 Bavio. All rights reserved.</span>
          </div>
        </div>
      </section>
    </MotionPage>
  )
}

export default LoginPage
