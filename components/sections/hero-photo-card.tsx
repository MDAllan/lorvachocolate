'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'

export interface PhotoConfig {
  id:            string
  label:         string
  src:           string
  top:           string
  left:          string
  width:         number
  height:        number
  rotate:        number
  floatDuration: number
  floatDelay:    number
  scrollDepth:   number
  mouseDepth:    number
  zBase:         number
}

export const PHOTOS: PhotoConfig[] = [
  {
    id: 'hazelnut', label: 'Hazelnut Crunch Noir',
    src: '/bonbons/hazelnut-crunch-noir.jpg',
    top: '38%', left: '55%',
    width: 210, height: 195, rotate: 2,
    floatDuration: 6.2, floatDelay: 0.0,
    scrollDepth: 0.06, mouseDepth: 0.010, zBase: 8,
  },
  {
    id: 'espresso', label: 'Espresso Noir',
    src: '/bonbons/espresso-noir.jpg',
    top: '10%', left: '72%',
    width: 160, height: 138, rotate: -10,
    floatDuration: 5.8, floatDelay: 0.5,
    scrollDepth: 0.10, mouseDepth: 0.016, zBase: 5,
  },
  {
    id: 'pistachio', label: 'Pistachio Royale',
    src: '/bonbons/pistachio-royale.jpg',
    top: '14%', left: '48%',
    width: 118, height: 112, rotate: -7,
    floatDuration: 7.4, floatDelay: 1.1,
    scrollDepth: 0.18, mouseDepth: 0.024, zBase: 3,
  },
  {
    id: 'dark-silk', label: 'Dark Silk',
    src: '/bonbons/dark-silk.jpg',
    top: '65%', left: '68%',
    width: 155, height: 130, rotate: 6,
    floatDuration: 6.8, floatDelay: 0.7,
    scrollDepth: 0.13, mouseDepth: 0.018, zBase: 6,
  },
  {
    id: 'cherry', label: 'Cherry Blush',
    src: '/bonbons/cherry-blush.jpg',
    top: '58%', left: '47%',
    width: 132, height: 128, rotate: -4,
    floatDuration: 7.1, floatDelay: 1.4,
    scrollDepth: 0.08, mouseDepth: 0.012, zBase: 4,
  },
  {
    id: 'caramel', label: 'Caramel Fleur de Sel',
    src: '/bonbons/caramel-fleur-sea-salt.jpg',
    top: '30%', left: '82%',
    width: 108, height: 104, rotate: 14,
    floatDuration: 6.5, floatDelay: 0.3,
    scrollDepth: 0.20, mouseDepth: 0.025, zBase: 2,
  },
]

interface PhotoCardProps {
  photo:           PhotoConfig
  index:           number
  hovered:         string | null
  setHovered:      (id: string | null) => void
  scrollYProgress: MotionValue<number>
  mouseX:          MotionValue<number>
  mouseY:          MotionValue<number>
}

export function PhotoCard({
  photo,
  index,
  hovered,
  setHovered,
  scrollYProgress,
  mouseX,
  mouseY,
}: PhotoCardProps) {
  const isHovered  = hovered === photo.id
  const anyHovered = hovered !== null

  // Scroll parallax — far images travel more on scroll
  const scrollY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, photo.scrollDepth * -280],
  )

  // Mouse parallax — far images respond more to cursor movement
  const mx = useTransform(mouseX, (v) => v * photo.mouseDepth * 320)
  const my = useTransform(mouseY, (v) => v * photo.mouseDepth * 320)

  return (
    // Layer 1 — staggered entrance: blur-to-sharp, scale up
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(14px)' }}
      animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)'  }}
      transition={{
        duration: 1.4,
        delay:    0.6 + index * 0.18,
        ease:     [0.22, 1, 0.36, 1],
      }}
      style={{
        position: 'absolute',
        top:      photo.top,
        left:     photo.left,
        zIndex:   isHovered ? 30 : photo.zBase,
      }}
    >
      {/* Layer 2 — scroll parallax */}
      <motion.div style={{ y: scrollY }}>
        {/* Layer 3 — mouse cursor parallax */}
        <motion.div style={{ x: mx, y: my }}>
          {/* Layer 4 — idle float loop */}
          <motion.div
            animate={{
              y:      [0, -8, 0],
              rotate: [photo.rotate - 1.8, photo.rotate + 1.8, photo.rotate - 1.8],
            }}
            transition={{
              duration:   photo.floatDuration,
              repeat:     Infinity,
              repeatType: 'mirror',
              ease:       'easeInOut',
              delay:      photo.floatDelay,
            }}
          >
            {/* Layer 5 — hover state: scale + dim siblings */}
            <motion.div
              animate={{
                scale:   isHovered ? 1.06 : anyHovered ? 0.97 : 1,
                opacity: anyHovered && !isHovered ? 0.30 : 1,
                // consistent 2-function filter for smooth interpolation
                filter:  isHovered
                  ? 'blur(0px) drop-shadow(0 22px 48px rgba(0,0,0,0.82))'
                  : anyHovered
                    ? 'blur(3px) drop-shadow(0 8px 20px rgba(0,0,0,0.25))'
                    : 'blur(0px) drop-shadow(0 14px 36px rgba(0,0,0,0.62))',
              }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              onMouseEnter={() => setHovered(photo.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor:        'crosshair',
                pointerEvents: 'all',
                position:      'relative',
                display:       'inline-block',
              }}
            >
              <img
                src={photo.src}
                alt={photo.label}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                style={{
                  width:     photo.width,
                  height:    photo.height,
                  objectFit: 'cover',
                  display:   'block',
                }}
              />

              {/* Champagne gold glow ring — animates independently of filter */}
              <motion.div
                animate={{
                  opacity:   isHovered ? 1 : 0.25,
                  boxShadow: isHovered
                    ? '0 0 32px 6px rgba(201,169,97,0.22), inset 0 0 0 1px rgba(201,169,97,0.30)'
                    : '0 0 0px 0px rgba(201,169,97,0), inset 0 0 0 1px rgba(201,169,97,0.08)',
                }}
                transition={{ duration: 0.38 }}
                style={{
                  position:      'absolute',
                  inset:         0,
                  pointerEvents: 'none',
                }}
              />

              {/* Flavor label — slides up on hover */}
              <motion.span
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  position:      'absolute',
                  bottom:        '100%',
                  left:          '50%',
                  transform:     'translateX(-50%)',
                  marginBottom:  10,
                  fontFamily:    'var(--font-inter, Inter, sans-serif)',
                  fontSize:      9,
                  letterSpacing: '0.36em',
                  color:         '#C9A961',
                  textTransform: 'uppercase',
                  whiteSpace:    'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {photo.label}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
