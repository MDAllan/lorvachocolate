/**
 * Seed site content rows from current hardcoded values.
 * Run once: npx tsx lib/db/seed-content.ts
 */
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { siteContent } from './schema'

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle(client)

const CONTENT = [
  // ── Hero ────────────────────────────────────────────────────────────────────
  { key: 'hero_eyebrow',    value: 'Lorva · Fine Chocolate',                                         label: 'Eyebrow',              section: 'hero' },
  { key: 'hero_headline_1', value: 'Made Purely,',                                                   label: 'Headline Line 1',      section: 'hero' },
  { key: 'hero_headline_2', value: 'Crafted Beautifully.',                                           label: 'Headline Line 2 (gold)',section: 'hero' },
  { key: 'hero_subtext',    value: 'Handcrafted bonbons and confections made with intention.',        label: 'Supporting Text',      section: 'hero' },

  // ── Featured Products ────────────────────────────────────────────────────────
  { key: 'featured_eyebrow',  value: 'Bonbon Collections',   label: 'Eyebrow',   section: 'featured' },
  { key: 'featured_headline', value: 'Crafted to Perfection', label: 'Headline',  section: 'featured' },

  // ── Brand Manifesto ──────────────────────────────────────────────────────────
  { key: 'manifesto_eyebrow',      value: 'The Lorva Standard',      label: 'Eyebrow',                    section: 'manifesto' },
  { key: 'manifesto_headline_1',   value: 'Chocolate is not a product.', label: 'Headline Line 1',         section: 'manifesto' },
  { key: 'manifesto_headline_2',   value: 'It is a memory',          label: 'Headline Line 2 (gold)',      section: 'manifesto' },
  { key: 'manifesto_headline_3',   value: 'before it is ever tasted.', label: 'Headline Line 3',           section: 'manifesto' },
  { key: 'manifesto_body_1',       value: 'Every Lorva bonbon begins not at a workbench, but in a conversation — about who the recipient is, what the occasion holds, and what feeling should linger after the last piece is gone.', label: 'First Paragraph', section: 'manifesto' },
  { key: 'manifesto_body_2',       value: 'We work in small batches. We do not rush temper. We do not compromise ganache ratios for shelf life. What you receive is exactly what we would keep for ourselves.', label: 'Second Paragraph', section: 'manifesto' },
  { key: 'manifesto_quote',      value: 'Handcrafted in Canada. Gifted worldwide.', label: 'Closing Quote',   section: 'manifesto' },
  { key: 'manifesto_image_1',   value: '/generated/bonbon-dark-rose.png',          label: 'Slideshow Image 1', section: 'manifesto' },
  { key: 'manifesto_image_2',   value: '/generated/bonbon-cherry-heart.png',       label: 'Slideshow Image 2', section: 'manifesto' },
  { key: 'manifesto_image_3',   value: '/generated/bonbon-pistachio.png',          label: 'Slideshow Image 3', section: 'manifesto' },

  // ── Craft Process ────────────────────────────────────────────────────────────
  { key: 'process_eyebrow',      value: 'The Process',          label: 'Eyebrow',                  section: 'process' },
  { key: 'process_headline_1',   value: 'From raw cacao',       label: 'Headline Line 1',           section: 'process' },
  { key: 'process_headline_2',   value: 'to finished piece.',   label: 'Headline Line 2 (accent)', section: 'process' },
  { key: 'process_step_1_title', value: 'Couverture Selection', label: 'Step 1 Title',              section: 'process' },
  { key: 'process_step_1_body',  value: 'We source single-origin couverture chocolate with a minimum 64% cacao. Each batch is chosen for terroir, not price.', label: 'Step 1 Description', section: 'process' },
  { key: 'process_step_1_image', value: '/gallery/ingredient-callebaut-823-milk.jpg', label: 'Step 1 Image', section: 'process' },
  { key: 'process_step_2_title', value: 'Hand-Tempered Shells', label: 'Step 2 Title',              section: 'process' },
  { key: 'process_step_2_body',  value: 'Shells are tempered by hand to 31.5°C. No shortcuts. The snap, the sheen, and the melt are all a consequence of this single step.', label: 'Step 2 Description', section: 'process' },
  { key: 'process_step_2_image', value: '/gallery/process-caramel-filling.jpg',       label: 'Step 2 Image', section: 'process' },
  { key: 'process_step_3_title', value: 'Ganache & Fill',       label: 'Step 3 Title',              section: 'process' },
  { key: 'process_step_3_body',  value: 'Fillings are made fresh: infused creams, fruit purées, and spiced caramels. Nothing is premade. Nothing is frozen.', label: 'Step 3 Description', section: 'process' },
  { key: 'process_step_3_image', value: '/gallery/process-matcha-piping.jpg',         label: 'Step 3 Image', section: 'process' },
  { key: 'process_step_4_title', value: 'Sealed & Set',         label: 'Step 4 Title',              section: 'process' },
  { key: 'process_step_4_body',  value: 'Each piece is sealed, set at precise humidity, and inspected before it is placed in the box.', label: 'Step 4 Description', section: 'process' },
  { key: 'process_step_4_image', value: '/gallery/truffle-dark-hazelnut-filling.jpg', label: 'Step 4 Image', section: 'process' },

  // ── Gallery Teaser ───────────────────────────────────────────────────────────
  { key: 'gallery_eyebrow',    value: 'Our Work',       label: 'Eyebrow',                  section: 'gallery' },
  { key: 'gallery_headline_1', value: 'A glimpse into', label: 'Headline Line 1',           section: 'gallery' },
  { key: 'gallery_headline_2', value: 'the studio.',    label: 'Headline Line 2 (accent)',  section: 'gallery' },
  { key: 'gallery_image_1',    value: '/gallery/chocolates-ruby-hearts.jpg',           label: 'Gallery Image 1', section: 'gallery' },
  { key: 'gallery_image_2',    value: '/gallery/truffle-rose-caramel-filling.png',     label: 'Gallery Image 2', section: 'gallery' },
  { key: 'gallery_image_3',    value: '/gallery/chocolates-emerald-dome.jpg',          label: 'Gallery Image 3', section: 'gallery' },
  { key: 'gallery_image_4',    value: '/gallery/breakable-heart-white-gold-leaf.jpg',  label: 'Gallery Image 4', section: 'gallery' },
  { key: 'gallery_image_5',    value: '/gallery/chocolates-roses-multicolor.jpg',      label: 'Gallery Image 5', section: 'gallery' },
  { key: 'gallery_image_6',    value: '/gallery/diamond-hearts-dark.jpg',              label: 'Gallery Image 6', section: 'gallery' },
  { key: 'gallery_image_7',    value: '/gallery/chocolates-matcha-pistachio-tray.png', label: 'Gallery Image 7', section: 'gallery' },
  { key: 'gallery_image_8',    value: '/gallery/truffle-pistachio-dome-filling.webp',  label: 'Gallery Image 8', section: 'gallery' },

  // ── Services ─────────────────────────────────────────────────────────────────
  { key: 'services_eyebrow',  value: 'For Every Occasion',        label: 'Eyebrow',   section: 'services' },
  { key: 'services_headline', value: 'A gift worth remembering.', label: 'Headline',  section: 'services' },
  { key: 'services_1_title',  value: 'Wedding & Birthday Favours', label: 'Service 1 Title',       section: 'services' },
  { key: 'services_1_desc',   value: 'Custom-packaged mini boxes for your special day. Personalised tags, themed colours, and minimum order options for any event size.', label: 'Service 1 Description', section: 'services' },
  { key: 'services_1_cta',    value: 'Plan Your Favours',          label: 'Service 1 CTA',         section: 'services' },
  { key: 'services_1_href',   value: '/favors',                    label: 'Service 1 Link URL',    section: 'services' },
  { key: 'services_2_title',  value: 'Breakable Hearts & Balls',   label: 'Service 2 Title',       section: 'services' },
  { key: 'services_2_desc',   value: 'Choose your shell, pick your fillings, and tuck a surprise inside. A theatrical chocolate experience your recipient will never forget.', label: 'Service 2 Description', section: 'services' },
  { key: 'services_2_cta',    value: 'Build Yours',                label: 'Service 2 CTA',         section: 'services' },
  { key: 'services_2_href',   value: '/breakable',                 label: 'Service 2 Link URL',    section: 'services' },
  { key: 'services_3_title',  value: 'Business Collaborations',    label: 'Service 3 Title',       section: 'services' },
  { key: 'services_3_desc',   value: 'Coffee shops, boutiques, and event venues — carry Lorva at your location. Wholesale pricing and co-branding options available.', label: 'Service 3 Description', section: 'services' },
  { key: 'services_3_cta',    value: 'Work With Us',               label: 'Service 3 CTA',         section: 'services' },
  { key: 'services_3_href',   value: '/contact',                   label: 'Service 3 Link URL',    section: 'services' },

  // ── Navigation ────────────────────────────────────────────────────────────────
  { key: 'nav_link_1_label', value: 'Shop',             label: 'Link 1 Label', section: 'navigation' },
  { key: 'nav_link_1_href',  value: '/products',        label: 'Link 1 URL',   section: 'navigation' },
  { key: 'nav_link_2_label', value: 'Gallery',          label: 'Link 2 Label', section: 'navigation' },
  { key: 'nav_link_2_href',  value: '/gallery',         label: 'Link 2 URL',   section: 'navigation' },
  { key: 'nav_link_3_label', value: 'Favors',           label: 'Link 3 Label', section: 'navigation' },
  { key: 'nav_link_3_href',  value: '/favors',          label: 'Link 3 URL',   section: 'navigation' },
  { key: 'nav_link_4_label', value: 'Breakable Hearts', label: 'Link 4 Label', section: 'navigation' },
  { key: 'nav_link_4_href',  value: '/breakable',       label: 'Link 4 URL',   section: 'navigation' },
  { key: 'nav_link_5_label', value: 'Contact',          label: 'Link 5 Label', section: 'navigation' },
  { key: 'nav_link_5_href',  value: '/contact',         label: 'Link 5 URL',   section: 'navigation' },
  { key: 'nav_cta_label',    value: 'Order Now',        label: 'CTA Button',   section: 'navigation' },

  // ── Footer ────────────────────────────────────────────────────────────────────
  { key: 'footer_tagline',          value: "Crafted slowly. Savored deeply.\nPremium artisan chocolate made with intention.", label: 'Tagline',                  section: 'footer' },
  { key: 'footer_instagram_url',    value: 'https://instagram.com',  label: 'Instagram URL',            section: 'footer' },
  { key: 'footer_tiktok_url',       value: 'https://tiktok.com',     label: 'TikTok URL',               section: 'footer' },
  { key: 'footer_contact_blurb',    value: 'Order via WhatsApp for the fastest response. We respond same-day.', label: 'Contact Description', section: 'footer' },
  { key: 'footer_copyright',        value: 'Lorva Fine Chocolate. All rights reserved.', label: 'Copyright Text',          section: 'footer' },
  { key: 'footer_whatsapp_message', value: "Hi Lorva! I'd love to place an order.", label: 'WhatsApp Default Message', section: 'footer' },
  { key: 'contact_whatsapp',        value: '1XXXXXXXXXX',            label: 'WhatsApp Number',          section: 'footer' },

  // ── Footer Quick Links ────────────────────────────────────────────────────────
  { key: 'footer_link_1_label', value: 'Shop',             label: 'Quick Link 1 Label', section: 'footer' },
  { key: 'footer_link_1_href',  value: '/products',        label: 'Quick Link 1 URL',   section: 'footer' },
  { key: 'footer_link_2_label', value: 'Favors & Gifts',   label: 'Quick Link 2 Label', section: 'footer' },
  { key: 'footer_link_2_href',  value: '/favors',          label: 'Quick Link 2 URL',   section: 'footer' },
  { key: 'footer_link_3_label', value: 'Breakable Hearts', label: 'Quick Link 3 Label', section: 'footer' },
  { key: 'footer_link_3_href',  value: '/breakable',       label: 'Quick Link 3 URL',   section: 'footer' },
  { key: 'footer_link_4_label', value: 'Contact Us',       label: 'Quick Link 4 Label', section: 'footer' },
  { key: 'footer_link_4_href',  value: '/contact',         label: 'Quick Link 4 URL',   section: 'footer' },

  // ── SEO & Metadata ────────────────────────────────────────────────────────────
  { key: 'seo_site_name',             value: 'LORVA Fine Chocolate',     label: 'Site Name (used in all page titles)', section: 'seo' },
  { key: 'seo_site_description',      value: 'Handcrafted artisan chocolate — bonbons, breakable hearts, wedding favours, and custom gift boxes. Available in 12pc & 16pc.', label: 'Default Description (all pages)', section: 'seo' },
  { key: 'seo_home_title',            value: 'LORVA Fine Chocolate',     label: 'Home Page Title',            section: 'seo' },
  { key: 'seo_home_description',      value: 'Handcrafted artisan chocolate — bonbons, breakable hearts, wedding favours, and custom gift boxes. Available in 12pc & 16pc.', label: 'Home Page Description', section: 'seo' },
  { key: 'seo_products_title',        value: 'Bonbons Collection',       label: 'Products Page Title',        section: 'seo' },
  { key: 'seo_products_description',  value: 'Browse our handcrafted bonbon collections and chocolate bars. Classic, Special, and Premium — assembled to order in 12 pc or 16 pc boxes.', label: 'Products Page Description', section: 'seo' },
  { key: 'seo_gallery_title',         value: 'Gallery',                  label: 'Gallery Page Title',         section: 'seo' },
  { key: 'seo_gallery_description',   value: 'A look at our handcrafted chocolates — bonbons, breakable hearts, wedding favours, and more.', label: 'Gallery Page Description', section: 'seo' },
  { key: 'seo_contact_title',         value: 'Contact',                  label: 'Contact Page Title',         section: 'seo' },
  { key: 'seo_contact_description',   value: 'Reach us by WhatsApp or contact form. We respond same-day.', label: 'Contact Page Description', section: 'seo' },
  { key: 'seo_favors_title',          value: 'Wedding & Birthday Favours', label: 'Favors Page Title',        section: 'seo' },
  { key: 'seo_favors_description',    value: 'Custom chocolate favour boxes for weddings, birthdays, and events. Personalised packaging and minimum order options.', label: 'Favors Page Description', section: 'seo' },
  { key: 'seo_breakable_title',       value: 'Breakable Hearts & Balls', label: 'Breakable Page Title',       section: 'seo' },
  { key: 'seo_breakable_description', value: 'Design your own breakable chocolate heart or ball. Choose your shell, fillings, and what goes inside — a theatrical chocolate gift experience.', label: 'Breakable Page Description', section: 'seo' },

  // ── CTA ───────────────────────────────────────────────────────────────────────
  { key: 'cta_eyebrow',    value: 'Ready to Order', label: 'Eyebrow',                   section: 'cta' },
  { key: 'cta_headline_1', value: 'Every piece,',   label: 'Headline Line 1',           section: 'cta' },
  { key: 'cta_headline_2', value: 'made for you.',  label: 'Headline Line 2 (italic)',  section: 'cta' },
  { key: 'cta_subtext',    value: 'No payment required online. Order via form or WhatsApp — we confirm details and arrange pickup personally.', label: 'Supporting Text', section: 'cta' },
]

async function main() {
  console.log('Seeding site content…')
  for (const row of CONTENT) {
    await db.insert(siteContent).values(row).onConflictDoNothing()
  }
  console.log(`Seeded ${CONTENT.length} content rows.`)
  await client.end()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
