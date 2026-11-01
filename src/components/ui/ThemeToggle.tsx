import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  isDark: boolean
  onToggle: () => void
  className?: string
}

export function ThemeToggle({
  isDark,
  onToggle,
  className,
}: ThemeToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Activar modo día' : 'Activar modo noche'}
      title={isDark ? 'Activar modo día' : 'Activar modo noche'}
      onClick={onToggle}
      className={cn(
        'group relative inline-flex h-9 w-[4.25rem] shrink-0 items-center justify-between rounded-full border border-line bg-field px-2 transition-colors duration-300 hover:border-forest-300 dark:hover:border-forest-700',
        className,
      )}
    >
      <Sun
        className={cn(
          'size-3.5 transition-colors duration-300',
          isDark ? 'text-subtle' : 'text-gold',
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          'size-3.5 transition-colors duration-300',
          isDark ? 'text-forest-300' : 'text-subtle',
        )}
        aria-hidden="true"
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute left-1 top-1 grid size-7 place-items-center rounded-full bg-surface text-forest-700 shadow-sm ring-1 ring-line transition-transform duration-300 dark:bg-night-card dark:text-forest-300',
          isDark && 'translate-x-[1.85rem]',
        )}
      >
        {isDark ? (
          <Moon className="size-3.5" />
        ) : (
          <Sun className="size-3.5" />
        )}
      </span>
    </button>
  )
}
