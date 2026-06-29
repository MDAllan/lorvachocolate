import type { Metadata } from 'next'
import { Hero } from '@/components/sections/hero'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { BrandManifesto } from '@/components/sections/brand-manifesto'
import { CraftProcess } from '@/components/sections/craft-process'
import { HomepageGalleryTeaser } from '@/components/sections/homepage-gallery-teaser'
import { ServiceHighlights } from '@/components/sections/service-highlights'
import { Testimonials } from '@/components/sections/testimonials'
import { StatsBar } from '@/components/sections/stats-bar'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { InstagramTeaser } from '@/components/sections/instagram-teaser'
import { getFeaturedProducts } from '@/lib/data/products-db'
import { getSiteContent } from '@/lib/data/site-content-db'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return {
    title: content.seo_home_title ?? 'LORVA Fine Chocolate',
    description: content.seo_home_description ?? 'Handcrafted artisan chocolate — bonbons, breakable hearts, wedding favours, and custom gift boxes.',
  }
}

export default async function HomePage() {
  const [featuredProducts, content] = await Promise.all([
    getFeaturedProducts(),
    getSiteContent(),
  ])

  const instagramUrl = content.footer_instagram_url || 'https://instagram.com'

  return (
    <>
      <Hero content={content} />
      <StatsBar />
      <FeaturedProducts products={featuredProducts} content={content} />
      <BrandManifesto content={content} />
      <CraftProcess content={content} />
      <Testimonials />
      <HomepageGalleryTeaser content={content} />
      <NewsletterSection />
      <ServiceHighlights content={content} />
      <InstagramTeaser instagramUrl={instagramUrl} />
    </>
  )
}
