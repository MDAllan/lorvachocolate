export type ProductCategory = 'bonbons' | 'bars'

export interface Product {
  id: string
  name: string
  description: string
  flavors?: string[]
  category: ProductCategory
  // Bonbon boxes
  price12?: number
  price16?: number
  // Bars (single price per item)
  priceEach?: number
  image: string
  tags: string[]
  featured?: boolean
}

export const bonbons: Product[] = [
  {
    id: 'classic-collection',
    name: 'Classic Collection',
    description:
      'Three timeless flavours in smooth milk and dark chocolate shells. A perfect introduction to Lorva.',
    flavors: ['Vanilla Crème', 'Milky Silky', 'Dark Silk'],
    category: 'bonbons',
    price12: 30,
    price16: 40,
    image: '/products/classic-collection.jpg',
    tags: ['classic', 'milk-chocolate', 'dark-chocolate'],
    featured: true,
  },
  {
    id: 'special-collection',
    name: 'Special Collection',
    description:
      'Bold, indulgent flavours for adventurous palates. Nutty, caramel, and coffee-forward profiles.',
    flavors: ['Peanut Butter Praline', 'Espresso Noir', 'Caramel Fleur Sea Salt'],
    category: 'bonbons',
    price12: 33,
    price16: 44,
    image: '/products/special-collection.jpg',
    tags: ['special', 'caramel', 'espresso'],
    featured: true,
  },
  {
    id: 'premium-collection',
    name: 'Premium Collection',
    description:
      'Five exceptional flavours for the true connoisseur. Fruit-forward, nutty, and sophisticated profiles.',
    flavors: [
      'Cherry Blush',
      'Orange Noir Zest',
      'Pistachio Royale',
      'Hazelnut Crunch Noir',
      'Cherry Balsamic Noir',
    ],
    category: 'bonbons',
    price12: 36,
    price16: 48,
    image: '/products/premium-collection.jpg',
    tags: ['premium', 'fruit', 'pistachio', 'hazelnut'],
    featured: true,
  },
]

export const bars: Product[] = [
  {
    id: 'milk-silk-bar',
    name: 'Milk Silk Bar',
    description: 'Creamy milk chocolate filled bar with a smooth, melt-in-your-mouth finish.',
    category: 'bars',
    priceEach: 6,
    image: '/products/milk-silk-bar.jpg',
    tags: ['bars', 'milk-chocolate'],
  },
  {
    id: 'dark-intense-bar',
    name: 'Dark Intense Bar',
    description: 'Bold dark chocolate filled bar with deep cocoa richness and a clean snap.',
    category: 'bars',
    priceEach: 7,
    image: '/products/dark-intense-bar.jpg',
    tags: ['bars', 'dark-chocolate'],
  },
  {
    id: 'white-velvet-bar',
    name: 'White Velvet Bar',
    description: 'Silky white chocolate filled bar with a soft vanilla cream profile.',
    category: 'bars',
    priceEach: 7.5,
    image: '/products/white-velvet-bar.jpg',
    tags: ['bars', 'white-chocolate'],
  },
  {
    id: 'ruby-rouge-bar',
    name: 'Ruby Rouge Bar',
    description: 'Single origin ruby chocolate bar with natural berry notes and a vibrant finish.',
    category: 'bars',
    priceEach: 12,
    image: '/products/ruby-rouge-bar.jpg',
    tags: ['bars', 'ruby', 'premium'],
  },
]

export const allProducts: Product[] = [...bonbons, ...bars]

export function getFeaturedProducts(): Product[] {
  return bonbons.filter((p) => p.featured)
}
