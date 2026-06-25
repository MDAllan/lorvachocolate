/**
 * Seed gallery images from public/gallery/ into the database.
 * Run once: npx tsx lib/db/seed-gallery.ts
 */
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { galleryImages } from './schema'

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle(client)

const images = [
  { file: 'chocolates-assorted-tray.jpg',              alt: 'A colourful assortment of artisan chocolates on a gold tray' },
  { file: 'chocolates-orange-tiger-tray.png',          alt: 'Tiger-striped orange spheres and dark hearts on a gold tray' },
  { file: 'chocolates-matcha-pistachio-tray.png',      alt: 'Matcha pistachio hearts and rounds on a gold tray' },
  { file: 'chocolates-daisy-gift-silver-tray.jpg',     alt: 'Daisy and gift-box shaped chocolates on a silver tray' },
  { file: 'chocolates-dark-rose-truffles.png',         alt: 'Dark chocolate rose truffles arranged in rows' },
  { file: 'chocolates-emerald-dome.jpg',               alt: 'Emerald swirl dome bonbons on white marble' },
  { file: 'chocolates-ruby-hearts.jpg',                alt: 'Glossy ruby-red heart bonbons' },
  { file: 'chocolates-red-flower-heart.png',           alt: 'Red flower and heart bonbons on marble' },
  { file: 'chocolates-roses-multicolor.jpg',           alt: 'Rose-shaped bonbons in white, pink, red, purple and black' },
  { file: 'diamond-hearts-dark.jpg',                   alt: 'Geometric dark chocolate diamond hearts with mould' },
  { file: 'diamond-hearts-dark-cherry-filling.jpg',    alt: 'Dark chocolate diamond hearts with cherry filling cross-section' },
  { file: 'breakable-heart-class-of-2026.png',         alt: 'Class of 2026 navy blue breakable chocolate heart' },
  { file: 'breakable-heart-gender-reveal-white.jpg',   alt: 'Girl or Boy gender reveal white breakable chocolate heart' },
  { file: 'breakable-heart-white-gold-leaf.jpg',       alt: 'White chocolate breakable heart with gold leaf in gift box' },
  { file: 'breakable-heart-milk-love-you.jpg',         alt: 'I Love You milk chocolate breakable heart in red gift box' },
  { file: 'smash-box-pink.jpg',                        alt: 'Pink chocolate smash box with chocolate shards and money rolls' },
  { file: 'chocolates-hearts-favor-boxes.jpg',         alt: 'Wedding favour boxes with ruby and gold hearts' },
  { file: 'chocolates-black-box-6pc.png',              alt: 'Luxury 6-piece black gift box with gold and dark bonbons' },
  { file: 'graduation-chocolates-purple-gold.png',     alt: 'Purple and gold graduation chocolates — Class of 2026 congratulations' },
  { file: 'chocolates-milk-dome-bonbons.jpg',          alt: 'Glossy milk chocolate dome bonbons on white marble' },
  { file: 'truffle-cherry-heart-filling.png',          alt: 'Cherry-filled white chocolate heart bonbon, cross-section' },
  { file: 'truffle-pistachio-dome-filling.webp',       alt: 'Pistachio dome bonbon with whole pistachio inside, cross-section' },
  { file: 'truffle-rose-caramel-filling.png',          alt: 'Rose-shaped truffle with salted caramel filling, cross-section' },
  { file: 'truffle-ruby-mango-filling.jpg',            alt: 'Ruby chocolate dome with mango filling, cross-section' },
  { file: 'chocolates-black-white-diamond-truffles.jpg', alt: 'Black and white diamond truffles with gold leaf in clear box' },
]

async function main() {
  console.log('Seeding gallery images…')

  for (let i = 0; i < images.length; i++) {
    const { file, alt } = images[i]
    const url = `/gallery/${file}`
    await db.insert(galleryImages).values({
      url,
      storagePath: url,
      altText: alt,
      sortOrder: i,
      isActive: true,
    }).onConflictDoNothing()
  }

  console.log(`Seeded ${images.length} gallery images.`)
  await client.end()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
