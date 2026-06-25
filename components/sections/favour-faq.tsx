'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'How far in advance should I order?',
    a: 'We recommend placing your order at least 2 weeks before your event. For larger orders of 200+ boxes, please reach out 4–6 weeks in advance to ensure we can accommodate your request and give every box the care it deserves.',
  },
  {
    q: 'What is included in the price?',
    a: 'The price covers the handcrafted bonbons and standard favour box packaging. Custom printed tags, ribbon, or specialty packaging are available as add-ons — just mention it in the notes and we will include that in your quote.',
  },
  {
    q: 'Can I mix flavours across different boxes?',
    a: 'Each favour box follows the configuration you build — the same shape and flavour for each bonbon slot, replicated across all your boxes. If you would like different box configurations, please reach out and we will do our best to accommodate.',
  },
  {
    q: 'How are bulk discounts applied?',
    a: 'Discounts are based on your total bonbon count (number of boxes × bonbons per box). Orders of 60–240 bonbons receive 10% off the per-bonbon price. Orders above 240 bonbons receive 15% off. The builder calculates this for you in real time.',
  },
  {
    q: 'Do you accommodate dietary restrictions?',
    a: 'Please mention any allergies or dietary needs in the notes field. All our chocolates are made in a shared kitchen that handles nuts, dairy, and gluten. We will confirm exactly what is possible before you commit to your order.',
  },
  {
    q: 'How does the colour and theme work?',
    a: 'Rather than limiting you to a colour picker, we ask you to describe your palette and event vision — and you can upload an inspiration photo for reference. We will match the look as closely as possible and confirm our interpretation before production begins.',
  },
  {
    q: 'How does pickup work?',
    a: 'After submitting your order we will be in touch within 24 hours to confirm details and arrange a pickup time. A non-refundable deposit is required to secure your order, with the balance settled at pickup.',
  },
]

export function FavourFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-taupe/10">
      {FAQS.map(({ q, a }, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className={cn(
              'font-cormorant text-lg transition-colors duration-200',
              open === i ? 'text-cocoa-wine' : 'text-deep-cocoa group-hover:text-cocoa-wine',
            )}>
              {q}
            </span>
            <span className={cn(
              'ml-6 flex-shrink-0 font-inter text-lg text-taupe/50 transition-transform duration-300',
              open === i ? 'rotate-45' : 'rotate-0',
            )}>
              +
            </span>
          </button>
          <div className={cn(
            'overflow-hidden transition-all duration-300',
            open === i ? 'max-h-64 pb-5' : 'max-h-0',
          )}>
            <p className="font-inter text-sm text-taupe leading-relaxed">{a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
