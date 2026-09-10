/**
 * Keynote Controller Hook
 * Manages horizontal act navigation state, directional transitions, keyboard arrow handlers, mobile touch swipe gestures, and transition animation locks.
 * 
 * Optional:
 * - Tweak swipe sensitivity (TOLERANCE) or add trackpad horizontal wheel navigation.
 * - Configure custom transition durations or looping behavior between acts.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Observer)
}

export function useKeynoteController(config = 4) {
  const options = typeof config === 'number' ? { totalActs: config } : (config || {})
  const totalActs = Math.max(1, typeof options.totalActs === 'number' ? options.totalActs : 4)
  const initialAct = Math.min(Math.max(0, options.initialAct ?? 0), totalActs - 1)
  const transitionDuration = options.transitionDuration ?? 850

  const [activeAct, setActiveAct] = useState(initialAct)
  const [direction, setDirection] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const activeActRef = useRef(activeAct)
  const totalActsRef = useRef(totalActs)
  const isTransitioningRef = useRef(isTransitioning)
  const directionRef = useRef(direction)
  const timerRef = useRef(null)

  activeActRef.current = activeAct
  totalActsRef.current = totalActs
  isTransitioningRef.current = isTransitioning
  directionRef.current = direction

  const resetTransitionLock = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsTransitioning(false)
    isTransitioningRef.current = false
  }, [])

  const goToAct = useCallback((targetIndex) => {

    if (isTransitioningRef.current) {
      return false
    }

    if (typeof targetIndex !== 'number' || Number.isNaN(targetIndex)) {
      return false
    }

    if (targetIndex < 0 || targetIndex >= totalActsRef.current) {
      return false
    }

    if (targetIndex === activeActRef.current) {
      return false
    }

    const nextDirection = targetIndex > activeActRef.current ? 1 : -1

    setDirection(nextDirection)
    directionRef.current = nextDirection

    setIsTransitioning(true)
    isTransitioningRef.current = true

    setActiveAct(targetIndex)
    activeActRef.current = targetIndex

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setIsTransitioning(false)
      isTransitioningRef.current = false
      timerRef.current = null
    }, transitionDuration + 350)

    return true
  }, [transitionDuration])

  const nextAct = useCallback(() => {
    const nextIndex = activeActRef.current + 1
    if (nextIndex >= totalActsRef.current) {
      return false
    }
    return goToAct(nextIndex)
  }, [goToAct])

  const prevAct = useCallback(() => {
    const prevIndex = activeActRef.current - 1
    if (prevIndex < 0) {
      return false
    }
    return goToAct(prevIndex)
  }, [goToAct])

  const nextActRef = useRef(nextAct)
  const prevActRef = useRef(prevAct)
  nextActRef.current = nextAct
  prevActRef.current = prevAct

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleKeyDown = (event) => {
      const activeEl = document.activeElement
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable)
      ) {
        return
      }

      const { key, code } = event
      const isForwardKey =
        key === 'ArrowRight' ||
        key === ' ' ||
        code === 'Space' ||
        key === 'Spacebar' ||
        key === 'PageDown'

      const isBackwardKey =
        key === 'ArrowLeft' ||
        key === 'PageUp'

      if (isForwardKey || isBackwardKey) {
        event.preventDefault()
      }

      if (isTransitioningRef.current) {
        return
      }

      if (isForwardKey) {
        nextActRef.current()
      } else if (isBackwardKey) {
        prevActRef.current()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    let startX = 0
    let startY = 0
    let locked = false

    const TOLERANCE = 50

    const onTouchStart = (e) => {
      const t = e.touches[0]
      startX = t.clientX
      startY = t.clientY
      locked = false
    }

    const onTouchMove = (e) => {
      if (!e.touches.length) return
      const dx = e.touches[0].clientX - startX
      const dy = e.touches[0].clientY - startY

      if (!locked) {

        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
          locked = true

          e.preventDefault()
        }

        return
      }

      e.preventDefault()
    }

    const onTouchEnd = (e) => {
      if (!locked) return
      const dx = e.changedTouches[0].clientX - startX
      if (Math.abs(dx) < TOLERANCE || isTransitioningRef.current) return

      if (dx < 0) {
        nextActRef.current()
      } else {
        prevActRef.current()
      }
      locked = false
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove',  onTouchMove,  { passive: false })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })

    let observerInstance = null
    try {
      observerInstance = Observer.create({
        target: window,
        type: 'pointer',
        axis: 'x',
        tolerance: TOLERANCE,
        ignore: '.interactive-zone',
        preventDefault: false,
        onLeft: () => {
          if (!isTransitioningRef.current) nextActRef.current()
        },
        onRight: () => {
          if (!isTransitioningRef.current) prevActRef.current()
        },
      })
    } catch (err) {
      console.warn('GSAP Observer initialization:', err)
    }

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
      if (observerInstance) {
        observerInstance.kill()
        observerInstance = null
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  return {
    activeAct,
    totalActs,
    direction,
    isTransitioning,
    goToAct,
    nextAct,
    prevAct,
    setIsTransitioning,
    resetTransitionLock,
  }
}

export default useKeynoteController
