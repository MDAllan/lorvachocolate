import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { FeaturedProducts } from '@/components/sections/featured-products'

// ssr:false prevents hydration mismatches from Framer Motion's animation state
const LorvaHero = dynamic(
  () => import('@/components/sections/lorva-hero-framer'),
  { ssr: false, loading: () => <div style={{ width: '100%', height: '100vh', background: '#0C0102' }} /> }
)
import { BrandManifesto } from '@/components/sections/brand-manifesto'
import { CraftProcess } from '@/components/sections/craft-process'
import { HomepageGalleryTeaser } from '@/components/sections/homepage-gallery-teaser'
import { ServiceHighlights } from '@/components/sections/service-highlights'
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

  return (
    <>
      <LorvaHero
        showNavbar={false}
        tagline="Handcrafted. Timeless. Indulgent."
        headline="LORVA CHOCOLATE"
        description="Exquisite bonbons crafted with passion and the finest ingredients."
        ctaLabel="EXPLORE COLLECTION"
      />
      <FeaturedProducts products={featuredProducts} content={content} />
      <BrandManifesto content={content} />
      <CraftProcess content={content} />
      <HomepageGalleryTeaser content={content} />
      <ServiceHighlights content={content} />
    </>
  )
}
