/**
 * Telemetry Beacon Indicator
 * Displays simulated real-time robot system telemetry status, ping latency, and battery health in the HUD.
 * 
 * Optional:
 * - Connect beacon to live robot wireless telemetry stream during competition matches.
 */

import React from 'react'
import { TEAM_TELEMETRY } from '../../data/telemetry.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

export function TelemetryBeacon({
  telemetry = TEAM_TELEMETRY,
  onBrandClick,
  className = '',
}) {
  const { isDark } = useTheme()

  const brandName = telemetry?.brandName || TEAM_TELEMETRY.brandName
  const ftcNumber = telemetry?.ftcNumber || TEAM_TELEMETRY.ftcNumber
  const roCode = telemetry?.roCode || TEAM_TELEMETRY.roCode
  const locationCity = telemetry?.locationCity || TEAM_TELEMETRY.locationCity

  return (
    <div
      className={`flex items-center space-x-1.5 sm:space-x-2.5 shrink-0 select-none ${className}`}
      aria-label={UI_STRINGS.hud.beaconAriaLabel}
    >
      {onBrandClick ? (
        <button
          type="button"
          onClick={onBrandClick}
          className={`font-display font-black tracking-wider text-xs sm:text-sm uppercase cursor-pointer transition-colors ${
            isDark
              ? 'text-white hover:text-volt'
              : 'text-obsidian hover:text-deep-berry'
          }`}
          title={UI_STRINGS.hud.brandTooltip}
        >
          {brandName}
        </button>
      ) : (
        <span
          className={`font-display font-black tracking-wider text-xs sm:text-sm uppercase ${
            isDark ? 'text-white' : 'text-obsidian'
          }`}
        >
          {brandName}
        </span>
      )}

      <span
        className={`select-none ${isDark ? 'text-white/20' : 'text-obsidian/20'}`}
        aria-hidden="true"
      >
        /
      </span>

      <span
        className={`font-mono text-xs px-2 py-0.5 rounded-full whitespace-nowrap tracking-tight font-medium border transition-colors ${
          isDark
            ? 'bg-volt/10 border-volt/20 text-volt'
            : 'bg-deep-berry/10 border-deep-berry/20 text-deep-berry'
        }`}
      >
        FTC #{ftcNumber}
      </span>

      <span
        className={`text-xs hidden md:inline-block font-mono tracking-wide whitespace-nowrap ${
          isDark ? 'text-white/50' : 'text-obsidian/60'
        }`}
      >
        {roCode} • {locationCity}
      </span>

    </div>
  )
}

export default TelemetryBeacon
