'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className, strength = 0.38 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 180, damping: 18 })
  const y = useSpring(rawY, { stiffness: 180, damping: 18 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left - rect.width / 2) * strength)
    rawY.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  function onLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  )
}
