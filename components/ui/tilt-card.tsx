'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

export function TiltCard({ children, className, maxTilt = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawY, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(rawX, { stiffness: 300, damping: 30 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set(((e.clientX - cx) / (rect.width / 2)) * maxTilt)
    rawY.set(-((e.clientY - cy) / (rect.height / 2)) * maxTilt)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 900 }}
      className={className}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="h-full">
        {children}
      </motion.div>
    </div>
  )
}
