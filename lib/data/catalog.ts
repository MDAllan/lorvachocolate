export type BonbonFlavor = {
  slug: string
  name: string
  description: string
  img?: string
  tags?: string[]
}

export type BonbonCollection = {
  slug: string
  name: string
  tier: 'classic' | 'special' | 'premium'
  price12: number
  price16: number
  flavors: BonbonFlavor[]
}

export type ChocolateBar = {
  slug: string
  name: string
  description: string
  price: number
}

export const BONBON_COLLECTIONS: BonbonCollection[] = [
  {
    slug: 'classic',
    name: 'Classic Collection',
    tier: 'classic',
    price12: 30,
    price16: 40,
    flavors: [
      {
        slug: 'vanilla-creme',
        name: 'Vanilla Crème',
        description: 'Smooth vanilla ganache wrapped in milk chocolate for a timeless, creamy finish.',
        img: '/bonbons/vanilla-creme.jpg',
        tags: ['Milk shell', 'Vanilla'],
      },
      {
        slug: 'milky-silky',
        name: 'Milky Silky',
        description: 'Rich milk chocolate ganache with an authentic cocoa profile in a semi-dark chocolate shell.',
        img: '/bonbons/milky-silky.jpg',
        tags: ['Milk shell', 'Classic'],
      },
      {
        slug: 'dark-silk',
        name: 'Dark Silk',
        description: 'Rich dark chocolate ganache with deep cocoa notes in a dark chocolate shell.',
        img: '/bonbons/dark-silk.jpg',
        tags: ['Dark shell', 'Intense'],
      },
    ],
  },
  {
    slug: 'special',
    name: 'Special Collection',
    tier: 'special',
    price12: 33,
    price16: 44,
    flavors: [
      {
        slug: 'peanut-butter-praline',
        name: 'Peanut Butter Praline',
        description: 'Creamy peanut butter blended with silky chocolate for a smooth, nutty indulgence.',
        img: '/bonbons/peanut-butter-praline.jpg',
        tags: ['Milk shell', 'Nutty'],
      },
      {
        slug: 'espresso-noir',
        name: 'Espresso Noir',
        description: 'Coffee ganache infused with espresso syrup for a bold, bittersweet bite.',
        img: '/bonbons/espresso-noir.jpg',
        tags: ['Dark shell', 'Coffee', 'Bold'],
      },
      {
        slug: 'caramel-fleur-sea-salt',
        name: 'Caramel Fleur Sea Salt',
        description: 'Luscious caramel enhanced with sea salt for a warm, lingering sweetness.',
        img: '/bonbons/caramel-fleur-sea-salt.jpg',
        tags: ['Milk shell', 'Caramel', 'Sea salt'],
      },
    ],
  },
  {
    slug: 'premium',
    name: 'Premium Collection',
    tier: 'premium',
    price12: 36,
    price16: 48,
    flavors: [
      {
        slug: 'cherry-blush',
        name: 'Cherry Blush',
        description: 'White chocolate bonbon with a cherry-infused pink center, for a soft, fruity finish.',
        img: '/bonbons/cherry-blush.jpg',
        tags: ['White shell', 'Cherry', 'Fruity'],
      },
      {
        slug: 'orange-noir-zest',
        name: 'Orange Noir Zest',
        description: 'Dark chocolate ganache brightened with natural orange zest for a refined citrus finish.',
        img: '/bonbons/orange-noir-zest.jpg',
        tags: ['Dark shell', 'Citrus'],
      },
      {
        slug: 'pistachio-royale',
        name: 'Pistachio Royale',
        description: 'Real pistachio blended into a creamy filling for a rich, nutty elegance.',
        img: '/bonbons/pistachio-royale.jpg',
        tags: ['Pistachio', 'Nutty'],
      },
      {
        slug: 'hazelnut-crunch-noir',
        name: 'Hazelnut Crunch Noir',
        description: 'Roasted hazelnut with a crunch folded into dark chocolate for layered texture.',
        img: '/bonbons/hazelnut-crunch-noir.jpg',
        tags: ['Dark shell', 'Hazelnut', 'Crunchy'],
      },
      {
        slug: 'cherry-balsamic-noir',
        name: 'Cherry Balsamic Noir',
        description: 'Sophisticated sweet-tart balance meets dark chocolate for a complex, refined bite.',
        img: '/bonbons/cherry-balsamic-noir.jpg',
        tags: ['Dark shell', 'Cherry', 'Complex'],
      },
    ],
  },
]

export const CHOCOLATE_BARS: ChocolateBar[] = [
  {
    slug: 'milk-silk-bar',
    name: 'Milk Silk Bar',
    description: 'Creamy milk chocolate filled bar with a smooth, melt-in-your-mouth finish.',
    price: 12,
  },
  {
    slug: 'dark-intense-bar',
    name: 'Dark Intense Bar',
    description: 'Bold dark chocolate filled bar with deep cocoa richness and a clean snap.',
    price: 13,
  },
  {
    slug: 'white-velvet-bar',
    name: 'White Velvet Bar',
    description: 'Silky white chocolate filled bar with a soft vanilla cream profile.',
    price: 13,
  },
  {
    slug: 'ruby-rouge-bar',
    name: 'Ruby Rouge Bar',
    description: 'Single origin ruby chocolate bar with natural berry notes and a vibrant finish.',
    price: 18,
  },
]
