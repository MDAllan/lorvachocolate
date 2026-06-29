import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for ordering from LORVA Fine Chocolate.',
}

const LAST_UPDATED = 'June 2025'

export default function TermsPage() {
  return (
    <div className="pt-14 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="mb-12">
          <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-taupe mb-4">
            Legal
          </p>
          <h1 className="font-cormorant text-5xl text-deep-cocoa font-light mb-3">
            Terms & Conditions
          </h1>
          <p className="font-inter text-sm text-taupe">Last updated: {LAST_UPDATED}</p>
          <div className="w-10 h-px bg-champagne-gold mt-6" />
        </div>

        <div className="font-inter text-sm text-deep-cocoa/75 leading-relaxed space-y-8">

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">1. About Us</h2>
            <p>
              LORVA Fine Chocolate is a small-batch artisan chocolate business. By using our website or placing an order, you agree to these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">2. Orders</h2>
            <p>
              All orders are made to order and confirmed only after we contact you via email or WhatsApp. We reserve the right to refuse or cancel any order for any reason, including ingredient availability or production capacity.
            </p>
            <p>
              Order confirmation does not guarantee final delivery until we have confirmed availability and lead time with you directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">3. Lead Times</h2>
            <p>
              Standard orders require a minimum of 3–5 business days. Custom, wedding, and large orders may require 7–14 days or more. Please account for lead time when planning events. We are not responsible for delays caused by circumstances outside our control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">4. Payment</h2>
            <p>
              Payment is due upon order confirmation unless otherwise agreed in writing. We accept payment via methods communicated to you at the time of order. All prices are quoted in Canadian dollars unless otherwise stated.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">5. Cancellations & Refunds</h2>
            <p>
              Because our chocolates are handcrafted to order with perishable ingredients, we do not accept returns. Cancellations made more than 48 hours before the agreed pickup or delivery date will be refunded in full. Cancellations within 48 hours may be subject to a partial charge to cover ingredient and labour costs.
            </p>
            <p>
              If you receive a damaged or incorrect order, please contact us within 24 hours with a photo and we will make it right.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">6. Allergens</h2>
            <p>
              Our chocolates are produced in a kitchen that handles tree nuts, dairy, soy, and gluten. While we take care to minimize cross-contamination, we cannot guarantee that any product is completely free of allergens. Please inform us of any allergies before ordering.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">7. Storage</h2>
            <p>
              Our chocolates are best stored in a cool, dry place between 16–18°C, away from direct sunlight and strong odours. Refrigeration is not recommended as it can cause bloom. Shelf life is typically 2–4 weeks from the date of production.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">8. Intellectual Property</h2>
            <p>
              All content on this website — including images, copy, branding, and product designs — is owned by LORVA Fine Chocolate. You may not reproduce or use any content without prior written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">9. Contact</h2>
            <p>
              If you have questions about these terms, please{' '}
              <Link href="/contact" className="text-cocoa-wine hover:text-cocoa-wine/80 underline underline-offset-2 transition-colors">
                contact us
              </Link>
              .
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
