'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'How far in advance should I order?',
    a: 'We ask for at least 7 days notice to make sure your order gets the care it deserves. This gives us time to source your fillings, prepare your surprise, and seal everything perfectly. For larger quantities (5+) or anything that involves a special item being enclosed — like a ring or a gift card — please reach out even earlier so we can plan together.',
  },
  {
    q: 'How does pickup work?',
    a: "We'll confirm a pickup time by email or phone after you submit your order. To secure your order, a non-refundable deposit is required — we'll share the details when we confirm. The remaining balance is settled at pickup.",
  },
  {
    q: 'Can I mix fillings?',
    a: "Fillings are completely optional — the real magic is whatever surprise you seal inside. But if you want to make it even more fun, you can choose one filling or mix up to 3 different ones. We'll layer them throughout the heart or ball so every crack reveals something delicious.",
  },
  {
    q: 'How much does it cost?',
    a: "Pricing depends on the shell type, shape, and fillings. The surprise itself — whether it's a ring, cash, or a gift card — is not included in our cost, that's yours to bring. We'll send you a full quote when we confirm your order, so there are no surprises on our end.",
  },
  {
    q: 'Do you accommodate allergies?',
    a: "Please mention any allergies in the Notes field when ordering. We'll do our best to accommodate and will confirm exactly what's possible before you commit.",
  },
  {
    q: "Can I add something inside that isn't food?",
    a: "That's the magic of a breakable chocolate. Bring us small gifts — a ring, a voucher, a folded note, keepsakes — and we'll seal them safely inside the shell.",
  },
]

export function BreakableFAQ() {
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
            open === i ? 'max-h-52 pb-5' : 'max-h-0',
          )}>
            <p className="font-inter text-sm text-taupe leading-relaxed">{a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
