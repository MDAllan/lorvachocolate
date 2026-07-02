import Link from 'next/link'

type RecentOrder = {
  id: string
  customerName: string
  productInterest: string | null
  total: string | null
  status: string
  orderType: string
  createdAt: Date
}

const TYPE_BADGE: Record<string, string> = {
  favour: 'bg-champagne-gold/20 text-deep-cocoa',
  breakable: 'bg-cocoa-wine/15 text-cocoa-wine',
  custom: 'bg-taupe/15 text-taupe',
}

const STATUS_BADGE: Record<string, string> = {
  new: 'bg-champagne-gold/20 text-deep-cocoa',
  contacted: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-taupe/20 text-taupe',
  cancelled: 'bg-red-100 text-red-700',
}

export function RecentOrders({ orders }: { orders: RecentOrder[] }) {
  return (
    <div className="bg-white border border-taupe/20 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-cormorant text-xl text-deep-cocoa">Recent Orders</h2>
        <Link href="/admin/orders" className="font-inter text-[10px] tracking-[0.3em] uppercase text-taupe hover:text-deep-cocoa transition-colors">
          View All →
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="font-inter text-sm text-taupe/60 py-4 text-center">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map(o => (
            <div key={o.id} className="flex items-center justify-between py-2 border-b border-taupe/10 last:border-0">
              <div className="min-w-0">
                <p className="font-inter text-sm text-deep-cocoa font-medium truncate">{o.customerName}</p>
                <p className="font-inter text-xs text-taupe truncate">{o.productInterest ?? '—'}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className={`font-inter text-[9px] px-2 py-0.5 uppercase tracking-wider ${TYPE_BADGE[o.orderType] ?? TYPE_BADGE.custom}`}>
                  {o.orderType}
                </span>
                <span className={`font-inter text-[9px] px-2 py-0.5 uppercase tracking-wider ${STATUS_BADGE[o.status] ?? ''}`}>
                  {o.status}
                </span>
                <span className="font-inter text-xs text-taupe w-14 text-right">
                  {o.total ? `$${o.total}` : '—'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
