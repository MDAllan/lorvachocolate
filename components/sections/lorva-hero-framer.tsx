// Framer Code Component — paste into Framer canvas
'use client'

import { motion } from 'framer-motion'

// ── BRAND CONSTANTS ────────────────────────────────────────────────────────────

const COLORS = {
  nearBlack:     '#0C0102',
  champagneGold: '#C9A961',
  cream:         '#F6EFE9',
} as const

// ── TYPES ──────────────────────────────────────────────────────────────────────

interface LorvaHeroProps {
  backgroundColor?: string
  showNavbar?: boolean
  tagline?: string
  headline?: string
  description?: string
  ctaLabel?: string
}

// ── SCATTERED BONBON LAYOUT ───────────────────────────────────────────────────
// Positions match the reference: large central piece, others radiating outward.
// Negative marginLeft/marginTop centres each piece on its anchor point.

const HERO_BONBONS = [
  {
    src:      '/bonbons/dark-silk.jpg',
    top:      '34%',
    left:     '52%',
    size:     265,
    rotate:   4,
    floatY:   13,
    duration: 4.2,
    delay:    0.0,
    zIndex:   8,
  },
  {
    src:      '/bonbons/cherry-blush.jpg',
    top:      '8%',
    left:     '47%',
    size:     195,
    rotate:   -10,
    floatY:   9,
    duration: 3.7,
    delay:    0.5,
    zIndex:   7,
  },
  {
    src:      '/bonbons/caramel-fleur-sea-salt.jpg',
    top:      '18%',
    left:     '66%',
    size:     188,
    rotate:   13,
    floatY:   10,
    duration: 4.6,
    delay:    0.3,
    zIndex:   6,
  },
  {
    src:      '/bonbons/hazelnut-crunch-noir.jpg',
    top:      '62%',
    left:     '56%',
    size:     172,
    rotate:   -5,
    floatY:   8,
    duration: 3.5,
    delay:    0.8,
    zIndex:   7,
  },
  {
    src:      '/bonbons/pistachio-royale.jpg',
    top:      '56%',
    left:     '75%',
    size:     158,
    rotate:   9,
    floatY:   7,
    duration: 4.9,
    delay:    1.1,
    zIndex:   5,
  },
]

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────

function LorvaHero({
  backgroundColor = '#280509',
  showNavbar = false,
  tagline = 'Handcrafted. Timeless. Indulgent.',
  headline = 'LORVA CHOCOLATE',
  description = 'Exquisite bonbons crafted with passion and the finest ingredients.',
  ctaLabel = 'EXPLORE COLLECTION',
}: LorvaHeroProps) {
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
      {/* This is the defining light source in the reference image */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 65% 75% at 90% -8%, rgba(215,135,20,0.58) 0%, rgba(190,105,15,0.30) 32%, rgba(160,70,10,0.10) 55%, transparent 72%)',
        pointerEvents: 'none',
      }} />

      {/* ── 3. Secondary warm bloom behind bonbons ────────────────────── */}
      <div style={{
        position: 'absolute',
        top: '5%', right: '5%',
        width: '58%', height: '70%',
        background: 'radial-gradient(ellipse at 65% 25%, rgba(200,120,18,0.20) 0%, rgba(180,90,10,0.08) 45%, transparent 68%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ── 4. Left-side vignette — keeps text readable ───────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(12,1,2,0.55) 0%, rgba(12,1,2,0.15) 35%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* ── 5. Navbar ─────────────────────────────────────────────────── */}
      {showNavbar && (
        <nav style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          height: 72,
          zIndex: 20,
          borderBottom: '1px solid rgba(201,169,97,0.07)',
        }}>
          <span style={{
            fontFamily: 'Josefin Sans, serif',
            color: COLORS.champagneGold,
            fontSize: 13,
            letterSpacing: '0.38em',
            textTransform: 'uppercase' as const,
            lineHeight: 1,
          }}>
            LORVA<br />
            <span style={{ fontSize: 9, letterSpacing: '0.45em', opacity: 0.7 }}>CHOCOLATE</span>
          </span>

          <div style={{ display: 'flex', gap: 40 }}>
            {['SHOP', 'COLLECTIONS', 'OUR STORY', 'JOURNAL'].map(link => (
              <span key={link} style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(246,239,233,0.65)',
                fontSize: 11,
                letterSpacing: '0.3em',
                cursor: 'pointer',
              }}>{link}</span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(246,239,233,0.6)',
              fontSize: 11,
              letterSpacing: '0.25em',
            }}>CART (0)</span>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 5, cursor: 'pointer' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 22, height: 1, background: 'rgba(246,239,233,0.5)' }} />
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* ── 6. Text block ─────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: '46%',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        padding: '0 0 0 56px',
        zIndex: 10,
      }}>
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            letterSpacing: '0.32em',
            color: COLORS.champagneGold,
            textTransform: 'uppercase' as const,
            marginBottom: 32,
          }}
        >
          {tagline}
        </motion.p>

        <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
          <motion.h1
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Josefin Sans, serif',
              fontSize: 'clamp(64px, 7.5vw, 108px)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              lineHeight: 0.88,
              color: COLORS.cream,
              margin: 0,
              display: 'block',
            }}
          >
            {headline.split(' ')[0]}
          </motion.h1>
        </div>

        {headline.split(' ')[1] && (
          <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
            <motion.span
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Josefin Sans, serif',
                fontSize: 'clamp(64px, 7.5vw, 108px)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                lineHeight: 0.88,
                color: COLORS.champagneGold,
                display: 'block',
              }}
            >
              {headline.split(' ')[1]}
            </motion.span>
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            lineHeight: 1.65,
            color: 'rgba(246,239,233,0.6)',
            maxWidth: 340,
            marginTop: 28,
            fontWeight: 300,
          }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          style={{ marginTop: 44 }}
        >
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              padding: '14px 32px',
              border: `1px solid ${COLORS.champagneGold}`,
              background: 'transparent',
              color: COLORS.champagneGold,
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              letterSpacing: '0.28em',
              textTransform: 'uppercase' as const,
              cursor: 'pointer',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = COLORS.champagneGold
              e.currentTarget.style.color = COLORS.nearBlack
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = COLORS.champagneGold
            }}
          >
            {ctaLabel}
            <span style={{ fontSize: 14, letterSpacing: 0 }}>→</span>
          </button>
        </motion.div>
      </div>

      {/* ── 7. Floating bonbon images ─────────────────────────────────── */}
      {/*
        Each bonbon:
          div              — absolute position anchor (negative margin centres it)
            motion.div     — entry animation: fade + scale up
              motion.div   — infinite float loop (y + gentle rock)
                Image      — the actual photo with warm drop-shadow
      */}
      {HERO_BONBONS.map((b) => (
        <div
          key={b.src}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            marginLeft: -(b.size / 2),
            marginTop: -(b.size / 2),
            zIndex: b.zIndex,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.65, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.0,
              delay: 0.55 + b.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              animate={{ y: [0, -b.floatY, 0], rotate: [b.rotate - 2, b.rotate + 2, b.rotate - 2] }}
              transition={{ duration: b.duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: b.delay * 0.4 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.src}
                alt=""
                width={b.size}
                height={b.size}
                style={{
                  width: b.size,
                  height: b.size,
                  objectFit: 'cover',
                  borderRadius: 16,
                  display: 'block',
                  filter: [
                    'drop-shadow(0 28px 56px rgba(0,0,0,0.88))',
                    'drop-shadow(0 8px 24px rgba(0,0,0,0.65))',
                    'drop-shadow(0 0 48px rgba(210,125,18,0.38))',
                  ].join(' '),
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      ))}

      {/* ── 8. Progress indicator ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        style={{
          position: 'absolute',
          bottom: 36,
          left: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 10,
        }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          color: COLORS.champagneGold,
          fontSize: 11,
          letterSpacing: '0.2em',
        }}>01</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 28, height: 1, background: 'rgba(201,169,97,0.35)' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: COLORS.champagneGold }} />
          <div style={{ width: 28, height: 1, background: 'rgba(201,169,97,0.2)' }} />
        </div>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          color: 'rgba(246,239,233,0.28)',
          fontSize: 11,
          letterSpacing: '0.2em',
        }}>03</span>
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
    backgroundColor: { type: ControlType.Color, title: 'Background', defaultValue: '#280509' },
    showNavbar:      { type: ControlType.Boolean, title: 'Show Navbar', defaultValue: true },
    tagline:         { type: ControlType.String, title: 'Tagline', defaultValue: 'Handcrafted. Timeless. Indulgent.' },
    headline:        { type: ControlType.String, title: 'Headline', defaultValue: 'LORVA CHOCOLATE' },
    description:     { type: ControlType.String, title: 'Description', defaultValue: 'Exquisite bonbons crafted with passion and the finest ingredients.' },
    ctaLabel:        { type: ControlType.String, title: 'CTA Label', defaultValue: 'EXPLORE COLLECTION' },
  })
} catch {
  // Running in Next.js — framer package absent, skip property controls
}
