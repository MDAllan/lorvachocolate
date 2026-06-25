'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useImageUpload } from '@/hooks/use-image-upload'
import { updateSiteContent } from '@/lib/actions/content-actions'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface ImageUploaderProps {
  contentKey: string
  currentUrl: string
  label: string
}

export function ImageUploader({ contentKey, currentUrl, label }: ImageUploaderProps) {
  const [url, setUrl] = useState(currentUrl)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { upload, uploading, error } = useImageUpload('lorva-gallery')
  const { toast } = useToast()

  async function handleFile(file: File) {
    const result = await upload(file)
    if (!result) {
      toast({ title: error ?? 'Upload failed', variant: 'destructive' })
      return
    }
    setSaving(true)
    try {
      await updateSiteContent(contentKey, result.url)
      setUrl(result.url)
      toast({ title: 'Image updated!' })
    } catch {
      toast({ title: 'Failed to save image URL', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const isWorking = uploading || saving

  return (
    <div className="space-y-3">
      {url && (
        <div className="relative w-full max-w-xs aspect-video overflow-hidden bg-taupe/10 rounded-sm border border-taupe/20">
          <img
            src={url}
            alt={label}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
      {error && <p className="font-inter text-xs text-red-500">{error}</p>}
      <Button
        onClick={() => fileRef.current?.click()}
        disabled={isWorking}
        size="sm"
        variant="outline"
        className="font-inter text-xs rounded-none border-taupe/40 tracking-wider uppercase"
      >
        {isWorking ? 'Uploading…' : url ? 'Replace Image' : 'Upload Image'}
      </Button>
    </div>
  )
}
