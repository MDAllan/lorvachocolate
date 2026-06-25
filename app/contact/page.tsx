import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/data/site-content-db'
import { ContactPageContent } from '@/components/sections/contact-page-content'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return {
    title: content.seo_contact_title ?? 'Contact',
    description: content.seo_contact_description ?? 'Reach us by WhatsApp or contact form. We respond same-day.',
  }
}

export default function ContactPage() {
  return <ContactPageContent />
}
