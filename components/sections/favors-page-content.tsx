'use client'

import { motion } from 'framer-motion'
import { FavorInquiryForm } from '@/components/forms/favor-inquiry-form'

const offerings = [
  {
    title: 'Mini Favour Boxes',
    description: 'Beautifully packaged 4pc or 6pc boxes — perfect for place settings or gift bags.',
  },
  {
    title: 'Custom Packaging',
    description: 'Personalised tags, ribbon colours, and custom box designs to match your theme.',
  },
  {
    title: 'Dietary Options',
    description: 'Nut-free, dairy-free, and vegan selections available on request.',
  },
  {
    title: 'Any Event Size',
    description: 'From intimate dinner parties to 300-person weddings — we scale to your needs.',
  },
]

export function FavorsPageContent() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 lg:px-8 text-center bg-cream border-b border-taupe/10">
        <motion.p
          className="font-inter text-xs tracking-[0.4em] text-taupe uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Special Occasions
        </motion.p>
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-cormorant text-6xl md:text-8xl text-deep-cocoa leading-tight"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Favours &<br />
            <span className="text-cocoa-wine">Celebrations</span>
          </motion.h1>
        </div>
        <motion.p
          className="font-inter text-base text-taupe max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Make your wedding, birthday, or event unforgettable. Custom chocolate favour boxes assembled by hand, designed to match your vision.
        </motion.p>
      </section>

      {/* Offerings */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                className="p-8 bg-vanilla border border-taupe/10 hover:border-champagne-gold/30 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-cormorant text-2xl text-deep-cocoa mb-3">{item.title}</h3>
                <p className="font-inter text-sm text-taupe leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info bar */}
      <motion.section
        className="py-12 px-6 lg:px-8 bg-deep-cocoa"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 justify-between text-center md:text-left">
          {[
            { label: 'Minimum Order', value: '20 boxes' },
            { label: 'Lead Time', value: '2+ weeks' },
            { label: 'Box Sizes', value: '4pc · 6pc · 12pc' },
            { label: 'Flavour Options', value: '10+ available' },
          ].map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-inter text-xs tracking-widest text-taupe uppercase mb-1">{label}</p>
              <p className="font-cormorant text-2xl text-champagne-gold">{value}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Inquiry Form */}
      <motion.section
        className="py-24 px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-inter text-xs tracking-[0.4em] text-taupe uppercase mb-4">Get Started</p>
            <h2 className="font-cormorant text-5xl text-deep-cocoa mb-4">Tell Us About Your Event</h2>
            <p className="font-inter text-sm text-taupe leading-relaxed">
              Fill out the form below and we'll get back to you within 24 hours with a quote and available options.
            </p>
          </div>
          <div className="bg-vanilla/40 p-8 border-t border-taupe/15">
            <FavorInquiryForm />
          </div>
        </div>
      </motion.section>

    </div>
  )
}
