import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { products } from '@/lib/db/schema'
import { ProductForm } from '@/components/admin/product-form'
import type { ProductFormData } from '@/lib/actions/product-actions'

export const dynamic = 'force-dynamic'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product] = await db.select().from(products).where(eq(products.id, id)).limit(1)
  if (!product) notFound()

  const initialData: ProductFormData & { id: string } = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description ?? '',
    category: (product.category as 'bonbons' | 'bars') ?? 'bonbons',
    price12: product.price12 ? Number(product.price12) : null,
    price16: product.price16 ? Number(product.price16) : null,
    priceEach: product.priceEach ? Number(product.priceEach) : null,
    imageUrl: product.imageUrl,
    flavors: product.flavors ? JSON.parse(product.flavors) : [],
    tags: product.tags ? JSON.parse(product.tags) : [],
    featured: product.featured,
    isActive: product.isActive,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cormorant text-3xl text-deep-cocoa">Edit Product</h1>
        <p className="font-inter text-sm text-taupe mt-1">{product.name}</p>
      </div>
      <ProductForm initialData={initialData} />
    </div>
  )
}
