'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const ingredients = [
  {
    image: '/gallery/ingredient-callebaut-823-milk.jpg',
    alt: 'Callebaut 823 milk chocolate couverture',
    name: 'Callebaut 823 Milk',
    note: '33.6% cocoa — creamy, caramel warmth',
  },
  {
    image: '/gallery/ingredient-callebaut-velvet-white.jpg',
    alt: 'Callebaut Velvet white chocolate couverture',
    name: 'Callebaut Velvet White',
    note: 'Silky vanilla finish, ivory shell',
  },
  {
    image: '/gallery/ingredient-callebaut-ruby.jpg',
    alt: 'Callebaut Ruby chocolate couverture',
    name: 'Callebaut Ruby',
    note: 'Naturally pink — berry & citrus notes',
  },
]

export function IngredientsStrip() {
  return (
    <section className="py-24 px-6 lg:px-20 bg-deep-cocoa">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ingredients.map((item, i) => (
            <motion.div
              key={item.name}
              className="group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-sm mb-5">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="font-cormorant text-xl text-cream mb-1">{item.name}</p>
              <p className="font-inter text-xs text-taupe tracking-wide">{item.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
