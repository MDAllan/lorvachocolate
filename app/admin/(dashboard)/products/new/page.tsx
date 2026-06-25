import { ProductForm } from '@/components/admin/product-form'

export const metadata = { title: 'New Product | Admin' }

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cormorant text-3xl text-deep-cocoa">New Product</h1>
        <p className="font-inter text-sm text-taupe mt-1">Add a new product to your shop.</p>
      </div>
      <ProductForm />
    </div>
  )
}
