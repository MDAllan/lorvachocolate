import { z } from 'zod'

export const orderSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number is required'),
  product: z.string().min(1, 'Please select a product'),
  boxSize: z.enum(['12pc', '16pc'], { required_error: 'Please select a box size' }),
  quantity: z.coerce.number().min(1, 'Minimum 1 box').max(50),
  occasion: z.string().optional(),
  pickupOrDelivery: z.enum(['pickup', 'delivery'], { required_error: 'Please choose pickup or delivery' }),
  notes: z.string().max(500).optional(),
})

export type OrderFormValues = z.infer<typeof orderSchema>
