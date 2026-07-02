import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth/config'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminTopbar } from '@/components/admin/topbar'
import { Toaster } from '@/components/ui/toaster'
import { ProfitCalculator } from '@/components/admin/profit-calculator'
import { getProfitSummary } from '@/lib/data/profit-db'

export const metadata = { title: 'Admin | Lorva Fine Chocolate' }

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/admin/login')

  const profitData = await getProfitSummary()

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopbar userName={session.user.name ?? session.user.email} />
        <main className="flex-1 overflow-y-auto bg-cream p-6 lg:p-8">
          {children}
        </main>
      </div>
      <ProfitCalculator initialData={profitData} />
      <Toaster />
    </div>
  )
}
