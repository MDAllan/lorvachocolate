'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { favorInquirySchema, type FavorInquiryValues } from '@/lib/validations/favor-inquiry'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

export function FavorInquiryForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const form = useForm<FavorInquiryValues>({
    resolver: zodResolver(favorInquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: undefined,
      eventDate: '',
      guestCount: undefined,
      theme: '',
      dietary: '',
      notes: '',
    },
  })

  async function onSubmit(values: FavorInquiryValues) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/favors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error()
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
        <h3 className="font-cormorant text-3xl text-deep-cocoa">Enquiry received.</h3>
        <p className="font-inter text-sm text-taupe leading-relaxed max-w-sm">
          We'll be in touch within 24 hours to discuss your favour details and pricing.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Your Name</FormLabel>
              <FormControl><Input placeholder="Your name" {...field} className="font-inter" /></FormControl>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Phone</FormLabel>
              <FormControl><Input placeholder="+1 (000) 000-0000" {...field} className="font-inter" /></FormControl>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Email</FormLabel>
            <FormControl><Input type="email" placeholder="you@example.com" {...field} className="font-inter" /></FormControl>
            <FormMessage className="font-inter text-xs" />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField control={form.control} name="eventType" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="font-inter"><SelectValue placeholder="Select event" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="wedding" className="font-inter">Wedding</SelectItem>
                  <SelectItem value="birthday" className="font-inter">Birthday</SelectItem>
                  <SelectItem value="anniversary" className="font-inter">Anniversary</SelectItem>
                  <SelectItem value="corporate" className="font-inter">Corporate</SelectItem>
                  <SelectItem value="other" className="font-inter">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="eventDate" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Event Date</FormLabel>
              <FormControl><Input type="date" {...field} className="font-inter" /></FormControl>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField control={form.control} name="guestCount" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Number of Guests</FormLabel>
              <FormControl><Input type="number" min={1} placeholder="e.g. 80" {...field} className="font-inter" /></FormControl>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="theme" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Theme / Colours (optional)</FormLabel>
              <FormControl><Input placeholder="e.g. Dusty rose & ivory" {...field} className="font-inter" /></FormControl>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="dietary" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Dietary Restrictions (optional)</FormLabel>
            <FormControl><Input placeholder="e.g. Nut-free, vegan" {...field} className="font-inter" /></FormControl>
            <FormMessage className="font-inter text-xs" />
          </FormItem>
        )} />

        <FormField control={form.control} name="notes" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Additional Notes (optional)</FormLabel>
            <FormControl>
              <Textarea placeholder="Anything else we should know..." className="font-inter resize-none" rows={3} {...field} />
            </FormControl>
            <FormMessage className="font-inter text-xs" />
          </FormItem>
        )} />

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-cocoa-wine hover:bg-deep-cocoa text-cream font-inter text-[11px] tracking-[0.4em] uppercase py-4 rounded-none transition-all duration-500"
        >
          {submitting ? 'Sending...' : 'Send Inquiry'}
        </Button>
      </form>
    </Form>
  )
}
