'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { toggleProductActive, deleteProduct } from '@/lib/actions/product-actions'
import type { products } from '@/lib/db/schema'
import type { InferSelectModel } from 'drizzle-orm'

type Product = InferSelectModel<typeof products>

export function ProductsTable({ products: rows }: { products: Product[] }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [localActive, setLocalActive] = useState<Record<string, boolean>>(
    Object.fromEntries(rows.map(r => [r.id, r.isActive]))
  )

  function handleToggle(id: string, checked: boolean) {
    setLocalActive(prev => ({ ...prev, [id]: checked }))
    startTransition(async () => {
      try {
        await toggleProductActive(id, checked)
        toast({ title: checked ? 'Product activated' : 'Product deactivated' })
      } catch {
        setLocalActive(prev => ({ ...prev, [id]: !checked }))
        toast({ title: 'Error updating product', variant: 'destructive' })
      }
    })
  }

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    startTransition(async () => {
      try {
        await deleteProduct(id)
        toast({ title: `"${name}" deleted` })
      } catch {
        toast({ title: 'Error deleting product', variant: 'destructive' })
      }
    })
  }

  if (rows.length === 0) {
    return (
      <div className="text-center py-20 border border-taupe/20 bg-white/50">
        <p className="font-cormorant text-2xl text-taupe">No products yet</p>
        <p className="font-inter text-sm text-taupe/60 mt-2">Add your first product to get started.</p>
      </div>
    )
  }

  return (
    <div className="border border-taupe/20 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-vanilla/60">
            <TableHead className="font-inter text-xs tracking-widest uppercase text-taupe">Name</TableHead>
            <TableHead className="font-inter text-xs tracking-widest uppercase text-taupe">Category</TableHead>
            <TableHead className="font-inter text-xs tracking-widest uppercase text-taupe">Price</TableHead>
            <TableHead className="font-inter text-xs tracking-widest uppercase text-taupe">Featured</TableHead>
            <TableHead className="font-inter text-xs tracking-widest uppercase text-taupe">Active</TableHead>
            <TableHead className="font-inter text-xs tracking-widest uppercase text-taupe w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(product => (
            <TableRow key={product.id} className="border-b border-taupe/10">
              <TableCell>
                <div>
                  <p className="font-inter text-sm font-medium text-deep-cocoa">{product.name}</p>
                  <p className="font-inter text-xs text-taupe">{product.slug}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-inter text-xs capitalize border-taupe/30 text-taupe">
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell className="font-inter text-sm text-deep-cocoa">
                {product.category === 'bonbons'
                  ? `$${product.price12 ?? '—'} / $${product.price16 ?? '—'}`
                  : `$${product.priceEach ?? '—'} each`}
              </TableCell>
              <TableCell>
                {product.featured ? (
                  <span className="font-inter text-xs text-champagne-gold">Featured</span>
                ) : (
                  <span className="font-inter text-xs text-taupe/40">—</span>
                )}
              </TableCell>
              <TableCell>
                <Switch
                  checked={localActive[product.id] ?? product.isActive}
                  onCheckedChange={checked => handleToggle(product.id, checked)}
                  disabled={isPending}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="p-1.5 text-taupe hover:text-deep-cocoa transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={isPending}
                    className="p-1.5 text-taupe hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
