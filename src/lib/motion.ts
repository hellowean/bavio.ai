import type { Variants } from 'framer-motion'

const easeOut = [0.22, 1, 0.36, 1] as const

export const listContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
      delayChildren: 0,
    },
  },
}

export const listItem: Variants = {
  hidden: { opacity: 1, y: 3 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.14,
      ease: easeOut,
    },
  },
}

export const softScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.005,
    transition: {
      duration: 0.12,
      ease: easeOut,
    },
  },
}
