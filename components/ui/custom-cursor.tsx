'use client'

import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [tabindex]'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let scale = 1
    let opacity = 0.4
    let rafId: number

    document.body.style.cursor = 'none'

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) {
        isHovering.current = true
        scale = 1.6
        opacity = 0.65
      }
    }
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) {
        isHovering.current = false
        scale = 1
        opacity = 0.4
      }
    }

    const loop = () => {
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`

      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      // Apply scale + opacity via CSS variables to avoid conflicting with translate
      ring.style.cssText = `
        will-change: transform;
        transform: translate(${ringX - 20}px, ${ringY - 20}px) scale(${scale});
        opacity: ${opacity};
        transition: opacity 0.2s, scale 0.2s;
      `

      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    loop()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-champagne-gold rounded-full pointer-events-none z-[99999]"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-champagne-gold/40 rounded-full pointer-events-none z-[99999]"
        aria-hidden="true"
      />
    </>
  )
}
