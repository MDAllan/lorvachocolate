'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BoxSizeSelector } from '@/components/ui/box-size-selector'
import { OrderForm } from '@/components/forms/order-form'
import { BONBON_COLLECTIONS, CHOCOLATE_BARS, type BonbonFlavor, type BonbonCollection, type ChocolateBar } from '@/lib/data/catalog'
import { cn } from '@/lib/utils'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
}

function FlavorCard({ flavor, collection }: { flavor: BonbonFlavor; collection: BonbonCollection }) {
  const [boxSize, setBoxSize] = useState<'12pc' | '16pc'>('12pc')

  return (
    <div className="group flex flex-col bg-cream border border-taupe/15 hover:border-taupe/30 hover:shadow-xl transition-all duration-500">

      {/* Photo */}
      {flavor.img && (
        <div className="overflow-hidden aspect-square relative bg-[#f5ede3]">
          <img
            src={flavor.img}
            alt={flavor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        {flavor.tags && flavor.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-2">
            {flavor.tags.map(tag => (
              <span key={tag} className="font-inter text-[8px] tracking-[0.3em] uppercase text-taupe border border-taupe/25 px-1.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-cormorant text-2xl text-deep-cocoa mb-2 group-hover:text-cocoa-wine transition-colors duration-300">
          {flavor.name}
        </h3>

        <p className="font-inter text-sm text-taupe leading-relaxed mb-5 flex-1">
          {flavor.description}
        </p>

        <BoxSizeSelector
          value={boxSize}
          onChange={setBoxSize}
          price12={collection.price12}
          price16={collection.price16}
        />

        <div className="mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full py-3 border border-deep-cocoa text-deep-cocoa font-inter text-[11px] tracking-[0.35em] uppercase hover:bg-deep-cocoa hover:text-cream transition-all duration-500">
                Order Now
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-cormorant text-2xl text-deep-cocoa">
                  {flavor.name}
                  <span className="font-inter text-sm text-taupe ml-2 font-normal">— {boxSize}</span>
                </DialogTitle>
              </DialogHeader>
              <OrderForm defaultProduct={`${flavor.name} — ${boxSize} (${collection.name})`} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

function BarCard({ bar }: { bar: ChocolateBar }) {
  return (
    <div className="group flex flex-col bg-cream border border-taupe/15 hover:border-taupe/30 hover:shadow-xl transition-all duration-500">
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-2">
          <span className="font-inter text-[9px] tracking-[0.4em] uppercase text-taupe border border-taupe/30 px-2 py-1">
            Bar
          </span>
        </div>
        <h3 className="font-cormorant text-2xl text-deep-cocoa mb-2 group-hover:text-cocoa-wine transition-colors duration-300">
          {bar.name}
        </h3>
        <p className="font-inter text-sm text-taupe leading-relaxed mb-4 flex-1">
          {bar.description}
        </p>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-cormorant text-3xl text-deep-cocoa">${bar.price.toFixed(2)}</span>
          <span className="font-inter text-[10px] text-taupe tracking-widest uppercase">per bar</span>
        </div>

        <div className="mt-5">
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full py-3 border border-deep-cocoa text-deep-cocoa font-inter text-[11px] tracking-[0.35em] uppercase hover:bg-deep-cocoa hover:text-cream transition-all duration-500">
                Order Now
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-cormorant text-2xl text-deep-cocoa">
                  {bar.name}
                </DialogTitle>
              </DialogHeader>
              <OrderForm defaultProduct={bar.name} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

const TIER_LABEL: Record<string, string> = {
  classic: 'Classic',
  special: 'Special',
  premium: 'Premium',
}

function CollectionHeader({ collection }: { collection: (typeof BONBON_COLLECTIONS)[number] }) {
  const isSpecial = collection.tier === 'special'
  const isPremium = collection.tier === 'premium'

  return (
    <div className={cn('mb-8', isSpecial && 'border-l-4 border-champagne-gold pl-4')}>
      <span className={cn(
        'font-inter text-[9px] tracking-[0.5em] uppercase',
        isPremium || isSpecial ? 'text-champagne-gold' : 'text-taupe',
      )}>
        {TIER_LABEL[collection.tier]}
      </span>
      <div className="flex items-baseline justify-between mt-1">
        <h3 className={cn(
          'font-cormorant text-4xl leading-tight',
          isPremium ? 'text-cream' : 'text-deep-cocoa',
        )}>
          {collection.name}
        </h3>
        <span className={cn(
          'font-cormorant text-2xl shrink-0 ml-4',
          isPremium ? 'text-champagne-gold' : 'text-cocoa-wine',
        )}>
          from ${collection.price12}
          <span className="font-inter text-xs text-taupe ml-1">/ dozen</span>
        </span>
      </div>
      <div className={cn('h-px mt-3', isPremium ? 'bg-taupe/20' : 'bg-taupe/15')} />
    </div>
  )
}

const BONBON_FAQS = [
  {
    q: 'How far in advance should I order?',
    a: 'We recommend placing your order at least 5-7 days in advance. Each box is assembled fresh to your selections, so a little lead time ensures every bonbon is made with care. For larger quantities (10+ boxes) or special occasions, reach out even earlier.',
  },
  {
    q: 'What are the box sizes and how much do they cost?',
    a: 'We offer 12-piece and 16-piece boxes. Pricing varies by collection tier — Classic starts at $30 for 12pc, Special at $33, and Premium at $36. The full price for 16pc is shown when you select your box size on each flavour card.',
  },
  {
    q: 'Can I mix flavours in one box?',
    a: "Absolutely. When you place your order, simply let us know which flavours you'd like included and we'll assemble a mixed box for you. Just note in the order form and we'll confirm the combination.",
  },
  {
    q: 'How does pickup work?',
    a: "After submitting your order, we'll reach out by email or phone to confirm a pickup time. A non-refundable deposit is required to secure your order, with the balance settled at pickup.",
  },
  {
    q: 'Do you accommodate allergies or dietary restrictions?',
    a: "Please mention any allergies in the Notes field when ordering. All our chocolates are made in a shared kitchen that handles nuts, dairy, and gluten. We'll confirm what's possible before you commit.",
  },
  {
    q: 'Are the bonbons available for delivery?',
    a: "Currently we offer local pickup only to ensure the chocolates reach you in perfect condition. If you're outside our area, get in touch and we'll see what we can arrange.",
  },
]

function BonbonFAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-taupe/10">
      {BONBON_FAQS.map(({ q, a }, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className={cn(
              'font-cormorant text-lg transition-colors duration-200',
              open === i ? 'text-cocoa-wine' : 'text-deep-cocoa group-hover:text-cocoa-wine',
            )}>
              {q}
            </span>
            <span className={cn(
              'ml-6 flex-shrink-0 font-inter text-lg text-taupe/50 transition-transform duration-300',
              open === i ? 'rotate-45' : 'rotate-0',
            )}>
              +
            </span>
          </button>
          <div className={cn(
            'overflow-hidden transition-all duration-300',
            open === i ? 'max-h-52 pb-5' : 'max-h-0',
          )}>
            <p className="font-inter text-sm text-taupe leading-relaxed">{a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProductsPageContent() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Page header */}
        <motion.div className="text-center mb-14" {...fadeUp}>
          <p className="font-inter text-xs tracking-[0.4em] text-taupe uppercase mb-4">
            Lorva Fine Chocolate
          </p>
          <h1 className="font-cormorant text-6xl md:text-7xl text-deep-cocoa mb-5">
            Bonbons Collection
          </h1>
          <p className="font-inter text-base text-taupe max-w-md mx-auto leading-relaxed">
            Hand-assembled to order. Choose your flavour, pick your box size — no online payment required.
          </p>
        </motion.div>

        {/* Bonbon Collections */}
        <section className="mb-28">
          <div className="space-y-12">
            {BONBON_COLLECTIONS.map((collection, ci) => (
                <motion.div
                  key={collection.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: ci * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div>
                    <CollectionHeader collection={collection} />

                    {/* Mobile: horizontal scroll | Desktop: grid */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-6 px-6 sm:grid sm:grid-cols-2 sm:overflow-visible sm:mx-0 sm:px-0 lg:grid-cols-3 sm:gap-6 sm:pb-0">
                      {collection.flavors.map((flavor, fi) => (
                        <motion.div
                          key={flavor.slug}
                          className="snap-start w-[82vw] shrink-0 sm:w-auto"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: fi * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <FlavorCard flavor={flavor} collection={collection} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>
        </section>

        {/* Chocolate Bars */}
        <section className="mb-20">
          <motion.div
            className="flex items-center gap-6 mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="font-inter text-xs tracking-[0.4em] text-taupe uppercase mb-1">
                Single Origin & Specialty
              </p>
              <h2 className="font-cormorant text-4xl text-deep-cocoa">
                Chocolate Bars
              </h2>
            </div>
            <div className="flex-1 h-px bg-taupe/20" />
            <span className="font-inter text-xs text-taupe shrink-0">Individual bars</span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHOCOLATE_BARS.map((bar, i) => (
              <motion.div
                key={bar.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <BarCard bar={bar} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8 border-t border-taupe/10 pt-20">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase text-center mb-3">
              Common Questions
            </p>
            <h2 className="font-cormorant text-4xl text-deep-cocoa text-center mb-12">
              Before You Order
            </h2>
            <BonbonFAQSection />
          </motion.div>
        </section>

      </div>
    </div>
  )
}
