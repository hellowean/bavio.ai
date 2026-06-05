import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useToastStore, type ToastTone } from '@/store/toastStore'

const toastToneClass: Record<ToastTone, string> = {
  error: 'border-[color:var(--dashboard-error)]/30 bg-[color:var(--dashboard-error)]/10 text-[var(--dashboard-error)]',
  success:
    'border-[color:var(--dashboard-success)]/30 bg-[color:var(--dashboard-success)]/10 text-[var(--dashboard-success)]',
  warning:
    'border-[color:var(--dashboard-warning)]/30 bg-[color:var(--dashboard-warning)]/10 text-[var(--dashboard-warning)]',
}

function ToastIcon({ tone }: { tone: ToastTone }) {
  if (tone === 'success') {
    return <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
  }

  return <AlertCircle className="h-4 w-4" aria-hidden="true" />
}

export function ToastViewport() {
  const removeToast = useToastStore((state) => state.removeToast)
  const toasts = useToastStore((state) => state.toasts)

  return (
    <div
      aria-live="polite"
      className="fixed right-5 top-5 z-[80] flex w-[min(380px,calc(100vw-2.5rem))] flex-col gap-3"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.article
            className="overflow-hidden rounded-xl border border-[var(--dashboard-border)] bg-[color:var(--dashboard-surface)]/96 p-4 shadow-[var(--dashboard-card-shadow-hover)] backdrop-blur-xl"
            key={toast.id}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start gap-3">
              <div className={cn('mt-0.5 rounded-full border p-1', toastToneClass[toast.tone])}>
                <ToastIcon tone={toast.tone} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--dashboard-text)]">{toast.title}</p>
                {toast.description ? (
                  <p className="mt-1 text-sm leading-5 text-[var(--dashboard-muted)]">{toast.description}</p>
                ) : null}
              </div>
              <Button
                aria-label="Dismiss notification"
                className="h-7 w-7 shrink-0 text-[var(--dashboard-muted)] hover:text-[var(--dashboard-text)]"
                size="icon"
                type="button"
                variant="ghost"
                onClick={() => removeToast(toast.id)}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </div>
  )
}
