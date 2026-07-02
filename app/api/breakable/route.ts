import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { breakableOrderSchema } from '@/lib/validations/breakable-order'
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
    const result = breakableOrderSchema.safeParse(body)

    if (!result.success) {
      console.error('Breakable validation error:', JSON.stringify(result.error.flatten(), null, 2))
      return NextResponse.json({ error: 'Invalid data', details: result.error.flatten() }, { status: 400 })
    }

    const d = result.data

    const html = brandedHtml(
      `New Breakable ${d.shape} Order`,
      `<p><span class="label">Customer:</span> ${d.name} · ${d.email} · ${d.phone}</p>
       <p><span class="label">Quantity:</span> ${d.quantity}</p>
       <hr/>
       <p><span class="label">Shape:</span> ${d.shape}</p>
       <p><span class="label">Shell:</span> ${d.shellFlavor} chocolate</p>
       <p><span class="label">Occasion:</span> ${d.occasion}${d.occasionOther ? ` — ${d.occasionOther}` : ''}</p>
       ${d.comment ? `<p><span class="label">Comment:</span> ${d.comment}</p>` : ''}
       <p><span class="label">Fillings:</span> ${(d.fillings ?? []).length ? d.fillings!.join(', ') : 'None'}</p>
       <p><span class="label">Drop-off Items:</span> ${d.dropOffItems ? 'Yes' : 'No'}</p>
       ${d.dropOffDescription ? `<p><span class="label">Description:</span> ${d.dropOffDescription}</p>` : ''}
       ${d.notes ? `<p><span class="label">Notes:</span> ${d.notes}</p>` : ''}`
    )

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `Breakable ${d.shape} Order — ${d.name} (qty: ${d.quantity})`,
        html,
      }),
      db.insert(orderRequests).values({
        customerName: d.name,
        customerEmail: d.email,
        customerPhone: d.phone,
        productInterest: `Breakable ${d.shape.charAt(0).toUpperCase() + d.shape.slice(1)} — ${d.shellFlavor} chocolate`,
        boxSize: d.shape,
        quantity: d.quantity,
        notes: [
          `Occasion: ${d.occasion}${d.occasionOther ? ` (${d.occasionOther})` : ''}`,
          d.fillings?.length ? `Fillings: ${d.fillings.join(', ')}` : '',
          d.dropOffItems ? `Drop-off items: ${d.dropOffDescription ?? 'yes'}` : '',
          d.comment ?? '',
          d.notes ?? '',
        ].filter(Boolean).join('\n'),
        total: null,
        status: 'new',
        orderType: 'breakable',
        orderPayload: JSON.stringify(d),
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Breakable order error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
