import { unstable_noStore as noStore } from 'next/cache'
import { eq, asc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { galleryImages } from '@/lib/db/schema'

export async function getActiveGalleryImages() {
  noStore()
  return db.select().from(galleryImages)
    .where(eq(galleryImages.isActive, true))
    .orderBy(asc(galleryImages.sortOrder))
}
