'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { orderRequests } from '@/lib/db/schema'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error('Unauthorized')
  return session
}

export async function updateOrderStatus(id: string, status: string) {
  await requireAdmin()
  await db.update(orderRequests)
    .set({ status, updatedAt: new Date() })
    .where(eq(orderRequests.id, id))
  revalidatePath('/admin/orders')
  return { success: true }
}

export async function submitOrderRequest(data: {
  customerName: string
  customerEmail?: string
  customerPhone?: string
  productInterest?: string
  boxSize?: string
  quantity?: number
  notes?: string
}) {
  await db.insert(orderRequests).values({
    customerName: data.customerName,
    customerEmail: data.customerEmail ?? null,
    customerPhone: data.customerPhone ?? null,
    productInterest: data.productInterest ?? null,
    boxSize: data.boxSize ?? null,
    quantity: data.quantity ?? 1,
    notes: data.notes ?? null,
    status: 'new',
  })
  revalidatePath('/admin/orders')
  return { success: true }
}
