/**
 * Act 08: Cyber Recalibration Mini-Game
 * Interactive canvas-based mini-game (cyber circuit / timing puzzle) offering visitors an engaging challenge.
 * 
 * Optional:
 * - Add combo multipliers and visual screen-shake particle feedback.
 * - Implement global or local persistent high-score leaderboard.
 */

import React from 'react'
import {
  Cpu,
  Terminal,
  Target,
  Eye,
  Activity
} from 'lucide-react'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

export function Act08MiniGame({ isActive = true }) {
  const { isDark } = useTheme()
  const strings = UI_STRINGS.act08;

  const subsystems = [
    {
      id: 'odometry',
      icon: Target,
      title: strings.specOdometry,
      desc: strings.specOdometryDesc
    },
    {
      id: 'vision',
      icon: Eye,
      title: strings.specVision,
      desc: strings.specVisionDesc
    },
    {
      id: 'kinematics',
      icon: Activity,
      title: strings.specKinematics,
      desc: strings.specKinematicsDesc
    }
  ];

  return (
    <section
      className={`act-stage-08 relative w-full min-h-dvh flex flex-col px-4 sm:px-6 md:px-12 py-16 md:py-20 overflow-y-auto overflow-x-hidden ${
        isDark ? 'text-white' : 'text-obsidian'
      }`}
      aria-label="Act 08"
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 blur-[120px] rounded-full pointer-events-none ${
          isDark ? 'bg-volt/5' : 'bg-deep-berry/8'
        }`}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-4 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <span
            className={`px-3 py-1 text-xs font-mono rounded-full backdrop-blur-sm border ${
              isDark
                ? 'border-volt/30 text-volt bg-volt/5'
                : 'border-deep-berry/30 text-deep-berry bg-deep-berry/5'
            }`}
          >
            {strings.headerTag}
          </span>
          <span
            className={`px-3 py-1 text-xs font-mono rounded-full backdrop-blur-sm flex items-center gap-2 border ${
              isDark
                ? 'border-volt/30 text-volt bg-volt/5'
                : 'border-deep-berry/30 text-deep-berry bg-deep-berry/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            {strings.statusBadge}
          </span>
        </div>

        <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight">
          {strings.sectionTitle}{' '}
          <span className={isDark ? 'text-volt' : 'text-deep-berry'}>
            {strings.sectionTitleAccent}
          </span>
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto interactive-zone">
        <div
          className={`glass-panel rounded-3xl p-6 md:p-10 mb-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 shadow-xl relative overflow-hidden border ${
            isDark
              ? 'border-volt/20 shadow-[0_0_40px_rgba(179,250,58,0.08)]'
              : 'border-deep-berry/20 shadow-[0_0_40px_rgba(130,37,90,0.08)]'
          }`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Cpu className={`w-32 h-32 ${isDark ? 'text-volt' : 'text-deep-berry'}`} />
          </div>

          <div
            className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 border ${
              isDark
                ? 'bg-volt/10 border-volt/30'
                : 'bg-deep-berry/10 border-deep-berry/30'
            }`}
          >
            <Terminal className={`w-8 h-8 md:w-10 md:h-10 ${isDark ? 'text-volt' : 'text-deep-berry'}`} />
          </div>

          <div className="flex-1 space-y-3">
            <div
              className={`inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                isDark ? 'bg-volt/20 text-volt-bright' : 'bg-deep-berry/15 text-deep-berry'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  isDark ? 'bg-volt' : 'bg-deep-berry'
                }`}
              />
              {strings.statusLive}
            </div>
            <h3
              className={`font-display font-bold text-2xl md:text-3xl uppercase ${
                isDark ? 'text-white' : 'text-obsidian'
              }`}
            >
              {strings.terminalTitle}
            </h3>
            <p
              className={`text-sm md:text-base max-w-2xl leading-relaxed ${
                isDark ? 'text-white/60' : 'text-obsidian/65'
              }`}
            >
              {strings.terminalDescription}
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h4
            className={`font-mono text-sm font-bold uppercase tracking-widest ${
              isDark ? 'text-white/80' : 'text-obsidian/80'
            }`}
          >
            {strings.specsTitle}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {subsystems.map((sys) => {
            const Icon = sys.icon;
            return (
              <div
                key={sys.id}
                className={`group glass-panel p-5 rounded-2xl border transition-colors flex flex-col gap-4 relative overflow-hidden ${
                  isDark
                    ? 'border-white/5 hover:border-volt/30'
                    : 'border-black/8 hover:border-deep-berry/30'
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                    isDark ? 'from-volt/5 to-transparent' : 'from-deep-berry/5 to-transparent'
                  }`}
                />

                <div className="flex items-start justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border ${
                      isDark
                        ? 'bg-black/50 border-white/10 group-hover:border-volt/30'
                        : 'bg-white/60 border-black/10 group-hover:border-deep-berry/30'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isDark
                          ? 'text-volt/60 group-hover:text-volt'
                          : 'text-deep-berry/60 group-hover:text-deep-berry'
                      }`}
                    />
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-[9px] font-mono uppercase tracking-wider flex items-center gap-1.5 border ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white/60'
                        : 'bg-black/5 border-black/10 text-obsidian/60'
                    }`}
                  >
                    <Activity
                      className={`w-3 h-3 ${isDark ? 'text-volt/80' : 'text-deep-berry/80'}`}
                    />
                    {strings.statusStandby}
                  </div>
                </div>

                <div>
                  <h5
                    className={`font-mono text-sm font-bold mb-1 ${
                      isDark ? 'text-white/90' : 'text-obsidian/90'
                    }`}
                  >
                    {sys.title}
                  </h5>
                  <p
                    className={`text-xs leading-relaxed ${
                      isDark ? 'text-white/50' : 'text-obsidian/55'
                    }`}
                  >
                    {sys.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  )
}

export default Act08MiniGame
