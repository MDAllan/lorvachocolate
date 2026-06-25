'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Slide { src: string; alt: string }

function FadingGallery({ slides, sizes, className = '' }: { slides: Slide[]; sizes: string; className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => setIndex(i => (i + 1) % slides.length), 3500)
    return () => clearInterval(id)
  }, [slides.length])

  if (!slides.length) return null
  const current = slides[index % slides.length]

  return (
    <div className={`relative w-full ${className}`}>
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-contain"
            sizes={sizes}
            unoptimized={current.src.startsWith('/')}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

interface BrandManifestoProps {
  content?: Record<string, string>
}

export function BrandManifesto({ content = {} }: BrandManifestoProps) {
  const eyebrow    = content.manifesto_eyebrow     ?? 'The Lorva Standard'
  const headline1  = content.manifesto_headline_1  ?? 'Chocolate is not a product.'
  const headlineGold = content.manifesto_headline_2 ?? 'It is a memory'
  const headline3  = content.manifesto_headline_3  ?? 'before it is ever tasted.'
  const body1      = content.manifesto_body_1      ?? 'Every Lorva bonbon begins not at a workbench, but in a conversation — about who the recipient is, what the occasion holds, and what feeling should linger after the last piece is gone.'
  const body2      = content.manifesto_body_2      ?? 'We work in small batches. We do not rush temper. We do not compromise ganache ratios for shelf life. What you receive is exactly what we would keep for ourselves.'
  const quote      = content.manifesto_quote       ?? 'Handcrafted in Canada. Gifted worldwide.'

  const slides: Slide[] = [
    content.manifesto_image_1 ?? '/generated/bonbon-dark-rose.png',
    content.manifesto_image_2 ?? '/generated/bonbon-cherry-heart.png',
    content.manifesto_image_3 ?? '/generated/bonbon-pistachio.png',
  ].filter(Boolean).map(src => ({ src, alt: 'Lorva bonbon' }))

  return (
    <section
      id="manifesto"
      className="relative grain overflow-hidden py-28 px-6 lg:px-20"
      style={{ background: '#1a0c0a' }}
    >
      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(117,10,4,0.2) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Desktop fading gallery */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <FadingGallery slides={slides} sizes="(max-width: 1024px) 0px, 42vw" className="aspect-[3/4]" />
        </motion.div>

        {/* Text */}
        <div>
          {/* Mobile fading gallery */}
          <div className="lg:hidden mb-10">
            <FadingGallery slides={slides} sizes="100vw" className="aspect-square" />
          </div>

          <motion.p
            className="font-inter text-[9px] tracking-[0.6em] text-champagne-gold/60 uppercase mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            className="font-cormorant text-cream leading-[1.05] mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {headline1}
            <br />
            <span className="text-champagne-gold">{headlineGold}</span>{' '}
            {headline3}
          </motion.h2>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <p className="font-inter text-sm text-cream/55 leading-[1.85] max-w-md">{body1}</p>
            <p className="font-inter text-sm text-cream/55 leading-[1.85] max-w-md">{body2}</p>
          </motion.div>

          <motion.div
            className="mt-12 flex items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="block w-px h-10 bg-champagne-gold/25" />
            <p className="font-cormorant text-champagne-gold/80 text-lg italic">
              &ldquo;{quote}&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
