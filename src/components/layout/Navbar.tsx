import {
  Heart,
  Menu,
  ShieldCheck,
  UserPlus,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { navigation, site } from '@/data/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled()
  const { isDark, toggleTheme } = useDarkMode()
  const sectionIds = useMemo(() => navigation.map((item) => item.id), [])
  const active = useActiveSection(sectionIds, 'inicio')

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <div className="bg-primary text-cream">
        <Container className="flex h-10 items-center justify-between gap-4 text-[11px] font-medium tracking-wide">
          <p className="flex min-w-0 items-center gap-2">
            <ShieldCheck className="size-3.5 shrink-0 text-forest-200" />
            <span className="truncate">
              Colectivo pro-cannabis legal · Colaboración institucional
              verificable
            </span>
          </p>
          <p className="hidden shrink-0 items-center gap-4 text-forest-200/90 sm:flex">
            <span>Contenido informativo</span>
            <span className="h-3 w-px bg-cream/20" />
            <span>Mayores de 18 años</span>
          </p>
        </Container>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 border-b bg-surface/90 backdrop-blur-md transition-colors duration-300',
          scrolled
            ? 'border-line shadow-[0_10px_30px_-24px_rgba(15,23,42,0.5)]'
            : 'border-transparent',
        )}
      >
        <Container className="flex h-[4.5rem] items-center justify-between gap-6">
          <a
            href="#inicio"
            className="rounded-xl"
            aria-label="Papá Ganjah — Ir al inicio"
          >
            <Logo />
          </a>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Navegación principal"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={active === item.id ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors',
                  active === item.id
                    ? 'bg-soft text-forest-800 dark:text-forest-100'
                    : 'text-muted hover:bg-field hover:text-forest-800 dark:hover:text-forest-100',
                  item.id === 'donar' &&
                    active !== item.id &&
                    'text-clay dark:text-[#e8a17f]',
                )}
              >
                {item.id === 'donar' && <Heart className="size-3.5" />}
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <ButtonLink href="#afiliate" size="sm" variant="primary">
              <UserPlus className="size-4" />
              Únete al colectivo
            </ButtonLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-field"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </Container>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="animate-slide-up border-t border-line bg-surface lg:hidden"
          >
            <Container className="py-5">
              <nav className="grid gap-1" aria-label="Navegación móvil">
                {navigation.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === item.id ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                      active === item.id
                        ? 'bg-soft text-forest-800 dark:text-forest-100'
                        : 'text-muted hover:bg-field hover:text-ink',
                    )}
                  >
                    {item.label}
                    {item.id === 'donar' && (
                      <Heart className="size-4 text-clay dark:text-[#e8a17f]" />
                    )}
                  </a>
                ))}
              </nav>
              <div className="mt-4 grid gap-2">
                <ButtonLink
                  href="#afiliate"
                  onClick={() => setMenuOpen(false)}
                  size="md"
                >
                  <UserPlus className="size-4" />
                  Únete al colectivo
                </ButtonLink>
                <ButtonLink
                  href="#donar"
                  onClick={() => setMenuOpen(false)}
                  variant="secondary"
                  size="md"
                >
                  <Heart className="size-4" />
                  Hacer un donativo
                </ButtonLink>
              </div>
              <p className="mt-4 flex items-center gap-2 px-1 text-xs text-subtle">
                <ShieldCheck className="size-4 text-forest-600 dark:text-forest-400" />
                {site.city} · Mayores de 18 años
              </p>
            </Container>
          </div>
        )}
      </header>
    </>
  )
}
