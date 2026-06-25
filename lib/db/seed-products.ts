/**
 * Seed products from hardcoded data into the database.
 * Run once: npx tsx lib/db/seed-products.ts
 */
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from './schema'
import { bonbons, bars } from '../data/products'

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle(client)

async function main() {
  console.log('Seeding products…')

  const all = [...bonbons, ...bars]

  for (const p of all) {
    const displayPrice = p.category === 'bonbons'
      ? String(p.price12 ?? 0)
      : String(p.priceEach ?? 0)

    await db.insert(products).values({
      slug: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      price: displayPrice,
      price12: p.price12 != null ? String(p.price12) : null,
      price16: p.price16 != null ? String(p.price16) : null,
      priceEach: p.priceEach != null ? String(p.priceEach) : null,
      imageUrl: p.image,
      flavors: JSON.stringify(p.flavors ?? []),
      tags: JSON.stringify(p.tags ?? []),
      featured: p.featured ?? false,
      isActive: true,
    }).onConflictDoNothing()
  }

  console.log(`Seeded ${all.length} products.`)
  await client.end()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
