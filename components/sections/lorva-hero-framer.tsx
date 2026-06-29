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

// ── BRAND CONSTANTS ────────────────────────────────────────────────────────────

const COLORS = {
  nearBlack:     '#0C0102',
  champagneGold: '#C9A961',
  cream:         '#F6EFE9',
} as const

// ── TYPES ──────────────────────────────────────────────────────────────────────

interface PhotoConfig {
  id:            string
  label:         string
  src:           string
  top:           string
  left:          string
  size:          number
  rotate:        number
  floatDuration: number
  floatDelay:    number
  parallaxRate:  number  // scroll depth (0.05–0.18)
  mouseDepth:    number  // mouse parallax depth (0.03–0.12)
}

interface LorvaHeroProps {
  backgroundColor?: string
  showNavbar?:      boolean
  tagline?:         string
  headline?:        string
  description?:     string
  ctaLabel?:        string
}

// ── PHOTO CLUSTER ─────────────────────────────────────────────────────────────

const PHOTOS: PhotoConfig[] = [
  {
    id: 'hazelnut', label: 'Hazelnut Crunch Noir',
    src: '/bonbons/hazelnut-crunch-noir.jpg',
    top: '36%', left: '57%',
    size: 178, rotate: 3,
    floatDuration: 6.2, floatDelay: 0.0,
    parallaxRate: 0.06, mouseDepth: 0.05,
  },
  {
    id: 'pistachio', label: 'Pistachio Royale',
    src: '/bonbons/pistachio-royale.jpg',
    top: '12%', left: '48%',
    size: 126, rotate: -8,
    floatDuration: 7.1, floatDelay: 0.8,
    parallaxRate: 0.12, mouseDepth: 0.10,
  },
  {
    id: 'cherry', label: 'Cherry Blush',
    src: '/bonbons/cherry-blush.jpg',
    top: '18%', left: '72%',
    size: 138, rotate: 12,
    floatDuration: 5.8, floatDelay: 0.4,
    parallaxRate: 0.09, mouseDepth: 0.08,
  },
  {
    id: 'caramel', label: 'Caramel Fleur de Sel',
    src: '/bonbons/caramel-fleur-sea-salt.jpg',
    top: '62%', left: '50%',
    size: 118, rotate: -5,
    floatDuration: 6.8, floatDelay: 1.2,
    parallaxRate: 0.15, mouseDepth: 0.12,
  },
  {
    id: 'vanilla', label: 'Vanilla Crème',
    src: '/bonbons/vanilla-creme.jpg',
    top: '68%', left: '74%',
    size: 100, rotate: 8,
    floatDuration: 7.4, floatDelay: 0.6,
    parallaxRate: 0.18, mouseDepth: 0.06,
  },
]

// ── AMBIENT PARTICLE ──────────────────────────────────────────────────────────
// Deterministic seeded positions — safe for SSR, no Math.random()

function Particle({ seed }: { seed: number }) {
  const startLeft = ((seed * 37 + 11) % 88) + 6
  const size      = (seed % 3) + 1
  const duration  = 7 + (seed % 6)
  const delay     = (seed * 0.65) % 5.5
  const swayX     = ((seed * 17 + 3) % 60) - 30
  const maxO      = 0.12 + (seed % 4) * 0.08

  return (
    <motion.div
      style={{
        position:     'absolute',
        bottom:       '-8px',
        left:         `${startLeft}%`,
        width:        size,
        height:       size,
        borderRadius: '50%',
        background:   COLORS.champagneGold,
        pointerEvents: 'none',
      }}
      animate={{
        y:       [-8, -780],
        x:       [0, swayX, -swayX / 2, swayX / 4, 0],
        opacity: [0, maxO, maxO * 0.75, 0],
        scale:   [0.5, 1, 0.7, 0.2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease:   'linear',
        times:  [0, 0.12, 0.78, 1],
      }}
    />
  )
}

// ── PHOTO CARD ─────────────────────────────────────────────────────────────────
// Extracted to its own component so hooks (useTransform) can be called per card

function PhotoCard({
  photo,
  index,
  hovered,
  clicked,
  setHovered,
  setClicked,
  scrollYProgress,
  smoothMouseX,
  smoothMouseY,
}: {
  photo:           PhotoConfig
  index:           number
  hovered:         string | null
  clicked:         string | null
  setHovered:      (id: string | null) => void
  setClicked:      React.Dispatch<React.SetStateAction<string | null>>
  scrollYProgress: MotionValue<number>
  smoothMouseX:    MotionValue<number>
  smoothMouseY:    MotionValue<number>
}) {
  const isHovered  = hovered === photo.id
  const isClicked  = clicked === photo.id
  const anyHovered = hovered !== null
  const anyClicked = clicked !== null

  // Scroll parallax
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, photo.parallaxRate * -220])

  // Mouse parallax — each image at a different depth, moves separately
  const mouseOffsetX = useTransform(smoothMouseX, (v: number) => v * photo.mouseDepth * 280)
  const mouseOffsetY = useTransform(smoothMouseY, (v: number) => v * photo.mouseDepth * 190)

  // Hover 3D tilt — cursor position relative to image center
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    setTiltX(-dy * 22)
    setTiltY(dx * 22)
  }

  const handleLeave = () => {
    setHovered(null)
    setTiltX(0)
    setTiltY(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, filter: 'blur(14px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.3, delay: 0.7 + index * 0.16, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top:      photo.top,
        left:     photo.left,
        zIndex:   isHovered || isClicked ? 30 : 5,
        x:        mouseOffsetX,
        y:        mouseOffsetY,
      }}
    >
      {/* Scroll parallax layer */}
      <motion.div style={{ y: scrollY }}>

        {/* Float loop — organic multi-keyframe motion */}
        <motion.div
          animate={{
            y:      [0, -22, 5, -10, 0],
            rotate: [photo.rotate - 2, photo.rotate + 2.5, photo.rotate - 1, photo.rotate + 1.5, photo.rotate - 2],
            scale:  [1, 1.03, 0.982, 1.012, 1],
          }}
          transition={{
            duration:   photo.floatDuration,
            repeat:     Infinity,
            ease:       'easeInOut',
            delay:      photo.floatDelay,
            times:      [0, 0.28, 0.52, 0.76, 1],
          }}
        >
          {/* Perspective container for 3D tilt + click spin */}
          <div style={{ perspective: '900px', perspectiveOrigin: 'center center' }}>

            <motion.div
              animate={{
                // Scale: clicked = forward/large, others recede; hover = slight lift
                scale: isClicked
                  ? 1.32
                  : anyClicked
                  ? 0.70
                  : isHovered
                  ? 1.09
                  : anyHovered
                  ? 0.96
                  : 1,
                // Opacity: recede others heavily when clicked
                opacity: (anyClicked && !isClicked)
                  ? 0.10
                  : (anyHovered && !isHovered && !anyClicked)
                  ? 0.28
                  : 1,
                // 3D tilt on hover (cursor-tracked), Y-spin on click
                rotateX: isClicked ? 0 : tiltX,
                rotateY: isClicked ? 360 : tiltY,
                // Blur background items when anything is hovered/clicked
                filter: (anyHovered || anyClicked) && !isHovered && !isClicked
                  ? 'blur(4px) brightness(0.55)'
                  : isHovered
                  ? 'drop-shadow(0 32px 58px rgba(0,0,0,0.85)) brightness(1.1)'
                  : 'blur(0px) brightness(1)',
              }}
              transition={{
                scale:   { duration: isClicked ? 0.78 : 0.45, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.45, ease: 'easeOut' },
                rotateX: { duration: isClicked ? 0.82 : 0.28, ease: [0.22, 1, 0.36, 1] },
                rotateY: { duration: isClicked ? 0.82 : 0.28, ease: [0.22, 1, 0.36, 1] },
                filter:  { duration: 0.38 },
              }}
              onMouseEnter={() => setHovered(photo.id)}
              onMouseLeave={handleLeave}
              onMouseMove={handleTiltMove}
              onClick={() => setClicked(prev => prev === photo.id ? null : photo.id)}
              style={{
                cursor:         'pointer',
                pointerEvents:  'all',
                position:       'relative',
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src={photo.src}
                alt={photo.label}
                width={photo.size}
                height={photo.size}
                style={{
                  width:        photo.size,
                  height:       photo.size,
                  borderRadius: '50%',
                  objectFit:    'cover',
                  display:      'block',
                  boxShadow:    '0 18px 56px rgba(0,0,0,0.72), 0 0 0 1px rgba(201,169,97,0.08)',
                }}
              />

              {/* Champagne ring — animates on hover / click */}
              <motion.div
                animate={{ opacity: isHovered || isClicked ? 1 : 0, scale: isClicked ? 1.10 : 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  position:     'absolute',
                  inset:        -6,
                  borderRadius: '50%',
                  border:       '1px solid rgba(201,169,97,0.5)',
                  pointerEvents: 'none',
                }}
              />

              {/* Outer glow pulse on click */}
              <motion.div
                animate={{
                  opacity: isClicked ? [0.6, 0.15, 0.4, 0.1] : 0,
                  scale:   isClicked ? [1, 1.35, 1.18, 1.5]  : 1,
                }}
                transition={{ duration: 1.8, repeat: isClicked ? Infinity : 0, ease: 'easeOut' }}
                style={{
                  position:     'absolute',
                  inset:        -24,
                  borderRadius: '50%',
                  border:       '1px solid rgba(201,169,97,0.35)',
                  pointerEvents: 'none',
                }}
              />

              {/* Flavor label */}
              <motion.div
                animate={{ opacity: isHovered || isClicked ? 1 : 0, y: isHovered || isClicked ? -6 : 4 }}
                transition={{ duration: 0.28 }}
                style={{
                  position:      'absolute',
                  bottom:        '100%',
                  left:          '50%',
                  transform:     'translateX(-50%)',
                  marginBottom:  12,
                  fontFamily:    'var(--font-inter, Inter, sans-serif)',
                  fontSize:      9,
                  letterSpacing: '0.32em',
                  color:         COLORS.champagneGold,
                  textTransform: 'uppercase',
                  whiteSpace:    'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {photo.label}
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────

function LorvaHero({
  backgroundColor = '#280509',
  showNavbar       = false,
  tagline          = 'Handcrafted. Timeless. Indulgent.',
  headline         = 'LORVA CHOCOLATE',
  description      = 'Exquisite bonbons crafted with passion and the finest ingredients.',
  ctaLabel         = 'EXPLORE COLLECTION',
}: LorvaHeroProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [clicked, setClicked] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // ── Mouse tracking ──────────────────────────────────────────────────────────
  // Normalized -0.5 → 0.5 for parallax math
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 22, restDelta: 0.001 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 22, restDelta: 0.001 })

  // Raw pixel coords for the spotlight
  const rawMouseX = useMotionValue(500)
  const rawMouseY = useMotionValue(350)
  const smoothRawX = useSpring(rawMouseX, { stiffness: 80, damping: 20 })
  const smoothRawY = useSpring(rawMouseY, { stiffness: 80, damping: 20 })

  // CSS gradient string that follows the cursor
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${smoothRawX}px ${smoothRawY}px, rgba(201,169,97,0.055) 0%, transparent 72%)`

  // Text counter-parallax (moves opposite to mouse for depth cue)
  const textX = useTransform(smoothMouseX, (v: number) => v * -24)
  const textY = useTransform(smoothMouseY, (v: number) => v * -14)

  // Background slow drift
  const bgX = useTransform(smoothMouseX, (v: number) => v * 14)
  const bgY = useTransform(smoothMouseY, (v: number) => v * 9)

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end start'],
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
    rawMouseX.set(e.clientX - rect.left)
    rawMouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const [word1, word2] = headline.split(' ')

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position:   'relative',
        width:      '100%',
        height:     '100vh',
        minHeight:  640,
        overflow:   'hidden',
        background: COLORS.nearBlack,
        fontFamily: 'var(--font-inter, Inter, sans-serif)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400&display=swap');
      `}</style>

      {/* ── 1. Background — drifts slowly with mouse ────────────────────── */}
      <motion.div
        style={{
          position:   'absolute',
          inset:      '-3%',     // overflow prevents edge bleed during parallax
          zIndex:     0,
          background: `radial-gradient(ellipse 85% 85% at 68% 42%, #4A0810 0%, ${backgroundColor} 42%, #0C0102 100%)`,
          x: bgX,
          y: bgY,
        }}
      />

      {/* ── 2. Warm golden spotlight from upper-right ────────────────────── */}
      <div style={{
        position:      'absolute',
        inset:         0,
        zIndex:        1,
        background:    'radial-gradient(ellipse 65% 75% at 90% -8%, rgba(215,135,20,0.52) 0%, rgba(190,105,15,0.26) 32%, transparent 62%)',
        pointerEvents: 'none',
      }} />

      {/* ── 3. Secondary warm bloom ──────────────────────────────────────── */}
      <div style={{
        position:      'absolute',
        top:           '5%',
        right:         '5%',
        width:         '58%',
        height:        '70%',
        zIndex:        1,
        background:    'radial-gradient(ellipse at 65% 25%, rgba(200,120,18,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── 4. Left vignette ─────────────────────────────────────────────── */}
      <div style={{
        position:      'absolute',
        inset:         0,
        zIndex:        1,
        background:    'linear-gradient(to right, rgba(12,1,2,0.60) 0%, rgba(12,1,2,0.15) 38%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* ── 5. Cursor-following spotlight ────────────────────────────────── */}
      <motion.div
        style={{
          position:      'absolute',
          inset:         0,
          zIndex:        2,
          background:    spotlight,
          pointerEvents: 'none',
        }}
      />

      {/* ── 6. Horizontal gold shimmer sweep (repeats every ~14s) ─────────── */}
      <motion.div
        style={{
          position:   'absolute',
          top:        0,
          bottom:     0,
          left:       0,
          width:      1.5,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(201,169,97,0.12) 25%, rgba(201,169,97,0.5) 50%, rgba(201,169,97,0.12) 75%, transparent 100%)',
          pointerEvents: 'none',
          zIndex:     3,
        }}
        animate={{ x: ['-4px', '102vw'] }}
        transition={{ duration: 5.5, repeat: Infinity, repeatDelay: 8.5, ease: [0.25, 0, 0.75, 1] }}
      />

      {/* ── 7. Ambient floating gold particles ───────────────────────────── */}
      <div style={{
        position:      'absolute',
        inset:         0,
        zIndex:        2,
        pointerEvents: 'none',
        overflow:      'hidden',
      }}>
        {Array.from({ length: 24 }, (_, i) => <Particle key={i} seed={i + 1} />)}
      </div>

      {/* ── 8. Decorative navbar (Framer canvas prop) ────────────────────── */}
      {showNavbar && (
        <nav style={{
          position:       'absolute',
          top:            0,
          left:           0,
          right:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '0 48px',
          height:         72,
          zIndex:         20,
          borderBottom:   '1px solid rgba(201,169,97,0.07)',
        }}>
          <span style={{
            fontFamily:    'Cormorant Garamond, serif',
            color:         COLORS.champagneGold,
            fontSize:      14,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            lineHeight:    1,
          }}>
            LORVA<br />
            <span style={{ fontSize: 9, letterSpacing: '0.45em', opacity: 0.7 }}>CHOCOLATE</span>
          </span>
          <div style={{ display: 'flex', gap: 40 }}>
            {['SHOP', 'COLLECTIONS', 'OUR STORY', 'JOURNAL'].map(l => (
              <span key={l} style={{
                fontFamily:    'var(--font-inter, Inter, sans-serif)',
                color:         'rgba(246,239,233,0.65)',
                fontSize:      11,
                letterSpacing: '0.3em',
                cursor:        'pointer',
              }}>{l}</span>
            ))}
          </div>
          <span style={{
            fontFamily:    'var(--font-inter, Inter, sans-serif)',
            color:         'rgba(246,239,233,0.6)',
            fontSize:      11,
            letterSpacing: '0.25em',
          }}>CART (0)</span>
        </nav>
      )}

      {/* ── 9. Text block — counter-parallax to mouse ────────────────────── */}
      <motion.div
        animate={{ opacity: clicked ? 0.72 : hovered ? 0.82 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position:       'absolute',
          left:           0,
          top:            0,
          bottom:         0,
          width:          '46%',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          padding:        '0 0 0 56px',
          zIndex:         10,
          x:              textX,
          y:              textY,
        }}
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
          style={{
            fontFamily:    'var(--font-inter, Inter, sans-serif)',
            fontSize:      10,
            letterSpacing: '0.38em',
            color:         COLORS.champagneGold,
            textTransform: 'uppercase',
            marginBottom:  36,
            opacity:       0.85,
          }}
        >{tagline}</motion.p>

        {/* Headline line 1 */}
        <div style={{ overflow: 'hidden', lineHeight: 0.92 }}>
          <motion.h1
            initial={{ y: '108%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.15, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily:    'Cormorant Garamond, var(--font-cormorant, serif)',
              fontSize:      'clamp(72px, 9.5vw, 132px)',
              fontWeight:    300,
              letterSpacing: '0.02em',
              lineHeight:    0.92,
              color:         COLORS.cream,
              margin:        0,
              display:       'block',
            }}
          >{word1}</motion.h1>
        </div>

        {/* Headline line 2 — italic gold */}
        {word2 && (
          <div style={{ overflow: 'hidden', lineHeight: 0.92, marginTop: 6 }}>
            <motion.span
              initial={{ y: '108%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.15, delay: 0.70, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily:    'Cormorant Garamond, var(--font-cormorant, serif)',
                fontSize:      'clamp(72px, 9.5vw, 132px)',
                fontWeight:    300,
                fontStyle:     'italic',
                letterSpacing: '0.02em',
                lineHeight:    0.92,
                color:         COLORS.champagneGold,
                display:       'block',
              }}
            >{word2}</motion.span>
          </div>
        )}

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.05 }}
          style={{
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            fontSize:   15,
            lineHeight: 1.75,
            color:      'rgba(246,239,233,0.55)',
            maxWidth:   320,
            marginTop:  32,
            fontWeight: 300,
          }}
        >{description}</motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          style={{ marginTop: 48 }}
        >
          <motion.button
            whileHover={{ backgroundColor: COLORS.champagneGold, color: COLORS.nearBlack }}
            transition={{ duration: 0.28 }}
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           16,
              padding:       '14px 34px',
              border:        `1px solid ${COLORS.champagneGold}`,
              background:    'transparent',
              color:         COLORS.champagneGold,
              fontFamily:    'var(--font-inter, Inter, sans-serif)',
              fontSize:      10,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              cursor:        'pointer',
            }}
          >
            {ctaLabel}<span style={{ fontSize: 13, letterSpacing: 0 }}>→</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── 10. Product photos ────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
        {PHOTOS.map((photo, i) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={i}
            hovered={hovered}
            clicked={clicked}
            setHovered={setHovered}
            setClicked={setClicked}
            scrollYProgress={scrollYProgress}
            smoothMouseX={smoothMouseX}
            smoothMouseY={smoothMouseY}
          />
        ))}
      </div>

      {/* ── 11. Progress indicator ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        style={{
          position:   'absolute',
          bottom:     36,
          left:       56,
          display:    'flex',
          alignItems: 'center',
          gap:        12,
          zIndex:     10,
        }}
      >
        <span style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', color: COLORS.champagneGold, fontSize: 11, letterSpacing: '0.2em' }}>01</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 28, height: 1, background: 'rgba(201,169,97,0.35)' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: COLORS.champagneGold }} />
          <div style={{ width: 28, height: 1, background: 'rgba(201,169,97,0.2)' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', color: 'rgba(246,239,233,0.28)', fontSize: 11, letterSpacing: '0.2em' }}>03</span>
      </motion.div>
    </section>
  )
}

// ── DUAL EXPORT ────────────────────────────────────────────────────────────────

export default LorvaHero
export const FramerHero = LorvaHero
