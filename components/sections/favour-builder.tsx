'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { favourOrderSchema, type FavourOrderValues } from '@/lib/validations/favour-order'
import { BONBON_COLLECTIONS } from '@/lib/data/catalog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

// ─── Pricing ──────────────────────────────────────────────────────────────────

const TIER_PRICE: Record<string, number> = { classic: 2.50, special: 2.75, premium: 3.00 }

function getFlavorPrice(slug: string): number {
  for (const col of BONBON_COLLECTIONS) {
    if (col.flavors.some(f => f.slug === slug)) return TIER_PRICE[col.tier] ?? 2.50
  }
  return 2.50
}

function getFlavorName(slug: string): string {
  for (const col of BONBON_COLLECTIONS) {
    const f = col.flavors.find(x => x.slug === slug)
    if (f) return f.name
  }
  return ''
}

function calculateOrder(numberOfBoxes: number, bonbonsPerBox: number, bonbons: Array<{ shape?: string; flavorSlug?: string }>) {
  const totalBonbons = numberOfBoxes * bonbonsPerBox
  const pricePerBox = bonbons.reduce((sum, b) => sum + (b.flavorSlug ? getFlavorPrice(b.flavorSlug) : 0), 0)
  const totalBeforeDiscount = pricePerBox * numberOfBoxes

  let discountRate = 0
  let discountLabel = 'Regular pricing'
  let discountColor = 'text-taupe'
  if (totalBonbons >= 240) {
    discountRate = 0.15
    discountLabel = '15% bulk discount'
    discountColor = 'text-champagne-gold'
  } else if (totalBonbons >= 60) {
    discountRate = 0.10
    discountLabel = '10% bulk discount'
    discountColor = 'text-champagne-gold'
  }

  const totalPrice = totalBeforeDiscount * (1 - discountRate)
  return { totalBonbons, totalBeforeDiscount, discountRate, discountLabel, discountColor, totalPrice, pricePerBox }
}

// ─── Occasions ────────────────────────────────────────────────────────────────

const OCCASIONS = [
  {
    id: 'wedding',
    label: 'Wedding',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mx-auto">
        <circle cx="22" cy="26" r="10" />
        <path d="M17 16l3-5h4l3 5" />
        <circle cx="22" cy="26" r="3" />
      </svg>
    ),
  },
  {
    id: 'bridal-shower',
    label: 'Bridal Shower',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mx-auto">
        <path d="M22 10C22 10,14 16,14 24C14 28,17.5 31,22 31C26.5 31,30 28,30 24C30 16,22 10,22 10Z" />
        <path d="M22 31v5" />
        <path d="M17 36h10" />
        <path d="M15 14C12 14,10 17,10 20" />
        <path d="M29 14C32 14,34 17,34 20" />
      </svg>
    ),
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mx-auto">
        <path d="M22 34C22 34,8 25,8 16C8 11,11.5 8,15 8C17.5 8,20 10,22 13C24 10,26.5 8,29 8C32.5 8,36 11,36 16C36 25,22 34,22 34Z" />
      </svg>
    ),
  },
  {
    id: 'baby-shower',
    label: 'Baby Shower',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mx-auto">
        <circle cx="22" cy="12" r="4" />
        <path d="M22 18C16 18,13 23,13 28C13 34,17 36,22 36C27 36,31 34,31 28C31 23,28 18,22 18Z" />
        <path d="M19 27C19.5 29,20.5 30,22 30C23.5 30,24.5 29,25 27" />
      </svg>
    ),
  },
  {
    id: 'corporate',
    label: 'Corporate',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mx-auto">
        <rect x="7" y="16" width="30" height="20" rx="1" />
        <path d="M16 16v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" />
        <path d="M7 26h30" />
      </svg>
    ),
  },
  {
    id: 'graduation',
    label: 'Graduation',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mx-auto">
        <path d="M8 20l14-8 14 8-14 8Z" />
        <path d="M36 20v10" />
        <path d="M14 24v8c0 0,3 4,8 4s8-4,8-4v-8" />
      </svg>
    ),
  },
  {
    id: 'engagement',
    label: 'Engagement',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mx-auto">
        <path d="M16 14h12l3 6H13Z" />
        <circle cx="22" cy="28" r="8" />
        <path d="M18 28c0-2.2,1.8-4,4-4s4,1.8,4,4" />
        <circle cx="22" cy="28" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'other',
    label: 'Other',
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="#C9A961" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mx-auto">
        <path d="M22 8l2.5 7h7.5l-6 4.5 2.5 7L22 22.5 15.5 26.5 18 19.5 12 15h7.5Z" />
      </svg>
    ),
  },
]

// ─── Shapes ───────────────────────────────────────────────────────────────────

const SHAPES = [
  {
    id: 'heart' as const,
    label: 'Heart',
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7 mx-auto" fill="currentColor">
        <path d="M16 26C16 26,4 18,4 11C4 7,7 5,10 5C12.2 5,14 7,16 9.5C18 7,19.8 5,22 5C25 5,28 7,28 11C28 18,16 26,16 26Z" />
      </svg>
    ),
  },
  {
    id: 'round' as const,
    label: 'Round',
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7 mx-auto" fill="currentColor">
        <circle cx="16" cy="16" r="12" />
      </svg>
    ),
  },
  {
    id: 'square' as const,
    label: 'Square',
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7 mx-auto" fill="currentColor">
        <rect x="4" y="4" width="24" height="24" rx="2" />
      </svg>
    ),
  },
  {
    id: 'dome' as const,
    label: 'Dome',
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7 mx-auto" fill="currentColor">
        <path d="M4 22C4 22,4 8,16 8C28 8,28 22,28 22Z" />
        <line x1="4" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
]

const STEPS = ['Occasion', 'Order Size', 'Customise Bonbons', 'Colour Theme', 'Your Details']

// ─── Left panel: live order summary ───────────────────────────────────────────

function OrderSummaryPanel({
  values,
}: {
  values: Partial<FavourOrderValues>
}) {
  const bonbonsPerBoxNum = parseInt(values.bonbonsPerBox ?? '1')
  const numberOfBoxes = values.numberOfBoxes ?? 0
  const bonbons = values.bonbons ?? []
  const { totalBonbons, discountLabel, discountColor, totalPrice, pricePerBox } = calculateOrder(numberOfBoxes, bonbonsPerBoxNum, bonbons)
  const occasionLabel = OCCASIONS.find(o => o.id === values.occasion)?.label

  const allSlotsFilled = bonbons.length > 0 && bonbons.every(b => b.shape && b.flavorSlug)
  const hasSize = numberOfBoxes >= 1

  return (
    <div className="bg-gradient-to-b from-[#F5E0C0]/60 to-[#F6EFE9]/80 border border-taupe/10 shadow-inner p-6 space-y-5">

      {/* Occasion badge */}
      <div>
        <p className="font-inter text-[9px] tracking-[0.4em] text-taupe uppercase mb-1">Occasion</p>
        <p className="font-cormorant text-2xl text-deep-cocoa">
          {occasionLabel ?? <span className="text-taupe/40 italic">Not selected yet</span>}
        </p>
      </div>

      {/* Box summary */}
      <div className="border-t border-taupe/10 pt-4">
        <p className="font-inter text-[9px] tracking-[0.4em] text-taupe uppercase mb-2">Order</p>
        {hasSize ? (
          <div className="space-y-1">
            <p className="font-cormorant text-xl text-deep-cocoa">
              {numberOfBoxes} box{numberOfBoxes !== 1 ? 'es' : ''} · {bonbonsPerBoxNum} bonbon{bonbonsPerBoxNum !== 1 ? 's' : ''} each
            </p>
            <p className="font-inter text-xs text-taupe">{totalBonbons} bonbons total</p>
          </div>
        ) : (
          <p className="font-inter text-xs text-taupe/40 italic">Set your quantity in step 2</p>
        )}
      </div>

      {/* Bonbon slots */}
      {allSlotsFilled && (
        <div className="border-t border-taupe/10 pt-4 space-y-2">
          <p className="font-inter text-[9px] tracking-[0.4em] text-taupe uppercase mb-2">Per Box</p>
          {bonbons.map((b, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-inter text-[10px] text-taupe/60 w-4">{i + 1}</span>
                <div>
                  <p className="font-inter text-xs text-deep-cocoa capitalize">{b.shape} · {getFlavorName(b.flavorSlug ?? '')}</p>
                </div>
              </div>
              <p className="font-inter text-xs text-taupe shrink-0">${getFlavorPrice(b.flavorSlug ?? '').toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t border-taupe/10 pt-2 flex justify-between">
            <p className="font-inter text-[10px] text-taupe">Per box</p>
            <p className="font-inter text-xs text-deep-cocoa">${pricePerBox.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Discount + total */}
      {hasSize && allSlotsFilled && (
        <div className="border-t border-taupe/10 pt-4 space-y-2">
          <div className="flex justify-between items-center">
            <p className={cn('font-inter text-[10px] tracking-wide', discountColor)}>{discountLabel}</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={totalPrice}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-0.5"
            >
              <p className="font-inter text-[9px] tracking-[0.3em] text-taupe uppercase">Estimated Total</p>
              <p className="font-cormorant text-4xl text-deep-cocoa">${totalPrice.toFixed(2)}</p>
              <p className="font-inter text-[9px] text-taupe/60">Exact quote confirmed by email</p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {!hasSize && (
        <div className="border-t border-taupe/10 pt-4">
          <p className="font-inter text-[9px] tracking-[0.3em] text-taupe uppercase mb-1">Price from</p>
          <p className="font-cormorant text-3xl text-deep-cocoa">$2.50<span className="font-inter text-sm text-taupe ml-1">/ bonbon</span></p>
          <p className="font-inter text-[9px] text-taupe/60 mt-1">Bulk discounts from 60 bonbons</p>
        </div>
      )}
    </div>
  )
}

// ─── Main builder ─────────────────────────────────────────────────────────────

export function FavourBuilder() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<FavourOrderValues>({
    resolver: zodResolver(favourOrderSchema),
    defaultValues: {
      occasion: '',
      occasionOther: '',
      numberOfBoxes: 20, // minimum order
      bonbonsPerBox: '1',
      bonbons: [{ shape: 'heart', flavorSlug: '' }],
      colorTheme: '',
      inspirationImageBase64: '',
      dietary: '',
      notes: '',
      name: '',
      email: '',
      phone: '',
      eventDate: '',
    },
  })

  const values = form.watch()
  const bonbonsPerBoxNum = parseInt(values.bonbonsPerBox ?? '1')
  const { totalBonbons, discountLabel, discountRate, totalPrice, pricePerBox } = calculateOrder(
    values.numberOfBoxes ?? 0,
    bonbonsPerBoxNum,
    values.bonbons ?? [],
  )

  function handleBonbonsPerBoxChange(val: '1' | '2' | '4') {
    form.setValue('bonbonsPerBox', val)
    const n = parseInt(val)
    const cur = form.getValues('bonbons') ?? []
    if (cur.length < n) {
      form.setValue('bonbons', [...cur, ...Array.from({ length: n - cur.length }, () => ({ shape: 'heart' as const, flavorSlug: '' }))])
    } else if (cur.length > n) {
      form.setValue('bonbons', cur.slice(0, n))
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please upload an image under 5 MB.', variant: 'destructive' })
      return
    }
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => form.setValue('inspirationImageBase64', reader.result as string)
    reader.readAsDataURL(file)
  }

  function canProceed(): boolean {
    if (step === 0) return !!values.occasion
    if (step === 1) return (values.numberOfBoxes ?? 0) >= 1
    if (step === 2) return (values.bonbons ?? []).every(b => b.shape && b.flavorSlug)
    if (step === 3) return (values.colorTheme?.length ?? 0) >= 5
    return true
  }

  async function onSubmit(data: FavourOrderValues) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/favors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      toast({ title: 'Something went wrong', description: 'Please try again or reach us on WhatsApp.', variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  // ── Submitted ──────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="mb-10 lg:mb-0">
            <OrderSummaryPanel values={values} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-5 py-10"
          >
            <div className="w-10 h-px bg-champagne-gold" />
            <h3 className="font-cormorant text-4xl text-deep-cocoa">Your order is in.</h3>
            <p className="font-inter text-sm text-taupe leading-relaxed max-w-sm">
              We will be in touch within 24 hours to confirm your favour details and send a final quote. A deposit is required to secure your date.
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">

        {/* LEFT — sticky summary */}
        <div className="lg:sticky lg:top-24 mb-12 lg:mb-0">
          <OrderSummaryPanel values={values} />
        </div>

        {/* RIGHT — form steps */}
        <div>
          <div className="border-t border-taupe/10 lg:border-t-0" />

          {/* Step indicator */}
          <div className="pt-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-inter text-[10px] tracking-[0.45em] text-taupe uppercase">
                Step {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')} — {STEPS[step]}
              </span>
              <div className="flex gap-1">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => i < step && setStep(i)}
                    disabled={i >= step}
                    className={cn('h-px w-8 transition-all duration-500', i <= step ? 'bg-champagne-gold' : 'bg-taupe/25')}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              {/* ── Step 0: Occasion ── */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-cormorant text-3xl text-deep-cocoa">What is the Occasion?</h2>
                    <p className="font-inter text-sm text-taupe mt-2">Choose the event your favours are for.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {OCCASIONS.map(({ id, label, icon }) => {
                      const selected = values.occasion === id
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => form.setValue('occasion', id)}
                          className={cn(
                            'py-4 px-2 border text-center transition-all duration-300',
                            selected
                              ? 'border-champagne-gold bg-champagne-gold/5'
                              : 'border-taupe/20 hover:border-taupe/50 bg-cream',
                          )}
                        >
                          <div className="mb-2">{icon}</div>
                          <div className="font-inter text-[11px] tracking-wide text-deep-cocoa leading-tight">{label}</div>
                        </button>
                      )
                    })}
                  </div>

                  {values.occasion === 'other' && (
                    <FormField control={form.control} name="occasionOther" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Describe your occasion</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what you are celebrating..."
                            maxLength={100}
                            className="font-inter resize-none rounded-none border-taupe/30"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}
                </div>
              )}

              {/* ── Step 1: Order Size ── */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-cormorant text-3xl text-deep-cocoa">Order Size</h2>
                    <p className="font-inter text-sm text-taupe mt-2">
                      How many boxes do you need, and how many bonbons should each box contain?
                    </p>
                  </div>

                  {/* Number of boxes */}
                  <FormField control={form.control} name="numberOfBoxes" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Number of favour boxes</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={20}
                          max={2000}
                          placeholder="e.g. 80"
                          {...field}
                          className="font-inter rounded-none w-40"
                        />
                      </FormControl>
                      <p className="font-inter text-[10px] text-taupe/60 mt-1">Minimum order: 20 boxes</p>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Bonbons per box */}
                  <div>
                    <p className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase mb-3">Bonbons per box</p>
                    <div className="flex gap-3">
                      {(['1', '2', '4'] as const).map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => handleBonbonsPerBoxChange(n)}
                          className={cn(
                            'w-16 h-16 border font-cormorant text-2xl transition-all duration-300',
                            values.bonbonsPerBox === n
                              ? 'border-champagne-gold bg-champagne-gold/5 text-deep-cocoa'
                              : 'border-taupe/20 hover:border-taupe/50 text-taupe',
                          )}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live discount preview */}
                  {(values.numberOfBoxes ?? 0) >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-l-2 border-champagne-gold/40 pl-4 space-y-1"
                    >
                      <p className="font-inter text-xs text-deep-cocoa">
                        {totalBonbons} bonbons total
                      </p>
                      {discountRate > 0 ? (
                        <p className="font-inter text-xs text-champagne-gold font-medium">{discountLabel} applied</p>
                      ) : totalBonbons < 60 ? (
                        <p className="font-inter text-xs text-taupe/60">
                          Add {60 - totalBonbons} more bonbons to unlock 10% off
                        </p>
                      ) : null}
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── Step 2: Bonbon Customisation ── */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-cormorant text-3xl text-deep-cocoa">Customise Each Bonbon</h2>
                    <p className="font-inter text-sm text-taupe mt-2">
                      Choose the shape and flavour for each bonbon slot — the same configuration fills every box.
                    </p>
                  </div>

                  {(values.bonbons ?? []).map((slot, i) => (
                    <div key={i} className="border border-taupe/15 p-5 space-y-5">
                      <p className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">
                        Bonbon {i + 1} of {bonbonsPerBoxNum}
                      </p>

                      {/* Shape picker */}
                      <div>
                        <p className="font-inter text-[10px] tracking-[0.35em] text-taupe/70 uppercase mb-2">Shape</p>
                        <div className="flex gap-2 flex-wrap">
                          {SHAPES.map(({ id, label, icon }) => {
                            const selected = slot.shape === id
                            return (
                              <button
                                key={id}
                                type="button"
                                onClick={() => {
                                  const cur = form.getValues('bonbons')
                                  cur[i] = { ...cur[i], shape: id }
                                  form.setValue('bonbons', [...cur])
                                }}
                                className={cn(
                                  'flex items-center gap-2 px-3 py-2 border transition-all duration-300',
                                  selected
                                    ? 'border-champagne-gold bg-champagne-gold/5 text-deep-cocoa'
                                    : 'border-taupe/20 hover:border-taupe/40 text-taupe',
                                )}
                              >
                                <span style={{ color: selected ? '#C9A961' : '#AC9A86' }}>{icon}</span>
                                <span className="font-inter text-[11px]">{label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Flavour picker */}
                      <div>
                        <p className="font-inter text-[10px] tracking-[0.35em] text-taupe/70 uppercase mb-2">Flavour</p>
                        <div className="space-y-3">
                          {BONBON_COLLECTIONS.map(col => (
                            <div key={col.slug}>
                              <p className="font-inter text-[9px] tracking-[0.4em] text-taupe/50 uppercase mb-1.5">
                                {col.name} — ${TIER_PRICE[col.tier].toFixed(2)}/bonbon
                              </p>
                              <div className="grid grid-cols-1 gap-1">
                                {col.flavors.map(flavor => {
                                  const selected = slot.flavorSlug === flavor.slug
                                  return (
                                    <button
                                      key={flavor.slug}
                                      type="button"
                                      onClick={() => {
                                        const cur = form.getValues('bonbons')
                                        cur[i] = { ...cur[i], flavorSlug: flavor.slug }
                                        form.setValue('bonbons', [...cur])
                                      }}
                                      className={cn(
                                        'flex items-center justify-between px-3 py-2 border text-left transition-all duration-200',
                                        selected
                                          ? 'border-champagne-gold bg-champagne-gold/5'
                                          : 'border-taupe/15 hover:border-taupe/35',
                                      )}
                                    >
                                      <span className="font-inter text-xs text-deep-cocoa">{flavor.name}</span>
                                      {selected && (
                                        <span className="font-inter text-[9px] text-champagne-gold tracking-wider">Selected</span>
                                      )}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Step 3: Colour Theme ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-cormorant text-3xl text-deep-cocoa">Colour & Theme</h2>
                    <p className="font-inter text-sm text-taupe mt-2">
                      Describe your event palette and vision. Optionally upload a photo for reference — we will match your colours as closely as possible.
                    </p>
                  </div>

                  <FormField control={form.control} name="colorTheme" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">
                        Colour palette & event vision
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. Dusty rose and sage green with gold accents — romantic garden wedding feel"
                          maxLength={400}
                          className="font-inter resize-none rounded-none border-taupe/30"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* File upload */}
                  <div>
                    <p className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase mb-2">Inspiration photo (optional)</p>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-full border border-dashed border-taupe/30 hover:border-taupe/60 py-8 text-center transition-all duration-300"
                    >
                      {fileName ? (
                        <div className="space-y-1">
                          <p className="font-inter text-xs text-champagne-gold">Photo attached</p>
                          <p className="font-inter text-[10px] text-taupe truncate px-4">{fileName}</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="font-inter text-xs text-taupe">Click to upload an inspiration photo</p>
                          <p className="font-inter text-[10px] text-taupe/50">JPG, PNG, WEBP · max 5 MB</p>
                        </div>
                      )}
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  <FormField control={form.control} name="dietary" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">
                        Dietary restrictions (optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Nut-free, vegan"
                          className="font-inter rounded-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}

              {/* ── Step 4: Your Details ── */}
              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="font-cormorant text-3xl text-deep-cocoa">Your Details</h2>

                  {/* Order recap */}
                  <div className="border-l-2 border-champagne-gold pl-4 space-y-1.5">
                    <p className="font-inter text-xs text-deep-cocoa">
                      <span className="text-taupe">Occasion — </span>
                      {OCCASIONS.find(o => o.id === values.occasion)?.label ?? ''}
                      {values.occasion === 'other' && values.occasionOther ? ` — ${values.occasionOther}` : ''}
                    </p>
                    <p className="font-inter text-xs text-deep-cocoa">
                      <span className="text-taupe">Order — </span>
                      {values.numberOfBoxes} boxes · {bonbonsPerBoxNum} bonbon{bonbonsPerBoxNum !== 1 ? 's' : ''} each · {totalBonbons} total
                    </p>
                    {(values.bonbons ?? []).map((b, i) => (
                      <p key={i} className="font-inter text-xs text-deep-cocoa">
                        <span className="text-taupe">Bonbon {i + 1} — </span>
                        {b.shape ? b.shape.charAt(0).toUpperCase() + b.shape.slice(1) : '—'} · {getFlavorName(b.flavorSlug ?? '')} (${getFlavorPrice(b.flavorSlug ?? '').toFixed(2)})
                      </p>
                    ))}
                    <p className="font-inter text-xs text-deep-cocoa">
                      <span className={cn('font-medium', discountRate > 0 ? 'text-champagne-gold' : 'text-taupe')}>
                        {discountLabel}
                      </span>
                      {' — '}
                      Estimated total: <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Full Name</FormLabel>
                        <FormControl><Input placeholder="Your name" {...field} className="font-inter rounded-none" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Phone</FormLabel>
                        <FormControl><Input placeholder="+1 (000) 000-0000" {...field} className="font-inter rounded-none" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Email</FormLabel>
                      <FormControl><Input type="email" placeholder="you@example.com" {...field} className="font-inter rounded-none" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="eventDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Event Date</FormLabel>
                      <FormControl><Input type="date" {...field} className="font-inter rounded-none" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-inter text-[10px] tracking-[0.4em] text-taupe uppercase">Additional Notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Anything else we should know..."
                          className="font-inter resize-none rounded-none border-taupe/30"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-cocoa-wine hover:bg-deep-cocoa text-cream font-inter text-[11px] tracking-[0.4em] uppercase transition-all duration-500 disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Submit My Order'}
                  </button>
                  <p className="font-inter text-[10px] text-taupe/50 tracking-wide">
                    No payment required. We will confirm your order and quote by email within 24 hours.
                  </p>
                </div>
              )}

              {/* Navigation */}
              {step < 4 && (
                <div className="flex justify-between mt-12 pt-8 border-t border-taupe/10">
                  <button
                    type="button"
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="font-inter text-[11px] tracking-[0.4em] uppercase text-taupe hover:text-deep-cocoa transition-colors duration-300 disabled:opacity-30"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canProceed()}
                    className="font-inter text-[11px] tracking-[0.4em] uppercase px-8 py-3 border border-deep-cocoa text-deep-cocoa hover:bg-deep-cocoa hover:text-cream transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </div>
              )}

            </form>
          </Form>
        </div>

      </div>
    </div>
  )
}
