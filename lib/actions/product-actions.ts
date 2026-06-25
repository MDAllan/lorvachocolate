'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { products, auditLog } from '@/lib/db/schema'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error('Unauthorized')
  return session
}

export interface ProductFormData {
  slug: string
  name: string
  description: string
  category: 'bonbons' | 'bars'
  price12?: number | null
  price16?: number | null
  priceEach?: number | null
  imageUrl?: string | null
  flavors: string[]
  tags: string[]
  featured: boolean
  isActive: boolean
}

export async function createProduct(data: ProductFormData) {
  const session = await requireAdmin()

  const displayPrice =
    data.category === 'bonbons'
      ? String(data.price12 ?? 0)
      : String(data.priceEach ?? 0)

  const [inserted] = await db.insert(products).values({
    slug: data.slug,
    name: data.name,
    description: data.description,
    category: data.category,
    price: displayPrice,
    price12: data.price12 != null ? String(data.price12) : null,
    price16: data.price16 != null ? String(data.price16) : null,
    priceEach: data.priceEach != null ? String(data.priceEach) : null,
    imageUrl: data.imageUrl ?? null,
    flavors: JSON.stringify(data.flavors),
    tags: JSON.stringify(data.tags),
    featured: data.featured,
    isActive: data.isActive,
  }).returning()

  await db.insert(auditLog).values({
    actor: session.user.email,
    action: 'create_product',
    after: JSON.stringify(inserted),
  })

  revalidatePath('/products')
  revalidatePath('/admin/products')
  return { success: true, id: inserted.id }
}

export async function updateProduct(id: string, data: ProductFormData) {
  const session = await requireAdmin()

  const [before] = await db.select().from(products).where(eq(products.id, id)).limit(1)

  const displayPrice =
    data.category === 'bonbons'
      ? String(data.price12 ?? 0)
      : String(data.priceEach ?? 0)

  await db.update(products).set({
    slug: data.slug,
    name: data.name,
    description: data.description,
    category: data.category,
    price: displayPrice,
    price12: data.price12 != null ? String(data.price12) : null,
    price16: data.price16 != null ? String(data.price16) : null,
    priceEach: data.priceEach != null ? String(data.priceEach) : null,
    imageUrl: data.imageUrl ?? null,
    flavors: JSON.stringify(data.flavors),
    tags: JSON.stringify(data.tags),
    featured: data.featured,
    isActive: data.isActive,
    updatedAt: new Date(),
  }).where(eq(products.id, id))

  await db.insert(auditLog).values({
    actor: session.user.email,
    action: 'update_product',
    before: JSON.stringify(before),
    after: JSON.stringify(data),
  })

  revalidatePath('/products')
  revalidatePath('/admin/products')
  return { success: true }
}

export async function toggleProductActive(id: string, isActive: boolean) {
  const session = await requireAdmin()

  await db.update(products).set({ isActive, updatedAt: new Date() }).where(eq(products.id, id))

  await db.insert(auditLog).values({
    actor: session.user.email,
    action: 'toggle_product_active',
    after: JSON.stringify({ id, isActive }),
  })

  revalidatePath('/products')
  revalidatePath('/admin/products')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const session = await requireAdmin()

  const [before] = await db.select().from(products).where(eq(products.id, id)).limit(1)
  await db.delete(products).where(eq(products.id, id))

  await db.insert(auditLog).values({
    actor: session.user.email,
    action: 'delete_product',
    before: JSON.stringify(before),
  })

  revalidatePath('/products')
  revalidatePath('/admin/products')
  return { success: true }
}
