import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

const resend = new Resend(process.env.RESEND_API_KEY)
const NOTIFY_EMAIL = process.env.NEWSLETTER_NOTIFY_EMAIL || process.env.RESEND_FROM_EMAIL || 'info@lorva.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@lorva.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    const { email } = parsed.data

    // Send confirmation to subscriber
    await resend.emails.send({
      from: `LORVA Fine Chocolate <${FROM_EMAIL}>`,
      to: email,
      subject: 'Welcome to the LORVA list 🍫',
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #242121; background: #F6EFE9;">
          <img src="${process.env.NEXT_PUBLIC_SITE_URL || 'https://lorvachocolate.com'}/logo-wine.svg" alt="LORVA Fine Chocolate" style="width: 120px; margin-bottom: 32px;" />
          <h1 style="font-size: 28px; font-weight: 300; color: #750A04; margin-bottom: 16px; letter-spacing: 0.02em;">You're on the list.</h1>
          <p style="font-size: 15px; line-height: 1.7; color: #6b5f52; margin-bottom: 24px;">
            Thank you for subscribing. You'll be among the first to know about new seasonal collections, limited editions, and everything sweet from our kitchen.
          </p>
          <p style="font-size: 13px; color: #AC9A86; border-top: 1px solid #C9A961; padding-top: 20px; margin-top: 32px;">
            LORVA Fine Chocolate — Handcrafted with intention.
          </p>
        </div>
      `,
    })

    // Notify store owner of new subscriber
    await resend.emails.send({
      from: `LORVA Newsletter <${FROM_EMAIL}>`,
      to: NOTIFY_EMAIL,
      subject: `New newsletter subscriber: ${email}`,
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}
