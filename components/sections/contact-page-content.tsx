'use client'

import { motion } from 'framer-motion'
import { ContactForm } from '@/components/forms/contact-form'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
const WA_MESSAGE = encodeURIComponent("Hi Lorva! I'd love to place an order.")

export function ContactPageContent() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Hero */}
      <section className="pt-36 pb-16 px-6 lg:px-8 text-center bg-cream border-b border-taupe/10">
        <motion.p
          className="font-inter text-xs tracking-[0.4em] text-taupe uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Get in Touch
        </motion.p>
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-cormorant text-6xl md:text-7xl text-deep-cocoa"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s Talk<br />
            <span className="text-cocoa-wine">Chocolate.</span>
          </motion.h1>
        </div>
        <motion.p
          className="font-inter text-base text-taupe max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Whether you&apos;re ready to order, planning an event, or just curious — we&apos;d love to hear from you.
        </motion.p>
      </section>

      {/* WhatsApp primary CTA */}
      <motion.section
        className="py-12 px-6 lg:px-8 bg-deep-cocoa"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-inter text-xs tracking-[0.4em] text-taupe uppercase mb-5">
            Fastest Response
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream mb-6">
            Message us on WhatsApp
          </h2>
          <p className="font-inter text-sm text-taupe mb-8 leading-relaxed">
            For orders and quick questions, WhatsApp is the fastest way to reach us. We typically reply within a few hours.
          </p>
          {WHATSAPP_NUMBER && (
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#25D366] text-white font-inter text-[11px] tracking-[0.4em] uppercase transition-all duration-500 hover:opacity-80"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          )}
        </div>
      </motion.section>

      {/* Info + Form */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Info */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h2 className="font-cormorant text-4xl text-deep-cocoa mb-6">Quick Info</h2>
              <div className="space-y-5">
                {[
                  { label: 'Hours', value: 'Mon – Fri · 10am – 6pm\nSat · 10am – 4pm' },
                  { label: 'Pickup', value: 'Available by appointment' },
                  { label: 'Ordering', value: 'No payment required online.\nWe follow up to confirm your order.' },
                  { label: 'Lead Time', value: 'Standard: 2–3 days\nFavours / events: 2+ weeks' },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-taupe/15 pb-5">
                    <p className="font-inter text-xs tracking-widest text-taupe uppercase mb-1">{label}</p>
                    <p className="font-inter text-sm text-deep-cocoa leading-relaxed whitespace-pre-line">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-taupe/20">
              <p className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase mb-3">
                Business Collaboration
              </p>
              <p className="font-cormorant text-3xl text-deep-cocoa mb-3">Interested in working together?</p>
              <p className="font-inter text-sm text-taupe leading-relaxed mb-5">
                Interested in carrying Lorva at your café, boutique, or event? Let&apos;s talk wholesale.
              </p>
              {WHATSAPP_NUMBER && (
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Lorva! I'm interested in a business collaboration.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-inter text-xs text-cocoa-wine tracking-[0.3em] uppercase hover:text-deep-cocoa transition-colors"
                >
                  Reach out via WhatsApp →
                </a>
              )}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-cormorant text-4xl text-deep-cocoa mb-6">Send a Message</h2>
            <div className="bg-vanilla/40 p-8 border-t border-taupe/15">
              <ContactForm />
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  )
}
