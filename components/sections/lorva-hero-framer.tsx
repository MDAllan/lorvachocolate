// Framer Code Component — paste into Framer canvas
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// ── BRAND CONSTANTS ────────────────────────────────────────────────────────────

const COLORS = {
  base:          '#2A0A12',
  nearBlack:     '#0D0206',
  champagneGold: '#C9A961',
  cream:         '#F6EFE9',
  darkShell:     '#1A0800',
  midShell:      '#2C1200',
  highlight:     '#3D1800',
} as const

// ── TYPES ──────────────────────────────────────────────────────────────────────

type FlavorKey = 'blueberry' | 'caramel' | 'raspberry' | 'hazelnut' | 'vanilla'

interface FlavorTheme {
  name: FlavorKey
  bgFocalColor: string
  glowColor: string
  accentColor: string
  accentDark: string
}

interface BonbonConfig {
  id: FlavorKey
  top: string
  left: string
  size: number
  rotate: number
  shape: 'hexagonal' | 'rectangular' | 'sphere' | 'half-sphere' | 'square-gift'
  floatDuration: number
  rotatePhase: number
  theme: FlavorTheme
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

const FLAVOR_THEMES: Record<FlavorKey, FlavorTheme> = {
  blueberry: {
    name: 'blueberry',
    bgFocalColor: '#3D1560',
    glowColor: 'rgba(139,26,107,0.75)',
    accentColor: '#8B1A6B',
    accentDark: '#4A0A38',
  },
  caramel: {
    name: 'caramel',
    bgFocalColor: '#3D2000',
    glowColor: 'rgba(200,134,10,0.75)',
    accentColor: '#C8860A',
    accentDark: '#7A4A00',
  },
  raspberry: {
    name: 'raspberry',
    bgFocalColor: '#3D0015',
    glowColor: 'rgba(196,30,58,0.75)',
    accentColor: '#C41E3A',
    accentDark: '#6A0010',
  },
  hazelnut: {
    name: 'hazelnut',
    bgFocalColor: '#2A1500',
    glowColor: 'rgba(139,94,42,0.7)',
    accentColor: '#8B5E2A',
    accentDark: '#4A2E0A',
  },
  vanilla: {
    name: 'vanilla',
    bgFocalColor: '#2A2000',
    glowColor: 'rgba(201,169,97,0.65)',
    accentColor: '#C9A961',
    accentDark: '#7A6030',
  },
}

// ── BONBON DATA ────────────────────────────────────────────────────────────────

const BONBON_DATA: BonbonConfig[] = [
  {
    id: 'blueberry',
    top: '8%',
    left: '60%',
    size: 118,
    rotate: -14,
    shape: 'hexagonal',
    floatDuration: 3.5,
    rotatePhase: 0.0,
    theme: FLAVOR_THEMES.blueberry,
  },
  {
    id: 'caramel',
    top: '32%',
    left: '68%',
    size: 105,
    rotate: 15,
    shape: 'rectangular',
    floatDuration: 4.2,
    rotatePhase: 0.25,
    theme: FLAVOR_THEMES.caramel,
  },
  {
    id: 'raspberry',
    top: '52%',
    left: '52%',
    size: 148,
    rotate: 0,
    shape: 'sphere',
    floatDuration: 3.8,
    rotatePhase: 0.5,
    theme: FLAVOR_THEMES.raspberry,
  },
  {
    id: 'hazelnut',
    top: '16%',
    left: '77%',
    size: 108,
    rotate: 8,
    shape: 'half-sphere',
    floatDuration: 4.5,
    rotatePhase: 0.75,
    theme: FLAVOR_THEMES.hazelnut,
  },
  {
    id: 'vanilla',
    top: '63%',
    left: '75%',
    size: 118,
    rotate: -6,
    shape: 'square-gift',
    floatDuration: 3.2,
    rotatePhase: 0.15,
    theme: FLAVOR_THEMES.vanilla,
  },
]

// ── GOLD DUST SUB-COMPONENT ────────────────────────────────────────────────────
// Deterministic positions — no Math.random() to avoid hydration mismatches

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
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: f.s,
            height: f.s,
            borderRadius: '50%',
            background: COLORS.champagneGold,
            opacity: f.o,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  )
}

// ── BONBON SHAPE SUB-COMPONENT ─────────────────────────────────────────────────

function BonbonShape({ config }: { config: BonbonConfig }) {
  const { size, shape, theme } = config
  const s = size

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
  }

  // Shared shell + highlight + vignette layers
  const shellBase = (
    <div style={{
      ...baseStyle,
      background: `radial-gradient(circle at 65% 28%, ${COLORS.highlight} 0%, ${COLORS.midShell} 40%, ${COLORS.darkShell} 75%, #080200 100%)`,
    }} />
  )

  const specularHighlight = (
    <div style={{
      ...baseStyle,
      background: 'radial-gradient(circle at 20% 18%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.08) 30%, transparent 58%)',
      pointerEvents: 'none',
    }} />
  )

  const edgeVignette = (
    <div style={{
      ...baseStyle,
      background: 'radial-gradient(circle at center, transparent 48%, rgba(0,0,0,0.65) 100%)',
      pointerEvents: 'none',
    }} />
  )

  // ── HEXAGONAL (Blueberry) ──────────────────────────────────────────────────
  if (shape === 'hexagonal') {
    return (
      <div style={{
        width: s,
        height: s * 0.92,
        position: 'relative',
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        boxShadow: `0 ${s * 0.12}px ${s * 0.32}px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,169,97,0.08)`,
      }}>
        {shellBase}
        {/* Faceted top face accent */}
        <div style={{
          ...baseStyle,
          background: `radial-gradient(ellipse at 40% 35%, ${theme.accentColor} 0%, ${theme.accentDark} 55%, transparent 80%)`,
          opacity: 0.85,
        }} />
        {/* Facet edge lines for depth */}
        <div style={{
          ...baseStyle,
          background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)`,
        }} />
        <GoldDust count={8} />
        {specularHighlight}
        {edgeVignette}
      </div>
    )
  }

  // ── RECTANGULAR/CUBE (Caramel) ─────────────────────────────────────────────
  if (shape === 'rectangular') {
    const w = Math.round(s * 1.35)
    const h = Math.round(s * 0.82)
    const faceW = 14
    const topH  = 11

    return (
      <div style={{ position: 'relative', width: w + faceW, height: h + topH }}>
        {/* Top face */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: faceW,
          width: w,
          height: topH,
          background: `linear-gradient(to right, ${theme.accentColor}, ${theme.accentDark})`,
          transform: 'skewX(-25deg)',
          transformOrigin: 'bottom left',
          borderRadius: '3px 3px 0 0',
        }} />
        {/* Right face */}
        <div style={{
          position: 'absolute',
          top: topH,
          right: 0,
          width: faceW,
          height: h,
          background: `linear-gradient(to right, #1a0800, #080200)`,
          borderRadius: '0 4px 4px 0',
        }} />
        {/* Front face */}
        <div style={{
          position: 'absolute',
          top: topH,
          left: 0,
          width: w,
          height: h,
          borderRadius: '4px 0 0 4px',
          overflow: 'hidden',
          boxShadow: `0 ${s * 0.1}px ${s * 0.28}px rgba(0,0,0,0.75)`,
        }}>
          {shellBase}
          <div style={{
            ...baseStyle,
            background: `radial-gradient(ellipse at 35% 40%, ${theme.accentColor} 0%, ${theme.accentDark} 50%, transparent 80%)`,
            opacity: 0.75,
          }} />
          {/* Caramel drip */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '18%',
            width: 5,
            height: '45%',
            background: `linear-gradient(to bottom, ${theme.accentColor}, rgba(200,134,10,0.2))`,
            borderRadius: '0 0 4px 4px',
          }} />
          <GoldDust count={6} />
          {specularHighlight}
          {edgeVignette}
        </div>
      </div>
    )
  }

  // ── SPHERE (Raspberry) ─────────────────────────────────────────────────────
  if (shape === 'sphere') {
    return (
      <div style={{
        width: s,
        height: s,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 ${s * 0.14}px ${s * 0.35}px rgba(0,0,0,0.75), 0 0 0 1px rgba(201,169,97,0.06)`,
      }}>
        {shellBase}
        {/* Raspberry deep-red bloom */}
        <div style={{
          ...baseStyle,
          background: `radial-gradient(circle at 42% 38%, ${theme.accentColor} 0%, ${theme.accentDark} 45%, transparent 72%)`,
          opacity: 0.9,
        }} />
        {/* Gold speckle ring */}
        <div style={{
          position: 'absolute',
          inset: '22%',
          borderRadius: '50%',
          border: `1px solid rgba(201,169,97,0.2)`,
        }} />
        <GoldDust count={9} />
        {specularHighlight}
        {edgeVignette}
      </div>
    )
  }

  // ── HALF-SPHERE (Hazelnut) ─────────────────────────────────────────────────
  if (shape === 'half-sphere') {
    const cavityW = Math.round(s * 0.62)
    const cavityH = Math.round(s * 0.28)

    return (
      <div style={{
        width: s,
        height: Math.round(s * 0.62),
        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 ${s * 0.1}px ${s * 0.3}px rgba(0,0,0,0.7)`,
      }}>
        {shellBase}
        {/* Hazelnut warm tone */}
        <div style={{
          ...baseStyle,
          background: `radial-gradient(ellipse at 45% 60%, ${theme.accentColor} 0%, ${theme.accentDark} 55%, transparent 80%)`,
          opacity: 0.8,
        }} />
        {/* Interior cavity */}
        <div style={{
          position: 'absolute',
          width: cavityW,
          height: cavityH,
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          background: `radial-gradient(ellipse at center, ${theme.accentColor} 0%, ${theme.accentDark} 55%, #1a0800 100%)`,
          borderRadius: '50%',
          boxShadow: 'inset 0 4px 14px rgba(0,0,0,0.8)',
        }} />
        <GoldDust count={7} />
        {specularHighlight}
        {edgeVignette}
      </div>
    )
  }

  // ── SQUARE GIFT (Vanilla) ─────────────────────────────────────────────────
  if (shape === 'square-gift') {
    const ribbonThickness = 9
    const bowSize = 16

    return (
      <div style={{
        width: s,
        height: s,
        borderRadius: 8,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 ${s * 0.12}px ${s * 0.3}px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,169,97,0.1)`,
      }}>
        {shellBase}
        {/* Vanilla warm tone */}
        <div style={{
          ...baseStyle,
          background: `radial-gradient(ellipse at 38% 35%, ${theme.accentColor} 0%, ${theme.accentDark} 50%, transparent 78%)`,
          opacity: 0.7,
        }} />
        <GoldDust count={7} />
        {specularHighlight}
        {edgeVignette}
        {/* Horizontal ribbon */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: ribbonThickness,
          transform: 'translateY(-50%)',
          background: `linear-gradient(to bottom, ${theme.accentColor}, rgba(201,169,97,0.7))`,
          opacity: 0.85,
          pointerEvents: 'none',
        }} />
        {/* Vertical ribbon */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: ribbonThickness,
          transform: 'translateX(-50%)',
          background: `linear-gradient(to right, ${theme.accentColor}, rgba(201,169,97,0.7))`,
          opacity: 0.85,
          pointerEvents: 'none',
        }} />
        {/* Bow knot center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: bowSize,
          height: bowSize,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: COLORS.champagneGold,
          boxShadow: '0 0 8px rgba(201,169,97,0.6)',
          pointerEvents: 'none',
        }} />
      </div>
    )
  }

  return null
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────

function LorvaHero({
  backgroundColor = '#2A0A12',
  showNavbar = false,
  tagline = 'Handcrafted. Timeless. Indulgent.',
  headline = 'LORVA CHOCOLATE',
  description = 'Exquisite bonbons crafted with passion and the finest ingredients.',
  ctaLabel = 'EXPLORE COLLECTION',
}: LorvaHeroProps) {
  const [hoveredFlavor, setHoveredFlavor] = useState<FlavorKey | null>(null)

  const activeBg = hoveredFlavor
    ? `radial-gradient(ellipse 80% 80% at 70% 40%, ${FLAVOR_THEMES[hoveredFlavor].bgFocalColor} 0%, #2A0A12 45%, #0D0206 100%)`
    : `radial-gradient(ellipse 80% 80% at 70% 40%, #3D0820 0%, ${backgroundColor} 45%, #0D0206 100%)`

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
      {/* Google Fonts (needed in Framer canvas) */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600&family=Inter:wght@300;400&display=swap');`}</style>

      {/* ── 1. Animated background ─────────────────────────────────────── */}
      <motion.div
        animate={{ background: activeBg }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      {/* ── 2. Cinematic golden light ray ──────────────────────────────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(118deg, rgba(201,169,97,0.14) 0%, rgba(201,169,97,0.04) 28%, transparent 52%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Secondary warm glow from upper-right */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '55%',
        height: '60%',
        background: 'radial-gradient(ellipse at 80% 20%, rgba(201,169,97,0.09) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ── 3. Decorative navbar ───────────────────────────────────────── */}
      {showNavbar && (
        <nav style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
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

      {/* ── 4. Text block ─────────────────────────────────────────────── */}
      <motion.div
        animate={{ opacity: hoveredFlavor ? 0.85 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '46%',
          display: 'flex',
          flexDirection: 'column' as const,
          justifyContent: 'center',
          padding: '0 0 0 56px',
          zIndex: 10,
        }}
      >
        {/* Tagline */}
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
            opacity: 0,
          }}
        >
          {tagline}
        </motion.p>

        {/* Headline: LORVA */}
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

        {/* Headline: CHOCOLATE */}
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

        {/* Description */}
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

        {/* CTA */}
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
              const btn = e.currentTarget
              btn.style.background = COLORS.champagneGold
              btn.style.color = COLORS.nearBlack
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget
              btn.style.background = 'transparent'
              btn.style.color = COLORS.champagneGold
            }}
          >
            {ctaLabel}
            <span style={{ fontSize: 14, letterSpacing: 0 }}>→</span>
          </button>
        </motion.div>
      </motion.div>

      {/* ── 5. Bonbons ────────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
        {BONBON_DATA.map((bonbon, index) => {
          const isHovered = hoveredFlavor === bonbon.id
          const r = bonbon.rotate

          return (
            <motion.div
              key={bonbon.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: bonbon.top,
                left: bonbon.left,
              }}
            >
              {/* Outer: float loop — never interrupted by hover */}
              <motion.div
                animate={{
                  y: [0, -14, 0],
                  rotate: [r, r + 2.5, r, r - 2.5, r],
                }}
                transition={{
                  duration: bonbon.floatDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.25, 0.5, 0.75, 1],
                  delay: bonbon.floatDuration * bonbon.rotatePhase,
                }}
              >
                {/* Inner: hover state — scale, opacity, glow */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.09 : 1,
                    opacity: hoveredFlavor && !isHovered ? 0.28 : 1,
                    boxShadow: isHovered
                      ? `0 0 70px 45px ${bonbon.theme.glowColor}`
                      : '0 0 0px 0px rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  onMouseEnter={() => setHoveredFlavor(bonbon.id)}
                  onMouseLeave={() => setHoveredFlavor(null)}
                  style={{
                    cursor: 'crosshair',
                    pointerEvents: 'all',
                    borderRadius: bonbon.shape === 'sphere' ? '50%' : bonbon.shape === 'hexagonal' ? '12%' : '6px',
                  }}
                >
                  <BonbonShape config={bonbon} />

                  {/* Flavor label tooltip on hover */}
                  <motion.div
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? -8 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: 10,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 9,
                      letterSpacing: '0.3em',
                      color: COLORS.champagneGold,
                      textTransform: 'uppercase' as const,
                      whiteSpace: 'nowrap' as const,
                      pointerEvents: 'none',
                    }}
                  >
                    {bonbon.id}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* ── 6. Progress indicator ─────────────────────────────────────── */}
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

// Framer property controls — only available inside Framer canvas runtime.
// The try/catch prevents the Next.js build from failing (framer pkg absent).
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { addPropertyControls, ControlType } = require('framer')
  addPropertyControls(FramerHero, {
    backgroundColor: {
      type: ControlType.Color,
      title: 'Background',
      defaultValue: '#2A0A12',
    },
    showNavbar: {
      type: ControlType.Boolean,
      title: 'Show Navbar',
      defaultValue: true,
    },
    tagline: {
      type: ControlType.String,
      title: 'Tagline',
      defaultValue: 'Handcrafted. Timeless. Indulgent.',
    },
    headline: {
      type: ControlType.String,
      title: 'Headline',
      defaultValue: 'LORVA CHOCOLATE',
    },
    description: {
      type: ControlType.String,
      title: 'Description',
      defaultValue: 'Exquisite bonbons crafted with passion and the finest ingredients.',
    },
    ctaLabel: {
      type: ControlType.String,
      title: 'CTA Label',
      defaultValue: 'EXPLORE COLLECTION',
    },
  })
} catch {
  // Running in Next.js — framer package absent, skip property controls
}
