import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { favourOrderSchema } from '@/lib/validations/favour-order'
import { BONBON_COLLECTIONS } from '@/lib/data/catalog'
import { db } from '@/lib/db/client'
import { orderRequests } from '@/lib/db/schema'

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? 'your-email@example.com'
const FROM_EMAIL  = process.env.FROM_EMAIL  ?? 'Lorva Chocolate <orders@lorvachocolate.com>'

const TIER_PRICE: Record<string, number> = { classic: 2.50, special: 2.75, premium: 3.00 }

function getFlavorInfo(slug: string): { name: string; tier: string; price: number } {
  for (const col of BONBON_COLLECTIONS) {
    const f = col.flavors.find(x => x.slug === slug)
    if (f) return { name: f.name, tier: col.tier, price: TIER_PRICE[col.tier] ?? 2.50 }
  }
  return { name: slug, tier: 'classic', price: 2.50 }
}

function brandedHtml(title: string, bodyContent: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Georgia,serif;background:#F6EFE9;margin:0;padding:0}div{max-width:600px;margin:0 auto;padding:40px 24px}h1{color:#750A04;font-size:26px;margin:0 0 8px}p{color:#242121;font-size:14px;margin:0 0 10px;line-height:1.6}hr{border:none;border-top:1px solid #AC9A86;margin:20px 0}table{width:100%;border-collapse:collapse;margin:12px 0}td{padding:6px 0;font-size:13px;color:#242121;border-bottom:1px solid #e8ddd3}.label{color:#AC9A86;font-weight:bold}.highlight{color:#C9A961;font-weight:bold}</style></head><body><div><h1>${title}</h1><hr/>${bodyContent}</div></body></html>`
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await request.json()
    const result = favourOrderSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const d = result.data
    const bonbonsPerBoxNum = parseInt(d.bonbonsPerBox)
    const totalBonbons = d.numberOfBoxes * bonbonsPerBoxNum

    const pricePerBox = d.bonbons.reduce((sum, b) => sum + getFlavorInfo(b.flavorSlug).price, 0)
    const totalBeforeDiscount = pricePerBox * d.numberOfBoxes
    let discountRate = 0
    let discountLabel = 'No discount'
    if (totalBonbons >= 240) { discountRate = 0.15; discountLabel = '15% bulk discount' }
    else if (totalBonbons >= 60) { discountRate = 0.10; discountLabel = '10% bulk discount' }
    const totalPrice = totalBeforeDiscount * (1 - discountRate)

    const bonbonRows = d.bonbons.map((b, i) => {
      const info = getFlavorInfo(b.flavorSlug)
      return `<tr><td>Bonbon ${i + 1}</td><td>${b.shape.charAt(0).toUpperCase() + b.shape.slice(1)}</td><td>${info.name}</td><td>$${info.price.toFixed(2)}</td></tr>`
    }).join('')

    const html = brandedHtml(
      'New Favour Order',
      `<p><span class="label">Name:</span> ${d.name}</p>
       <p><span class="label">Email:</span> ${d.email}</p>
       <p><span class="label">Phone:</span> ${d.phone}</p>
       <hr/>
       <p><span class="label">Occasion:</span> ${d.occasion}${d.occasionOther ? ` — ${d.occasionOther}` : ''}</p>
       <p><span class="label">Event Date:</span> ${d.eventDate}</p>
       <hr/>
       <p><span class="label">Boxes:</span> ${d.numberOfBoxes} × ${bonbonsPerBoxNum} bonbon${bonbonsPerBoxNum !== 1 ? 's' : ''} = ${totalBonbons} bonbons total</p>
       <table>
         <tr><td><strong>Slot</strong></td><td><strong>Shape</strong></td><td><strong>Flavour</strong></td><td><strong>Price</strong></td></tr>
         ${bonbonRows}
         <tr><td colspan="3"><strong>Per box</strong></td><td><strong>$${pricePerBox.toFixed(2)}</strong></td></tr>
       </table>
       <p><span class="label">Discount:</span> <span class="highlight">${discountLabel}</span></p>
       <p><span class="label">Estimated Total:</span> <span class="highlight">$${totalPrice.toFixed(2)}</span></p>
       <hr/>
       <p><span class="label">Colour Theme:</span> ${d.colorTheme}</p>
       ${d.dietary ? `<p><span class="label">Dietary:</span> ${d.dietary}</p>` : ''}
       ${d.notes   ? `<p><span class="label">Notes:</span> ${d.notes}</p>` : ''}
       ${d.inspirationImageBase64 ? '<p><span class="label">Inspiration Photo:</span> See attachment</p>' : ''}`
    )

    const attachments: Array<{ filename: string; content: string }> = []
    if (d.inspirationImageBase64) {
      const parts = d.inspirationImageBase64.split(',')
      const base64Data = parts[1] ?? ''
      const mimeMatch = parts[0]?.match(/data:(image\/[a-z+]+);base64/)
      const ext = mimeMatch?.[1]?.split('/')?.[1] ?? 'jpg'
      if (base64Data) {
        attachments.push({ filename: `inspiration.${ext}`, content: base64Data })
      }
    }

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `Favour Order — ${d.name} (${d.numberOfBoxes} boxes, ${d.occasion}, ${d.eventDate})`,
        html,
        ...(attachments.length > 0 ? { attachments } : {}),
      }),
      db.insert(orderRequests).values({
        customerName: d.name,
        customerEmail: d.email,
        customerPhone: d.phone,
        productInterest: `Favour Order — ${d.numberOfBoxes} boxes × ${d.bonbonsPerBox}pc`,
        boxSize: d.bonbonsPerBox,
        quantity: d.numberOfBoxes,
        notes: [
          `Occasion: ${d.occasion}${d.occasionOther ? ` (${d.occasionOther})` : ''}`,
          `Event Date: ${d.eventDate}`,
          `Colour Theme: ${d.colorTheme}`,
          d.dietary ? `Dietary: ${d.dietary}` : '',
          d.notes ?? '',
        ].filter(Boolean).join('\n'),
        total: totalPrice.toFixed(2),
        status: 'new',
        orderType: 'favour',
        orderPayload: JSON.stringify(d),
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Favour order error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
