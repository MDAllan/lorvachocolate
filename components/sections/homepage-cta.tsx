'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface HomepageCtaProps {
  content?: Record<string, string>
}

export function HomepageCta({ content = {} }: HomepageCtaProps) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1XXXXXXXXXX'
  const waMessage = encodeURIComponent("Hi Lorva! I'd love to place an order.")

  const eyebrow = content.cta_eyebrow ?? 'Ready to Order'
  const headline1 = content.cta_headline_1 ?? 'Every piece,'
  const headline2 = content.cta_headline_2 ?? 'made for you.'
  const subtext = content.cta_subtext ?? 'No payment required online. Order via form or WhatsApp — we confirm details and arrange pickup personally.'

  return (
    <section
      className="relative grain overflow-hidden py-40 px-6 lg:px-20"
      style={{ background: '#1a0c0a' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, #C9A961, transparent)' }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 85% 100%, rgba(117,10,4,0.18) 0%, transparent 65%)',
        }}
      />

      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-inter text-[9px] tracking-[0.55em] text-champagne-gold/50 uppercase mb-10">
          {eyebrow}
        </p>

        <h2
          className="font-cormorant text-cream leading-[0.92] mb-12"
          style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
        >
          {headline1}
          <br />
          <span className="text-champagne-gold">{headline2}</span>
        </h2>

        <p className="font-inter text-sm text-cream/40 leading-relaxed mb-16 max-w-md">
          {subtext}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-4 font-inter text-[10px] tracking-[0.55em] uppercase bg-champagne-gold text-[#1a0c0a] px-10 py-5 hover:bg-cream transition-colors duration-500"
          >
            Browse Collection
          </Link>

          <a
            href={`https://wa.me/${waNumber}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-[10px] tracking-[0.45em] uppercase text-cream/35 hover:text-cream/70 transition-colors duration-300 border-b border-cream/15 pb-px"
          >
            Message on WhatsApp
          </a>
        </div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, #C9A961, transparent)' }}
      />
    </section>
  )
}
