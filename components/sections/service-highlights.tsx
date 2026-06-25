'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

function BowIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M16 16 C10 10, 4 8, 4 12 C4 16, 10 16, 16 16 C22 16, 28 16, 28 12 C28 8, 22 10, 16 16Z" />
      <path d="M16 16 C10 22, 4 24, 4 20 C4 16, 10 16, 16 16 C22 16, 28 16, 28 20 C28 24, 22 22, 16 16Z" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M16 27 C16 27, 4 19, 4 11 C4 7.5, 6.5 5, 10 5 C12.5 5, 14.5 6.5, 16 8.5 C17.5 6.5, 19.5 5, 22 5 C25.5 5, 28 7.5, 28 11 C28 19, 16 27, 16 27Z" />
    </svg>
  )
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <polygon points="16,4 28,14 16,28 4,14" />
      <line x1="4" y1="14" x2="28" y2="14" />
      <line x1="10" y1="4" x2="16" y2="14" />
      <line x1="22" y1="4" x2="16" y2="14" />
    </svg>
  )
}

interface ServiceHighlightsProps {
  content?: Record<string, string>
}

export function ServiceHighlights({ content = {} }: ServiceHighlightsProps) {
  const eyebrow  = content.services_eyebrow  ?? 'For Every Occasion'
  const headline = content.services_headline ?? 'A gift worth remembering.'

  const services = [
    {
      Icon: BowIcon,
      title:       content.services_1_title ?? 'Wedding & Birthday Favours',
      description: content.services_1_desc  ?? 'Custom-packaged mini boxes for your special day. Personalised tags, themed colours, and minimum order options for any event size.',
      href: content.services_1_href ?? '/favors',
      cta:  content.services_1_cta  ?? 'Plan Your Favours',
    },
    {
      Icon: HeartIcon,
      title:       content.services_2_title ?? 'Breakable Hearts & Balls',
      description: content.services_2_desc  ?? 'Choose your shell, pick your fillings, and tuck a surprise inside. A theatrical chocolate experience your recipient will never forget.',
      href: content.services_2_href ?? '/breakable',
      cta:  content.services_2_cta  ?? 'Build Yours',
    },
    {
      Icon: DiamondIcon,
      title:       content.services_3_title ?? 'Business Collaborations',
      description: content.services_3_desc  ?? 'Coffee shops, boutiques, and event venues — carry Lorva at your location. Wholesale pricing and co-branding options available.',
      href: content.services_3_href ?? '/contact',
      cta:  content.services_3_cta  ?? 'Work With Us',
    },
  ]

  return (
    <section className="py-24 px-6 lg:px-20 bg-deep-cocoa">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="gold-rule mb-8 block" />
          <p className="font-inter text-[9px] tracking-[0.5em] text-taupe uppercase mb-5">
            {eyebrow}
          </p>
          <h2
            className="font-cormorant text-cream leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
          >
            {headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-taupe/10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group p-10 bg-deep-cocoa hover:bg-white/[0.03] transition-colors duration-500"
            >
              <span className="font-cormorant text-champagne-gold/20 group-hover:text-champagne-gold/35 text-5xl leading-none block mb-8 transition-colors duration-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-cormorant text-2xl text-cream mb-4 group-hover:text-champagne-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="font-inter text-sm text-taupe leading-relaxed mb-10">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="group/link inline-flex items-center gap-3 font-inter text-[10px] text-champagne-gold/60 tracking-[0.45em] uppercase hover:text-champagne-gold transition-colors duration-300"
              >
                <span className="relative">
                  {service.cta}
                  <span className="absolute -bottom-px left-0 h-px w-0 bg-champagne-gold group-hover/link:w-full transition-all duration-500" />
                </span>
                <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
