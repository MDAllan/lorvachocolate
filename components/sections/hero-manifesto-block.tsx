'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface HeroManifestoBlockProps {
  content?: Record<string, string>
}

export function HeroManifestoBlock({ content = {} }: HeroManifestoBlockProps) {
  const eyebrow = content.hero_eyebrow ?? 'Lorva · Fine Chocolate'
  const headline1 = content.hero_headline_1 ?? 'Made Purely,'
  const headline2 = content.hero_headline_2 ?? 'Crafted Beautifully.'
  const subtext =
    content.hero_subtext ?? 'Handcrafted bonbons and confections made with intention.'

  return (
    <div className="relative">

      {/* ── BACKGROUND LAYER ──────────────────────────────────────── */}
      <div
        className="sticky top-0 h-screen overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Base background */}
        <div className="absolute inset-0 bg-[#1a0c0a]" />

        {/* Right-aligned video — 60% width, static */}
        <div
          className="absolute top-0 right-0 bottom-0"
          style={{
            width: '60%',
            maskImage: 'linear-gradient(to top, transparent 0%, black 28%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 28%)',
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

        {/* Left cover — bleeds well into the video to hide the seam */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: 'linear-gradient(to right, #1a0c0a 42%, rgba(26,12,10,0.6) 58%, transparent 75%)',
          }}
        />
        {/* Mobile-only: heavier overlay so text has full breathing room */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background: 'linear-gradient(to right, #1a0c0a 60%, rgba(26,12,10,0.88) 80%, rgba(26,12,10,0.55) 100%)',
          }}
        />

        {/* Warm atmospheric radial on the left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 75% at 10% 55%, #2e1511 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── SCROLLABLE CONTENT LAYER ──────────────────────────────── */}
      <div className="relative -mt-[100vh]" style={{ zIndex: 1 }}>

        <section className="hero-pinned-section relative min-h-screen flex items-start md:items-center overflow-hidden">
          <div className="hero-text-block relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-20 pt-24 md:pt-0 pb-16 md:pb-24">
            <div className="max-w-sm md:max-w-2xl">
              <motion.div
                className="flex items-center gap-4 mb-5 md:mb-8"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              >
                <span className="block w-5 h-px bg-champagne-gold/50" />
                <span className="font-inter text-[8px] tracking-[0.6em] text-champagne-gold/60 uppercase">
                  {eyebrow}
                </span>
              </motion.div>

              <div className="overflow-hidden mb-1">
                <motion.h1
                  className="font-cormorant text-cream leading-[0.92] tracking-[0.06em] uppercase"
                  style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {headline1}
                </motion.h1>
              </div>

              <div className="overflow-hidden mb-5 md:mb-10">
                <motion.h1
                  className="font-cormorant text-champagne-gold leading-[0.92] tracking-[0.06em] uppercase"
                  style={{ fontSize: 'clamp(1.6rem, 3.2vw, 3.5rem)' }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {headline2}
                </motion.h1>
              </div>

              <motion.p
                className="font-inter text-sm md:text-base text-cream/55 leading-relaxed max-w-sm font-light tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                {subtext}
              </motion.p>

              <motion.div
                className="mt-7 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
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
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="w-px h-10 bg-cream/30" />
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-champagne-gold"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </section>

      </div>
    </div>
  )
}
