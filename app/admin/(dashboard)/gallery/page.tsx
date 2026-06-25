import { db } from '@/lib/db/client'
import { galleryImages } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'
import { GalleryManager } from '@/components/admin/gallery-manager'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Gallery | Admin' }

export default async function AdminGalleryPage() {
  const images = await db.select().from(galleryImages).orderBy(asc(galleryImages.sortOrder))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cormorant text-3xl text-deep-cocoa">Gallery</h1>
        <p className="font-inter text-sm text-taupe mt-1">
          {images.length} image{images.length !== 1 ? 's' : ''} · drag to reorder
        </p>
      </div>
      <GalleryManager initialImages={images} />
    </div>
  )
}
