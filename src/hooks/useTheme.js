/**
 * Theme Context & Hook
 * Provides theme state (dark/light mode), persistence in localStorage, and toggles the root HTML class.
 * 
 * Optional:
 * - Add an event listener for OS-level color scheme changes (prefers-color-scheme).
 * - Extend with additional theme presets or contrast modes.
 */

import { createContext, useContext, useState, useEffect, useCallback, createElement } from 'react'

const STORAGE_KEY = 'kodikas-theme'

const ThemeContext = createContext({
  isDark: true,
  theme: 'dark',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored === 'dark') return true
        if (stored === 'light') return false
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          return false
        }
      } catch {
        void 0
      }
    }
    return true
  })

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
      } catch {
        void 0
      }
      return next
    })
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark)
      document.documentElement.classList.toggle('light', !isDark)
    }
  }, [isDark])

  return createElement(
    ThemeContext.Provider,
    { value: { isDark, theme: isDark ? 'dark' : 'light', toggleTheme } },
    children
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

export default useTheme
