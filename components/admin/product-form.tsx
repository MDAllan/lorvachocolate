'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { useImageUpload } from '@/hooks/use-image-upload'
import { createProduct, updateProduct, type ProductFormData } from '@/lib/actions/product-actions'
import Image from 'next/image'

interface ProductFormProps {
  initialData?: ProductFormData & { id?: string }
}

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const { upload, uploading, error: uploadError } = useImageUpload('lorva-products')

  const [form, setForm] = useState<ProductFormData>({
    slug: initialData?.slug ?? '',
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    category: initialData?.category ?? 'bonbons',
    price12: initialData?.price12 ?? null,
    price16: initialData?.price16 ?? null,
    priceEach: initialData?.priceEach ?? null,
    imageUrl: initialData?.imageUrl ?? null,
    flavors: initialData?.flavors ?? [],
    tags: initialData?.tags ?? [],
    featured: initialData?.featured ?? false,
    isActive: initialData?.isActive ?? true,
  })

  function set<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const result = await upload(file)
    if (result) {
      set('imageUrl', result.url)
      toast({ title: 'Image uploaded' })
    } else {
      toast({ title: 'Upload failed', description: 'Check browser console for details', variant: 'destructive' })
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      try {
        if (initialData?.id) {
          await updateProduct(initialData.id, form)
          toast({ title: 'Product updated' })
        } else {
          await createProduct(form)
          toast({ title: 'Product created' })
          router.push('/admin/products')
        }
      } catch {
        toast({ title: 'Error saving product', variant: 'destructive' })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {/* Basic */}
      <div className="space-y-4">
        <h2 className="font-cormorant text-2xl text-deep-cocoa">Basic Info</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={e => {
                set('name', e.target.value)
                if (!initialData?.id) set('slug', slugify(e.target.value))
              }}
              placeholder="Classic Collection"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>Slug (URL)</Label>
            <Input
              value={form.slug}
              onChange={e => set('slug', e.target.value)}
              placeholder="classic-collection"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            rows={3}
            placeholder="Describe this product…"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Category</Label>
          <div className="flex gap-4">
            {(['bonbons', 'bars'] as const).map(cat => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={form.category === cat}
                  onChange={() => set('category', cat)}
                  className="accent-cocoa-wine"
                />
                <span className="font-inter text-sm capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h2 className="font-cormorant text-2xl text-deep-cocoa">Pricing</h2>

        {form.category === 'bonbons' ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Price · 12pc ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={form.price12 ?? ''}
                onChange={e => set('price12', e.target.value ? Number(e.target.value) : null)}
                placeholder="30"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Price · 16pc ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={form.price16 ?? ''}
                onChange={e => set('price16', e.target.value ? Number(e.target.value) : null)}
                placeholder="40"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 max-w-xs">
            <Label>Price Each ($)</Label>
            <Input
              type="number"
              step="0.01"
              value={form.priceEach ?? ''}
              onChange={e => set('priceEach', e.target.value ? Number(e.target.value) : null)}
              placeholder="6"
            />
          </div>
        )}
      </div>

      {/* Image */}
      <div className="space-y-4">
        <h2 className="font-cormorant text-2xl text-deep-cocoa">Image</h2>

        {form.imageUrl && (
          <div className="relative w-32 h-32 border border-taupe/20 overflow-hidden">
            <Image src={form.imageUrl} alt="Product" fill className="object-cover" />
          </div>
        )}

        <div className="space-y-1.5">
          <Label>Upload image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {uploading && <p className="font-inter text-xs text-taupe">Uploading…</p>}
          {uploadError && <p className="font-inter text-xs text-red-600">{uploadError}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>Or paste image URL</Label>
          <Input
            value={form.imageUrl ?? ''}
            onChange={e => set('imageUrl', e.target.value || null)}
            placeholder="https://…"
          />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h2 className="font-cormorant text-2xl text-deep-cocoa">Details</h2>

        <div className="space-y-1.5">
          <Label>Flavors (comma-separated)</Label>
          <Input
            value={form.flavors.join(', ')}
            onChange={e => set('flavors', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="Vanilla Crème, Dark Silk, Milky Silky"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Tags (comma-separated)</Label>
          <Input
            value={form.tags.join(', ')}
            onChange={e => set('tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="classic, milk-chocolate"
          />
        </div>
      </div>

      {/* Flags */}
      <div className="space-y-4">
        <h2 className="font-cormorant text-2xl text-deep-cocoa">Visibility</h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Switch
              id="featured"
              checked={form.featured}
              onCheckedChange={v => set('featured', v)}
            />
            <Label htmlFor="featured">Featured on homepage</Label>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="isActive"
              checked={form.isActive}
              onCheckedChange={v => set('isActive', v)}
            />
            <Label htmlFor="isActive">Active (visible in shop)</Label>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-taupe/20">
        <Button
          type="submit"
          disabled={isPending || uploading}
          className="bg-cocoa-wine hover:bg-cocoa-wine/80 text-cream rounded-none font-inter text-xs tracking-widest uppercase px-8"
        >
          {isPending ? 'Saving…' : initialData?.id ? 'Save Changes' : 'Create Product'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/products')}
          className="rounded-none font-inter text-xs tracking-widest uppercase"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
