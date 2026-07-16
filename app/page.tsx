import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { BrandManifesto } from '@/components/sections/brand-manifesto'
import { CraftProcess } from '@/components/sections/craft-process'
import { HomepageGalleryTeaser } from '@/components/sections/homepage-gallery-teaser'
import { ServiceHighlights } from '@/components/sections/service-highlights'
import { Testimonials } from '@/components/sections/testimonials'
import { StatsBar } from '@/components/sections/stats-bar'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { InstagramTeaser } from '@/components/sections/instagram-teaser'
import { GiftFinder } from '@/components/sections/gift-finder'
import { BreakableTeaser } from '@/components/sections/breakable-teaser'
import { KineticHero } from '@/components/sections/kinetic-hero'
import { getFeaturedProducts } from '@/lib/data/products-db'
import { getSiteContent } from '@/lib/data/site-content-db'
import { EditableSection } from '@/components/admin/editable-section'
import { auth } from '@/lib/auth/config'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return {
    title: content.seo_home_title ?? 'LORVA Fine Chocolate',
    description: content.seo_home_description ?? 'Handcrafted artisan chocolate — bonbons, breakable hearts, wedding favours, and custom gift boxes.',
  }
}

export default async function HomePage() {
  const [featuredProducts, content, session] = await Promise.all([
    getFeaturedProducts(),
    getSiteContent(),
    auth.api.getSession({ headers: await headers() }).catch(() => null),
  ])

  const isAdmin = !!session
  const instagramUrl = content.footer_instagram_url || 'https://www.instagram.com/lorva.chocolate'

  return (
    <>
      <KineticHero />
      <StatsBar />
      <BreakableTeaser />
      <EditableSection isAdmin={isAdmin} section="featured" label="Featured Products">
        <FeaturedProducts products={featuredProducts} content={content} />
      </EditableSection>
      <GiftFinder />
      <EditableSection isAdmin={isAdmin} section="manifesto" label="Brand Story">
        <BrandManifesto content={content} />
      </EditableSection>
      <EditableSection isAdmin={isAdmin} section="process" label="Craft Process">
        <CraftProcess content={content} />
      </EditableSection>
      <Testimonials />
      <EditableSection isAdmin={isAdmin} section="gallery" label="Gallery Teaser">
        <HomepageGalleryTeaser content={content} />
      </EditableSection>
      <NewsletterSection />
      <EditableSection isAdmin={isAdmin} section="services" label="Services">
        <ServiceHighlights content={content} />
      </EditableSection>
      <InstagramTeaser instagramUrl={instagramUrl} />
    </>
  )
}
