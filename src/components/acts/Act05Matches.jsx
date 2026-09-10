/**
 * Act 05: Matches & Competition Telemetry
 * Visualizes tournament match history, scores, alliance partners, and match telemetry statistics.
 * 
 * Optional:
 * - Wire into live FTC Scout or The Blue Alliance API for real-time match result synchronization.
 * - Add tournament selector filter to switch between league meets and championship events.
 */

import React from 'react'
import { Trophy, Activity, Flame, Award, Calendar, CheckCircle2, XCircle, MinusCircle } from 'lucide-react'
import { MATCHES, SEASON_STATS } from '../../data/matches.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

export function Act05Matches({
  isActive = true,
  isEntering = false,
  direction = 1,
  onNext,
  onGoToAct,
}) {
  const { isDark } = useTheme()

  const statsItems = [
    { label: UI_STRINGS.act05.matchesPlayed, value: SEASON_STATS.matchesPlayed, icon: Activity, accent: '#B3FA3A' },
    { label: UI_STRINGS.act05.wins, value: SEASON_STATS.wins, icon: Trophy, accent: '#10B981' },
    { label: UI_STRINGS.act05.losses, value: SEASON_STATS.losses, icon: MinusCircle, accent: '#F43F5E' },
    { label: UI_STRINGS.act05.winRate, value: SEASON_STATS.winRate, icon: Flame, accent: '#FF70C1' },
    { label: UI_STRINGS.act05.avgScore, value: SEASON_STATS.avgScore, icon: Activity, accent: '#38BDF8' },
    { label: UI_STRINGS.act05.highScore, value: SEASON_STATS.highScore, icon: Flame, accent: '#F59E0B' },
    { label: UI_STRINGS.act05.ranking, value: `#${SEASON_STATS.currentRanking}`, icon: Award, accent: '#A855F7' },
    { label: UI_STRINGS.act05.autoSuccessRate, value: SEASON_STATS.autoSuccessRate, icon: CheckCircle2, accent: '#B3FA3A' },
  ]

  const getResultBadge = (result) => {
    switch (result) {
      case 'WIN':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {result}
          </span>
        )
      case 'LOSS':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            {result}
          </span>
        )
      case 'TIE':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <MinusCircle className="w-3.5 h-3.5" />
            {result}
          </span>
        )
    }
  }

  return (
    <section
      className="act-stage-4 relative w-full min-h-dvh flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 py-16 md:py-20 select-none overflow-y-auto"
      aria-label={UI_STRINGS.act05.ariaLabel}
      data-active={isActive}
    >
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] ambient-glow-volt pointer-events-none -z-10 opacity-35 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 my-auto">
        <div className="text-center space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full pill-badge glass-panel border ${
              isDark ? 'border-white/10 text-volt' : 'border-slate-300/60 text-slate-800'
            } text-xs font-mono tracking-wider uppercase`}
          >
            <span>{UI_STRINGS.act05.headerTag}</span>
            <span className={isDark ? 'text-white/30' : 'text-slate-400'}>•</span>
            <span className={isDark ? 'text-white/70' : 'text-slate-700'}>{UI_STRINGS.act05.subtag}</span>
          </div>

          <h2
            className={`font-display font-black text-3xl sm:text-5xl md:text-6xl ${
              isDark ? 'text-white' : 'text-slate-950'
            } tracking-tight uppercase`}
          >
            {UI_STRINGS.act05.sectionTitle}{' '}
            <span className="text-gradient-volt">{UI_STRINGS.act05.sectionTitleAccent}</span>
          </h2>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {statsItems.map((stat, idx) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={idx}
                  className={`glass-panel specular-sheen p-4 sm:p-5 rounded-2xl border ${
                    isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-300/40 bg-white/80'
                  } backdrop-blur-xl hover:border-volt/30 transition-all duration-300 flex flex-col justify-between space-y-2 shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider ${
                        isDark ? 'text-white/50' : 'text-slate-500'
                      }`}
                    >
                      {stat.label}
                    </span>
                    <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70" style={{ color: stat.accent }} />
                  </div>
                  <div
                    className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight"
                    style={{ color: stat.accent }}
                  >
                    {stat.value}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
              {UI_STRINGS.act05.historyTitle}
            </h3>
            <span className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
              {MATCHES.length} MATCHES
            </span>
          </div>

          <div className="w-full max-h-[380px] overflow-y-auto space-y-3 pr-1">
            {MATCHES.length === 0 ? (
              <div
                className={`p-8 text-center rounded-2xl border ${
                  isDark ? 'border-white/10 text-white/50' : 'border-slate-300 text-slate-500'
                }`}
              >
                {UI_STRINGS.act05.noMatches}
              </div>
            ) : (
              MATCHES.map((match) => {
                const isRedAlliance = match.alliance.toLowerCase() === 'red'
                return (
                  <div
                    key={match.id}
                    className={`glass-panel rounded-2xl p-4 sm:p-5 border ${
                      isDark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-300/40 bg-white/70'
                    } hover:border-volt/30 transition-all duration-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {getResultBadge(match.result)}
                        <span
                          className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                            isRedAlliance
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}
                        >
                          {match.alliance.toUpperCase()}
                        </span>
                        <span className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-slate-500'} flex items-center gap-1`}>
                          <Calendar className="w-3 h-3" />
                          {match.date}
                        </span>
                      </div>

                      <h4 className={`font-display font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {match.event}
                      </h4>

                      <div className={`font-mono text-xs ${isDark ? 'text-white/50' : 'text-slate-500'} flex flex-wrap items-center gap-x-4 gap-y-1`}>
                        <span>
                          {UI_STRINGS.act05.partnerLabel}:{' '}
                          <strong className={isDark ? 'text-white/80' : 'text-slate-800'}>
                            {match.alliancePartner}
                          </strong>
                        </span>
                        <span>
                          {UI_STRINGS.act05.opponentsLabel}:{' '}
                          <strong className={isDark ? 'text-white/80' : 'text-slate-800'}>
                            {match.opponents.join(', ')}
                          </strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                      <div className="text-center px-2">
                        <span className={`block font-mono text-[9px] uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                          {UI_STRINGS.act05.autoLabel}
                        </span>
                        <span className={`font-mono text-xs font-bold ${isDark ? 'text-white/80' : 'text-slate-800'}`}>
                          {match.autoScore}
                        </span>
                      </div>

                      <div className="text-center px-2">
                        <span className={`block font-mono text-[9px] uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                          {UI_STRINGS.act05.teleopLabel}
                        </span>
                        <span className={`font-mono text-xs font-bold ${isDark ? 'text-white/80' : 'text-slate-800'}`}>
                          {match.teleopScore}
                        </span>
                      </div>

                      <div className="text-center px-2">
                        <span className={`block font-mono text-[9px] uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                          {UI_STRINGS.act05.endgameLabel}
                        </span>
                        <span className={`font-mono text-xs font-bold ${isDark ? 'text-white/80' : 'text-slate-800'}`}>
                          {match.endgameScore}
                        </span>
                      </div>

                      <div className="text-center pl-3 border-l border-white/10">
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-volt">
                          {UI_STRINGS.act05.totalLabel}
                        </span>
                        <span className="font-display text-xl sm:text-2xl font-black text-volt">
                          {match.totalScore}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Act05Matches
