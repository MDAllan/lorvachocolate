'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const STEP_IMAGE_DEFAULTS = [
  { image: '/gallery/ingredient-callebaut-823-milk.jpg', imageAlt: 'Callebaut 823 milk couverture chocolate block' },
  { image: '/gallery/process-caramel-filling.jpg',       imageAlt: 'Caramel being poured into tempered chocolate shells' },
  { image: '/gallery/process-matcha-piping.jpg',         imageAlt: 'Matcha ganache being piped into chocolate shells' },
  { image: '/gallery/truffle-dark-hazelnut-filling.jpg', imageAlt: 'Dark chocolate truffle with hazelnut filling cross-section' },
]

interface CraftProcessProps {
  content?: Record<string, string>
}

export function CraftProcess({ content = {} }: CraftProcessProps) {
  const eyebrow    = content.process_eyebrow    ?? 'The Process'
  const headline1  = content.process_headline_1 ?? 'From raw cacao'
  const headline2  = content.process_headline_2 ?? 'to finished piece.'

  const steps = [
    {
      number: '01',
      title:    content.process_step_1_title ?? 'Couverture Selection',
      body:     content.process_step_1_body  ?? 'We source single-origin couverture chocolate with a minimum 64% cacao. Each batch is chosen for terroir, not price.',
      image:    content.process_step_1_image ?? STEP_IMAGE_DEFAULTS[0].image,
      imageAlt: STEP_IMAGE_DEFAULTS[0].imageAlt,
    },
    {
      number: '02',
      title:    content.process_step_2_title ?? 'Hand-Tempered Shells',
      body:     content.process_step_2_body  ?? 'Shells are tempered by hand to 31.5°C. No shortcuts. The snap, the sheen, and the melt are all a consequence of this single step.',
      image:    content.process_step_2_image ?? STEP_IMAGE_DEFAULTS[1].image,
      imageAlt: STEP_IMAGE_DEFAULTS[1].imageAlt,
    },
    {
      number: '03',
      title:    content.process_step_3_title ?? 'Ganache & Fill',
      body:     content.process_step_3_body  ?? 'Fillings are made fresh: infused creams, fruit purées, and spiced caramels. Nothing is premade. Nothing is frozen.',
      image:    content.process_step_3_image ?? STEP_IMAGE_DEFAULTS[2].image,
      imageAlt: STEP_IMAGE_DEFAULTS[2].imageAlt,
    },
    {
      number: '04',
      title:    content.process_step_4_title ?? 'Sealed & Set',
      body:     content.process_step_4_body  ?? 'Each piece is sealed, set at precise humidity, and inspected before it is placed in the box.',
      image:    content.process_step_4_image ?? STEP_IMAGE_DEFAULTS[3].image,
      imageAlt: STEP_IMAGE_DEFAULTS[3].imageAlt,
    },
  ]

  return (
    <section className="py-28 px-6 lg:px-20 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="gold-rule mb-8 block" />
          <p className="font-inter text-[9px] tracking-[0.55em] text-taupe uppercase mb-5">
            {eyebrow}
          </p>
          <h2
            className="font-cormorant text-deep-cocoa leading-[1.0]"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
          >
            {headline1}
            <br />
            <span className="text-cocoa-wine">{headline2}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="border-l border-taupe/15 pl-8 pr-6 pb-12 lg:pb-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-sm">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <span
                className="font-cormorant text-taupe/20 leading-none block mb-4"
                style={{ fontSize: 'clamp(2rem, 3vw, 3.5rem)' }}
              >
                {step.number}
              </span>
              <h3 className="font-cormorant text-xl text-deep-cocoa mb-4 leading-snug">
                {step.title}
              </h3>
              <p className="font-inter text-sm text-taupe leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center font-inter text-[11px] tracking-[0.25em] uppercase text-taupe/50 mt-16"
        >
          Every piece leaves our kitchen within 48 hours of your order.
        </motion.p>
      </div>
    </section>
  )
}
