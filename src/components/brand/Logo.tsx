import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import bavioLogo from '@/assets/bavio-logo-clear.png'
import { cn } from '@/lib/utils'

type LogoProps = {
  size?: number
  className?: string
  imageClassName?: string
  breathe?: boolean
  rotateOnScroll?: boolean
}

export function Logo({
  breathe = true,
  className,
  imageClassName,
  rotateOnScroll = false,
  size = 32,
}: LogoProps) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scrollRotation = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360])
  const enableBreathing = breathe && !shouldReduceMotion
  const enableScrollRotation = rotateOnScroll && !shouldReduceMotion

  return (
    <motion.span
      className={cn(
        'inline-flex shrink-0 transform-gpu items-center justify-center overflow-visible rounded-lg border border-transparent bg-transparent will-change-transform',
        className,
      )}
      animate={enableBreathing ? { scale: [1, 1.04, 1] } : { scale: 1 }}
      style={{ height: size, rotate: enableScrollRotation ? scrollRotation : 0, width: size }}
      transition={
        enableBreathing
          ? {
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
            }
          : undefined
      }
    >
      <img
        alt="Bavio"
        className={cn(
          'h-full w-full select-none object-contain drop-shadow-[0_0_8px_rgba(99,102,241,0.22)] [image-rendering:auto]',
          imageClassName,
        )}
        draggable={false}
        src={bavioLogo}
      />
    </motion.span>
  )
}
