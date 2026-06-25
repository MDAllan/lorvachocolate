import Link from 'next/link'
import { Plus } from 'lucide-react'
import { db } from '@/lib/db/client'
import { products } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'
import { Button } from '@/components/ui/button'
import { ProductsTable } from '@/components/admin/products-table'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const rows = await db.select().from(products).orderBy(asc(products.createdAt))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-cormorant text-3xl text-deep-cocoa">Products</h1>
          <p className="font-inter text-sm text-taupe mt-1">{rows.length} product{rows.length !== 1 ? 's' : ''}</p>
        </div>
        <Button asChild className="bg-cocoa-wine hover:bg-cocoa-wine/80 text-cream rounded-none font-inter text-xs tracking-widest uppercase px-6">
          <Link href="/admin/products/new">
            <Plus className="h-3.5 w-3.5 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <ProductsTable products={rows} />
    </div>
  )
}
