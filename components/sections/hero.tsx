'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

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
  const subtext = content.hero_subtext ?? 'Handcrafted bonbons and confections made with intention.'

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-start md:items-center overflow-hidden"
      style={{ background: '#1a0c0a' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 75% at 10% 55%, #2e1511 0%, transparent 65%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #1a0c0a 0%, transparent 40%)' }}
      />

      <div
        className="absolute right-0 top-0 h-full w-3/5 pointer-events-none"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 20%, black 45%), linear-gradient(to top, transparent 0%, black 28%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 20%, black 45%), linear-gradient(to top, transparent 0%, black 28%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          src="/hero/herosectionvideo.mp4"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #1a0c0a 32%, rgba(26,12,10,0.5) 55%, transparent 70%)',
        }}
      />

      <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-20 pt-28 md:pt-0 pb-24">
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

          <div className="mb-8 md:mb-10">
            <h1
              className="font-cormorant text-champagne-gold leading-[0.92] tracking-[0.06em] uppercase"
              style={{ fontSize: 'clamp(1.6rem, 3.2vw, 3.5rem)' }}
            >
              {headline2}
            </h1>
          </div>

          <p className="font-inter text-sm md:text-base text-cream/55 leading-relaxed max-w-sm font-light tracking-wide">
            {subtext}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-4 font-inter text-[10px] tracking-[0.55em] uppercase border border-champagne-gold/40 text-champagne-gold px-8 py-4 hover:bg-champagne-gold hover:text-[#1a0c0a] transition-all duration-500"
            >
              Explore Collection
            </Link>
            <a
              href="#manifesto"
              className="font-inter text-[10px] tracking-[0.45em] uppercase text-cream/35 hover:text-cream/70 transition-colors duration-300"
            >
              Our Story ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
