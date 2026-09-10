/**
 * Act 03: Engineering & Outreach Pillars
 * Showcases foundational team pillars with interactive, tactile responsive cards and metrics.
 * 
 * Optional:
 * - Add CAD render snapshots or subsystem breakdown links.
 * - Connect interactive metric cards to expanded technical deep-dive modals.
 */

import React, { useState } from 'react'
import { Code2, Cpu, Crosshair } from 'lucide-react'
import { PILLARS } from '../../data/pillars.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

function PillarIcon({ name, className = '' }) {
  switch (name) {
    case 'Code':
    case 'Code2':
      return <Code2 className={className} />
    case 'Cpu':
      return <Cpu className={className} />
    case 'Crosshair':
    default:
      return <Crosshair className={className} />
  }
}

export function Act03Pillars({
  isActive = true,
  isEntering = false,
  direction = 1,
  onNext,
  onGoToAct,
}) {
  const { isDark } = useTheme()
  const [activePillar, setActivePillar] = useState(0)

  const currentPillarIndex = Math.min(Math.max(0, activePillar), PILLARS.length - 1)
  const pillar = PILLARS[currentPillarIndex] || PILLARS[0]

  return (
    <section
      className="act-stage-2 relative w-full min-h-dvh flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 md:py-20 select-none overflow-y-auto"
      aria-label={UI_STRINGS.act03.ariaLabel}
      data-active={isActive}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] pointer-events-none -z-10 opacity-40 blur-3xl transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${pillar.accent}30 0%, rgba(10, 10, 18, 0) 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 my-auto">
        <div className="text-center space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full pill-badge glass-panel border ${
              isDark ? 'border-white/10 text-volt' : 'border-slate-300/60 text-slate-800'
            } text-xs font-mono tracking-wider uppercase`}
          >
            <span>{UI_STRINGS.act03.headerTag}</span>
            <span className={isDark ? 'text-white/30' : 'text-slate-400'}>•</span>
            <span className={isDark ? 'text-white/70' : 'text-slate-700'}>
              {UI_STRINGS.act03.headerSubtag}
            </span>
          </div>

          <h2
            className={`font-display font-black text-3xl sm:text-5xl md:text-6xl ${
              isDark ? 'text-white' : 'text-slate-950'
            } tracking-tight uppercase`}
          >
            {UI_STRINGS.act03.sectionTitle}{' '}
            <span className="text-gradient-volt">{UI_STRINGS.act03.sectionTitleAccent}</span>
          </h2>
        </div>

        <div
          className={`w-full max-w-2xl glass-panel rounded-2xl p-1.5 flex items-center justify-between gap-1.5 sm:gap-2 border ${
            isDark ? 'border-white/10' : 'border-slate-300/60 bg-white/70'
          } backdrop-blur-xl shadow-xl`}
          role="tablist"
          aria-label={UI_STRINGS.act03.tabsAriaLabel}
        >
          {PILLARS.map((item, idx) => {
            const isSelected = idx === currentPillarIndex
            return (
              <button
                key={item.id || idx}
                type="button"
                role="tab"
                id={`tab-pillar-${item.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-pillar-${item.id}`}
                onClick={() => setActivePillar(idx)}
                className={`flex-1 min-h-[44px] py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-white/10 text-white shadow-lg border'
                      : 'bg-slate-900 text-white shadow-lg border'
                    : isDark
                    ? 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: `${item.accent}60`,
                        boxShadow: `0 0 20px ${item.accent}20`,
                      }
                    : undefined
                }
              >
                <PillarIcon
                  name={item.icon}
                  className="w-4 h-4 shrink-0 transition-transform duration-200"
                  style={isSelected ? { color: item.accent } : undefined}
                />
                <span className="truncate">{item.id}</span>
              </button>
            )
          })}
        </div>

        <div
          id={`panel-pillar-${pillar.id}`}
          role="tabpanel"
          aria-labelledby={`tab-pillar-${pillar.id}`}
          className={`w-full glass-panel specular-sheen rounded-3xl p-6 sm:p-8 md:p-10 border ${
            isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-300/40 bg-white/80'
          } backdrop-blur-2xl shadow-2xl transition-all duration-500 text-left space-y-6`}
          style={{
            borderTopColor: `${pillar.accent}50`,
          }}
        >
          <div className={`flex items-center justify-between border-b ${isDark ? 'border-white/10' : 'border-slate-200'} pb-4`}>
            <span
              className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                color: pillar.accent,
                backgroundColor: `${pillar.accent}15`,
                border: `1px solid ${pillar.accent}30`,
              }}
            >
              {pillar.tag}
            </span>

            <span className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-slate-500'} tracking-wider`}>
              0{currentPillarIndex + 1} {UI_STRINGS.act03.indexSeparator} 0{PILLARS.length}
            </span>
          </div>

          <h3 className={`font-display font-black text-2xl sm:text-4xl md:text-5xl ${isDark ? 'text-white' : 'text-slate-950'} tracking-tight`}>
            {pillar.title}
          </h3>

          <blockquote
            className={`font-display text-base sm:text-xl md:text-2xl ${
              isDark ? 'text-studio-silver border-white/20' : 'text-slate-700 border-slate-300'
            } italic font-light leading-relaxed border-l-2 pl-4`}
          >
            "{pillar.quote}"
          </blockquote>

          <p className={`font-sans text-sm sm:text-base md:text-lg ${isDark ? 'text-studio-muted' : 'text-slate-600'} leading-relaxed max-w-3xl`}>
            {pillar.description}
          </p>

          <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'} space-y-2`}>
            <span className={`font-mono text-[11px] uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500'} block`}>
              {UI_STRINGS.act03.specsLabel}
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {pillar.specs.map((spec, sIdx) => (
                <span
                  key={sIdx}
                  className={`font-mono text-xs px-3 py-1.5 rounded-lg border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white/80 hover:border-white/20'
                      : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-300'
                  } transition-colors`}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Act03Pillars
