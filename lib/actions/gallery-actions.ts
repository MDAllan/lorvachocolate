'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { createClient } from '@supabase/supabase-js'
import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { galleryImages, auditLog } from '@/lib/db/schema'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error('Unauthorized')
  return session
}

export async function saveGalleryImage(data: {
  url: string
  storagePath: string
  altText: string
}) {
  await requireAdmin()

  const [inserted] = await db.insert(galleryImages).values({
    url: data.url,
    storagePath: data.storagePath,
    altText: data.altText,
    sortOrder: 0,
    isActive: true,
  }).returning()

  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
  return { success: true, id: inserted.id }
}

export async function updateGalleryAltText(id: string, altText: string) {
  await requireAdmin()

  await db.update(galleryImages).set({ altText, updatedAt: new Date() }).where(eq(galleryImages.id, id))

  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
  return { success: true }
}

export async function deleteGalleryImage(id: string, storagePath: string) {
  const session = await requireAdmin()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  await supabase.storage.from('lorva-gallery').remove([storagePath])
  await db.delete(galleryImages).where(eq(galleryImages.id, id))

  await db.insert(auditLog).values({
    actor: session.user.email,
    action: 'delete_gallery_image',
    before: JSON.stringify({ id, storagePath }),
  })

  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
  return { success: true }
}

export async function reorderGalleryImages(updates: { id: string; sortOrder: number }[]) {
  await requireAdmin()

  await Promise.all(
    updates.map(({ id, sortOrder }) =>
      db.update(galleryImages).set({ sortOrder }).where(eq(galleryImages.id, id)),
    ),
  )

  revalidatePath('/gallery')
  revalidatePath('/admin/gallery')
  return { success: true }
}
