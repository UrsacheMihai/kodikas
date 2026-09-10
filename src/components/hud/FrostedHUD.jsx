/**
 * Frosted Glass Navigation HUD
 * Persistent top header displaying team branding (FTC #24032 / RO090), act indicators, chapter navigator, and theme toggle.
 * 
 * Optional:
 * - Add live competition match banner or stream alert badge.
 * - Add interactive quick-action shortcuts or event notification badges.
 */

import React from 'react'
import { CHAPTERS } from '../../data/chapters.js'
import { TEAM_TELEMETRY } from '../../data/telemetry.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'
import TelemetryBeacon from './TelemetryBeacon.jsx'
import ChapterNavigator from './ChapterNavigator.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export function FrostedHUD({
  activeAct = 0,
  chapters = CHAPTERS,
  onSelectAct,
  goToAct,
  isTransitioning = false,
  telemetry = TEAM_TELEMETRY,
  onBrandClick,
  className = '',
}) {
  const { isDark } = useTheme()
  const handleBrandClick =
    onBrandClick ||
    (onSelectAct
      ? () => onSelectAct(0)
      : goToAct
        ? () => goToAct(0)
        : undefined)

  return (
    <header
      className={`hud-header fixed top-3 sm:top-5 inset-x-0 mx-auto z-50 w-[96%] max-w-6xl pointer-events-none ${className}`}
    >
      <nav
        className={`pointer-events-auto w-full glass-panel specular-sheen rounded-full px-2.5 sm:px-4 md:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-2xl hairline-border backdrop-blur-2xl transition-all duration-300 gap-1.5 sm:gap-3 ${
          isDark ? 'text-white' : 'text-obsidian'
        }`}
        aria-label={UI_STRINGS.hud.navAriaLabel}
      >
        <div className="flex items-center shrink-0">
          <TelemetryBeacon
            telemetry={telemetry}
            onBrandClick={handleBrandClick}
          />
        </div>

        <div className="flex items-center justify-center min-w-0 flex-1 px-1 sm:px-2 overflow-hidden">
          <ChapterNavigator
            activeAct={activeAct}
            chapters={chapters}
            onSelectAct={onSelectAct}
            goToAct={goToAct}
            isTransitioning={isTransitioning}
          />
        </div>

        <div className="flex items-center shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export default FrostedHUD
