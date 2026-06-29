'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function IntroScreen() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Only show once per browser session
    const seen = sessionStorage.getItem('lorva_intro_seen')
    if (!seen) {
      setShow(true)
      sessionStorage.setItem('lorva_intro_seen', '1')
      const timer = setTimeout(() => setShow(false), 2200)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99998] bg-deep-cocoa flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col items-center gap-6"
          >
            <Image
              src="/logo.svg"
              alt="LORVA Fine Chocolate"
              width={140}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, ease: 'easeInOut', delay: 0.5 }}
              className="w-16 h-px bg-champagne-gold origin-left"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="font-cormorant text-champagne-gold/70 text-sm tracking-[0.4em] uppercase"
            >
              Fine Chocolate
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
