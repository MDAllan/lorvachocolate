'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  MotionValue,
} from 'framer-motion'

// ── BRAND PALETTE ─────────────────────────────────────────────────────────────

const C = {
  bg:           '#120306',   // near-black deep wine — matches reference
  gold:         '#C9A961',
  goldBright:   '#E8C97A',
  cream:        '#F6EFE9',
  nearBlack:    '#060102',
} as const

// ── BONBON CLUSTER ────────────────────────────────────────────────────────────
// Positions tuned to replicate the reference image composition exactly.
// mouseDepth — higher = more mouse parallax movement (closer to viewer).
// parallaxRate — higher = more scroll movement (further from viewer reads as "back").

const BONBONS = [
  {
    id: 'b1',
    label: 'Hazelnut Crunch Noir',
    src: '/bonbons/hazelnut-crunch-noir.jpg',
    // upper-left cluster — medium, slight left-tilt
    top: '6%', left: '39%', size: 122, rotate: -13,
    floatDuration: 6.4, floatDelay: 0.0,
    parallaxRate: 0.08, mouseDepth: 0.06,
  },
  {
    id: 'b2',
    label: 'Cherry Balsamic Noir',
    src: '/bonbons/cherry-balsamic-noir.jpg',
    // upper-right — slightly smaller, right-lean
    top: '3%', left: '64%', size: 108, rotate: 12,
    floatDuration: 7.2, floatDelay: 0.9,
    parallaxRate: 0.14, mouseDepth: 0.10,
  },
  {
    id: 'b3',
    label: 'Dark Silk',
    src: '/bonbons/dark-silk.jpg',
    // CENTER — the anchor, largest sphere
    top: '44%', left: '44%', size: 158, rotate: 0,
    floatDuration: 5.8, floatDelay: 0.4,
    parallaxRate: 0.05, mouseDepth: 0.04,
  },
  {
    id: 'b4',
    label: 'Caramel Fleur de Sel',
    src: '/bonbons/caramel-fleur-sea-salt.jpg',
    // center-right, slightly above sphere
    top: '26%', left: '61%', size: 120, rotate: 14,
    floatDuration: 6.8, floatDelay: 1.3,
    parallaxRate: 0.11, mouseDepth: 0.09,
  },
  {
    id: 'b5',
    label: 'Vanilla Crème',
    src: '/bonbons/vanilla-creme.jpg',
    // lower-right — smallest, sits behind sphere in depth
    top: '63%', left: '71%', size: 98, rotate: -7,
    floatDuration: 7.5, floatDelay: 0.6,
    parallaxRate: 0.18, mouseDepth: 0.07,
  },
]

// ── AMBIENT PARTICLE ──────────────────────────────────────────────────────────
// Seeded deterministic positions — no Math.random(), SSR-safe

function Particle({ seed }: { seed: number }) {
  const left    = ((seed * 37 + 11) % 88) + 6
  const size    = (seed % 3) + 1
  const dur     = 7 + (seed % 7)
  const delay   = (seed * 0.62) % 5.5
  const swayX   = ((seed * 17 + 3) % 60) - 30
  const maxO    = 0.10 + (seed % 4) * 0.07

  return (
    <motion.div
      style={{
        position: 'absolute', bottom: '-8px', left: `${left}%`,
        width: size, height: size, borderRadius: '50%',
        background: C.gold, pointerEvents: 'none',
      }}
      animate={{
        y:       [-8, -820],
        x:       [0, swayX, -swayX / 2, swayX / 4, 0],
        opacity: [0, maxO, maxO * 0.8, 0],
        scale:   [0.4, 1, 0.6, 0.1],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear', times: [0, 0.12, 0.80, 1] }}
    />
  )
}

// ── BONBON CARD ───────────────────────────────────────────────────────────────
// Own component so hooks (useTransform) are called per-card — rules of hooks.

interface BonbonCardProps {
  bonbon:          (typeof BONBONS)[0]
  index:           number
  hovered:         string | null
  clicked:         string | null
  setHovered:      (id: string | null) => void
  setClicked:      React.Dispatch<React.SetStateAction<string | null>>
  scrollYProgress: MotionValue<number>
  smoothMouseX:    MotionValue<number>
  smoothMouseY:    MotionValue<number>
}

function BonbonCard({
  bonbon, index, hovered, clicked,
  setHovered, setClicked,
  scrollYProgress, smoothMouseX, smoothMouseY,
}: BonbonCardProps) {
  const isHovered  = hovered  === bonbon.id
  const isClicked  = clicked  === bonbon.id
  const anyHovered = hovered  !== null
  const anyClicked = clicked  !== null

  // Scroll parallax — deeper items scroll faster (recede sooner)
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, bonbon.parallaxRate * -240])

  // Mouse parallax — each bonbon drifts at its own depth
  const mX = useTransform(smoothMouseX, (v: number) => v * bonbon.mouseDepth * 290)
  const mY = useTransform(smoothMouseY, (v: number) => v * bonbon.mouseDepth * 200)

  // Cursor-relative 3-D tilt
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r  = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2)
    setTiltX(-dy * 24)
    setTiltY( dx * 24)
  }
  const onLeave = () => { setHovered(null); setTiltX(0); setTiltY(0) }

  const r = bonbon.rotate

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.78, filter: 'blur(16px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.4, delay: 0.65 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', top: bonbon.top, left: bonbon.left,
        zIndex: isHovered || isClicked ? 40 : 5,
        x: mX, y: mY,
      }}
    >
      {/* Scroll layer */}
      <motion.div style={{ y: scrollY }}>

        {/* Float loop — organic 5-keyframe motion */}
        <motion.div
          animate={{
            y:      [0, -24, 6, -12, 0],
            rotate: [r - 2, r + 3, r - 1, r + 1.5, r - 2],
            scale:  [1, 1.035, 0.978, 1.015, 1],
          }}
          transition={{
            duration: bonbon.floatDuration, repeat: Infinity,
            ease: 'easeInOut', delay: bonbon.floatDelay,
            times: [0, 0.28, 0.52, 0.76, 1],
          }}
        >
          {/* 3-D perspective wrapper */}
          <div style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}>
            <motion.div
              animate={{
                scale: isClicked  ? 1.35
                  : anyClicked    ? 0.68
                  : isHovered     ? 1.10
                  : anyHovered    ? 0.95
                  : 1,
                opacity: (anyClicked && !isClicked)              ? 0.08
                  : (anyHovered && !isHovered && !anyClicked)    ? 0.25
                  : 1,
                rotateX: isClicked ? 0 : tiltX,
                rotateY: isClicked ? 360 : tiltY,
                filter:
                  (anyHovered || anyClicked) && !isHovered && !isClicked
                    ? 'blur(4px) brightness(0.5)'
                    : isHovered
                    ? 'drop-shadow(0 36px 64px rgba(0,0,0,0.9)) brightness(1.12)'
                    : 'blur(0px) brightness(1)',
              }}
              transition={{
                scale:   { duration: isClicked ? 0.80 : 0.42, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.42 },
                rotateX: { duration: isClicked ? 0.85 : 0.26, ease: [0.22, 1, 0.36, 1] },
                rotateY: { duration: isClicked ? 0.85 : 0.26, ease: [0.22, 1, 0.36, 1] },
                filter:  { duration: 0.36 },
              }}
              onMouseEnter={() => setHovered(bonbon.id)}
              onMouseLeave={onLeave}
              onMouseMove={onMove}
              onClick={() => setClicked(p => p === bonbon.id ? null : bonbon.id)}
              style={{
                cursor: 'pointer', pointerEvents: 'all',
                position: 'relative', transformStyle: 'preserve-3d',
              }}
            >
              {/* Bonbon image */}
              <img
                src={bonbon.src}
                alt={bonbon.label}
                width={bonbon.size}
                height={bonbon.size}
                style={{
                  width: bonbon.size, height: bonbon.size,
                  borderRadius: '50%', objectFit: 'cover', display: 'block',
                  boxShadow: '0 22px 64px rgba(0,0,0,0.80), 0 0 0 1px rgba(201,169,97,0.07)',
                }}
              />

              {/* Champagne ring */}
              <motion.div
                animate={{ opacity: isHovered || isClicked ? 1 : 0, scale: isClicked ? 1.12 : 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: 'absolute', inset: -6, borderRadius: '50%',
                  border: '1px solid rgba(201,169,97,0.55)', pointerEvents: 'none',
                }}
              />

              {/* Radiating pulse ring on click */}
              <motion.div
                animate={{
                  opacity: isClicked ? [0.7, 0.1, 0.5, 0.05] : 0,
                  scale:   isClicked ? [1, 1.4, 1.2, 1.65]   : 1,
                }}
                transition={{ duration: 1.9, repeat: isClicked ? Infinity : 0, ease: 'easeOut' }}
                style={{
                  position: 'absolute', inset: -22, borderRadius: '50%',
                  border: '1px solid rgba(201,169,97,0.30)', pointerEvents: 'none',
                }}
              />

              {/* Label tooltip */}
              <motion.div
                animate={{ opacity: isHovered || isClicked ? 1 : 0, y: isHovered || isClicked ? -6 : 4 }}
                transition={{ duration: 0.28 }}
                style={{
                  position: 'absolute', bottom: '100%', left: '50%',
                  transform: 'translateX(-50%)', marginBottom: 10,
                  fontFamily: 'Inter, sans-serif', fontSize: 9,
                  letterSpacing: '0.32em', color: C.gold,
                  textTransform: 'uppercase', whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {bonbon.label}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────

interface LorvaHeroProps {
  content?:         Record<string, string>
  backgroundColor?: string
  showNavbar?:      boolean
}

export function LorvaHero({ content = {}, backgroundColor = '#120306', showNavbar = false }: LorvaHeroProps) {
  const tagline     = content.hero_tagline     ?? 'Handcrafted. Timeless. Indulgent.'
  const headline1   = content.hero_headline_1  ?? 'LORVA'
  const headline2   = content.hero_headline_2  ?? 'CHOCOLATE'
  const description = content.hero_description ?? 'Exquisite bonbons crafted with passion\nand the finest ingredients.'
  const ctaLabel    = content.hero_cta         ?? 'EXPLORE COLLECTION'

  const [hovered, setHovered] = useState<string | null>(null)
  const [clicked, setClicked] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // ── Mouse tracking ──────────────────────────────────────────────────────────
  const mouseX = useMotionValue(0)   // -0.5 → 0.5
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 48, damping: 22, restDelta: 0.001 })
  const smoothY = useSpring(mouseY, { stiffness: 48, damping: 22, restDelta: 0.001 })

  // Raw pixel coords for cursor spotlight
  const rawX = useMotionValue(700)
  const rawY = useMotionValue(300)
  const sRawX = useSpring(rawX, { stiffness: 85, damping: 22 })
  const sRawY = useSpring(rawY, { stiffness: 85, damping: 22 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sRawX}px ${sRawY}px, rgba(201,169,97,0.048) 0%, transparent 72%)`

  // Text counter-parallax
  const textX = useTransform(smoothX, (v: number) => v * -26)
  const textY = useTransform(smoothY, (v: number) => v * -14)

  // Background slow drift
  const bgX = useTransform(smoothX, (v: number) => v * 16)
  const bgY = useTransform(smoothY, (v: number) => v * 10)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5)
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
  }
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative', width: '100%', height: '100vh', minHeight: 660,
        overflow: 'hidden', background: C.nearBlack,
        fontFamily: 'Inter, -apple-system, sans-serif',
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400&display=swap');`}</style>

      {/* ── LAYER 1: Background base — drifts with mouse ──────────────── */}
      <motion.div style={{
        position: 'absolute', inset: '-4%', zIndex: 0,
        background: `radial-gradient(ellipse 90% 90% at 65% 45%, #3a0d14 0%, ${backgroundColor} 38%, #060102 100%)`,
        x: bgX, y: bgY,
      }} />

      {/* ── LAYER 2: Cinematic amber spotlight — upper-right (KEY ELEMENT) */}
      {/* This is the defining light source from the reference image       */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 58% 68% at 100% -4%, rgba(218,122,8,0.82) 0%, rgba(185,95,6,0.50) 20%, rgba(130,60,4,0.22) 42%, transparent 62%)',
      }} />

      {/* ── LAYER 3: Secondary warm fill — gives bonbons a lit look ──────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 72% 72% at 85% 8%, rgba(165,85,8,0.30) 0%, transparent 55%)',
      }} />

      {/* ── LAYER 4: Left dark vignette — keeps text legible ─────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to right, rgba(6,1,2,0.82) 0%, rgba(6,1,2,0.42) 32%, rgba(6,1,2,0.10) 50%, transparent 64%)',
      }} />

      {/* ── LAYER 5: Bottom shadow well ──────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(4,0,1,0.90) 0%, rgba(4,0,1,0.40) 12%, rgba(4,0,1,0.08) 26%, transparent 40%)',
      }} />

      {/* ── LAYER 6: Top ceiling shadow ───────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(4,0,1,0.68) 0%, rgba(4,0,1,0.14) 14%, transparent 28%)',
      }} />

      {/* ── LAYER 7: Film grain ───────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        opacity: 0.055, mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '152px 152px',
      } as React.CSSProperties} />

      {/* ── LAYER 8: Cursor spotlight ─────────────────────────────────────── */}
      <motion.div style={{ position: 'absolute', inset: 0, zIndex: 3, background: spotlight, pointerEvents: 'none' }} />

      {/* ── LAYER 9: Horizontal gold shimmer sweep — every ~13s ───────────── */}
      <motion.div
        style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, width: 1.5, zIndex: 4,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(201,169,97,0.10) 28%, rgba(201,169,97,0.48) 50%, rgba(201,169,97,0.10) 72%, transparent 100%)',
          pointerEvents: 'none',
        }}
        animate={{ x: ['-4px', '102vw'] }}
        transition={{ duration: 5.5, repeat: Infinity, repeatDelay: 7.5, ease: [0.25, 0, 0.75, 1] }}
      />

      {/* ── LAYER 10: Ambient gold particles ─────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: 26 }, (_, i) => <Particle key={i} seed={i + 1} />)}
      </div>

      {/* ── Optional decorative navbar (Framer canvas) ────────────────────── */}
      {showNavbar && (
        <nav style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px', height: 72,
          borderBottom: '1px solid rgba(201,169,97,0.06)',
        }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', color: C.gold, fontSize: 13, letterSpacing: '0.36em', textTransform: 'uppercase', lineHeight: 1.1 }}>
            LORVA<br /><span style={{ fontSize: 9, letterSpacing: '0.46em', opacity: 0.65 }}>CHOCOLATE</span>
          </span>
          <div style={{ display: 'flex', gap: 40 }}>
            {['SHOP', 'COLLECTIONS', 'OUR STORY', 'JOURNAL'].map(l => (
              <span key={l} style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(246,239,233,0.60)', fontSize: 11, letterSpacing: '0.30em', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(246,239,233,0.55)', fontSize: 11, letterSpacing: '0.24em' }}>CART (0)</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, cursor: 'pointer' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 1, background: 'rgba(246,239,233,0.46)' }} />)}
            </div>
          </div>
        </nav>
      )}

      {/* ── TEXT BLOCK — left side, counter-parallax ─────────────────────── */}
      <motion.div
        animate={{ opacity: clicked ? 0.70 : hovered ? 0.80 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '44%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          paddingLeft: 56, paddingBottom: 40,
          zIndex: 10, x: textX, y: textY,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.35, ease: 'easeOut' }}
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.36em',
            color: C.gold, textTransform: 'uppercase', marginBottom: 34, opacity: 0.85,
          }}
        >{tagline}</motion.p>

        {/* LORVA — large display serif, cream */}
        <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
          <motion.h1
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.15, delay: 0.50, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(70px, 8.5vw, 118px)',
              fontWeight: 300, letterSpacing: '0.04em', lineHeight: 0.88,
              color: C.cream, margin: 0, display: 'block',
              textTransform: 'uppercase',
            }}
          >{headline1}</motion.h1>
        </div>

        {/* CHOCOLATE — large display serif, champagne gold */}
        <div style={{ overflow: 'hidden', lineHeight: 0.88, marginTop: 4 }}>
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.15, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(70px, 8.5vw, 118px)',
              fontWeight: 300, letterSpacing: '0.04em', lineHeight: 0.88,
              color: C.gold, display: 'block',
              textTransform: 'uppercase',
            }}
          >{headline2}</motion.span>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.05 }}
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.70,
            color: 'rgba(246,239,233,0.58)', maxWidth: 340,
            marginTop: 30, fontWeight: 300, whiteSpace: 'pre-line',
          }}
        >{description}</motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.30 }}
          style={{ marginTop: 46 }}
        >
          <motion.button
            whileHover={{ backgroundColor: C.gold, color: C.nearBlack }}
            transition={{ duration: 0.26 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 18,
              padding: '14px 32px',
              border: `1px solid ${C.gold}`, background: 'transparent', color: C.gold,
              fontFamily: 'Inter, sans-serif', fontSize: 10,
              letterSpacing: '0.30em', textTransform: 'uppercase', cursor: 'pointer',
            }}
          >
            {ctaLabel}
            <span style={{ fontSize: 14, letterSpacing: 0 }}>→</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── FLOATING BONBONS ──────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none' }}>
        {BONBONS.map((b, i) => (
          <BonbonCard
            key={b.id}
            bonbon={b}
            index={i}
            hovered={hovered}
            clicked={clicked}
            setHovered={setHovered}
            setClicked={setClicked}
            scrollYProgress={scrollYProgress}
            smoothMouseX={smoothX}
            smoothMouseY={smoothY}
          />
        ))}
      </div>

      {/* ── PROGRESS INDICATOR — bottom left ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.65 }}
        style={{
          position: 'absolute', bottom: 36, left: 56,
          display: 'flex', alignItems: 'center', gap: 12, zIndex: 10,
        }}
      >
        <span style={{ fontFamily: 'Inter, sans-serif', color: C.gold, fontSize: 11, letterSpacing: '0.22em' }}>01</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 26, height: 1, background: 'rgba(201,169,97,0.38)' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.gold, boxShadow: '0 0 6px rgba(201,169,97,0.6)' }} />
          <div style={{ width: 26, height: 1, background: 'rgba(201,169,97,0.18)' }} />
        </div>
        <span style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(246,239,233,0.26)', fontSize: 11, letterSpacing: '0.22em' }}>03</span>
      </motion.div>
    </section>
  )
}

export default LorvaHero
export const FramerHero = LorvaHero
