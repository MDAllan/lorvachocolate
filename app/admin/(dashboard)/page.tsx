import { db } from '@/lib/db/client'
import { orderRequests, products, galleryImages } from '@/lib/db/schema'
import { count, eq, desc, sql } from 'drizzle-orm'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RecentOrders } from '@/components/admin/recent-orders'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Dashboard | Admin' }

export default async function AdminDashboardPage() {
  const [
    [{ total: totalOrders }],
    [{ total: newOrders }],
    [{ total: totalProducts }],
    [{ total: activeProducts }],
    [{ total: galleryCount }],
    recentOrders,
    [{ revenue }],
  ] = await Promise.all([
    db.select({ total: count() }).from(orderRequests),
    db.select({ total: count() }).from(orderRequests).where(eq(orderRequests.status, 'new')),
    db.select({ total: count() }).from(products),
    db.select({ total: count() }).from(products).where(eq(products.isActive, true)),
    db.select({ total: count() }).from(galleryImages),
    db.select({
      id: orderRequests.id,
      customerName: orderRequests.customerName,
      productInterest: orderRequests.productInterest,
      total: orderRequests.total,
      status: orderRequests.status,
      orderType: orderRequests.orderType,
      createdAt: orderRequests.createdAt,
    }).from(orderRequests).orderBy(desc(orderRequests.createdAt)).limit(5),
    db.select({
      revenue: sql<string>`COALESCE(SUM(total::numeric), 0)`,
    }).from(orderRequests).where(eq(orderRequests.status, 'completed')),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-cormorant text-3xl text-deep-cocoa">Dashboard</h1>
        <p className="font-inter text-sm text-taupe mt-1">
          Welcome back. Here&apos;s what&apos;s happening with Lorva.
        </p>
      </div>

      <DashboardStats
        totalOrders={totalOrders}
        newOrders={newOrders}
        totalProducts={totalProducts}
        activeProducts={activeProducts}
        galleryCount={galleryCount}
        totalRevenue={Number(revenue ?? 0)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={recentOrders} />

        <div className="bg-white border border-taupe/20 p-6 space-y-4">
          <h2 className="font-cormorant text-xl text-deep-cocoa">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { href: '/admin/orders', label: 'Review new orders', sub: `${newOrders} pending` },
              { href: '/admin/products/new', label: 'Add a new product', sub: 'Bonbons or bars' },
              { href: '/admin/costs', label: 'Manage ingredients & recipes', sub: 'Track your costs' },
              { href: '/admin/content', label: 'Edit site content', sub: 'Update text & images' },
              { href: '/admin/gallery', label: 'Update gallery', sub: `${galleryCount} images` },
            ].map(({ href, label, sub }) => (
              <a
                key={href}
                href={href}
                className="flex items-center justify-between p-3 border border-taupe/15 hover:border-champagne-gold/40 hover:bg-vanilla/30 transition-colors group"
              >
                <div>
                  <p className="font-inter text-sm text-deep-cocoa group-hover:text-cocoa-wine transition-colors">{label}</p>
                  <p className="font-inter text-xs text-taupe">{sub}</p>
                </div>
                <span className="font-inter text-xs text-taupe group-hover:text-cocoa-wine transition-colors">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
