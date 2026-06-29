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
    id: 'hazelnut-crunch-noir',
    name: 'Hazelnut Crunch Noir',
    note: 'Hazelnut praline · dark chocolate',
    full: '/flavors/hazelnut-full.jpg',
    cut: '/flavors/hazelnut-cut.jpg',
  },
  {
    id: 'espresso-noir',
    name: 'Espresso Noir',
    note: 'Single-origin espresso ganache',
    full: '/flavors/espresso-full.jpg',
    cut: '/flavors/espresso-cut.jpg',
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
    <div style={{ paddingTop: '3vh' }}>

      {/* Bonbon image area — no caption, no frame */}
      <div
        className="w-52 md:w-[480px]"
        style={{ position: 'relative', aspectRatio: '6 / 7' }}
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

      {/* Flavor title — fades in/out in sync with bonbon (desktop only) */}
      <div className="hidden md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={flavor.id + '-label'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: EASE_LUXURY }}
          style={{ textAlign: 'center', marginTop: 22, pointerEvents: 'none' }}
        >
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 15,
            fontWeight: 300,
            letterSpacing: '0.32em',
            color: 'rgba(201,169,97,0.90)',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            {flavor.name}
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: '0.22em',
            color: 'rgba(246,239,233,0.38)',
            marginTop: 7,
            margin: '7px 0 0',
          }}>
            {flavor.note}
          </p>
        </motion.div>
      </AnimatePresence>
      </div>

    </div>
  )
}
