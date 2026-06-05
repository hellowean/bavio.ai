import { create } from 'zustand'

export type ToastTone = 'success' | 'error' | 'warning'

export type ToastMessage = {
  id: string
  title: string
  description?: string
  tone: ToastTone
}

type ToastState = {
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

function createToastId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = createToastId()

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }].slice(-4),
    }))

    window.setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((item) => item.id !== id),
      }))
    }, 4_200)
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}))
