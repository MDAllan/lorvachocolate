import { z } from 'zod'

export const favorInquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number is required'),
  eventType: z.enum(['wedding', 'birthday', 'anniversary', 'corporate', 'other'], {
    required_error: 'Please select an event type',
  }),
  eventDate: z.string().min(1, 'Event date is required'),
  guestCount: z.coerce.number().min(1, 'Guest count is required'),
  theme: z.string().optional(),
  dietary: z.string().optional(),
  notes: z.string().max(800).optional(),
})

export type FavorInquiryValues = z.infer<typeof favorInquirySchema>
