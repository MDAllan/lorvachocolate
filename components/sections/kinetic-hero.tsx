'use client'

import { motion } from 'framer-motion'

const LETTERS = ['L', 'O', 'R', 'V', 'A']

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

function MobileHero() {
  return (
    <div className="lg:hidden h-screen bg-[#080204] overflow-hidden flex flex-col items-center justify-center">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero/herostorytelling.mp4"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.82) 100%)' }}
      />
      <div className="absolute inset-0 pointer-events-none" style={GRAIN} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,169,97,0.09) 0%, transparent 70%)' }}
      />
      <div className="relative flex items-center justify-center">
        {LETTERS.map((char) => (
          <span key={char} style={LETTER_STYLE}>{char}</span>
        ))}
      </div>
      <p className="relative font-inter text-[8px] tracking-[0.75em] uppercase text-champagne-gold/50 mt-6">
        Fine Chocolate · Toronto
      </p>
      <div className="absolute bottom-8 flex flex-col items-center gap-3">
        <p className="font-inter text-[8px] tracking-[0.65em] uppercase text-cream/20">Scroll</p>
        <motion.div
          className="w-px bg-gradient-to-b from-champagne-gold/30 to-transparent"
          style={{ height: 16 }}
          animate={{ height: [16, 32, 16] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

function DesktopHero() {
  return (
    <div className="hidden lg:block h-screen bg-[#080204] overflow-hidden flex flex-col items-center justify-center relative">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero/herostorytelling.mp4"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.82) 100%)' }}
      />
      <div className="absolute inset-0 pointer-events-none" style={GRAIN} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,169,97,0.07) 0%, transparent 70%)' }}
      />
      <div className="relative flex items-center justify-center">
        {LETTERS.map((char) => (
          <span key={char} style={LETTER_STYLE}>{char}</span>
        ))}
      </div>
      <p
        className="absolute font-inter text-[8px] tracking-[0.75em] uppercase text-champagne-gold/50"
        style={{ bottom: 'calc(50% - clamp(120px, 9vw, 170px))' }}
      >
        Fine Chocolate · Toronto
      </p>
      <div className="absolute bottom-8 flex flex-col items-center gap-3">
        <p className="font-inter text-[8px] tracking-[0.65em] uppercase text-cream/20">Scroll</p>
        <motion.div
          className="w-px bg-gradient-to-b from-champagne-gold/30 to-transparent"
          style={{ height: 16 }}
          animate={{ height: [16, 32, 16] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
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
