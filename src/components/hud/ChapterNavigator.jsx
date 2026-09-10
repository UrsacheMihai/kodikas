/**
 * Chapter Navigator Component
 * Interactive HUD dropdown allowing users to jump directly to any presentation act.
 * 
 * Optional:
 * - Add miniature chapter thumbnail previews or completion checkmarks to dropdown items.
 */

import React, { useRef, useEffect } from 'react'
import { CHAPTERS } from '../../data/chapters.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

export function ChapterNavigator({
  activeAct = 0,
  chapters = CHAPTERS,
  onSelectAct,
  goToAct,
  isTransitioning = false,
  className = '',
}) {
  const { isDark } = useTheme()
  const navRef = useRef(null)
  const activeBtnRef = useRef(null)

  const handleSelect = (idx) => {
    if (idx === activeAct || isTransitioning) return
    const callback = onSelectAct || goToAct
    if (typeof callback === 'function') {
      callback(idx)
    }
  }

  useEffect(() => {
    if (activeBtnRef.current && navRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }, [activeAct])

  const formatDesktopLabel = (chapter, idx) => {
    if (chapter.label) {
      return chapter.label.replace('//', '').replace(/\s+/g, ' ').trim()
    }
    const num = String(idx + 1).padStart(2, '0')
    const title = (chapter.title || '').toUpperCase()
    return `${num} ${title}`
  }

  return (
    <nav
      ref={navRef}
      className={`flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 select-none overflow-x-auto max-w-full py-1 scrollbar-none ${className}`}
      role="tablist"
      aria-label={UI_STRINGS.hud.chaptersAriaLabel}
    >
      {chapters.map((chapter, idx) => {
        const isActive = activeAct === idx
        const desktopLabel = formatDesktopLabel(chapter, idx)
        const ariaLabelText = chapter.ariaLabel || desktopLabel

        return (
          <button
            key={chapter.id ?? idx}
            ref={isActive ? activeBtnRef : null}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={ariaLabelText}
            disabled={isTransitioning}
            onClick={() => handleSelect(idx)}
            className={`shrink-0 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed select-none ${
              isActive
                ? isDark
                  ? 'w-7 h-7 sm:w-auto sm:h-auto sm:px-3 sm:py-1 rounded-full border border-volt/60 bg-volt text-obsidian sm:bg-volt/15 sm:text-white font-semibold sm:shadow-[0_0_15px_rgba(179,250,58,0.25)] flex items-center justify-center gap-1.5'
                  : 'w-7 h-7 sm:w-auto sm:h-auto sm:px-3 sm:py-1 rounded-full border border-deep-berry/60 bg-deep-berry text-white sm:bg-deep-berry/15 sm:text-deep-berry font-semibold sm:shadow-[0_0_15px_rgba(130,37,90,0.2)] flex items-center justify-center gap-1.5'
                : isDark
                  ? 'w-6 h-6 sm:w-auto sm:h-auto sm:px-2.5 sm:py-1 rounded-full border border-white/5 sm:border-transparent bg-white/[0.02] sm:bg-transparent text-white/40 hover:text-white hover:bg-white/5 flex items-center justify-center font-normal'
                  : 'w-6 h-6 sm:w-auto sm:h-auto sm:px-2.5 sm:py-1 rounded-full border border-black/5 sm:border-transparent bg-black/[0.02] sm:bg-transparent text-obsidian/40 hover:text-obsidian hover:bg-black/5 flex items-center justify-center font-normal'
            }`}
          >
            <span className="sm:hidden font-mono text-[11px] leading-none">
              {idx + 1}
            </span>

            <span className="hidden sm:inline font-mono text-xs tracking-wider whitespace-nowrap">
              {desktopLabel}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default ChapterNavigator
