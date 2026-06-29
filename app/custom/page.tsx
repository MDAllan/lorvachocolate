import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Custom Orders',
  description: 'Bespoke chocolate experiences for corporate gifting, weddings, brand collaborations, and special events. Fully custom shells, fillings, packaging, and message cards.',
}

const USE_CASES = [
  {
    title: 'Corporate Gifting',
    body: 'Impress clients, reward your team, or leave a lasting impression at your next event. We offer branded packaging and custom message cards.',
    icon: '◇',
  },
  {
    title: 'Weddings & Events',
    body: 'Custom favour boxes, colour-matched bonbons, and personalized packaging for your most important day. Every detail, yours.',
    icon: '◇',
  },
  {
    title: 'Brand Collaborations',
    body: 'Partner with Lorva for pop-ups, influencer gifts, product launches, or limited-edition collections under your brand.',
    icon: '◇',
  },
  {
    title: 'Large Celebrations',
    body: 'Birthdays, graduations, baby showers, anniversaries — if it\'s worth celebrating, it\'s worth Lorva chocolate.',
    icon: '◇',
  },
]

const WHAT_WE_CUSTOMIZE = [
  'Chocolate shell (dark, milk, white, ruby)',
  'Ganache or praline fillings',
  'Box size and configuration',
  'Packaging colour and ribbon',
  'Custom printed message cards',
  'Logo or occasion stamping',
  'Occasion-themed decorations',
  'Flavour selection per piece',
]

const STEPS = [
  { n: '01', title: 'Reach Out', body: 'Tell us about your event, quantity, and vision via the form below or WhatsApp. We respond same-day.' },
  { n: '02', title: 'We Design', body: 'We share a tailored proposal with pricing, options, and a timeline based on your needs.' },
  { n: '03', title: 'We Craft', body: 'Your order is handcrafted fresh from premium Callebaut couverture — made specifically for you.' },
  { n: '04', title: 'You Receive', body: 'Your chocolates arrive beautifully packed and ready to delight. Pickup or delivery available.' },
]

export default function CustomPage() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1XXXXXXXXXX'
  const waMessage = encodeURIComponent("Hi Lorva! I'd like to inquire about a custom order.")

  return (
    <div className="pt-14">

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end pb-16 overflow-hidden bg-deep-cocoa">
        <Image
          src="/gallery/chocolates-daisy-gift-silver-tray.jpg"
          alt="Custom Lorva chocolate gift"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <p className="font-inter text-[10px] tracking-[0.5em] uppercase text-champagne-gold/70 mb-4">
            Bespoke Chocolate
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl text-cream font-light leading-tight max-w-2xl">
            Something truly yours
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream py-20">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-taupe">Custom Orders</p>
          <h2 className="font-cormorant text-4xl md:text-5xl text-deep-cocoa font-light">
            Every detail, designed for you
          </h2>
          <div className="w-10 h-px bg-champagne-gold mx-auto" />
          <p className="font-inter text-sm text-deep-cocoa/70 leading-relaxed max-w-xl mx-auto">
            Whether you&rsquo;re planning a wedding, rewarding a team, or launching a brand collaboration — Lorva can craft a completely bespoke chocolate experience from shell to packaging.
          </p>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-vanilla py-20">
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

      {/* What we customize */}
      <section className="bg-deep-cocoa py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-champagne-gold/70 mb-4">
                  Full Customization
                </p>
                <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light leading-tight">
                  Every element is yours to choose
                </h2>
              </div>
              <div className="w-10 h-px bg-champagne-gold/50" />
              <ul className="grid grid-cols-1 gap-3">
                {WHAT_WE_CUSTOMIZE.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-inter text-sm text-cream/70">
                    <span className="w-1 h-1 rounded-full bg-champagne-gold mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/gallery/chocolates-hearts-favor-boxes.jpg"
                alt="Custom Lorva favour boxes"
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

      {/* Minimum orders & timeline */}
      <section className="bg-vanilla py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 py-8 border border-taupe/15">
              <p className="font-cormorant text-4xl text-cocoa-wine font-light">12pc+</p>
              <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-taupe">Minimum Order</p>
            </div>
            <div className="space-y-2 py-8 border border-taupe/15">
              <p className="font-cormorant text-4xl text-cocoa-wine font-light">5–7 days</p>
              <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-taupe">Lead Time</p>
            </div>
            <div className="space-y-2 py-8 border border-taupe/15">
              <p className="font-cormorant text-4xl text-cocoa-wine font-light">Unlimited</p>
              <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-taupe">Customizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cocoa-wine py-20">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light">
            Let&rsquo;s build something together
          </h2>
          <p className="font-inter text-sm text-cream/70 leading-relaxed">
            Reach out via WhatsApp for the fastest response, or send us a message and we&rsquo;ll follow up within the day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-inter text-[11px] tracking-[0.35em] uppercase transition-all duration-300"
            >
              WhatsApp Us
            </a>
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
