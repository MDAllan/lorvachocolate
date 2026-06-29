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
const EASE_KNIFE: EaseCurve = [0.76, 0, 0.24, 1]

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
    <div className="flex items-center gap-8 xl:gap-10">

      {/* Vertical flavor label nav */}
      <div
        className="flex flex-col gap-1"
        role="tablist"
        aria-label="Chocolate flavors"
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

      {/* Bonbon display + caption */}
      <div>
        {/* Image area */}
        <div
          style={{ position: 'relative', width: 340, height: 400 }}
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
              {/* Gold border glow that pulses on hover */}
              <motion.div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
                animate={{
                  boxShadow: isHovered
                    ? '0 0 0 1px rgba(201,169,97,0.38), 0 0 56px rgba(201,169,97,0.10)'
                    : '0 0 0 1px rgba(201,169,97,0.06)',
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Full exterior bonbon — fades out on hover */}
              <motion.div
                style={{ position: 'absolute', inset: 0 }}
                animate={{ opacity: isHovered ? 0.12 : 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Image
                  src={flavor.full}
                  alt={flavor.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  sizes="340px"
                />
              </motion.div>

              {/* Interior cross-section — knife-wipe from left on hover */}
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
                    : { duration: 0.55, ease: EASE_KNIFE }
                }
              >
                <Image
                  src={flavor.cut}
                  alt={`${flavor.name} — interior cross-section`}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  sizes="340px"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption: flavor name + note */}
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`caption-${flavor.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <p
                className="font-cormorant uppercase"
                style={{
                  fontSize: 'clamp(0.85rem, 1.2vw, 1.15rem)',
                  color: '#C9A961',
                  letterSpacing: '0.1em',
                }}
              >
                {flavor.name}
              </p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={isHovered ? 'revealed' : `note-${flavor.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="font-inter uppercase"
                  style={{
                    fontSize: 8,
                    letterSpacing: '0.45em',
                    color: 'rgba(246,239,233,0.32)',
                    marginTop: 8,
                  }}
                >
                  {isHovered ? 'Interior Revealed' : flavor.note}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  )
}
