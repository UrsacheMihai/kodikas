/**
 * Act 02: Manifesto
 * Displays the team's core engineering philosophy, mission statement, and interactive quote cards.
 * 
 * Optional:
 * - Add interactive kinetic typography or dynamic reveal animations for manifesto statements.
 * - Include team leadership signatures or multimedia documentary clips.
 */

import React from 'react'
import { MANIFESTO } from '../../data/manifesto.js'
import { METRICS } from '../../data/metrics.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

export function Act02Manifesto({
  isActive = true,
  isEntering = false,
  direction = 1,
  onNext,
  onGoToAct,
}) {
  const { isDark } = useTheme()

  return (
    <section
      className="act-stage-1 relative w-full min-h-dvh flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 md:py-20 select-none overflow-y-auto"
      aria-label={UI_STRINGS.act02.ariaLabel}
      data-active={isActive}
    >
      <div
        className="absolute top-1/3 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] ambient-glow-fuchsia pointer-events-none -z-10 opacity-50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] ambient-glow-volt pointer-events-none -z-10 opacity-30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center my-auto">
        <div className="space-y-4 sm:space-y-6 text-left">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full pill-badge glass-panel border ${
              isDark ? 'border-white/10 text-fuchsia' : 'border-slate-300/60 text-fuchsia-600'
            } text-xs font-mono tracking-wider uppercase`}
          >
            <span>{UI_STRINGS.act02.headerTag}</span>
            <span className={isDark ? 'text-white/30' : 'text-slate-400'}>•</span>
            <span className={isDark ? 'text-white/70' : 'text-slate-700'}>{MANIFESTO.tag}</span>
          </div>

          <div className="space-y-2">
            <h2
              className={`font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${
                isDark ? 'text-white' : 'text-slate-950'
              } tracking-tight uppercase leading-[1.05]`}
            >
              {MANIFESTO.headline}{' '}
              <span className="text-gradient-volt block sm:inline">
                {MANIFESTO.subheadline}
              </span>
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            <p className={`font-medium ${isDark ? 'text-white/90' : 'text-slate-800'}`}>
              {MANIFESTO.lead}
            </p>
            <p className={`${isDark ? 'text-studio-muted' : 'text-slate-600'} leading-relaxed font-normal`}>
              {MANIFESTO.body}
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {METRICS.map((metric, index) => (
              <div
                key={metric.label || index}
                className={`glass-panel specular-sheen p-5 sm:p-6 rounded-2xl border ${
                  isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-300/40 bg-white/80'
                } backdrop-blur-xl hover:border-volt/30 transition-all duration-300 flex flex-col justify-between space-y-3 group shadow-xl`}
              >
                <div className="space-y-1">
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wider ${
                      isDark ? 'text-white/50' : 'text-slate-500'
                    } block`}
                  >
                    {metric.label}
                  </span>
                  <div className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-volt tracking-tight group-hover:scale-[1.02] transition-transform duration-200">
                    {metric.value}
                  </div>
                </div>

                <p
                  className={`font-mono text-xs ${
                    isDark ? 'text-studio-muted border-white/5' : 'text-slate-600 border-slate-200'
                  } leading-normal pt-2 border-t`}
                >
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Act02Manifesto
