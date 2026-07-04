'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

// A curated set of gallery images to simulate an Instagram grid
const GRID_IMAGES = [
  { src: '/gallery/chocolates-hearts-favor-boxes.jpg',         alt: 'Chocolate favour boxes' },
  { src: '/gallery/ruby-roses-box.jpg',                        alt: 'Ruby chocolate roses box' },
  { src: '/gallery/breakable-heart-gender-reveal-white.jpg',   alt: 'Gender reveal breakable heart' },
  { src: '/gallery/breakable-heart-white-gold-leaf.jpg',       alt: 'Gold leaf breakable heart' },
  { src: '/gallery/chocolates-hearts-cupcake-liners.jpg',      alt: 'Heart chocolates in cupcake liners' },
  { src: '/gallery/chocolates-milk-hearts-cupcake-liners.jpg', alt: 'Milk chocolate hearts favour' },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

interface InstagramTeaserProps {
  instagramUrl?: string
}

export function InstagramTeaser({ instagramUrl = 'https://www.instagram.com/lorva.chocolate' }: InstagramTeaserProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-inter text-[11px] tracking-[0.35em] uppercase text-deep-cocoa/60 hover:text-cocoa-wine transition-colors group"
          >
            <InstagramIcon />
            <span>Follow @lorva.chocolate</span>
          </a>
          <h2 className="font-cormorant text-3xl md:text-4xl text-deep-cocoa font-light mt-3">
            As Seen on Instagram
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {GRID_IMAGES.map((img, i) => (
            <motion.a
              key={img.src}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative aspect-square overflow-hidden group block"
              aria-label={img.alt}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-deep-cocoa/0 group-hover:bg-deep-cocoa/30 transition-all duration-300 flex items-center justify-center">
                <InstagramIcon />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-[11px] tracking-[0.35em] uppercase text-taupe hover:text-cocoa-wine underline underline-offset-4 transition-colors"
          >
            View Our Full Feed
          </a>
        </motion.div>
      </div>
    </section>
  )
}
