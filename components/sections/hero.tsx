'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

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

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-start md:items-center overflow-hidden"
      style={{ background: '#140a09' }}
    >
      {/* Layer 1 — illuminated center-right plane: the "3rd background" surface */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 78% 72% at 66% 46%, #3c1118 0%, #220d10 46%, transparent 74%)',
        }}
      />

      {/* Layer 2 — warm amber spotlight from top-right (luxury light source) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 44% 54% at 90% -5%, rgba(200,82,18,0.50) 0%, rgba(160,58,12,0.24) 36%, transparent 62%)',
        }}
      />

      {/* Layer 3 — warm echo bloom bottom-right (reflected bounce light) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%', right: '6%', width: '48%', height: '58%',
          background:
            'radial-gradient(ellipse at 60% 28%, rgba(135,38,14,0.22) 0%, transparent 60%)',
        }}
      />

      {/* Layer 4 — subtle warm luminosity at depth center (glass-like lit plane) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '18%', left: '42%', width: '52%', height: '62%',
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(72,18,28,0.30) 0%, transparent 68%)',
        }}
      />

      {/* Layer 5 — left shadow: pushes text plane forward, creates depth contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(7,1,2,0.88) 0%, rgba(7,1,2,0.44) 28%, rgba(7,1,2,0.10) 50%, transparent 64%)',
        }}
      />

      {/* Layer 6 — bottom shadow well: ground depth, anchors the scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(3,0,1,0.96) 0%, rgba(3,0,1,0.48) 14%, rgba(3,0,1,0.14) 28%, transparent 42%)',
        }}
      />

      {/* Layer 7 — top ceiling shadow: seals the space above */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3,0,1,0.78) 0%, rgba(3,0,1,0.22) 16%, transparent 32%)',
        }}
      />

      {/* Layer 8 — edge vignette: corners collapse to near-black for cinematic frame */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 88% 88% at 50% 50%, transparent 26%, rgba(4,0,2,0.52) 58%, rgba(2,0,1,0.92) 100%)',
        }}
      />

      {/* Layer 9 — film grain: tactile cinematic texture for perceived depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.065,
          mixBlendMode: 'overlay' as const,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '148px 148px',
        }}
      />

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
