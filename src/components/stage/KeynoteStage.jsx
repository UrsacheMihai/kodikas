/**
 * Keynote Stage Container
 * Manages horizontal act slot transitions using GSAP animations, handling slide-in/slide-out animations and scroll reset.
 * 
 * Optional:
 * - Customize GSAP transition easing curve, 3D perspective, or add cross-fade effects.
 * - Add preloading triggers for heavy 3D or media assets in adjacent acts.
 */

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export function KeynoteStage({
  activeAct = 0,
  direction = 1,
  isTransitioning = false,
  onTransitionComplete,
  children,
  className = '',
}) {
  const stageRef = useRef(null)
  const slotsRef = useRef([])
  const prevActRef = useRef(activeAct)

  const childrenArray = React.Children.toArray(children)

  const resetSlotToCenter = (el) => {
    if (!el) return
    el.scrollTop = 0
    el.scrollLeft = 0
    gsap.set(el, { clearProps: 'x,y,scale,rotate,filter,opacity,transform' })
  }

  const hideSlot = (el) => {
    if (!el) return
    el.scrollTop = 0
    el.scrollLeft = 0
    gsap.set(el, {
      clearProps: 'x,y,scale,rotate,filter,transform',
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    })
  }

  useGSAP(
    () => {
      const slots = slotsRef.current
      if (!slots || slots.length === 0) return

      if (prevActRef.current === activeAct) {
        slots.forEach((slot, idx) => {
          if (!slot) return
          if (idx === activeAct) {
            gsap.set(slot, {
              clearProps: 'x,y,scale,rotate,filter,transform',
              opacity: 1,
              visibility: 'visible',
              pointerEvents: 'auto',
            })
          } else {
            hideSlot(slot)
          }
        })
        return
      }

      const outgoingIdx = prevActRef.current
      const incomingIdx = activeAct
      prevActRef.current = activeAct

      const outgoingEl = slots[outgoingIdx]
      const incomingEl = slots[incomingIdx]

      if (!outgoingEl || !incomingEl) return

      gsap.killTweensOf(outgoingEl)
      gsap.killTweensOf(incomingEl)

      resetSlotToCenter(incomingEl)

      gsap.set(incomingEl, { opacity: 0, visibility: 'visible' })
      gsap.set(outgoingEl, { pointerEvents: 'none' })

      const isForward = direction >= 0

      const tl = gsap.timeline({
        onComplete: () => {

          hideSlot(outgoingEl)
          gsap.set(incomingEl, {
            clearProps: 'x,y,scale,rotate,filter,transform',
            opacity: 1,
            visibility: 'visible',
            pointerEvents: 'auto',
          })
          if (typeof onTransitionComplete === 'function') {
            onTransitionComplete()
          }
        },
      })

      if (isForward) {

        tl.to(
          outgoingEl,
          {
            x: '-100%',
            scale: 0.92,
            opacity: 0,
            filter: 'blur(8px)',
            duration: 0.65,
            ease: 'power3.inOut',
          },
          0
        )

        tl.fromTo(
          incomingEl,
          { x: '100%', scale: 1.08, opacity: 0, filter: 'blur(12px)' },
          { x: '0%',   scale: 1.0,  opacity: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power4.out' },
          0.1
        )
      } else {

        tl.to(
          outgoingEl,
          {
            x: '100%',
            scale: 0.92,
            opacity: 0,
            filter: 'blur(8px)',
            duration: 0.65,
            ease: 'power3.inOut',
          },
          0
        )

        tl.fromTo(
          incomingEl,
          { x: '-100%', scale: 1.08, opacity: 0, filter: 'blur(12px)' },
          { x: '0%',    scale: 1.0,  opacity: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power4.out' },
          0.1
        )
      }
    },
    { dependencies: [activeAct, direction], scope: stageRef }
  )

  return (
    <main
      ref={stageRef}
      className={`keynote-stage w-screen h-screen fixed inset-0 overflow-hidden select-none pointer-events-auto ${className}`}
      style={{
        perspective: '1400px',
        perspectiveOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
      }}
      data-active-act={activeAct}
      data-direction={direction}
      aria-live="polite"
    >
      {childrenArray.map((child, index) => {
        const isActive = index === activeAct
        const isEntering = isActive && isTransitioning
        const childElement = React.isValidElement(child)
          ? typeof child.type === 'string'
            ? child
            : React.cloneElement(child, {
                isActive,
                isEntering,
                direction,
              })
          : child

        return (
          <div
            key={child.key ?? index}
            ref={(el) => {
              slotsRef.current[index] = el
            }}
            className={`keynote-act-slot absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden ${
              isActive ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity, filter',
            }}
            data-act-index={index}
            aria-hidden={!isActive}
          >
            {childElement}
          </div>
        )
      })}
    </main>
  )
}

export default KeynoteStage
