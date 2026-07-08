'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const LETTERS = ['L', 'O', 'R', 'V', 'A']
// Each letter spreads outward + slightly up/down
const SPREAD_X = [-320, -160, 0, 160, 320]
const SPREAD_Y = [30,   -20, 0,  -30, 20]

function Letter({
  char,
  index,
  spreadX,
  spreadY,
  progress,
}: {
  char: string
  index: number
  spreadX: number
  spreadY: number
  progress: MotionValue<number>
}) {
  // Scroll-driven: letters spread apart then fade
  const x       = useTransform(progress, [0.05, 0.75], [0, spreadX])
  const y       = useTransform(progress, [0.05, 0.75], [0, spreadY])
  const fadeOut = useTransform(progress, [0.55, 0.88], [1, 0])

  return (
    // Outer: entrance animation (opacity + slide up from below)
    <motion.div
      className="inline-block"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.1 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Inner: scroll-driven spread + fade */}
      <motion.span
        style={{
          x,
          y,
          opacity: fadeOut,
          display: 'inline-block',
          backgroundImage: 'url(/gallery/process-chocolate-spread.jpg)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          backgroundSize: '220% auto',
          backgroundPosition: `${(index / 4) * 100}% 40%`,
          lineHeight: 1,
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(4.5rem, 17vw, 17rem)',
          fontWeight: 300,
          letterSpacing: '0.05em',
          userSelect: 'none',
        }}
      >
        {char}
      </motion.span>
    </motion.div>
  )
}

export function KineticHero() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  const taglineOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.65], [0, 1, 1, 0])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    // Outer: tall div — scroll headroom on desktop, normal on mobile
    <div ref={outerRef} className="h-screen lg:h-[185vh]">
      {/* Inner: sticky viewport on desktop only */}
      <div className="relative lg:sticky lg:top-0 h-screen bg-[#080204] overflow-hidden flex flex-col items-center justify-center">

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.05,
            mixBlendMode: 'overlay',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '148px 148px',
          }}
        />

        {/* Ambient gold glow behind letters */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,169,97,0.07) 0%, transparent 70%)',
          }}
        />

        {/* The five letters */}
        <div className="flex items-center justify-center">
          {LETTERS.map((char, i) => (
            <Letter
              key={char}
              char={char}
              index={i}
              spreadX={SPREAD_X[i]}
              spreadY={SPREAD_Y[i]}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Tagline beneath letters */}
        <motion.p
          style={{ opacity: taglineOpacity }}
          className="absolute bottom-[calc(50%-90px)] font-inter text-[8px] tracking-[0.75em] uppercase text-champagne-gold/50"
        >
          Fine Chocolate · Toronto
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 flex flex-col items-center gap-3"
        >
          <p className="font-inter text-[8px] tracking-[0.65em] uppercase text-cream/20">Scroll</p>
          <motion.div
            className="w-px bg-gradient-to-b from-champagne-gold/30 to-transparent"
            animate={{ height: ['16px', '32px', '16px'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  )
}
