'use client'

import { useState } from 'react'

type Bucket = 'lorva-gallery' | 'lorva-products'

interface UploadResult {
  url: string
  storagePath: string
}

export function useImageUpload(bucket: Bucket = 'lorva-gallery') {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function upload(file: File): Promise<UploadResult | null> {
    setUploading(true)
    setError(null)

    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('bucket', bucket)

      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Upload failed')
        return null
      }

      return data as UploadResult
    } catch (err) {
      setError('Upload failed')
      return null
    } finally {
      setUploading(false)
    }
  }

  return { upload, uploading, error }
}
