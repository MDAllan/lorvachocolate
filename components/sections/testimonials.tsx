'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    name: 'Fatima R.',
    occasion: 'Espresso Pairing',
    quote: 'This morning I had two of your wonderful chocolates with my espresso. I love that you can taste the chocolate and the distinct flavours without any overriding sweetness — unlike so many other chocolates out there. These are a true pleasure to savour slowly and they pair beautifully with coffee. I\'ll be keeping a box on my desk from now on. Absolutely JAK.',
    stars: 5,
  },
  {
    name: 'Imane B.',
    occasion: 'Graduation Surprise Gift',
    quote: 'We loved the chocolate you made for my sister\'s graduation. It was the perfect way to hide a surprise piece of jewellery inside — she enjoyed both the gift and the whole experience of breaking open the heart. She was completely surprised and so delighted. Thanks again, we will definitely be ordering again for every occasion.',
    stars: 5,
  },
  {
    name: 'Hannah O.',
    occasion: 'Custom Chocolate Box',
    quote: 'I just wanted to say thank you for the beautiful chocolate box I ordered. It was packaged so nicely and everything looked very thoughtful and elegant. Not to mention the chocolates tasted amazing — I could really tell how much care was put into every single detail. It made for a truly wonderful experience and I\'m so happy I ordered. I\'ll definitely be recommending Lorva to everyone.',
    stars: 5,
  },
  {
    name: 'Arion B.',
    occasion: 'Pregnancy Announcement',
    quote: 'This was the most magical way to announce my pregnancy to my husband. He was already moved just by the gift itself, and then after breaking open the heart he found the real surprise inside. Thank you so much for making that moment so incredibly special. I honestly cannot express how grateful we are. We will treasure that memory forever — thank you from the bottom of my heart.',
    stars: 5,
  },
  {
    name: 'Yasmine T.',
    occasion: 'Valentine\'s Day Gift',
    quote: 'I ordered a bonbon box for Valentine\'s Day and I genuinely could not have made a better choice. The presentation alone left my partner completely speechless — the packaging is so luxurious you almost don\'t want to open it. Almost. Once we did, the flavours were extraordinary. The hazelnut crunch noir was our absolute favourite. Lorva has completely changed how we think about chocolate gifting.',
    stars: 5,
  },
  {
    name: 'Nour A.',
    occasion: 'Eid Gift Set',
    quote: 'I ordered Lorva chocolates as Eid gifts for my family and received nothing but praise from every single person. Each box looked so premium and carefully presented. My mother, who is very particular about sweets and very hard to impress, said they were the finest chocolates she had ever tasted. That truly says everything. This is now my go-to gift for every special occasion.',
    stars: 5,
  },
  {
    name: 'Sofia D.',
    occasion: 'Baby Shower Favours',
    quote: 'We used Lorva chocolates as favours for our baby shower and our guests were absolutely delighted. So many people asked where they were from and several have since placed their own orders. The quality is outstanding — you can tell immediately that each piece is made with exceptional care and the finest ingredients. Such a luxurious touch that made our celebration feel truly elevated.',
    stars: 5,
  },
  {
    name: 'Lena M.',
    occasion: 'Birthday Surprise',
    quote: 'I surprised my best friend with a Lorva box for her birthday and the reaction was everything I hoped for. From the moment she saw the packaging she was in complete awe. And when she tasted the chocolates, she said they were unlike anything she\'d ever had before. The espresso noir was her absolute favourite. Thank you for making gifting feel genuinely special and memorable again.',
    stars: 5,
  },
  {
    name: 'Rania S.',
    occasion: 'Mother\'s Day Gift',
    quote: 'I wanted to do something truly special for my mother on Mother\'s Day and Lorva delivered beyond every expectation. The box arrived beautifully wrapped and each chocolate inside looked like a little work of art. My mother kept saying she didn\'t want to eat them because they were too beautiful to open. But once she did, she couldn\'t stop. She\'s already told me this is the only chocolate gift she ever wants going forward.',
    stars: 5,
  },
  {
    name: 'Maya K.',
    occasion: 'Corporate Client Gifts',
    quote: 'Our team ordered Lorva boxes as thank-you gifts for our most valued clients and the feedback we received was unlike anything we\'ve experienced before. Multiple clients reached out specifically to compliment the chocolates — that has simply never happened with any gift we\'ve given. The quality and craftsmanship speak for themselves. We will be ordering for every client appreciation event going forward.',
    stars: 5,
  },
]

const PAIRS = Array.from({ length: Math.ceil(TESTIMONIALS.length / 2) }, (_, i) =>
  TESTIMONIALS.slice(i * 2, i * 2 + 2)
)

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 text-champagne-gold" aria-hidden="true">
          <path d="M6 0l1.545 3.09L11 3.635l-2.5 2.455.59 3.455L6 7.77l-3.09 1.775.59-3.455L1 3.635l3.455-.545z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const isPaused = useRef(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setDirection(1)
        setPage(p => (p + 1) % PAIRS.length)
      }
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  const goTo = (index: number) => {
    setDirection(index >= page ? 1 : -1)
    setPage(index)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    isPaused.current = true
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        setDirection(1)
        setPage(p => (p + 1) % PAIRS.length)
      } else {
        setDirection(-1)
        setPage(p => (p - 1 + PAIRS.length) % PAIRS.length)
      }
    }
    touchStartX.current = null
    isPaused.current = false
  }

  return (
    <section ref={ref} className="bg-deep-cocoa py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-[10px] tracking-[0.45em] uppercase text-champagne-gold/70 mb-4">
            What People Are Saying
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream font-light">
            Loved by Chocolate Lovers
          </h2>
          <div className="w-10 h-px bg-champagne-gold/50 mx-auto mt-6" />
        </motion.div>

        {/* Carousel */}
        <div
          onMouseEnter={() => { isPaused.current = true }}
          onMouseLeave={() => { isPaused.current = false }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {PAIRS[page].map((t) => (
                  <div
                    key={t.name}
                    className="bg-cream/5 border border-cream/8 p-8 flex flex-col gap-5"
                  >
                    <Stars count={t.stars} />
                    <p className="font-inter text-sm text-cream/80 leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="pt-2 border-t border-cream/10">
                      <p className="font-cormorant text-cream text-lg">{t.name}</p>
                      <p className="font-inter text-[11px] text-cream/40 tracking-wide mt-0.5">{t.occasion}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot / line indicators */}
          <div className="flex justify-center items-center gap-2 mt-10">
            {PAIRS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-px transition-all duration-300 ${
                  i === page ? 'w-8 bg-champagne-gold' : 'w-4 bg-cream/20 hover:bg-cream/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
