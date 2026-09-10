/**
 * Act 10: Contact & Sponsorship Portal
 * Features outreach inquiry form, sponsorship tier cards, donation information, and team creator attribution.
 * 
 * Optional:
 * - Connect the contact form to an email service backend (Formspree, EmailJS, or custom API route).
 * - Update custom domain links or sponsor deck PDF download URL.
 */

import React, { useState } from 'react'
import { Mail, Building, Send, CheckCircle2, Heart, ExternalLink } from 'lucide-react'
import { SPONSORS } from '../../data/sponsors.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { TEAM_TELEMETRY } from '../../data/telemetry.js'
import { useTheme } from '../../hooks/useTheme.js'

export function Act10Contact({
  isActive = true,
  isEntering = false,
  direction = 1,
  onGoToAct,
}) {
  const { isDark } = useTheme()

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 600)
  }

  return (
    <section
      className="act-stage-9 relative w-full min-h-dvh flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 py-16 md:py-20 select-none overflow-y-auto"
      aria-label={UI_STRINGS.act10.ariaLabel}
      data-active={isActive}
    >
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[450px] sm:w-[700px] h-[450px] sm:h-[700px] ambient-glow-volt pointer-events-none -z-10 opacity-30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center space-y-8 sm:space-y-12 my-auto">
        <div className="text-center space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full pill-badge glass-panel border ${
              isDark ? 'border-white/10 text-volt' : 'border-slate-300/60 text-slate-800'
            } text-xs font-mono tracking-wider uppercase`}
          >
            <span>{UI_STRINGS.act10.headerTag}</span>
            <span className={isDark ? 'text-white/30' : 'text-slate-400'}>•</span>
            <span className={isDark ? 'text-white/70' : 'text-slate-700'}>{UI_STRINGS.act10.subtag}</span>
          </div>

          <h2
            className={`font-display font-black text-3xl sm:text-5xl md:text-6xl ${
              isDark ? 'text-white' : 'text-slate-950'
            } tracking-tight uppercase`}
          >
            {UI_STRINGS.act10.sectionTitle}{' '}
            <span className="text-gradient-volt">{UI_STRINGS.act10.sectionTitleAccent}</span>
          </h2>

          <p
            className={`font-sans text-sm sm:text-base md:text-lg ${
              isDark ? 'text-studio-silver' : 'text-slate-700'
            } leading-relaxed max-w-2xl mx-auto font-light px-2 pt-1`}
          >
            {UI_STRINGS.act10.leadText}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Building className="w-4 h-4 text-volt" />
              <h3 className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-white/70' : 'text-slate-700'}`}>
                {UI_STRINGS.act10.sponsorsTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {SPONSORS.map((sponsor, index) => (
                <div
                  key={sponsor.name || index}
                  className={`glass-panel specular-sheen p-4 sm:p-5 rounded-2xl border ${
                    isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-300/40 bg-white/80'
                  } backdrop-blur-xl hover:border-volt/40 transition-all duration-300 flex flex-col justify-between space-y-3 shadow-md group`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-display font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-volt transition-colors`}>
                        {sponsor.name}
                      </h4>
                      {sponsor.url && sponsor.url !== '#' && (
                        <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-volt" />
                      )}
                    </div>
                    <p className={`font-sans text-xs ${isDark ? 'text-studio-muted' : 'text-slate-600'} leading-relaxed`}>
                      {sponsor.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Mail className="w-4 h-4 text-volt" />
              <h3 className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-white/70' : 'text-slate-700'}`}>
                {UI_STRINGS.act10.contactTitle}
              </h3>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`glass-panel p-6 sm:p-8 rounded-3xl border ${
                isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-300/40 bg-white/80'
              } backdrop-blur-2xl shadow-xl space-y-4`}
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className={`block font-mono text-xs uppercase tracking-wider ${isDark ? 'text-white/70' : 'text-slate-700'}`}
                >
                  {UI_STRINGS.act10.formName}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder={UI_STRINGS.act10.namePlaceholder}
                  className={`w-full px-4 py-3 min-h-[48px] rounded-xl border ${
                    isDark
                      ? 'bg-black/40 border-white/15 text-white placeholder:text-white/30 focus:border-volt'
                      : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-volt'
                  } text-sm font-sans outline-none transition-colors`}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className={`block font-mono text-xs uppercase tracking-wider ${isDark ? 'text-white/70' : 'text-slate-700'}`}
                >
                  {UI_STRINGS.act10.formEmail}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder={UI_STRINGS.act10.emailPlaceholder}
                  className={`w-full px-4 py-3 min-h-[48px] rounded-xl border ${
                    isDark
                      ? 'bg-black/40 border-white/15 text-white placeholder:text-white/30 focus:border-volt'
                      : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-volt'
                  } text-sm font-sans outline-none transition-colors`}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className={`block font-mono text-xs uppercase tracking-wider ${isDark ? 'text-white/70' : 'text-slate-700'}`}
                >
                  {UI_STRINGS.act10.formMessage}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder={UI_STRINGS.act10.messagePlaceholder}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    isDark
                      ? 'bg-black/40 border-white/15 text-white placeholder:text-white/30 focus:border-volt'
                      : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-volt'
                  } text-sm font-sans outline-none transition-colors resize-none`}
                />
              </div>

              {isSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 font-mono text-xs">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{UI_STRINGS.act10.formSuccess}</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3.5 min-h-[48px] rounded-xl bg-volt hover:bg-[#c6fc6c] text-obsidian font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(179,250,58,0.25)] hover:shadow-[0_0_30px_rgba(179,250,58,0.4)] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting ? UI_STRINGS.act10.formSubmitting : UI_STRINGS.act10.formSubmit}
                  </span>
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 w-full text-center space-y-1">
          <p
            className={`font-mono text-xs ${
              isDark ? 'text-white/40' : 'text-slate-500'
            } tracking-wider uppercase inline-flex items-center gap-1.5`}
          >
            <span>{TEAM_TELEMETRY.attribution}</span>
            <Heart className="w-3 h-3 text-fuchsia fill-fuchsia/30 inline" />
          </p>
        </div>
      </div>
    </section>
  )
}

export default Act10Contact
