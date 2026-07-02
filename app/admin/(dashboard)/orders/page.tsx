import { db } from '@/lib/db/client'
import { orderRequests, orderCostOverrides, recipes } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { OrdersTable } from '@/components/admin/orders-table'
import { computeAverageMargin } from '@/lib/utils/profit'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Orders | Admin' }

export default async function AdminOrdersPage() {
  const [rawOrders, allRecipes] = await Promise.all([
    db
      .select({
        id: orderRequests.id,
        customerName: orderRequests.customerName,
        customerEmail: orderRequests.customerEmail,
        customerPhone: orderRequests.customerPhone,
        productInterest: orderRequests.productInterest,
        boxSize: orderRequests.boxSize,
        quantity: orderRequests.quantity,
        notes: orderRequests.notes,
        total: orderRequests.total,
        status: orderRequests.status,
        orderType: orderRequests.orderType,
        createdAt: orderRequests.createdAt,
        computedCost: orderCostOverrides.computedCost,
        manualCost: orderCostOverrides.manualCost,
      })
      .from(orderRequests)
      .leftJoin(orderCostOverrides, eq(orderCostOverrides.orderRequestId, orderRequests.id))
      .orderBy(desc(orderRequests.createdAt)),
    db.select({ id: recipes.id, name: recipes.name }).from(recipes),
  ])

  const orders = rawOrders.map(o => ({
    ...o,
    cost: (o.computedCost !== null || o.manualCost !== null)
      ? { computedCost: o.computedCost, manualCost: o.manualCost }
      : null,
  }))

  const avgMargin = computeAverageMargin(
    orders
      .filter(o => o.status === 'completed')
      .map(o => ({ total: o.total, computedCost: o.cost?.computedCost ?? null, manualCost: o.cost?.manualCost ?? null }))
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cormorant text-3xl text-deep-cocoa">Orders</h1>
        <p className="font-inter text-sm text-taupe mt-1">
          All orders — custom bonbons, favours, and breakable hearts.
        </p>
      </div>
      <OrdersTable orders={orders} avgMargin={avgMargin} recipes={allRecipes} />
    </div>
  )
}
