export type GalleryMeta = {
  title: string
  flavor: string
  shell: string
  type: 'bonbon' | 'breakable-heart' | 'smash-box' | 'favor' | 'assorted'
}

export const GALLERY_META: Record<string, GalleryMeta> = {
  'chocolates-assorted-tray.jpg': {
    title: 'The Full Collection',
    flavor: 'Assorted artisan flavours',
    shell: 'Dark · Milk · White',
    type: 'assorted',
  },
  'chocolates-orange-tiger-tray.png': {
    title: 'Orange Noir Zest',
    flavor: 'Natural orange zest ganache',
    shell: 'Dark shell',
    type: 'bonbon',
  },
  'chocolates-matcha-pistachio-tray.png': {
    title: 'Pistachio Royale',
    flavor: 'Real pistachio cream filling',
    shell: 'White shell',
    type: 'bonbon',
  },
  'chocolates-daisy-gift-silver-tray.jpg': {
    title: 'Gift Collection',
    flavor: 'Mixed occasions & custom shapes',
    shell: 'White · Milk',
    type: 'assorted',
  },
  'chocolates-dark-rose-truffles.png': {
    title: 'Dark Silk',
    flavor: 'Deep cocoa ganache',
    shell: 'Dark shell',
    type: 'bonbon',
  },
  'chocolates-emerald-dome.jpg': {
    title: 'Espresso Noir',
    flavor: 'Bold espresso ganache with coffee syrup',
    shell: 'Dark shell',
    type: 'bonbon',
  },
  'chocolates-ruby-hearts.jpg': {
    title: 'Cherry Blush',
    flavor: 'Cherry-infused pink ganache',
    shell: 'White shell',
    type: 'bonbon',
  },
  'chocolates-red-flower-heart.png': {
    title: 'Cherry Blush',
    flavor: 'Cherry-infused floral filling',
    shell: 'White shell',
    type: 'bonbon',
  },
  'chocolates-roses-multicolor.jpg': {
    title: 'Premium Collection',
    flavor: 'Assorted premium flavours',
    shell: 'White · Dark · Milk',
    type: 'assorted',
  },
  'diamond-hearts-dark.jpg': {
    title: 'Hazelnut Crunch Noir',
    flavor: 'Roasted hazelnut with crunch',
    shell: 'Dark shell',
    type: 'bonbon',
  },
  'diamond-hearts-dark-cherry-filling.jpg': {
    title: 'Cherry Balsamic Noir',
    flavor: 'Sweet-tart cherry balsamic ganache',
    shell: 'Dark shell',
    type: 'bonbon',
  },
  'breakable-heart-class-of-2026.png': {
    title: 'Class of 2026',
    flavor: 'Graduation celebration',
    shell: 'Dark shell',
    type: 'breakable-heart',
  },
  'breakable-heart-gender-reveal-white.jpg': {
    title: 'Gender Reveal',
    flavor: 'Boy or Girl surprise gift',
    shell: 'White shell',
    type: 'breakable-heart',
  },
  'breakable-heart-white-gold-leaf.jpg': {
    title: 'Golden Occasion',
    flavor: 'Gold leaf luxury presentation',
    shell: 'White shell',
    type: 'breakable-heart',
  },
  'breakable-heart-milk-love-you.jpg': {
    title: 'I Love You',
    flavor: 'A gift straight from the heart',
    shell: 'Milk shell',
    type: 'breakable-heart',
  },
  'smash-box-pink.jpg': {
    title: 'Money Smash Box',
    flavor: 'Surprise gift with chocolate shards',
    shell: 'White · Pink',
    type: 'smash-box',
  },
  'chocolates-hearts-favor-boxes.jpg': {
    title: 'Wedding Favours',
    flavor: 'Ruby & gold heart bonbons',
    shell: 'White · Dark',
    type: 'favor',
  },
  'chocolates-black-box-6pc.png': {
    title: 'Luxury Gift Box',
    flavor: 'Hand-picked premium selection',
    shell: 'Dark · White',
    type: 'assorted',
  },
  'graduation-chocolates-purple-gold.png': {
    title: 'Class of 2026',
    flavor: 'Graduation congratulations',
    shell: 'Dark shell',
    type: 'breakable-heart',
  },
  'chocolates-milk-dome-bonbons.jpg': {
    title: 'Milky Silky',
    flavor: 'Rich milk chocolate ganache',
    shell: 'Milk shell',
    type: 'bonbon',
  },
  'truffle-cherry-heart-filling.png': {
    title: 'Cherry Blush',
    flavor: 'Cherry-filled white chocolate heart',
    shell: 'White shell',
    type: 'bonbon',
  },
  'truffle-pistachio-dome-filling.webp': {
    title: 'Pistachio Royale',
    flavor: 'Real pistachio cream · whole nut inside',
    shell: 'White shell',
    type: 'bonbon',
  },
  'truffle-rose-caramel-filling.png': {
    title: 'Caramel Fleur Sea Salt',
    flavor: 'Luscious salted caramel filling',
    shell: 'Milk shell',
    type: 'bonbon',
  },
  'truffle-ruby-mango-filling.jpg': {
    title: 'Ruby Mango',
    flavor: 'Mango-filled ruby chocolate dome',
    shell: 'Ruby shell',
    type: 'bonbon',
  },
  'chocolates-black-white-diamond-truffles.jpg': {
    title: 'Dark Silk',
    flavor: 'Intense dark cocoa ganache',
    shell: 'Dark · White',
    type: 'bonbon',
  },
}
