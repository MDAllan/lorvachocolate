import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { orderSchema } from '@/lib/validations/order'
import { db } from '@/lib/db/client'
import { orderRequests } from '@/lib/db/schema'

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? 'your-email@example.com'
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'Lorva Chocolate <orders@lorvachocolate.com>'

function brandedHtml(title: string, bodyContent: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Georgia,serif;background:#F6EFE9;margin:0;padding:0}div{max-width:600px;margin:0 auto;padding:40px 24px}h1{color:#750A04;font-size:26px;margin:0 0 8px}p{color:#242121;font-size:14px;margin:0 0 10px;line-height:1.6}hr{border:none;border-top:1px solid #AC9A86;margin:20px 0}.label{color:#AC9A86;font-weight:bold}</style></head><body><div><h1>${title}</h1><hr/>${bodyContent}</div></body></html>`
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await request.json()
    const result = orderSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', issues: result.error.flatten() },
        { status: 400 }
      )
    }

    const o = result.data

    // Save to DB — always, even if email fails
    await db.insert(orderRequests).values({
      customerName: o.name,
      customerEmail: o.email || null,
      customerPhone: o.phone || null,
      productInterest: o.product || null,
      boxSize: o.boxSize || null,
      quantity: o.quantity ?? 1,
      notes: [o.occasion ? `Occasion: ${o.occasion}` : '', o.notes ?? ''].filter(Boolean).join('\n') || null,
      status: 'new',
    })

    const ownerHtml = brandedHtml(
      `New Order — ${o.product}`,
      `<p><span class="label">Customer:</span> ${o.name}</p>
       <p><span class="label">Email:</span> ${o.email}</p>
       <p><span class="label">Phone:</span> ${o.phone}</p>
       <hr/>
       <p><span class="label">Product:</span> ${o.product}</p>
       <p><span class="label">Box Size:</span> ${o.boxSize}</p>
       <p><span class="label">Quantity:</span> ${o.quantity}</p>
       <p><span class="label">Pickup / Delivery:</span> ${o.pickupOrDelivery}</p>
       ${o.occasion ? `<p><span class="label">Occasion:</span> ${o.occasion}</p>` : ''}
       ${o.notes ? `<p><span class="label">Notes:</span> ${o.notes}</p>` : ''}`
    )

    const customerHtml = brandedHtml(
      `Thank you, ${o.name}!`,
      `<p>We've received your order and will be in touch shortly to confirm the details and arrange ${o.pickupOrDelivery}.</p>
       <hr/>
       <p><span class="label">Product:</span> ${o.product}</p>
       <p><span class="label">Box Size:</span> ${o.boxSize}</p>
       <p><span class="label">Quantity:</span> ${o.quantity}</p>
       <hr/>
       <p style="color:#AC9A86;font-size:13px">Questions? Reply to this email or message us on WhatsApp.</p>
       <p style="color:#750A04;font-size:18px;margin-top:24px">— The Lorva Team</p>`
    )

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `New Order from ${o.name} — ${o.product}`,
        html: ownerHtml,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: o.email,
        subject: 'Your Lorva Chocolate Order — We Got It!',
        html: customerHtml,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Order submission error:', error)
    return NextResponse.json({ error: 'Failed to submit order' }, { status: 500 })
  }
}
