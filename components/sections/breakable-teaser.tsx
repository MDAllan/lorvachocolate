'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MagneticButton } from '@/components/ui/magnetic-button'

export function BreakableTeaser() {
  return (
    <section className="py-24 bg-[#1a0c0a] px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-72 h-72 lg:w-96 lg:h-96"
          >
            <Image
              src="/gallery/breakable-heart-white-gold-leaf.jpg"
              alt="Breakable chocolate heart with gold leaf"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 288px, 384px"
            />
          </motion.div>
          <div className="absolute inset-0 rounded-full bg-champagne-gold/10 blur-3xl -z-10" />
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="gold-rule mb-8 block w-10" />
          <p className="font-inter text-[9px] tracking-[0.5em] uppercase text-champagne-gold/70 mb-4">
            Breakable Hearts
          </p>
          <h2
            className="font-cormorant text-cream font-light leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            A chocolate moment
            <br />
            <span className="text-champagne-gold">they will never forget.</span>
          </h2>
          <p className="font-inter text-[13px] text-cream/50 leading-[1.85] mb-10 max-w-sm">
            Hide a surprise inside a hand-crafted chocolate shell. A proposal, a gender reveal, a birthday — then hand them the hammer.
          </p>
          <MagneticButton className="inline-block">
            <Link
              href="/breakable"
              className="inline-block font-inter text-[10px] tracking-[0.4em] uppercase px-8 py-3 border border-cream/30 text-cream hover:bg-cream hover:text-deep-cocoa transition-all duration-300"
            >
              Build Your Heart →
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
