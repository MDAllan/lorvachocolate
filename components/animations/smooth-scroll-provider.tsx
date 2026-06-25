'use client'

import { ReactNode, useEffect } from 'react'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    let lenisInstance: { raf: (t: number) => void; destroy: () => void } | null = null
    let rafId: number

    const init = async () => {
      const Lenis = (await import('lenis')).default
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      })

      function raf(time: number) {
        lenisInstance?.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      lenisInstance?.destroy()
    }
  }, [])

  return <>{children}</>
}
