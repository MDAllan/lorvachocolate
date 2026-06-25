'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { DbProduct } from '@/lib/data/products-db'

const COLLECTION_PHOTOS = [
  { src: '/gallery/chocolates-orange-tiger-tray.png',    alt: 'Orange-marbled bonbons and dark chocolate hearts on a gold tray' },
  { src: '/gallery/chocolates-matcha-pistachio-tray.png', alt: 'Matcha pistachio hearts on a white gold-trimmed tray' },
  { src: '/gallery/chocolates-daisy-gift-silver-tray.jpg', alt: 'Pink daisy and square chocolates on a silver ornate tray' },
]

interface FeaturedProductsProps {
  products?: DbProduct[]
  content?: Record<string, string>
}

export function FeaturedProducts({ products = [], content = {} }: FeaturedProductsProps) {
  const eyebrow = content.featured_eyebrow ?? 'Bonbon Collections'
  const headline = content.featured_headline ?? 'Crafted to Perfection'

  return (
    <section className="py-24 px-6 lg:px-20 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-inter text-[9px] tracking-[0.5em] text-taupe uppercase mb-5">
            {eyebrow}
          </p>
          <h2
            className="font-cormorant text-deep-cocoa leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
          >
            {headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTION_PHOTOS.map((photo, i) => {
            const product = products[i]
            return (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group"
              >
                <Link href="/products" className="block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                    />
                  </div>

                  {product && (
                    <div className="space-y-3">
                      <h3 className="font-cormorant text-2xl text-deep-cocoa group-hover:text-cocoa-wine transition-colors duration-300">
                        {product.name}
                      </h3>

                      {product.flavors.length > 0 && (
                        <p className="font-inter text-xs text-taupe/70 leading-relaxed">
                          {product.flavors.join(' · ')}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-taupe/10">
                        <span className="font-inter text-sm text-deep-cocoa">
                          <span className="text-taupe text-xs mr-1">from</span>
                          ${product.price12}
                          <span className="text-taupe text-xs ml-1">/ 12pc</span>
                        </span>
                        <span className="inline-flex items-center gap-2 font-inter text-[10px] text-cocoa-wine tracking-[0.35em] uppercase group-hover:text-deep-cocoa transition-colors duration-300">
                          Order
                          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                      </div>
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-5 font-inter text-[11px] tracking-[0.5em] text-deep-cocoa uppercase hover:text-cocoa-wine transition-colors duration-500"
          >
            <span className="relative">
              View Full Collection
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-cocoa-wine group-hover:w-full transition-all duration-700 ease-out" />
            </span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-500 inline-block">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
