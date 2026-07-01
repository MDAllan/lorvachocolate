import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteContent } from '@/lib/data/site-content-db'
import { FavourBuilder } from '@/components/sections/favour-builder'
import { FavourFAQ } from '@/components/sections/favour-faq'
import { BreakableInspirationCarousel } from '@/components/sections/breakable-inspiration-carousel'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return {
    title: content.seo_favors_title ?? 'Wedding & Event Favours · Custom Orders',
    description: content.seo_favors_description ?? 'Custom chocolate favour boxes for weddings, birthdays, corporate gifting, and events. Choose your occasion, shape, flavour, and colour theme — assembled by hand to order.',
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

const USE_CASES = [
  {
    title: 'Weddings & Events',
    body: 'Custom favour boxes, colour-matched bonbons, and personalized packaging for your most important day. Every detail, yours.',
  },
  {
    title: 'Corporate Gifting',
    body: 'Impress clients, reward your team, or leave a lasting impression at your next event. Branded packaging and custom message cards available.',
  },
  {
    title: 'Large Celebrations',
    body: 'Birthdays, graduations, baby showers, anniversaries — if it\'s worth celebrating, it\'s worth Lorva chocolate.',
  },
  {
    title: 'Brand Collaborations',
    body: 'Partner with Lorva for pop-ups, influencer gifts, product launches, or limited-edition collections under your brand.',
  },
]

const STEPS = [
  { n: '01', title: 'Reach Out',  body: 'Tell us about your event, quantity, and vision via the form below. We respond same-day.' },
  { n: '02', title: 'We Design',  body: 'We share a tailored proposal with pricing, options, and a timeline based on your needs.' },
  { n: '03', title: 'We Craft',   body: 'Your order is handcrafted fresh from premium Callebaut couverture — made specifically for you.' },
  { n: '04', title: 'You Receive', body: 'Your chocolates arrive beautifully packed and ready to delight. Pickup or delivery available.' },
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
          <span className="text-cocoa-wine">&amp; Custom Orders</span>
        </h1>
        <p className="font-inter text-sm text-taupe max-w-lg mx-auto leading-relaxed mb-4">
          From intimate weddings to corporate launches — custom chocolate experiences designed around your vision, assembled by hand to order.
        </p>
        <p className="font-inter text-[10px] text-taupe tracking-[0.4em] uppercase">
          1, 2 or 4 bonbons per box · Shape, flavour &amp; theme · From 12 boxes · 5–7 day lead time
        </p>
      </section>

      {/* Who it's for */}
      <section className="py-20 bg-vanilla">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {USE_CASES.map((u) => (
              <div key={u.title} className="space-y-4 border-t-2 border-champagne-gold/30 pt-8">
                <h3 className="font-cormorant text-2xl text-deep-cocoa font-light">{u.title}</h3>
                <p className="font-inter text-sm text-deep-cocoa/65 leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="py-10 pb-16">
        <FavourBuilder />
      </section>

      {/* Process */}
      <section className="bg-cream py-24 border-t border-taupe/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-taupe mb-4">How It Works</p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-deep-cocoa font-light">From idea to your door</h2>
            <div className="w-10 h-px bg-champagne-gold mx-auto mt-6" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="space-y-4 border-l-2 border-champagne-gold/30 pl-6">
                <p className="font-cormorant text-4xl text-champagne-gold/50 font-light">{s.n}</p>
                <h3 className="font-cormorant text-xl text-deep-cocoa">{s.title}</h3>
                <p className="font-inter text-sm text-deep-cocoa/60 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
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

      {/* CTA */}
      <section className="bg-cocoa-wine py-20">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light">
            Let&rsquo;s build something together
          </h2>
          <p className="font-inter text-sm text-cream/70 leading-relaxed">
            Send us a message and we&rsquo;ll follow up within the day.
          </p>
          <div className="flex justify-center pt-2">
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-cream/40 hover:border-cream text-cream font-inter text-[11px] tracking-[0.35em] uppercase transition-all duration-300"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
