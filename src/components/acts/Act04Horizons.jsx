/**
 * Act 04: Horizons (Roadmap Timeline)
 * Interactive seasonal roadmap detailing past milestones, active development, and future tournament horizons.
 * 
 * Optional:
 * - Connect milestone cards to live competition calendar or engineering notebook updates.
 * - Add filter buttons to toggle between hardware, software, and outreach timelines.
 */

import React from 'react'
import { RotateCcw, Compass, ArrowUpRight } from 'lucide-react'
import { CHAPTERS } from '../../data/chapters.js'
import { TEAM_TELEMETRY } from '../../data/telemetry.js'
import { PREVIEW_CARDS } from '../../data/horizons.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

export function Act04Horizons({
  isActive = true,
  isEntering = false,
  direction = 1,
  onNext,
  onGoToAct,
}) {
  const { isDark } = useTheme()

  const handleReplay = () => {
    if (typeof onGoToAct === 'function') {
      onGoToAct(0)
    }
  }

  const horizonChapter = CHAPTERS[3] || {
    title: 'CULTURE & HORIZONS',
    subtitle: 'THE EXPEDITION CONTINUES',
  }

  return (
    <section
      className="act-stage-3 relative w-full min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-16 md:py-20 text-center select-none overflow-y-auto"
      aria-label={UI_STRINGS.act04.ariaLabel}
      data-active={isActive}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[750px] h-[400px] sm:h-[600px] ambient-glow-volt pointer-events-none -z-10 opacity-50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] ambient-glow-fuchsia pointer-events-none -z-10 opacity-40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 my-auto">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full pill-badge glass-panel border ${
            isDark ? 'border-white/10 text-volt' : 'border-slate-300/60 text-slate-800'
          } text-xs font-mono tracking-wider uppercase`}
        >
          <Compass className="w-3.5 h-3.5 text-volt animate-spin" style={{ animationDuration: '12s' }} />
          <span>{UI_STRINGS.act04.headerTag}</span>
          <span className={isDark ? 'text-white/30' : 'text-slate-400'}>•</span>
          <span className={isDark ? 'text-white/70' : 'text-slate-700'}>{horizonChapter.subtitle}</span>
        </div>

        <div className="space-y-2">
          <h2
            className={`font-display font-black text-3xl sm:text-5xl md:text-7xl ${
              isDark ? 'text-white' : 'text-slate-950'
            } tracking-tight uppercase leading-[1.05]`}
          >
            {UI_STRINGS.act04.sectionTitle}{' '}
            <span className="text-gradient-volt">{UI_STRINGS.act04.sectionTitleAccent}</span>
          </h2>
          <p
            className={`font-sans text-sm sm:text-base md:text-lg ${
              isDark ? 'text-studio-silver' : 'text-slate-700'
            } leading-relaxed max-w-2xl mx-auto font-light px-2`}
          >
            {UI_STRINGS.act04.leadParagraph.replace('{location}', TEAM_TELEMETRY.location)}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 text-left pt-2">
          {PREVIEW_CARDS.map((card) => (
            <div
              key={card.id}
              className={`glass-panel specular-sheen p-5 sm:p-6 rounded-2xl border ${
                isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-300/40 bg-white/80'
              } backdrop-blur-xl hover:border-volt/40 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-xl`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{
                      color: card.accent,
                      backgroundColor: `${card.accent}15`,
                    }}
                  >
                    {card.tag}
                  </span>
                  <ArrowUpRight
                    className={`w-4 h-4 ${
                      isDark ? 'text-white/30 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'
                    } group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all`}
                  />
                </div>

                <h4
                  className={`font-display font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  } text-base sm:text-lg group-hover:text-volt transition-colors`}
                >
                  {card.title}
                </h4>

                <p className={`font-sans text-xs ${isDark ? 'text-studio-muted' : 'text-slate-600'} leading-relaxed`}>
                  {card.description}
                </p>
              </div>

              <div
                className={`pt-3 border-t ${
                  isDark ? 'border-white/5' : 'border-slate-200'
                } flex items-center justify-between`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider ${
                    isDark ? 'text-white/40' : 'text-slate-500'
                  }`}
                >
                  {UI_STRINGS.act04.cardFooterLabel}
                </span>
                <span className="font-mono text-[10px] text-volt font-semibold">
                  {UI_STRINGS.act04.cardFooterAction}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 sm:pt-6">
          <button
            type="button"
            onClick={handleReplay}
            className={`group px-8 py-3.5 min-h-[48px] rounded-full border ${
              isDark
                ? 'border-white/20 hover:border-volt/50 bg-white/5 hover:bg-white/10 text-white'
                : 'border-slate-300 hover:border-volt bg-white hover:bg-slate-100 text-slate-900 shadow-md'
            } glass-panel font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(179,250,58,0.2)]`}
            aria-label={UI_STRINGS.act04.replayAriaLabel}
          >
            <RotateCcw className="w-4 h-4 text-volt group-hover:-rotate-90 transition-transform duration-300" />
            <span>{UI_STRINGS.act04.replayText}</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Act04Horizons
