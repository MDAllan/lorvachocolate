'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Step = 'occasion' | 'format' | 'result'

const OCCASIONS = [
  { label: 'Birthday' },
  { label: 'Wedding' },
  { label: 'Proposal / Surprise' },
  { label: 'Corporate' },
  { label: 'Just Because' },
]

const FORMATS = [
  { label: 'Bonbon Box', sub: '12pc or 16pc' },
  { label: 'Favour Boxes', sub: 'weddings & events' },
  { label: 'Breakable Heart', sub: 'smash & reveal' },
  { label: 'Custom Order', sub: 'tell us your vision' },
]

interface Result {
  headline: string
  sub: string
  href: string
  cta: string
}

function getResult(occasion: string, format: string): Result {
  if (format === 'Breakable Heart' || occasion === 'Proposal / Surprise') {
    return {
      headline: 'The Breakable Heart',
      sub: 'A chocolate moment they will never forget. Custom-built for your reveal.',
      href: '/breakable',
      cta: 'Build Your Heart',
    }
  }
  if (format === 'Favour Boxes' || occasion === 'Wedding') {
    return {
      headline: 'Favour Boxes',
      sub: 'Elegant favour boxes, fully custom for your event and guest count.',
      href: '/favors',
      cta: 'Request Favours',
    }
  }
  if (occasion === 'Corporate') {
    return {
      headline: 'Corporate Gifting',
      sub: 'Premium branded boxes for client appreciation, events, and team gifts.',
      href: '/contact',
      cta: 'Get in Touch',
    }
  }
  return {
    headline: 'Bonbon Collections',
    sub: 'Handcrafted boxes in 12 or 16 pieces — pick your preferred flavour profile.',
    href: '/products',
    cta: 'Shop Collections',
  }
}

export function GiftFinder() {
  const [step, setStep] = useState<Step>('occasion')
  const [occasion, setOccasion] = useState('')
  const [format, setFormat] = useState('')

  function pickOccasion(o: string) {
    setOccasion(o)
    setStep('format')
  }

  function pickFormat(f: string) {
    setFormat(f)
    setStep('result')
  }

  function reset() {
    setOccasion('')
    setFormat('')
    setStep('occasion')
  }

  const result = occasion && format ? getResult(occasion, format) : null

  return (
    <section className="py-24 bg-vanilla px-6 lg:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="gold-rule mb-8 block mx-auto w-10" />
          <p className="font-inter text-[9px] tracking-[0.5em] uppercase text-taupe mb-4">
            Not sure what to order?
          </p>
          <h2
            className="font-cormorant text-deep-cocoa font-light leading-[1.05] mb-12"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
          >
            Find your perfect gift.
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'occasion' && (
            <motion.div
              key="occasion"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-taupe mb-6">
                What&apos;s the occasion?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {OCCASIONS.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => pickOccasion(o.label)}
                    className="font-inter text-[11px] tracking-[0.2em] uppercase px-5 py-3 border border-taupe/30 text-deep-cocoa hover:border-deep-cocoa hover:bg-deep-cocoa hover:text-cream transition-all duration-200"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'format' && (
            <motion.div
              key="format"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-inter text-[11px] tracking-[0.3em] uppercase text-taupe mb-2">
                {occasion} — what format?
              </p>
              <button
                onClick={reset}
                className="font-inter text-[10px] text-taupe/50 underline mb-6 block mx-auto hover:text-taupe"
              >
                ← start over
              </button>
              <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto">
                {FORMATS.map((f) => (
                  <button
                    key={f.label}
                    onClick={() => pickFormat(f.label)}
                    className="font-inter text-left px-4 py-4 border border-taupe/30 hover:border-deep-cocoa hover:bg-deep-cocoa hover:text-cream transition-all duration-200 group"
                  >
                    <p className="text-[11px] tracking-[0.2em] uppercase text-deep-cocoa group-hover:text-cream mb-1">
                      {f.label}
                    </p>
                    <p className="text-[10px] text-taupe/60 group-hover:text-cream/60">{f.sub}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="border border-taupe/20 p-6 sm:p-10 bg-cream"
            >
              <p className="font-inter text-[9px] tracking-[0.4em] uppercase text-champagne-gold mb-3">
                We recommend
              </p>
              <h3 className="font-cormorant text-deep-cocoa text-3xl mb-3">{result.headline}</h3>
              <p className="font-inter text-[13px] text-taupe leading-relaxed mb-8 max-w-sm mx-auto">
                {result.sub}
              </p>
              <Link
                href={result.href}
                className="inline-block font-inter text-[10px] tracking-[0.4em] uppercase px-8 py-3 bg-deep-cocoa text-cream hover:bg-cocoa-wine transition-colors duration-300"
              >
                {result.cta} →
              </Link>
              <button
                onClick={reset}
                className="block mx-auto mt-4 font-inter text-[10px] text-taupe/50 underline hover:text-taupe"
              >
                Start over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
