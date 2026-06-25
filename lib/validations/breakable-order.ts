import { z } from 'zod'

export const breakableOrderSchema = z.object({
  shape: z.enum(['heart', 'ball'], { required_error: 'Please select a shape' }),
  shellFlavor: z.enum(['dark', 'milk', 'white'], { required_error: 'Please select a shell' }),
  occasion: z.string().min(1, 'Please select an occasion'),
  occasionOther: z.string().max(200).optional(),
  comment: z.string().max(300).optional(),
  fillings: z.array(z.string()).max(3).optional().default([]),
  dropOffItems: z.boolean().optional(),
  dropOffDescription: z.string().max(500).optional(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number is required'),
  quantity: z.coerce.number().min(1).max(20),
  notes: z.string().max(400).optional(),
})

export type BreakableOrderValues = z.infer<typeof breakableOrderSchema>
