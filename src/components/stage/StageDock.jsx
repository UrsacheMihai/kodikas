/**
 * Stage Dock Navigation Bar
 * Floating bottom dock providing chapter selector, previous/next act controls, and auto-hide on user inactivity.
 * 
 * Optional:
 * - Adjust auto-hide inactivity delay or dock position styling.
 * - Add quick bookmarking or presentation slide notes drawer.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { CHAPTERS } from '../../data/chapters.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

export function StageDock({
  activeAct = 0,
  totalActs,
  chapters = CHAPTERS,
  isTransitioning = false,
  onPrev,
  onNext,
  prevAct,
  nextAct,
  goToAct,
  onSelectAct,
  className = '',
}) {
  const { isDark } = useTheme()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDockVisible, setIsDockVisible] = useState(true)

  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)
  const dockHideTimerRef = useRef(null)
  const dropdownHideTimerRef = useRef(null)

  const HIDE_DELAY_MS = 3000
  const effectiveTotalActs = totalActs || chapters?.length || 10

  const showDock = useCallback(() => {
    setIsDockVisible(true)
    if (dockHideTimerRef.current) clearTimeout(dockHideTimerRef.current)
    dockHideTimerRef.current = setTimeout(() => {
      setIsDockVisible(false)

      setIsDropdownOpen(false)
    }, HIDE_DELAY_MS)
  }, [])

  useEffect(() => {
    dockHideTimerRef.current = setTimeout(() => {
      setIsDockVisible(false)
    }, HIDE_DELAY_MS)

    const handleActivity = () => showDock()
    window.addEventListener('pointermove', handleActivity, { passive: true })
    window.addEventListener('pointerdown', handleActivity, { passive: true })
    window.addEventListener('touchstart', handleActivity, { passive: true })
    window.addEventListener('keydown', handleActivity, { passive: true })

    return () => {
      if (dockHideTimerRef.current) clearTimeout(dockHideTimerRef.current)
      window.removeEventListener('pointermove', handleActivity)
      window.removeEventListener('pointerdown', handleActivity)
      window.removeEventListener('touchstart', handleActivity)
      window.removeEventListener('keydown', handleActivity)
    }
  }, [showDock])

  useEffect(() => {
    showDock()
  }, [activeAct, showDock])

  const resetDropdownTimer = useCallback(() => {
    if (dropdownHideTimerRef.current) clearTimeout(dropdownHideTimerRef.current)
    dropdownHideTimerRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, HIDE_DELAY_MS)
  }, [])

  useEffect(() => {
    if (!isDropdownOpen) {
      if (dropdownHideTimerRef.current) {
        clearTimeout(dropdownHideTimerRef.current)
        dropdownHideTimerRef.current = null
      }
      return
    }

    resetDropdownTimer()

    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDropdownOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      if (dropdownHideTimerRef.current) clearTimeout(dropdownHideTimerRef.current)
    }
  }, [isDropdownOpen, resetDropdownTimer])

  const handlePrev = () => {
    if (activeAct === 0 || isTransitioning) return
    if (typeof onPrev === 'function') onPrev()
    else if (typeof prevAct === 'function') prevAct()
    else if (typeof goToAct === 'function') goToAct(activeAct - 1)
  }

  const handleNext = () => {
    if (activeAct === effectiveTotalActs - 1 || isTransitioning) return
    if (typeof onNext === 'function') onNext()
    else if (typeof nextAct === 'function') nextAct()
    else if (typeof goToAct === 'function') goToAct(activeAct + 1)
  }

  const handleSelectAct = (idx) => {
    if (isTransitioning) return
    const callback = goToAct || onSelectAct
    if (typeof callback === 'function') callback(idx)
    setIsDropdownOpen(false)
  }

  const progressPercentage = Math.min(
    100,
    Math.max(0, ((activeAct + 1) / effectiveTotalActs) * 100)
  )
  const formattedActive = String(activeAct + 1).padStart(2, '0')
  const formattedTotal = String(effectiveTotalActs).padStart(2, '0')

  return (
    <footer
      className={`stage-dock fixed bottom-4 sm:bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none ${className}`}
    >
      <div
        className={`pointer-events-auto relative glass-panel rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-4 sm:gap-8 shadow-2xl border backdrop-blur-2xl transition-all duration-500 ease-in-out ${
          isDark ? 'border-white/10 text-white' : 'border-black/10 text-obsidian'
        } ${
          isDockVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}

        onPointerEnter={showDock}
        onTouchStart={showDock}
      >
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label="Quick-jump to act"
            onMouseMove={resetDropdownTimer}
            onTouchStart={resetDropdownTimer}
            className={`absolute bottom-full mb-3 left-4 sm:left-6 w-72 sm:w-80 max-h-80 overflow-y-auto rounded-2xl p-2 shadow-2xl z-50 flex flex-col gap-1 backdrop-blur-2xl border transition-all duration-200 ${
              isDark
                ? 'bg-obsidian/85 border-white/10 text-white'
                : 'bg-white/90 border-black/10 text-obsidian'
            }`}
          >
            {chapters.map((ch, idx) => {
              const isCurrent = activeAct === idx
              const num = String(idx + 1).padStart(2, '0')

              return (
                <button
                  key={ch.id ?? idx}
                  type="button"
                  role="option"
                  aria-selected={isCurrent}
                  onClick={() => handleSelectAct(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left font-mono text-xs transition-colors cursor-pointer ${
                    isCurrent
                      ? isDark
                        ? 'bg-volt/20 text-volt font-bold border border-volt/30'
                        : 'bg-deep-berry/20 text-deep-berry font-bold border border-deep-berry/30'
                      : isDark
                        ? 'text-white/70 hover:text-white hover:bg-white/5'
                        : 'text-obsidian/70 hover:text-obsidian hover:bg-black/5'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      className={`text-[10px] ${
                        isDark ? 'text-white/40' : 'text-obsidian/40'
                      }`}
                    >
                      {num}
                    </span>
                    <span className="truncate">{ch.title}</span>
                  </span>
                  {isCurrent && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isDark
                          ? 'bg-volt shadow-[0_0_6px_rgba(179,250,58,0.8)]'
                          : 'bg-deep-berry shadow-[0_0_6px_rgba(130,37,90,0.8)]'
                      }`}
                    />
                  )}
                </button>
              )
            })}
          </div>
        )}

        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            className={`flex items-center gap-1 font-mono text-xs tracking-wider select-none cursor-pointer transition-colors ${
              isDark
                ? 'text-white/80 hover:text-volt'
                : 'text-obsidian/80 hover:text-deep-berry'
            }`}
          >
            <span>
              {UI_STRINGS.dock.actPrefix} {formattedActive}{' '}
              {UI_STRINGS.dock.actSeparator} {formattedTotal}
            </span>
            <ChevronUp
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`w-14 sm:w-20 md:w-24 h-1 rounded-full overflow-hidden ${
              isDark ? 'bg-white/10' : 'bg-black/10'
            }`}
            role="progressbar"
            aria-valuenow={activeAct + 1}
            aria-valuemin={1}
            aria-valuemax={effectiveTotalActs}
            aria-label={UI_STRINGS.dock.progressAriaLabel}
          >
            <div
              className={`h-full transition-all duration-500 ease-out ${
                isDark ? 'bg-volt' : 'bg-deep-berry'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeAct === 0 || isTransitioning}
            className={`w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all cursor-pointer ${
              isDark
                ? 'text-white/70 hover:text-white hover:bg-white/10'
                : 'text-obsidian/70 hover:text-obsidian hover:bg-black/5'
            }`}
            aria-label={UI_STRINGS.dock.prevActAriaLabel}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeAct === effectiveTotalActs - 1 || isTransitioning}
            className={`w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all cursor-pointer ${
              isDark
                ? 'text-white/70 hover:text-white hover:bg-white/10'
                : 'text-obsidian/70 hover:text-obsidian hover:bg-black/5'
            }`}
            aria-label={UI_STRINGS.dock.nextActAriaLabel}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div
          className={`hidden md:flex items-center space-x-2 text-[11px] font-mono select-none ${
            isDark ? 'text-white/40' : 'text-obsidian/40'
          }`}
        >
          <span className="flex items-center gap-1">
            <kbd
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                isDark
                  ? 'bg-white/10 text-white/70'
                  : 'bg-black/10 text-obsidian/70'
              }`}
            >
              {UI_STRINGS.dock.keyboardSpace}
            </kbd>
            <span>{UI_STRINGS.dock.keyboardSpaceAction}</span>
          </span>
          <span className={isDark ? 'text-white/20' : 'text-black/20'}>•</span>
          <span className="flex items-center gap-1">
            <kbd
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                isDark
                  ? 'bg-white/10 text-white/70'
                  : 'bg-black/10 text-obsidian/70'
              }`}
            >
              {UI_STRINGS.dock.keyboardArrows}
            </kbd>
            <span>{UI_STRINGS.dock.keyboardArrowsAction}</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default StageDock
