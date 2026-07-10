'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'

const LETTERS = ['L', 'O', 'R', 'V', 'A']
const SPREAD_X = [-320, -160, 0, 160, 320]

const LETTER_STYLE = {
  display: 'inline-block',
  color: '#C9A961',
  lineHeight: 1,
  fontFamily: 'var(--font-logo)',
  fontSize: 'clamp(4.5rem, 17vw, 17rem)',
  fontWeight: 300,
  letterSpacing: '0.05em',
  userSelect: 'none' as const,
}

const GRAIN = {
  opacity: 0.05,
  mixBlendMode: 'overlay' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundSize: '148px 148px',
}

// Desktop only — scroll-driven spread + fade
function DesktopLetter({
  char,
  index,
  spreadX,
  progress,
}: {
  char: string
  index: number
  spreadX: number
  progress: MotionValue<number>
}) {
  const x       = useTransform(progress, [0.05, 0.75], [0, spreadX])
  const fadeOut = useTransform(progress, [0.55, 0.88], [1, 0])

  return (
    <motion.div
      className="inline-block"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.1 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span style={{ ...LETTER_STYLE, x, opacity: fadeOut }}>
        {char}
      </motion.span>
    </motion.div>
  )
}

// Mobile — static entrance animation, no scroll transforms
function MobileHero() {
  return (
    <div className="lg:hidden h-screen bg-[#080204] overflow-hidden flex flex-col items-center justify-center">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero/herosectionvideo.mp4"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(117,10,4,0.55) 0%, rgba(26,3,2,0.72) 100%)' }}
      />
      <div className="absolute inset-0 pointer-events-none" style={GRAIN} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,169,97,0.09) 0%, transparent 70%)' }}
      />
      <div className="relative flex items-center justify-center">
        {LETTERS.map((char, i) => (
          <motion.span
            key={char}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            style={LETTER_STYLE}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative font-inter text-[8px] tracking-[0.75em] uppercase text-champagne-gold/50 mt-6"
      >
        Fine Chocolate · Toronto
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-8 flex flex-col items-center gap-3"
      >
        <p className="font-inter text-[8px] tracking-[0.65em] uppercase text-cream/20">Scroll</p>
        <motion.div
          className="w-px bg-gradient-to-b from-champagne-gold/30 to-transparent"
          style={{ height: 16 }}
          animate={{ height: [16, 32, 16] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}

// Desktop — kinetic scroll-driven animation
function DesktopHero() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 })
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.65], [0, 1, 1, 0])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <div ref={outerRef} className="hidden lg:block lg:h-[185vh]">
      <div className="relative sticky top-0 h-screen bg-[#080204] overflow-hidden flex flex-col items-center justify-center">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero/herosectionvideo.mp4"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(117,10,4,0.55) 0%, rgba(26,3,2,0.72) 100%)' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={GRAIN} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,169,97,0.07) 0%, transparent 70%)' }}
        />
        <div className="flex items-center justify-center">
          {LETTERS.map((char, i) => (
            <DesktopLetter
              key={char}
              char={char}
              index={i}
              spreadX={SPREAD_X[i]}
              progress={smoothProgress}
            />
          ))}
        </div>
        <motion.p
          style={{ opacity: taglineOpacity, bottom: 'calc(50% - clamp(120px, 9vw, 170px))' }}
          className="absolute font-inter text-[8px] tracking-[0.75em] uppercase text-champagne-gold/50"
        >
          Fine Chocolate · Toronto
        </motion.p>
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 flex flex-col items-center gap-3"
        >
          <p className="font-inter text-[8px] tracking-[0.65em] uppercase text-cream/20">Scroll</p>
          <motion.div
            className="w-px bg-gradient-to-b from-champagne-gold/30 to-transparent"
            style={{ height: 16 }}
            animate={{ height: [16, 32, 16] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export function KineticHero() {
  return (
    <>
      <MobileHero />
      <DesktopHero />
    </>
  )
}
