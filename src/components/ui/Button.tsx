import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'gold'
  | 'soft'
  | 'outlineLight'

type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px'

const variants: Record<Variant, string> = {
  primary:
    'bg-forest-700 text-cream shadow-sm hover:bg-forest-800 hover:shadow-md dark:bg-accent dark:text-forest-950 dark:hover:bg-forest-400',
  secondary:
    'border border-forest-200 bg-surface text-forest-800 hover:border-forest-400 hover:bg-forest-50 dark:border-night-line dark:bg-transparent dark:text-forest-100 dark:hover:border-forest-600 dark:hover:bg-forest-900/40',
  ghost:
    'text-forest-800 hover:bg-forest-50 dark:text-forest-100 dark:hover:bg-forest-900/40',
  gold: 'bg-gold text-forest-950 shadow-sm hover:bg-[#c99633] hover:shadow-md',
  soft: 'bg-soft text-forest-800 hover:bg-forest-100 dark:text-forest-100 dark:hover:bg-forest-900/50',
  outlineLight:
    'border border-cream/35 text-cream hover:border-cream/70 hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.95rem] sm:h-13 sm:px-7',
}

function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: Variant
  size?: Size
  className?: string
} = {}) {
  return cn(base, variants[variant], sizes[size], className)
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant
  size?: Size
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  )
}

type ButtonLinkProps = ComponentPropsWithoutRef<'a'> & {
  variant?: Variant
  size?: Size
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonStyles({ variant, size, className })} {...props} />
  )
}
