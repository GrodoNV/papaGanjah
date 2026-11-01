import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  action,
  className,
}: SectionHeadingProps) {
  const isDark = tone === 'dark'

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        action && 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div
        className={cn(
          'max-w-3xl',
          align === 'center' && 'mx-auto text-center',
        )}
      >
        {eyebrow && (
          <p
            className={cn(
              'mb-4 inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em]',
              isDark ? 'text-forest-200' : 'text-forest-600',
            )}
          >
            <span
              className={cn(
                'h-px w-7',
                isDark ? 'bg-forest-300/60' : 'bg-forest-500/50',
              )}
            />
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            'text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]',
            isDark ? 'text-cream' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg',
              isDark ? 'text-forest-100/80' : 'text-muted',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
