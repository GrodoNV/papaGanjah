import { X } from 'lucide-react'
import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

type ModalSize = 'md' | 'lg' | 'xl'

const sizes: Record<ModalSize, string> = {
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-5xl',
}

type ModalProps = {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  children: ReactNode
  footer?: ReactNode
  size?: ModalSize
  bodyClassName?: string
}

export function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  size = 'lg',
  bodyClassName,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 30)

    const getFocusable = () => {
      if (!panelRef.current) return []
      return Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (!focusable.length) {
        event.preventDefault()
        panelRef.current?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 animate-fade-in bg-forest-950/70 backdrop-blur-sm dark:bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          'relative z-10 flex max-h-[92dvh] w-full animate-scale-in flex-col overflow-hidden rounded-t-[1.75rem] bg-surface shadow-soft outline-none sm:rounded-3xl',
          sizes[size],
        )}
      >
        <div className="flex items-start gap-4 border-b border-line px-5 py-5 sm:px-7 sm:py-6">
          {icon && (
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-soft text-forest-700 dark:text-forest-200">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2
              id={titleId}
              className="text-lg font-extrabold tracking-tight text-ink sm:text-xl"
            >
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="mt-1.5 text-pretty text-sm leading-relaxed text-subtle"
              >
                {description}
              </p>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-full text-subtle transition-colors hover:bg-field hover:text-ink"
            aria-label="Cerrar ventana"
          >
            <X className="size-5" />
          </button>
        </div>

        <div
          className={cn(
            'min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7',
            bodyClassName,
          )}
        >
          {children}
        </div>

        {footer && (
          <div className="border-t border-line bg-field/70 px-5 py-4 sm:px-7 dark:bg-night-card/40">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
