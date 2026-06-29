import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How LORVA Fine Chocolate collects, uses, and protects your personal information.',
}

const LAST_UPDATED = 'June 2025'

export default function PrivacyPage() {
  return (
    <div className="pt-14 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="mb-12">
          <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-taupe mb-4">
            Legal
          </p>
          <h1 className="font-cormorant text-5xl text-deep-cocoa font-light mb-3">
            Privacy Policy
          </h1>
          <p className="font-inter text-sm text-taupe">Last updated: {LAST_UPDATED}</p>
          <div className="w-10 h-px bg-champagne-gold mt-6" />
        </div>

        <div className="prose font-inter text-sm text-deep-cocoa/75 leading-relaxed space-y-8">

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">1. Information We Collect</h2>
            <p>When you place an order or contact us through our website, we may collect:</p>
            <ul className="space-y-1.5 list-none pl-4">
              {['Your name and email address', 'Phone number (when provided)', 'Order details and preferences', 'Messages sent through our contact form'].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-champagne-gold mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p>We use cookies to improve your browsing experience on our website. You can decline cookies via the cookie banner.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">2. How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul className="space-y-1.5 list-none pl-4">
              {[
                'Process and fulfill your chocolate orders',
                'Communicate with you about your order',
                'Send newsletters you subscribed to',
                'Respond to inquiries and support requests',
                'Improve our products and services',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-champagne-gold mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">3. Data Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers (email delivery, database hosting) only as necessary to operate our business, and only under strict confidentiality obligations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">4. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law. Order information is typically retained for accounting purposes for 7 years.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="space-y-1.5 list-none pl-4">
              {[
                'Access the personal data we hold about you',
                'Request correction of inaccurate data',
                'Request deletion of your data',
                'Withdraw consent to newsletter emails at any time',
                'Lodge a complaint with a supervisory authority',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-champagne-gold mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">6. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our website uses HTTPS encryption and security headers for all connections.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-cormorant text-2xl text-deep-cocoa font-light">7. Contact</h2>
            <p>
              For any privacy-related questions or to exercise your rights, please{' '}
              <Link href="/contact" className="text-cocoa-wine hover:text-cocoa-wine/80 underline underline-offset-2 transition-colors">
                contact us
              </Link>
              . We aim to respond within 5 business days.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
