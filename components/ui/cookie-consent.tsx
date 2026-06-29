'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('lorva_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1800)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('lorva_cookie_consent', 'accepted')
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem('lorva_cookie_consent', 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          className="fixed bottom-0 left-0 right-0 z-[9997] bg-deep-cocoa/95 backdrop-blur-sm border-t border-champagne-gold/15"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-inter text-xs text-cream/70 leading-relaxed max-w-xl">
              We use cookies to enhance your browsing experience.{' '}
              <Link href="/privacy" className="text-champagne-gold hover:text-champagne-gold/80 underline underline-offset-2 transition-colors">
                Learn more
              </Link>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={decline}
                className="font-inter text-[10px] tracking-[0.2em] uppercase text-cream/50 hover:text-cream/80 transition-colors px-1"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="font-inter text-[10px] tracking-[0.2em] uppercase bg-champagne-gold hover:bg-champagne-gold/90 text-deep-cocoa px-5 py-2 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
