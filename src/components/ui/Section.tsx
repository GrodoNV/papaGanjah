import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type SectionTone = 'paper' | 'white' | 'sage' | 'forest'

const tones: Record<SectionTone, string> = {
  paper: 'bg-paper text-ink transition-colors duration-300',
  white: 'bg-surface text-ink transition-colors duration-300',
  sage: 'bg-soft/80 text-ink transition-colors duration-300',
  forest: 'bg-primary text-cream transition-colors duration-300',
}

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  tone?: SectionTone
}

export function Section({
  tone = 'paper',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn('relative py-20 sm:py-24 lg:py-28', tones[tone], className)}
      {...props}
    />
  )
}
