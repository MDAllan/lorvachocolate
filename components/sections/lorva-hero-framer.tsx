// Framer Code Component — paste into Framer canvas
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// ── BRAND CONSTANTS ────────────────────────────────────────────────────────────

const COLORS = {
  nearBlack:     '#0C0102',
  champagneGold: '#C9A961',
  cream:         '#F6EFE9',
  darkShell:     '#1A0800',
  midShell:      '#2C1200',
  highlight:     '#3D1800',
} as const

// ── TYPES ──────────────────────────────────────────────────────────────────────

type FlavorKey = 'blueberry' | 'caramel' | 'raspberry' | 'hazelnut' | 'vanilla'

interface FlavorTheme {
  glowColor:   string
  accentColor: string
  accentDark:  string
}

interface BonbonConfig {
  id:           FlavorKey
  top:          string
  left:         string
  size:         number
  rotate:       number
  shape:        'hexagonal' | 'rectangular' | 'sphere' | 'half-sphere' | 'square-gift'
  floatDuration: number
  floatDelay:   number
  theme:        FlavorTheme
}

interface LorvaHeroProps {
  backgroundColor?: string
  showNavbar?: boolean
  tagline?: string
  headline?: string
  description?: string
  ctaLabel?: string
}

// ── FLAVOR THEMES ─────────────────────────────────────────────────────────────

const THEMES: Record<FlavorKey, FlavorTheme> = {
  blueberry: { glowColor: 'rgba(139,26,107,0.80)',  accentColor: '#8B1A6B', accentDark: '#4A0A38' },
  caramel:   { glowColor: 'rgba(200,134,10,0.80)',  accentColor: '#C8860A', accentDark: '#7A4A00' },
  raspberry: { glowColor: 'rgba(196,30,58,0.80)',   accentColor: '#C41E3A', accentDark: '#6A0010' },
  hazelnut:  { glowColor: 'rgba(139,94,42,0.75)',   accentColor: '#8B5E2A', accentDark: '#4A2E0A' },
  vanilla:   { glowColor: 'rgba(201,169,97,0.70)',  accentColor: '#C9A961', accentDark: '#7A6030' },
}

// ── BONBON LAYOUT ─────────────────────────────────────────────────────────────
// All top values ≥ 17 % so no bonbon floats into the 80 px fixed navbar.

const BONBONS: BonbonConfig[] = [
  {
    id: 'raspberry', top: '38%', left: '53%',
    size: 152, rotate: 0,   shape: 'sphere',
    floatDuration: 3.9, floatDelay: 0.0,
    theme: THEMES.raspberry,
  },
  {
    id: 'blueberry', top: '17%', left: '47%',
    size: 115, rotate: -14, shape: 'hexagonal',
    floatDuration: 3.5, floatDelay: 0.6,
    theme: THEMES.blueberry,
  },
  {
    id: 'caramel', top: '18%', left: '67%',
    size: 102, rotate: 15,  shape: 'rectangular',
    floatDuration: 4.3, floatDelay: 0.3,
    theme: THEMES.caramel,
  },
  {
    id: 'hazelnut', top: '22%', left: '79%',
    size: 108, rotate: 8,   shape: 'half-sphere',
    floatDuration: 4.6, floatDelay: 0.9,
    theme: THEMES.hazelnut,
  },
  {
    id: 'vanilla', top: '63%', left: '65%',
    size: 122, rotate: -6,  shape: 'square-gift',
    floatDuration: 3.3, floatDelay: 1.1,
    theme: THEMES.vanilla,
  },
]

// ── GOLD DUST ──────────────────────────────────────────────────────────────────

function GoldDust({ count = 7 }: { count?: number }) {
  const flecks = Array.from({ length: count }, (_, i) => ({
    top:  ((i * 37 + 11) % 70) + 10,
    left: ((i * 53 + 7)  % 70) + 10,
    s:    (i % 3) + 1,
    o:    0.3 + (i % 4) * 0.15,
  }))
  return (
    <>
      {flecks.map((f, i) => (
        <div key={i} style={{
          position: 'absolute', top: `${f.top}%`, left: `${f.left}%`,
          width: f.s, height: f.s, borderRadius: '50%',
          background: COLORS.champagneGold, opacity: f.o, pointerEvents: 'none',
        }} />
      ))}
    </>
  )
}

// ── BONBON SHAPE ───────────────────────────────────────────────────────────────

function BonbonShape({ config }: { config: BonbonConfig }) {
  const { size: s, shape, theme } = config

  const base: React.CSSProperties = { position: 'absolute', inset: 0, borderRadius: 'inherit' }

  const shellBase = (
    <div style={{ ...base, background: `radial-gradient(circle at 65% 28%, ${COLORS.highlight} 0%, ${COLORS.midShell} 40%, ${COLORS.darkShell} 75%, #080200 100%)` }} />
  )
  const specular = (
    <div style={{ ...base, background: 'radial-gradient(circle at 20% 18%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.08) 30%, transparent 58%)', pointerEvents: 'none' }} />
  )
  const vignette = (
    <div style={{ ...base, background: 'radial-gradient(circle at center, transparent 48%, rgba(0,0,0,0.65) 100%)', pointerEvents: 'none' }} />
  )

  // ── HEXAGONAL ──
  if (shape === 'hexagonal') return (
    <div style={{ width: s, height: s * 0.92, position: 'relative', clipPath: 'polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)', boxShadow: `0 ${s*.12}px ${s*.32}px rgba(0,0,0,0.7)` }}>
      {shellBase}
      <div style={{ ...base, background: `radial-gradient(ellipse at 40% 35%, ${theme.accentColor} 0%, ${theme.accentDark} 55%, transparent 80%)`, opacity: 0.85 }} />
      <div style={{ ...base, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />
      <GoldDust count={8} />
      {specular}{vignette}
    </div>
  )

  // ── RECTANGULAR / CUBE ──
  if (shape === 'rectangular') {
    const w = Math.round(s * 1.35), h = Math.round(s * 0.82), fw = 14, th = 11
    return (
      <div style={{ position: 'relative', width: w + fw, height: h + th }}>
        <div style={{ position: 'absolute', top: 0, left: fw, width: w, height: th, background: `linear-gradient(to right,${theme.accentColor},${theme.accentDark})`, transform: 'skewX(-25deg)', transformOrigin: 'bottom left', borderRadius: '3px 3px 0 0' }} />
        <div style={{ position: 'absolute', top: th, right: 0, width: fw, height: h, background: 'linear-gradient(to right,#1a0800,#080200)', borderRadius: '0 4px 4px 0' }} />
        <div style={{ position: 'absolute', top: th, left: 0, width: w, height: h, borderRadius: '4px 0 0 4px', overflow: 'hidden', boxShadow: `0 ${s*.1}px ${s*.28}px rgba(0,0,0,0.75)` }}>
          {shellBase}
          <div style={{ ...base, background: `radial-gradient(ellipse at 35% 40%, ${theme.accentColor} 0%, ${theme.accentDark} 50%, transparent 80%)`, opacity: 0.75 }} />
          <div style={{ position: 'absolute', top: '10%', right: '18%', width: 5, height: '45%', background: `linear-gradient(to bottom,${theme.accentColor},rgba(200,134,10,0.2))`, borderRadius: '0 0 4px 4px' }} />
          <GoldDust count={6} />{specular}{vignette}
        </div>
      </div>
    )
  }

  // ── SPHERE ──
  if (shape === 'sphere') return (
    <div style={{ width: s, height: s, borderRadius: '50%', position: 'relative', overflow: 'hidden', boxShadow: `0 ${s*.14}px ${s*.35}px rgba(0,0,0,0.75)` }}>
      {shellBase}
      <div style={{ ...base, background: `radial-gradient(circle at 42% 38%, ${theme.accentColor} 0%, ${theme.accentDark} 45%, transparent 72%)`, opacity: 0.9 }} />
      <div style={{ position: 'absolute', inset: '22%', borderRadius: '50%', border: '1px solid rgba(201,169,97,0.2)' }} />
      <GoldDust count={9} />{specular}{vignette}
    </div>
  )

  // ── HALF-SPHERE ──
  if (shape === 'half-sphere') {
    const cw = Math.round(s * 0.62), ch = Math.round(s * 0.28)
    return (
      <div style={{ width: s, height: Math.round(s * 0.62), borderRadius: '50% 50% 0 0 / 100% 100% 0 0', position: 'relative', overflow: 'hidden', boxShadow: `0 ${s*.1}px ${s*.3}px rgba(0,0,0,0.7)` }}>
        {shellBase}
        <div style={{ ...base, background: `radial-gradient(ellipse at 45% 60%, ${theme.accentColor} 0%, ${theme.accentDark} 55%, transparent 80%)`, opacity: 0.8 }} />
        <div style={{ position: 'absolute', width: cw, height: ch, top: 10, left: '50%', transform: 'translateX(-50%)', background: `radial-gradient(ellipse at center, ${theme.accentColor} 0%, ${theme.accentDark} 55%, #1a0800 100%)`, borderRadius: '50%', boxShadow: 'inset 0 4px 14px rgba(0,0,0,0.8)' }} />
        <GoldDust count={7} />{specular}{vignette}
      </div>
    )
  }

  // ── SQUARE GIFT ──
  if (shape === 'square-gift') {
    const rt = 9, bow = 16
    return (
      <div style={{ width: s, height: s, borderRadius: 8, position: 'relative', overflow: 'hidden', boxShadow: `0 ${s*.12}px ${s*.3}px rgba(0,0,0,0.7),0 0 0 1px rgba(201,169,97,0.1)` }}>
        {shellBase}
        <div style={{ ...base, background: `radial-gradient(ellipse at 38% 35%, ${theme.accentColor} 0%, ${theme.accentDark} 50%, transparent 78%)`, opacity: 0.7 }} />
        <GoldDust count={7} />{specular}{vignette}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: rt, transform: 'translateY(-50%)', background: `linear-gradient(to bottom,${theme.accentColor},rgba(201,169,97,0.7))`, opacity: 0.85, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: rt, transform: 'translateX(-50%)', background: `linear-gradient(to right,${theme.accentColor},rgba(201,169,97,0.7))`, opacity: 0.85, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: bow, height: bow, borderRadius: '50%', transform: 'translate(-50%,-50%)', background: COLORS.champagneGold, boxShadow: '0 0 8px rgba(201,169,97,0.6)', pointerEvents: 'none' }} />
      </div>
    )
  }

  return null
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────

function LorvaHero({
  backgroundColor = '#280509',
  showNavbar = false,
  tagline = 'Handcrafted. Timeless. Indulgent.',
  headline = 'LORVA CHOCOLATE',
  description = 'Exquisite bonbons crafted with passion and the finest ingredients.',
  ctaLabel = 'EXPLORE COLLECTION',
}: LorvaHeroProps) {
  const [hovered, setHovered] = useState<FlavorKey | null>(null)

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: 640,
      overflow: 'hidden',
      background: COLORS.nearBlack,
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600&family=Inter:wght@300;400&display=swap');`}</style>

      {/* ── 1. Dark burgundy base ──────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `radial-gradient(ellipse 85% 85% at 68% 42%, #4A0810 0%, ${backgroundColor} 42%, #0C0102 100%)`,
      }} />

      {/* ── 2. Warm golden spotlight from upper-right ─────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 65% 75% at 90% -8%, rgba(215,135,20,0.52) 0%, rgba(190,105,15,0.26) 32%, transparent 62%)',
        pointerEvents: 'none',
      }} />

      {/* ── 3. Secondary warm bloom ───────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '5%', right: '5%', width: '58%', height: '70%', zIndex: 1,
        background: 'radial-gradient(ellipse at 65% 25%, rgba(200,120,18,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── 4. Left vignette ──────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(12,1,2,0.55) 0%, rgba(12,1,2,0.12) 36%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* ── 5. Decorative navbar (optional prop) ──────────────────────── */}
      {showNavbar && (
        <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: 72, zIndex: 20, borderBottom: '1px solid rgba(201,169,97,0.07)' }}>
          <span style={{ fontFamily: 'Josefin Sans, serif', color: COLORS.champagneGold, fontSize: 13, letterSpacing: '0.38em', textTransform: 'uppercase' as const, lineHeight: 1 }}>
            LORVA<br /><span style={{ fontSize: 9, letterSpacing: '0.45em', opacity: 0.7 }}>CHOCOLATE</span>
          </span>
          <div style={{ display: 'flex', gap: 40 }}>
            {['SHOP', 'COLLECTIONS', 'OUR STORY', 'JOURNAL'].map(l => (
              <span key={l} style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(246,239,233,0.65)', fontSize: 11, letterSpacing: '0.3em', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(246,239,233,0.6)', fontSize: 11, letterSpacing: '0.25em' }}>CART (0)</span>
        </nav>
      )}

      {/* ── 6. Text block ─────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '46%', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 0 0 56px', zIndex: 10 }}>
        <motion.p
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.32em', color: COLORS.champagneGold, textTransform: 'uppercase' as const, marginBottom: 32 }}
        >{tagline}</motion.p>

        <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
          <motion.h1
            initial={{ y: '105%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'Josefin Sans, serif', fontSize: 'clamp(64px, 7.5vw, 108px)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 0.88, color: COLORS.cream, margin: 0, display: 'block' }}
          >{headline.split(' ')[0]}</motion.h1>
        </div>

        {headline.split(' ')[1] && (
          <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
            <motion.span
              initial={{ y: '105%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'Josefin Sans, serif', fontSize: 'clamp(64px, 7.5vw, 108px)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 0.88, color: COLORS.champagneGold, display: 'block' }}
            >{headline.split(' ')[1]}</motion.span>
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.65, color: 'rgba(246,239,233,0.6)', maxWidth: 340, marginTop: 28, fontWeight: 300 }}
        >{description}</motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} style={{ marginTop: 44 }}>
          <button
            style={{ display: 'inline-flex', alignItems: 'center', gap: 16, padding: '14px 32px', border: `1px solid ${COLORS.champagneGold}`, background: 'transparent', color: COLORS.champagneGold, fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase' as const, cursor: 'pointer', transition: 'background 0.3s ease, color 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = COLORS.champagneGold; e.currentTarget.style.color = COLORS.nearBlack }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = COLORS.champagneGold }}
          >
            {ctaLabel}<span style={{ fontSize: 14, letterSpacing: 0 }}>→</span>
          </button>
        </motion.div>
      </div>

      {/* ── 7. Bonbons ────────────────────────────────────────────────── */}
      {/*
        Hover behaviour: hovered bonbon scales up (comes to camera) and glows.
        Others dim and shrink slightly. z-index ensures hovered is always on top.
        All top values ≥ 17 % so bonbons never drift into the 80 px fixed navbar.
      */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
        {BONBONS.map((b, i) => {
          const isHovered  = hovered === b.id
          const anyHovered = hovered !== null

          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: b.top,
                left: b.left,
                zIndex: isHovered ? 30 : 5,
              }}
            >
              {/* Float loop — inner so it doesn't interfere with entry or hover scale */}
              <motion.div
                animate={{ y: [0, -11, 0], rotate: [b.rotate - 2, b.rotate + 2, b.rotate - 2] }}
                transition={{ duration: b.floatDuration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: b.floatDelay }}
              >
                {/* Hover: scale + glow */}
                <motion.div
                  animate={{
                    scale:     isHovered  ? 1.28 : anyHovered ? 0.88 : 1,
                    opacity:   anyHovered && !isHovered ? 0.32 : 1,
                    boxShadow: isHovered
                      ? `0 0 80px 45px ${b.theme.glowColor}`
                      : '0 0 0px 0px rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  onMouseEnter={() => setHovered(b.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    cursor:        'crosshair',
                    pointerEvents: 'all',
                    borderRadius:  b.shape === 'sphere' ? '50%' : b.shape === 'hexagonal' ? '12%' : '6px',
                    transformOrigin: 'center center',
                  }}
                >
                  <BonbonShape config={b} />

                  {/* Flavor label on hover */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -8 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 10, fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.3em', color: COLORS.champagneGold, textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const, pointerEvents: 'none' }}
                  >
                    {b.id}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* ── 8. Progress indicator ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.6 }}
        style={{ position: 'absolute', bottom: 36, left: 56, display: 'flex', alignItems: 'center', gap: 12, zIndex: 10 }}
      >
        <span style={{ fontFamily: 'Inter, sans-serif', color: COLORS.champagneGold, fontSize: 11, letterSpacing: '0.2em' }}>01</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 28, height: 1, background: 'rgba(201,169,97,0.35)' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: COLORS.champagneGold }} />
          <div style={{ width: 28, height: 1, background: 'rgba(201,169,97,0.2)' }} />
        </div>
        <span style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(246,239,233,0.28)', fontSize: 11, letterSpacing: '0.2em' }}>03</span>
      </motion.div>
    </section>
  )
}

// ── DUAL EXPORT ────────────────────────────────────────────────────────────────

export default LorvaHero
export const FramerHero = LorvaHero

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { addPropertyControls, ControlType } = require('framer')
  addPropertyControls(FramerHero, {
    backgroundColor: { type: ControlType.Color,   title: 'Background', defaultValue: '#280509' },
    showNavbar:      { type: ControlType.Boolean,  title: 'Show Navbar', defaultValue: true },
    tagline:         { type: ControlType.String,   title: 'Tagline',     defaultValue: 'Handcrafted. Timeless. Indulgent.' },
    headline:        { type: ControlType.String,   title: 'Headline',    defaultValue: 'LORVA CHOCOLATE' },
    description:     { type: ControlType.String,   title: 'Description', defaultValue: 'Exquisite bonbons crafted with passion and the finest ingredients.' },
    ctaLabel:        { type: ControlType.String,   title: 'CTA Label',   defaultValue: 'EXPLORE COLLECTION' },
  })
} catch {
  // Running in Next.js — framer package absent, skip property controls
}
