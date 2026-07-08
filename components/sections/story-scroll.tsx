'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const PANELS = [
  {
    step: '01',
    label: 'The Source',
    headline: 'Belgian\ncouverture.',
    sub: 'We source only Callebaut — the same chocolate trusted by the world\'s finest kitchens. Nothing less.',
    image: '/gallery/ingredient-callebaut-823-milk.jpg',
  },
  {
    step: '02',
    label: 'The Shell',
    headline: 'Tempered\nby hand.',
    sub: 'Every shell is hand-tempered to exactly 31.5°C. The snap, the sheen, the melt — all of it lives here.',
    image: '/gallery/process-caramel-filling.jpg',
  },
  {
    step: '03',
    label: 'The Fill',
    headline: 'Made\nfresh.',
    sub: 'Infused creams, fruit purées, spiced caramels. Nothing is premade. Nothing is frozen. Ever.',
    image: '/gallery/process-matcha-piping.jpg',
  },
  {
    step: '04',
    label: 'The Piece',
    headline: 'Sealed\nand set.',
    sub: 'Inspected by eye. Every single one. Set at precise humidity until the surface is perfect.',
    image: '/gallery/truffle-dark-hazelnut-filling.jpg',
  },
  {
    step: '05',
    label: 'Your Moment',
    headline: 'Made\nfor you.',
    sub: 'Not for shelves. Not for stock. Made when you order — and for no one else.',
    image: '/gallery/chocolates-hearts-favor-boxes.jpg',
  },
]

const PANEL_COUNT = PANELS.length

export function StoryScroll() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll 0→1 to translateX: 0 → -(n-1)*100vw
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(PANEL_COUNT - 1) * 100}vw`]
  )

  return (
    <>
      {/* Mobile: vertical stack */}
      <div className="lg:hidden">
        {PANELS.map((panel) => (
          <div key={panel.step} className="relative h-screen flex items-center overflow-hidden bg-[#080204]">
            <Image
              src={panel.image}
              alt={panel.headline.replace('\n', ' ')}
              fill
              className="object-cover opacity-35"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="relative z-10 px-6 max-w-sm">
              <p className="font-inter text-[9px] tracking-[0.6em] uppercase text-champagne-gold/60 mb-5">
                {panel.step} — {panel.label}
              </p>
              <h2
                className="font-cormorant text-cream font-light leading-[0.95] mb-5 whitespace-pre-line"
                style={{ fontSize: 'clamp(2.8rem, 10vw, 5rem)' }}
              >
                {panel.headline}
              </h2>
              <p className="font-inter text-[12px] text-cream/45 leading-relaxed">
                {panel.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: horizontal scroll-jacked */}
      <div ref={outerRef} className="hidden lg:block" style={{ height: `${PANEL_COUNT * 100}vh` }}>
        <div
          style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
          className="bg-[#080204]"
        >
          <motion.div
            style={{ x, width: `${PANEL_COUNT * 100}vw` }}
            className="flex h-full"
          >
            {PANELS.map((panel, i) => (
              <div
                key={panel.step}
                className="relative flex-none h-full flex items-center"
                style={{ width: '100vw' }}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={panel.image}
                    alt={panel.headline.replace('\n', ' ')}
                    fill
                    className="object-cover opacity-40"
                    sizes="100vw"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
                </div>

                {/* Text */}
                <div className="relative z-10 px-20 xl:px-32 max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="font-inter text-[9px] tracking-[0.65em] uppercase text-champagne-gold/60 mb-6">
                      {panel.step} / {String(PANEL_COUNT).padStart(2, '0')} &nbsp;—&nbsp; {panel.label}
                    </p>
                    <h2
                      className="font-cormorant text-cream font-light leading-[0.92] mb-7 whitespace-pre-line"
                      style={{ fontSize: 'clamp(4rem, 9vw, 9rem)' }}
                    >
                      {panel.headline}
                    </h2>
                    <p className="font-inter text-[14px] text-cream/45 leading-[1.85] max-w-sm">
                      {panel.sub}
                    </p>
                  </motion.div>
                </div>

                {/* Step counter — right side */}
                <div className="absolute right-16 bottom-10 flex items-center gap-4">
                  <div className="h-px w-8 bg-cream/15" />
                  <span className="font-inter text-[9px] tracking-[0.5em] text-cream/20 uppercase">
                    {panel.step}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Progress bar at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-champagne-gold/40 origin-left"
            style={{ scaleX: scrollYProgress, width: '100%' }}
          />
        </div>
      </div>
    </>
  )
}
