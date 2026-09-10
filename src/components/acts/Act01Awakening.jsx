/**
 * Act 01: Awakening (Hero Landing)
 * Presents the team identity, season title, hero call-to-actions, and interactive quick-start buttons.
 * 
 * Optional:
 * - Embed background competition video reel or 3D particle hero effect.
 * - Customize action buttons to direct visitors to specific recruitment or sponsorship links.
 */

import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { TEAM_TELEMETRY } from '../../data/telemetry.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

export function Act01Awakening({
  isActive = true,
  isEntering = false,
  direction = 1,
  onNext,
  onGoToAct,
}) {
  const { isDark } = useTheme()

  const handleEnter = () => {
    if (typeof onNext === 'function') {
      onNext()
    } else if (typeof onGoToAct === 'function') {
      onGoToAct(1)
    }
  }

  return (
    <section
      className="act-stage-0 relative w-full min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 text-center select-none overflow-y-auto"
      aria-label={UI_STRINGS.act01.ariaLabel}
      data-active={isActive}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] md:w-[720px] h-[340px] sm:h-[480px] md:h-[600px] ambient-glow-volt pointer-events-none -z-10 opacity-70 blur-3xl transition-opacity duration-1000"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 right-1/4 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] ambient-glow-fuchsia pointer-events-none -z-10 opacity-40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6 sm:space-y-8 my-auto">
        <div
          className={`inline-flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-1.5 rounded-full pill-badge glass-panel border ${
            isDark ? 'border-white/10 text-volt' : 'border-slate-300/60 text-slate-800'
          } text-xs sm:text-sm font-mono tracking-wide shadow-lg`}
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-volt animate-pulse" />
          <span>{`FTC #${TEAM_TELEMETRY.ftcNumber}`}</span>
          <span className={isDark ? 'text-white/30' : 'text-slate-400'}>•</span>
          <span className={isDark ? 'text-white/90' : 'text-slate-900 font-semibold'}>
            {TEAM_TELEMETRY.roCode}
          </span>
          <span className={`${isDark ? 'text-white/30' : 'text-slate-400'} hidden xs:inline`}>•</span>
          <span className={`${isDark ? 'text-white/60' : 'text-slate-600'} hidden xs:inline uppercase`}>
            {TEAM_TELEMETRY.location}
          </span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h1
            className={`font-display font-black tracking-tighter text-5xl sm:text-7xl md:text-9xl ${
              isDark ? 'text-white' : 'text-slate-950'
            } uppercase leading-none drop-shadow-2xl`}
          >
            {UI_STRINGS.act01.heroTitle}
          </h1>
          <p
            className={`font-display font-medium text-xs sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.35em] ${
              isDark ? 'text-white/60' : 'text-slate-600'
            } uppercase`}
          >
            {UI_STRINGS.act01.heroSubtitle}
          </p>
        </div>

        <p
          className={`font-sans text-base sm:text-xl md:text-2xl ${
            isDark ? 'text-studio-silver' : 'text-slate-700'
          } max-w-2xl mx-auto font-light leading-relaxed px-2`}
        >
          {TEAM_TELEMETRY.tagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 sm:pt-4 w-full max-w-md">
          <button
            type="button"
            onClick={handleEnter}
            className="group relative w-full sm:w-auto px-8 py-4 min-h-[48px] rounded-full bg-volt text-obsidian font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(179,250,58,0.35)] hover:shadow-[0_0_45px_rgba(179,250,58,0.6)] hover:bg-[#c6fc6c] active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label={UI_STRINGS.act01.ctaAriaLabel}
          >
            <span>{UI_STRINGS.act01.ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <div
            className={`inline-flex items-center px-4 py-3 min-h-[48px] rounded-full glass-panel border ${
              isDark ? 'border-white/10 text-white/70' : 'border-slate-300/60 text-slate-700'
            } font-mono text-xs tracking-wider uppercase select-none`}
          >
            <span>
              {UI_STRINGS.act01.seasonPrefix} {TEAM_TELEMETRY.season} {UI_STRINGS.act01.seasonSeparator} {TEAM_TELEMETRY.game}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Act01Awakening
