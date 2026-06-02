import bavioLogoOnDark from '@/assets/bavio-logo-on-dark.png'
import bavioLogoOnLight from '@/assets/bavio-logo-on-light.png'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/store/uiStore'

type LogoProps = {
  size?: number
  className?: string
  imageClassName?: string
}

export function Logo({ className, imageClassName, size = 32 }: LogoProps) {
  const theme = useUiStore((state) => state.theme)
  const imageClasses = cn(
    'absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-200 ease-in-out [image-rendering:auto]',
    imageClassName,
  )

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-visible bg-transparent opacity-100 transition-opacity duration-150 ease-in-out hover:opacity-85',
        className,
      )}
      style={{ height: size, width: size }}
    >
      <img
        alt="Bavio"
        className={cn(imageClasses, theme === 'dark' ? 'opacity-100' : 'opacity-0')}
        draggable={false}
        src={bavioLogoOnDark}
      />
      <img
        alt=""
        aria-hidden="true"
        className={cn(imageClasses, theme === 'light' ? 'opacity-100' : 'opacity-0')}
        draggable={false}
        src={bavioLogoOnLight}
      />
    </span>
  )
}
