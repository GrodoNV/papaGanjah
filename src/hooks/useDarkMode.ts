import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'papaganjah-theme'

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Storage can be unavailable in private browsing; fall back to the OS.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useDarkMode() {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // Persisting the preference is best-effort.
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const nextTheme = current === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(STORAGE_KEY, nextTheme)
      } catch {
        // Persisting the preference is best-effort.
      }
      return nextTheme
    })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (event: MediaQueryListEvent) => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return
      } catch {
        // If storage is unavailable, follow the OS preference.
      }
      setThemeState(event.matches ? 'dark' : 'light')
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      if (event.newValue === 'light' || event.newValue === 'dark') {
        setThemeState(event.newValue)
      }
    }

    media.addEventListener('change', handleChange)
    window.addEventListener('storage', handleStorage)

    return () => {
      media.removeEventListener('change', handleChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return {
    theme,
    isDark: theme === 'dark',
    setTheme,
    toggleTheme,
  }
}
