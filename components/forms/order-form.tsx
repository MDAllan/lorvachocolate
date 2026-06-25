'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { orderSchema, type OrderFormValues } from '@/lib/validations/order'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { allProducts } from '@/lib/data/products'

interface OrderFormProps {
  defaultProduct?: string
}

export function OrderForm({ defaultProduct }: OrderFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      product: defaultProduct ?? '',
      boxSize: '12pc',
      quantity: 1,
      occasion: '',
      pickupOrDelivery: 'pickup',
      notes: '',
    },
  })

  async function onSubmit(values: OrderFormValues) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/orders/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error('Submission failed')

      setSubmitted(true)
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Please try again or reach us on WhatsApp.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-14 space-y-5">
        <div className="w-10 h-px bg-champagne-gold" />
        <h3 className="font-cormorant text-3xl text-deep-cocoa">Order received.</h3>
        <p className="font-inter text-sm text-taupe leading-relaxed max-w-sm">
          We'll be in touch shortly to confirm your order and arrange pickup. Check your inbox for a confirmation.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} className="font-inter" />
                </FormControl>
                <FormMessage className="font-inter text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (000) 000-0000" {...field} className="font-inter" />
                </FormControl>
                <FormMessage className="font-inter text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} className="font-inter" />
              </FormControl>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Product</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="font-inter">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allProducts.map((p: { id: string; name: string }) => (
                    <SelectItem key={p.id} value={p.name} className="font-inter">
                      {p.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="Breakable Heart / Ball" className="font-inter">
                    Breakable Heart / Ball
                  </SelectItem>
                  <SelectItem value="Custom / Other" className="font-inter">
                    Custom / Other
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="boxSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Box Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="font-inter">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="12pc" className="font-inter">12 pc</SelectItem>
                    <SelectItem value="16pc" className="font-inter">16 pc</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="font-inter text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Quantity (boxes)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={50} {...field} className="font-inter" />
                </FormControl>
                <FormMessage className="font-inter text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="pickupOrDelivery"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Pickup / Delivery</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="font-inter">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pickup" className="font-inter">Pickup</SelectItem>
                    <SelectItem value="delivery" className="font-inter">Delivery</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="font-inter text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occasion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Occasion (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Birthday, Wedding" {...field} className="font-inter" />
                </FormControl>
                <FormMessage className="font-inter text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Special Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Allergies, preferences, packaging notes..."
                  className="font-inter resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-cocoa-wine hover:bg-deep-cocoa text-cream font-inter text-[11px] tracking-[0.4em] uppercase py-4 rounded-none transition-all duration-500"
        >
          {submitting ? 'Sending...' : 'Place Order'}
        </Button>

        <p className="text-center font-inter text-xs text-taupe/60">
          No payment required. We'll confirm via email or phone.
        </p>
      </form>
    </Form>
  )
}
