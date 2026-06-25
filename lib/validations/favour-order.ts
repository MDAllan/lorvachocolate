import { z } from 'zod'

const bonbonSlotSchema = z.object({
  shape: z.enum(['heart', 'round', 'square', 'dome'], { required_error: 'Please select a shape' }),
  flavorSlug: z.string().min(1, 'Please select a flavour'),
})

export const favourOrderSchema = z.object({
  occasion: z.string().min(1, 'Please select an occasion'),
  occasionOther: z.string().max(100).optional(),
  numberOfBoxes: z.coerce.number().min(20, 'Minimum order is 20 boxes').max(2000),
  bonbonsPerBox: z.enum(['1', '2', '4']),
  bonbons: z.array(bonbonSlotSchema).min(1).max(4),
  colorTheme: z.string().min(5, 'Please describe your colour theme'),
  inspirationImageBase64: z.string().optional(),
  dietary: z.string().max(200).optional(),
  notes: z.string().max(400).optional(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number is required'),
  eventDate: z.string().min(1, 'Please select your event date'),
})

export type FavourOrderValues = z.infer<typeof favourOrderSchema>
