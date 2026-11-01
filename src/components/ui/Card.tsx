import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export function Card({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-line bg-card shadow-card transition-colors duration-300',
        className,
      )}
      {...props}
    />
  )
}
