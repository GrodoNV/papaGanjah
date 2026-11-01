import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant =
  | 'verified'
  | 'neutral'
  | 'gold'
  | 'soft'
  | 'outlineLight'

const variants: Record<BadgeVariant, string> = {
  verified:
    'border-forest-200 bg-forest-50 text-forest-700 [&_svg]:text-forest-600 dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:[&_svg]:text-emerald-400',
  neutral:
    'border-line bg-field text-subtle [&_svg]:text-subtle dark:border-night-line dark:bg-field dark:text-subtle',
  gold: 'border-gold/40 bg-gold/10 text-[#8a6415] dark:text-gold [&_svg]:text-gold',
  soft: 'border-transparent bg-soft text-forest-700 dark:text-forest-200 [&_svg]:text-forest-600 dark:[&_svg]:text-forest-300',
  outlineLight:
    'border-cream/25 bg-white/5 text-cream [&_svg]:text-forest-200',
}

type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  variant?: BadgeVariant
}

export function Badge({
  variant = 'neutral',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
