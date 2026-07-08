'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const MOMENTS = [
  { src: '/gallery/breakable-heart-gender-reveal-white.jpg', caption: 'Gender Reveal · Baby A.' },
  { src: '/gallery/chocolates-hearts-favor-boxes.jpg',       caption: 'Wedding Favours · S & M' },
  { src: '/gallery/graduation-chocolates-purple-gold.png',   caption: 'Graduation · Class of 2026' },
  { src: '/gallery/breakable-heart-white-gold-leaf.jpg',     caption: 'Anniversary · H & L' },
  { src: '/gallery/chocolates-hearts-cupcake-liners.jpg',    caption: 'Baby Shower · F.' },
  { src: '/gallery/breakable-heart-class-of-2026.png',       caption: 'Graduation · Y.' },
  { src: '/gallery/gender-reveal-sphere-blue.jpg',           caption: 'Gender Reveal · Team Blue' },
  { src: '/gallery/chocolates-red-rose-box.jpg',             caption: "Valentine's Day · R." },
  { src: '/gallery/smash-box-pink.jpg',                      caption: 'Birthday · L.' },
]

export function LorvaMonents() {
  return (
    <section className="py-24 bg-cream px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <span className="gold-rule mb-8 block w-10" />
            <p className="font-inter text-[9px] tracking-[0.5em] uppercase text-taupe mb-4">
              Real Moments
            </p>
            <h2
              className="font-cormorant text-deep-cocoa font-light leading-[1.05]"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
            >
              Lorva in the wild.
            </h2>
          </div>
          <Link
            href="/gallery"
            className="font-inter text-[10px] tracking-[0.45em] uppercase text-taupe hover:text-deep-cocoa transition-colors duration-300 shrink-0"
          >
            View Full Gallery →
          </Link>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {MOMENTS.map((m, i) => (
            <motion.div
              key={m.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative break-inside-avoid overflow-hidden"
            >
              <Image
                src={m.src}
                alt={m.caption}
                width={600}
                height={800}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-deep-cocoa/0 group-hover:bg-deep-cocoa/50 transition-colors duration-300 flex items-end p-4">
                <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {m.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
