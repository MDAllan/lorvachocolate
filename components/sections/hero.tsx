'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { FlavorShowcase } from './flavor-showcase'

interface HeroProps {
  content?: Record<string, string>
}

const GLITTER = [
  { x:  18, y:  -48, s: 2.5, delay: 0.0,  dur: 3.2 },
  { x:  72, y:   12, s: 1.5, delay: 0.6,  dur: 2.8 },
  { x: 148, y:  -62, s: 3.0, delay: 1.2,  dur: 3.6 },
  { x: 210, y:  -20, s: 2.0, delay: 0.3,  dur: 2.5 },
  { x: 280, y:   40, s: 1.5, delay: 1.7,  dur: 3.0 },
  { x: 340, y:  -35, s: 2.5, delay: 0.9,  dur: 3.4 },
  { x: 400, y:   60, s: 3.5, delay: 0.2,  dur: 2.7 },
  { x:  42, y:  130, s: 2.0, delay: 1.4,  dur: 3.1 },
  { x: 120, y:  165, s: 1.5, delay: 0.7,  dur: 2.9 },
  { x: 190, y:  120, s: 3.0, delay: 1.9,  dur: 3.5 },
  { x: 258, y:  175, s: 2.0, delay: 0.5,  dur: 2.6 },
  { x: 330, y:  108, s: 1.5, delay: 1.1,  dur: 3.3 },
  { x: 388, y:  150, s: 2.5, delay: 0.8,  dur: 2.8 },
  { x:  28, y:  215, s: 1.5, delay: 1.6,  dur: 3.2 },
  { x: 104, y:  240, s: 3.0, delay: 0.4,  dur: 2.7 },
  { x: 232, y:  228, s: 2.0, delay: 1.3,  dur: 3.6 },
  { x: 312, y:  258, s: 1.5, delay: 0.1,  dur: 2.9 },
  { x: 450, y:   85, s: 3.0, delay: 1.5,  dur: 3.1 },
  { x: 175, y:  -55, s: 2.0, delay: 0.9,  dur: 2.6 },
  { x:  60, y:  -42, s: 3.5, delay: 1.8,  dur: 3.4 },
  { x: 360, y:  200, s: 2.5, delay: 2.1,  dur: 2.8 },
  { x:  92, y:   75, s: 2.0, delay: 0.5,  dur: 3.0 },
  { x: 470, y:  135, s: 1.5, delay: 1.0,  dur: 3.5 },
]

const GLOW_BLOBS = [
  { x:  80, y:   30, size: 60, delay: 0.0, dur: 4.5 },
  { x: 220, y:  100, size: 80, delay: 1.5, dur: 5.2 },
  { x: 360, y:   20, size: 50, delay: 0.8, dur: 4.0 },
  { x: 140, y:  200, size: 70, delay: 2.2, dur: 4.8 },
]

export function Hero({ content = {} }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | undefined
    const init = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        gsap.to('.hero-content', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }, heroRef)
    }
    init()
    return () => ctx?.revert()
  }, [])

  const eyebrow = content.hero_eyebrow ?? 'Lorva · Fine Chocolate'
  const headline1 = content.hero_headline_1 ?? 'Made Purely,'
  const headline2 = content.hero_headline_2 ?? 'Crafted Beautifully.'

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-start md:items-center overflow-hidden"
      style={{ background: '#0f0307' }}
    >
      {/* Layer 1 — wall surface (upper ~56%): rich warm burgundy receding back */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, #3e1019 0%, #2d0c13 38%, #1c0809 55%, transparent 62%)',
        }}
      />

      {/* Layer 2 — floor surface (lower ~44%): darker, flatter burgundy coming toward viewer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #070205 0%, #120407 28%, #1d0809 50%, transparent 60%)',
        }}
      />

      {/* Layer 3 — horizon glow: where wall meets floor (~57%), warm rim light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 5% at 50% 57%, rgba(130,32,58,0.55) 0%, rgba(85,18,38,0.22) 55%, transparent 100%)',
        }}
      />

      {/* Layer 4 — overhead ceiling light: diffuse source from above-center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 32% at 55% -4%, rgba(95,22,42,0.52) 0%, rgba(58,12,26,0.22) 52%, transparent 74%)',
        }}
      />

      {/* Layer 5 — right wall ambient: warm light rolling in from right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 52% 68% at 102% 36%, rgba(130,32,58,0.34) 0%, rgba(82,18,38,0.14) 50%, transparent 72%)',
        }}
      />

      {/* Layer 6 — floor depth highlight: middle-distance floor catches ambient, suggesting recession */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 48% 18% at 54% 74%, rgba(70,16,32,0.45) 0%, transparent 70%)',
        }}
      />

      {/* Layer 7 — left deep shadow: keeps text area dark and readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(4,0,2,0.92) 0%, rgba(4,0,2,0.46) 22%, rgba(4,0,2,0.10) 42%, transparent 58%)',
        }}
      />

      {/* Layer 8 — right edge shadow: far wall corner */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, rgba(4,0,2,0.68) 0%, rgba(4,0,2,0.22) 18%, transparent 38%)',
        }}
      />

      {/* Layer 9 — bottom front shadow: floor darkens at viewer's feet */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(3,0,1,0.96) 0%, rgba(3,0,1,0.52) 12%, rgba(3,0,1,0.12) 24%, transparent 36%)',
        }}
      />

      {/* Layer 10 — ceiling shadow: top edge darkens */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,0,1,0.78) 0%, rgba(3,0,1,0.20) 15%, transparent 30%)',
        }}
      />

      {/* Layer 6 — film grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.065,
          mixBlendMode: 'overlay' as const,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '148px 148px',
        }}
      />

      <div className="hero-content relative z-10 w-full flex items-center pl-5 lg:pl-[100px] pr-5 pt-28 md:pt-0 pb-24">
        <div className="max-w-sm md:max-w-xl flex-shrink-0" style={{ position: 'relative' }}>

          {/* Golden glitter — soft glow blobs behind text */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}>
            {GLOW_BLOBS.map((b, i) => (
              <motion.div
                key={`blob-${i}`}
                style={{
                  position: 'absolute',
                  left: b.x,
                  top: b.y,
                  width: b.size,
                  height: b.size,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(201,169,97,0.22) 0%, rgba(201,169,97,0.06) 60%, transparent 100%)',
                  filter: 'blur(14px)',
                }}
                animate={{ opacity: [0.3, 0.9, 0.4, 1, 0.3], scale: [1, 1.15, 0.95, 1.1, 1] }}
                transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}

            {/* Golden sparkle dots */}
            {GLITTER.map((p, i) => (
              <motion.div
                key={`spark-${i}`}
                style={{
                  position: 'absolute',
                  left: p.x,
                  top: p.y,
                  width: p.s,
                  height: p.s,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, rgba(255,228,130,0.95) 0%, rgba(201,169,97,0.7) 55%, transparent 100%)`,
                  filter: p.s >= 3 ? 'blur(0.4px)' : 'none',
                }}
                animate={{
                  opacity: [0, 0.9, 0.5, 1, 0],
                  y: [0, -10, -18, -10, 0],
                  scale: [0.7, 1.3, 1.0, 1.4, 0.7],
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Text content — sits above glitter */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="flex items-center gap-4 mb-7 md:mb-8">
              <span className="block w-5 h-px bg-champagne-gold/50" />
              <span className="font-inter text-[8px] tracking-[0.6em] text-champagne-gold/60 uppercase">
                {eyebrow}
              </span>
            </div>

            <div className="mb-1">
              <h1
                className="font-cormorant text-cream leading-[0.92] tracking-[0.06em] uppercase"
                style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
              >
                {headline1}
              </h1>
            </div>

            <div className="mb-10 md:mb-12">
              <h1
                className="font-cormorant text-champagne-gold leading-[0.92] tracking-[0.06em] uppercase"
                style={{ fontSize: 'clamp(1.6rem, 3.2vw, 3.5rem)' }}
              >
                {headline2}
              </h1>
            </div>

            <a
              href="#manifesto"
              className="font-inter text-[10px] tracking-[0.5em] uppercase text-cream/40 hover:text-cream/70 transition-colors duration-300"
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Right half — bonbon flavor showcase (desktop only) */}
        <div className="absolute -bottom-32 right-[8%] z-10 md:relative md:bottom-auto md:right-auto md:z-auto md:flex-1 md:flex md:items-center md:justify-center">
          <FlavorShowcase />
        </div>
      </div>
    </section>
  )
}
