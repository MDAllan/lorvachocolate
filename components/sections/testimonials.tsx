'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    occasion: 'Wedding Favours — 80 guests',
    quote: 'Lorva made our wedding unforgettable. Every guest was raving about the bonbons — we had people asking for the brand all night.',
    stars: 5,
  },
  {
    name: 'Priya K.',
    occasion: 'Custom Birthday Box',
    quote: 'I ordered a custom 16pc box for my mom\'s birthday and it was absolutely stunning. The packaging, the taste, the attention to detail — everything was perfect.',
    stars: 5,
  },
  {
    name: 'James T.',
    occasion: 'Corporate Gift Order',
    quote: 'We used Lorva for our client appreciation gifts. Premium, beautiful, and genuinely delicious. Will be ordering every quarter.',
    stars: 5,
  },
  {
    name: 'Amira L.',
    occasion: 'Breakable Heart — Gender Reveal',
    quote: 'The breakable heart was the highlight of our gender reveal! The fillings spilled out perfectly and the chocolate itself tasted incredible.',
    stars: 5,
  },
  {
    name: 'Chloe B.',
    occasion: 'Anniversary Gift',
    quote: 'I sent a bonbon box to my partner as a surprise and they said it was the best chocolate they\'d ever tasted. Already planning my next order.',
    stars: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 text-champagne-gold" aria-hidden="true">
          <path d="M6 0l1.545 3.09L11 3.635l-2.5 2.455.59 3.455L6 7.77l-3.09 1.775.59-3.455L1 3.635l3.455-.545z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-deep-cocoa py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-champagne-gold/70 mb-4">
            What People Are Saying
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light">
            Loved by Chocolate Lovers
          </h2>
          <div className="w-10 h-px bg-champagne-gold/50 mx-auto mt-6" />
        </motion.div>

        {/* Scrollable row */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="min-w-[300px] md:min-w-[360px] bg-cream/5 border border-cream/8 p-8 snap-start flex flex-col gap-5 flex-shrink-0"
            >
              <Stars count={t.stars} />
              <p className="font-inter text-sm text-cream/80 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-2 border-t border-cream/10">
                <p className="font-cormorant text-cream text-lg">{t.name}</p>
                <p className="font-inter text-[11px] text-cream/40 tracking-wide mt-0.5">{t.occasion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
