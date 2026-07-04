'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const SPEED = 0.55

const GALLERY_DEFAULTS = [
  { src: '/gallery/chocolates-ruby-hearts.jpg',           alt: 'Glossy ruby-red heart bonbons' },
  { src: '/gallery/truffle-rose-caramel-filling.png',     alt: 'Rose truffle with salted caramel filling' },
  { src: '/gallery/chocolates-emerald-dome.jpg',          alt: 'Emerald swirl dome bonbons' },
  { src: '/gallery/breakable-heart-white-gold-leaf.jpg',  alt: 'White chocolate breakable heart with gold leaf' },
  { src: '/gallery/chocolates-roses-multicolor.jpg',      alt: 'Rose-shaped bonbons in every colour' },
  { src: '/gallery/diamond-hearts-dark.jpg',              alt: 'Geometric dark chocolate diamond hearts' },
  { src: '/gallery/chocolates-matcha-pistachio-tray.png', alt: 'Matcha pistachio hearts on a gold tray' },
  { src: '/gallery/truffle-pistachio-dome-filling.webp',  alt: 'Pistachio dome bonbon cross-section' },
]

interface HomepageGalleryTeaserProps {
  content?: Record<string, string>
}

export function HomepageGalleryTeaser({ content = {} }: HomepageGalleryTeaserProps) {
  const eyebrow   = content.gallery_eyebrow    ?? 'Our Work'
  const headline1 = content.gallery_headline_1 ?? 'A glimpse into'
  const headline2 = content.gallery_headline_2 ?? 'the studio.'

  const images = GALLERY_DEFAULTS.map((def, i) => ({
    src: content[`gallery_image_${i + 1}`] ?? def.src,
    alt: def.alt,
  }))

  const x = useMotionValue(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const xAtTouchStart = useRef(0)

  const doubled = [...images, ...images]

  useAnimationFrame(() => {
    if (paused) return
    const halfWidth = (trackRef.current?.scrollWidth ?? 0) / 2
    if (halfWidth === 0) return
    const next = x.get() - SPEED
    x.set(next <= -halfWidth ? 0 : next)
  })

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
    xAtTouchStart.current = x.get()
    setPaused(true)
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const diff = e.touches[0].clientX - touchStartX.current
    const halfWidth = (trackRef.current?.scrollWidth ?? 0) / 2
    if (halfWidth === 0) return
    let next = xAtTouchStart.current + diff
    if (next <= -halfWidth) next += halfWidth
    if (next > 0) next -= halfWidth
    x.set(next)
  }

  function handleTouchEnd() {
    touchStartX.current = null
    setPaused(false)
  }

  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="px-6 lg:px-20 mb-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="gold-rule mb-8 block" />
          <p className="font-inter text-[9px] tracking-[0.55em] text-taupe uppercase mb-4">
            {eyebrow}
          </p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2
              className="font-cormorant text-deep-cocoa leading-[1.05]"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
            >
              {headline1}
              <br />
              <span className="text-cocoa-wine">{headline2}</span>
            </h2>
            <Link
              href="/gallery"
              className="font-inter text-[10px] tracking-[0.45em] uppercase text-taupe hover:text-deep-cocoa transition-colors duration-300 flex items-center gap-2 group shrink-0"
            >
              View Full Gallery
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>
      </div>

      <div
        className="overflow-hidden cursor-default"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <motion.div ref={trackRef} style={{ x }} className="flex">
          {doubled.map((img, i) => (
            <div
              key={i}
              className="group relative flex-none w-72 mx-2 aspect-square overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="288px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
