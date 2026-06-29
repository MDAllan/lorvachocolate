'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <section ref={ref} className="bg-vanilla py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-taupe">
            Stay in the Loop
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl text-deep-cocoa font-light leading-tight">
            Sweet news, delivered to you
          </h2>
          <p className="font-inter text-sm text-taupe leading-relaxed max-w-md mx-auto">
            Early access to seasonal collections, limited editions, and chocolate musings — straight to your inbox.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4"
            >
              <p className="font-cormorant text-2xl text-cocoa-wine">You&rsquo;re on the list.</p>
              <p className="font-inter text-sm text-taupe mt-2">We&rsquo;ll be in touch with something sweet.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-cream border border-taupe/25 font-inter text-sm text-deep-cocoa placeholder:text-taupe/50 focus:outline-none focus:border-champagne-gold transition-colors"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-7 py-3 bg-deep-cocoa hover:bg-cocoa-wine text-cream font-inter text-[11px] tracking-[0.3em] uppercase transition-all duration-300 disabled:opacity-60"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="font-inter text-xs text-cocoa-wine" role="alert">{errorMsg}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
