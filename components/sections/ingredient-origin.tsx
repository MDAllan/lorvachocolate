'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const COUVERTURES = [
  {
    src: '/gallery/ingredient-callebaut-823-milk.jpg',
    name: 'Milk 823',
    note: 'Caramelized, creamy with a long velvety finish.',
  },
  {
    src: '/gallery/ingredient-callebaut-ruby.jpg',
    name: 'Ruby RB1',
    note: 'Naturally pink. Berry-forward with a tart, fresh finish.',
  },
  {
    src: '/gallery/ingredient-callebaut-velvet-white.jpg',
    name: 'Velvet White',
    note: 'Pure, milky, vanilla-forward. Mellow and smooth.',
  },
]

export function IngredientOrigin() {
  return (
    <section className="bg-deep-cocoa py-24 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="gold-rule mb-8 block mx-auto w-10" />
          <p className="font-inter text-[9px] tracking-[0.5em] uppercase text-champagne-gold/70 mb-4">
            Our Materials
          </p>
          <h2
            className="font-cormorant text-cream font-light leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            We source only
            <br />
            <span className="text-champagne-gold">Callebaut couverture.</span>
          </h2>
          <p className="font-inter text-[13px] text-cream/50 max-w-md mx-auto leading-relaxed">
            The same Belgian chocolate trusted by the world&apos;s finest pastry chefs — and the foundation of every piece we make.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COUVERTURES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-4">
                <Image
                  src={c.src}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) calc(100vw - 48px), 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-cocoa/60 to-transparent" />
              </div>
              <p className="font-cormorant text-cream text-xl mb-1">{c.name}</p>
              <p className="font-inter text-[11px] text-cream/50 leading-relaxed">{c.note}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cormorant text-center text-cream/30 text-lg mt-16 italic"
        >
          &ldquo;Because the base of every great chocolate is the chocolate itself.&rdquo;
        </motion.p>
      </div>
    </section>
  )
}
