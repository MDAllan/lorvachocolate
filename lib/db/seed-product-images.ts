/**
 * Set imageUrl and featured flag on seeded products.
 * Run once: npx tsx lib/db/seed-product-images.ts
 */
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products } from './schema'

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle(client)

const images: { slug: string; imageUrl: string; featured?: boolean }[] = [
  { slug: 'classic-collection',  imageUrl: '/gallery/chocolates-assorted-tray.jpg',              featured: true },
  { slug: 'special-collection',  imageUrl: '/gallery/chocolates-orange-tiger-tray.png',           featured: true },
  { slug: 'premium-collection',  imageUrl: '/gallery/chocolates-black-white-diamond-truffles.jpg', featured: true },
  { slug: 'milk-silk-bar',       imageUrl: '/gallery/chocolates-milk-dome-bonbons.jpg' },
  { slug: 'dark-intense-bar',    imageUrl: '/gallery/truffle-dark-hazelnut-filling.jpg' },
  { slug: 'white-velvet-bar',    imageUrl: '/gallery/truffle-cherry-heart-filling.png' },
  { slug: 'ruby-rouge-bar',      imageUrl: '/gallery/truffle-ruby-mango-filling.jpg' },
]

async function main() {
  console.log('Updating product images…')
  let updated = 0

  for (const { slug, imageUrl, featured } of images) {
    const result = await db
      .update(products)
      .set({ imageUrl, ...(featured !== undefined ? { featured } : {}) })
      .where(eq(products.slug, slug))
    updated++
    console.log(`  ✓ ${slug}`)
  }

  console.log(`Done. Updated ${updated} products.`)
  await client.end()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
