'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const LETTERS = ['L', 'O', 'R', 'V', 'A']

const GRAIN = {
  opacity: 0.06,
  mixBlendMode: 'overlay' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundSize: '148px 148px',
}

export function KineticHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#080204] flex flex-col items-center justify-center">

      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero/herostorytelling.mp4"
      />

      {/* Black overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.52)' }}
      />

      {/* Grain texture */}
      <div className="absolute inset-0 pointer-events-none" style={GRAIN} />

      {/* Gold ambient glow behind title */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(300px, 70vw, 900px)',
          height: 'clamp(200px, 40vh, 500px)',
          background: 'radial-gradient(ellipse at center, rgba(201,169,97,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Centred hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Eyebrow */}
        <p
          className="font-inter uppercase tracking-[0.55em] text-champagne-gold/60 mb-6"
          style={{ fontSize: 'clamp(8px, 1.2vw, 11px)' }}
        >
          Fine Chocolate · Toronto
        </p>

        {/* Top rule */}
        <div className="w-12 h-px bg-champagne-gold/40 mb-8" />

        {/* LORVA title — static, always visible */}
        <div className="flex items-center justify-center">
          {LETTERS.map((char) => (
            <span
              key={char}
              style={{
                display: 'inline-block',
                color: '#C9A961',
                lineHeight: 1,
                fontFamily: 'var(--font-logo)',
                fontSize: 'clamp(5rem, 18vw, 18rem)',
                fontWeight: 300,
                letterSpacing: '0.06em',
                userSelect: 'none',
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="w-12 h-px bg-champagne-gold/40 mt-8 mb-8" />

        {/* Tagline */}
        <p
          className="font-inter text-cream/60 leading-relaxed mb-10 max-w-xs"
          style={{ fontSize: 'clamp(10px, 1.4vw, 13px)', letterSpacing: '0.08em' }}
        >
          Handcrafted to order. Made for the moments that matter.
        </p>

        {/* CTA */}
        <Link
          href="/products"
          className="font-inter uppercase tracking-[0.45em] text-cream border border-cream/30 hover:border-champagne-gold hover:text-champagne-gold transition-colors duration-300 px-8 py-3"
          style={{ fontSize: 'clamp(9px, 1.1vw, 11px)' }}
        >
          Discover the Collection
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-3">
        <p
          className="font-inter uppercase text-cream/25"
          style={{ fontSize: '8px', letterSpacing: '0.65em' }}
        >
          Scroll
        </p>
        <motion.div
          className="w-px bg-gradient-to-b from-champagne-gold/40 to-transparent"
          style={{ height: 16 }}
          animate={{ height: [16, 36, 16] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
