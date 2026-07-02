interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  urgent?: boolean
}

function StatCard({ label, value, sub, urgent }: StatCardProps) {
  return (
    <div className={`bg-white border p-5 space-y-1 ${urgent ? 'border-cocoa-wine/40' : 'border-taupe/20'}`}>
      <p className="font-inter text-[10px] tracking-[0.35em] text-taupe uppercase">{label}</p>
      <p className={`font-cormorant text-4xl ${urgent ? 'text-cocoa-wine' : 'text-deep-cocoa'}`}>{value}</p>
      {sub && <p className="font-inter text-xs text-taupe">{sub}</p>}
    </div>
  )
}

interface DashboardStatsProps {
  totalOrders: number
  newOrders: number
  totalProducts: number
  activeProducts: number
  galleryCount: number
  totalRevenue: number
}

export function DashboardStats({
  totalOrders,
  newOrders,
  totalProducts,
  activeProducts,
  galleryCount,
  totalRevenue,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        label="New Orders"
        value={newOrders}
        sub="Awaiting response"
        urgent={newOrders > 0}
      />
      <StatCard
        label="Total Orders"
        value={totalOrders}
        sub="All time"
      />
      <StatCard
        label="Active Products"
        value={activeProducts}
        sub={`of ${totalProducts} total`}
      />
      <StatCard
        label="Gallery Images"
        value={galleryCount}
      />
      <StatCard
        label="Total Revenue"
        value={`$${totalRevenue.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        sub="Completed orders"
      />
    </div>
  )
}
