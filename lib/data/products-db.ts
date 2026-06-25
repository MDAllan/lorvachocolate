import { unstable_noStore as noStore } from 'next/cache'
import { eq, and } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { products } from '@/lib/db/schema'

export type DbProduct = {
  id: string
  slug: string
  name: string
  description: string | null
  category: string
  price12: number | null
  price16: number | null
  priceEach: number | null
  imageUrl: string | null
  flavors: string[]
  tags: string[]
  featured: boolean
  isActive: boolean
}

function parseProduct(row: typeof products.$inferSelect): DbProduct {
  return {
    ...row,
    description: row.description ?? null,
    price12: row.price12 ? Number(row.price12) : null,
    price16: row.price16 ? Number(row.price16) : null,
    priceEach: row.priceEach ? Number(row.priceEach) : null,
    flavors: row.flavors ? JSON.parse(row.flavors) : [],
    tags: row.tags ? JSON.parse(row.tags) : [],
  }
}

export async function getActiveProducts(): Promise<DbProduct[]> {
  noStore()
  const rows = await db.select().from(products).where(eq(products.isActive, true))
  return rows.map(parseProduct)
}

export async function getFeaturedProducts(): Promise<DbProduct[]> {
  noStore()
  const rows = await db.select().from(products).where(
    and(eq(products.isActive, true), eq(products.featured, true))
  )
  return rows.map(parseProduct)
}
