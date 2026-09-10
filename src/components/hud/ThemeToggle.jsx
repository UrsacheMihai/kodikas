/**
 * Theme Toggle Button
 * Interactive toggle button switching between dark and light themes with animated icons.
 * 
 * Optional:
 * - Add haptic vibration feedback on mobile or custom icon rotation animations.
 */

import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme.js'
import { UI_STRINGS } from '../../data/ui-strings.js'

export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  const label = isDark ? UI_STRINGS.theme.lightLabel : UI_STRINGS.theme.darkLabel

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] rounded-full border transition-all duration-300 cursor-pointer select-none ${
        isDark
          ? 'glass-panel border-white/10 text-white hover:border-volt/40 hover:bg-volt/10 shadow-lg'
          : 'glass-panel border-black/10 text-obsidian hover:border-deep-berry/40 hover:bg-deep-berry/10 shadow-lg'
      } ${className}`}
      aria-label={UI_STRINGS.theme.toggleAriaLabel}
      title={label}
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-volt transition-transform duration-300 rotate-0 hover:rotate-12" />
      ) : (
        <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-deep-berry transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  )
}

export default ThemeToggle
