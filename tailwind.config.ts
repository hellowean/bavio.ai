import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        bavio: {
          background: 'rgb(var(--bavio-app-background) / <alpha-value>)',
          sidebar: 'rgb(var(--bavio-sidebar) / <alpha-value>)',
          card: 'rgb(var(--bavio-card) / <alpha-value>)',
          elevated: 'rgb(var(--bavio-elevated-surface) / <alpha-value>)',
          primary: 'rgb(var(--bavio-primary-accent) / <alpha-value>)',
          'accent-hover': 'rgb(var(--bavio-accent-hover) / <alpha-value>)',
          success: 'rgb(var(--bavio-success-green) / <alpha-value>)',
          warning: 'rgb(var(--bavio-warning-amber) / <alpha-value>)',
          error: 'rgb(var(--bavio-error-red) / <alpha-value>)',
          'text-primary': 'rgb(var(--bavio-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--bavio-text-secondary) / <alpha-value>)',
          border: 'rgb(var(--bavio-border) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [animate],
} satisfies Config
