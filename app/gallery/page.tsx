import type { Metadata } from 'next'
import { getActiveGalleryImages } from '@/lib/data/gallery-db'
import { GalleryGrid } from '@/components/sections/gallery-grid'
import { GalleryHeader } from '@/components/sections/gallery-header'
import { getSiteContent } from '@/lib/data/site-content-db'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return {
    title: content.seo_gallery_title ?? 'Gallery',
    description: content.seo_gallery_description ?? 'A look at our handcrafted chocolates — bonbons, breakable hearts, wedding favours, and more.',
  }
}

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const images = await getActiveGalleryImages()

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <GalleryHeader />
        <GalleryGrid images={images} />
      </div>
    </div>
  )
}
