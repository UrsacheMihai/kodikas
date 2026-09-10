/**
 * Act 07: Team Media Gallery
 * Responsive photo and media showcase featuring lightbox viewing, image categories, and captions.
 * 
 * Optional:
 * - Connect to an external media CDN or cloud album API (Cloudinary, Google Photos) for automatic gallery updates.
 * - Add video thumbnail integration for match highlight reels.
 */

import React, { useState, useEffect, useCallback } from 'react'
import { Camera, X, ChevronLeft, ChevronRight, Calendar, Maximize2, Image as ImageIcon } from 'lucide-react'
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '../../data/gallery.js'
import { UI_STRINGS } from '../../data/ui-strings.js'
import { useTheme } from '../../hooks/useTheme.js'

export function Act07Gallery({
  isActive = true,
  isEntering = false,
  direction = 1,
  onNext,
  onGoToAct,
}) {
  const { isDark } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredImages = selectedCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === selectedCategory)

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return (prev + 1) % filteredImages.length
    })
  }, [filteredImages.length])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return (prev - 1 + filteredImages.length) % filteredImages.length
    })
  }, [filteredImages.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      } else if (e.key === 'ArrowLeft') {
        prevImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, closeLightbox, nextImage, prevImage])

  const activePhoto = lightboxIndex !== null ? filteredImages[lightboxIndex] : null

  return (
    <section
      className="act-stage-6 relative w-full min-h-dvh flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 py-16 md:py-20 select-none overflow-y-auto"
      aria-label={UI_STRINGS.act07.ariaLabel}
      data-active={isActive}
    >
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] ambient-glow-fuchsia pointer-events-none -z-10 opacity-30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8 my-auto">
        <div className="text-center space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full pill-badge glass-panel border ${
              isDark ? 'border-white/10 text-fuchsia' : 'border-slate-300/60 text-fuchsia-600'
            } text-xs font-mono tracking-wider uppercase`}
          >
            <span>{UI_STRINGS.act07.headerTag}</span>
            <span className={isDark ? 'text-white/30' : 'text-slate-400'}>•</span>
            <span className={isDark ? 'text-white/70' : 'text-slate-700'}>{UI_STRINGS.act07.subtag}</span>
          </div>

          <h2
            className={`font-display font-black text-3xl sm:text-5xl md:text-6xl ${
              isDark ? 'text-white' : 'text-slate-950'
            } tracking-tight uppercase`}
          >
            {UI_STRINGS.act07.sectionTitle}{' '}
            <span className="text-gradient-fuchsia">{UI_STRINGS.act07.sectionTitleAccent}</span>
          </h2>
        </div>

        <div
          className={`flex items-center gap-2 overflow-x-auto max-w-full p-1.5 rounded-2xl glass-panel border ${
            isDark ? 'border-white/10' : 'border-slate-300/60 bg-white/70'
          }`}
          role="tablist"
        >
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[44px] px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? isDark
                      ? 'bg-fuchsia/20 text-fuchsia border border-fuchsia/40 shadow-[0_0_15px_rgba(255,112,193,0.3)]'
                      : 'bg-fuchsia-600 text-white shadow-md'
                    : isDark
                    ? 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                }`}
              >
                {cat === 'all' ? UI_STRINGS.act07.allCategory : cat}
              </button>
            )
          })}
        </div>

        <div className="w-full">
          {filteredImages.length === 0 ? (
            <div
              className={`p-12 text-center rounded-2xl border ${
                isDark ? 'border-white/10 text-white/50' : 'border-slate-300 text-slate-500'
              }`}
            >
              {UI_STRINGS.act07.noPhotos}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredImages.map((img, idx) => (
                <div
                  key={img.id}
                  onClick={() => openLightbox(idx)}
                  className={`group relative rounded-2xl overflow-hidden glass-panel border ${
                    isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-300/40 bg-white/80'
                  } hover:border-fuchsia/50 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-obsidian-card flex items-center justify-center border-b border-white/5">
                    {img.src ? (
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 space-y-3 text-center w-full h-full bg-gradient-to-br from-white/[0.04] to-transparent">
                        <div className="w-12 h-12 rounded-full bg-fuchsia/10 border border-fuchsia/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Camera className="w-6 h-6 text-fuchsia" />
                        </div>
                        <span className="font-mono text-[10px] tracking-widest text-fuchsia/80 uppercase">
                          {UI_STRINGS.act07.placeholderBadge}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-lg bg-obsidian/80 backdrop-blur-md text-white border border-white/20">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-fuchsia/15 text-fuchsia border border-fuchsia/20">
                        {img.category}
                      </span>
                      <span className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-slate-500'} flex items-center gap-1`}>
                        <Calendar className="w-3 h-3" />
                        {img.date}
                      </span>
                    </div>

                    <p className={`font-sans text-xs sm:text-sm font-medium ${isDark ? 'text-white/90' : 'text-slate-800'} line-clamp-2`}>
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-2xl p-4 sm:p-6"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-4 sm:p-6 flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded-full bg-fuchsia/15 text-fuchsia border border-fuchsia/30">
                  {activePhoto.category}
                </span>
                <span className="font-mono text-xs text-white/50">
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="p-2.5 min-h-[44px] min-w-[44px] rounded-full glass-panel border border-white/20 text-white hover:text-fuchsia hover:border-fuchsia transition-colors cursor-pointer flex items-center justify-center"
                aria-label={UI_STRINGS.act07.lightboxClose}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center border border-white/10">
              {activePhoto.src ? (
                <img src={activePhoto.src} alt={activePhoto.caption} className="w-full h-full object-contain" />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-fuchsia/15 border border-fuchsia/40 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-fuchsia" />
                  </div>
                  <p className="font-mono text-xs text-white/60 max-w-sm">
                    {UI_STRINGS.act07.placeholderNote}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 min-h-[44px] min-w-[44px] rounded-full bg-obsidian/70 hover:bg-obsidian text-white border border-white/20 transition-all cursor-pointer flex items-center justify-center"
                aria-label={UI_STRINGS.act07.lightboxPrev}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 min-h-[44px] min-w-[44px] rounded-full bg-obsidian/70 hover:bg-obsidian text-white border border-white/20 transition-all cursor-pointer flex items-center justify-center"
                aria-label={UI_STRINGS.act07.lightboxNext}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
              <p className="font-display font-medium text-base text-white">
                {activePhoto.caption}
              </p>
              <span className="font-mono text-xs text-white/50 flex items-center gap-1.5 shrink-0">
                <Calendar className="w-3.5 h-3.5 text-fuchsia" />
                {activePhoto.date}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Act07Gallery
