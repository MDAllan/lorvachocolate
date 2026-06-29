'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { useMotionValue, useSpring, useScroll } from 'framer-motion'
import { PhotoCard, PHOTOS } from './hero-photo-card'

interface HeroProps {
  content?: Record<string, string>
}

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

  // ── Mouse parallax ──────────────────────────────────────────────────────────
  const [hovered, setHovered] = useState<string | null>(null)

  const rawMouseX = useMotionValue(0)
  const rawMouseY = useMotionValue(0)
  const mouseX = useSpring(rawMouseX, { stiffness: 80, damping: 20 })
  const mouseY = useSpring(rawMouseY, { stiffness: 80, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    rawMouseX.set((e.clientX - rect.left) / rect.width  - 0.5)
    rawMouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }, [rawMouseX, rawMouseY])

  const { scrollYProgress } = useScroll({
    target:  heroRef,
    offset:  ['start start', 'end start'],
  })

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-start md:items-center overflow-hidden"
      style={{ background: '#140a09' }}
      onMouseMove={handleMouseMove}
    >
      {/* Layer 1 — full-coverage depth plane: covers 100%×100% so no transparent edge = no seam */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 68% 48%, #3a1016 0%, #1f0c10 38%, #140a09 100%)',
        }}
      />

      {/* Layer 2 — left shadow: pushes text plane forward */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(6,0,2,0.80) 0%, rgba(6,0,2,0.36) 26%, rgba(6,0,2,0.08) 48%, transparent 62%)',
        }}
      />

      {/* Layer 3 — bottom shadow well: deep ground anchor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(3,0,1,0.96) 0%, rgba(3,0,1,0.48) 14%, rgba(3,0,1,0.12) 28%, transparent 42%)',
        }}
      />

      {/* Layer 4 — top ceiling shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,0,1,0.72) 0%, rgba(3,0,1,0.18) 16%, transparent 30%)',
        }}
      />

      {/* Layer 5 — edge vignette: corners fall to near-black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 28%, rgba(4,0,2,0.48) 60%, rgba(2,0,1,0.90) 100%)',
        }}
      />

      {/* Layer 6 — film grain: cinematic tactile depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.065,
          mixBlendMode: 'overlay' as const,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '148px 148px',
        }}
      />

      {/* ── Photo scatter — organic bonbon shapes, right 55% of viewport ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
        {PHOTOS.map((photo, i) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            scrollYProgress={scrollYProgress}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>

      <div className="hero-content relative z-10 w-full pl-5 lg:pl-[100px] pr-5 pt-28 md:pt-0 pb-24">
        <div className="max-w-sm md:max-w-2xl">
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
    </section>
  )
}
