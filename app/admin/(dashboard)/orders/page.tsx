import { db } from '@/lib/db/client'
import { orderRequests } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { OrdersTable } from '@/components/admin/orders-table'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Orders | Admin' }

export default async function AdminOrdersPage() {
  const orders = await db.select().from(orderRequests).orderBy(desc(orderRequests.createdAt))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cormorant text-3xl text-deep-cocoa">Orders</h1>
        <p className="font-inter text-sm text-taupe mt-1">
          Customer orders submitted through your website.
        </p>
      </div>
      <OrdersTable orders={orders} />
    </div>
  )
}
