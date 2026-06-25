'use client'

import { motion } from 'framer-motion'

export function GalleryHeader() {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-inter text-xs tracking-[0.4em] text-taupe uppercase mb-4">
        Lorva Fine Chocolate
      </p>
      <h1 className="font-cormorant text-6xl md:text-7xl text-deep-cocoa mb-5">
        Gallery
      </h1>
      <p className="font-inter text-sm text-taupe max-w-sm mx-auto leading-relaxed">
        A glimpse into our chocolates — crafted with care, assembled by hand.
      </p>
    </motion.div>
  )
}
