import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/data/site-content-db'
import { BreakableBuilder } from '@/components/sections/breakable-builder'
import { BreakableFAQ } from '@/components/sections/breakable-faq'
import { BreakableInspirationCarousel } from '@/components/sections/breakable-inspiration-carousel'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return {
    title: content.seo_breakable_title ?? 'Breakable Hearts & Balls',
    description: content.seo_breakable_description ?? 'Design your own breakable chocolate heart or ball. Choose your shell, fillings, and what goes inside — a theatrical chocolate gift experience.',
  }
}

const inspirations = [
  { src: '/gallery/breakable-heart-class-of-2026.png',       alt: 'Class of 2026 navy blue breakable heart',        label: 'Graduation' },
  { src: '/gallery/breakable-heart-gender-reveal-white.jpg', alt: 'Girl or Boy gender reveal breakable heart',       label: 'Gender Reveal' },
  { src: '/gallery/breakable-heart-white-gold-leaf.jpg',     alt: 'White chocolate breakable heart with gold leaf',  label: 'Luxury Gift' },
  { src: '/gallery/breakable-heart-milk-love-you.jpg',       alt: 'I Love You milk chocolate breakable heart',       label: "Valentine's" },
  { src: '/gallery/smash-box-pink.jpg',                      alt: 'Pink chocolate smash box with shards',            label: 'Smash Box' },
]

export default function BreakablePage() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Hero */}
      <section className="pt-24 pb-10 px-6 lg:px-8 text-center bg-cream border-b border-taupe/10">
        <p className="font-inter text-xs tracking-[0.4em] text-taupe uppercase mb-3">
          Customise Yours
        </p>
        <h1 className="font-cormorant text-5xl md:text-7xl text-deep-cocoa leading-tight mb-4">
          Breakable
          <br />
          <span className="text-cocoa-wine">Hearts & Balls</span>
        </h1>
        <p className="font-inter text-sm text-taupe max-w-lg mx-auto leading-relaxed mb-4">
          A chocolate shell concealing a surprise inside. Choose your shell, pick your fillings, add a hidden gift or message. Shatter it to reveal.
        </p>
        <p className="font-inter text-[10px] text-taupe tracking-[0.4em] uppercase">
          Drop off items · Describe contents · Add a message card
        </p>
      </section>

      {/* Builder */}
      <section className="py-10 pb-16">
        <BreakableBuilder />
      </section>

      {/* Inspiration Carousel */}
      <section className="py-20 bg-cream border-t border-taupe/10 overflow-hidden">
        <div className="px-6 lg:px-20 mb-12">
          <p className="font-inter text-[9px] tracking-[0.55em] text-taupe uppercase mb-4">
            Past Creations
          </p>
          <h2 className="font-cormorant text-4xl text-deep-cocoa">
            Inspiration Gallery
          </h2>
        </div>
        <BreakableInspirationCarousel items={inspirations} />
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-8 border-t border-taupe/10 bg-cream">
        <div className="max-w-3xl mx-auto">
          <p className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase text-center mb-3">
            Common Questions
          </p>
          <h2 className="font-cormorant text-4xl text-deep-cocoa text-center mb-12">
            Before You Order
          </h2>
          <BreakableFAQ />
        </div>
      </section>

    </div>
  )
}
