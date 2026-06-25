'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormValues } from '@/lib/validations/contact'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  async function onSubmit(values: ContactFormValues) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      toast({ title: 'Something went wrong', description: 'Please try WhatsApp instead.', variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-14 space-y-5">
        <div className="w-10 h-px bg-champagne-gold" />
        <h3 className="font-cormorant text-3xl text-deep-cocoa">Message sent.</h3>
        <p className="font-inter text-sm text-taupe">We'll get back to you as soon as possible.</p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Name</FormLabel>
              <FormControl><Input placeholder="Your name" {...field} className="font-inter" /></FormControl>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Email</FormLabel>
              <FormControl><Input type="email" placeholder="you@example.com" {...field} className="font-inter" /></FormControl>
              <FormMessage className="font-inter text-xs" />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="subject" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Subject</FormLabel>
            <FormControl><Input placeholder="How can we help?" {...field} className="font-inter" /></FormControl>
            <FormMessage className="font-inter text-xs" />
          </FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter text-xs tracking-wider text-taupe uppercase">Message</FormLabel>
            <FormControl>
              <Textarea placeholder="Tell us what you need..." className="font-inter resize-none" rows={5} {...field} />
            </FormControl>
            <FormMessage className="font-inter text-xs" />
          </FormItem>
        )} />
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-cocoa-wine hover:bg-deep-cocoa text-cream font-inter text-[11px] tracking-[0.4em] uppercase py-4 rounded-none transition-all duration-500"
        >
          {submitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  )
}
