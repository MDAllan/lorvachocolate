import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind LORVA Fine Chocolate — handcrafted artisan bonbons, breakable hearts, and wedding favours made with premium Callebaut couverture chocolate.',
}

const PILLARS = [
  {
    title: 'Premium Ingredients',
    body: 'We source only Callebaut couverture chocolate — the gold standard of Belgian chocolate used by the world\'s finest pastry chefs. Every shell, every filling, every detail starts with the best.',
  },
  {
    title: 'Handcrafted Always',
    body: 'Every bonbon is made by hand in small batches. No machines, no shortcuts. Each piece is tempered, filled, and finished individually — which is why each one tastes alive.',
  },
  {
    title: 'Made to Order',
    body: 'We don\'t keep stock. Your chocolate is made fresh when you order it, so you always receive something at its absolute peak. This is what made-to-order truly means.',
  },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Temper', body: 'Couverture chocolate is melted and tempered to perfect crystalline structure — giving our shells their characteristic snap and gloss.' },
  { step: '02', title: 'Fill', body: 'Handcrafted ganaches, caramels, and pralines are piped into each shell. No two batches are exactly alike.' },
  { step: '03', title: 'Seal', body: 'Each bonbon is sealed, hand-decorated, and inspected individually before being packed.' },
  { step: '04', title: 'Deliver', body: 'Your order is packed with care and delivered fresh. Made for the moment you open the box.' },
]

export default function AboutPage() {
  return (
    <div className="pt-14">

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[440px] flex items-end pb-16 overflow-hidden bg-deep-cocoa">
        <Image
          src="/gallery/chocolates-assorted-tray.jpg"
          alt="Lorva artisan chocolates"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <p className="font-inter text-[10px] tracking-[0.5em] uppercase text-champagne-gold/70 mb-4">
            Our Story
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl text-cream font-light leading-tight max-w-2xl">
            Made with intention.<br />Crafted with love.
          </h1>
        </div>
      </section>

      {/* Founder story */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/gallery/process-chocolate-spread.jpg"
                alt="Chocolate making process"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-8">
              <div>
                <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-taupe mb-4">
                  The Beginning
                </p>
                <h2 className="font-cormorant text-4xl md:text-5xl text-deep-cocoa font-light leading-tight">
                  Born from a love of real chocolate
                </h2>
              </div>
              <div className="w-10 h-px bg-champagne-gold" />
              <div className="space-y-5 font-inter text-sm text-deep-cocoa/75 leading-relaxed">
                <p>
                  LORVA started from a simple frustration: beautiful chocolates that tasted ordinary. We believed that if something was going to look this exquisite, it should taste just as extraordinary.
                </p>
                <p>
                  Every recipe was developed by hand, tested obsessively, and refined until it felt exactly right. Not just good — right. The kind of chocolate you close your eyes for.
                </p>
                <p>
                  Today, LORVA is known for bonbons with real depth, breakable hearts that create real moments, and wedding favours that guests actually remember. Every piece is still made by hand, in small batches, with the same attention to detail as the very first one.
                </p>
              </div>
              <blockquote className="border-l-2 border-champagne-gold pl-5 font-cormorant text-xl text-cocoa-wine italic">
                &ldquo;Chocolate this good should be effortless to enjoy — and impossible to forget.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Brand pillars */}
      <section className="bg-deep-cocoa py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-champagne-gold/70 mb-4">
              What We Stand For
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light">
              The Lorva Standard
            </h2>
            <div className="w-10 h-px bg-champagne-gold/50 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {PILLARS.map((p) => (
              <div key={p.title} className="space-y-5 border-t border-cream/10 pt-8">
                <h3 className="font-cormorant text-2xl text-champagne-gold font-light">{p.title}</h3>
                <p className="font-inter text-sm text-cream/65 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing / Callebaut */}
      <section className="bg-vanilla py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-taupe mb-4">
                  Our Ingredients
                </p>
                <h2 className="font-cormorant text-4xl md:text-5xl text-deep-cocoa font-light leading-tight">
                  We only use Callebaut couverture
                </h2>
              </div>
              <div className="w-10 h-px bg-champagne-gold" />
              <p className="font-inter text-sm text-deep-cocoa/70 leading-relaxed">
                Callebaut is a Belgian couverture chocolate trusted by the world&rsquo;s best chocolatiers and pastry chefs. Higher cocoa butter content means better snap, smoother melt, and richer flavour — the difference you taste immediately.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { src: '/gallery/ingredient-callebaut-823-milk.jpg', label: 'Milk' },
                  { src: '/gallery/ingredient-callebaut-ruby.jpg', label: 'Ruby' },
                  { src: '/gallery/ingredient-callebaut-velvet-white.jpg', label: 'White' },
                ].map((img) => (
                  <div key={img.label} className="space-y-2">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={img.src}
                        alt={`Callebaut ${img.label} chocolate`}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    </div>
                    <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-taupe text-center">{img.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/gallery/process-caramel-filling.jpg"
                alt="Handcrafted caramel filling process"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-taupe mb-4">
              How It&rsquo;s Made
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-deep-cocoa font-light">
              The Process
            </h2>
            <div className="w-10 h-px bg-champagne-gold mx-auto mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((s) => (
              <div key={s.step} className="space-y-4 border-l-2 border-champagne-gold/30 pl-6">
                <p className="font-cormorant text-4xl text-champagne-gold/50 font-light">{s.step}</p>
                <h3 className="font-cormorant text-xl text-deep-cocoa">{s.title}</h3>
                <p className="font-inter text-sm text-deep-cocoa/60 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cocoa-wine py-20">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light">
            Ready to taste the difference?
          </h2>
          <p className="font-inter text-sm text-cream/70 leading-relaxed">
            Every box is made fresh, to order. Browse our collections or reach out to build something completely custom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/products"
              className="px-8 py-3.5 bg-champagne-gold hover:bg-champagne-gold/90 text-deep-cocoa font-inter text-[11px] tracking-[0.35em] uppercase transition-all duration-300"
            >
              Shop Bonbons
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-cream/40 hover:border-cream text-cream font-inter text-[11px] tracking-[0.35em] uppercase transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
