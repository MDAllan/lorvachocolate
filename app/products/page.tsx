import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/data/site-content-db'
import { ProductsPageContent } from '@/components/sections/products-page-content'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return {
    title: content.seo_products_title ?? 'Bonbons Collection',
    description: content.seo_products_description ?? 'Browse our handcrafted bonbon collections and chocolate bars. Classic, Special, and Premium — assembled to order in 12 pc or 16 pc boxes.',
  }
}

export default function ProductsPage() {
  return <ProductsPageContent />
}
