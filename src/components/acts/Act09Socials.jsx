/**
 * Act 09: Media & Social Channels Hub
 * Central community hub aggregating team social accounts, video channels, and community links.
 * 
 * Optional:
 * - Embed live social feed widgets or YouTube channel highlight videos.
 * - Add direct Discord community invite link or newsletter subscription form.
 */

import React from 'react'
import { ArrowUpRight, Share2 } from 'lucide-react'
import { SOCIALS } from '../../data/socials.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

function InstagramIcon({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" fill="currentColor" />
    </svg>
  )
}

function GithubIcon({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function Music2Icon({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="18" r="4" />
      <path d="M12 18V2l7 4" />
    </svg>
  )
}

function LinkedinIcon({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function MessageCircleIcon({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

function SocialIcon({ name, className = '', style = {} }) {
  switch (name) {
    case 'Instagram':
      return <InstagramIcon className={className} style={style} />
    case 'Youtube':
      return <YoutubeIcon className={className} style={style} />
    case 'Github':
      return <GithubIcon className={className} style={style} />
    case 'Music2':
      return <Music2Icon className={className} style={style} />
    case 'Linkedin':
      return <LinkedinIcon className={className} style={style} />
    case 'MessageCircle':
      return <MessageCircleIcon className={className} style={style} />
    default:
      return <Share2 className={className} style={style} />
  }
}

export function Act09Socials({
  isActive = true,
  isEntering = false,
  direction = 1,
  onNext,
  onGoToAct,
}) {
  const { isDark } = useTheme()

  return (
    <section
      className="act-stage-8 relative w-full min-h-dvh flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 py-16 md:py-20 select-none overflow-y-auto"
      aria-label={UI_STRINGS.act09.ariaLabel}
      data-active={isActive}
    >
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] ambient-glow-volt pointer-events-none -z-10 opacity-30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 my-auto">
        <div className="text-center space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full pill-badge glass-panel border ${
              isDark ? 'border-white/10 text-volt' : 'border-slate-300/60 text-slate-800'
            } text-xs font-mono tracking-wider uppercase`}
          >
            <span>{UI_STRINGS.act09.headerTag}</span>
            <span className={isDark ? 'text-white/30' : 'text-slate-400'}>•</span>
            <span className={isDark ? 'text-white/70' : 'text-slate-700'}>{UI_STRINGS.act09.subtag}</span>
          </div>

          <h2
            className={`font-display font-black text-3xl sm:text-5xl md:text-6xl ${
              isDark ? 'text-white' : 'text-slate-950'
            } tracking-tight uppercase`}
          >
            {UI_STRINGS.act09.sectionTitle}{' '}
            <span className="text-gradient-volt">{UI_STRINGS.act09.sectionTitleAccent}</span>
          </h2>

          <p
            className={`font-sans text-sm sm:text-base md:text-lg ${
              isDark ? 'text-studio-silver' : 'text-slate-700'
            } leading-relaxed max-w-2xl mx-auto font-light px-2 pt-1`}
          >
            {UI_STRINGS.act09.leadText}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2">
          {SOCIALS.map((item) => (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group glass-panel specular-sheen p-5 sm:p-6 rounded-2xl border ${
                isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-300/40 bg-white/80'
              } backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl cursor-pointer hover:-translate-y-1`}
              style={{
                '--hover-accent': item.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${item.color}80`
                e.currentTarget.style.boxShadow = `0 12px 30px -10px ${item.color}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 213, 225, 0.4)'
                e.currentTarget.style.boxShadow = ''
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.color}18`,
                      border: `1px solid ${item.color}35`,
                    }}
                  >
                    <SocialIcon name={item.icon} className="w-6 h-6" style={{ color: item.color }} />
                  </div>

                  <ArrowUpRight
                    className={`w-5 h-5 ${
                      isDark ? 'text-white/30 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'
                    } group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all`}
                  />
                </div>

                <div>
                  <h3 className={`font-display font-bold text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.platform}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-volt font-medium">
                    {item.handle}
                  </p>
                </div>
              </div>

              <div className={`pt-3 border-t ${isDark ? 'border-white/5' : 'border-slate-200'} flex items-center justify-between`}>
                <span className={`font-mono text-[10px] uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                  {UI_STRINGS.act09.cardAction}
                </span>
                <span
                  className="font-mono text-[11px] font-bold tracking-wider uppercase"
                  style={{ color: item.color }}
                >
                  &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Act09Socials
