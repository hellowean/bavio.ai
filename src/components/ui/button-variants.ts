import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--dashboard-accent)]/30 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--dashboard-accent)] text-white shadow-[0_8px_20px_color-mix(in_srgb,var(--dashboard-accent)_14%,transparent)] hover:bg-[var(--dashboard-accent-hover)]',
        secondary:
          'border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-raised)] text-[var(--dashboard-text)] shadow-sm hover:border-[color:var(--dashboard-accent)]/35 hover:bg-[color:var(--dashboard-accent)]/10',
        ghost:
          'text-[var(--dashboard-muted)] hover:bg-[var(--dashboard-surface-raised)] hover:text-[var(--dashboard-text)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
