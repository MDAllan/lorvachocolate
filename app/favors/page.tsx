import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/data/site-content-db'
import { FavourBuilder } from '@/components/sections/favour-builder'
import { FavourFAQ } from '@/components/sections/favour-faq'
import { BreakableInspirationCarousel } from '@/components/sections/breakable-inspiration-carousel'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return {
    title: content.seo_favors_title ?? 'Wedding & Event Favours',
    description: content.seo_favors_description ?? 'Custom chocolate favour boxes for weddings, birthdays, and events. Choose your occasion, shape, flavour, and colour theme — assembled by hand to order.',
  }
}

const FAVOUR_INSPIRATIONS = [
  { src: '/gallery/chocolates-hearts-favor-boxes.jpg',         alt: 'Chocolate favour boxes',                label: 'Favour Boxes' },
  { src: '/gallery/chocolates-hearts-cupcake-liners.jpg',      alt: 'Heart chocolates in cupcake liners',    label: 'Wedding Favours' },
  { src: '/gallery/chocolates-milk-hearts-cupcake-liners.jpg', alt: 'Milk chocolate hearts in liners',       label: 'Heart Favours' },
  { src: '/gallery/chocolates-daisy-gift-silver-tray.jpg',     alt: 'Chocolates on a silver gift tray',      label: 'Gift Presentation' },
  { src: '/gallery/graduation-chocolates-purple-gold.png',     alt: 'Purple and gold graduation chocolates', label: 'Graduation Event' },
  { src: '/gallery/ruby-roses-box.jpg',                        alt: 'Ruby chocolate roses in a box',         label: 'Luxury Box' },
  { src: '/gallery/chocolates-red-rose-box.jpg',               alt: 'Chocolates in a red rose box',          label: 'Rose Box' },
  { src: '/gallery/chocolates-roses-multicolor.jpg',           alt: 'Multicolour chocolate roses',           label: 'Coloured Selection' },
]

export default function FavorsPage() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Hero */}
      <section className="pt-24 pb-10 px-6 lg:px-8 text-center bg-cream border-b border-taupe/10">
        <p className="font-inter text-xs tracking-[0.4em] text-taupe uppercase mb-3">
          Special Occasions
        </p>
        <h1 className="font-cormorant text-5xl md:text-7xl text-deep-cocoa leading-tight mb-4">
          Favours
          <br />
          <span className="text-cocoa-wine">& Celebrations</span>
        </h1>
        <p className="font-inter text-sm text-taupe max-w-lg mx-auto leading-relaxed mb-4">
          Make your event unforgettable. Custom chocolate favour boxes designed around your vision — assembled by hand to order.
        </p>
        <p className="font-inter text-[10px] text-taupe tracking-[0.4em] uppercase">
          1, 2 or 4 bonbons per box · Shape, flavour & theme · Bulk pricing from 60 boxes
        </p>
      </section>

      {/* Builder */}
      <section className="py-10 pb-16">
        <FavourBuilder />
      </section>

      {/* Inspiration Gallery */}
      <section className="py-20 bg-cream border-t border-taupe/10 overflow-hidden">
        <div className="px-6 lg:px-20 mb-12">
          <p className="font-inter text-[9px] tracking-[0.55em] text-taupe uppercase mb-4">
            Past Creations
          </p>
          <h2 className="font-cormorant text-4xl text-deep-cocoa">
            Inspiration Gallery
          </h2>
        </div>
        <BreakableInspirationCarousel items={FAVOUR_INSPIRATIONS} />
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
          <FavourFAQ />
        </div>
      </section>

    </div>
  )
}
