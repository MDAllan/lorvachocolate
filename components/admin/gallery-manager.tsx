'use client'

import { useState, useTransition, useRef } from 'react'
import Image from 'next/image'
import { Upload, Trash2, GripVertical } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useImageUpload } from '@/hooks/use-image-upload'
import {
  saveGalleryImage,
  deleteGalleryImage,
  updateGalleryAltText,
  reorderGalleryImages,
} from '@/lib/actions/gallery-actions'
import type { galleryImages } from '@/lib/db/schema'
import type { InferSelectModel } from 'drizzle-orm'

type GalleryImage = InferSelectModel<typeof galleryImages>

export function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [images, setImages] = useState(initialImages)
  const { upload, uploading } = useImageUpload('lorva-gallery')
  const dragId = useRef<string | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    for (const file of files) {
      const result = await upload(file)
      if (!result) {
        toast({ title: `Failed to upload ${file.name}`, variant: 'destructive' })
        continue
      }
      startTransition(async () => {
        const saved = await saveGalleryImage({ url: result.url, storagePath: result.storagePath, altText: '' })
        if (saved.success) {
          setImages(prev => [...prev, {
            id: saved.id!,
            url: result.url,
            storagePath: result.storagePath,
            altText: '',
            sortOrder: prev.length,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          }])
          toast({ title: 'Image uploaded' })
        }
      })
    }
  }

  function handleDelete(id: string, storagePath: string) {
    if (!confirm('Delete this image? It will be permanently removed.')) return
    startTransition(async () => {
      await deleteGalleryImage(id, storagePath)
      setImages(prev => prev.filter(img => img.id !== id))
      toast({ title: 'Image deleted' })
    })
  }

  function handleAltBlur(id: string, altText: string) {
    startTransition(async () => {
      await updateGalleryAltText(id, altText)
    })
  }

  function handleDragStart(id: string) {
    dragId.current = id
  }

  function handleDrop(targetId: string) {
    if (!dragId.current || dragId.current === targetId) return
    const from = images.findIndex(img => img.id === dragId.current)
    const to = images.findIndex(img => img.id === targetId)
    if (from === -1 || to === -1) return

    const reordered = [...images]
    const [moved] = reordered.splice(from, 1)
    reordered.splice(to, 0, moved)
    const withOrder = reordered.map((img, i) => ({ ...img, sortOrder: i }))
    setImages(withOrder)
    dragId.current = null

    startTransition(async () => {
      await reorderGalleryImages(withOrder.map(img => ({ id: img.id, sortOrder: img.sortOrder })))
    })
  }

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-taupe/30 bg-white/50 cursor-pointer hover:bg-vanilla/30 hover:border-champagne-gold/40 transition-colors">
        <Upload className="h-6 w-6 text-taupe mb-2" />
        <p className="font-inter text-sm text-taupe">
          {uploading ? 'Uploading…' : 'Click or drag images here'}
        </p>
        <p className="font-inter text-xs text-taupe/50 mt-1">JPEG, PNG, WebP · max 5 MB each</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading || isPending}
          className="hidden"
        />
      </label>

      {/* Grid */}
      {images.length === 0 ? (
        <div className="text-center py-16 border border-taupe/20 bg-white/50">
          <p className="font-cormorant text-2xl text-taupe">No images yet</p>
          <p className="font-inter text-xs text-taupe/50 mt-2">Upload your first gallery photo above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div
              key={img.id}
              draggable
              onDragStart={() => handleDragStart(img.id)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(img.id)}
              className="group relative bg-white border border-taupe/20 overflow-hidden"
            >
              {/* Drag handle */}
              <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                <GripVertical className="h-4 w-4 text-white drop-shadow" />
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(img.id, img.storagePath)}
                disabled={isPending}
                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-sm"
              >
                <Trash2 className="h-3 w-3" />
              </button>

              {/* Image */}
              <div className="relative aspect-square">
                <Image src={img.url} alt={img.altText} fill className="object-cover" />
              </div>

              {/* Alt text */}
              <div className="p-2">
                <AltInput
                  defaultValue={img.altText}
                  onBlur={val => handleAltBlur(img.id, val)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="font-inter text-xs text-taupe/50">
          Drag images to reorder. Changes save automatically.
        </p>
      )}
    </div>
  )
}

function AltInput({ defaultValue, onBlur }: { defaultValue: string; onBlur: (v: string) => void }) {
  const [val, setVal] = useState(defaultValue)
  return (
    <input
      type="text"
      value={val}
      onChange={e => setVal(e.target.value)}
      onBlur={() => onBlur(val)}
      placeholder="Alt text…"
      className="w-full text-xs font-inter text-taupe bg-transparent border-b border-taupe/20 focus:outline-none focus:border-champagne-gold/60 py-0.5 transition-colors"
    />
  )
}
