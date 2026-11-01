import { cn } from '@/lib/utils'

type LogoProps = {
  tone?: 'dark' | 'light'
  className?: string
  compact?: boolean
}

function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g transform="translate(32 41)">
        {[-58, -29, 0, 29, 58].map((rotation) => (
          <ellipse
            key={rotation}
            cx="0"
            cy="-16"
            rx="5.6"
            ry="15"
            fill="currentColor"
            transform={`rotate(${rotation})`}
          />
        ))}
      </g>
      <path
        d="M32 40v15"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M32 47c-3.5 0-6-2.2-7-5M32 47c3.5 0 6-2.2 7-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  )
}

export function Logo({ tone = 'dark', className, compact = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'relative grid size-11 shrink-0 place-items-center rounded-2xl',
          tone === 'light'
            ? 'bg-cream text-forest-800'
            : 'bg-forest-700 text-cream',
        )}
      >
        <LeafMark className="size-7" />
        <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-gold ring-2 ring-white/90" />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            'text-[1.15rem] font-extrabold tracking-tight',
            tone === 'light' ? 'text-cream' : 'text-ink',
          )}
        >
          Papá Ganjah
        </span>
        {!compact && (
          <span
            className={cn(
              'mt-1.5 text-[9px] font-bold uppercase tracking-[0.24em]',
              tone === 'light' ? 'text-forest-200' : 'text-forest-600',
            )}
          >
            Colectivo ciudadano
          </span>
        )}
      </span>
    </div>
  )
}
