'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const FLAVORS = [
  {
    id: 'cherry-blush',
    name: 'Cherry Blush',
    note: 'Cherry ganache · white chocolate',
    full: '/flavors/cherry-blush-full.jpg',
    cut: '/flavors/cherry-blush-cut.jpg',
  },
  {
    id: 'cherry-balsamic-noir',
    name: 'Cherry Balsamic Noir',
    note: 'Balsamic cherry · 70% dark',
    full: '/flavors/cherry-balsamic-full.jpg',
    cut: '/flavors/cherry-balsamic-cut.jpg',
  },
  {
    id: 'espresso-noir',
    name: 'Espresso Noir',
    note: 'Single-origin espresso ganache',
    full: '/flavors/espresso-full.jpg',
    cut: '/flavors/espresso-cut.jpg',
  },
  {
    id: 'hazelnut-crunch-noir',
    name: 'Hazelnut Crunch Noir',
    note: 'Hazelnut praline · dark chocolate',
    full: '/flavors/hazelnut-full.jpg',
    cut: '/flavors/hazelnut-cut.jpg',
  },
] as const

type EaseCurve = [number, number, number, number]

const EASE_LUXURY: EaseCurve = [0.22, 1, 0.36, 1]
const EASE_KNIFE: EaseCurve = [0.42, 0, 0.18, 1]

export function FlavorShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const isPausedRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const restartRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prefersReduced = useReducedMotion()

  const startCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setActiveIndex(i => (i + 1) % FLAVORS.length)
      }
    }, 4000)
  }, [])

  useEffect(() => {
    startCycle()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (restartRef.current) clearTimeout(restartRef.current)
    }
  }, [startCycle])

  const handleSelect = (index: number) => {
    setActiveIndex(index)
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (restartRef.current) clearTimeout(restartRef.current)
    restartRef.current = setTimeout(startCycle, 6000)
  }

  const flavor = FLAVORS[activeIndex]

  const switchTransition = prefersReduced
    ? { opacity: { duration: 0.2 } }
    : {
        opacity: { duration: 0.45, ease: EASE_LUXURY },
        y: { type: 'spring' as const, stiffness: 80, damping: 18, mass: 1.1 },
        rotate: { type: 'spring' as const, stiffness: 90, damping: 22 },
        scale: { duration: 0.5, ease: EASE_LUXURY },
      }

  return (
    <div className="flex items-start gap-8 xl:gap-10" style={{ paddingTop: '10vh' }}>

      {/* Vertical flavor label nav */}
      <div
        className="flex flex-col gap-1"
        role="tablist"
        aria-label="Chocolate flavors"
        style={{ paddingTop: 32 }}
      >
        {FLAVORS.map((f, i) => {
          const active = i === activeIndex
          return (
            <motion.button
              key={f.id}
              role="tab"
              aria-selected={active}
              aria-label={`View ${f.name}`}
              onClick={() => handleSelect(i)}
              className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-champagne-gold/40 rounded-sm"
              style={{
                minHeight: 44,
                paddingBlock: 4,
                paddingInline: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              animate={{
                opacity: active ? 1 : 0.28,
                x: active ? 0 : 6,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <motion.span
                aria-hidden="true"
                style={{
                  display: 'block',
                  width: 18,
                  height: 1,
                  background: '#C9A961',
                  flexShrink: 0,
                  transformOrigin: 'left center',
                }}
                animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              />
              <span
                className="font-inter uppercase"
                style={{
                  fontSize: 8,
                  letterSpacing: '0.42em',
                  color: active ? '#C9A961' : '#F6EFE9',
                  transition: 'color 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {f.name}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Bonbon image area — no caption, no frame */}
      <div
        style={{ position: 'relative', width: 480, height: 560 }}
        onMouseEnter={() => { setIsHovered(true); isPausedRef.current = true }}
        onMouseLeave={() => { setIsHovered(false); isPausedRef.current = false }}
        role="img"
        aria-label={`${flavor.name}${isHovered ? ' — interior view' : ''}`}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={flavor.id}
            style={{ position: 'absolute', inset: 0 }}
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: 60, rotate: 3, scale: 0.94 }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 1, y: 0, rotate: 0, scale: 1 }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: -40, rotate: -2, scale: 0.96 }
            }
            transition={switchTransition}
          >
            {/* Full exterior bonbon — fades out slowly on hover */}
            <motion.div
              style={{ position: 'absolute', inset: 0 }}
              animate={{ opacity: isHovered ? 0.10 : 1 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
            >
              <Image
                src={flavor.full}
                alt={flavor.name}
                fill
                style={{ objectFit: 'contain' }}
                priority
                sizes="480px"
              />
            </motion.div>

            {/* Interior cross-section — slow knife-wipe from left on hover */}
            <motion.div
              style={{ position: 'absolute', inset: 0 }}
              animate={{
                clipPath: isHovered
                  ? 'inset(0 0% 0 0)'
                  : 'inset(0 100% 0 0)',
              }}
              transition={
                prefersReduced
                  ? { duration: 0.2 }
                  : { duration: 1.1, ease: EASE_KNIFE }
              }
            >
              <Image
                src={flavor.cut}
                alt={`${flavor.name} — interior cross-section`}
                fill
                style={{ objectFit: 'contain' }}
                priority
                sizes="480px"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
