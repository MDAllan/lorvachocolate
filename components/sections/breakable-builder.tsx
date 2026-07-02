'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { breakableOrderSchema, type BreakableOrderValues } from '@/lib/validations/breakable-order'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

// ─── Shell configs ──────────────────────────────────────────────────────────

const SHELLS_CONFIG: Record<string, {
  label: string
  hi: string; mid1: string; mid2: string; lo: string; depth: string
  outsideImg: string; heartInsideImg: string; ballInsideImg: string; ballOutsideImg: string
}> = {
  dark:  {
    label: 'Dark Chocolate',
    hi: '#7A4A2A', mid1: '#4E2810', mid2: '#2A1208', lo: '#130805', depth: '#0D0503',
    outsideImg:     '/hearts/dark-outside.png',
    heartInsideImg: '/hearts/dark-inside.png',
    ballInsideImg:  '/balls/dark-inside.png',
    ballOutsideImg: '/balls/dark-outside.png',
  },
  milk:  {
    label: 'Milk Chocolate',
    hi: '#D4956A', mid1: '#B07848', mid2: '#6B4020', lo: '#301A08', depth: '#1C0F04',
    outsideImg:     '/hearts/milk-outside.png',
    heartInsideImg: '/hearts/milk-inside.png',
    ballInsideImg:  '/balls/milk-inside.png',
    ballOutsideImg: '/balls/milk-outside.png',
  },
  white: {
    label: 'White Chocolate',
    hi: '#FFFEF8', mid1: '#FFF4E0', mid2: '#EDD49A', lo: '#C09040', depth: '#A07030',
    outsideImg:     '/hearts/white-outside.png',
    heartInsideImg: '/hearts/white-inside.png',
    ballInsideImg:  '/balls/white-inside.png',
    ballOutsideImg: '/balls/white-outside.png',
  },
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const FILLING_PRICES: Record<string, number> = {
  'mixed-nuts': 2,
  'dried-fruits': 2,
}

function calculatePrice(shape?: string, shellFlavor?: string, fillings?: string[]): number | null {
  if (!shape || !shellFlavor) return null
  let base = 0
  if (shape === 'heart') {
    base = shellFlavor === 'milk' ? 30 : 32
  } else {
    base = shellFlavor === 'milk' ? 38 : 40
  }
  const fillingsTotal = (fillings ?? []).reduce((sum, id) => sum + (FILLING_PRICES[id] ?? 1), 0)
  return base + fillingsTotal
}

// ─── Filling options ──────────────────────────────────────────────────────────

const FILLINGS = [
  { id: 'gummy-bears',     label: 'Gummy Bears',    img: '/fillings/gummy-bears.png' },
  { id: 'cookies',         label: 'Mini Cookies',   img: '/fillings/cookies.png' },
  { id: 'mixed-nuts',      label: 'Mixed Nuts',     img: '/fillings/mixed-nuts.png' },
  { id: 'mixed-chocolate', label: 'Mixed Chocolate', img: '/fillings/mixed-chocolate.png' },
  { id: 'dried-fruits',    label: 'Dried Fruits',   img: '/fillings/dried-fruits.png' },
  { id: 'marshmallows',    label: 'Marshmallows',   img: '/fillings/marshmallows.png' },
  { id: 'pretzels',        label: 'Pretzels',       img: '/fillings/pretzels.png' },
  { id: 'candies',         label: 'Candies',        img: '/fillings/candies.png' },
]

// ─── Photo-based heart fill positions (% of container, within the bowl) ─────

// x/y = center of the item (uses translate -50%,-50%), so these coords map to the heart bowl
const PHOTO_HEART_SLOTS = [
  { x: 38, y: 34, rotate: -14, size: 16 },  // left lobe
  { x: 62, y: 32, rotate: 11,  size: 14 },  // right lobe
  { x: 36, y: 48, rotate: -20, size: 15 },  // mid-left
  { x: 64, y: 46, rotate: 17,  size: 14 },  // mid-right
  { x: 44, y: 55, rotate: -6,  size: 17 },  // center-left
  { x: 58, y: 53, rotate: 20,  size: 14 },  // center-right
  { x: 38, y: 62, rotate: -16, size: 15 },  // lower-left
  { x: 62, y: 60, rotate: 9,   size: 16 },  // lower-right
  { x: 50, y: 40, rotate: 6,   size: 14 },  // top center
  { x: 50, y: 64, rotate: -9,  size: 15 },  // bottom center
  { x: 42, y: 72, rotate: 23,  size: 14 },  // very bottom-left
  { x: 58, y: 70, rotate: -11, size: 16 },  // very bottom-right
]

// ─── Photo-based ball fill positions (x/y = center, uses translate -50%,-50%) ─

const PHOTO_BALL_SLOTS = [
  { x: 50, y: 36, rotate: -10, size: 16 },  // top center
  { x: 34, y: 42, rotate: 16,  size: 14 },  // top-left
  { x: 66, y: 40, rotate: -8,  size: 15 },  // top-right
  { x: 27, y: 54, rotate: 22,  size: 14 },  // mid-left
  { x: 73, y: 52, rotate: -16, size: 14 },  // mid-right
  { x: 50, y: 50, rotate: 5,   size: 17 },  // center
  { x: 37, y: 63, rotate: -20, size: 15 },  // lower-left
  { x: 63, y: 61, rotate: 12,  size: 14 },  // lower-right
  { x: 50, y: 66, rotate: -5,  size: 16 },  // bottom center
  { x: 41, y: 47, rotate: 18,  size: 14 },  // center-left
  { x: 59, y: 46, rotate: -12, size: 15 },  // center-right
  { x: 50, y: 74, rotate: 8,   size: 14 },  // very bottom
]

const STEPS = ['Shape', 'Shell', 'Surprise Purpose', 'Fillings', 'Your Details']

const OCCASIONS = [
  {
    id: 'just-because',
    label: 'Just Because',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto">
        <path d="M22 34C22 34,10 26,10 18C10 13,13.5 10,17 10C19.5 10,21 12,22 14C23 12,24.5 10,27 10C30.5 10,34 13,34 18C34 26,22 34,22 34Z" />
      </svg>
    ),
  },
  {
    id: 'get-well-soon',
    label: 'Get Well Soon',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto">
        <circle cx="22" cy="22" r="13" />
        <path d="M22 16v12" />
        <path d="M16 22h12" />
      </svg>
    ),
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto">
        <path d="M15 28C15 28,8 23,8 17C8 13,10.5 11,13 11C14.8 11,16 12.5,16 12.5" />
        <path d="M22 34C22 34,8 25,8 16C8 11,11.5 8,15 8C17.5 8,20 10,22 13" />
        <path d="M22 34C22 34,36 25,36 16C36 11,32.5 8,29 8C26.5 8,24 10,22 13" />
      </svg>
    ),
  },
  {
    id: 'gender-reveal',
    label: 'Gender Reveal',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto">
        <circle cx="22" cy="20" r="9" />
        <path d="M22 29v8" /><path d="M18 33h8" />
        <path d="M14 10l-4-4m0 0h4m-4 0v4" />
        <path d="M30 10l4-4m0 0h-4m4 0v4" />
      </svg>
    ),
  },
  {
    id: 'pregnancy',
    label: 'Pregnancy Announcement',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto">
        <circle cx="22" cy="12" r="4" />
        <path d="M22 18C16 18,13 23,13 28C13 34,17 36,22 36C27 36,31 34,31 28C31 23,28 18,22 18Z" />
        <path d="M19 27C19.5 29,20.5 30,22 30C23.5 30,24.5 29,25 27" />
      </svg>
    ),
  },
  {
    id: 'proposal',
    label: 'Proposal Ring',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto">
        <circle cx="22" cy="26" r="10" />
        <path d="M17 16l3-5h4l3 5" />
        <path d="M22 16v10" />
        <circle cx="22" cy="26" r="3" />
      </svg>
    ),
  },
  {
    id: 'gift-card',
    label: 'Money / Gift Card',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto">
        <rect x="7" y="15" width="30" height="20" rx="2" />
        <path d="M7 22h30" />
        <path d="M22 11v4" />
        <path d="M18 11C18 11,18 15,22 15C26 15,26 11,26 11" />
        <path d="M13 28h6" /><path d="M13 31h4" />
      </svg>
    ),
  },
  {
    id: 'other',
    label: 'Other',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mx-auto">
        <path d="M22 8l2.5 7h7.5l-6 4.5 2.5 7L22 22.5 15.5 26.5 18 19.5 12 15h7.5Z" />
      </svg>
    ),
  },
]

function distributeFillings(fillingIds: string[], totalSlots: number) {
  if (fillingIds.length === 0) return [] as Array<{ id: string; img: string; slot: number }>
  return Array.from({ length: totalSlots }, (_, i) => {
    const fid = fillingIds[i % fillingIds.length]
    const f = FILLINGS.find(x => x.id === fid)!
    return { id: fid, img: f.img, slot: i }
  })
}

// ─── 3D Shape Preview ───────────────────────────────────────────────────────

function ShapePreview({
  shape,
  shellId,
  fillingIds,
  sealed,
  price,
}: {
  shape?: 'heart' | 'ball'
  shellId?: string
  fillingIds: string[]
  sealed?: boolean
  price?: number | null
}) {
  const items = distributeFillings(fillingIds, 12)
  const isHeart = shape === 'heart'
  const isBall  = shape === 'ball'

  const [isHovered, setIsHovered] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const shapeRef   = useRef<HTMLDivElement>(null)
  const hammerRef  = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [shaking, setShaking] = useState(false)
  // crack phases: idle → breaking → open → resealing → idle
  const [crackPhase, setCrackPhase] = useState<'idle'|'breaking'|'open'|'resealing'>('idle')

  const activeShell = shellId ?? 'milk'
  const cfg = SHELLS_CONFIG[activeShell] ?? SHELLS_CONFIG['milk']

  // sealed prop drives whether we show the outside (step 4+) vs inside (steps 0-3)
  // no local state needed — use the prop directly in render

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const nx = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2
    const ny = ((e.clientY - rect.top)   / rect.height - 0.5) * 2
    setTilt({ x: ny * -7, y: nx * 7 })
  }

  function handleMouseLeave() {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  function handleHammerDragEnd() {
    setIsDragging(false)
    if (!shapeRef.current || !hammerRef.current || !shape || !shellId || crackPhase !== 'idle') return

    const shapeRect  = shapeRef.current.getBoundingClientRect()
    const hammerRect = hammerRef.current.getBoundingClientRect()
    const hCX = hammerRect.left + hammerRect.width  / 2
    const hCY = hammerRect.top  + hammerRect.height / 2

    const hit = hCX > shapeRect.left && hCX < shapeRect.right &&
                hCY > shapeRect.top  && hCY < shapeRect.bottom

    if (hit) {
      setShaking(true)
      setCrackPhase('breaking')
      setTimeout(() => { setCrackPhase('open'); setShaking(false) }, 750)
      setTimeout(() => setCrackPhase('resealing'), 3200)
      setTimeout(() => setCrackPhase('idle'),      4100)
    }
  }

  const sealedImg = isHeart ? cfg.outsideImg : cfg.ballOutsideImg
  const openImg   = isHeart
    ? (cfg.heartInsideImg ?? `/hearts/${activeShell}-inside.png`)
    : (cfg.ballInsideImg  ?? `/balls/${activeShell}-inside.png`)

  return (
    <div className="flex flex-col items-center gap-2 py-2 px-3 sm:py-4 sm:px-5 bg-gradient-to-b from-[#F5E0C0]/60 to-[#F6EFE9]/80 rounded-sm border border-taupe/10 shadow-inner">
      <AnimatePresence mode="wait">

        {/* ── Empty state ── */}
        {!shape && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[440px] aspect-square flex items-center justify-center"
          >
            <p className="font-cormorant text-xl text-taupe/40 text-center leading-relaxed">
              Choose a shape<br />to see your creation
            </p>
          </motion.div>
        )}

        {/* ── Heart or Ball preview ── */}
        {(isHeart || isBall) && (
          <motion.div
            key={shape}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="w-full max-w-[160px] sm:max-w-[380px] mx-auto"
          >
            {/* Shake wrapper */}
            <motion.div
              ref={shapeRef}
              className="w-full"
              animate={shaking
                ? { x: [-10, 10, -8, 8, -5, 5, -3, 3, -1, 1, 0], y: [-6, 6, -4, 4, -2, 2, 0] }
                : { x: 0, y: 0 }
              }
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
            <div
              ref={wrapperRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: crackPhase === 'idle'
                  ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                  : 'none',
                transition: 'transform 0.12s ease-out',
                willChange: 'transform',
              }}
            >
              <div className="relative w-full aspect-square overflow-visible">

                {/* ── Idle: open inside (early steps) or sealed outside (step 4+) ── */}
                {crackPhase === 'idle' && (
                  <AnimatePresence mode="wait">
                    {sealed ? (
                      <motion.img
                        key={`sealed-${activeShell}`}
                        src={sealedImg}
                        alt="sealed chocolate"
                        className="w-full h-full object-contain select-none"
                        draggable={false}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <motion.div
                        key={`open-${activeShell}`}
                        className="relative w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <img
                          src={openImg}
                          alt="chocolate shell open"
                          className="w-full h-full object-contain select-none"
                          draggable={false}
                        />
                        {/* Fillings drop in */}
                        <div className="absolute inset-0">
                          <AnimatePresence>
                            {items.map(({ id, img, slot }) => {
                              const slots = isHeart ? PHOTO_HEART_SLOTS : PHOTO_BALL_SLOTS
                              const pos = slots[slot % slots.length]
                              return (
                                <motion.div
                                  key={`idle-slot-${slot}-${id}`}
                                  className="absolute"
                                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: `${pos.size}%`, translate: '-50% -50%' }}
                                  initial={{ opacity: 0, y: -60, scale: 0.4, rotate: pos.rotate - 30 }}
                                  animate={{ opacity: 1, y: 0,   scale: 1,   rotate: pos.rotate }}
                                  exit={{ opacity: 0, scale: 0, y: 30 }}
                                  transition={{ type: 'spring', stiffness: 380, damping: 22, delay: slot * 0.055 }}
                                >
                                  <img src={img} alt={id} className="w-full h-full object-contain" draggable={false} style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))' }} />
                                </motion.div>
                              )
                            })}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* ── Breaking: 4 pieces fly apart, inside revealed underneath ── */}
                {crackPhase === 'breaking' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Inside + fillings visible underneath */}
                    <img src={openImg} alt="" className="w-full h-full object-contain select-none" draggable={false} />
                    {fillingIds.length > 0 && (
                      <div className="absolute inset-0">
                        {items.map(({ id, img, slot }) => {
                          const slots = isHeart ? PHOTO_HEART_SLOTS : PHOTO_BALL_SLOTS
                          const pos = slots[slot % slots.length]
                          return (
                            <div key={`reveal-${slot}`} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: `${pos.size}%`, translate: '-50% -50%' }}>
                              <img src={img} alt={id} className="w-full h-full object-contain" draggable={false} style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))' }} />
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* 4 shell pieces breaking apart */}
                    {[
                      { clip: 'polygon(0% 0%, 54% 0%, 50% 46%, 0% 50%)',          tx: -200, ty: -160, rot: -40 },
                      { clip: 'polygon(54% 0%, 100% 0%, 100% 50%, 50% 46%)',       tx:  200, ty: -160, rot:  40 },
                      { clip: 'polygon(0% 50%, 50% 46%, 46% 100%, 0% 100%)',       tx: -180, ty:  170, rot:  32 },
                      { clip: 'polygon(50% 46%, 100% 50%, 100% 100%, 46% 100%)',   tx:  180, ty:  170, rot: -32 },
                    ].map((piece, i) => (
                      <motion.img
                        key={i}
                        src={sealedImg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{ clipPath: piece.clip }}
                        initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                        animate={{ x: piece.tx, y: piece.ty, rotate: piece.rot, scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.62, ease: [0.12, 0, 0.39, 0] }}
                        draggable={false}
                      />
                    ))}

                    {/* Bright impact flash */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                      style={{ background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,240,200,0.6) 40%, transparent 70%)' }}
                    />
                  </div>
                )}

                {/* ── Open: inside + fillings animate in ── */}
                {crackPhase === 'open' && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <img src={openImg} alt="" className="w-full h-full object-contain select-none" draggable={false} />
                    <div className="absolute inset-0">
                      <AnimatePresence>
                        {items.map(({ id, img, slot }) => {
                          const slots = isHeart ? PHOTO_HEART_SLOTS : PHOTO_BALL_SLOTS
                          const pos = slots[slot % slots.length]
                          return (
                            <motion.div
                              key={`open-slot-${slot}-${id}`}
                              className="absolute"
                              style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: `${pos.size}%`, translate: '-50% -50%' }}
                              initial={{ opacity: 0, scale: 0.5, y: -20 }}
                              animate={{ opacity: 1, scale: 1, y: 0, rotate: pos.rotate }}
                              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: slot * 0.04 }}
                            >
                              <img src={img} alt={id} className="w-full h-full object-contain" draggable={false} style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))' }} />
                            </motion.div>
                          )
                        })}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* ── Resealing: fade sealed image back in ── */}
                {crackPhase === 'resealing' && (
                  <>
                    {/* keep inside visible underneath */}
                    <img src={openImg} alt="" className="absolute inset-0 w-full h-full object-contain select-none" draggable={false} />
                    <motion.img
                      src={sealedImg}
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain select-none"
                      draggable={false}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                  </>
                )}

                {/* Hover hint */}
                <AnimatePresence>
                  {isHovered && fillingIds.length === 0 && crackPhase === 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-3 inset-x-0 text-center pointer-events-none"
                    >
                      <span className="font-inter text-[9px] tracking-[2px] text-taupe/60 uppercase">
                        Drag the hammer to crack
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Price (left) + Hammer (right) row */}
      {shape && shellId && (
        <div className="flex items-center w-full px-2 sm:px-3">
          {price != null && (
            <motion.div
              key={price}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-0.5"
            >
              <p className="font-inter text-[8px] sm:text-[9px] tracking-[0.3em] text-taupe uppercase">Estimated Price</p>
              <p className="font-cormorant text-2xl sm:text-3xl text-deep-cocoa">${price}</p>
              <p className="font-inter text-[8px] sm:text-[9px] text-taupe/60">Deposit to confirm</p>
            </motion.div>
          )}
          {sealed && (
            <div className="ml-auto flex flex-col items-center gap-0.5 select-none">
              <motion.div
                ref={hammerRef}
                drag
                dragSnapToOrigin
                dragElastic={0.25}
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleHammerDragEnd}
                whileDrag={{ scale: 1.2, rotate: -70, cursor: 'grabbing' }}
                animate={isDragging ? {} : { rotate: -20 }}
                whileHover={{ rotate: -35, scale: 1.1 }}
                style={{ cursor: 'grab', filter: 'drop-shadow(0 5px 12px rgba(0,0,0,0.25))', zIndex: 50 }}
              >
                <img src="/hammer.png" alt="hammer" className="w-16 h-16 sm:w-24 sm:h-24 object-contain" draggable={false} />
              </motion.div>
              <span className="font-inter text-[7px] sm:text-[9px] tracking-[0.25em] text-taupe/50 uppercase">
                {crackPhase !== 'idle' ? 'Cracking...' : 'Drag to crack'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Live caption */}
      <div className="min-h-4 text-center px-4 w-full">
        {shape && (
          <motion.p
            key={`${shape}-${shellId}-${fillingIds.length}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cormorant italic text-sm sm:text-lg text-deep-cocoa"
          >
            {shellId ? SHELLS_CONFIG[shellId]?.label : 'Choose your shell'}
            {' '}{shape}
            {fillingIds.length > 0 && (
              <span className="text-taupe/60">
                {' '}·{' '}{fillingIds.map(id => FILLINGS.find(f => f.id === id)?.label).join(', ')}
              </span>
            )}
          </motion.p>
        )}
      </div>
    </div>
  )
}

// ─── Main Builder ────────────────────────────────────────────────────────────

export function BreakableBuilder() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<BreakableOrderValues>({
    resolver: zodResolver(breakableOrderSchema),
    defaultValues: {
      shape: undefined,
      shellFlavor: undefined,
      occasion: '',
      occasionOther: '',
      comment: '',
      fillings: [],
      dropOffItems: false,
      dropOffDescription: '',
      name: '',
      email: '',
      phone: '',
      quantity: 1,
      notes: '',
    },
  })

  const values = form.watch()

  function toggleFilling(id: string) {
    const cur = values.fillings ?? []
    if (cur.includes(id)) {
      form.setValue('fillings', cur.filter(f => f !== id))
    } else if (cur.length < 3) {
      form.setValue('fillings', [...cur, id])
    }
  }

  function canProceed(): boolean {
    if (step === 0) return !!values.shape
    if (step === 1) return !!values.shellFlavor
    if (step === 2) return !!values.occasion
    if (step === 3) return true  // fillings optional
    return true
  }

  async function onSubmit(data: BreakableOrderValues) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/breakable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      toast({ title: 'Something went wrong', description: 'Please try again or reach us on WhatsApp.', variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  // ── Submitted state ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">

          {/* Congratulations text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 mb-8"
          >
            <div className="w-10 h-px bg-champagne-gold mx-auto" />
            <h3 className="font-cormorant text-4xl text-deep-cocoa">Your order is in.</h3>
            <p className="font-inter text-sm text-taupe leading-relaxed max-w-xs mx-auto">
              We'll reach out soon to confirm your breakable heart and arrange your pickup. A deposit is required to secure your order.
            </p>
          </motion.div>

          {/* Heart with hammer — always a heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full max-w-sm"
          >
            <ShapePreview
              shape="heart"
              shellId={values.shellFlavor}
              fillingIds={values.fillings ?? []}
              sealed={true}
              price={null}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-inter text-[9px] tracking-[0.35em] text-taupe/40 uppercase mt-4"
          >
            Drag the hammer to crack it open
          </motion.p>

        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">

        {/* LEFT — preview (top on mobile, left on desktop) */}
        <div className="lg:sticky lg:top-24 mb-3 lg:mb-0">
          <ShapePreview
            shape={values.shape}
            shellId={values.shellFlavor}
            fillingIds={values.fillings ?? []}
            sealed={step >= 4}
            price={calculatePrice(values.shape, values.shellFlavor, values.fillings)}
          />
        </div>

        {/* RIGHT — form steps */}
        <div className="pb-16 lg:pb-0">
          <div className="border-t border-taupe/10 lg:border-t-0" />

          {/* Step Indicator */}
          <div className="pt-2 lg:pt-4 mb-3 lg:mb-6">
            <div className="flex items-center justify-between mb-2 lg:mb-3">
              <span className="font-inter text-[10px] tracking-[0.45em] text-taupe uppercase">
                Step {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')} — {STEPS[step]}
              </span>
              <div className="flex gap-1">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => i < step && setStep(i)}
                    disabled={i >= step}
                    className={cn('h-px w-8 transition-all duration-500', i <= step ? 'bg-champagne-gold' : 'bg-taupe/25')}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              {/* Step 0 — Shape */}
              {step === 0 && (
                <div className="space-y-3 lg:space-y-5">
                  <h2 className="font-cormorant text-2xl lg:text-3xl text-deep-cocoa">Choose Your Shape</h2>
                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    {[
                      { id: 'heart' as const, label: 'Heart',  desc: 'Dramatic and romantic' },
                      { id: 'ball'  as const, label: 'Sphere', desc: 'Perfect for any occasion' },
                    ].map(({ id, label, desc }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => form.setValue('shape', id)}
                        className={cn(
                          'py-4 lg:py-6 border text-center transition-all duration-300',
                          values.shape === id
                            ? 'border-champagne-gold bg-champagne-gold/5'
                            : 'border-taupe/20 hover:border-taupe/50 bg-cream',
                        )}
                      >
                        <div className="mb-2 lg:mb-3">
                          {id === 'heart' ? (
                            <svg viewBox="0 0 48 48" className="w-8 h-8 lg:w-10 lg:h-10 mx-auto" fill="currentColor"
                              style={{ color: values.shape === id ? '#C9A961' : '#AC9A86' }}>
                              <path d="M24 38 C24 38, 8 27, 8 17 C8 11, 12.5 7, 17 7 C20.5 7, 22.5 10, 24 13 C25.5 10, 27.5 7, 31 7 C35.5 7, 40 11, 40 17 C40 27, 24 38, 24 38Z" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 48 48" className="w-8 h-8 lg:w-10 lg:h-10 mx-auto" fill="currentColor"
                              style={{ color: values.shape === id ? '#C9A961' : '#AC9A86' }}>
                              <circle cx="24" cy="24" r="17" />
                            </svg>
                          )}
                        </div>
                        <div className="font-cormorant text-xl lg:text-2xl text-deep-cocoa mb-0.5">{label}</div>
                        <div className="font-inter text-[10px] lg:text-xs text-taupe">{desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1 — Shell */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-cormorant text-3xl text-deep-cocoa">Choose Your Shell</h2>
                    <p className="font-inter text-sm text-taupe mt-2">
                      Watch your {values.shape === 'ball' ? 'sphere' : 'heart'} change above.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'dark'  as const, desc: 'Rich & intense, 70% cacao' },
                      { id: 'milk'  as const, desc: 'Smooth & classic, crowd favourite' },
                      { id: 'white' as const, desc: 'Sweet & creamy, elegant finish' },
                    ].map(({ id, desc }) => {
                      const cfg = SHELLS_CONFIG[id]
                      const thumbImg = values.shape === 'ball' ? cfg.ballInsideImg : cfg.outsideImg
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => form.setValue('shellFlavor', id)}
                          className={cn(
                            'py-4 px-2 border text-center transition-all duration-300',
                            values.shellFlavor === id
                              ? 'border-champagne-gold bg-champagne-gold/5'
                              : 'border-taupe/20 hover:border-taupe/50',
                          )}
                        >
                          <div className="w-11 h-11 mx-auto mb-2">
                            <img
                              src={thumbImg}
                              alt={cfg.label}
                              className="w-full h-full object-contain"
                              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
                            />
                          </div>
                          <div className="font-cormorant text-base text-deep-cocoa mb-0.5">{cfg.label}</div>
                          <div className="font-inter text-[9px] sm:text-[11px] text-taupe leading-tight">{desc}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 2 — Surprise Purpose */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-cormorant text-3xl text-deep-cocoa">Surprise Purpose</h2>
                    <p className="font-inter text-sm text-taupe mt-2">
                      What's the occasion? Pick one.
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {OCCASIONS.map(({ id, label, icon }) => {
                      const selected = values.occasion === id
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => form.setValue('occasion', id)}
                          className={cn(
                            'py-2 px-1 border text-center transition-all duration-300',
                            selected
                              ? 'border-champagne-gold bg-champagne-gold/5'
                              : 'border-taupe/20 hover:border-taupe/50',
                          )}
                        >
                          <div className="mb-1">{icon}</div>
                          <div className="font-inter text-[9px] tracking-wide text-deep-cocoa leading-tight">{label}</div>
                        </button>
                      )
                    })}
                  </div>

                  {values.occasion === 'other' && (
                    <FormField control={form.control} name="occasionOther" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">
                          Describe your occasion
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what you're celebrating..."
                            maxLength={200}
                            className="font-inter resize-none rounded-none border-taupe/30"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}

                  <FormField control={form.control} name="comment" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">
                        Comments (optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special requests, details, or a personal message to include..."
                          maxLength={300}
                          className="font-inter resize-none rounded-none border-taupe/30"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}

              {/* Step 3 — Fillings (optional, max 3) */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-cormorant text-3xl text-deep-cocoa">Choose Your Fillings</h2>
                    <p className="font-inter text-sm text-taupe mt-2">
                      Pick up to 3, or skip — fillings are optional.
                      {(values.fillings?.length ?? 0) > 0 && (
                        <span className="ml-2 text-champagne-gold font-medium">
                          {values.fillings?.length}/3 selected
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {FILLINGS.map(({ id, label, img }) => {
                      const selected = (values.fillings ?? []).includes(id)
                      const atMax = (values.fillings?.length ?? 0) >= 3 && !selected
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleFilling(id)}
                          disabled={atMax}
                          className={cn(
                            'py-2 px-1 border text-center transition-all duration-300',
                            selected
                              ? 'border-champagne-gold bg-champagne-gold/5'
                              : atMax
                                ? 'border-taupe/10 opacity-40 cursor-not-allowed'
                                : 'border-taupe/20 hover:border-taupe/50',
                          )}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={label}
                            width={32}
                            height={32}
                            className="mx-auto mb-1 object-contain"
                            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}
                          />
                          <div className="font-inter text-[9px] tracking-wide text-deep-cocoa leading-tight">{label}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 4 — Your Details */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="font-cormorant text-3xl text-deep-cocoa">Your Details</h2>

                  {/* Compact selection recap */}
                  <div className="border-l-2 border-champagne-gold pl-4 space-y-1">
                    <p className="font-inter text-xs text-deep-cocoa">
                      <span className="text-taupe">Shape — </span>{values.shape}
                      <span className="text-taupe mx-2">·</span>
                      <span className="text-taupe">Shell — </span>{values.shellFlavor ? SHELLS_CONFIG[values.shellFlavor]?.label : ''}
                    </p>
                    <p className="font-inter text-xs text-deep-cocoa">
                      <span className="text-taupe">Occasion — </span>
                      {OCCASIONS.find(o => o.id === values.occasion)?.label ?? ''}
                      {values.occasion === 'other' && values.occasionOther ? ` — ${values.occasionOther}` : ''}
                    </p>
                    {(values.fillings?.length ?? 0) > 0 && (
                      <p className="font-inter text-xs text-deep-cocoa">
                        <span className="text-taupe">Fillings — </span>
                        {(values.fillings ?? []).map(id => FILLINGS.find(f => f.id === id)?.label).join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Full Name</FormLabel>
                        <FormControl><Input placeholder="Your name" {...field} className="font-inter rounded-none" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Phone</FormLabel>
                        <FormControl><Input placeholder="+1 (000) 000-0000" {...field} className="font-inter rounded-none" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Email</FormLabel>
                      <FormControl><Input type="email" placeholder="you@example.com" {...field} className="font-inter rounded-none" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="quantity" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={20} {...field} className="font-inter w-32 rounded-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Any Other Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Allergies, special requests..." className="font-inter resize-none rounded-none border-taupe/30" rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-cocoa-wine hover:bg-deep-cocoa text-cream font-inter text-[11px] tracking-[0.4em] uppercase py-4 rounded-none transition-all duration-500"
                  >
                    {submitting ? 'Sending...' : 'Place My Order'}
                  </Button>
                  <p className="font-inter text-[10px] text-taupe/50 tracking-wide">
                    No payment required. We'll confirm your order by email.
                  </p>
                </div>
              )}

              {/* Navigation — steps 0–3 (desktop only; mobile uses sticky bar below) */}
              {step < 4 && (
                <div className="hidden lg:flex justify-between mt-12 pt-8 border-t border-taupe/10">
                  <button
                    type="button"
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="font-inter text-[11px] tracking-[0.4em] uppercase text-taupe hover:text-deep-cocoa transition-colors duration-300 disabled:opacity-30"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canProceed()}
                    className="font-inter text-[11px] tracking-[0.4em] uppercase px-8 py-3 border border-deep-cocoa text-deep-cocoa hover:bg-deep-cocoa hover:text-cream transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </div>
              )}

            </form>
          </Form>
        </div>

      </div>

      {/* Sticky mobile Continue bar (steps 0–3 only) */}
      {step < 4 && (
        <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#F5E8D0]/95 backdrop-blur-sm border-t border-taupe/15 px-4 py-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="font-inter text-[10px] tracking-[0.35em] uppercase text-taupe hover:text-deep-cocoa transition-colors disabled:opacity-30"
          >
            ← Back
          </button>
          <span className="font-inter text-[9px] tracking-[0.2em] text-taupe/50 uppercase">
            {step + 1} / {STEPS.length}
          </span>
          <button
            type="button"
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}
            className="font-inter text-[10px] tracking-[0.35em] uppercase px-5 py-2 bg-deep-cocoa text-cream hover:bg-cocoa-wine transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
