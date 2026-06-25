import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? 'your-email@example.com'
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'Lorva Chocolate <orders@lorvachocolate.com>'

function brandedHtml(title: string, bodyContent: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Georgia,serif;background:#F6EFE9;margin:0;padding:0}div{max-width:600px;margin:0 auto;padding:40px 24px}h1{color:#750A04;font-size:26px;margin:0 0 8px}p{color:#242121;font-size:14px;margin:0 0 10px;line-height:1.6}hr{border:none;border-top:1px solid #AC9A86;margin:20px 0}.label{color:#AC9A86;font-weight:bold}</style></head><body><div><h1>${title}</h1><hr/>${bodyContent}</div></body></html>`
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const d = result.data

    const html = brandedHtml(
      'New Contact Message',
      `<p><span class="label">From:</span> ${d.name} (${d.email})</p>
       <p><span class="label">Subject:</span> ${d.subject}</p>
       <hr/>
       <p style="white-space:pre-wrap">${d.message}</p>`
    )

    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `Contact: ${d.subject} — ${d.name}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
